// переменные формы профиля
const popupProfile = document.querySelector('.popup_profile');
const profileElement = popupProfile.querySelector('.popup__form_profile');
const nameInput = profileElement.querySelector('.popup__input_type_name');
const jobInput = profileElement.querySelector('.popup__input_type_job');

// переменные профиля
const profileOpenButton = document.querySelector('.profile__button-edit');
const dataFromPage = {
    profileName: '.profile__title',
    profileDescription: '.profile__description'
}

// переменные формы картинок
const popupPictureForm = document.querySelector('.popup_picture-form');
const pictureFormOpenButton = document.querySelector('.profile__button-add');

// переменные попапа картинок
const popupPicture = document.querySelector('.popup_picture-full');
const pictureFull = popupPicture.querySelector('.popup__full-picture');
const pictureTitle = popupPicture.querySelector('.popup__picture-title')

export { 
    popupProfile,
    nameInput,
    jobInput,
    profileOpenButton,
    dataFromPage,
    popupPictureForm,
    pictureFormOpenButton,
    pictureFull,
    pictureTitle,
}