import Highway from '@dogstudio/highway'
import anime from 'animejs'

import PageTransition from '../transitions/PageTransition'

import FontLoader from '../utils/FontLoader'
import ScrollManager from '../utils/ScrollManager'

class WorkTransition extends Highway.Transition {
    in({ from, to, done }) {
        ScrollManager.lockBody()

        if (from) {
            PageTransition.slide({
                from,
                to,
                direction: 1,
                done,
            })
        } else {
            FontLoader.load('Canela').then(() => {
                this.firstAnimation({ to, done })
            })
        }
    }

    firstAnimation({ to, done }) {
        const timeline = anime.timeline({
            autoplay: false,
            complete: () => {
                ScrollManager.unlockBody()
                if (done) done()
            },
        })
        console.log(to)
        timeline.play()
    }

    out({ done }) {
        ScrollManager.lockBody()
        if (done) {
            done()
        }
    }
}

export default WorkTransition
