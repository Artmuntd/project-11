import "../css/pages";
import AddNewCardPopup from './AddNewCardPopup';
import Api from './API';
import Card from './Card';
import CardList from './CardList';
import EditUserInfoPopup from'./EditUserInfoPopup';
import FormValidator from'./FormValidator';
import Popup from "./Popup";
import PopupEditValidator from './PopupEditValidator';
import PopupImage from './PopupImage';
import  PopupNewValidator from './PopupNewValidator';
import  UserInfo from './UserInfo';

(function () {


  const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort12',
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


/*
  Хорошая работа, класс Api создан и запросы на сервер выполняются, но
  нужно исправить несколько замечаний

  Надо испарвить:
  - проверку ответа сервера и преобразование из json разместить в классе Api +
  - у всех запросов к серверу должна быть проверка res.ok, что запрос выполнился успешно +
  - базовый адрес сервера и ключ авторизации нужно передавать как параметры конструктора класса Api +
  - все изменения на странице должны происходить, только после того, как сервер ответил подтверждением +

  Можно лучше:
  -  лучше написать загрузку начальных данных с использованием Promise.all

*/

/*
  Отлично, все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/

