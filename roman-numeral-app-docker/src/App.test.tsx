import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders Roman Numeral Converter title", () => {
  render(<App />);
  expect(screen.getByText("Roman Numeral Converter")).toBeInTheDocument();
});


test("shows error for invalid input", () => {
  render(<App />);
  const input = screen.getByLabelText("Enter a number");
  fireEvent.change(input, { target: { value: "abc" } });
  fireEvent.click(screen.getByText("Convert to Roman Numeral"));
  expect(screen.getByText("Please enter a valid number.")).toBeInTheDocument();
});
