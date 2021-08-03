import Operand from "./Operand";
import "./stringUtils";
import "./arrayUtils";

type InfixOperator = "+" | "-" | "*" | "/" | "(" | ")" | "^";

function getPresendence(op: PostfixOperator): number {
    switch (op) {
        case "(":
        case ")":
            return 5;
        case "plus_exp":
        case "neg_exp":
            return 4;
        case "pow":
            return 3;
        case "plus":
        case "neg":
            return 2;
        case "mult":
        case "div":
            return 1;
        case "sub":
        case "add":
            return 0;
    }
}

type PostfixOperator = "add" | "sub" | "mult" | "div" | "pow" | "plus" | "neg" | "(" | ")" | "neg_exp" | "plus_exp";



function isOperator(char: string): boolean {
    return char === "+" || char === "-" || char === "*" || char === "/" || char === "^" || char === "(" || char === ")"
}

function infixToPostfixOperator(op: InfixOperator): PostfixOperator {
    switch (op) {
        case "(":
        case ")":
            return op;
        case "^":
            return "pow";
        case "*":
            return "mult";
        case "/":
            return "div";
        case "+":
            return "add";
        case "-":
            return "sub";
    }
}

function invert(op: PostfixOperator): PostfixOperator {
    switch (op) {
        case "(":
            return ")";
        case ")":
            return "(";
        case "pow":
            return ")";
        case "mult":
            return "div";
        case "div":
            return "mult";
        case "add":
            return "sub";
        case "sub":
            return "add";
        case "neg":
            return "plus";
        case "plus":
            return "neg";
        case "neg_exp":
            return "plus_exp";
        case "plus_exp":
            return "neg_exp";
    }
}

/**
 * Converts infix expressions to postfix (rpn) expressions.
 * @param expression the infix expression
 * @param showSteps whether to print debug information to the console (default is false)
 * @returns the postfix expression
 */
export default (expression: string, showSteps = false) => {
    const expressionRaw = expression;
    let result = "";
    const stack: PostfixOperator[] = [];
    let charBefore: null | string = null;
    let operand = null;

    if (showSteps) {
        console.log("#####################################")
        console.log("Starting...")
    }
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (showSteps) {
            console.log(`Result: '${result}'`)
            console.log("Stack: ", stack)
            console.log("Operand: '" + (operand ? operand.getValue() : "") + "'");
            console.log("#####################################")
            console.log(`Input: '${char}'`)
        }
        if (i > 0) charBefore = expression[i - 1];

        if (isOperator(char)) {
            const currentOp = char as InfixOperator;
            let postOp = infixToPostfixOperator(currentOp);

            if (operand) {
                result += operand.getValue() + " ";
                operand = null;
            }
            let afterOperator = true;
            if (charBefore) afterOperator = isOperator(charBefore);

            if (afterOperator) {
                if (currentOp === "-" && charBefore !== ")") {
                    if (charBefore === "-") {
                        expression = expression.splice(i - 1, 2, "+");
                        stack[stack.length - 1] = invert(stack.top());
                        i -= 1;
                        continue;
                    }
                    else if (charBefore === "+") {
                        expression = expression.splice(i - 1, 1);
                        stack[stack.length - 1] = invert(stack.top());
                        i -= 1;
                        continue;
                    } else if (charBefore === "^") {
                        postOp = "neg_exp";
                    } else {
                        postOp = "neg";
                    }
                } else if (currentOp === "+" && charBefore !== ")") {
                    expression = expression.splice(i, 1);
                    i -= 1;
                    continue;
                } else if (currentOp !== "(" && charBefore !== ")") {
                    throw new Error(`Invalid infix expression '${expressionRaw}'`)
                }
            }

            const currentPres = getPresendence(postOp);
            for (let j = stack.length - 1; j >= 0; j--) {
                const op = stack[j];
                if (op === "plus") continue;
                else if (postOp === ")") {
                    if (op === "(") {
                        stack.pop();
                        break;
                    }
                    else result += stack.pop() + " ";
                } else {
                    if (op === "(") break;
                    else if (getPresendence(op) >= currentPres) {
                        result += stack.pop() + " ";
                    } else {
                        break;
                    }
                }
            }
            if (postOp !== ")") stack.push(postOp);
        } else if (char.match(/[^\s]/)) {
            if (!operand) {
                operand = new Operand(char);
            } else {
                const success = operand.append(char);
                if (!success) {
                    result += operand.getValue() + " ";
                    operand = new Operand(char);
                    stack.push("mult");
                }
            }
        }
    }
    if (operand) result += operand.getValue() + " ";
    for (let j = stack.length - 1; j >= 0; j--) {
        const op = stack[j];
        if (op === "plus" || op === "(" || op === ")") {
            stack.pop();
        } else {
            result += stack.pop() + " ";
        }
    }
    console.log(`Result: '${result}'`)
    console.log("Stack:", stack)
    console.log("Operand: '" + (operand ? operand.getValue() : "") + "'");
    console.log("#####################################")
    return result.replace(/neg_exp/g, "neg").trim();
}
