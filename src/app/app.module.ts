import { HttpModule } from '@angular/http'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { WelcomePageModule } from '../pages/welcome/welcome.module';

import { ProfilePageModule } from "../pages/profile/profile.module";
import { ProfilePage } from "../pages/profile/profile";
import { TeacherProfilePageModule } from "../pages/teacher-profile/teacher-profile.module";
import { TeacherProfilePage } from "../pages/teacher-profile/teacher-profile";

import { ParentDashboardPageModule } from "../pages/parent-dashbord/parent-dashboard.module";
import { ParentDashboardPage } from "../pages/parent-dashbord/parent-dashboard";

import { TeacherDashboardPageModule } from "../pages/teacher-dashboard/teacher-dashboard.module";
import { TeacherDashboardPage } from '../pages/teacher-dashboard/teacher-dashboard';
import { MenuTeacherPage } from '../pages/menu-teacher/menu-teacher';
import { MenuTeacherPageModule } from '../pages/menu-teacher/menu-teacher.module';
import { BaseService } from '../shared/services/BaseService';
import { ClassService } from '../shared/services/ClassService';
import { ActivityService } from '../shared/services/ActivityService';
import { LoginService } from '../shared/services/LoginService';
import { StudentService } from '../shared/services/StudentService';
import { NotificationService } from '../shared/services/NotificationService';
import { ImagePicker } from '@ionic-native/image-picker';
import { Calendar } from '@ionic-native/calendar';
import { EscapeHtmlPipe } from '../component/pipes/keep-html.pipe';
import { Messages } from '../shared/Helper/Messages';
import { Camera } from '@ionic-native/camera';
import { DataHelper } from '../shared/Helper/DataHelper';
import { SchoolInterceptor } from '../shared/services/SchoolInterceptor';
import { TeacherAccountService } from '../shared/services/TecherAccountService';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { AddFirstChildPageModule } from '../pages/add-first-child/add-first-child.module'
import { AddFirstChildPage } from '../pages/add-first-child/add-first-child';
import { ParentService } from '../shared/services/ParentService';
import { ChildService } from '../shared/services/ChildService';
import { ParentMenuPage } from '../pages/parent-menu/parent-menu';
import { ParentMenuPageModule } from '../pages/parent-menu/parent-menu.module';
import { UIHelper } from '../shared/Helper/UIHelper';

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        HomePage,
        EscapeHtmlPipe,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, { tabsPlacement: 'top' }),
        WelcomePageModule,
        ParentDashboardPageModule,
        TeacherDashboardPageModule,
        MenuTeacherPageModule,
        ProfilePageModule,
        TeacherProfilePageModule,
        HttpModule,
        HttpClientModule,
        ParentMenuPageModule,
        AddFirstChildPageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        WelcomePage,
        LoginPage,
        HomePage,
        ParentDashboardPage,
        TeacherDashboardPage,
        MenuTeacherPage,
        ProfilePage,
        TeacherProfilePage,
        ParentMenuPage,
        AddFirstChildPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        Calendar,
        BaseService,
        ClassService,
        LoginService,
        StudentService,
        TeacherAccountService,
        ActivityService,
        NotificationService,
        DataHelper,
        NativePageTransitions,
        ParentService,
        ChildService,
        Messages,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SchoolInterceptor,
            multi: true
        },
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
