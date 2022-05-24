export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    }

    _showInputError(input) {
        const errorElement = this._form.querySelector(`#${input.id}_type_error`);
    
        input.classList.add(this._config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError(input) {
        const errorElement = this._form.querySelector(`#${input.id}_type_error`);
  
        input.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    }

    _setEventListeners() {
        this.toggleButtonState();

        this._inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.toggleButtonState();
            });
        });
    }

    _hasInvalidInput() {
        return this._inputs.some((input) => {
            return !input.validity.valid;
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        };
    }

    enableValidation() {
        this._form.addEventListener('submit', (event) => event.preventDefault());

        this._setEventListeners();
    }
}