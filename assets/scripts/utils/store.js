// import normalize from 'normalize-wheel'
import { getScrollTop } from '../functions/dom'

export default {
    init() {
        this.setGlobalVars()

        window.addEventListener('scroll', this.onScroll.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
    },

    onScroll() {
        this.scroll = getScrollTop()
    },

    onResize() {
        this.setGlobalVars()
    },

    setGlobalVars() {
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth
        this.scroll = 0
    },

    lockDOM() {
        document.querySelector('main').classList.add('locked')
    },

    unlockDOM() {
        document.querySelector('main').classList.remove('locked')
    },
}
