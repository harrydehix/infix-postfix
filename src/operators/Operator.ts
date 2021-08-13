import { inspect } from "util";

export type OperatorSymbol = "+" | "-" | "−" | "*" | "/" | "^" | ")" | "(" | "&";
export type InputOperatorSymbol = "+" | "-" | "*" | "/" | "^" | ")" | "(";

export default abstract class Operator {
    abstract symbol: OperatorSymbol;

    abstract merge(operator: InputOperatorSymbol): Operator | false;

    abstract get presendence(): number;

    [inspect.custom](depth?: any, options?: any): string {
        // console.log(options.stylize.toString())
        // console.log(inspect.styles)
        return options.stylize(`${this.symbol}`, "special");
    }

    toString(): string {
        return this.symbol;
    }
}