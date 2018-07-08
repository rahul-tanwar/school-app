import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityService } from '../../shared/services/ActivityService';
import { Activity } from '../../shared/models/Activity';
import * as moment from 'moment';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { UIHelper } from '../../shared/Helper/UIHelper';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export class AcitivitieGroup {
    public date: moment.Moment;
    public activities: Activity[];
}

export enum FaClass {
    'fa-camera' = 1,
    'fa-cutlery' = 2,
    'fa-book' = 3,
    'fa-child' = 4,
    'fa-sticky-note' = 5,
    'fa-bed' = 6
}


@IonicPage()
@Component({
    selector: 'page-activities',
    templateUrl: 'activities.html',
    providers: [UIHelper]
})
export class ActivitiesPage {

    public activities: Array<Activity> = [];
    public acitivitieGroup: AcitivitieGroup[] = [];

    constructor(public uIHelper: UIHelper,
        public navCtrl: NavController, public navParams: NavParams,
        private activityService: ActivityService,
        private photoViewer: PhotoViewer) {
    }

    ionViewDidLoad() {
        this.subscribeActivities();

    }

    public subscribeActivities(): void {
        this.uIHelper.ShowSpinner();
        this.activityService.getstudentActivities((LoginStaticData.UserInfo.AppSelectedStudent) as any);
        this.activityService.activities().subscribe((activities: Activity[]) => {
            if (!!activities) {
                this.activities = activities.reverse();
                this.groupActivityData();
            }
            this.uIHelper.HideSpinner();
        }, (error) => {
            this.uIHelper.HideSpinner();
        });
    }

    imagePreview(imgURL:string){
        this.photoViewer.show(imgURL);
    }


    private groupActivityData() {
        this.activities.forEach((activity: Activity) => {
            const index = this.acitivitieGroup.findIndex((item) => moment(item.date).isSame(moment(activity.ActivityDate), 'day'));
            if (index > -1) {
                this.acitivitieGroup[index].activities.push(activity);
            } else {
                this.acitivitieGroup.push({
                    date: activity.ActivityDate,
                    activities: [activity]
                });
            }
        });
    }

}
