import CloseNegation from "./CloseNegation";
import { InputOperatorSymbol } from "./Operator";
import Plus from "./Plus";

export default class ClosePlus extends Plus {
    symbol: "+" = "+";


    merge(operator: InputOperatorSymbol) {
        if (operator === "+") return this;
        else if (operator === "-") return new CloseNegation();
        else
            return false;
    }

    get presendence(): number {
        return 5;
    }
}