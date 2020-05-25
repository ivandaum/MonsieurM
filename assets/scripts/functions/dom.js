import anime from 'animejs'
import { range } from './object'
import store from '../utils/store'

// import breakpoints from '../utils/breakpoints'
// import store from '../utils/store'

export const getScrollTop = () =>
    document.body.scrollTop ||
    window.scrollY ||
    window.scrollTop ||
    window.pageYOffset ||
    document.getElementsByTagName('html')[0].scrollTop

export const getOffsetTop = ($element) => {
    const bodyRect = document.body.getBoundingClientRect()
    const elemRect = $element.getBoundingClientRect()
    return elemRect.top - bodyRect.top
}

/**
 * NOTE : function is using animejs
 */
export const scrollTo = ({ y, complete }) => {
    const easing = 'easeInOutExpo'
    const duration = 2000
    const targets = { y: store.scroll }
    const container = window

    anime({
        targets,
        y,
        duration,
        easing,
        update: () => {
            container.scrollTo(0, targets.y)
        },
        complete,
    })
}

export const scrolledInViewport = ($target, callback) => {
    const observer = new IntersectionObserver(
        (changes) => {
            const [{ isIntersecting, boundingClientRect }] = changes
            const bottom = boundingClientRect.height
            const top = boundingClientRect.top
            const progress = range(top, store.windowHeight, -bottom) * 0.01

            callback({
                isIntersecting,
                progress,
            })
        },
        {
            threshold: Array.from(Array(101), (x, index) => Number(((1 / 100) * index).toFixed(2))),
        },
    )
    observer.observe($target)
}

export const observeVisibility = ($target, callback) => {
    const observer = new IntersectionObserver(
        (changes) => {
            const [{ intersectionRatio }] = changes
            const ratio = $target.offsetHeight / window.innerHeight
            const percent = ratio * intersectionRatio
            callback(percent)
        },
        {
            threshold: Array.from(Array(101), (x, index) => Number(((1 / 100) * index).toFixed(2))),
        },
    )
    observer.observe($target)
}
