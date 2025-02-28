const express = require("express");
const cors = require("cors");
const winston = require("winston");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Logger setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "server.log" }),
  ],
});

// Middleware to log API requests with response time
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} [${duration}ms]`);
  });
  next();
});

// Roman numeral conversion logic
const romanMap = [
  { value: 1000, numeral: "M" },
  { value: 900, numeral: "CM" },
  { value: 500, numeral: "D" },
  { value: 400, numeral: "CD" },
  { value: 100, numeral: "C" },
  { value: 90, numeral: "XC" },
  { value: 50, numeral: "L" },
  { value: 40, numeral: "XL" },
  { value: 10, numeral: "X" },
  { value: 9, numeral: "IX" },
  { value: 5, numeral: "V" },
  { value: 4, numeral: "IV" },
  { value: 1, numeral: "I" },
];

const toRoman = (num) => {
  if (num < 1 || num > 3999) return "Invalid number";

  let result = "";
  for (let { value, numeral } of romanMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
};

// API endpoint
app.get("/romannumeral", (req, res) => {
  const query = parseInt(req.query.query);
  if (isNaN(query) || query < 1 || query > 3999) {
    logger.warn(`Invalid input: ${req.query.query}`);
    return res.status(400).send("Invalid input: must be a whole number between 1 and 3999.");
  }

  const output = toRoman(query);
  logger.info(`Converted ${query} to ${output}`);

  res.json({ input: String(query), output });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});
