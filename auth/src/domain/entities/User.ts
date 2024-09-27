
export class User {
    constructor(
      public name: string,        
      public email: string,       
      public password: string,   
      public role: string,        
      public avatar?: string,     
      public isAdmin: boolean = false,  
      public isActive: boolean = true,  
    ) {}
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
  