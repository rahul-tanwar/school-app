import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    selector: 'page-add-child',
    templateUrl: 'add-child.html',
    providers: [UIHelper]
})
export class AddChildPage {

    public childId: string;
    public childCode: string;
    private toast = TOAST;
    public isSecondChild = false;

    constructor(
        private uIHelper: UIHelper,
        private parentService: ParentService,
        private nav: NavController, public navParams: NavParams) {
        this.isSecondChild = navParams.get('data');
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
                if (this.isSecondChild) {
                    this.uIHelper.refreshAppData(result.StudentId.toString());
                    this.nav.pop();
                } else {
                    this.uIHelper.OpenPage('ParentDashboardPage');
                }
            }
        }, (error) => {
            this.uIHelper.showToast(error, this.toast.ERROR);
        });
    }

    public close(): void {
        this.nav.pop();
    }

}
