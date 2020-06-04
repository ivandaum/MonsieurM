import Highway from '@dogstudio/highway'

import PageTransition from '../transitions/PageTransition'

import ScrollManager from '../utils/ScrollManager'
import FontLoader from '../utils/FontLoader'

class HomeTransition extends Highway.Transition {
    in({ from, to, done }) {
        ScrollManager.lockBody()

        if (from) {
            PageTransition.slide({
                from,
                to,
                direction: -1,
                done,
            })
        } else {
            FontLoader.load('Canela').then(() => {
                PageTransition.show({ to, done })
            })
        }
    }

    out({ done }) {
        ScrollManager.lockBody()
        if (done) done()
    }
}

export default HomeTransition
