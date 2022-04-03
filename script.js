const popup = document.querySelector('.popup');
const closeFormButton = popup.querySelector('.popup__close-button');
const openFormButton = document.querySelector('.profile__edit-button');

function toggleForm() {
    popup.classList.toggle('popup_opened');
}

openFormButton.addEventListener('click', toggleForm);
closeFormButton.addEventListener('click', toggleForm);

let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    let profileName = document.querySelector('.profile__title');
    let profileDescription = document.querySelector('.profile__description');

    profileName.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;

    toggleForm();
}

formElement.addEventListener('submit', formSubmitHandler);