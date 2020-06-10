import anime from 'animejs'
import ScrollManager from '../utils/ScrollManager'
import store from '../utils/store'

const easing = 'easeInOutExpo'
const duration = 1500

const PageTransition = {
    slide: ({ from, to, direction, done }) => {
        if (to) {
            to.classList.add('appear-in')
        }

        const timeline = anime.timeline({
            complete: () => {
                ScrollManager.snapTo(0)
                if (to) {
                    to.style = ''
                    to.classList.remove('appear-in')
                }

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
                translateZ: 1,
            },
            {
                targets: to,
                duration,
                easing,
                translateX: [store.windowWidth * direction, 0],
                translateZ: 1,
            },
        ]

        animations.map((anime) => timeline.add(anime, 0))
    },

    show({ to, done, colorTransition, delay }) {
        const animations = []
        const offset = 50
        const color = colorTransition || null
        const left = parseInt(window.getComputedStyle(document.querySelector('.container')).paddingLeft)

        const title = to.querySelector('.js-title')
        const overflowed = title.querySelector('.js-title-overflow')
        const overflowedSpan = overflowed ? overflowed.querySelector('span') : null
        const sentence = to.querySelector('.js-content')
        const background = to.querySelector('.js-background')

        let top = store.windowHeight * 0.5 - title.offsetHeight - left

        const timeline = anime.timeline({
            autoplay: false,
            complete: () => {
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
                translateZ: 0,
            })
        }

        if (sentence) {
            animations.push({
                targets: sentence,
                duration: duration - offset,
                easing,
                translateY: [top + left, 0],
                translateZ: 0,
                delay: offset,
            })
        }

        if (background) {
            animations.push({
                targets: background,
                duration,
                easing,
                scaleY: [0, 1],
                translateZ: 0,
            })
        }

        animations.map((anime) => timeline.add(anime, overflowed ? duration : 0))

        setTimeout(() => {
            timeline.play()
        }, delay || 0)
    },
}

export default PageTransition
