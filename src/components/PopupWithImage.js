import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._pictureFull = document.querySelector('.popup__full-picture');
        this._pictureTitle = document.querySelector('.popup__picture-title')
    }

    open(data) {
        super.open();
        this._pictureFull.src = data.link;
        this._pictureFull.alt = data.name;
        this._pictureTitle.textContent = data.name;
    }
}
