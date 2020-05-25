// import normalize from 'normalize-wheel'
import { getScrollTop } from '../functions/dom'

export default {
    init() {
        this.setGlobalVars()

        window.addEventListener('scroll', this.onScroll.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))

        this.funcOnResize = []
    },

    onScroll() {
        this.scroll = getScrollTop()
    },

    onResize() {
        this.setGlobalVars()
        this.funcOnResize.forEach((func) => func())
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

    addOnResize(func) {
        this.funcOnResize.push(func)
        return this.funcOnResize.length - 1
    },

    removeOnResize(index) {
        if (this.funcOnResize[index]) {
            this.funcOnResize.splice(index, 1)
            return true
        }

        return false
    },
}
