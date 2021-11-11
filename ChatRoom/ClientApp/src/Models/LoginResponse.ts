
export interface LoginResponse {

    userId:string;
    code:number;
    description:string;
    token:string;
    expires:Date;
    userName:string;
}