import { isFunction } from '../functions/object'

const RafManager = {
    callbacks: [],
    raf: [],

    addQueue(func) {
        this.callbacks.push(func)
        return this.callbacks.length - 1
    },

    removeQueue(index) {
        if (this.callbacks[index]) {
            this.callbacks.splice(index, 1)
            return true
        }

        return false
    },

    render(delta) {
        this.raf = window.requestAnimationFrame(this.render.bind(this))

        this.callbacks.map((callback) => {
            if (isFunction(callback)) {
                callback(delta)
            }
            return true
        })
    },

    stop() {
        window.cancelAnimationFrame(this.raf)
        this.raf = null
    },
}

RafManager.render(0)
export default RafManager
