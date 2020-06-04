import anime from 'animejs'
import RafManager from '../utils/RafManager'

const easing = 'easeInOutExpo'
const duration = 2000

export default {
    scroll: 0,
    oldScroll: 0,
    spinY: 0,
    bodyLocked: false,
    canScroll: true,
    isScrolling: false,
    funcOnScroll: [],

    init({ view }) {
        window.addEventListener('resize', this.update.bind(this))
        RafManager.addQueue(this.onScroll.bind(this))

        this.$scroller = document.documentElement
        this.$app = document.body.querySelector('main')
        this.$view = view
        this.update({ view })
    },

    update({ view }) {
        if (view) {
            this.$view = view.querySelector('.js-scrollable') || view
        }

        this.canScroll = true
    },

    lockBody() {
        if (this.bodyLocked) {
            return false
        }

        this.bodyLocked = true
        this.canScroll = false

        this.$app.classList.add('locked')
        this.$view.style.transform = `translateY(${-this.scroll}px)`
    },

    unlockBody() {
        this.canScroll = true
        this.bodyLocked = false

        this.$app.classList.remove('locked')
        this.$view.style.transform = ``
        this.$scroller.scrollTo(0, this.scroll)

        document.body.classList.remove('not-loaded')
    },

    addOnScroll(func) {
        this.funcOnScroll.push(func)
        return this.funcOnScroll.length - 1
    },

    removeOnScroll(index) {
        if (this.funcOnScroll[index]) {
            this.funcOnScroll.splice(index, 1)
            return true
        }

        return false
    },

    onScroll() {
        if (!this.canScroll) {
            return false
        }

        this.oldScroll = this.scroll
        this.scroll = this.getScrollTop()

        this.spinY = this.scroll - this.oldScroll
        this.isScrolling = this.spinY !== 0

        this.funcOnScroll.map((func) => func())
    },

    getScrollTop() {
        return window.pageYOffset || this.$scroller.scrollTop
    },

    onResize() {},

    scrollTo({ y, complete }) {
        const targets = { y: this.scroll }

        anime({
            targets,
            y,
            duration,
            easing,
            update: () => {
                this.$scroller.scrollTo(0, targets.y)
            },
            complete,
        })
    },

    snapTo(y) {
        this.$scroller.scrollTo(0, y)
        this.scroll = 0
    },
}
