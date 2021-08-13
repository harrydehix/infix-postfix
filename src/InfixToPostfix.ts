import IterableString from "./Expression";
import Operand, { OperandType } from "./Operand";
import CloseMultiplication from "./operators/CloseMultiplication";
import CloseNegation from "./operators/CloseNegation";
import ClosePlus from "./operators/ClosePlus";
import ClosingBracket from "./operators/ClosingBracket";
import Exponentiation from "./operators/Exponentiation";
import Multiplication from "./operators/Multiplication";
import Negation from "./operators/Negation";
import OpeningBracket from "./operators/OpeningBracket";
import Operator, { InputOperatorSymbol } from "./operators/Operator";
import OperatorUtils from "./operators/OperatorUtils";
import Plus from "./operators/Plus";
import Stack from "./Stack";

class InfixToPostfix {
    private expression: IterableString;
    private queue: Stack<Operator | Operand> = new Stack();
    private current: Operand | Operator | null = null;
    private postfixExpression: Stack<Operator | Operand> = new Stack();

    public toString() {
        return this.toObjectArray().join(" ");
    }

    private toObjectArray() {
        return this.postfixExpression.toArray();
    }

    public toArray() {
        const objectArray = this.toObjectArray();
        const array: (string | number)[] = [];
        for (const item of objectArray) {
            if (item instanceof Operator) {
                array.push(item.symbol);
            } else {
                if (item.type === OperandType.Number) array.push(Number(item.value));
                else array.push(item.value)
            }
        }
        return array;
    }

    constructor(expression: string) {
        this.expression = new IterableString(expression);
        this.parseToQueue();
        this.parseQueue();
    }

    private appendCurrent() {
        const last = this.queue.getLast();
        // (a+b)(d-e) => (a+b)*(d-e), a(2) => a*(2)
        if (this.current instanceof OpeningBracket &&
            (last instanceof Operand || last instanceof ClosingBracket)) {
            this.queue.push(new Multiplication());
        }
        // (3+4)2 = (3+4)*2
        if (last instanceof ClosingBracket && this.current instanceof Operand) {
            this.queue.push(new Multiplication());
        }

        // 2 a => 2*a
        if (this.current instanceof Operand && last instanceof Operand) {
            this.queue.push(new Multiplication());
        }

        // 2^-2/4 => 2^(-2)/4
        if (last instanceof Exponentiation) {
            if (this.current instanceof Negation) this.current = new CloseNegation();
            if (this.current instanceof Plus) this.current = new ClosePlus();
        }

        this.queue.push(this.current!);
        this.current = null;
    }

    private parseToQueue() {
        while (this.expression.hasNext()) {
            const currentCharacter = this.expression.next();

            if (OperatorUtils.isOperatorSymbol(currentCharacter)) {
                const operatorChar = currentCharacter as InputOperatorSymbol;

                if (this.current instanceof Operand) {
                    this.appendCurrent();
                    //this.current = null;
                } else if (this.current instanceof Operator) {
                    const merged = this.current.merge(operatorChar);
                    if (merged) {
                        this.current = merged;
                    } else {
                        this.appendCurrent();
                        //this.current = null;
                    }
                }

                if (this.current === null) {
                    const last = this.queue.getLast();
                    const preferUnary = !last || (last instanceof Operator && !(last instanceof ClosingBracket));
                    this.current = OperatorUtils.parse(operatorChar, preferUnary);
                }
            } else if (currentCharacter.match(/[^\s]/)) {
                if (this.current instanceof Operator) {
                    this.appendCurrent();
                }

                if (this.current === null) {
                    this.current = new Operand(currentCharacter);
                } else {
                    const merged = (this.current as Operand).append(currentCharacter);
                    if (!merged) {
                        // 2a => 2&a
                        this.appendCurrent();
                        this.queue.push(new CloseMultiplication());
                        this.current = new Operand(currentCharacter);
                    }
                }
            } else if (currentCharacter.match(/\s/)) {
                if (this.current === null || this.current instanceof Operator) continue;
                // b a !== ba
                if (this.current instanceof Operand) {
                    this.appendCurrent();
                }
            }
        }
        if (this.current) this.appendCurrent();
    }

    private parseQueue() {
        const queueArray = this.queue.toArray();
        const operatorStack = new Stack<Operator>();
        for (const item of queueArray) {
            if (item instanceof Operator) {
                while (operatorStack.hasItem()) {
                    const op = operatorStack.getLast()!;
                    if (item instanceof ClosingBracket) {
                        // If the current operator is ')' resolve all operators until a '(' operator is reached
                        if (!(op instanceof OpeningBracket)) {
                            // Skip plus operators (they can get ignored for mathematical reasons)
                            if (op instanceof Plus) operatorStack.pop();
                            // Append other operators
                            else this.postfixExpression.push(operatorStack.pop()!);
                        }
                        else {
                            // Pop '(' but don't append it
                            operatorStack.pop();
                            break;
                        }
                    } else {
                        // If the current operator is a common one resolve all operators
                        // until a '(' is reached or an operator has a smaller presendence
                        if (!(op instanceof OpeningBracket) && op.presendence >= item.presendence) {
                            // Skip plus operators (they can get ignored for mathematical reasons)
                            if (op instanceof Plus) operatorStack.pop();
                            // Append other operators
                            else this.postfixExpression.push(operatorStack.pop()!);
                        } else {
                            // Stop resolving if the operator has a smaller presendence or if it is a '('
                            break;
                        }
                    }
                }
                if (!(item instanceof ClosingBracket)) operatorStack.push(item);
            } else {
                this.postfixExpression.push(item);
            }
        }
        // Resolve remained operators from their stack
        while (operatorStack.hasItem()) {
            const op = operatorStack.getLast();
            if (op instanceof Plus || op instanceof OpeningBracket || op instanceof ClosingBracket) {
                operatorStack.pop();
            } else {
                this.postfixExpression.push(operatorStack.pop()!);
            }
        }
    }

}

export default (expression: string) => {
    return new InfixToPostfix(expression);
}