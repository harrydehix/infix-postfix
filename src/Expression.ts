export default class IterableString extends String {
    index = -1;

    isAtBeginning() {
        return this.index === 0;
    }

    isAtEnd() {
        return !this.hasNext();
    }

    next() {
        this.index += 1;
        return this[this.index];
    }

    hasNext(): boolean {
        return this.index + 1 < this.length;
    }
}