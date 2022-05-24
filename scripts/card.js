export default class Card {
    constructor(data, selector) {
        this._selector = selector;
        this._imageLink = data.link;
        this._name = data.name;
    }

    _getElement() {
        const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.cards__item')
        .cloneNode(true);

    this._element = cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.cards__button-delete').addEventListener('click', (evt) => {
            this._handleRemoveCard(evt);
        })

        this._element.querySelector('.cards__button-like').addEventListener('click', (evt) => {
           this._handleLikeCard(evt);
        });

        this._element.querySelector('.cards__image').addEventListener('click', () => {
            this._handleOpenPopup()
        });
    }

    _handleRemoveCard(evt) {
        const element = evt.target.closest(".cards__item");
        element.remove();
    }

    _handleLikeCard(evt) {
        evt.target.classList.toggle('cards__button-like_active');
    }

    _handleOpenPopup() {
        document.querySelector('.popup__full-picture').src = this._imageLink;
        document.querySelector('.popup__full-picture').alt = this._name;
        document.querySelector('.popup__picture-title').textContent = this._name;
        
        document.querySelector('.popup_picture-full').classList.add('popup_opened');
    }

    _handleElementContent() {
        this._element.querySelector('.cards__image').src = this._imageLink;
        this._element.querySelector('.cards__image').alt = this._name;
        this._element.querySelector('.cards__title').textContent = this._name;
    }

    createPicture() {
        this._getElement();
        this._setEventListeners();
        this._handleElementContent();

        return this._element;
    }
}