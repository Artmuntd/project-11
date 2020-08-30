import FormValidator from "../js/FormValidator";
export default class PopupNewValidator extends FormValidator {
    constructor(form) {
      super(form);
    }
  
    checkInputValidity(input) {
      const validity = input.validity;
      
      if (validity.valueMissing) {
        console.log("validity.valueMissing");
        return false;
      }
  
      return true
    }
  
  };
  