import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

  //EVERY TIME PAGE IS REFRESHED WILL LOGOUT
  isLoggedIn: boolean = JSON.parse(
    localStorage.getItem('this.apiService.isLoggedIn')!
  );
  //
  body: any;

  retrievedToken = '';

  // username: "TheHui"
  // password: "huiareyouhuihuihuihui"
  login(
    username: string | null | undefined,
    password: string | null | undefined
  ) {
    console.log('LOGIN IS RUNNING FROM API SERVICE');
    const loginBody = { username, password };
    return this.http.post('http://localhost:3000/login', loginBody);
  }
  logout() {
    console.log('LOGOUT IS RUNNING FROM API SERVICE');
    if (confirm('Are you sure you want to logout?')) {
      localStorage.setItem('localStorageSuperSecretKey', '');
      this.isLoggedIn = false;
      localStorage.setItem('this.apiService.isLoggedIn', 'false');
      this.router.navigate(['login']);
    }
  }
  sessionTimeOut() {
    console.log('SESSION TIME OUT IS RUNNING FROM API SERVICE');
    alert('Session timed out. Please login.');
    localStorage.setItem('localStorageSuperSecretKey', '');
    this.isLoggedIn = false;
    localStorage.setItem('this.apiService.isLoggedIn', 'false');
    this.router.navigate(['login']);
  }
  isAuthenticated() {
    console.log('IS LOGGED IN = ' + this.isLoggedIn);
    let localStorageLoginState = localStorage.getItem(
      'this.apiService.isLoggedIn'
    );
    console.log('LOCAL STORAGE LOGIN STATE IS: ' + localStorageLoginState);
    return this.isLoggedIn;
  }

  getRequestOptions() {
    console.log('GET REQUEST OPTIONS IS RUNNING FROM API SERVICE');
    var requestOptions = {
      headers: new HttpHeaders({
        Authorization: this.retrievedToken,
      }),
    };
    return requestOptions;
  }
  //PARSE JWT METHOD
  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  getToken() {
    console.log('GET TOKEN IS RUNNING FROM API SERVICE');
    var tokenSentToApi = JSON.parse(
      localStorage.getItem('localStorageSuperSecretKey')!
    );
    console.log('TOKEN IS: ' + tokenSentToApi.token);
    return tokenSentToApi.token;
  }
  getAllUsers() {
    console.log('GET ALL USERS IS RUNNING FROM API SERVICE');
    this.retrievedToken = this.getToken();
    return this.http.get(
      'http://localhost:3000/users',
      this.getRequestOptions()
    );
  }
  getUser() {
    this.retrievedToken = this.getToken();
    return this.http.get(
      'http://localhost:3000/users/username',
      this.getRequestOptions()
    );
  }
  createUser() {
    this.retrievedToken = this.getToken();
    return this.http.post(
      'http://localhost:3000/users',
      this.body,
      this.getRequestOptions()
    );
  }
  //
  getAllNotes(username: string) {
    console.log('GET ALL NOTES IS RUNNING FROM API SERVICE');
    this.retrievedToken = this.getToken();
    return this.http.get(
      'http://localhost:3000/notes/' + username,
      this.getRequestOptions()
    );
  }
  getNote(username: string, id: string) {
    console.log('GET ALL NOTES IS RUNNING FROM API SERVICE');
    this.retrievedToken = this.getToken();
    return this.http.get(
      'http://localhost:3000/notes/' + username + '/' + id,
      this.getRequestOptions()
    );
  }
  createNote(username: any, note: any) {
    console.log('CREATE NOTE RUNNING FROM API SERVICE');
    this.retrievedToken = this.getToken();
    this.body = note;
    return this.http.post(
      'http://localhost:3000/notes/' + username,
      this.body,
      this.getRequestOptions()
    );
  }

  updateUser() {
    this.retrievedToken = this.getToken();
    return this.http.put(
      'http://localhost:3000/users/username',
      this.body,
      this.getRequestOptions()
    );
  }
  deleteUser() {
    this.retrievedToken = this.getToken();
    return this.http.delete(
      'http://localhost:3000/users/username',
      this.getRequestOptions()
    );
  }
}
