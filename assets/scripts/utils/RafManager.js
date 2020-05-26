import { isFunction } from '../functions/object'

const MAX_FPS = 60
const FPS_INTERVAL = 1000 / MAX_FPS

const RafManager = {
    callbacks: [],
    raf: [],
    lastDate: Date.now(),
    dt: 0,
    now: 0,

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

        this.now = Date.now()
        this.dt = this.now - this.lastDate
        if (this.dt > FPS_INTERVAL) {
            this.lastDate = this.now - (this.dt % FPS_INTERVAL)

            this.callbacks.map((callback) => {
                if (isFunction(callback)) {
                    callback(delta)
                }
                return true
            })
        }
    },

    stop() {
        window.cancelAnimationFrame(this.raf)
        this.raf = null
    },
}

RafManager.render(0)
export default RafManager
