import Operator, { InputOperatorSymbol, OperatorSymbol } from "./Operator";
import Plus from "./Plus";

export default class Negation extends Operator {
    symbol: "−" = "−";

    merge(operator: InputOperatorSymbol) {
        if (operator === "+") return this;
        else if (operator === "-") return new Plus();
        else
            return false;
    }

    get presendence(): number {
        return 3;
    }
}