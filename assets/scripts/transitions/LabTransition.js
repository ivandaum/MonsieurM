import Highway from '@dogstudio/highway'

import PageTransition from '../transitions/PageTransition'

import FontLoader from '../utils/FontLoader'
import ScrollManager from '../utils/ScrollManager'

class LabTransition extends Highway.Transition {
    in({ from, to, done }) {
        ScrollManager.lockBody()

        if (from) {
            PageTransition.slide({
                from,
                to,
                direction: from.dataset.routerView === 'project' ? -1 : 1,
                done,
            })
        } else {
            FontLoader.load('Canela').then(() => {
                // PageTransition.show({ to, done, colorWhite: true })
                ScrollManager.unlockBody()
                if (done) done()
            })
        }
    }

    out({ done }) {
        ScrollManager.lockBody()
        if (done) done()
    }
}

export default LabTransition
