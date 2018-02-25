'use strict';
(function () {
  var nav = document.querySelector('.main-navigation');
  var toggleButton = document.querySelector('.site-list__toggle');
  var openMenuBar = document.querySelector('.site-list__item-logo');

  var sendForm = document.querySelector('.competition-form__button-submit');
  var formError = document.querySelector('.form-error');
  var formErrorClose = document.querySelector('.form-error__close');
  var formConfirm = document.querySelector('.form-confirm');
  var formConfirmClose = document.querySelector('.form-confirm__close');

  // Открытие и закрытие мобильного меню!
  toggleButton.addEventListener('click', function() {
    if (nav.classList.contains('main-navigation--close')) {
      nav.classList.remove('main-navigation--close');
      openMenuBar.classList.remove('site-list__item-logo--close');
      toggleButton.classList.remove('site-list__toggle--close');
      toggleButton.classList.add('site-list__toggle--opened');
    } else {
      nav.classList.add('main-navigation--close');
      nav.classList.remove('main-navigation--opened');
      openMenuBar.classList.add('site-list__item-logo--close');
      openMenuBar.classList.remove('site-list__item-logo--opened');
      toggleButton.classList.add('site-list__toggle--close');
      toggleButton.classList.remove('site-list__toggle--opened');
    }
  });

  // Открытие и закрытие модальных окон в форме
  var form = document.querySelector('.competition-form'), formElements = [].slice.call(form.querySelectorAll('input'));

  function openSuccessModal() {
    formConfirm.classList.remove('form-confirm--close');
    formConfirm.classList.add('form-confirm--opened');
  }

  function openErrorModal() {
    formError.classList.remove('form-error--close');
    formError.classList.add('form-error--opened');
  }

  form.addEventListener('submit', function(e) {
    openSuccessModal();
    e.preventDefault();
  });

  formElements.forEach(formElement, function(e) {
    formElement.addEventListener('invalid', function(e) {
      openErrorModal();
    });
  });

  formErrorClose.addEventListener('click', function() {
    formError.classList.add('form-error--close');
    formError.classList.remove('form-error--opened');
  });

  formConfirmClose.addEventListener('click', function() {
    formConfirm.classList.add('form-confirm--close');
    formConfirm.classList.remove('form-confirm--opened');
  });
})();
