export default class Section {
    constructor (renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(element => {
            this._container.append(this._renderer(element))
        });
    }

    addItem(element) {
        this._container.prepend(this._renderer(element));
    }
}