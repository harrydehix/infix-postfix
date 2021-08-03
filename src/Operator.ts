export default class Operator {
    private readonly symbol: string;
    private readonly presendence: number;

    constructor(symbol: string, presendence: number) {
        this.symbol = symbol;
        this.presendence = presendence;
    }

    isOperator(symbol: string): boolean {
        return this.symbol === symbol;
    }

    getSymbol() {
        return this.symbol;
    }

    getPresendence() {
        return this.presendence;
    }
}