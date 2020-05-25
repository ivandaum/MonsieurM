import Highway from '@dogstudio/highway'
import { isFunction } from '../functions/object'

class DefaultTransition extends Highway.Transition {
    in({ from, done }) {
        if (from) {
            from.remove()
        }

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
