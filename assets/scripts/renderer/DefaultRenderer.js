import Highway from '@dogstudio/highway'
import Lazyloading from '../vendor/Lazyloading'
import Videos from '../tools/Video'

// import anime from 'animejs'
// import { scrollTo } from '../functions/dom'
// import breakpoints from '../utils/breakpoints'
// import store from '../utils/store'

// const duration = 1000
// const easing = 'easeInOutQuart'

class DefaultRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onEnterCompleted() {
        const $view = this.wrap

        const videos = $view.querySelectorAll('.js-video')
        Videos.bindAll(videos)
        Videos.resizeAll(videos)

        this.Lazyloading = new Lazyloading({
            load_delay: 0,
            elements_selector: 'img',
            use_native: false,
        })
    }
}

export default DefaultRenderer
