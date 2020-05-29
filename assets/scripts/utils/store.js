// import normalize from 'normalize-wheel'
import ScrollManager from './ScrollManager'

export default {
    init() {
        this.setGlobalVars()
    },

    setGlobalVars() {
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth
    },

    updateOnNavigation() {
        const $scrollToTop = document.querySelector('.js-scroll-top')
        if ($scrollToTop) $scrollToTop.addEventListener('click', () => ScrollManager.scrollTo({ y: 0 }))
    },
}
