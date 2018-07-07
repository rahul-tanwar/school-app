import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ActivitiesPage } from './../activities/activities';
import { NotificationsPage } from "./../notifications/notifications";
import { CalenderPage } from './../calender/calender';
import { ParentMenuPage } from '../../pages/parent-menu/parent-menu';
//import { ActionPage } from "./../action/action";

@IonicPage()
@Component({
    selector: 'page-parent-dashboard',
    templateUrl: 'parent-dashboard.html',
})
export class ParentDashboardPage {

    activityTab: any;
    notificationTab: any;
    clalenderTab: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private popoverCtrl: PopoverController) {
        this.activityTab = ActivitiesPage;
        this.notificationTab = NotificationsPage;
        this.clalenderTab = CalenderPage;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ParentDashboardPage');

    }
    presentPopover(ev) {
        let popover = this.popoverCtrl.create(ParentMenuPage);
        popover.present({
            ev: ev
        });
    }



}
