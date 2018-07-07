import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { LoginStaticData } from '../models/LoginStaticData';
import { TeacherProfile } from '../models/TeacherProfile';


@Injectable()
export class TeacherAccountService extends BaseService {

    public getProfile(): Observable<object> {
        let userId = LoginStaticData.UserInfo.UserId;
        return this.httpClient.get(this.baseUrl + 'userprofile/getteacherprofile?userId=' + userId,
            { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }


    public updateProfile(teacherProfile: TeacherProfile): Observable<object> {
        return this.httpClient.post(this.baseUrl + 'userprofile/updateteacherprofile',
            teacherProfile)
            .pipe(catchError(this.handleError));
    }
}


