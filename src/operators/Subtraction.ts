import Addition from "./Addition";
import Operator, { InputOperatorSymbol } from "./Operator";

export default class Subtraction extends Operator {
    symbol: "-" = "-";

    merge(operator: InputOperatorSymbol) {
        if (operator === "+") return this;
        else if (operator === "-") return new Addition();
        else
            return false;
    }

    get presendence(): number {
        return 0;
    }
}