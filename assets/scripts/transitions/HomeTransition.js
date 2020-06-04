import anime from 'animejs'
import Highway from '@dogstudio/highway'
import ScrollManager from '../utils/ScrollManager'
import store from '../utils/store'
import FontLoader from '../utils/FontLoader'

const easing = 'easeInOutExpo'
const duration = 1500

class HomeTransition extends Highway.Transition {
    in({ from, to, done }) {
        ScrollManager.snapTo(0)

        if (from) {
            from.remove()
            done()
        } else {
            FontLoader.load('Canela').then(() => {
                const animation = this.firstAnimation({ to, done })

                setTimeout(() => {
                    animation.play()
                }, 300)
            })
        }
    }

    firstAnimation({ to, done }) {
        ScrollManager.lockBody()
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
                document.body.classList.remove('not-loaded')

                if (done) {
                    done()
                }
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

        return timeline
    }

    out({ done }) {
        if (done) {
            done()
        }
    }
}

export default HomeTransition
