import { Component } from '@angular/core';
import {
    IonicPage,
    NavController
} from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {
    constructor(public navCtrl: NavController) {
    }

    goToLogin(loginBy): void {
        window.localStorage.clear();
        this.navCtrl.push(LoginPage, {
            loginBy: loginBy
        })
    }

}
