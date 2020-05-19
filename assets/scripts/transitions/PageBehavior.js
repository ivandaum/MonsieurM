import { isFunction } from '../functions/object'

const PageBehavior = {
    show({ from, done }) {
        // window.scrollTo(0, 0)

        if (from) {
            from.remove()
        }

        document.body.classList.remove('loading')

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
