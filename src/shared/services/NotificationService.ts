import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { LoginStaticData } from '../models/LoginStaticData';
import { NotificationDetails, Notification } from '../models/Notifications';

@Injectable()
export class NotificationService extends BaseService {

    public getNotificationTypes(): Observable<object> {
        this.httpParams = new HttpParams();
        this.httpParams.set('schoolInfoId', LoginStaticData.UserInfo.SchoolInfoId);
        return this.httpClient.get(this.baseUrl + 'activity/getallnotification', { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }


    public setNotificationDetails(student: NotificationDetails): Observable<object> {
        return this.httpClient.post(this.baseUrl + 'activity/insertnotification',
            student)
            .pipe(catchError(this.handleError));
    }

    public getStudentNotifications(studentId: string): Observable<Notification[]> {
        this.httpParams = new HttpParams()
            .set('studentId', studentId);
        return this.httpClient.get<Notification[]>(this.baseUrl + 'activity/getstudentnotifications', {
            params: this.httpParams
        }).pipe(catchError(this.handleError));

    }

}


