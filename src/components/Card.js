export default class Card {
    constructor(
        data,
        selector,
        handleCardClick, 
        handleCardDelete,
        handleLike,
        handleDislike,
        handleLikeUpdate,
        ) {
        this._selector = selector;
        this._imageLink = data.link;
        this._name = data.name;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._currentUserId = data.currentUserId
        this._likes = data.likes;
        this._likeCounter = data.likes.length
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleLike = handleLike;
        this._handleDislike = handleDislike;
        this._handleLikeUpdate = handleLikeUpdate;
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
            this._handleCardDelete(this._cardId, this._removeCardAction.bind(this));
        })

        this._element.querySelector('.cards__button-like').addEventListener('click', () => {
           this._handleLikeCard();
        });

        this._element.querySelector('.cards__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    _removeCardAction() {
        this._element.remove()
    }

    _setLikes(likes) {
        this._likeCounter = likes.length
        this._element.querySelector('.cards__like-number').textContent = likes.length
    }

    _updateLike() {
      this._element.querySelector('.cards__button-like').classList.toggle('cards__button-like_active')
    }

    _handleLikeCard() {
        const likeButton = this._element.querySelector('.cards__button-like');

        if (likeButton.classList.contains('cards__button-like_active')) {
            this._handleDislike(this._cardId, this._setLikes.bind(this), this._updateLike.bind(this));
        } else  {
            this._handleLike(this._cardId, this._setLikes.bind(this), this._updateLike.bind(this));
        }

    }

    _handleElementContent() {
        const cardImage = this._element.querySelector('.cards__image');

        if(this._likes.find(like => like._id === this._currentUserId)) {
            this._element.querySelector('.cards__button-like').classList.add('cards__button-like_active');
        }

        cardImage.src = this._imageLink;
        cardImage.alt = this._name;
        this._element.querySelector('.cards__title').textContent = this._name;
        this._element.querySelector('.cards__like-number').textContent = this._likeCounter
    }

    _handleRemoveCardButton() {
        if(this._ownerId !== this._currentUserId) {
            this._element.querySelector('.cards__button-delete').style.display = "none";
        }
    }



    createPicture() {
        this._getElement();
        this._setEventListeners();
        this._handleRemoveCardButton();
        this._handleElementContent();

        return this._element;
    }
}