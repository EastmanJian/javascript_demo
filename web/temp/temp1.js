let obj = {
    array: [1, 2, 3, 4, 5],
    nextIndex: 0,
    [Symbol.iterator]: function () {
        return {
            array: this.array,
            nextIndex: this.nextIndex,
            next: function () {
                return this.nextIndex < this.array.length ?
                    {value: this.array[this.nextIndex++], done: false} :
                    {done: true};
            }
        }
    }
};

for (let n of obj) {
    console.log(n)
}