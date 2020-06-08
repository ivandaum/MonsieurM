import Highway from '@dogstudio/highway'

import Videos from '../binders/Videos'
import Images from '../binders/Images'

// import breakpoints from '../constants/breakpoints'
// import store from '../utils/store'
import ScrollManager from '../utils/ScrollManager'

class LabRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onEnterCompleted() {
        const $view = this.wrap

        const videos = $view.querySelectorAll('.js-video')
        Videos.bindAll(videos)
        Videos.resizeAll(videos)

        ScrollManager.addOnResize(() => Videos.resizeAll(videos))

        Images.lazyload()

        this.raf = []
    }
}

export default LabRenderer
