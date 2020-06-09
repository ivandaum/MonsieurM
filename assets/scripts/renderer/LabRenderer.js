import Highway from '@dogstudio/highway'

import Videos from '../binders/Videos'
import Images from '../binders/Images'

import ResizeManager from '../utils/ResizeManager'
// import ScrollManager from '../utils/ScrollManager'

class LabRenderer extends Highway.Renderer {
    onLeave() {
        ResizeManager.removeQueue(this.resizeIndex)
    }

    onEnterCompleted() {
        this.raf = []
        const $view = this.wrap

        const videos = $view.querySelectorAll('.js-video')
        Videos.bindAll(videos)
        Videos.resizeAll(videos)
        this.resizeIndex = ResizeManager.addQueue(() => Videos.resizeAll(videos))

        Images.lazyload()
    }
}

export default LabRenderer
