var gElement = document.querySelector('.gallery')
var items = gElement.querySelectorAll('.item')

items.forEach(function(e, i) {
    let hasTitle = false
    if (!hasTitle) hasTitle = !!e.querySelector('div > a > h1')
    if (!hasTitle) hasTitle = !!e.querySelector('div > a > h2')
    if (!hasTitle) hasTitle = !!e.querySelector('div > a > h3')
    if (!hasTitle) hasTitle = !!e.querySelector('div > a > h4')
    if (!hasTitle) hasTitle = !!e.querySelector('div > a > h5')
    if (!hasTitle) hasTitle = !!e.querySelector('div > a > h6')

    if (hasTitle) e.classList.add('hasTitle')
})