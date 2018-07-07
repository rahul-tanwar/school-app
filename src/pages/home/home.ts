import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
//import { ActivitiesPage } from "../activities/activities";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public authProvider: AuthProvider) {

  }
  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('WelcomePage');
    });
  }
//   activitiesPage(): void { 
//       this.navCtrl.push('ActivitiesPage');
    
//   }

//   notificationsPage(): void { 
//     this.navCtrl.push('NotificationsPage');
  
// }

// OpenProfile(): void {
  
//         this.navCtrl.push('ProfilePage');
   
//     }
  
//     OpenChildProfile(): void {
  
//       this.navCtrl.push('ChildProfilePage');
  
//   }
  
//   ChangePassword(): void {
  
//     this.navCtrl.push('ChangePasswordPage');
  
//   }
//   addchildpage(): void {
    
//       this.navCtrl.push('AddChildPage');
    
//     }
//     goToCalendar(): void {
      
//         this.navCtrl.push('CalenderPage');
      
//       }
    
}
