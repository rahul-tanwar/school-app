import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Notification } from '../../shared/models/Notifications';

@IonicPage()
@Component({
    selector: 'page-notice-detail',
    templateUrl: 'notice-detail.html',
})
export class NoticeDetailPage {

    public notice: Notification = new Notification();

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        debugger;
        this.notice = navParams.get('data');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NoticDetailPage');
    }
}
