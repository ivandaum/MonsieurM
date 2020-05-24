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
        trigger.classList.add('is-active')

        const scroll = { y: getScrollTop() }
        const hitbox = trigger.getBoundingClientRect()
        const parentHitbox = trigger.parentNode.getBoundingClientRect()
        const margin = parentHitbox.left
        const y = scroll.y + hitbox.top - store.windowHeight * 0.3

        const words = trigger.querySelectorAll('.js-fade-item span')
        const translatesX = []

        let offset = [0, 0]
        words.forEach((word, i) => {
            const r = word.getBoundingClientRect()
            console.log(word.innerHTML)

            if (offset[1] !== r.y) {
                offset = [0, r.y]
            } else if (i > 0) {
                const prevWord = words[i - 1].getBoundingClientRect()
                const spaceBetweenWords = r.left - prevWord.left - prevWord.width
                offset[0] += spaceBetweenWords + prevWord.width
            }

            const x = r.left - margin - offset[0]
            translatesX.push(-x)
        })

        store.lockDOM()
        from.classList.add('locked')
        from.scrollTo(0, scroll.y)

        const timeline = anime.timeline({
            complete: () => {
                done()
                words.forEach((word) => (word.style.opacity = 0))
            },
        })
        timeline
            .add({
                targets: scroll,
                y,
                update: () => {
                    from.scrollTo(0, scroll.y)
                },
                duration,
                easing,
            })
            .add(
                {
                    targets: words,
                    translateX: (el, i) => {
                        return translatesX[i]
                    },
                    duration,
                    easing,
                },
                0,
            )
    }
}

export default WorkToProjectTransition
