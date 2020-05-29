import Highway from '@dogstudio/highway'
import anime from 'animejs'

import Videos from '../binders/Videos'
import Images from '../binders/Images'

import breakpoints from '../constants/breakpoints'
import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'
import RafManager from '../utils/RafManager'

const easing = 'easeInOutExpo'
const duration = 1500

class HomeRenderer extends Highway.Renderer {
    onLeaveCompleted() {
        this.raf.map((raf) => RafManager.removeQueue(raf))
    }

    onEnterCompleted() {
        const $view = this.wrap

        this.raf = []
        this.rotate = 0

        this.$rotatingCircle = $view.querySelector('.js-circle-rotate')

        this.$srTriggers = $view.querySelectorAll('.js-showreel-trigger')
        this.$srContainer = $view.querySelector('.js-showreel')
        this.$srBackground = $view.querySelector('.js-showreel-background')
        this.$srVideo = $view.querySelector('.js-showreel .js-video')
        this.isSrOpen = false

        const videos = $view.querySelectorAll('.js-video')
        Videos.bindAll(videos)
        Videos.resizeAll(videos)

        Images.lazyload()

        this.$srTriggers.forEach((trigger) => trigger.addEventListener('click', () => this.toggleShowreel()))

        if (store.windowWidth >= breakpoints.tablet) {
            this.raf.push(RafManager.addQueue(this.renderRotatingCircle.bind(this)))
        }
    }

    renderRotatingCircle() {
        this.rotate += ScrollManager.spinY * 0.3

        if (this.rotate < 0) {
            this.rotate = 360
        } else if (this.rotate > 360) {
            this.rotate = 0
        }

        this.$rotatingCircle.style.transform = `rotate(${this.rotate}deg)`
    }

    toggleShowreel() {
        const timeline = anime.timeline({
            autoplay: false,
            complete: () => {
                if (this.isSrOpen) {
                    this.$srContainer.classList.remove('ignore-locked', 'is-active')
                    this.isSrOpen = false
                    ScrollManager.unlockBody()
                } else {
                    this.isSrOpen = true
                }
            },
        })
        const animations = []

        if (this.isSrOpen) {
            animations.push(
                {
                    targets: this.$srBackground,
                    duration,
                    easing,
                    scaleY: [1, 0],
                    delay: 150,
                },
                {
                    targets: this.$srVideo,
                    duration,
                    easing,
                    opacity: [1, 0],
                    translateY: [0, 100],
                },
            )
        } else {
            this.$srContainer.classList.add('ignore-locked', 'is-active')
            ScrollManager.lockBody()

            Videos.resizeVideo(this.$srVideo)

            animations.push(
                {
                    targets: this.$srBackground,
                    duration,
                    easing,
                    scaleY: [0, 1],
                },
                {
                    targets: this.$srVideo,
                    duration,
                    easing,
                    opacity: {
                        value: [0, 1],
                        delay: 150,
                    },
                    translateY: [200, 0],
                },
            )
        }
        animations.map((anime) => timeline.add(anime, 0))

        setTimeout(() => {
            timeline.play()
        }, 100)
    }
}

export default HomeRenderer
