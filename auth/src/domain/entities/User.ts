
export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public avatar?: string,
    public isAdmin: boolean = false,
    public isGoogle: boolean = false,
    public isActive: boolean = true,
    public id?: string,
    public role?: string
  ) { }
}

//   export interface IUser {
//     id: string;             
//     name: string;          
//     email: string;        
//     password: string;     
//     role: string;          
//     avatar?: string;        
//     isAdmin: boolean;       
//     isActive: boolean;      
//     createdAt: Date;       
//     updatedAt: Date;
//   }
