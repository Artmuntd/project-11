export default class Card {

    constructor(name, link) {
        this.name = name;
        this.link = link;
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
    }
  
    create() {
  
        const cardTemplate = document.querySelector('#card-template');
        const newCard = document.importNode(cardTemplate.content, true);
        newCard.querySelector('.place-card__name').textContent = this.name;
        newCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
       
  
        this.cardElement = newCard;
  
        return newCard;
    }
  
  
    setEventListeners() {
  
        this
            .cardElement
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this.like);
  
        this
            .cardElement
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', this.remove)
    }

  
    like(event) {
        event.target.classList.toggle("place-card__like-icon_liked");
    }
  
    remove(event) {
        const tar = event.target;
        const currentCard = tar.closest('.place-card');

        currentCard
        .querySelector('.place-card__like-icon')
        .removeEventListener('click', this.like);

        currentCard
        .querySelector('.place-card__delete-icon')
        .removeEventListener('click', this.remove);


        currentCard.parentNode.removeChild(currentCard);
    }
};


