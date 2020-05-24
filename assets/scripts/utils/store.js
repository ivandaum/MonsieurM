// import breakpoints from '../utils/breakpoints'
// import { getScrollTop } from '../functions/dom'

export default {
    setGlobalVars() {
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth
    },

    lockDOM() {
        document.querySelector('main').classList.add('locked')
    },

    unlockDOM() {
        document.querySelector('main').classList.remove('locked')
    },
}
