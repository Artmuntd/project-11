class AddNewCardPopup extends Popup {
    constructor(popupElement, cardList, createCard) {
      super(popupElement);
      this.cardList = cardList;
      this.createCard = createCard;
  
      this.handleAddButtonEvent = this.handleAddButtonEvent.bind(this);
    }
  
    open() {
      super.open();
      
      this.popupElement.querySelector('.popup__input_type_name').dispatchEvent(new Event("input"));
      this.popupElement.querySelector('.popup__input_type_link-url').dispatchEvent(new Event("input"));
      this.popupElement.querySelector(".popup__form").dispatchEvent(new Event("input"));
    }
  
    close() {
      super.close();
      this.popupElement.querySelector(".popup__form").reset();
    }
  
    handleAddButtonEvent(event) {
  
      event.preventDefault();
  
      const inputName = this.popupElement.querySelector('.popup__input_type_name');
      const inputLink = this.popupElement.querySelector('.popup__input_type_link-url');

   
      const cardElement = this.createCard(inputName.value, inputLink.value);
      this.cardList.addCard(cardElement);
  
      this.close();
    }
  
    setEventListeners() {
      super.setEventListeners();
  
      this
        .popupElement
        .querySelector('.popup__form')
        .addEventListener('submit', this.handleAddButtonEvent);
    }
  
  }