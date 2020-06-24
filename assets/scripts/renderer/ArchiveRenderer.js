import Highway from '@dogstudio/highway'

class PageRenderer extends Highway.Renderer {
    onLeave() {
        Images.lazy.destroy()
    }

    onEnterCompleted() {}
}

export default PageRenderer
