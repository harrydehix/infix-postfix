import Addition from "./Addition";
import ClosingBracket from "./ClosingBracket";
import Division from "./Division";
import Exponentiation from "./Exponentiation";
import Multiplication from "./Multiplication";
import Negation from "./Negation";
import OpeningBracket from "./OpeningBracket";
import Operator, { InputOperatorSymbol } from "./Operator";
import Plus from "./Plus";
import Subtraction from "./Subtraction";

export default class OperatorUtils {
    static isOperatorSymbol(value: string) {
        return value === "+" || value === "-" || value === "*" || value === "/" || value === "^" || value === "(" || value === ")"
    }

    static parse(operatorChar: InputOperatorSymbol, preferUnary = false): Operator {
        switch (operatorChar) {
            case "(":
                return new OpeningBracket();
            case ")":
                return new ClosingBracket();
            case "*":
                return new Multiplication();
            case "/":
                return new Division();
            case "^":
                return new Exponentiation();
            case "+":
                if (preferUnary) return new Plus();
                return new Addition();
            case "-":
                if (preferUnary) return new Negation();
                return new Subtraction();
        }
    }
}