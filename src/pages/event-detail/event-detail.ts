import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Notification } from '../../shared/models/Notifications';
import { ActivityService } from '../../shared/services/ActivityService';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { TOAST } from '../../shared/Enums';

@IonicPage()
@Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html',
    providers: [UIHelper]
})
export class EventDetailPage {

    public event: Notification = new Notification();
    private toast = TOAST;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public activityService: ActivityService,
        public uIHelper: UIHelper) {
        debugger;
        this.event = navParams.get('data');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventDetailPage');
    }

    sendResponse(): void {
        this.uIHelper.ShowSpinner();
        this.activityService.sendNotificationResponse(this.event.NotificationsMappingId, this.event.Response).subscribe((result: any) => {
            this.uIHelper.HideSpinner();
            if (!!result && result.IsSuccess) {
                this.uIHelper.showToast('Successfully sent', this.toast.SUCCESS)
            }

        });
    }


}
