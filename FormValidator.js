class FormValidator {
    constructor(form) {
      this.form = form;
      this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
      this.checkInputValidity = this.checkInputValidity.bind(this);
      this.checkFormInputsValidity = this.checkFormInputsValidity.bind(this);
    }
  
    checkInputValidity(input) {
  
    }
  
    setError(input) {
      input.nextElementSibling.innerText = input.validationMessage;
    }
  
    setSubmitButtonState(event) {
  
      const form = event.currentTarget;
      const addButton = form.querySelector('button');
      const inputs = [...form.querySelectorAll('input')];
  
  
      if (!inputs.every((item) => item.checkValidity())) {
        addButton.setAttribute('disabled', false);
        addButton.classList.add('popup__button_disabled');
      }
      else {
        addButton.removeAttribute('disabled');
        addButton.classList.remove('popup__button_disabled');
      }
    }
  
    checkFormInputsValidity(event) {
      const form = event.currentTarget;
      const addButton = form.querySelector('button');
      const inputs = [...form.querySelectorAll('input')];
  
      inputs.every((item) => this.checkInputValidity(item));
    }
  
    setEventListeners() {
  
      const inputs = [...this.form.querySelectorAll('input')];
  
      for(let i=0; i < inputs.length; i++){
        console.log(i);
        inputs[i].addEventListener('input', (event) => this.checkInputValidity(event.target));
      }
  
      this
        .form
        .addEventListener('input', this.setSubmitButtonState);
    }
  
  }