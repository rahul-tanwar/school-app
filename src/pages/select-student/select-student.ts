import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentService } from '../../shared/services/StudentService';
import { ClassService } from '../../shared/services/ClassService';
import { Class } from '../../shared/models/Class';
import { Students } from '../../shared/models/Students';
import { StudentActivity } from '../../shared/models/StudentActivity';
import { NotificationDetails } from '../../shared/models/Notifications';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { LoginStaticData } from '../../shared/models/LoginStaticData';


@IonicPage()
@Component({
    selector: 'page-select-student',
    templateUrl: 'select-student.html',
    providers: [UIHelper],

})
export class SelectStudentPage {
    searchQuery: string = '';
    items: string[] = [];
    activityOrNotificationId: any;
    isNotificationType: boolean;

    students: Students[] = [];
    searchData: Students[] = [];
    showNextButton: boolean;
    allStudent: boolean;
    classes: Class[] = [];
    selectedClass: any;
    activityName: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private studentService: StudentService,
        private classService: ClassService,
        private UiHelper: UIHelper) {

        this.activityOrNotificationId = navParams.get("activityOrNotificationId");
        this.isNotificationType = navParams.get("isNotificationType");
    }

    getItems(ev: any) {
        let val = ev.target.value;
        if (!!this.students && this.students.length) {
            if (val && val.trim() != '') {
                this.searchData = this.searchData.filter((item) => {
                    return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                });
                if (this.searchData.length) {
                    this.showNextButton = true;
                }
            }
            else {
                this.getClassChilds(this.selectedClass);
            }
        }

        this.onFilterChange();
    }

    selectAllStudent(event: any) {
        if (!!this.searchData && this.searchData.length) {
            this.searchData.forEach(element => {
                element.IsPresent = event;
            });
            this.showNextButton = event;
        }
    }

    onFilterChange() {

        this.showNextButton = false;
        let data = this.searchData.filter((item) => {
            return (item.IsPresent == true);
        });

        if (data.length) {
            this.showNextButton = true;
        }

        this.allStudent = false;
        if (data.length && this.searchData.length) {
            if (data.length == this.searchData.length) {
                this.allStudent = true;
            }
        }


    }

    getStudents() {


        var locaStudentData = localStorage.getItem('all-students');
        if (locaStudentData != null && locaStudentData != undefined) {
            this.students = JSON.parse(locaStudentData);
            this.searchData = this.students;
            return;
        }

        else {

            this.UiHelper.ShowSpinner();
            this.studentService.getStudents()
                .subscribe((result: Students[]) => {
                    this.UiHelper.HideSpinner();
                    if (!!result) {
                        this.students = result;
                        if (!!this.students && this.students.length) {
                            this.searchData = this.students;
                            localStorage.setItem('all-students', JSON.stringify(this.searchData));
                        }
                        else {
                            this.searchData = null;
                            this.showNextButton = false;
                        }
                    }
                }, (error1: any) => {
                    this.UiHelper.HideSpinner();
                    this.UiHelper.ShowAlert("", "Data not found");
                });
        }
    }



    getSetClass(classId: number, className: string): Class {
        var c = new Class();
        c.ClassId = classId;
        c.ClassName = className;
        return c;
    }

    setHeaderText(): void {

        if (this.isNotificationType) {
            this.activityName = this.UiHelper.getNotificationPageName(parseInt(this.activityOrNotificationId));
        }
        else {
            this.activityName = this.UiHelper.getActivityName(parseInt(this.activityOrNotificationId)) + " Activity";
        }

    }

    getAllClassBySchoolId(): void {


        this.setHeaderText();
        var localClassess = localStorage.getItem('classes');
        if (localClassess != null && localClassess != undefined) {
            var locaData = JSON.parse(localClassess);

            var objClassess: Array<Class> = [];
            var p = this.getSetClass(0, "All Class");
            objClassess.push(p);
            locaData.forEach(element => {
                objClassess.push(this.getSetClass(element.ClassId, element.ClassName));
            });

            this.classes = objClassess;
            this.selectedClass = this.classes[0].ClassId;
            if (!!this.selectedClass) {
                this.getClassChilds(this.selectedClass);
            }

        }
        else {
            this.classService.getClasses()
                .subscribe((result: Class[]) => {

                    if (!!result) {

                        var objClassess: Array<Class> = [];
                        var p = this.getSetClass(0, "All Class");
                        objClassess.push(p);
                        result.forEach(element => {
                            objClassess.push(this.getSetClass(element.ClassId, element.ClassName));
                        });

                        this.classes = objClassess;
                        localStorage.setItem('classes', JSON.stringify(this.classes));
                        this.selectedClass = objClassess[0].ClassId;
                        if (!!this.selectedClass) {
                            this.getClassChilds(this.selectedClass);
                        }

                    } else {
                        this.UiHelper.ShowAlert("", "Data not found");
                    }
                }, (error1: any) => {

                    this.UiHelper.ShowAlert("", "Data not found");
                });
        }
    }

    getClassChilds(selectedClass: any) {
        if (!!this.students && this.students.length) {
            if (this.selectedClass) {
                this.searchData = this.students.filter((item) => {
                    return (item.ClassId == this.selectedClass);
                });

                this.showNextButton = false;
                var temp = this.searchData.filter((item) => {
                    return (item.IsPresent == true);
                });

                if (!!temp && temp.length) {
                    this.showNextButton = true;
                }
            }
            else {
                this.searchData = this.students;
                this.onFilterChange();
                return this.searchData;
            }

            this.onFilterChange();
        }
    }

    openActivityOrNotificationPage() {
        if (this.isNotificationType) {
            this.openNotification();
        }
        else {
            this.openActivity();
        }
    }

    openActivity() {

        let studentActivity = new StudentActivity();
        studentActivity.StaffId = parseInt(LoginStaticData.UserInfo.UserId);
        studentActivity.SchoolInfoId = parseInt(LoginStaticData.UserInfo.SchoolInfoId);

        //let studentIds: number[] = [];
        this.searchData.forEach(element => {
            if (element.IsPresent) {
                studentActivity.StudentIds.push(element.StudentId);
                if (studentActivity.SelectedStudentClass) {
                    studentActivity.SelectedStudentClass = studentActivity.SelectedStudentClass + ", " + element.Name;
                }
                else {
                    studentActivity.SelectedStudentClass = element.Name;
                }
            }
        });


        if (this.selectedClass == 0 && this.allStudent) {
            studentActivity.IsSchoolLevel = true;
        }
        else if (this.selectedClass == 0 && !this.allStudent) {
            studentActivity.IsStudentLevel = true;
        }
        else if (this.selectedClass > 0 && this.allStudent) {
            studentActivity.IsClassLevel = true;
            studentActivity.ClassId = this.selectedClass;
        }
        else if (this.selectedClass > 0 && !this.allStudent) {
            studentActivity.IsStudentLevel = true;
        }

        this.UiHelper.OpenActionActivity(parseInt(this.activityOrNotificationId), studentActivity);
    }


    openNotification() {

        let notificationDetails = new NotificationDetails();
        notificationDetails.StaffId = parseInt(LoginStaticData.UserInfo.UserId);
        notificationDetails.SchoolInfoId = parseInt(LoginStaticData.UserInfo.SchoolInfoId);



        //let studentIds: number[] = [];
        this.searchData.forEach(element => {
            if (element.IsPresent) {
                notificationDetails.StudentIds.push(element.StudentId);
                if (notificationDetails.SelectedStudentClass) {
                    notificationDetails.SelectedStudentClass = notificationDetails.SelectedStudentClass + ", " + element.Name;
                }
                else {
                    notificationDetails.SelectedStudentClass = element.Name;
                }
            }
        });


        if (this.selectedClass == 0 && this.allStudent) {
            notificationDetails.IsSchoolLevel = true;
        }
        else if (this.selectedClass == 0 && !this.allStudent) {
            notificationDetails.IsStudentLevel = true;
        }
        else if (this.selectedClass > 0 && this.allStudent) {
            notificationDetails.IsClassLevel = true;
            notificationDetails.ClassId = this.selectedClass;
        }
        else if (this.selectedClass > 0 && !this.allStudent) {
            notificationDetails.IsStudentLevel = true;
        }

        this.UiHelper.OpenActionNotification(parseInt(this.activityOrNotificationId), notificationDetails);
    }




    goBack() {
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        this.getAllClassBySchoolId();
        this.getStudents();

    }
}

