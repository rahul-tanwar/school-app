import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { LoginStaticData } from '../models/LoginStaticData';
import { StudentActivity } from '../models/StudentActivity';
import { Students } from '../models/Students';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class StudentService extends BaseService {

    private _student: ReplaySubject<Students> = new ReplaySubject(1);

    public getStudent(): Observable<Students> {
        return this._student.asObservable();
    }

    public getStudents(): Observable<object> {
        var data = localStorage.getItem('user-access');
        this.initilize(JSON.parse(data));

        let schoolId = LoginStaticData.UserInfo.SchoolInfoId;

        this.httpParams = new HttpParams();
        this.httpParams.set('schoolInfoId', schoolId);

        return this.httpClient.get(this.baseUrl + 'student/getallstudentbyschoolinfoid?schoolInfoId=' + schoolId,
            { headers: this.httpOptions })
            .pipe(catchError(this.handleError));
    }


    public saveActivityDetails(student: StudentActivity): Observable<object> {
        return this.httpClient.post(this.baseUrl + 'activity/insertactivity',
            student)
            .pipe(catchError(this.handleError));
    }

    public getStudentProfilebyid(studentId: string): void {

        this.httpParams = new HttpParams()
            .set('studentId', studentId);
        this.httpClient.get<Students>(this.baseUrl + 'student/getstudentappprofilebyid', {
            params: this.httpParams
        }).subscribe((data) => {
            this._student.next(data);
        }, (error) => {
            this.handleError(error);
        });
    }
}


