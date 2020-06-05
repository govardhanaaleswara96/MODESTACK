import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ModeStackService {
  userUrl = 'http://localhost:3000/mode-stack/register';
  loginUrl = 'http://localhost:3000/mode-stack/login';
  articleUrl = 'http://localhost:3000/mode-stack/articles';

  token;
  constructor(private http: HttpClient) {}
  createUser(user) {
    return this.http.post(this.userUrl, user).toPromise();
  }
  logUser(user) {
    return this.http.post(this.loginUrl, user).toPromise();
  }
  createArticle(data) {
    return this.http.post(this.articleUrl, data).toPromise();
  }
  getArticles() {
    return this.http.get(this.articleUrl).toPromise();
  }
  // token and user values
  setToken(data) {
    sessionStorage.setItem('token', data);
  }
  getToken() {
    return sessionStorage.getItem('token');
  }
  getUserDetails() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return JSON.parse(window.atob(token.split('.')[1]));
  }
  getUserName() {
    const user = this.getUserDetails();
    return user['user'].username;
  }
  tokenRemove() {
    return sessionStorage.removeItem('token');
  }
}
