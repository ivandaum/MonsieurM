import '../styles/index.scss'

import Highway from '@dogstudio/highway'
import store from './utils/store'

import ScrollManager from './utils/ScrollManager'
import ResizeManager from './utils/ResizeManager'
import FontLoader from './utils/FontLoader'

import HomeRenderer from './renderer/HomeRenderer'
import WorkRenderer from './renderer/WorkRenderer'
import ProjectRenderer from './renderer/ProjectRenderer'
import LabRenderer from './renderer/LabRenderer'
import ArchiveRenderer from './renderer/ArchiveRenderer'

import WorkTransition from './transitions/WorkTransition'
import HomeTransition from './transitions/HomeTransition'
import ProjectTransition from './transitions/ProjectTransition'
import LabTransition from './transitions/LabTransition'

import Nav from './animations/Nav'
import Mailto from './animations/Mailto'

const renderers = {
    home: HomeRenderer,
    project: ProjectRenderer,
    lab: LabRenderer,
    work: WorkRenderer,
    archive: ArchiveRenderer,
}
const transitions = {
    work: WorkTransition,
    home: HomeTransition,
    project: ProjectTransition,
    lab: LabTransition,
    archive: LabTransition,
    contextual: {
        workToProject: ProjectTransition,
    },
}

const core = new Highway.Core({ renderers, transitions })
    .on('NAVIGATE_OUT', () => {
        document.body.classList.add('loading')
        ScrollManager.lock()
        Nav.updateLoader({})
    })
    .on('NAVIGATE_END', ({ to, location }) => {
        to.page.body.classList.remove('not-loaded')
        document.body.classList = to.page.body.classList

        store.updateOnNavigation()
        Mailto.update({ $view: to.view })

        ScrollManager.unlock()
        ScrollManager.snapTo(0)
        ScrollManager.update({ $view: to.view })

        if (typeof gtag !== 'undefined') {
            // eslint-disable-next-line
            gtag('config', 'UA-180472781-1', {
                page_path: location.pathname,
                page_title: to.page.title,
                page_location: location.href,
            })
        }
    })
    .on('NAVIGATE_IN', ({ to }) => {
        const page = to.view.dataset.routerView
        document.body.dataset.page = page
    })
    .on('NAVIGATE_ERROR', ({ location }) => {
        window.location.href = location.href
    })

function app() {
    const $view = document.querySelector('[data-router-view]:last-of-type')

    store.init()
    ScrollManager.init({ $view })
    Mailto.update({ $view })
    ResizeManager.init()
    ResizeManager.addQueue(() => store.setGlobalVars())

    Nav.bindActiveLink({ color: $view.dataset.color })
    Nav.updateLoader({ color: $view.dataset.loader, firstLoading: true })

    setTimeout(() => Nav.show(), 500)

    const trans = core.Helpers.transitions[core.properties.slug] || core.Helpers.transitions.default

    FontLoader.default(() => {
        trans.prototype.in({
            to: $view,
            done: () => ScrollManager.update({ $view }),
        })
    })

    const page = $view.dataset.routerView
    document.body.dataset.page = page

    const style = 'background-color:black; padding:5px; color:white;'
    console.log('%cCode by Ivan Daum', style)
    console.log('%c→ https://ivandaum.fr', style)
    console.log('%c→ https://twitter.com/ivandaum', style)
}

app()
