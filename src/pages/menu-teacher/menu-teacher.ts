import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, } from 'ionic-angular';
import { UIHelper } from '../../shared/Helper/UIHelper';

@IonicPage()
@Component({
    selector: 'page-menu-teacher',
    templateUrl: 'menu-teacher.html',
    providers: [UIHelper]
})
export class MenuTeacherPage {

    constructor(private viewCtrl: ViewController, public navCtrl: NavController,
        private UiHelper: UIHelper) {
    }

    logout() {
        this.viewCtrl.dismiss();
        this.UiHelper.Logout();
    }

    myprofile() {
        this.viewCtrl.dismiss();
        this.UiHelper.OpenPage("MyProfilePage");
    }

    goback() {
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SelectStudentPage');
    }


}
