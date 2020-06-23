import Lazyloading from '../vendor/Lazyloading'

const Images = {
    lazyload: () => {
        Images.lazy = new Lazyloading({
            load_delay: 1000,
            elements_selector: 'img:not(.ignore-lazy)',
            use_native: false,
            callback_loaded: (el) => Images.onLoad(el),
            callback_error: (el) => {
                console.log('Error loading : ', el)
                Images.onLoad(el)
            },
        })
    },

    onLoad: (el) => {
        el.parentNode.classList.add('loaded')
    },
}

export default Images
