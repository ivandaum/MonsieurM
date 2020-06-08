import Highway from '@dogstudio/highway'
import PageTransition from '../transitions/PageTransition'

class LabTransition extends Highway.Transition {
    in({ from, to, done }) {
        if (from) {
            PageTransition.slide({
                from,
                to,
                direction: from.dataset.routerView === 'home' ? 1 : -1,
                done,
            })
        } else {
            PageTransition.show({ to, done, colorTransition: ['#000', '#fff'] })
        }
    }

    out({ done }) {
        if (done) done()
    }
}

export default LabTransition
