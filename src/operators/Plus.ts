import Negation from "./Negation";
import Operator, { InputOperatorSymbol } from "./Operator";

export default class Plus extends Operator {
    symbol: "+" = "+";


    merge(operator: InputOperatorSymbol) {
        if (operator === "+") return this;
        else if (operator === "-") return new Negation();
        else
            return false;
    }

    get presendence(): number {
        return 3;
    }
}