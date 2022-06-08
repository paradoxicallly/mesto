export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            this.close(); 
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__button-close').addEventListener('click', () => this.close);
        this._popup.addEventListener('click', () => this.close(), false);
        this._popup.querySelector('.popup__form').addEventListener('click', (event) => event.stopPropagation());
    }
}