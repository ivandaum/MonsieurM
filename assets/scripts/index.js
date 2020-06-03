import '../styles/index.scss'

import Highway from '@dogstudio/highway'
import ScrollManager from './utils/ScrollManager'
import store from './utils/store'

import HomeRenderer from './renderer/HomeRenderer'
import WorkRenderer from './renderer/WorkRenderer'
import ProjectRenderer from './renderer/ProjectRenderer'

import DefaultTransition from './transitions/DefaultTransition'
import ProjectTransition from './transitions/ProjectTransition'

import Nav from './animations/Nav'
import Footer from './animations/Footer'

const renderers = {
    home: HomeRenderer,
    project: ProjectRenderer,
    work: WorkRenderer,
}
const transitions = {
    default: DefaultTransition,
    project: ProjectTransition,
    contextual: {
        workToProject: ProjectTransition,
    },
}

const core = new Highway.Core({ renderers, transitions })
    .on('NAVIGATE_OUT', () => {
        document.body.classList.add('loading')
    })
    .on('NAVIGATE_END', ({ to }) => {
        document.body.classList = to.page.body.classList
        ScrollManager.update({ view: to.view })

        if (ScrollManager.bodyLocked) {
            ScrollManager.unlockBody()
            ScrollManager.snapTo(0)
        }

        store.updateOnNavigation()
        Footer.update()
    })
    .on('NAVIGATE_IN', ({ to }) => {
        Nav.bindActiveLink({ color: to.view.dataset.color })
    })
    .on('NAVIGATE_ERROR', ({ location }) => {
        window.location.href = location.href
    })

function app() {
    store.init()
    const view = document.querySelector('[data-router-view]:last-of-type')

    ScrollManager.init({ view })
    store.updateOnNavigation()
    Nav.bindActiveLink({ color: view.dataset.color })
    Footer.update()

    const trans = core.Helpers.transitions[core.properties.slug] || core.Helpers.transitions.default
    trans.prototype.in({ to: view })
}

app()
