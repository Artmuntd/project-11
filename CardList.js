class CardList {
  
    constructor(cardContainer, cards) {
      this.cardContainer = cardContainer;
      this.cards = cards;
      this.handleCardContainerEvent = this.handleCardContainerEvent.bind(this);
    }
  
  
    addCard(cardElement) {
      this.cardContainer.appendChild(cardElement);
    }
  
    render() {
      this.cards.forEach((card) => {
        const cardElement = card.create();
        card.setEventListeners();
        this.addCard(cardElement);
      });
    }
  
    setPopup(popup) {
      this.popupImage = popup;
    }
  
    handleCardContainerEvent(event) {
 

      event.preventDefault()
      const tar = event.target;
      if (tar.classList.contains('place-card__image')) {
        this.popupImage.open(tar.style.backgroundImage);
      }
  
    }
  
    setEventListeners() {
      this
        .cardContainer
        .addEventListener('click', this.handleCardContainerEvent);
    }
  
  };