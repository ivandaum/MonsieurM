import Lazyloading from '../vendor/Lazyloading'
import { isFunction } from '../functions/object'

const PageBehavior = {
    show({ from, done }) {
        if (from) {
            from.remove()
        }

        document.body.classList.remove('loading')

        this.Lazyloading = new Lazyloading({
            load_delay: 0,
            elements_selector: 'img',
            use_native: false,
        })

        if (done && isFunction(done)) {
            done()
        }
    },

    hide({ done }) {
        if (done && isFunction(done)) {
            done()
        }
    },
}

export default PageBehavior
