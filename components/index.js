import { initialCards, config } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
    popupList,
    formList,
    popupProfile,
    profileElement,
    nameInput,
    jobInput,
    profileCloseButton,
    profileName,
    profileDescription,
    profileOpenButton,
    popupPictureForm,
    pictureElement,
    titleInput,
    linkInput,
    pictureFormOpenButton,
    pictureFormCloseButton,
    popupPicture,
    pictureCloseButton,
    pictureFull,
    initialCardsList,
} from './utils.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

//валидация
const cardFormValidator = new FormValidator(config, popupPictureForm);
const editFormValidator = new FormValidator(config, popupProfile);

const dataFromPage = {
    profileName: '.profile__title',
    profileDescription: '.profile__description'
}

const profileForm = new PopupWithForm('.popup_profile', submitProfileForm);
const pictureForm = new PopupWithForm('.popup_picture-form', submitPictureForm);
const userInfo = new UserInfo(dataFromPage);
const imageSection = new Section({items: initialCards, renderer: createPicture}, '.cards');


function openProfileForm() {
    profileForm.open()
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().description;

    editFormValidator.toggleButtonState();
}

function openPictureForm() {
    pictureForm.open()
    cardFormValidator.toggleButtonState();
}

function submitProfileForm (evt, data) {
    evt.preventDefault()
    userInfo.setUserInfo(data.name, data.description)
    profileForm.close()
}

function submitPictureForm(evt, data) {
    evt.preventDefault();
    imageSection.addItem({name: data.name, link: data.description})
    pictureForm.close()
}
function createPicture(pictureObject) {
    const imageFull = new PopupWithImage(pictureObject, '.popup_picture-full');
    imageFull.setEventListeners()
    const cardElement = new Card(pictureObject, '.cards__template', imageFull.open.bind(imageFull));
    
    return cardElement.createPicture();
}

imageSection.renderItems()

cardFormValidator.enableValidation();
editFormValidator.enableValidation();

profileForm.setEventListeners();
pictureForm.setEventListeners();

pictureFormOpenButton.addEventListener('click', () => openPictureForm());
profileOpenButton.addEventListener('click', () => openProfileForm());
