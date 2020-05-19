import anime from 'animejs'
import breakpoints from '../utils/breakpoints'
import store from '../utils/store'

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
export const scrollTo = ({ container, from, y, dur, complete, update }) => {
    const easing = 'easeInOutExpo'
    const duration = dur || 1000
    const targets = { y: from || getScrollTop() }

    if (store.windowWidth >= breakpoints.desktop) {
        container = container || document.body
    } else {
        container = window
    }

    anime({
        targets,
        y,
        duration,
        easing,
        update: () => {
            container.scrollTo(0, targets.y)
            if (update) {
                update(targets.y)
            }
        },
        complete,
    })
}
