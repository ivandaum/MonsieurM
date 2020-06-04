import anime from 'animejs'
import Highway from '@dogstudio/highway'

import PageTransition from '../transitions/PageTransition'

import ScrollManager from '../utils/ScrollManager'
import store from '../utils/store'
import FontLoader from '../utils/FontLoader'

const easing = 'easeInOutExpo'
const duration = 1500

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
                this.firstAnimation({ to, done })
            })
        }
    }

    firstAnimation({ to, done }) {
        const title = to.querySelector('.js-home-title')
        const titleText = title.querySelector('.js-home-titleText')
        const sentence = to.querySelector('.js-home-sentence')
        const background = to.querySelector('.js-home-background')

        const offsetSentence = 50
        const top =
            store.windowHeight * 0.5 - title.querySelector('span').offsetHeight - title.getBoundingClientRect().left

        const timeline = anime.timeline({
            autoplay: false,
            complete: () => {
                ScrollManager.unlockBody()
                if (done) done()
            },
        })

        timeline.add({
            targets: titleText,
            duration,
            easing,
            width: () => {
                return [0, titleText.querySelector('span').offsetWidth]
            },
        })

        const animations = [
            {
                targets: title,
                duration,
                easing,
                translateY: [top, 0],
            },
            {
                targets: sentence,
                duration: duration - offsetSentence,
                easing,
                translateY: [top + offsetSentence, 0],
                delay: offsetSentence,
            },
            {
                targets: background,
                duration,
                easing,
                scaleY: [0, 1],
            },
        ]

        animations.map((anime) => timeline.add(anime, duration))

        timeline.play()
    }

    out({ done }) {
        ScrollManager.lockBody()
        if (done) {
            done()
        }
    }
}

export default HomeTransition
