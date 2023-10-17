import { Component } from '@angular/core';
import { IUserProvider } from './Handlers/Contracts/IUserProvider';
import { UserProvider } from './Handlers/Implementations/UserProvider';
import { ServerConnectionService } from './Services/server-connection.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Expense Table';
}
