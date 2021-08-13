import Operator, { InputOperatorSymbol } from "./Operator";

export default class Division extends Operator {
    symbol: "/" = "/";

    merge(operator: InputOperatorSymbol) {
        if (operator === "+") return this;
        else
            return false;
    }

    get presendence(): number {
        return 1;
    }
}