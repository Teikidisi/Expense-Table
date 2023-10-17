import { User, UserResponse } from "@supabase/supabase-js";
import { ServerConnectionService } from "src/app/Services/server-connection.service";
import { IUserProvider } from "../Contracts/IUserProvider";

export class UserProvider implements IUserProvider{

    constructor(private userService: ServerConnectionService){}

    async signUp(email: string, password: string): Promise<boolean>{
     const {error} =  await this.userService.signUp(email,password);
     if(error){
        console.error('error',error.message);
     } else{
        return true;
     }
     return false;
    }

    async logIn(email: string, password: string): Promise<boolean>{
        const {data,error} = await this.userService.logIn(email,password);
        if(error){
            console.error('error',error.message)
        } else{
            return true;
        }
        return false;
    }
    async recoverPassword(email: string): Promise<string>{
        const {data,error} = await this.userService.recoverPassword(email);
        if(error){
            console.error('error',error.message)
            return 'error'
        } else{
            return 'success'
        }
    }
    async logOut(): Promise<boolean>{
        const{error} = await this.userService.logOut();
        if(error){
            console.error('error',error.message)
            return false
        }
        return true
    }

    async getUser(): Promise<User|null>{
        const{data: {user}} = await this.userService.getUser()
        return user;
    }

    public isLoggedIn(): boolean{
        let logged: boolean = false;
        this.getUser().then((data) => {
            if (data !== null) logged =  true;
        })
        return logged;
    }
    
}