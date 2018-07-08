import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AuthProvider } from '../../providers/auth/auth';
import { MyProfilePage } from './../myprofile/myprofile';
import { ChangePasswordPage } from "./../change-password/change-password";
import { UIHelper } from '../../shared/Helper/UIHelper';

 
@IonicPage()
@Component({
  selector: 'page-teacher-profile',
  templateUrl: 'teacher-profile.html',
  providers: [UIHelper]
})
export class TeacherProfilePage {
  teacherProfileTab: any;
  ChangePasswordTab: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.teacherProfileTab = MyProfilePage;
     this.ChangePasswordTab = ChangePasswordPage;
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherProfilePage');
  }

}
