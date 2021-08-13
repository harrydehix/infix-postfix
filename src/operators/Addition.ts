import Operator, { InputOperatorSymbol } from "./Operator";
import Subtraction from "./Subtraction";

export default class Addition extends Operator {
    symbol: "+" = "+";

    merge(operator: InputOperatorSymbol) {
        if (operator === "+") return this;
        else if (operator === "-") return new Subtraction();
        else
            return false;
    }

    get presendence(): number {
        return 0;
    }
}