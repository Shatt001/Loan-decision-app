import React from "react";
import { createRoot } from "react-dom/client";
import LoanApp from "./components/LoanApp";
import "normalize.css";

createRoot(document.getElementById("app")).render(<LoanApp />);
