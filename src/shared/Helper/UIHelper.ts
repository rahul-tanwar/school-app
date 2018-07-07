import { AlertController, Loading, LoadingController, NavController, App, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ACTIVITY, TOAST, NOTIFICATION } from '../../shared/Enums';
import { StudentService } from '../services/StudentService';
import { ActivityService } from '../services/ActivityService';

@Injectable()
export class UIHelper {
    private _loading: Loading;

    activityEnum = ACTIVITY;
    noticationType = NOTIFICATION;
    toastEnum = TOAST;

    constructor(public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController, public app: App,
        private toastCtrl: ToastController,
        private activityService: ActivityService,
        private studentService: StudentService) {

    }


    Logout() {

        localStorage.removeItem("activitydata");
        this.app.getRootNav().setRoot("WelcomePage");
    }

    showDashboard(dashboardName: string) {
        this.app.getRootNav().setRoot(dashboardName);
    }

    OpenPage(pageName: string) {
        this.navCtrl.push(pageName);
    }

    OpenActivity(pageName: string) {
        let nav = this.app.getRootNav();
        nav.push(pageName);
    }

    OpenActionActivity(activityNumber: number, datas: object) {
        if (activityNumber == this.activityEnum.PHOTO) {
            this.navCtrl.push("ActivityPhotoPage", { activty: activityNumber, data: datas });
        }
        else if (activityNumber == this.activityEnum.FOOD) {
            this.navCtrl.push("ActivityFoodPage", { activty: activityNumber, data: datas });
        }
        else if (activityNumber == this.activityEnum.LEARNING) {
            this.navCtrl.push("ActivityLearningPage", { activty: activityNumber, data: datas });

        } else if (activityNumber == this.activityEnum.POTTY) {
            this.navCtrl.push("ActivityPottyPage", { activty: activityNumber, data: datas });

        }
        else if (activityNumber == this.activityEnum.NOTES) {
            this.navCtrl.push("ActivityNotesPage", { activty: activityNumber, data: datas });

        }
        else if (activityNumber == this.activityEnum.NAP) {
            this.navCtrl.push("ActivityNapPage", { activty: activityNumber, data: datas });

        }
    }

    OpenActionNotification(notification: number, datas: object) {
        if (notification == this.noticationType.ASSIGNMENT) {
            this.navCtrl.push("NotificationAssignmentPage", { activty: notification, data: datas });
        }
        else if (notification == this.noticationType.EVENT) {
            this.navCtrl.push("NotificationEventPage", { activty: notification, data: datas });
        }
        else if (notification == this.noticationType.NOTICE) {
            this.navCtrl.push("NotificationNoticePage", { activty: notification, data: datas });

        }
    }

    convertToBase64(url, outputFormat) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'),
                    dataURL;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                canvas = null;
                resolve(dataURL);
            };
            img.src = url;
        });
    }


    ShowAlert(title, subTitle) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['Dismiss']
        });
        alert.present();
    }

    ShowSpinner() {
        this._loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this._loading.present();

    }



    HideSpinner() {
        if (this._loading) {
            this._loading.dismiss();
        }

    }

    getNotificationPageName(id: number): string {

        if (id == this.noticationType.ASSIGNMENT) {
            return "Assignment";
        }
        else if (id == this.noticationType.EVENT) {
            return "Event";
        }
        else if (id == this.noticationType.NOTICE) {
            return "Notice";

        }
    }

    getActivityName(activity: number): string {

        if (activity == this.activityEnum.PHOTO) {
            return "Photo";
        }
        else if (activity == this.activityEnum.FOOD) {
            return "Food";
        } else if (activity == this.activityEnum.LEARNING) {
            return "Learning";
        }
        else if (activity == this.activityEnum.POTTY) {
            return "Potty-Diaper";
        }
        else if (activity == this.activityEnum.NOTES) {
            return "Notes";
        }
        else if (activity == this.activityEnum.NAP) {
            return "Nap";
        }

    }

    showToast(message: string, type: TOAST) {
        let cssClassName = 'successToast';

        if (type == this.toastEnum.ERROR) {
            cssClassName = 'errorToast';
        } else if (type == this.toastEnum.SUCCESS) {
            cssClassName = 'successToast';
        } else if (type == this.toastEnum.WARNING) {
            cssClassName = 'warningToast';
        } else if (type == this.toastEnum.INFO) {
            cssClassName = 'infoToast';
        }

        let toast = this.toastCtrl.create({
            message: message,
            duration: 4000,
            position: 'top',
            cssClass: cssClassName
        });

        toast.onDidDismiss(() => {

        });

        toast.present();
    }

    public refreshAppData(studentId: string): void {
        this.studentService.getStudentProfilebyid(studentId);
        this.activityService.getstudentActivities(studentId);
    }

}