import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityService } from '../../shared/services/ActivityService';
import { Activity } from '../../shared/models/Activity';
import * as moment from 'moment';
import { LoginStaticData } from '../../shared/models/LoginStaticData';
import { UIHelper } from '../../shared/Helper/UIHelper';

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

export enum ActivitiesIcon {
    'ios-camera' = 1,
    'ios-cafe' = 2,
    'ios-school' = 3,
    'ios-clipboard' = 4,
    'ios-moon' = 5,
    'ios-radio-button-off' = 6,
    'ios-arrow-dropright-circle' = 7,
    'ios-arrow-dropleft-circle' = 8,
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
    public activityIcon = ActivitiesIcon;

    constructor(public uIHelper: UIHelper,
        public navCtrl: NavController, public navParams: NavParams,
        private activityService: ActivityService) {
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
