import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClassService } from '../../shared/services/ClassService';
import { Class } from '../../shared/models/Class';
import { Students, StudentCheckin } from '../../shared/models/Students';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { Messages } from '../../shared/Helper/Messages';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { TOAST } from '../../shared/Enums';


@IonicPage()
@Component({
    selector: 'page-student-check-in',
    templateUrl: 'student-check-in.html',
    providers: [UIHelper]

})
export class StudentCheckInPage {
    searchQuery: string = '';
    items: string[];
    classes: Class[];
    students: Students[];
    searchData: Students[];
    selectedClass: any;
    showSaveButton: boolean;
    toast = TOAST;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private classService: ClassService,
        private UiHelper: UIHelper) {
    }



    getClassChilds(event: any) {
        this.selectedClass = event;

        this.classService.getStudents(this.selectedClass)
            .subscribe((result: Students[]) => {

                if (result != null) {
                    this.students = result;
                    if (!!this.students && this.students.length) {
                        this.searchData = this.students;
                        this.showSaveButton = true;
                    }
                    else {
                        this.showSaveButton = false;
                        this.searchData = null;
                        this.UiHelper.showToast(Messages.DataNotFound, this.toast.WARNING);
                    }
                }
            }, (error1: any) => {

                this.UiHelper.showToast(Messages.Error, this.toast.ERROR);
            });
    }

    getItems(ev: any) {
        let val = ev.target.value;

        if (!!this.students && this.students.length) {
            if (val && val.trim() != '') {
                this.searchData = this.searchData.filter((item) => {
                    return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1 || String(item.IsPresent).toLowerCase() === val.toLowerCase());
                });
                if (this.searchData.length) {
                    this.showSaveButton = true;
                }

            }
            else {
                this.searchData = this.students;
                return this.searchData;
            }
        }
    }

    setStudentCheckin() {


        if (!!this.searchData && this.searchData.length) {
            var objStudentCheckin: Array<StudentCheckin> = [];
            for (var i = 0; i < this.searchData.length; i++) {
                var p = new StudentCheckin();
                p.UserId = parseInt(LoginStaticData.UserInfo.UserId);
                p.StudentId = this.searchData[i].StudentId;
                p.ClassId = this.searchData[i].ClassId;
                p.IsPresent = this.searchData[i].IsPresent;
                p.UpdatedEmail = LoginStaticData.UserInfo.UserName;
                objStudentCheckin.push(p);
            }

            this.UiHelper.ShowSpinner();
            this.classService.setStudentCheckin(objStudentCheckin)
                .subscribe((result: object) => {
                    this.UiHelper.HideSpinner();
                    if (!!result) {
                        this.UiHelper.showToast(Messages.CheckinSaved, this.toast.SUCCESS);
                    } else {
                        this.UiHelper.showToast(Messages.UnableToSave, this.toast.WARNING);
                    }
                }, (error1: any) => {
                    this.UiHelper.HideSpinner();
                    this.UiHelper.showToast(Messages.Error, this.toast.ERROR);
                });
        }
        else {
            this.UiHelper.showToast(Messages.NoChanges, this.toast.WARNING);
        }
    }

    getAllClassBySchoolId(): void {

        var localClassess = localStorage.getItem('classes');
        if (localClassess != null && localClassess != undefined) {
            this.classes = JSON.parse(localClassess);
            this.selectedClass = this.classes[0].ClassId;
            if (!!this.selectedClass) {
                this.getClassChilds(this.selectedClass);
            }

        }
        else {

            this.classService.getClasses()
                .subscribe((result: Class[]) => {

                    if (!!result) {
                        this.classes = result;
                        this.selectedClass = result[0].ClassId;
                        localStorage.setItem('classes', JSON.stringify(this.classes));
                        if (!!this.selectedClass) {
                            this.getClassChilds(this.selectedClass);
                        }

                    } else {
                        this.UiHelper.showToast(Messages.DataNotFound, this.toast.WARNING);
                    }
                }, (error1: any) => {

                    this.UiHelper.showToast(Messages.Error, this.toast.ERROR);
                });
        }
    }

    ionViewDidLoad() {
        this.getAllClassBySchoolId();

    }
}
