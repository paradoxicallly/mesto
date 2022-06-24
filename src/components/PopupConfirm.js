import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._handleConfirm = handleConfirm;
        this._confirmButton = this._popup.querySelector('.popup__button');
        this._imgId = null;
        this._submitAction = null
    }

    open(id, handleSubmitAction) {
        super.open();
        this._imgId = id;
        this._submitAction = handleSubmitAction;
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click',(evt) => {
            this._handleConfirm(evt, this._imgId)
            this._submitAction();
        })
    }
}