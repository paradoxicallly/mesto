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
const titlePicture = popupPicture.querySelector('.popup__picture-title');
const pictureFull = popupPicture.querySelector('.popup__full-picture');

// карточки
const initialCardsList = document.querySelector('.cards');
const cardsTemplate = document.querySelector('.cards__template').content;

function openForm(popupName) {    
    popupName.classList.add('popup_opened');   

    document.addEventListener('keydown', closePopupByEsc);
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

    openForm(popupProfile);
}

function openPictureForm() {
    titleInput.value = '';
    linkInput.value = '';

    openForm(popupPictureForm);
}

function openPicture(element) {
    pictureFull.src = element.link;
    pictureFull.alt = element.name;
    titlePicture.textContent = element.name;

    openForm(popupPicture);
}

function submitProfileForm (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeForm(popupProfile);
}

function createPicture(element) {
  const cardsElement = cardsTemplate.cloneNode(true);
  const imageElement = cardsElement.querySelector('.cards__image');
  const cardsButtonDelete = cardsElement.querySelector('.cards__button-delete');
  const cardsButtonLike = cardsElement.querySelector('.cards__button-like');

  imageElement.src = element.link;
  imageElement.alt = element.name;
  cardsElement.querySelector('.cards__title').textContent = element.name;

  cardsButtonDelete.addEventListener('click', removeCard);
  cardsButtonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__button-like_active');
  });
  
  imageElement.addEventListener('click', () => openPicture(element));
  
  return cardsElement;
}

function removeCard(evt) {
  const element = evt.target.closest(".cards__item");
  element.remove();
}

function submitPictureForm(evt) {
    evt.preventDefault();
    
    const pictureObject = {name: titleInput.value, link: linkInput.value};
    initialCardsList.prepend(createPicture(pictureObject));

    closeForm(popupPictureForm);
}

initialCards.forEach(element => initialCardsList.prepend(createPicture(element)));

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