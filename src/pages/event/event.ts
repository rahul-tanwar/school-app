import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { NotificationService } from '../../shared/services/NotificationService';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { Notification } from '../../shared/models/Notifications';
import * as moment from 'moment';
//import { EventDetailPage } from '../event-detail/event-detail';

export class EventGroup {
    public date: moment.Moment;
    public events: Notification[];
}


@IonicPage()
@Component({
    selector: 'page-event',
    templateUrl: 'event.html',
})
export class EventPage {

    public events: Array<Notification> = [];
    public eventGroup: EventGroup[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public viewCtrl: ViewController,
        public notificationService: NotificationService,
    private modalCtrl:ModalController) {
    }

    ionViewDidLoad() {
        this.getEvents();
    }


    private getEvents() {
        this.notificationService.getStudentNotifications(LoginStaticData.UserInfo.AppSelectedStudent.toString()).subscribe((result: Notification[]) => {
            if (result && result.length) {
                this.events = result.filter(item => item.NotificationTypeId === 2);
                this.groupEventsByDate();
            }
        });
    }

    private groupEventsByDate() {
        this.events.forEach((event: Notification) => {
            const index = this.eventGroup.findIndex((item) => moment(item.date).isSame(moment(event.CreatedDate), 'day'));
            if (index > -1) {
                this.eventGroup[index].events.push(event);
            } else {
                this.eventGroup.push({
                    date: event.CreatedDate,
                    events: [event]
                });
            }
        });
    }

   public goToEventDetail(event: Notification): void {
        let eventModal = this.modalCtrl.create('EventDetailPage',{data:event});
        eventModal.onDidDismiss(data => {
        });
        eventModal.present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

   

}
