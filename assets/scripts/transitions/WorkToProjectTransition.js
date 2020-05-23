import Highway from '@dogstudio/highway'
import { isFunction } from '../functions/object'
// import anime from 'animejs'

import PageBehavior from './PageBehavior'

class WorkToProjectTransition extends Highway.Transition {
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

    out({ trigger }) {
        console.log()
        // const rect = trigger.getBoundingClientRect().left
        trigger.classList.add('is-active')
        // done()
    }
}

export default WorkToProjectTransition
