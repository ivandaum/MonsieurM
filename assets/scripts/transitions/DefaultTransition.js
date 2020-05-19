import Highway from '@dogstudio/highway'
import { isFunction } from '../functions/object'

import PageBehavior from './PageBehavior'

class DefaultTransition extends Highway.Transition {
    in({ from, to, done }) {
        PageBehavior.show({
            to,
            from,
            done: () => {
                if (done && isFunction(done)) {
                    done()
                }
            },
        })
    }

    out({ from, done }) {
        PageBehavior.hide({ from })
        done()
    }
}

export default DefaultTransition
