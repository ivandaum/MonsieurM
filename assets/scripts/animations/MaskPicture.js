import Lazyloading from '../vendor/Lazyloading'

import breakpoints from '../constants/breakpoints'
import RafManager from '../utils/RafManager'
import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'

const INTIAL_RATIO = 0.2
export default class MaskPicture {
    constructor({ $view }) {
        this.$container = $view.querySelector('.js-picture')
        this.$canvas = $view.querySelector('.js-picture-canvas')
        this.$picture = $view.querySelector('.js-picture picture')
        this.$img = this.$picture.querySelector('img')
        this.$circle = $view.querySelector('.js-picture-circle')

        this.raf = []
        this.ctx = this.$canvas.getContext('2d')
        this.isFocused = false

        this.loadBackground()
        this.loadGif()
        this.loadCircle()

        this.canRender = false

        this.top = this.$container.getBoundingClientRect().top
        this.cursor = [store.windowWidth * 0.5, 0]

        this.$container.addEventListener('mousemove', (e) => (this.cursor = [e.x, e.y]))
        this.$container.addEventListener('mouseenter', () => (this.isFocused = true))
        this.$container.addEventListener('mouseleave', () => (this.isFocused = false))

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
            $el: [],
            canRender: false,
            width: 0,
            height: 0,
            top: this.$canvas.height * 0.2,
            left: 0,
            loaded: 0,
            index: 0,
        }

        for (let i = 1; i <= 5; i++) {
            const img = new Image()
            img.onload = () => this.onGifLoad(img)
            img.src = this.$container.dataset.gifpath + i + '.png'
            this.gif.$el.push(img)
        }
    }

    onGifLoad(img) {
        this.gif.loaded += 1

        if (this.gif.width === 0) {
            const ratio = img.height / img.width

            this.gif.width = store.windowWidth * 0.33
            this.gif.height = this.gif.width * ratio
            this.gif.left = store.windowWidth * 0.5 - this.gif.width * 0.5 - store.windowWidth * 0.05 // 5%
            this.gif.canRender = true
        }
    }

    loadBackground() {
        this.background = {
            $el: null,
            width: this.$picture.offsetWidth,
            height: this.$picture.offsetHeight,
        }

        const ratio = this.background.height / this.background.width

        this.$canvas.width = store.windowWidth
        this.$canvas.height = store.windowWidth * ratio

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
            this.gif.index += 0.15
            if (this.gif.index > this.gif.$el.length) {
                this.gif.index = 0
            }

            this.ctx.drawImage(
                this.gif.$el[Math.floor(this.gif.index)],
                this.gif.left,
                this.gif.top,
                this.gif.width,
                this.gif.height,
            )
        }

        this.ctx.globalCompositeOperation = 'destination-out'

        if (this.circle.canRender) {
            const size = this.circle.size * 0.5
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

                const ratio = this.isFocused ? INTIAL_RATIO : 0
                const easing = this.isFocused ? 0.1 : 0.3
                this.circle.ratio += (ratio - this.circle.ratio) * easing

                const topLimit = size * this.circle.ratio
                const bottomLimit = this.background.height - size * this.circle.ratio

                if (this.circle.y < topLimit) {
                    this.circle.y = topLimit
                } else if (this.circle.y > bottomLimit) {
                    this.circle.y = bottomLimit
                }
            }

            this.circle.xEased += (this.circle.x - this.circle.xEased) * 0.1
            this.circle.yEased += (this.circle.y - this.circle.yEased) * 0.1

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
