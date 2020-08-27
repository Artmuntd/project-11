 class Popup {
    constructor(popupElement) {
      
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
  
      this.popupElement = popupElement;
    }
  
    open() {
      this.toggleModal();
    }
  
    close() {
      this.toggleModal();
    }
  
    toggleModal() {
      this.popupElement.classList.toggle("popup_is-opened");
    }
  
    setEventListeners() {
      this
        .popupElement
        .querySelector('.popup__close')
        .addEventListener('click', this.close);
    }
  }