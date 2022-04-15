// переменные формы профиля
const popupProfile = document.querySelector('.popup_profile');
const profileElement = popupProfile.querySelector('.popup__profile-form');
const nameInput = profileElement.querySelector('.popup__input_type_name');
const jobInput = profileElement.querySelector('.popup__input_type_job');
const profileCloseButton = popupProfile.querySelector('.popup__button-close_profile');

// переменные профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileOpenButton = document.querySelector('.profile__button-edit');

// переменные формы картинок
const popupPictureForm = document.querySelector('.popup_picture-form');
const pictureElement = popupPictureForm.querySelector('.popup__add-picture-form'); 
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
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function openForm(popupName) {
    popupName.classList.add('popup_opened');
}

function closeForm(popupName) {
    popupName.classList.remove('popup_opened');
}

function openProfileForm() {
    openForm(popupProfile);

    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function openPicture(element) {
    openForm(popupPicture);

    pictureFull.setAttribute ('src', `${element.link}`);
    pictureFull.setAttribute ('alt', `${element.name}`);
    titlePicture.textContent = element.name;
}

function profileSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeForm(popupProfile);
}

function addPicture(element) {
  const cardsElement = cardsTemplate.cloneNode(true);
  const imageElement = cardsElement.querySelector('.cards__image');
  const cardsButtonDelete = cardsElement.querySelector('.cards__button-delete');
  const cardsButtonLike = cardsElement.querySelector('.cards__button-like');
  imageElement.setAttribute ('src', `${element.link}`);
  imageElement.setAttribute ('alt', `${element.name}`);
  cardsElement.querySelector('.cards__title').textContent = element.name;

  cardsButtonDelete.addEventListener('click', removeCard);
  cardsButtonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__button-like_active');
  });
  
  imageElement.addEventListener('click', () => openPicture(element));

  initialCardsList.prepend(cardsElement);
}

function removeCard(evt) {
  const element = evt.target.closest(".cards__item");
  element.remove();
}

function pictureSubmitHandler (evt) {
    evt.preventDefault();

    addPicture({name: titleInput.value, link: linkInput.value});
    
titleInput.value = '';
linkInput.value = '';

    closeForm(popupPictureForm);
}

initialCards.forEach(element => addPicture(element));

profileOpenButton.addEventListener('click', () => openProfileForm());
profileCloseButton.addEventListener('click', () => closeForm(popupProfile));
profileElement.addEventListener('submit', profileSubmitHandler);

pictureFormOpenButton.addEventListener('click', () => openForm(popupPictureForm));
pictureFormCloseButton.addEventListener('click', () => closeForm(popupPictureForm));
pictureElement.addEventListener('submit', pictureSubmitHandler);

pictureCloseButton.addEventListener('click', () => closeForm(popupPicture));