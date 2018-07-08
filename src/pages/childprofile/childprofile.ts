import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddChildPage } from "../add-child/add-child";
//import { AddFirstChildPage } from "../add-first-child/add-first-child";
import { UIHelper } from '../../shared/Helper/UIHelper';
import { StudentService } from '../../shared/services/StudentService';
import { ParentService } from '../../shared/services/ParentService'
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { Students } from '../../shared/models/Students';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-child-profile',
    templateUrl: 'childprofile.html',
    providers: [UIHelper]
})
export class ChildProfilePage {

    public student: Students = new Students();
    public childIds: number[] = [];

    constructor(public uIHelper: UIHelper,
        public studentService: StudentService,
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalController: ModalController,
        public parentService: ParentService) {
    }

    ionViewDidLoad() {
        this.subscribeStudent();
        this.getAllChildsAddedOnApp();
    }

    private getAllChildsAddedOnApp() {
        this.parentService.getparentallchildIds(LoginStaticData.UserInfo.UserId).subscribe((result: number[]) => {
            if (result) {
                this.childIds = result;
            }
        });
    }

    public subscribeStudent() {
        this.studentService.getStudentProfilebyid(LoginStaticData.UserInfo.AppSelectedStudent as any)
        this.studentService.getStudent().subscribe((result: Students) => {
            if (!!result) {
                this.student = result;
            }
        }, (error) => {
        });
    }

    addClild(): void {
        let model = this.modalController.create(AddChildPage, {
            data: true
        });
        model.present();
    }

    switchChild(): void {
        const childId = this.childIds.find(id => id !== parseInt(LoginStaticData.UserInfo.AppSelectedStudent.toString()));
        this.parentService.updateParentSelectedStudent(childId, LoginStaticData.UserInfo.UserId as any).subscribe((result: boolean) => {
            LoginStaticData.UserInfo.AppSelectedStudent = childId;
            this.uIHelper.refreshAppData(childId as any);
        });
    }



}
