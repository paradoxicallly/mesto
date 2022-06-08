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
const pictureTitle = popupPicture.querySelector('.popup__picture-title')

// карточки
const initialCardsList = document.querySelector('.cards');

export { 
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
    pictureTitle,
    initialCardsList,
}