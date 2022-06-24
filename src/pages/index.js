import { config } from '../utils/constants.js';
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
    popupProfile,
    nameInput,
    jobInput,
    profileOpenButton,
    dataFromPage,
    popupPictureForm,
    pictureFormOpenButton,
    avatarChangeForm,
} from '../utils/utils.js';

import { api } from '../components/Api.js';

//валидация
const cardFormValidator = new FormValidator(config, popupPictureForm);
const editFormValidator = new FormValidator(config, popupProfile);
const avatarFormValidator = new FormValidator(config, avatarChangeForm);

//классы
const profileForm = new PopupWithForm('.popup_profile', submitProfileForm);
const avatarForm = new PopupWithForm('.popup_change-avatar', submitChangeAvatar);
const pictureForm = new PopupWithForm('.popup_picture-form', submitPictureForm);
const deleteCardPopup = new PopupConfirm('.popup_delete-card', submitDeleteCardPopup);
const userInfo = new UserInfo(dataFromPage);
const imageSection = new Section(createPicture, '.cards');
const imageFull = new PopupWithImage('.popup_picture-full');


function openProfileForm() { 
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().description;

    editFormValidator.resetError();
    profileForm.renderLoading(false);
    profileForm.open()
}

function openAvatar() {
  avatarFormValidator.resetError();

  avatarForm.renderLoading(false);
  avatarForm.open();
}

function openPictureForm() {
    cardFormValidator.resetError();

    pictureForm.renderLoading(false, 'Создать');
    pictureForm.open();
}

function openDeleteCardPopup(id, removeCardAction) {
  deleteCardPopup.open(id, removeCardAction)
}

function submitProfileForm (evt, data) {
    evt.preventDefault()
    setUserInfo(data['profile-name'], data['profile-job'])
    profileForm.close()
}

function submitChangeAvatar(evt, data) {
  evt.preventDefault()
  changeAvatar(data['avatar-link'])
  avatarForm.close()
}

function submitPictureForm(evt, data) {
    evt.preventDefault()
    addCard(data['image-title'], data['image-link'])
    pictureForm.close()
}

function submitDeleteCardPopup(evt, id) {
  evt.preventDefault()
  removeCard(id)
  deleteCardPopup.close()
}

function createPicture(pictureObject) {
    const cardElement = new Card(
      pictureObject, 
      '.cards__template', 
      imageFull.open.bind(imageFull, pictureObject), 
      openDeleteCardPopup,
      updateLike);

    return cardElement.createPicture();
}

function updateLike(id, action,likesHandler) {
  if (action === 'like') {
    likeCard(id, likesHandler);
  } else {
    dislikeCard(id, likesHandler);
  }
}

cardFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();

profileForm.setEventListeners();
pictureForm.setEventListeners();
imageFull.setEventListeners();
deleteCardPopup.setEventListeners();
avatarForm.setEventListeners();

pictureFormOpenButton.addEventListener('click', () => openPictureForm());
profileOpenButton.addEventListener('click', () => openProfileForm());
document.querySelector('.profile__avatar-container').addEventListener('click', () => openAvatar())


// получаем первую информацию о пользователе
function getUserInfo() {
  api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)
  })
  .catch((err) => {
    console.log(err);
  });
}

// изменяем информацию о пользователе
function setUserInfo(name, about) {
    profileForm.renderLoading(true);
    api.setUserInfo(name, about)
    .then(res => {
        userInfo.setUserInfo(res.name, res.about, res.avatar)
      })
      .catch((err) => {
        profileForm.renderLoading(false)
        console.log(err);
      });
      // profileForm.renderLoading(false);
}

// получаем первоначальный список карточек
function getInitialCardList () {
  api.getInitialCards()
  .then(res => {
    imageSection.renderItems(res)
  })
  .catch((err) => {
    console.log(err);
  });
}

// создаём новую карточку
function addCard (name, link) {
    pictureForm.renderLoading(true)
    api.addCard(name, link)
    .then(res => {
        imageSection.addItem(res)
    })
    .catch((err) => {
        pictureForm.renderLoading(false, 'Создать')
        console.log(err);
    });
}

// удаляем свою карточку
function removeCard(id) {
   api.removeCard(id)
   .then(() => {
      getInitialCardList();
  })
  .catch((err) => {
      console.log(err);
  });
}

// изменяем аватар
function changeAvatar(url) {
  avatarForm.renderLoading(true)
  api.changeAvatar(url)
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)
  })
  .catch((err) => {
    console.log(err);
    avatarForm.renderLoading(false)
  });
}

// лайкаем карточку
function likeCard(id, action) {
  api.putLike(id)
  .then(res => {
     action(res.likes)
  })
  .catch((err) => {
    console.log(err);
  });
}

function dislikeCard(id, action) {
  api.deleteLike(id)
  .then(res => {
    action(res.likes)
  })
  .catch((err) => {
    console.log(err);
  });
}

// запрос начальной информации
getUserInfo();
getInitialCardList();