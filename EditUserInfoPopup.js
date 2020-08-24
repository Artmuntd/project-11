class EditUserInfoPopup extends Popup {
  constructor(popupElement, userInfo, api) {
    super(popupElement);
    this.editUser = this.editUser.bind(this);
    this.userInfo = userInfo;
    this.api = api;
  }

  open() {
    super.open();

    const userNameInput = this.popupElement.querySelector('.popup__input_type_name');
    const userJobInput = this.popupElement.querySelector('.popup__input_type_job');

    
   
    userNameInput.value = this.userInfo.name;
    userJobInput.value = this.userInfo.job;

    userNameInput.dispatchEvent(new Event("input"));
    userJobInput.dispatchEvent(new Event("input"));
    this.popupElement.querySelector(".popup__form").dispatchEvent(new Event("input"));
  }

  close() {
    super.close();
    this.popupElement.querySelector(".popup__form").reset();
  }

  editUser(event) {

    event.preventDefault();

    const nameInput = this.popupElement.querySelector('.popup__input_type_name');
    const jobInput = this.popupElement.querySelector('.popup__input_type_job');

    this.api.updateInfoUser(nameInput.value, jobInput.value)
      .then((data) => {

        console.log(data);
        this.userInfo.setUserInfo(data.name, data.about);
        this.userInfo.updateUserInfo();
        this.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });   
  }

  setEventListeners() {
    super.setEventListeners();

    this
      .popupElement
      .querySelector('.popup__form')
      .addEventListener('submit', this.editUser);
  }
}