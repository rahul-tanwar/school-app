import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { StudentCheckin } from '../models/Students';
import { HttpParams } from '@angular/common/http';
import { LoginStaticData } from '../models/LoginStaticData';

@Injectable()
export class ClassService extends BaseService {

    public getClasses(): Observable<object> {
        var data = localStorage.getItem('user-access');
        this.initilize(JSON.parse(data));

        let schoolId = LoginStaticData.UserInfo.SchoolInfoId;

        this.httpParams = new HttpParams();
        this.httpParams.set('schoolInfoId', schoolId);

        return this.httpClient.get(this.baseUrl + 'class/getallclassBySchoolInfoId?schoolInfoId=' + schoolId,
            { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }

    public getStudents(classId: number): Observable<object> {
        this.initilize(LoginStaticData.UserInfo);

        return this.httpClient.get(this.baseUrl + 'class/getallstudentcheckInfobyclassid?classId=' + classId,
            { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }

    public setStudentCheckin(student: Array<StudentCheckin>): Observable<object> {

        return this.httpClient.post(this.baseUrl + 'class/insertupdatestudentcheckininfo',
            student, this.httpOptions)
            .pipe(catchError(this.handleError));
    }



}