import Highway from '@dogstudio/highway'
import anime from 'animejs'
import store from '../utils/store'
import { getScrollTop } from '../functions/dom'

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
                if (from) from.remove()
                to.classList.remove('appear-in')
                if (done) done()
            },
        })

        const offset = this.hitbox ? this.hitbox.top : store.windowHeight * 0.55
        const top = offset - store.windowHeight * 0.5
        timeline
            .add({
                targets: title,
                duration,
                easing,
                translateY: [top, '0'],
                color: ['rgb(0,0,0)', color],
                opacity: () => {
                    return [from ? 1 : 0, 1]
                },
            })
            .add(
                {
                    targets: intro,
                    duration,
                    easing,
                    translateY: [top + 100, 0],
                    opacity: {
                        value: [0, 1],
                    },
                },
                0,
            )
            .add(
                {
                    targets: background,
                    duration,
                    easing,
                    scaleY: [0, 1],
                },
                0,
            )
    }

    out({ from, trigger, done }) {
        if (from.dataset.routerView === 'project') {
            return done()
        }

        trigger.classList.add('is-active')

        this.hitbox = trigger.getBoundingClientRect()

        const scroll = { y: getScrollTop() }
        const parentHitbox = trigger.parentNode.getBoundingClientRect()
        const margin = parentHitbox.left

        const words = trigger.querySelectorAll('.js-fade-item span')

        const translatesX = []

        let offset = [0, 0]
        words.forEach((word, i) => {
            const r = word.getBoundingClientRect()

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

        anime({
            targets: words,
            translateX: (el, i) => {
                return translatesX[i]
            },
            duration,
            easing,
            complete: () => {
                done()
                words.forEach((word) => (word.style.opacity = 0))
            },
        })
    }
}

export default WorkToProjectTransition
