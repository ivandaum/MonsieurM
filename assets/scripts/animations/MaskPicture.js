import Lazyloading from '../vendor/Lazyloading'

import breakpoints from '../constants/breakpoints'
import RafManager from '../utils/RafManager'
import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'
import FontLoader from '../utils/FontLoader'

const INTIAL_RATIO = 0.3
export default class MaskPicture {
    constructor({ $view }) {
        this.$container = $view.querySelector('.js-picture')
        this.$canvas = $view.querySelector('.js-picture-canvas')
        this.$picture = $view.querySelector('.js-picture picture')
        this.$img = this.$picture.querySelector('img')
        this.$circle = $view.querySelector('.js-picture-circle')

        this.raf = []
        this.ctx = this.$canvas.getContext('2d')

        this.loadBackground()
        this.loadGif()
        this.loadCircle()

        this.canRender = false

        this.top = 0
        this.cursor = [store.windowWidth * 0.5, 0]
        FontLoader.load('Canela').then(() => {
            this.top = this.$container.getBoundingClientRect().top
        })

        this.$container.addEventListener('mousemove', (e) => (this.cursor = [e.x, e.y]))

        if (store.windowWidth >= breakpoints.tablet) {
            this.raf.push(RafManager.addQueue(this.render.bind(this)))
        }

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.canRender = isIntersecting
        })

        observer.observe(this.$container)
    }

    loadCircle() {
        this.circle = {
            canRender: true,
            size: store.windowWidth * 0.4,
            ratio: INTIAL_RATIO,
            x: 0,
            y: 0,
            xEased: 0,
            yEased: 0,
        }

        this.$circle.style = `width: ${this.circle.size}px; height: ${this.circle.size}px;`
    }

    loadGif() {
        this.gif = {
            $el: new Image(),
            canRender: false,
            width: 0,
            height: 0,
            top: 0,
            left: 0,
        }

        this.gif.$el.onload = () => {
            const ratio = this.gif.$el.height / this.gif.$el.width

            this.gif.width = store.windowWidth * 0.45
            this.gif.height = this.gif.width * ratio
            this.gif.canRender = true
            this.gif.left = store.windowWidth * 0.5 - this.gif.width * 0.5 - store.windowWidth * 0.05 // 5%
        }

        this.gif.$el.src = this.$container.dataset.gif
    }

    loadBackground() {
        this.background = {
            $el: null,
            width: 0,
            height: 0,
        }

        new Lazyloading({
            load_delay: 0,
            elements_selector: '.js-picture img',
            use_native: false,
            callback_loaded: (el) => {
                if (store.windowWidth < breakpoints.tablet) {
                    el.parentNode.classList.add('loaded')
                    return false
                }

                this.background.$el = el
                this.background.width = el.width
                this.background.height = el.height

                const ratio = el.width / el.height

                this.$canvas.width = store.windowWidth
                this.$canvas.height = store.windowWidth * ratio

                this.gif.top = el.height * 0.18
                this.$picture.classList.add('is-hidden')
                this.$canvas.style = `background-image: url(${el.currentSrc})`
            },
        })
    }

    render() {
        if (!this.canRender) return false

        this.ctx.clearRect(0, 0, this.background.width, this.background.height)
        this.ctx.globalCompositeOperation = 'source-over'

        if (this.gif.canRender) {
            this.ctx.drawImage(this.gif.$el, this.gif.left, this.gif.top, this.gif.width, this.gif.height)
        }

        this.ctx.globalCompositeOperation = 'destination-out'

        if (this.circle.canRender) {
            const diff = ScrollManager.scroll - this.top

            const top = this.gif.top - diff
            const left = this.gif.left
            const bottom = top + this.gif.height
            const right = left + this.gif.width

            if (this.cursor[0] > left && this.cursor[0] < right && this.cursor[1] > top && this.cursor[1] < bottom) {
                this.circle.x = this.gif.left + this.gif.width * 0.5
                this.circle.y = this.gif.top + this.gif.height * 0.5
                this.circle.ratio += (1 - this.circle.ratio) * 0.1
            } else {
                this.circle.x = this.cursor[0]
                this.circle.y = this.cursor[1] + diff
                this.circle.ratio += (INTIAL_RATIO - this.circle.ratio) * 0.1
            }

            this.circle.xEased += (this.circle.x - this.circle.xEased) * 0.1
            this.circle.yEased += (this.circle.y - this.circle.yEased) * 0.1

            const size = this.circle.size * 0.5

            this.ctx.beginPath()
            this.ctx.arc(this.circle.xEased, this.circle.yEased, size * this.circle.ratio, 0, 2 * Math.PI)
            this.ctx.fill()
            this.ctx.closePath()

            const imgX = this.circle.xEased - size
            const imgY = this.circle.yEased - size
            this.$circle.style.transform = `translate(${imgX}px,${imgY}px) scale(${this.circle.ratio})`
        }
    }
}
