import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParentService } from '../../shared/services/ParentService';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { Parent } from '../../shared/models/parent';
import { TOAST } from '../../shared/Enums';

/**
 * Generated class for the ParentProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-parent-profile',
    templateUrl: 'parent-profile.html',
    providers: [UIHelper]
})
export class ParentProfilePage {

    public parent: Parent = new Parent();
    toast = TOAST

    constructor(
        public uIHelper: UIHelper,
        public parentService: ParentService,
        public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.uIHelper.ShowSpinner();
        this.parentService.getParentById(LoginStaticData.UserInfo.UserId).subscribe((result) => {
            if (!!result) {
                this.parent = result;
            }
            this.uIHelper.HideSpinner();
        }, (error) => {
            this.uIHelper.HideSpinner();
            this.uIHelper.showToast(error.error, this.toast.ERROR);
        });
    }

    public save() {
        this.uIHelper.ShowSpinner();
        this.parentService.updateParent(this.parent).subscribe((result: boolean) => {
            this.uIHelper.HideSpinner();
            if (result) {
                this.uIHelper.showToast('Successfully updated', this.toast.SUCCESS);
            }
        }, (error) => {
            this.uIHelper.HideSpinner();
            this.uIHelper.showToast(error.error, this.toast.ERROR);
        });
    }

    goBack() {
        this.navCtrl.pop();
    }

}
