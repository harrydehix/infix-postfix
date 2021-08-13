import { InputOperatorSymbol } from "./Operator";
import ClosePlus from "./ClosePlus";
import Negation from "./Negation";

export default class CloseNegation extends Negation {
    symbol: "−" = "−";

    merge(operator: InputOperatorSymbol) {
        if (operator === "+") return this;
        else if (operator === "-") return new ClosePlus();
        else
            return false;
    }

    get presendence(): number {
        return 5;
    }
}