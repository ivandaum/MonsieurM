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

        animations.map((anime) => timeline.add(anime, 0))
    },

    show({ to, done, colorWhite }) {
        const animations = []
        const offset = 50
        const color = () => [colorWhite ? '#000' : '#fff', '#fff']

        const title = to.querySelector('.js-title')

        const overflowed = title.querySelector('.js-title-overflow')
        const overflowedSpan = overflowed ? overflowed.querySelector('span') : null

        const sentence = to.querySelector('.js-content')
        const background = to.querySelector('.js-background')

        let top = store.windowHeight * 0.5 - title.getBoundingClientRect().left
        if (overflowedSpan) {
            top -= overflowedSpan.offsetHeight
        }

        const timeline = anime.timeline({
            autoplay: false,
            complete: () => {
                ScrollManager.unlockBody()
                if (done) done()
            },
        })

        if (overflowed) {
            timeline.add({
                targets: overflowed,
                duration,
                easing,
                width: () => {
                    return [0, overflowedSpan.offsetWidth]
                },
            })
        }

        if (title) {
            animations.push({
                targets: title,
                duration,
                easing,
                color,
                translateY: [top, 0],
            })
        }

        if (sentence) {
            animations.push({
                targets: sentence,
                duration: duration - offset,
                easing,
                translateY: [top + title.getBoundingClientRect().left, 0],
                delay: offset,
            })
        }

        if (background) {
            animations.push({
                targets: background,
                duration,
                easing,
                scaleY: [0, 1],
            })
        }

        animations.map((anime) => timeline.add(anime, overflowed ? duration : 0))
        setTimeout(() => timeline.play(), 1000)
    },
}

export default PageTransition
