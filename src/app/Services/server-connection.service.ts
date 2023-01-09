import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY)
   }

  public getUser(){
    return this.supabaseClient.auth.getUser();
  }

  public signUp(email:string, password:string){
    return this.supabaseClient.auth.signUp({email,password})
  }

  public logIn(email:string,password:string){
    return this.supabaseClient.auth.signInWithPassword({email,password});
  }

  public recoverPassword(email:string){
    return this.supabaseClient.auth.resetPasswordForEmail(email);
  }

  public logOut(){
    return this.supabaseClient.auth.signOut();
  }
}
