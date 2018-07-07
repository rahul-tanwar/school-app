import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
//import { AssignmentPage } from "../assignment/assignment";
 

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }
  // goToAssigmentDetail() :void{
  //   this.navCtrl.push('AssignmentPage');
  // }
  goToAssigmentDetail() {
    console.log('opening AssignmentPage');
    let assignmentModal = this.modalCtrl.create('AssignmentPage');
    assignmentModal.onDidDismiss(data => {
      console.log(data);
    });
    assignmentModal.present();
  }
  goToNoticeDetail() :void{
    let noticeModal = this.modalCtrl.create('NoticePage');
    noticeModal.present();
    //this.navCtrl.push('NoticePage');
  }
  goToEventDetail() :void{
    let eventModal = this.modalCtrl.create('EventPage');
    eventModal.present();
    //this.navCtrl.push('EventPage');
  }
}
