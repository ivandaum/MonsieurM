import Highway from '@dogstudio/highway'
// import { isFunction } from '../functions/object'
import anime from 'animejs'
import store from '../utils/store'
import { getScrollTop } from '../functions/dom'

// import PageBehavior from './PageBehavior'

const easing = 'easeInOutExpo'
const duration = 1500

class WorkToProjectTransition extends Highway.Transition {
    in({ from, to, done }) {
        to.classList.add('appear-in')
        const title = to.querySelector('.js-project-title')
        const intro = to.querySelector('.js-project-intro')
        const background = to.querySelector('.js-project-background')
        const color = title.style.color

        const timeline = anime.timeline({
            complete: () => {
                store.unlockDOM()
                from.remove()
                to.classList.remove('appear-in')
                done()
            },
        })

        timeline
            .add({
                targets: title,
                duration,
                easing,
                translateY: ['-20vh', '0'],
                color: ['rgb(0,0,0)', color],
            })
            .add(
                {
                    targets: intro,
                    duration,
                    easing,
                    translateY: ['10vh', '0'],
                    opacity: [0, 1],
                },
                0,
            )
            .add(
                {
                    targets: background,
                    duration,
                    easing,
                    height: [0, '100%'],
                },
                0,
            )
    }

    out({ from, trigger, done }) {
        const word = trigger.querySelector('.js-fade-item')
        const scroll = { y: getScrollTop() }
        const hitbox = trigger.getBoundingClientRect()
        const parentHitbox = trigger.parentNode.getBoundingClientRect()

        const y = scroll.y + hitbox.top - store.windowHeight * 0.3
        const x = hitbox.left - parentHitbox.left

        trigger.classList.add('is-active')
        from.classList.add('locked')
        store.lockDOM()
        from.scrollTo(0, scroll.y)

        const timeline = anime.timeline({
            complete: () => {
                done()
                word.style.opacity = 0
            },
        })

        timeline
            .add({
                targets: word,
                translateX: -x,
                duration,
                easing,
            })
            .add(
                {
                    targets: scroll,
                    y,
                    update: () => {
                        from.scrollTo(0, scroll.y)
                    },
                    duration,
                    easing,
                },
                0,
            )
    }
}

export default WorkToProjectTransition
