import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        return {
            name: inputList[0].value,
            description: inputList[1].value
        }

    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => this._submitForm(evt, this._getInputValues()))
    }

    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }
}