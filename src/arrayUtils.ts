export = {};

declare global {
    interface Array<T> {
        top(): T;
    }
}

Array.prototype.top = function () {
    return this[this.length - 1];
};
