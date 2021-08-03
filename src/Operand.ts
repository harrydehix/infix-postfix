export enum OperandType {
    Number,
    Symbol
}

export default class Operand {
    private value = "";
    type: OperandType;
    private dotCount = 0;

    constructor(value: string) {
        this.value = value;
        this.type = Operand.parseOperandType(value);
    }

    append(append: string) {
        if (this.type === OperandType.Number) {
            if (append === ".") {
                this.dotCount++;
                if (this.dotCount > 1) this.type = OperandType.Symbol;
            }
            else if (append.match(/[^0-9]/)) {
                return false;
            }
        }
        this.value += append;
        return true;
    }

    isEmpty() {
        return this.value === "";
    }

    getValue() {
        return this.value;
    }

    static parseOperandType(value: string) {
        if (value.match(/[0-9.]/)) return OperandType.Number;
        else return OperandType.Symbol;
    }
}