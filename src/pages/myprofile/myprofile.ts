import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { TeacherProfile } from '../../shared/models/TeacherProfile';
import { TeacherAccountService } from '../../shared/services/TecherAccountService';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { ResponseModel } from '../../shared/models/ResponseModel';
import { Messages } from '../../shared/Helper/Messages';
import { TOAST } from '../../shared/Enums';

@IonicPage()
@Component({
    selector: 'page-myprofile',
    templateUrl: 'myprofile.html',
    providers: [UIHelper],
})
export class MyProfilePage {


    teacher: TeacherProfile;
    toast = TOAST;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private UiHelper: UIHelper, private teacherAccountService: TeacherAccountService) {
        this.teacher = new TeacherProfile();
    }

    goBack() {
        this.navCtrl.pop();
    }

    getProfile() {
        this.UiHelper.ShowSpinner();
        this.teacherAccountService.getProfile().subscribe((result: TeacherProfile) => {
            this.UiHelper.HideSpinner();
            if (!!result) {
                this.teacher = result;

                if (this.teacher.Gender == "1") {
                    this.teacher.Gender = "Male";
                }
                else {
                    this.teacher.Gender = "Female";
                }
            }
        }, (error1: any) => {
            this.UiHelper.HideSpinner();
            this.UiHelper.ShowAlert("", "Looks like something went wrong please contact admin");
        });
    }

    updateProfile() {
        this.UiHelper.ShowSpinner();

        var teacherData = new TeacherProfile();

        teacherData.ContactNumber = this.teacher.ContactNumber;
        teacherData.DOB = this.teacher.DOB;
        teacherData.Email = this.teacher.Email;
        teacherData.FirstName = this.teacher.FirstName;
        teacherData.LastName = this.teacher.LastName;
        teacherData.UserId = this.teacher.UserId;

        teacherData.Gender = "1";
        if (this.teacher.Gender == "Female") {
            teacherData.Gender = "2";
        }

        this.teacherAccountService.updateProfile(teacherData)
            .subscribe((result: ResponseModel) => {
                this.UiHelper.HideSpinner();

                if (!!result) {
                    console.log(result);
                    if (result.IsSuccess) {
                        this.UiHelper.showToast(Messages.ProfileUpdate, this.toast.SUCCESS);

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
        this.getProfile();
    }
}
