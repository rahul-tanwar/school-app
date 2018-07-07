import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Activity } from '../models/Activity';

@Injectable()
export class ActivityService extends BaseService {


    private readonly _activities: ReplaySubject<Activity[]> = new ReplaySubject(1);

    public activities(): Observable<Activity[]> {
        return this._activities.asObservable();
    }

    public getActivities(): Observable<object> {

        return this.httpClient.get(this.baseUrl + 'activity/getallactivity',
            { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }



    public getstudentActivities(studentId: string): void {

        this.httpParams = new HttpParams()
            .set('studentId', studentId);
        this.httpClient.get<Activity[]>(this.baseUrl + 'activity/getstudentActivities', {
            params: this.httpParams
        }).subscribe((data) => {
            this._activities.next(data);
        }, (error) => {
            this.handleError(error);
        });

    }


    public sendNotificationResponse(id: number, response: boolean): Observable<object> {

        const model = {
            "NotificationsMappingId": id,
            "Response": response
        };

        return this.httpClient.post(this.baseUrl + 'activity/updatenotificationresponse', model
        ).pipe(catchError(this.handleError));
    }


}