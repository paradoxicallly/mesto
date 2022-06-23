import { initialCards, config } from '../utils/constants.js';
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

    profileForm.open()
}

function openAvatar() {
  avatarFormValidator.resetError();

  avatarForm.open();
}

function openPictureForm() {
    cardFormValidator.resetError();

    pictureForm.open();
}

function openDeleteCardPopup(id) {
  deleteCardPopup.open(id)
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
      openDeleteCardPopup);

    return cardElement.createPicture();
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
    api.setUserInfo(name, about)
    .then(res => {
        userInfo.setUserInfo(res.name, res.about, res.avatar)
      })
      .catch((err) => {
        console.log(err);
      });
}

// получаем первоначальный список карточек
function getInitialCardList () {
  api.getInitialCards()
  .then(res => {
    console.log(res)
    imageSection.renderItems(res)
  })
  .catch((err) => {
    console.log(err);
  });
}

// создаём новую карточку
function addCard (name, link) {
    api.addCard(name, link)
    .then(res => {
        imageSection.addItem(res)
    })
    .catch((err) => {
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
  api.changeAvatar(url)
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)
  })
  .catch((err) => {
    console.log(err);
});
}

// запрос начальной информации
getUserInfo();
getInitialCardList();