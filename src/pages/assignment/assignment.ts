import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import { NotificationService } from '../../shared/services/NotificationService';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { Notification } from '../../shared/models/Notifications';
import * as moment from 'moment';

export class AssignmentGroup {
    public date: moment.Moment;
    public assignments: Notification[];
}

@IonicPage()
@Component({
    selector: 'page-assignment',
    templateUrl: 'assignment.html',
})
export class AssignmentPage {

    public assignments: Array<Notification> = [];
    public assignmentGroup: AssignmentGroup[] = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public modalCtrl:ModalController,
        public notificationService: NotificationService 
    ) {
    }

    ionViewDidLoad() {
        this.getAssignments();
    }


    private getAssignments() {
        this.notificationService.getStudentNotifications(LoginStaticData.UserInfo.AppSelectedStudent.toString()).subscribe((result: Notification[]) => {
            if (result && result.length) {
                this.assignments = result.filter(item => item.NotificationTypeId === 1);
                this.groupAssignmentsByDate();
            }
        });
    }


    private groupAssignmentsByDate() {
        this.assignments.forEach((assignment: Notification) => {
            const index = this.assignmentGroup.findIndex((item) => moment(item.date).isSame(moment(assignment.CreatedDate), 'day'));
            if (index > -1) {
                this.assignmentGroup[index].assignments.push(assignment);
            } else {
                this.assignmentGroup.push({
                    date: assignment.CreatedDate,
                    assignments: [assignment]
                });
            }
        });
    }

    goToAssigmentDetail(assignment: Notification): void {
        // this.navCtrl.push('AssignmentDetailPage', {
        //     data: assignment
        // });

        let assignmentModal = this.modalCtrl.create('AssignmentDetailPage',{assignmentData:assignment});
       assignmentModal.onDidDismiss(data => {
      console.log(data);
    });
    assignmentModal.present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
 
}
