import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AuthProvider } from '../../providers/auth/auth';
import { ChildProfilePage } from './../childprofile/childprofile';
import { ChangePasswordPage } from "./../change-password/change-password";
import { ParentProfilePage } from "./../parent-profile/parent-profile";
import { UIHelper } from '../../shared/Helper/UIHelper';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
    providers: [UIHelper]
})
export class ProfilePage {

    parentProfileTab: any;
    childProfileTab: any;
    ChangePasswordTab: any;


    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.parentProfileTab = ParentProfilePage;
        this.childProfileTab = ChildProfilePage;
        this.ChangePasswordTab = ChangePasswordPage;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
    }

}
