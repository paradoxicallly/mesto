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
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitForm(this._getInputValues())
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}