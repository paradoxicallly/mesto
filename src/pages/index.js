import { initialCards, config } from '../utils/constants.js';
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
} from '../utils/utils.js';

//валидация
const cardFormValidator = new FormValidator(config, popupPictureForm);
const editFormValidator = new FormValidator(config, popupProfile);

//классы
const profileForm = new PopupWithForm('.popup_profile', submitProfileForm);
const pictureForm = new PopupWithForm('.popup_picture-form', submitPictureForm);
const userInfo = new UserInfo(dataFromPage);
const imageSection = new Section({items: initialCards, renderer: createPicture}, '.cards');
const imageFull = new PopupWithImage('.popup_picture-full');


function openProfileForm() {
    editFormValidator.resetError();
    
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().description;

    editFormValidator.toggleButtonState();

    profileForm.open()
}

function openPictureForm() {
    cardFormValidator.resetError();
    cardFormValidator.toggleButtonState();

    pictureForm.open();
}

function submitProfileForm (evt, data) {
    evt.preventDefault()
    userInfo.setUserInfo(data['profile-name'], data['profile-job'])
    profileForm.close()
}

function submitPictureForm(evt, data) {
    evt.preventDefault();
    imageSection.addItem({name: data['image-title'], link: data['image-link']})
    pictureForm.close()
}
function createPicture(pictureObject) {
    const cardElement = new Card(pictureObject, '.cards__template', imageFull.open.bind(imageFull, pictureObject));
    
    return cardElement.createPicture();
}

imageSection.renderItems()

cardFormValidator.enableValidation();
editFormValidator.enableValidation();

profileForm.setEventListeners();
pictureForm.setEventListeners();
imageFull.setEventListeners();

pictureFormOpenButton.addEventListener('click', () => openPictureForm());
profileOpenButton.addEventListener('click', () => openProfileForm());
