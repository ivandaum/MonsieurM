import '../styles/index.scss'

import Highway from '@dogstudio/highway'
import ScrollManager from './utils/ScrollManager'
import store from './utils/store'

import HomeRenderer from './renderer/HomeRenderer'
import WorkRenderer from './renderer/WorkRenderer'
import ProjectRenderer from './renderer/ProjectRenderer'
import LabRenderer from './renderer/LabRenderer'

import WorkTransition from './transitions/WorkTransition'
import HomeTransition from './transitions/HomeTransition'
import ProjectTransition from './transitions/ProjectTransition'
import LabTransition from './transitions/LabTransition'

import Nav from './animations/Nav'
import Footer from './animations/Footer'

const renderers = {
    home: HomeRenderer,
    project: ProjectRenderer,
    lab: LabRenderer,
    work: WorkRenderer,
}
const transitions = {
    work: WorkTransition,
    home: HomeTransition,
    project: ProjectTransition,
    lab: LabTransition,
    contextual: {
        workToProject: ProjectTransition,
    },
}

const core = new Highway.Core({ renderers, transitions })
    .on('NAVIGATE_OUT', () => {
        document.body.classList.add('loading')
    })
    .on('NAVIGATE_END', ({ to }) => {
        to.page.body.classList.remove('not-loaded')
        document.body.classList = to.page.body.classList

        ScrollManager.update({ view: to.view })

        if (ScrollManager.bodyLocked) {
            ScrollManager.unlockBody()
            ScrollManager.snapTo(0)
        }

        store.updateOnNavigation()
        Footer.update({ view: to.view })
    })
    .on('NAVIGATE_IN', ({ to }) => {
        Nav.bindActiveLink({ color: to.view.dataset.color })
    })
    .on('NAVIGATE_ERROR', ({ location }) => {
        window.location.href = location.href
    })

function app() {
    const view = document.querySelector('[data-router-view]:last-of-type')

    store.init()

    ScrollManager.init({ view })
    ScrollManager.addOnResize(() => store.setGlobalVars())

    Nav.bindActiveLink({ color: view.dataset.color })
    setTimeout(() => Nav.show(), 1500)
    Footer.update({ view })

    const trans = core.Helpers.transitions[core.properties.slug] || core.Helpers.transitions.default
    trans.prototype.in({ to: view })
}

app()
