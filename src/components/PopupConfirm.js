import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._handleConfirm = handleConfirm;
        this._confirmButton = this._popup.querySelector('.popup__button');
        this._imgId = null;
    }

    open(id) {
        super.open();
        this._imgId = id;
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click',(evt) => this._handleConfirm(evt, this._imgId))
    }
}