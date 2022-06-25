import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._handleConfirm = handleConfirm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._imgId = null;
        this._submitAction = null
    }

    open(id, handleSubmitAction) {
        super.open();
        this._imgId = id;
        this._submitAction = handleSubmitAction;
    }

    // я не нашла, как сделать что форма отправлялась по Enter без инпутов
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit',(evt) => {
            this._handleConfirm(evt, this._imgId)
            this._submitAction();
        })
    }
}