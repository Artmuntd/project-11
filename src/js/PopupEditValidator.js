export class PopupEditValidator extends FormValidator {
    constructor(form) {
      super(form);
    }
  
    checkInputValidity(input) {
      const validity = input.validity;
  
      if (validity.valueMissing) {
        console.log("validity.valueMissing");
        input.setCustomValidity(`это поле обязательно для заполнения`);
        this.setError(input);
        return false;
      }
  
      if (validity.tooShort) {
        input.setCustomValidity(`от ${input.getAttribute('minLength')} символов до ${input.getAttribute('maxlength')} символов`);
        this.setError(input);
        console.log("validity.tooShort");
        return false;
      }
  
      if (validity.tooLong) {
        input.setCustomValidity(`от ${input.getAttribute('minLength')} символов до ${input.getAttribute('maxlength')} символов`);
        this.setError(input);
        console.log("validity.tooLong");
        return false;
      }
  
      input.setCustomValidity('');
      this.setError(input);
      return true
    }
  
  };