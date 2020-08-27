 class PopupImage extends Popup {
    constructor(popupElement) {
      super(popupElement);
    }
  
    open(link) {
      super.open();
  
      this.popupElement.querySelector('.popup__image').src = link.toString().slice(5, -2);
    }
}