import { id } from "../utils/constants";
import { api } from '../components/Api.js';

export default class Card {
    constructor(data, selector, handleCardClick, handleCardDelete) {
        this._selector = selector;
        this._imageLink = data.link;
        this._name = data.name;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._likeCounter = data.likes.length
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
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
            this._handleCardDelete(this._cardId);
        })

        this._element.querySelector('.cards__button-like').addEventListener('click', (evt) => {
           this._handleLikeCard(evt);
        });

        this._element.querySelector('.cards__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    _handleLikeCard(evt) {
        if (evt.target.classList.contains('cards__button-like_active')) {
            this._dislikeCard()
        } else {
            this._likeCard()
        }
        evt.target.classList.toggle('cards__button-like_active')
    }

    _handleElementContent() {
        const cardImage = this._element.querySelector('.cards__image');

        cardImage.src = this._imageLink;
        cardImage.alt = this._name;
        this._element.querySelector('.cards__title').textContent = this._name;
        this._element.querySelector('.cards__like-number').textContent = this._likeCounter
    }

    _handleRemoveCardButton() {
        if(this._ownerId !== id) {
            this._element.querySelector('.cards__button-delete').style.display = "none";
        }
    }

    _likeCard() {
        api.putLike(this._cardId)
        .then(res => {
            this._element.querySelector('.cards__like-number').textContent = res.likes.length
        })
        .catch((err) => {
            console.log(err);
          });
        console.log('Like')
    }

    dislikeCard() {
        api.deleteLike(this._cardId)
        .then(res => {
            this._element.querySelector('.cards__like-number').textContent = res.likes.length
        })
        .catch((err) => {
            console.log(err);
          });
        console.log('Like')
    }

    createPicture() {
        this._getElement();
        this._setEventListeners();
        this._handleRemoveCardButton();
        this._handleElementContent();

        return this._element;
    }
}