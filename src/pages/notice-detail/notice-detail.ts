import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Notification } from '../../shared/models/Notifications';
import { PhotoViewer } from '@ionic-native/photo-viewer';
@IonicPage()
@Component({
    selector: 'page-notice-detail',
    templateUrl: 'notice-detail.html',
})
export class NoticeDetailPage {

    public notice: Notification = new Notification();

    constructor(public navCtrl: NavController,
        public photoViewer: PhotoViewer,
         public navParams: NavParams) {
        this.notice = navParams.get('data');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NoticDetailPage');
    }

    goToBack(): void {
        this.navCtrl.pop();
    }

    imagePreview(imgURL:string){
        this.photoViewer.show(imgURL);
    }
}
