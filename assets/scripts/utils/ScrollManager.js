import anime from 'animejs'
import RafManager from '../utils/RafManager'
import breakpoints from '../constants/breakpoints'
import store from '../utils/store'
import ResizeManager from '../utils/ResizeManager'

const easing = 'easeInOutExpo'
const duration = 1000

export default {
    scroll: 0,
    scrollEased: 0,
    oldScroll: 0,
    spinY: 0,
    bodyLocked: false,
    canScroll: true,
    isScrolling: false,
    funcOnScroll: [],
    isDesktop: true,

    init() {
        this.$scroller = document.querySelector('.scroller')
        this.$height = document.querySelector('.js-scroller-height')
        this.$app = document.body.querySelector('main')

        RafManager.addQueue(this.onScroll.bind(this))
        ResizeManager.addQueue(() => this.setHeight())
    },

    update({ $view }) {
        this.canScroll = true
        this.$view = $view.classList.contains('js-view') ? $view : $view.querySelector('.js-view')
        this.unlock()
    },

    setHeight() {
        this.isDesktop = store.windowWidth > breakpoints.desktop

        if (this.$view) {
            this.$height.style.height = `${this.$view.offsetHeight - store.windowHeight}px`
        }
    },

    lock() {
        if (this.bodyLocked) {
            return false
        }

        this.$height.style.height = '0px'
        this.bodyLocked = true
        this.canScroll = false
        this.$scroller.scrollTo(0, 0)

        document.body.classList.add('locked')

        this.$view.style.transform = `translate3d(0, ${-this.scroll}px, 0)`
        if (!this.isDesktop) {
            this.$view.style.transform = `translate3d(0, ${-this.scroll}px, 0)`
        }
    },

    unlock() {
        this.canScroll = true
        this.bodyLocked = false
        this.setHeight()
        document.body.classList.remove('not-loaded', 'locked')

        if (!this.isDesktop) {
            this.$view.style.transform = `translate3d(0, 0, 0)`
        }

        this.snapTo(this.scroll)
    },

    onScroll() {
        if (!this.canScroll || !this.$view) {
            return false
        }

        this.oldScroll = this.scroll
        this.scroll = this.getScrollTop()
        this.scrollEased += (this.scroll - this.scrollEased) * 0.3
        this.spinY = this.scroll - this.oldScroll
        this.isScrolling = this.spinY !== 0

        this.funcOnScroll.map((func) => func())

        if (this.$view && this.isDesktop) {
            this.$view.style.transform = `translate3d(0, ${-Math.round(this.scrollEased)}px, 0)`
        }
    },

    getScrollTop() {
        return window.pageYOffset || this.$scroller.scrollTop
    },

    /** On scroll events */

    addQueue(func) {
        this.funcOnScroll.push(func)
        return this.funcOnScroll.length - 1
    },

    removeQueue(index) {
        if (this.funcOnScroll[index]) {
            this.funcOnScroll.splice(index, 1)
            return true
        }

        return false
    },

    /** DOM functions */

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
        this.scroll = y
        this.scrollEased = y
    },
}
