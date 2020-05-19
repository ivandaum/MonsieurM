export const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export const randFloat = (min, max) => Math.random() * (max - min) + min

export const range = (input, min, max) => ((input - min) * 100) / (max - min)

export const lerp = (v0, v1, t) => (1 - t) * v0 + t * v1

export const shuffle = (a) => {
    for (let i = a.length; i; i--) {
        const j = Math.floor(Math.random() * i)
        ;[a[i - 1], a[j]] = [a[j], a[i - 1]]
    }
}

export const slugify = (string) =>
    string
        .replace(/<(.*?)>/, '-')
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')

export const isFunction = (obj) => obj && {}.toString.call(obj) === '[object Function]'
