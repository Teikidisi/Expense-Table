import { Component, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { TableProvider } from 'src/app/Handlers/Implementations/TableProvider';
import { UserProvider } from 'src/app/Handlers/Implementations/UserProvider';
import { ServerConnectionService } from 'src/app/Services/server-connection.service';
import { TableDataService } from 'src/app/Services/table-data.service';
import * as dayjs from 'dayjs';
import { CreditCheckModel } from 'src/app/Models/CreditCheckModel';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-credit-amount',
  templateUrl: './credit-amount.component.html',
  styleUrls: ['./credit-amount.component.css']
})
export class CreditAmountComponent implements OnInit {

  public diaCorte: number = 1;
  public gastosDebitoCantidad: number = 0;
  public gastosCreditosCantidad: number = 0;
  public limiteOriginal: number = 0;
  public limiteActualizado: number = 0;
  public userProvider: UserProvider;
  public tableProvider: TableProvider;
  public User: User;
  public gastosDebito: CreditCheckModel[] = [];
  public currentDate = dayjs();
  public limitDateInf: dayjs.Dayjs;
  public limitDateSup: dayjs.Dayjs;
  public limitDateInfView: string;
  public limitDateSupView: string;

  constructor(private userService: ServerConnectionService, private tableService: TableDataService ) { 
    this.userProvider = new UserProvider(userService);
    this.tableProvider = new TableProvider(tableService);
  }

  ngOnInit(): void {
    const userStorage = localStorage.getItem('User'); 
    if(userStorage) {
      this.User = JSON.parse(userStorage);
      this.tableProvider.getDebitExpenses(this.User.id).then((data) => {
        data.forEach(element => {
          this.gastosDebito.push(element);
        });
      }).catch(

      ).finally(() => {
        this.calculateDebitExpensesWithDate(this.gastosDebito,this.diaCorte);
      }
      );
    }
  }

  public calculateDebitExpensesWithDate(gastos: CreditCheckModel[],fechaCorte:number = 1){
    
    let [limitDateInf, limitDateSup] = this.calculateDateRange(fechaCorte);
    this.gastosDebitoCantidad = 0;
    gastos.forEach(gasto => {
      var gastoFecha = dayjs(gasto.Fecha);
      if (gastoFecha.isBefore(limitDateSup) && gastoFecha.isAfter(limitDateInf)){
        this.gastosDebitoCantidad += Math.abs(gasto.Cantidad);
      }
    });
    this.calculateAvailableLimit();
  }
  
  public calculateAvailableLimit(){
    this.limiteActualizado = this.limiteOriginal - this.gastosDebitoCantidad;
  }

  public calculateDateRange(fechaCorte:number = 1): [limitDateInf: dayjs.Dayjs, limitDateSup: dayjs.Dayjs] {
    var FechaCorte: string = "";

    if(this.currentDate.date() < this.diaCorte){
      FechaCorte = `${this.currentDate.year()}-${this.currentDate.month()+1}-${fechaCorte}`;
      this.limitDateInf = dayjs(FechaCorte).subtract(1,'month').add(1,'day')
      this.limitDateSup = dayjs(FechaCorte)
    } else {
      FechaCorte = `${this.currentDate.year()}-${this.currentDate.month()+2}-${fechaCorte}`;
      this.limitDateInf = dayjs(FechaCorte).subtract(1,'month').add(1,'day')
      this.limitDateSup = dayjs(FechaCorte)
    }

    this.limitDateInfView = this.limitDateInf.toString();
    this.limitDateSupView = this.limitDateSup.toString();
    return [this.limitDateInf,this.limitDateSup]
  }

}
