import Operator, { InputOperatorSymbol } from "./Operator";

export default class Exponentiation extends Operator {
    symbol: "^" = "^";

    merge(operator: InputOperatorSymbol): false {
        return false;
    }

    get presendence(): number {
        return 4;
    }
}