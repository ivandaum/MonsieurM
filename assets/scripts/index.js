import '../styles/index.scss'

import Highway from '@dogstudio/highway'
import store from './utils/store'

import DefaultRenderer from './renderer/DefaultRenderer'
import WorkRenderer from './renderer/WorkRenderer'
import ProjectRenderer from './renderer/ProjectRenderer'

import DefaultTransition from './transitions/DefaultTransition'
import WorkToProjectTransition from './transitions/WorkToProjectTransition'

import Nav from './animations/Nav'

store.setGlobalVars()
window.addEventListener('resize', () => store.setGlobalVars())

const core = new Highway.Core({
    renderers: {
        home: DefaultRenderer,
        project: ProjectRenderer,
        work: WorkRenderer,
    },
    transitions: {
        default: DefaultTransition,
        project: WorkToProjectTransition,
        contextual: {
            workToProject: WorkToProjectTransition,
        },
    },
})

core.on('NAVIGATE_OUT', () => {
    document.body.classList.add('loading')
})

core.detach(document.querySelectorAll('.js-detach-from-core'))
core.on('NAVIGATE_END', () => {
    core.detach(document.querySelectorAll('.js-detach-from-core'))
})

core.on('NAVIGATE_IN', ({ to }) => {
    to.page.body.classList.add('loading')
    document.body.classList = to.page.body.classList
    Nav.bindActiveLink({ color: to.view.dataset.color })
})

core.on('NAVIGATE_ERROR', ({ location }) => {
    window.location.href = location.href
})

const to = document.querySelector('[data-router-view]:last-of-type')
const trans = core.Helpers.transitions[core.properties.slug] || core.Helpers.transitions.default
trans.prototype.in({ to })
