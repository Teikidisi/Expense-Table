/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Categories } from '../../Models/Categories';
import { EntryModel } from '../../Models/Entry';
import { NgForm } from '@angular/forms';
import { TableDataService } from '../../Services/table-data.service';
import { ServerConnectionService } from '../../Services/server-connection.service';
import { TableProvider } from '../../Handlers/Implementations/TableProvider';
import { ITableProvider } from '../../Handlers/Contracts/ITableProvider';
import * as moment from 'dayjs';
import { IUserProvider } from '../../Handlers/Contracts/IUserProvider';
import { UserProvider } from '../../Handlers/Implementations/UserProvider';
import { User } from '@supabase/supabase-js';
import { DisplayEntryModel } from '../../Models/DisplayEntry';
import TableOperations from '../../Helpers/table-operations'


@Component({
  selector: 'MainView',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})


export class MainViewComponent implements OnInit {

  constructor( private authService: ServerConnectionService, private tableService: TableDataService ) {
    this.tableProvider  = new TableProvider(this.tableService);
    this.userProvider = new UserProvider(this.authService);
    this.tableOperations = new TableOperations();
  }

  public tableProvider: ITableProvider
  public userProvider: IUserProvider
  public tableOperations: TableOperations;
  public User: User;

  public EntriesCollection: DisplayEntryModel[] = [];
  public Fecha = "01/01/0001";
  public Cantidad = 0;
  public Categoria = 'Seleccionar';
  public Descripcion = '';
  public Categories: (string|Categories)[] = Object.values(Categories).filter(x => isNaN(Number(x)));
  public p=1; 
  public Entry = new EntryModel(this.Fecha,this.Cantidad,this.Categoria,this.Descripcion,0,false);




  ngOnInit(): void {
      const userStorage = localStorage.getItem('User'); 
      if(userStorage) this.User = JSON.parse(userStorage);
      this.obtainDataWithCheck();
  }

  public obtainDataWithCheck():void{
    this.ObtainData().then((data)=>{
      this.UpdateTableView(data);
      this.InitCalculateChecks(data);
      this.tableOperations.PercentageCheck();
    })

  }


  public async addEntry(entry: EntryModel,userId:string): Promise<boolean> {
    return await this.tableProvider.addEntry(entry,userId);
  }

  public deleteEntry(entry: EntryModel,userId:string):void{
    this.tableProvider.deleteEntry(entry.ID,userId).then((data)=>
    {
      if(data){
        entry.Cantidad = -entry.Cantidad;
        this.tableOperations.TotalsSum(entry,true);
        this.tableOperations.PercentageCheck();
        this.ObtainData().then((data) => this.UpdateTableView(data));
      }
    });
  }
  public toggleCheck(entry: EntryModel, userId: string){
    entry.isDebit = !entry.isDebit;
    this.tableProvider.updateEntryDebit(entry,userId).then((data) =>{
      if(data){
        this.ObtainData().then((data) => this.UpdateTableView(data));
      }

    }
    );
  }

  public async ObtainData(): Promise<EntryModel[]>{
     return await this.tableProvider.getAllDataByDate(this.User.id);
  }

  public async onSubmit(form: NgForm):Promise<void>{

    const valid = this.Validations(form);
    if(!valid){
      return;
    }

    this.Entry.Fecha = this.Fecha;
    this.Entry.Cantidad = this.Cantidad;
    this.Entry.Categoria = this.Categoria;
    this.Entry.Descripcion = this.Descripcion;
    if(this.NegativeCategories.includes(this.Entry.Categoria)){
      this.Entry.Cantidad = -this.Entry.Cantidad
    }
    this.addEntry(this.Entry,this.User.id).then(async (data) =>{
      if(data == true){
          this.AddCalculateCheck(this.Entry)
          this.tableOperations.PercentageCheck();
          this.ObtainData().then((data) => this.UpdateTableView(data));
          this.Fecha = moment().format('yyyy-MM-DD');
          this.Cantidad = 0;
          this.Categoria = "";
          this.Descripcion = "";
          this.Entry = new EntryModel(this.Fecha,this.Cantidad,this.Categoria,this.Descripcion,0,false);
      }
    });
  }

  public Validations(form:NgForm):boolean{
    const validCat = this.CategoriaCheck();
    const validFecha = this.FechaCheck();
    const validCant = this.CantidadCheck();

    if(!validCat || !validFecha || !validCant){
      if (!validCat){
        form.controls["Categoria"].setErrors({"invalid":true})
        form.controls["Categoria"].markAsTouched();
      }
      if (!validFecha){
        form.controls["Fecha"].setErrors({invalid:true})
        form.controls["Fecha"].markAsTouched();
      }
      if (!validCant){
        form.controls["Cantidad"].setErrors({invalid:true})
        form.controls["Cantidad"].markAsTouched();
      }
      return false;
    }
    if(!form.valid){
      return false;
    }
    return true;
  }

  public CategoriaCheck():boolean{
    if (this.Categoria != "" && this.Categoria != null){
      if(this.Categories.includes(this.Categoria)){
        return true;
      }
    }
    return false;
  }
  public FechaCheck():boolean{
    if(this.Fecha != undefined && this.Fecha != null && this.Fecha != "" && this.Fecha != "01/01/0001"){
      return true;
    }
    return false;
  }
  public CantidadCheck():boolean{
    if((this.Cantidad > 0 || this.Cantidad < 0)  && this.Cantidad != undefined){
      return true;
    }
    return false;
  }

  public InitCalculateChecks(entries: EntryModel[]):void{
    entries.forEach(entry => {
      this.tableOperations.TotalsSum(entry,false);
    });
  }

  public AddCalculateCheck(entry: EntryModel):void{
    this.tableOperations.TotalsSum(entry,false);
    return;
  }

  public UpdateTableView(entries:EntryModel[]): void{
    this.EntriesCollection.length = 0;
    let i = 1;
    entries.forEach(entry => {
      this.EntriesCollection.push({
        displayId: i,
        Fecha: entry.Fecha,
        Cantidad: entry.Cantidad,
        Categoria: entry.Categoria,
        Descripcion: entry.Descripcion,
        ID: entry.ID,
        isDebit: entry.isDebit
      })
      i++;
    });
  }



   NegativeCategories: string[] = [
    "Groceries/Gas",
    "Gaming",
    "Food",
    "Junk Food",
    "Subscriptions",
    "Personal",
    "Misc",
    "Waste",
    "Hobby",
   ]

}

