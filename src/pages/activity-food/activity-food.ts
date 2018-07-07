import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentService } from '../../shared/services/StudentService';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { StudentActivity } from '../../shared/models/StudentActivity';
import { Messages } from '../../shared/Helper/Messages';

import { DataHelper } from '../../shared/Helper/DataHelper';
import { ACTIVITY, TOAST } from '../../shared/Enums';
import { ActivityType, ActivitySubType, ActivitySubTypeChild } from '../../shared/models/Activity';
import { ResponseModel } from '../../shared/models/ResponseModel';

import { CameraHelper } from '../../shared/Helper/CameraHelper';
import * as moment from 'moment';


@IonicPage()
@Component({
    selector: 'page-activity-food',
    templateUrl: 'activity-food.html',
    providers: [UIHelper, CameraHelper]
})
export class ActivityFoodPage {


    selectedDate: any;
    selectedTime: any;
    currentActivity: number;
    studentActivity: StudentActivity;
    base64ImageUrl: string;
    toast = TOAST;
    Notes: string;
    activityEnum = ACTIVITY;
    activityType: ActivityType;
    activitySubType: ActivitySubType[];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private studentService: StudentService,
        private UiHelper: UIHelper,
        private dataHelper: DataHelper, private camHelper: CameraHelper) {

        this.currentActivity = this.activityEnum.FOOD;
        this.studentActivity = navParams.get("data");
        this.selectedDate = moment(new Date().toISOString()).locale('es').format();
        this.selectedTime = moment(new Date().toISOString()).locale('es').format();

    }

    intilizeFood() {
        let localStoragedata = localStorage.getItem("activitydata");
        let data = JSON.parse(localStoragedata);
        let activitydata = this.dataHelper.getActivityTypeById(this.currentActivity, data);
        this.activityType = activitydata;
        this.activitySubType = activitydata.ActivitySubType;


    }

    setChildOption(event, data) {
        if (event == false) {
            this.activitySubType.forEach(element => {
                if (element.ActivitySubTypeId == data.ActivitySubTypeId) {
                    element.SubTypeChilds.forEach(child => {
                        child.IsSelected = false;
                    });
                }

            });
        }
    }

    setOtherOption(event, data: ActivitySubTypeChild) {

        if (event == true) {

            this.activitySubType.forEach(e => {
                if (e.ActivitySubTypeId == data.ActivitySubTypeId) {
                    e.IsSelected = true;
                }

            });
            this.activitySubType.forEach(element => {
                if (element.ActivitySubTypeId == data.ActivitySubTypeId) {
                    element.SubTypeChilds.forEach(child => {
                        if (child.ActivitySubTypeChildId != data.ActivitySubTypeChildId) {
                            child.IsSelected = false;
                        }

                    });
                }

            });
        }
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
        let accmy = new ActivityType();
        accmy = this.dataHelper.getActivitySelectedData(this.activityType);
        if (accmy.ActivitySubType == null || accmy.ActivitySubType.length == 0) {
            this.UiHelper.showToast(Messages.PleaseSelectAoption, this.toast.INFO);
            return;
        }

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
                console.log(result);
                if (!!result) {
                    if (result.IsSuccess) {
                        this.UiHelper.showToast(Messages.FoodSaved, this.toast.SUCCESS);
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
        this.intilizeFood();

    }


}
