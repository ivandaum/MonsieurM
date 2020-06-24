import Highway from '@dogstudio/highway'
import Videos from '../binders/Videos'
import Images from '../binders/Images'

class DefaultRenderer extends Highway.Renderer {
    onLeaveCompleted() {}
    onLeave() {
        Images.lazy.destroy()
    }
    onEnterCompleted() {
        const $view = this.wrap

        Images.lazyload()

        const videos = $view.querySelectorAll('.js-video')
        Videos.bindAll(videos)
        Videos.resizeAll(videos)
    }
}

export default DefaultRenderer
