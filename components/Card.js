export default class Card {
    constructor(data, selector, handleCardClick) {
        this._selector = selector;
        this._imageLink = data.link;
        this._name = data.name;
        this._handleCardClick = handleCardClick;
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
        this._element.querySelector('.cards__button-delete').addEventListener('click', () => {
            this._handleRemoveCard();
        })

        this._element.querySelector('.cards__button-like').addEventListener('click', (evt) => {
           this._handleLikeCard(evt);
        });

        this._element.querySelector('.cards__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    _handleRemoveCard() {
        this._element.remove();
        this._element = null;
    }

    _handleLikeCard(evt) {
        evt.target.classList.toggle('cards__button-like_active');
    }

    _handleElementContent() {
        const cardImage = this._element.querySelector('.cards__image');

        cardImage.src = this._imageLink;
        cardImage.alt = this._name;
        this._element.querySelector('.cards__title').textContent = this._name;
    }

    createPicture() {
        this._getElement();
        this._setEventListeners();
        this._handleElementContent();

        return this._element;
    }
}