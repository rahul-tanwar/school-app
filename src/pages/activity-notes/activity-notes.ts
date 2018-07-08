import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentService } from '../../shared/services/StudentService';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { CameraHelper } from '../../shared/Helper/CameraHelper';
import { StudentActivity } from '../../shared/models/StudentActivity';
import { Messages } from '../../shared/Helper/Messages';
import { TOAST, ACTIVITY } from '../../shared/Enums';
import { DataHelper } from '../../shared/Helper/DataHelper';
import { ActivityType, ActivitySubType } from '../../shared/models/Activity';
import * as moment from 'moment';
import { ResponseModel } from '../../shared/models/ResponseModel';

@IonicPage()
@Component({
    selector: 'page-activity-notes',
    templateUrl: 'activity-notes.html',
    providers: [UIHelper, CameraHelper]
})
export class ActivityNotesPage {


    selectedDate: any;
    selectedTime: any;
    currentActivity: number;
    studentActivity: StudentActivity;

    base64ImageUrl: string;
    toast = TOAST;
    Notes: string;
    activityEnum = ACTIVITY;
    SubTypes: ActivitySubType[] = [];
    activityType: ActivityType;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private UiHelper: UIHelper,
        private studentService: StudentService,
        private dataHelper: DataHelper,
        private camHelper: CameraHelper) {
        this.currentActivity = this.activityEnum.NOTES;
        this.selectedDate = moment(new Date().toISOString()).locale('es').format();
        this.selectedTime = moment(new Date().toISOString()).locale('es').format();

        this.studentActivity = navParams.get("data");
    }


    intilizeNotes() {
        let localStoragedata = localStorage.getItem("activitydata");
        let data = JSON.parse(localStoragedata);
        this.activityType = this.dataHelper.getActivityTypeById(this.currentActivity, data);
        this.SubTypes = this.activityType.ActivitySubType;
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
                        this.UiHelper.showToast(Messages.NotesSaved, this.toast.SUCCESS);
                        this.goBack();
                    }
                    else {
                        this.UiHelper.showToast(Messages.UnableToSave, this.toast.WARNING);
                    }
                }
            }, () => {
                this.UiHelper.HideSpinner();
                this.UiHelper.showToast(Messages.Error, this.toast.ERROR);
            });
    }

    ionViewDidLoad() {
        this.intilizeNotes();
    }


}
