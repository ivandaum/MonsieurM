import store from '../utils/store'

const desktop = 1024

export default {
    max: 2000,
    large: 1600,
    widescreen: 1280,
    desktop,
    tablet: 768,
    phone: 545,
    phoneS: 360,
    isDesktop: () => store.windowWidth >= desktop,
    isTouch: () => store.windowWidth < desktop,
}
