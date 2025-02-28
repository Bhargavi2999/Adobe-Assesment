import React, { useState, useEffect } from "react";
import { defaultTheme, Provider, Flex, TextField, Button, View, Heading, Text, Switch } from "@adobe/react-spectrum";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>("light");

  useEffect(() => {
    document.title = "Roman Numeral Converter";
  }, []);

  const toggleTheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  const convertToRoman = async () => {
    setError(null);
    setResult(null);

    if (!number || isNaN(Number(number))) {
      setError("Please enter a valid number.");
      return;
    }

    const query = parseInt(number);
    if (query < 1 || query > 3999) {
      setError("Number must be between 1 and 3999.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/romannumeral?query=${query}`);
      if (!response.ok) throw new Error("Invalid request");

      const data = await response.json();
      setResult(data.output);
    } catch (err) {
      setError("Failed to convert number.");
    }
  };

  return (
    <Provider theme={defaultTheme} colorScheme={colorScheme}>
      <View height="100vh" padding="size-400" UNSAFE_style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: colorScheme === "dark" ? "#000" : "#f4f4f4" }}>
        <View padding="size-800" width="size-6000" UNSAFE_style={{ borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.4)", textAlign: "center", padding: "50px", position: "relative", top: "20px", backgroundColor: colorScheme === "dark" ? "#222" : "#fff" }}>
          <Flex direction="column" gap="size-400" alignItems="center">
            <Heading level={1} UNSAFE_style={{ fontSize: "32px", fontWeight: "bold", color: colorScheme === "dark" ? "#fff" : "#222" }}>Roman Numeral Converter</Heading>
            <Switch isSelected={colorScheme === "dark"} onChange={toggleTheme}>Dark Mode</Switch>
            <TextField
              label="Enter a number"
              value={number}
              onChange={setNumber}
              type="number"
              validationState={number && (parseInt(number) < 1 || parseInt(number) > 3999) ? "invalid" : "valid"}
              errorMessage="Number must be between 1 and 3999"
              width="size-4600"
              UNSAFE_style={{ fontSize: "20px", padding: "10px" }}
            />
            <Button variant="cta" onPress={convertToRoman} UNSAFE_style={{ marginTop: "20px", backgroundColor: "#007aff", color: "#fff", fontSize: "18px", padding: "12px 25px", borderRadius: "10px" }}>
              Convert to Roman Numeral
            </Button>
            {error && <Text UNSAFE_style={{ color: "red", fontSize: "20px", marginTop: "20px" }}>{error}</Text>}
            {result && <Text UNSAFE_style={{ fontSize: "24px", fontWeight: "bold", marginTop: "20px", color: colorScheme === "dark" ? "#fff" : "#222" }}>Roman Numeral: {result}</Text>}
          </Flex>
        </View>
      </View>
    </Provider>
  );
}

export default App;
