import Lazyloading from '../vendor/Lazyloading'

import RafManager from '../utils/RafManager'
import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'
import ResizeManager from '../utils/ResizeManager'

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
        this.canRender = false

        this.initalTop = 0
        this.top = this.initalTop

        this.cursor = [store.windowWidth * 0.5, 0]

        this.$container.addEventListener('mousemove', (e) => (this.cursor = [e.x, e.y]))
        this.$container.addEventListener('mouseenter', () => (this.isFocused = true))
        this.$container.addEventListener('mouseleave', () => (this.isFocused = false))

        this.raf.push(RafManager.addQueue(this.render.bind(this)))

        const observer = new IntersectionObserver((changes) => {
            const [{ isIntersecting }] = changes
            this.canRender = isIntersecting

            if (this.initalTop === 0 && isIntersecting) {
                this.initalTop = this.$container.offsetTop
            }
        })
        observer.observe(this.$container)

        this.onResize()
        this.resizeIndex = ResizeManager.addQueue(() => {
            this.initalTop = this.$container.offsetTop
            this.onResize()
        })
    }

    onResize() {
        this.loadBackground()
        this.loadGif()
        this.loadCircle()
    }

    loadBackground() {
        this.background = {
            $el: null,
            width: this.$container.offsetWidth,
            height: this.$container.offsetHeight,
        }

        this.$canvas.style.width = this.background.width + 'px'
        this.$canvas.style.height = this.background.height + 'px'

        this.$canvas.width = this.background.width
        this.$canvas.height = this.background.height

        new Lazyloading({
            load_delay: 0,
            elements_selector: '.js-picture img',
            use_native: false,
            callback_loaded: (el) => {
                this.background.$el = el
                this.$picture.classList.add('is-hidden')
                this.$canvas.style.backgroundImage = `url(${el.currentSrc})`
            },
        })
    }

    loadGif() {
        this.gif = {
            $el: [],
            canRender: false,
            width: 0,
            height: 0,
            top: this.background.height * 0.2,
            left: 0,
            index: 0,
        }

        for (let i = 1; i <= 5; i++) {
            const img = new Image()
            img.onload = () => {
                if (this.gif.width === 0) {
                    const ratio = img.height / img.width

                    this.gif.width = this.background.width * 0.33
                    this.gif.height = this.gif.width * ratio
                    this.gif.left = this.background.width * 0.5 - this.gif.width * 0.5 - this.background.width * 0.05 // 5%
                    this.gif.canRender = true
                }
            }
            img.src = this.$container.dataset.gifpath + i + '.png'
            this.gif.$el.push(img)
        }
    }

    loadCircle() {
        this.circle = {
            canRender: true,
            size: this.background.width * 0.4,
            ratio: INTIAL_RATIO,
            x: 0,
            y: 0,
            xEased: 0,
            yEased: 0,
        }

        this.$circle.style = `width: ${this.circle.size}px; height: ${this.circle.size}px;`
    }

    render() {
        if (!this.canRender) return false

        this.top = this.initalTop - ScrollManager.scroll
        const cursor = [this.cursor[0], this.cursor[1] - this.top]

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

            const top = this.gif.top
            const left = this.gif.left
            const bottom = top + this.gif.height
            const right = left + this.gif.width

            if (cursor[0] > left && cursor[0] < right && cursor[1] > top && cursor[1] < bottom) {
                this.circle.x = this.gif.left + this.gif.width * 0.5
                this.circle.y = this.gif.top + this.gif.height * 0.5
                this.circle.ratio += (1 - this.circle.ratio) * 0.1
            } else {
                this.circle.x = cursor[0]
                this.circle.y = cursor[1]

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
            this.$circle.style.transform = `translate3d(${imgX}px,${imgY}px, 0) scale(${this.circle.ratio})`
        }
    }
}
