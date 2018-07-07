import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, } from 'ionic-angular';
import { UIHelper } from '../../shared/Helper/UIHelper';

@IonicPage()
@Component({
    selector: 'page-parent-menu',
    templateUrl: 'parent-menu.html',
    providers: [UIHelper]
})
export class ParentMenuPage {

    constructor(private viewCtrl: ViewController, public navCtrl: NavController,
        private UiHelper: UIHelper) {
    }

    logout() {
        this.viewCtrl.dismiss();
        this.UiHelper.Logout();
    }


    goToProfile(): void {
        // this.viewCtrl.dismiss();
        this.navCtrl.push('ProfilePage');
    }

}
