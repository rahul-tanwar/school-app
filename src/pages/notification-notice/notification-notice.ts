import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationService } from '../../shared/services/NotificationService';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { StudentActivity } from '../../shared/models/StudentActivity';
import { NotificationDetails, NotificationType } from '../../shared/models/Notifications';
import { Messages } from '../../shared/Helper/Messages';

import { DataHelper } from '../../shared/Helper/DataHelper';
import { ACTIVITY, TOAST, NOTIFICATION } from '../../shared/Enums';
import { ActivityType, ActivitySubType, ActivitySubTypeChild } from '../../shared/models/Activity';
import { ResponseModel } from '../../shared/models/ResponseModel';

import { CameraHelper } from '../../shared/Helper/CameraHelper';
import * as moment from 'moment';


@IonicPage()
@Component({
    selector: 'page-notification-notice',
    templateUrl: 'notification-notice.html',
    providers: [UIHelper, CameraHelper]
})
export class NotificationNoticePage {


    selectedDate: any;
    selectedTime: any;
    notificationDetails: NotificationDetails;
    notificationType: NotificationType;
    base64ImageUrl: string;
    toast = TOAST;
    Notes: string;
    Title: string;
    activityEnum = ACTIVITY;
    notificationTypeEnum = NOTIFICATION;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private notificationService: NotificationService,
        private UiHelper: UIHelper,
        private dataHelper: DataHelper, private camHelper: CameraHelper) {


        this.notificationDetails = navParams.get("data");
        this.selectedDate = moment(new Date().toISOString()).locale('es').format();
        this.selectedTime = moment(new Date().toISOString()).locale('es').format();

    }


    getCamera() {
        this.camHelper.getCamera().then((result) => {
            this.base64ImageUrl = result;
        });
    }

    getImages() {
        this.camHelper.getImage().then((result) => {
            this.base64ImageUrl = result;
        });
    }

    goBack() {
        this.navCtrl.pop();
    }


    setActivityDetails() {
        let myMoment = moment(this.selectedDate);
        let time = moment(this.selectedTime).format("hh:mm A");
        this.notificationDetails.Title = this.Title;
        this.notificationDetails.Notes = this.Notes;
        this.notificationDetails.ImageType = "jpeg";
        this.notificationDetails.ImageStr = this.base64ImageUrl;
        this.notificationDetails.NotificationType = this.notificationType;
        this.notificationDetails.NotificationDate = myMoment.format("MM/DD/YYYY").toString() + " " + time.toString();

        this.UiHelper.ShowSpinner();
        this.notificationService.setNotificationDetails(this.notificationDetails)
            .subscribe((result: ResponseModel) => {
                this.UiHelper.HideSpinner();
                console.log(result);
                if (!!result) {
                    if (result.IsSuccess) {
                        this.UiHelper.showToast(Messages.NotificationSaved, this.toast.SUCCESS);
                        this.goBack();
                    }
                    else {
                        this.UiHelper.showToast(Messages.UnableToSave, this.toast.WARNING);
                    }
                }
            }, (error1: any) => {
                this.UiHelper.HideSpinner();
                this.UiHelper.showToast(Messages.Error, this.toast.ERROR);
            });
    }

    ionViewDidLoad() {
        let localStoragedata = localStorage.getItem("notificationtypes");
        let data = JSON.parse(localStoragedata);
        this.notificationType = this.dataHelper.getNotificationTypeById(this.notificationTypeEnum.NOTICE, data);

    }


}
