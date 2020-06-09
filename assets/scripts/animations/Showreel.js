import anime from 'animejs'

import ScrollManager from '../utils/ScrollManager'
import ResizeManager from '../utils/ResizeManager'

const easing = 'easeInOutExpo'
const duration = 1000

export default class Swhoreel {
    constructor({ $view }) {
        this.isOpen = false

        this.$trigger = $view.querySelector('.js-showreel-trigger')
        this.$close = $view.querySelector('.js-showreel-close')

        this.$container = $view.querySelector('.js-showreel')
        this.$background = $view.querySelector('.js-showreel-background')
        this.$wording = $view.querySelector('.js-project-wording')
        this.$wordingHTML = $view.querySelector('.js-project-wording span')
        this.$video = $view.querySelector('.js-showreel .js-video')

        const $triggers = [this.$trigger, this.$close]
        $triggers.forEach((trigger) => trigger.addEventListener('click', () => this.toggle()))
        this.$video.addEventListener('click', () => this.playOrPause())
        this.$video.addEventListener('ended', () => {
            this.$video.currentTime = 0
            this.$wordingHTML.innerHTML = 'Replay'
            this.$wording.classList.add('is-active')
        })

        this.$wordingHTML.style = `width: ${this.$video.offsetWidth}px; height: ${this.$video.offsetHeight}px`
        this.resizeIndex = ResizeManager.addQueue(() => {
            this.$wordingHTML.style = `width: ${this.$video.offsetWidth}px; height: ${this.$video.offsetHeight}px`
        })
    }

    playOrPause() {
        if (this.$video.paused) {
            this.$video.play()
            this.$wording.classList.remove('is-active')
        } else {
            this.$wordingHTML.innerHTML = 'Pause'
            this.$wording.classList.add('is-active')
            this.$video.pause()
        }
    }

    open() {
        this.$video.currentTime = 0
        this.$container.classList.add('is-active')
        ScrollManager.lock()

        return [
            {
                targets: this.$background,
                duration,
                easing,
                scaleY: [0, 1],
            },
            {
                targets: [this.$wording, this.$close, this.$video],
                duration: duration * 0.5,
                easing,
                opacity: [0, 1],
                delay: duration * 0.35,
            },
        ]
    }

    close() {
        this.$video.pause()

        return [
            {
                targets: [this.$video, this.$wording, this.$close],
                duration: duration * 0.5,
                easing,
                opacity: [1, 0],
            },

            {
                targets: this.$background,
                duration,
                easing,
                scaleY: [1, 0],
                delay: 150,
            },
        ]
    }

    toggle() {
        if (!this.isOpen) {
            document.body.classList.add('showreel-open')
        }

        const timeline = anime.timeline({
            autoplay: false,
            complete: () => {
                if (this.isOpen) {
                    this.$container.classList.remove('is-active')
                    this.isOpen = false
                    ScrollManager.unlock()
                    this.$wordingHTML.innerHTML = 'Play'
                    this.$wording.classList.add('is-active')
                    document.body.classList.remove('showreel-open')
                } else {
                    this.isOpen = true
                }
            },
        })

        const animations = this.isOpen ? this.close() : this.open()
        animations.map((anime) => timeline.add(anime, 0))

        timeline.play()
    }
}
