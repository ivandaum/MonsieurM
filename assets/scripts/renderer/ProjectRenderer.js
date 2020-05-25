import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Videos from '../binders/Videos'

// import anime from 'animejs'
// import { scrollTo } from '../functions/dom'
// import breakpoints from '../utils/breakpoints'
// import store from '../utils/store'

// const duration = 1000
// const easing = 'easeInOutQuart'

class ProjectRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onEnterCompleted() {
        const $view = this.wrap
        const videos = $view.querySelectorAll('.js-video')

        Videos.bindAll(videos)
        Videos.resizeAll(videos)

        Images.lazyload()
    }
}

export default ProjectRenderer
