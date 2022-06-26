export default class Section {
    constructor (renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items, currentUserId) {
        items.forEach(element => {
            this._container.append(this._renderer({currentUserId, ...element}))
        });
    }

    addItem(element, currentUserId) {
        this._container.prepend(this._renderer({currentUserId, ...element}));
    }
}