import { initialCards, config } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupList = document.querySelectorAll('.popup');
const formList = document.querySelectorAll('.popup__form');

// переменные формы профиля
const popupProfile = document.querySelector('.popup_profile');
const profileElement = popupProfile.querySelector('.popup__form_profile');
const nameInput = profileElement.querySelector('.popup__input_type_name');
const jobInput = profileElement.querySelector('.popup__input_type_job');
const profileCloseButton = popupProfile.querySelector('.popup__button-close_profile');

// переменные профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileOpenButton = document.querySelector('.profile__button-edit');

// переменные формы картинок
const popupPictureForm = document.querySelector('.popup_picture-form');
const pictureElement = popupPictureForm.querySelector('.popup__form_add-picture'); 
const titleInput = pictureElement.querySelector('.popup__input_type_title');
const linkInput = pictureElement.querySelector('.popup__input_type_link');
const pictureFormOpenButton = document.querySelector('.profile__button-add');
const pictureFormCloseButton = popupPictureForm.querySelector('.popup__button-close_picture');

// переменные попапа картинок
const popupPicture = document.querySelector('.popup_picture-full');
const pictureCloseButton = popupPicture.querySelector('.popup__button-close_picture-full');
const pictureFull = popupPicture.querySelector('.popup__full-picture');

// карточки
const initialCardsList = document.querySelector('.cards');

//валидация
const cardFormValidator = new FormValidator(config, popupPictureForm);
const editFormValidator = new FormValidator(config, popupProfile);

function openForm(popupName) {    
    popupName.classList.add('popup_opened');   
}

function closeForm(popupName) {
    popupName.classList.remove('popup_opened');
  
    document.removeEventListener('keydown', closePopupByEsc);  
}

function closePopupByEsc(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if(evt.key === 'Escape') {
        closeForm(openedPopup); 
    }
}

function openProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;

    editFormValidator.toggleButtonState();

    openForm(popupProfile);
}

function openPictureForm() {
    pictureElement.reset();
    
    cardFormValidator.toggleButtonState();

    openForm(popupPictureForm);
}

function submitProfileForm (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeForm(popupProfile);
}

function removeCard(evt) {
  const element = evt.target.closest(".cards__item");
  element.remove();
}

function submitPictureForm(evt) {
    evt.preventDefault();
    
    const pictureObject = {name: titleInput.value, link: linkInput.value};
    const cardElement = new Card(pictureObject, '.cards__template');
    initialCardsList.prepend(cardElement.createPicture());

    closeForm(popupPictureForm);
}

initialCards.forEach(item => {
    const card = new Card(item, '.cards__template');
    const cardElement = card.createPicture();
    initialCardsList.append(cardElement);
})

cardFormValidator.enableValidation();
editFormValidator.enableValidation();

profileOpenButton.addEventListener('click', () => openProfileForm());
profileCloseButton.addEventListener('click', () => closeForm(popupProfile));
profileElement.addEventListener('submit', submitProfileForm);

pictureFormOpenButton.addEventListener('click', () => openPictureForm());
pictureFormCloseButton.addEventListener('click', () => closeForm(popupPictureForm));
pictureElement.addEventListener('submit', submitPictureForm);

pictureCloseButton.addEventListener('click', () => closeForm(popupPicture));

popupList.forEach(popup => popup.addEventListener('click', () => closeForm(popup), false));
formList.forEach(form => form.addEventListener('click', (event) => event.stopPropagation()));
pictureFull.addEventListener('click', (event) => event.stopPropagation());

document.addEventListener('keydown', (evt) => closePopupByEsc(evt));