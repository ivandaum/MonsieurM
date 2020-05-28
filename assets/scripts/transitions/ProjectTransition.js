import Highway from '@dogstudio/highway'
import anime from 'animejs'

import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'

const easing = 'easeInOutExpo'
const duration = 1500

class ProjectTransition extends Highway.Transition {
    in({ from, to, done }) {
        to.classList.add('appear-in')

        const title = to.querySelector('.js-project-title')
        const intro = to.querySelector('.js-project-intro')
        const background = to.querySelector('.js-project-background')

        const color = title.style.color
        const offset = this.hitbox ? this.hitbox.top : store.windowHeight * 0.55
        const top = offset - store.windowHeight * 0.5

        const timeline = anime.timeline({
            complete: () => {
                to.classList.remove('appear-in')

                if (from) from.remove()
                if (done) done()

                ScrollManager.unlockBody()
            },
        })

        ScrollManager.lockBody()

        const animations = [
            {
                targets: title,
                duration,
                easing,
                translateY: [top, '0'],
                color: ['#000', color],
                opacity: () => {
                    return [from.dataset.routerView === 'work' ? 1 : 0, 1]
                },
            },
            {
                targets: intro,
                duration,
                easing,
                translateY: [top + 100, 0],
                opacity: {
                    value: [0, 1],
                },
            },
            {
                targets: background,
                duration,
                easing,
                scaleY: [0, 1],
            },
        ]

        animations.map((anime) => timeline.add(anime, 0))
    }

    out({ from, trigger, done }) {
        if (from.dataset.routerView === 'project') {
            return done()
        }

        trigger.classList.add('is-active')
        this.hitbox = trigger.getBoundingClientRect()

        const margin = trigger.parentNode.getBoundingClientRect().left
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

        ScrollManager.lockBody()

        anime({
            targets: words,
            translateX: (el, i) => {
                return translatesX[i]
            },
            duration,
            easing,
            complete: () => {
                words.forEach((word) => word.remove())
                done()
            },
        })
    }
}

export default ProjectTransition
