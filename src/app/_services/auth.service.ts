import { Injectable } from '@angular/core';
import { find, toLower } from 'lodash';


@Injectable()
export class AuthService {

    public loggedUser: any;

    public authData = {
      "user1" : {
        "name": "Admin",
        "permission": "all",
        "password": "Admin"
      },
      "user2" : {
        "name": "ranjith",
        "permission": "none",
        "password": "ranjith"
      }
    };


    /**
     * This methos is used to check the login data
     * @param {string} username username 
     * @param {string} password password
     * @returns
     * @memberof AuthService
     */
    public checkLogin(username: string, password: string) {
        return find(this.authData, (o) => {
          if(toLower(o.name) === toLower(username) && toLower(o.password) === toLower(password)){
            this.setLoggedUser(o);
            return true;
          } });
    }

    /**
     * This method is used to set the logged user data
     * @param {*} user
     * @memberof AuthService
     */
    public setLoggedUser(user: any) {
      this.loggedUser = user;
    }

    /**
     * This method is used to return logged user data
     * @returns
     * @memberof AuthService
     */
    public getLoggedUser() {
      return this.loggedUser;
    }
}
