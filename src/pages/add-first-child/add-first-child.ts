import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { Messages } from '../../shared/Helper/Messages';
import { TOAST } from '../../shared/Enums';
import { ParentService } from '../../shared/services/ParentService';
import { Students } from '../../shared/models/Students';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-first-child',
    templateUrl: 'add-first-child.html',
    providers: [UIHelper]
})
export class AddFirstChildPage {

    public childId: string;
    public childCode: string;
    private toast = TOAST;

    constructor(
        private uIHelper: UIHelper,
        private parentService: ParentService) {
    }

    ionViewDidLoad() {

    }

    public addChild(): void {
        if (this.childCode == null || this.childId == null) {
            this.uIHelper.showToast(Messages.ChildIdAndAppCodeNotFound, this.toast.INFO);
            return;
        }

        this.parentService.addChild(this.childId, this.childCode, parseInt(LoginStaticData.UserInfo.UserId)).subscribe((result: Students) => {
            if (!!result) {
                LoginStaticData.UserInfo.AppSelectedStudent = result.StudentId;
                this.uIHelper.OpenPage('ParentDashboardPage');
            }
        }, (error) => {
            this.uIHelper.showToast(error, this.toast.ERROR);
        });

    }

    close(): void {
        this.uIHelper.OpenPage('Login');
    }

}
