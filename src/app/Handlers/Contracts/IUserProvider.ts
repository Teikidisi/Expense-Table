import { User, UserResponse } from "@supabase/supabase-js"

export interface IUserProvider{
    signUp:(email:string,password:string)  => Promise<boolean>
    logIn:(email:string,password:string) => Promise<boolean>
    recoverPassword: (email:string) => Promise<string>
    logOut: () => Promise<boolean>
    getUser: () => Promise<User|null>
}