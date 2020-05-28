// import { getScrollTop } from '../functions/dom'

import RafManager from '../utils/RafManager'

export default {
    scroll: 0,
    oldScroll: 0,
    spinY: 0,
    bodyLocked: false,
    canScroll: true,
    init({ view }) {
        window.addEventListener('resize', this.update.bind(this))
        RafManager.addQueue(this.onScroll.bind(this))

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
        this.$view.style.transform = `translateY(0px)`
        this.$app.classList.remove('locked')
        this.$app.scrollTo(0, this.scroll)
        this.canScroll = true
        this.bodyLocked = false
    },

    onScroll() {
        if (!this.canScroll) {
            return false
        }

        this.oldScroll = this.scroll
        this.scroll = this.getScrollTop()

        this.spinY = this.scroll - this.oldScroll
    },

    getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop
    },

    onResize() {},
}
