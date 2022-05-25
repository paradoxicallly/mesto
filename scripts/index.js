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

//валидация
const cardFormValidator = new FormValidator(config, popupPictureForm);
const editFormValidator = new FormValidator(config, popupProfile);

function openPopup(popupName) {    
    popupName.classList.add('popup_opened');

    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
  
    document.removeEventListener('keydown', closePopupByEsc);  
}

function closePopupByEsc(evt) {    
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup); 
    }
}

function openProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;

    editFormValidator.toggleButtonState();

    openPopup(popupProfile);
}

function openPictureForm() {
    pictureElement.reset();
    
    cardFormValidator.toggleButtonState();

    openPopup(popupPictureForm);
}

function submitProfileForm (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(popupProfile);
}

function submitPictureForm(evt) {
    evt.preventDefault();
    
    const pictureObject = {name: titleInput.value, link: linkInput.value};

    initialCardsList.prepend(createPicture(pictureObject));

    closePopup(popupPictureForm);
}

function createPicture(pictureObject) {
    const cardElement = new Card(pictureObject, '.cards__template', openPopup);
    return cardElement.createPicture();
}

initialCards.forEach(item => {
    initialCardsList.append(createPicture(item));
})

cardFormValidator.enableValidation();
editFormValidator.enableValidation();

profileOpenButton.addEventListener('click', () => openProfileForm());
profileCloseButton.addEventListener('click', () => closePopup(popupProfile));
profileElement.addEventListener('submit', submitProfileForm);

pictureFormOpenButton.addEventListener('click', () => openPictureForm());
pictureFormCloseButton.addEventListener('click', () => closePopup(popupPictureForm));
pictureElement.addEventListener('submit', submitPictureForm);

pictureCloseButton.addEventListener('click', () => closePopup(popupPicture));

popupList.forEach(popup => popup.addEventListener('click', () => closePopup(popup), false));
formList.forEach(form => form.addEventListener('click', (event) => event.stopPropagation()));
pictureFull.addEventListener('click', (event) => event.stopPropagation());