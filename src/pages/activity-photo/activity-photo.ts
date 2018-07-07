import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentService } from '../../shared/services/StudentService';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { CameraHelper } from '../../shared/Helper/CameraHelper';
import { StudentActivity, SelectedStudent } from '../../shared/models/StudentActivity';
import { Messages } from '../../shared/Helper/Messages';
import { ACTIVITY, TOAST } from '../../shared/Enums';
import { ActivityType, ActivitySubType, ActivitySubTypeChild } from '../../shared/models/Activity';
import { ResponseModel } from '../../shared/models/ResponseModel';
import * as moment from 'moment';
import { DataHelper } from '../../shared/Helper/DataHelper';

@IonicPage()
@Component({
    selector: 'page-activity-photo',
    templateUrl: 'activity-photo.html',
    providers: [UIHelper, CameraHelper]
})
export class ActivityPhotoPage {

    selectedDate: any;
    selectedTime: any;
    currentActivity: number;
    studentActivity: StudentActivity;
    base64ImageUrl: any;
    toast = TOAST;
    Notes: string;
    activityEnum = ACTIVITY;
    activityType: ActivityType;


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private studentService: StudentService,
        private UiHelper: UIHelper, private dataHelper: DataHelper, private camHelper: CameraHelper) {
        this.currentActivity = this.activityEnum.PHOTO;
        this.studentActivity = navParams.get("data");
        this.selectedDate = moment(new Date().toISOString()).locale('es').format();
        this.selectedTime = moment(new Date().toISOString()).locale('es').format();
    }

    intilizePhoto() {
        let localStoragedata = localStorage.getItem("activitydata");
        let data = JSON.parse(localStoragedata);
        let activitydata = this.dataHelper.getActivityTypeById(this.currentActivity, data);
        this.activityType = activitydata;
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

        if (this.base64ImageUrl == null || this.base64ImageUrl == "") {
            this.UiHelper.showToast("Please choose image", this.toast.INFO);
            return;
        }

        let accmy = new ActivityType();
        accmy = this.dataHelper.getActivitySelectedData(this.activityType);

        this.studentActivity.ActivityType = accmy;
        this.studentActivity.Notes = this.Notes;
        this.studentActivity.ImageType = "jpeg";
        this.studentActivity.ImageStr = this.base64ImageUrl;

        let myMoment = moment(this.selectedDate);
        let time = moment(this.selectedTime).format("hh:mm A");

        this.studentActivity.ActivityDate = myMoment.format("MM/DD/YYYY").toString() + " " + time.toString();

        this.UiHelper.ShowSpinner();
        this.studentService.saveActivityDetails(this.studentActivity)
            .subscribe((result: ResponseModel) => {
                this.UiHelper.HideSpinner();

                if (!!result) {
                    if (result.IsSuccess) {
                        this.UiHelper.showToast(Messages.PhotoSaved, this.toast.SUCCESS);
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
        this.intilizePhoto();

    }
}
