export class User {
    UserName: string;
    password: string;
    grant_Type: 'password';
    access_token: string;
    token_type: string;
    UserId: string;
    SchoolInfoId: string;
    RoleName: string;
    AppSelectedStudent: number;
}

export class UserChangePassword {
    UserId: number;
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
}


