import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { UIHelper } from '../../shared/Helper/UIHelper';

@IonicPage()
@Component({
    selector: 'page-action',
    templateUrl: 'action.html',
    providers: [UIHelper]
})
export class ActionPage {

    constructor(public app: App) {
    }

    goToSelectStudentPage(activityNumber: string, isNotification: boolean = false): void {

        
        let nav = this.app.getRootNav();
        nav.push("SelectStudentPage", { activityOrNotificationId: activityNumber, isNotificationType: isNotification });
    }

}
