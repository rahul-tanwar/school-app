import { ActivityType } from "./Activity";

export class StudentActivity {



    constructor() {
        this.StudentIds = [];
    }

    StaffId: number;
    ActivityDate: string;
    IsStudentLevel: boolean;
    IsClassLevel: boolean;
    IsSchoolLevel: boolean;
    StudentIds: number[];
    ImageStr: string;
    ImageType: string;
    ImageURL: string;
    Notes: string;
    ActivityType: ActivityType;
    ClassId: number;
    SchoolInfoId: number;
    SelectedStudentClass: string;

}

export class SelectedStudent {

    StudentsId: number[];
    ActivityId: number;
    StaffId: number;
    IsClassLevel: boolean;
    IsSchoolLevel: boolean;
    IsStudentLevel: boolean;
    ClassId: number;
    SchoolInfoId: number;

}