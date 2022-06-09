import Popup from "./Popup.js";
import {
    pictureFull,
    pictureTitle,
} from './utils.js'

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._imageLink = data.link;
        this._name = data.name;
    }

    open() {
        super.open();
        pictureFull.src = this._imageLink;
        pictureFull.alt = this._name;
        pictureTitle.textContent = this._name;
    }

    setEventListeners() {
        this._popup.querySelector('.popup__button-close').addEventListener('click', () => this.close);
        this._popup.addEventListener('click', () => this.close(), false);
        this._popup.querySelector('.popup__full-picture').addEventListener('click', (event) => event.stopPropagation());
    }
}
