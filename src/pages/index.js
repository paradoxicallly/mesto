import { initialCards, config } from '../components/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
} from '../components/utils.js';

//валидация
const cardFormValidator = new FormValidator(config, popupPictureForm);
const editFormValidator = new FormValidator(config, popupProfile);

//классы
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
