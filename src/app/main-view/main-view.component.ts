/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Categories } from '../Models/Categories';
import { EntryModel } from '../Models/Entry';
import { NgForm } from '@angular/forms';
import { TableDataService } from '../Services/table-data.service';
import { ServerConnectionService } from '../Services/server-connection.service';
import { TableProvider } from '../Handlers/Implementations/TableProvider';
import { ITableProvider } from '../Handlers/Contracts/ITableProvider';
import * as moment from 'moment';
import { IUserProvider } from '../Handlers/Contracts/IUserProvider';
import { UserProvider } from '../Handlers/Implementations/UserProvider';
import { User } from '@supabase/supabase-js';
import { DisplayEntryModel } from '../Models/DisplayEntry';


@Component({
  selector: 'MainView',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})


export class MainViewComponent implements OnInit {

  constructor( private authService: ServerConnectionService, private tableService: TableDataService ) {
    this.tableProvider  = new TableProvider(this.tableService);
    this.userProvider = new UserProvider(this.authService);
  }

  public tableProvider: ITableProvider
  public userProvider: IUserProvider

  public Entry = new EntryModel();
  public EntriesCollection: DisplayEntryModel[] = [];
  public Fecha = "01/01/0001";
  public Cantidad = 0;
  public Categoria = 'Seleccionar';
  public Descripcion = '';
  public Categories: (string|Categories)[] = Object.values(Categories).filter(x => isNaN(Number(x)));
  public p=1; 

  public Total = 0;
  public Gastos = 0;
  public Ingresos: number = 0;

  public Personal: number = 0;
  public Groceries: number = 0;
  public Gaming: number = 0;
  public Food: number = 0;
  public JunkFood: number = 0;
  public Subscriptions: number = 0;
  public Misc: number = 0;
  public Work: number = 0;
  public Deposits: number = 0;
  public Waste: number = 0;
  public Hobby: number = 0;
  public User: User;

  public gastosPorcentaje:string;
  public ingresosPorcentaje:string;
  public workPorcentaje:string;
  public depositsPorcentaje:string;
  public wastePorcentaje:string;
  public junkfoodPorcentaje:string;
  public foodPorcentaje:string;
  public subscriptionsPorcentaje:string;
  public gamingPorcentaje:string;
  public personalPorcentaje:string;
  public groceriesPorcentaje:string;
  public miscPorcentaje:string;
  public hobbyPorcentaje: string;



  ngOnInit(): void {
      const userStorage = localStorage.getItem('User'); 
      if(userStorage) this.User = JSON.parse(userStorage);
      this.obtainDataWithCheck();
  }

  public async obtainDataWithCheck():Promise<void>{
    this.tableProvider.getAllDataByDate().then((data) =>{
      this.InitCalculateChecks(data);
      this.PercentageCheck();
    }).finally()
  }


  public addEntry(entry: EntryModel,userId:string): void {
    this.tableProvider.addEntry(entry,userId).then();
  }

  public deleteEntry(entry: EntryModel,userId:string):void{
    this.tableProvider.deleteEntry(entry.ID,userId).then((data)=>
    {
      if(data){
        entry.Cantidad = -entry.Cantidad;
        this.TotalsSum(entry,true);
        this.PercentageCheck();
        this.ObtainData();
      }
    });
  }

  public async ObtainData(): Promise<void>{
     this.tableProvider.getAllDataByDate().then((data) => data);
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
    this.tableProvider.addEntry(this.Entry,this.User.id).then(async (data) =>{
      if(data == 'Success'){
          this.AddCalculateCheck(this.Entry)
          this.PercentageCheck();
          this.ObtainData();
          this.Entry = new EntryModel();
          this.Fecha = moment().format('yyyy-MM-DD');
          this.Cantidad = 0;
          this.Categoria = "";
          this.Descripcion = "";
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
    let i = 0;
    entries.forEach(entry => {
      this.EntriesCollection.push({
        displayId: i,
        Fecha: entry.Fecha,
        Cantidad: entry.Cantidad,
        Categoria: entry.Categoria,
        Descripcion: entry.Descripcion,
        ID: entry.ID
      })
      this.TotalsSum(entry,false);
      i++;
    });
    return;
  }

  public AddCalculateCheck(entry: EntryModel):void{
    this.TotalsSum(entry,false);
    return;
  }

  public TotalsSum(entry: EntryModel,isDelete:boolean): void {
    this.Total += entry.Cantidad;
    if(isDelete){
      if(entry.Cantidad > 0 ){
        this.Gastos += entry.Cantidad;
      } else {
        this.Ingresos += entry.Cantidad
      }
    } else{
      if(entry.Cantidad > 0 ){
        this.Ingresos += entry.Cantidad;
      } else {
        this.Gastos += entry.Cantidad
      }
    }

    //Category sums
    switch(entry.Categoria){
      case "Groceries/Gas":{
        this.Groceries+=entry.Cantidad;

        break;
      }
      case"Gaming": {
        this.Gaming += entry.Cantidad;

        break;
      }
      case "Food": {
        this.Food += entry.Cantidad;

        break;
      }
      case "Junk Food": {
        this.JunkFood += entry.Cantidad;

        break;
      }
      case "Subscriptions":{
        this.Subscriptions += entry.Cantidad;

        break;
      }
      case "Personal": {
        this.Personal += entry.Cantidad;

        break;
      }
      case "Misc": {
        this.Misc += entry.Cantidad;

        break;
      }
      case "Work": {
        this.Work += entry.Cantidad;

        break;
      }
      case "Deposits": {
        this.Deposits += entry.Cantidad;

        break;
      }
      case "Waste": {
        this.Waste += entry.Cantidad;

        break;
      }
      case "Hobby": {
        this.Hobby += entry.Cantidad;
        break;
      }
    }
    return;
  }

  public PercentageCheck():void{
    this.ingresosPorcentaje = (100 - Math.abs(this.Gastos/this.Ingresos*100)).toFixed(1);
    this.gastosPorcentaje = (Math.abs(this.Gastos/this.Ingresos*100)).toFixed(1);
    this.groceriesPorcentaje = (this.Groceries/this.Gastos*100).toFixed(1);
    this.gamingPorcentaje = (this.Gaming/this.Gastos*100).toFixed(1);
    this.foodPorcentaje = (this.Food/this.Gastos*100).toFixed(1);
    this.junkfoodPorcentaje = (this.JunkFood/this.Gastos*100).toFixed(1);
    this.subscriptionsPorcentaje = (this.Subscriptions/this.Gastos*100).toFixed(1);
    this.personalPorcentaje = (this.Personal/this.Gastos*100).toFixed(1);
    this.miscPorcentaje = (this.Misc/(this.Gastos)*100).toFixed(1);
    this.workPorcentaje = (this.Work/this.Ingresos*100).toFixed(1);
    this.depositsPorcentaje = (this.Deposits/this.Ingresos*100).toFixed(1);
    this.wastePorcentaje = (this.Waste/this.Gastos*100).toFixed(1);
    this.hobbyPorcentaje = (this.Hobby/this.Gastos*100).toFixed(1);
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

