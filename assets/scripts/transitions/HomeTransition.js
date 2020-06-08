import Highway from '@dogstudio/highway'
import PageTransition from '../transitions/PageTransition'

class HomeTransition extends Highway.Transition {
    in({ from, to, done }) {
        if (from) {
            PageTransition.slide({
                from,
                to,
                direction: -1,
                done,
            })
        } else {
            // PageTransition.show({ to, done })
            done()
        }
    }

    out({ done }) {
        if (done) done()
    }
}

export default HomeTransition
