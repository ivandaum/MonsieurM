// import normalize from 'normalize-wheel'
import ScrollManager from './ScrollManager'

export default {
    init() {
        this.setGlobalVars()
        this.updateOnNavigation()
    },

    setGlobalVars() {
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth

        // ---> stackoverflow.com/a/57800404
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        const vh = window.innerHeight * 0.01
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    },

    updateOnNavigation() {
        const $scrollToTop = document.querySelector('.js-scroll-top')
        if ($scrollToTop) $scrollToTop.addEventListener('click', () => ScrollManager.scrollTo({ y: 0 }))
    },
}
