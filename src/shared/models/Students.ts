export class Students {
    StudentId: number;
    SchoolInfoId: number;
    StudentUniqueId: string;
    DOB: string;
    IsActive: true;
    AadharNumber: string;
    ClassId: number;
    IsPresent: boolean;
    UpdateDate: string;
    UpdatedEmail: string;
    AppCode: string;
    ClassName: string;
    Name: string;
    SchoolName: string;
    Gender: string;
}

export class StudentCheckin {

    UserId: number;
    StudentId: number;
    ClassId: number;
    IsPresent: boolean;
    UpdatedEmail: string;

}

