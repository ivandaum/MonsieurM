import Highway from '@dogstudio/highway'
import PageTransition from '../transitions/PageTransition'

class WorkTransition extends Highway.Transition {
    in({ from, to, done }) {
        if (from) {
            PageTransition.slide({
                from,
                to,
                direction: from.dataset.routerView === 'project' ? -1 : 1,
                done,
            })
        } else {
            PageTransition.show({ to, done })
        }
    }

    out({ done }) {
        if (done) done()
    }
}

export default WorkTransition
