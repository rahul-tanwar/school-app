import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NotificationService } from '../../shared/services/NotificationService';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { Notification } from '../../shared/models/Notifications';
import * as moment from 'moment';

export class NotificationGroup {
    public date: moment.Moment;
    public notices: Notification[];
}


@IonicPage()
@Component({
    selector: 'page-notice',
    templateUrl: 'notice.html',
})
export class NoticePage {
    public notices: Array<Notification> = [];
    public noticesGroup: NotificationGroup[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public viewCtrl: ViewController,
        public notificationService: NotificationService) {
    }


    ionViewDidLoad() {
        this.getNotices();
    }


    private getNotices() {
        this.notificationService.getStudentNotifications(LoginStaticData.UserInfo.AppSelectedStudent.toString()).subscribe((result: Notification[]) => {
            debugger;
            if (result && result.length) {
                this.notices = result.filter(item => item.NotificationTypeId === 3);
                this.groupNoticeData();
            }
        });
    }

    goToNoticeDetail(notice: Notification): void {
        debugger;
        this.navCtrl.push('NoticeDetailPage', {
            data: notice
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    private groupNoticeData() {
        this.notices.forEach((notice: Notification) => {
            const index = this.noticesGroup.findIndex((item) => moment(item.date).isSame(moment(notice.CreatedDate), 'day'));
            if (index > -1) {
                this.noticesGroup[index].notices.push(notice);
            } else {
                this.noticesGroup.push({
                    date: notice.CreatedDate,
                    notices: [notice]
                });
            }
        });
    }
}
