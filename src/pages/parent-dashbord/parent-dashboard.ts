import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ActivitiesPage } from './../activities/activities';
import { NotificationsPage } from "./../notifications/notifications";
import { CalenderPage } from './../calender/calender';
import { ParentMenuPage } from '../../pages/parent-menu/parent-menu';
//import { ActionPage } from "./../action/action";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
//import { HttpClient,HttpHeaders } from "@angular/common/http";
//import { RequestOptions } from '@angular/http/src/base_request_options';
@IonicPage()
@Component({
    selector: 'page-parent-dashboard',
    templateUrl: 'parent-dashboard.html',
    providers:[Push]
})
export class ParentDashboardPage {

    activityTab: any;
    notificationTab: any;
    clalenderTab: any;
    id:any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private popoverCtrl: PopoverController,private push: Push,
        //private httpClient:HttpClient
    ) {
        this.activityTab = ActivitiesPage;
        this.notificationTab = NotificationsPage;
        this.clalenderTab = CalenderPage;
        this.pushSetup();
    }

    ionViewDidLoad() {
 
        // const model =   {
        //     "notification":{
        //       "title":"KIDOJO",
        //       "body":"Message from FCM",
        //       "sound":"default",
        //       "click_action":"FCM_PLUGIN_ACTIVITY",
        //       "icon":"fcm_push_icon"
        //     },
        //     "data":{
        //       "param1":"value1",
        //       "param2":"value2"
        //     },
        //       "to":"fID-6DGJce8:APA91bHomJRhqgukheSnCdwP4J7htLAmhQN8-ADjvQ1t7EZIgNw4b2JgMKYnurrzj0Ok04iDKjqYMbGP8AfarGDx2vgEjRliu9nIJd-RzmyNooRph1py-SNEghfWe4yy_Q47kmTDIj1DyVtkW8_UgYznnvOXTc1pPQ",
        //       "priority":"high"
        //   }

           
        //    const headers =new HttpHeaders({
        //         'Content-Type': 'application/json',
        //         'Authorization': 'key=AIzaSyAeLu6MQr9pKAj6aGCDYnSotYaUYXdqiCg'
        //     })
        

    //  this.httpClient.post('https://fcm.googleapis.com/fcm/send', model,{headers:headers}
    //     ).subscribe((result) => {
    //            alert(JSON.stringify(result));
    //     })

        

    }
    presentPopover(ev) {
        let popover = this.popoverCtrl.create(ParentMenuPage);
        popover.present({
            ev: ev
        });
    }

    pushSetup(){
        const options: PushOptions = {
            android: {
                senderID:"202921198727",
            },
            
         };
         


         const pushObject: PushObject = this.push.init(options);
                   
         pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
         
         pushObject.on('registration').subscribe((registration: any) => 
         {
            console.log('Device registered', registration);
           this.id= registration['registrationId'];
           alert(this.id);


         }
         );
         
         pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }



}
