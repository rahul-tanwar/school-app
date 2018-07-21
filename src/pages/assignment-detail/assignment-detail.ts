import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Notification } from '../../shared/models/Notifications';
import { ActivityService } from '../../shared/services/ActivityService';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { TOAST } from '../../shared/Enums';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the AssignmentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-assignment-detail',
    templateUrl: 'assignment-detail.html',
    providers: [UIHelper]
})
export class AssignmentDetailPage {

    public assignment: Notification = new Notification();
    private toast = TOAST;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public activityService: ActivityService,
        public photoViewer: PhotoViewer,
        public uIHelper: UIHelper) {
        this.assignment = navParams.get('assignmentData');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AssignmentDetailPage');
    }

    goToBack(): void {
        this.navCtrl.pop();
    }

    sendResponse(): void {
        this.uIHelper.ShowSpinner();
        this.activityService.sendNotificationResponse(this.assignment.NotificationsMappingId, this.assignment.Response).subscribe((result: any) => {
            this.uIHelper.HideSpinner();
            if (!!result && result.IsSuccess) {
                this.uIHelper.showToast('Successfully sent', this.toast.SUCCESS)
            }
        });
    }

    imagePreview(imgURL:string){
        this.photoViewer.show(imgURL);
    }

}
