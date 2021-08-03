export = {};

declare global {
    interface String {
        insert(index: number, string: string, skip?: number): string;
        splice(index: number, remove?: number, add?: string): string;
    }
}

String.prototype.insert = function (start, string, skip = 0) {
    // We cannot pass negative indexes directly to the 2nd slicing operation.
    if (start < 0) {
        start = this.length + start;
        if (start < 0) {
            start = 0;
        }
    }

    return this.slice(0, start) + string + this.slice(start + skip);
};

String.prototype.splice = function (start, remove = 0, add = "") {
    // We cannot pass negative indexes directly to the 2nd slicing operation.
    if (start < 0) {
        start = this.length + start;
        if (start < 0) {
            start = 0;
        }
    }

    return this.slice(0, start) + add + this.slice(start + remove);
};