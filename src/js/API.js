export class Api {

  constructor(options) {

    this.options = options;

  }

  getCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    })
    /*
      Можно лучше: проверка ответа сервера и преобразование из json
      дублируется во всех методах класса Api, лучше вынести в отдельный метод:
        _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
        }
      Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
      не используется вне класса Api   
    */
    .then((res) => {
      if (res.ok) {
        return res.json(); 
      }

      return Promise.reject(res.status);
    })
  }

  getInfoUser() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json(); 
      }

      return Promise.reject(res.status);
    })
  }

  updateInfoUser(userInfoName, userInfoAbout) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: userInfoName,
        about: userInfoAbout
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json(); 
      }

      return Promise.reject(res.status);
    });
  }
}



