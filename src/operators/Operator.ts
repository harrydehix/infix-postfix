import { inspect } from "util";

export type OperatorSymbol = "+" | "-" | "−" | "*" | "/" | "^" | ")" | "(";
export type InputOperatorSymbol = "+" | "-" | "*" | "/" | "^" | ")" | "(";

export default abstract class Operator {
    abstract symbol: OperatorSymbol;

    abstract merge(operator: InputOperatorSymbol): Operator | false;

    abstract get presendence(): number;

    [inspect.custom](depth?: any, options?: any): string {
        return options.stylize(`${this.symbol}`, "special");
    }

    toString(): string {
        return this.symbol;
    }
}