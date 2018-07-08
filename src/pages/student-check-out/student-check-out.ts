import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClassService } from '../../shared/services/ClassService';
import { Class } from '../../shared/models/Class';
import { Students, StudentCheckout } from '../../shared/models/Students';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { Messages } from '../../shared/Helper/Messages';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { TOAST } from '../../shared/Enums';

@IonicPage()
@Component({
  selector: 'page-student-check-out',
  templateUrl: 'student-check-out.html',
  providers: [UIHelper]
})
export class StudentCheckOutPage {
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
        this.students = [];
          if (result != null) {
            result.forEach((item:Students) => {
                 if(item.IsPresent)
                 {
                  this.students.push(item);
                 }
            })
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

setStudentCheckOut() { 
  if (!!this.searchData && this.searchData.length) {
      var objStudentCheckout: Array<StudentCheckout> = [];
      for (var i = 0; i < this.searchData.length; i++) {
          var p = new StudentCheckout();
          p.CheckInId=this.searchData[i].CheckInId;
          p.UserId = parseInt(LoginStaticData.UserInfo.UserId);
          p.StudentId = this.searchData[i].StudentId;
          p.ClassId = this.searchData[i].ClassId;
          p.UpdatedEmail = LoginStaticData.UserInfo.UserName;
          p.IsCheckout = this.searchData[i].IsCheckout;
          objStudentCheckout.push(p);
      }

      this.UiHelper.ShowSpinner();
      this.classService.setStudentCheckOut(objStudentCheckout)
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

getAllClassByStaffUserId(): void {
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
  this.getAllClassByStaffUserId();

}

}
