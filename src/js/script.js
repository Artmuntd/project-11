import "../css/pages/index.css";
import Api  from "../js/API";
import  AddNewCardPopup from "../js/AddNewCardPopup";
import Card from "../js/Card";
import  CardList  from "../js/CardList";
import EditUserInfoPopup from "../js/EditUserInfoPopup";
import PopupEditValidator  from "../js/PopupEditValidator";
import PopupImage from "../js/PopupImage";
import PopupNewValidator from "../js/PopupNewValidator";
import UserInfo from "../js/UserInfo";


(function () {


  const api = new Api({
    baseUrl:  process.env.NODE_ENV=='development'? 'http://nomoreparties.co/cohort12' : 'https://nomoreparties.co/cohort12',
    headers: {
      authorization: 'dde68826-0ccf-4c1b-a8b9-7200aa93f8eb',
      'Content-Type': 'application/json'
    }
  });

  const cards = [];

  const cardList = new CardList(document.querySelector('.places-list'), cards);
  cardList.setEventListeners();
  cardList.render();

  const createCard = (name, link) => {
    const card = new Card(name, link);
    const cardElement = card.create();
    card.setEventListeners();
    return cardElement;
  }

  const addNewCardPopup = new AddNewCardPopup(document.querySelector("#popup-new"), cardList, createCard);
  addNewCardPopup.setEventListeners();

  
  const userInfo = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'));
  const editUserInfoPopup = new EditUserInfoPopup(document.querySelector("#popup-edit"), userInfo, api);
  editUserInfoPopup.setEventListeners();

  const popupImage = new PopupImage(document.querySelector("#popup-image"));
  popupImage.setEventListeners();
  cardList.setPopup(popupImage);



  document.querySelector(".user-info__button").addEventListener('click', addNewCardPopup.open);
  document.querySelector(".edit_profile").addEventListener('click', editUserInfoPopup.open);




  const popupEditValidator = new PopupEditValidator(editUserInfoPopup.popupElement.querySelector(".popup__form"));
  const popupNewValidator = new PopupNewValidator(addNewCardPopup.popupElement.querySelector(".popup__form"));


  popupEditValidator.setEventListeners();
  popupNewValidator.setEventListeners();


  api.getInfoUser()
    .then((data) => {
      const avatar = document.querySelector('.user-info__photo');
      userInfo.setUserInfo(data.name, data.about);
      avatar.style.backgroundImage = "url(" + data.avatar + ")";
      userInfo.updateUserInfo();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });


  api.getCards()
    .then((data) => {
      data.forEach((item) => {
        const card = new Card(item.name, item.link);
        cards.push(card);
      });
      cardList.render();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
})();



