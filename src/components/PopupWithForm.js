import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__button');
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
            this._submitForm(evt, this._getInputValues())
            this._submitButton.textContent = "Сохранение..."
        });
    }

    close() {
        this._submitButton.textContent = "Сохранить"
        super.close();
        this._popupForm.reset();
    }
}