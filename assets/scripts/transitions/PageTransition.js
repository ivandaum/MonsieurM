import anime from 'animejs'
import ScrollManager from '../utils/ScrollManager'
import store from '../utils/store'

const easing = 'easeInOutExpo'
const duration = 1500

const PageTransition = {
    slide: ({ from, to, direction, done }) => {
        to.classList.add('appear-in')

        const timeline = anime.timeline({
            complete: () => {
                ScrollManager.snapTo(0)

                to.style = ''
                to.classList.remove('appear-in')

                ScrollManager.unlockBody()

                if (from) {
                    from.remove()
                }

                if (done) {
                    done()
                }
            },
        })
        const animations = [
            {
                targets: from,
                duration,
                easing,
                translateX: [0, store.windowWidth * -direction],
            },
            {
                targets: to,
                duration,
                easing,
                translateX: [store.windowWidth * direction, 0],
            },
        ]

        animations.map((anime) => timeline.add(anime, duration))
    },
}

export default PageTransition
