function enableValidation(config) {
  const form = document.querySelector(config.formSelector);
  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach(element => {
    element.addEventListener('input', (event) => handleFormInput(event, form, config));
  })

  form.addEventListener('submit', (event) => handleFormSubmit(event, form));

  toggleButton(form, config);
}

function toggleButton(form, config) {
  const button = form.querySelector(config.buttonSelector);

  button.disabled = !form.checkValidity();

  button.classList.toggle('popup__button_disabled', !form.checkValidity());
}

function handleFormSubmit(event) {
  event.preventDefault();
}

function handleFormInput(event, form, config) {
  const input = event.target;
  const errorNode = document.querySelector(`#${input.id}-error`);
  
  if (input.validity.valid) {
    errorNode.textContent = '';
  } else {
    errorNode.textContent = input.validationMessage;
  }

  toggleButton(form, config);
}

enableValidation({
  formSelector: '.popup__form_profile',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
})

enableValidation({
  formSelector: '.popup__form_add-picture',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
})