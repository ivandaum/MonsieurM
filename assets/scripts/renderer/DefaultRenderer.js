import Highway from '@dogstudio/highway'
// import anime from 'animejs'
import Lazyloading from '../vendor/Lazyloading'
// import { scrollTo } from '../functions/dom'
// import breakpoints from '../utils/breakpoints'
// import store from '../utils/store'

// const duration = 1000
// const easing = 'easeInOutQuart'

class DefaultRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onEnter() {
        // const $view = this.wrap
        this.Lazyloading = new Lazyloading({
            load_delay: 0,
            elements_selector: 'img',
            use_native: false,
        })
    }
}

export default DefaultRenderer
