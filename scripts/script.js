// переменные формы
const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const closeFormButton = popup.querySelector('.popup__button-close');

// переменные профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const openFormButton = document.querySelector('.profile__button-edit');

function openForm() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function closeForm() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeForm();
}

openFormButton.addEventListener('click', openForm);
closeFormButton.addEventListener('click', closeForm);
formElement.addEventListener('submit', formSubmitHandler);