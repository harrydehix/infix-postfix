import { inspect } from "util";

export default class Stack<T extends any>{
    private readonly array: Array<T>;

    get length() {
        return this.array.length;
    }

    constructor(array: T[] = []) {
        this.array = array;
    }

    push(item: T) {
        this.array.push(item);
    }

    pop(): T | undefined {
        const item = this.array.pop();
        return item;
    }

    getLast() {
        if (this.length === 0) return undefined;
        return this.array[this.length - 1];
    }

    hasItem() {
        return this.length > 0;
    }


    [inspect.custom](depth?: any, options?: any): string {
        return options.stylize("Stack ", "special") + inspect(this.array);
    }

    toString(): string {
        return this.array.toString();
    }

    toArray(): T[] {
        return this.array;
    }
}