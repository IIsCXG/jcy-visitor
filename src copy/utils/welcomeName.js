export function setName(name) {
    return window.localStorage.setItem('username', name)
}
export function getName() {
    return window.localStorage.getItem('username')
}

