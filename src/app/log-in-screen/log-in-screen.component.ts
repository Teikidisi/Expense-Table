import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserProvider } from '../Handlers/Contracts/IUserProvider';
import { UserProvider } from '../Handlers/Implementations/UserProvider';
import { ServerConnectionService } from '../Services/server-connection.service';

@Component({
  selector: 'app-log-in-screen',
  templateUrl: './log-in-screen.component.html',
  styleUrls: ['./log-in-screen.component.css']
})
export class LogInScreenComponent implements OnInit {
  public isSignIn = true;
  public email: string;
  public password: string;
  public popupPassword = false;
  public emailPW = "";
  public userProvider: IUserProvider

  constructor(private serverProvider:ServerConnectionService, private router: Router, private route:ActivatedRoute ) { 
    this.userProvider = new UserProvider(this.serverProvider);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {

  }

  public async Submit(form: NgForm): Promise<void>{
    if(!this.ValidateInputs){
      return;
    }
    if(this.isSignIn){
      this.LogIn(this.email,this.password).then((success) => {
        if(success){
          this.userProvider.getUser().then((user) =>{
            if(user != null){
              const userString = JSON.stringify(user);
              localStorage.setItem('User',userString);
            }
          })
          this.router.navigate(['/main'], {relativeTo: this.route})
        } else{
          console.log('error logging in');
        }
      });
    } else{
      if (this.password.length < 8 ){
        return;
      }

      this.SignUp(this.email,this.password).then((success)=>{
        if(success){
          this.isSignIn = false;
        } else{
          console.log('Error signing up');
        }
      })

    }
  }

  public SignUpSwitch(){
    this.isSignIn = !this.isSignIn
  }

  public ValidateInputs():boolean{
    if(this.email == null || this.email==undefined || this.email.length <= 0){
      return false;
    }
    if(this.password == null || this.password==undefined || this.password.length < 8){
      return false;
    }
    return true;
  }

  public async forgotPassword(): Promise<void>{
    const data = await this.userProvider.recoverPassword(this.emailPW);
    if(data == 'success'){
      console.log('sent email');
    }
  }

  public async LogIn(email:string,password:string):Promise<boolean>{
    const success = await this.userProvider.logIn(email,password)
    return success;
  }

  public async SignUp(email:string,password:string): Promise<boolean>{
    const success= await this.userProvider.signUp(email,password)
    return success;
  }

}
