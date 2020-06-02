import anime from 'animejs'

import ScrollManager from '../utils/ScrollManager'

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
        this.$video = $view.querySelector('.js-showreel .js-video')

        const $triggers = [this.$trigger, this.$close]
        $triggers.forEach((trigger) => trigger.addEventListener('click', () => this.toggle()))
        this.$video.addEventListener('click', () => this.playOrPause())
        this.$video.addEventListener('ended', () => {
            this.$video.currentTime = 0
            this.$wording.querySelector('span').innerHTML = 'Replay'
            this.$wording.classList.add('is-active')
        })

        this.toggle()
    }

    playOrPause() {
        if (this.$video.paused) {
            this.$video.play()
            this.$wording.classList.remove('is-active')
        } else {
            this.$wording.querySelector('span').innerHTML = 'Pause'
            this.$wording.classList.add('is-active')
            this.$video.pause()
        }
    }

    open() {
        this.$video.currentTime = 0
        this.$container.classList.add('ignore-locked', 'is-active')
        ScrollManager.lockBody()

        return [
            {
                targets: this.$background,
                duration,
                easing,
                scaleY: [0, 1],
            },
            {
                targets: [this.$wording, this.$close],
                duration,
                easing,
                opacity: {
                    value: [0, 1],
                    duration: duration * 0.5,
                    delay: 250,
                },
                translateY: [-20, 0],
            },
            {
                targets: this.$video,
                duration,
                easing,
                opacity: {
                    value: [0, 1],
                    delay: 50,
                },
                translateY: ['10%', 0],
            },
        ]
    }

    close() {
        this.$video.pause()

        return [
            {
                targets: [this.$wording, this.$close],
                duration,
                easing,
                opacity: {
                    value: [1, 0],
                    duration: duration * 0.5,
                },
                translateY: [0, 50],
            },
            {
                targets: this.$video,
                duration,
                easing,
                opacity: [1, 0],
                translateY: [0, '10%'],
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
        const timeline = anime.timeline({
            autoplay: false,
            complete: () => {
                if (this.isOpen) {
                    this.$container.classList.remove('ignore-locked', 'is-active')
                    this.isOpen = false
                    ScrollManager.unlockBody()
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
