import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'

import { lerp, range } from '../functions/object'

export default {
    header(obj) {
        if (!obj.canRender) return false
        const y = Math.round(ScrollManager.scrollEased * 0.2)
        obj.$el.style.transform = `translate3d(0, ${y}px, 0)`

        if (obj.$spans) {
            const opacity = 1 - (ScrollManager.scrollEased - store.windowHeight * 0.25) / obj.height
            for (let i = 0; i < obj.$spans.length; i++) {
                obj.$spans[i].style.opacity = parseFloat(Number(opacity).toFixed(2))
            }
        }
    },

    block(obj) {
        if (obj.canRender) {
            const progress = range(ScrollManager.scrollEased, obj.top, obj.bottom) * 0.01
            const y = lerp(-obj.parallax, obj.parallax, progress)

            obj.$el.style.transform = `translate3d(0, ${y}px, 0)`
        }
    },
}
