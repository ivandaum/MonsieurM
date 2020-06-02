import Highway from '@dogstudio/highway'
import { isFunction } from '../functions/object'
import ScrollManager from '../utils/ScrollManager'

class DefaultTransition extends Highway.Transition {
    in({ from, done }) {
        if (from) {
            from.remove()
        }

        ScrollManager.snapTo(0)

        if (isFunction(done)) {
            done()
        }
    }

    out({ done }) {
        if (isFunction(done)) {
            done()
        }
    }
}

export default DefaultTransition
