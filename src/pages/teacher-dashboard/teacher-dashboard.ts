import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { StudentCheckInPage } from './../student-check-in/student-check-in';
import { ActionPage } from './../action/action';
import { MenuTeacherPage } from "./../menu-teacher/menu-teacher";
import { UIHelper } from '../../shared/Helper/UIHelper';
import { ActivityService } from '../../shared/services/ActivityService';
import { NotificationService } from '../../shared/services/NotificationService';
import { ActivityType, ActivitySubType, ActivitySubTypeChild } from '../../shared/models/Activity';
import { NotificationDetails, NotificationType } from '../../shared/models/Notifications';
import { DataHelper } from '../../shared/Helper/DataHelper';

@IonicPage()
@Component({
    selector: 'page-teacher-dashboard',
    templateUrl: 'teacher-dashboard.html',
    providers: [UIHelper, DataHelper]
})
export class TeacherDashboardPage {
    studentCheckinTab: any;
    actionTab: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private changeDetectorRef: ChangeDetectorRef,
        private popoverCtrl: PopoverController,
        private UiHelper: UIHelper, private dataHelper: DataHelper,
        public activityService: ActivityService, private notificationService: NotificationService) {
        this.studentCheckinTab = StudentCheckInPage;
        this.actionTab = ActionPage;

    }
    presentPopover(ev) {

        let popover = this.popoverCtrl.create(MenuTeacherPage);
        popover.present({
            ev: ev
        });
    }

    ionViewDidLoad() {
        this.changeDetectorRef.detectChanges();
        this.changeDetectorRef.markForCheck();
        this.setActivityLocalStorage();
        this.setNotificationTypeLocalStorage();
    }



    setActivityLocalStorage() {

        var localStorageActivity = localStorage.getItem('activitydata');
        if (localStorageActivity == null) {

            this.activityService.getActivities()
                .subscribe((result: ActivityType[]) => {

                    if (!!result) {
                        var data = result;
                        localStorage.setItem('activitydata', JSON.stringify(data));
                    }
                }, (error1: any) => {
                    this.UiHelper.HideSpinner();
                    localStorage.removeItem("activitydata");
                });
        }
    }

    setNotificationTypeLocalStorage() {

        var localStorageNotificationTypes = localStorage.getItem('notificationtypes');
        if (localStorageNotificationTypes == null) {
            this.UiHelper.ShowSpinner();
            this.notificationService.getNotificationTypes()
                .subscribe((result: NotificationType[]) => {
                    this.UiHelper.HideSpinner();
                    if (!!result) {
                        var data = result;
                        localStorage.setItem('notificationtypes', JSON.stringify(data));
                    }
                }, (error1: any) => {
                    this.UiHelper.HideSpinner();
                    localStorage.removeItem("notificationtypes");
                });
        }
    }

}
