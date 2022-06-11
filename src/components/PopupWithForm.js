import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        const inputValues = {};
        inputList.forEach(input => {
            inputValues[input.name] = input.value
        })
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => this._submitForm(evt, this._getInputValues()));
        this._popupForm.addEventListener('mousedown', (event) => event.stopPropagation());
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}