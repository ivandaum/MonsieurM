// import store from '../utils/store'
import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'

import { lerp, range } from '../functions/object'

export default {
    header(obj) {
        if (!obj.canRender) return false

        const heigth = store.windowHeight * 0.5
        const y = Math.round(ScrollManager.scrollEased * 0.2)
        const offset = obj.offset || [0, 0]
        obj.$el.style.transform = `translate3d(0, ${y}px, 0)`

        if (obj.$spans) {
            for (let i = 0; i < obj.$spans.length; i++) {
                const top = obj.$spans[i].offsetTop + offset[0]
                const bottom = top + heigth + offset[1]
                const opacity = 1 - range(ScrollManager.scrollEased, top, bottom) * 0.01
                obj.$spans[i].style.opacity = Math.min(1, Math.max(0, parseFloat(Number(opacity).toFixed(2))))
            }
        }
    },

    block(obj) {
        if (obj.canRender) {
            const progress = range(ScrollManager.scrollEased, obj.top, obj.bottom) * 0.01
            const y = lerp(obj.parallax[0], obj.parallax[1], progress)

            obj.$el.style.transform = `translate3d(0, ${y}px, 0)`
        }
    },
}
