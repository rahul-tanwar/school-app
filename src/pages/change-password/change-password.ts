import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserChangePassword } from '../../shared/models/User';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { ParentService } from '../../shared/services/ParentService';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { TOAST } from '../../shared/Enums';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-change-password',
    templateUrl: 'change-password.html',
    providers: [UIHelper]
})
export class ChangePasswordPage {

    public userChangePassword: UserChangePassword = new UserChangePassword();
    public toast = TOAST;
    constructor(public uIHelper: UIHelper,
        public parentService: ParentService,
        public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
    }

    public update() {
        this.uIHelper.ShowSpinner();
        this.userChangePassword.UserId = parseInt(LoginStaticData.UserInfo.UserId);
        this.parentService.UpdateParentPassword(this.userChangePassword).subscribe((reuslt) => {
            if (reuslt) {
                this.uIHelper.HideSpinner();
                this.uIHelper.showToast('Successfully updated', this.toast.SUCCESS);
            }
        }, (error) => {
            this.uIHelper.HideSpinner();
            this.uIHelper.showToast(error.error, this.toast.ERROR);
        });
    }
 
}
