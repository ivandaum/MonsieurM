export default {
    functions: [],
    init() {
        window.addEventListener('resize', this.onResize.bind(this))
    },

    addQueue(func) {
        this.functions.push(func)
        return this.functions.length - 1
    },

    removeQueue(index) {
        if (this.functions[index]) {
            this.functions.splice(index, 1)
            return true
        }

        return false
    },

    onResize() {
        this.functions.map((func) => func())
    },
}
