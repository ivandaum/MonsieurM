import Highway from '@dogstudio/highway'
import Lazyloading from '../vendor/Lazyloading'

// import anime from 'animejs'
// import { scrollTo } from '../functions/dom'
// import breakpoints from '../utils/breakpoints'
// import store from '../utils/store'

// const duration = 1000
// const easing = 'easeInOutQuart'

class WorkRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onEnterCompleted() {
        const $view = this.wrap
        this.Lazyloading = new Lazyloading({
            load_delay: 0,
            elements_selector: 'img',
            use_native: false,
        })

        this.activeCover = null

        this.$links = $view.querySelectorAll('.js-project-link')
        this.$fades = $view.querySelectorAll('.js-fade-item')

        this.$links.forEach((btn) => {
            const id = parseInt(btn.dataset.project)
            btn.addEventListener('mouseenter', () => this.hideAllBut(id))
            btn.addEventListener('mouseleave', () => this.showAll())
        })
    }

    hideAllBut(id) {
        this.$fades.forEach((item) => {
            item.style.opacity = parseInt(item.dataset.project) === id ? 1 : 0
        })
    }

    showAll() {
        this.$fades.forEach((item) => {
            item.style.opacity = 1
        })
    }
}

export default WorkRenderer
