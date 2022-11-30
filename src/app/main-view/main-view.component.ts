import { Component, OnInit, Injectable } from '@angular/core';
import { Categories } from '../Models/Categories';
import { EntryModel } from '../Models/Entry';
import { NgForm } from '@angular/forms';
import { NgModel, FormBuilder } from '@angular/forms';
import { createClient } from '@supabase/supabase-js'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TableDataService } from '../table-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'MainView',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})


export class MainViewComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private tableService: TableDataService, private router:Router) {

  }

  public Entry = new EntryModel();
  public EntriesCollection: EntryModel[] = [];
  public Fecha:string = "01/01/0001";
  public Cantidad: number = 0;
  public Categoria: string = 'Seleccionar';
  public Descripcion: string = '';
  public Categories: (string|Categories)[] = Object.values(Categories).filter(x => isNaN(Number(x)));

  public Total: number = 0;
  public Gastos: number = 0;
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
  public InitData: any;



  ngOnInit(): void {
    this.tableService.getAllData().then((data:any)=> console.log(data)
    )

    this.InitCalculateChecks(this.EntriesCollection);
  }





  public onSubmit(form: NgForm):void{

    let valid = this.Validations(form);
    if(!valid){
      return;
    }

    this.Entry.Fecha = this.Fecha;
    this.Entry.Cantidad = this.Cantidad;
    this.Entry.Categoria = this.Categoria;
    this.Entry.Descripcion = this.Descripcion;
    this.EntriesCollection.push(this.Entry);
    this.AddCalculateCheck(this.EntriesCollection);
    this.tableService.addEntry(this.Entry);

    this.Entry = new EntryModel();
    this.Fecha = "0001-01-01";
    this.Cantidad = 0;
    this.Categoria = "";
    this.Descripcion = "";
    console.log(this.EntriesCollection);
  }

  public Validations(form:NgForm):boolean{
    let validCat = this.CategoriaCheck();
    let validFecha = this.FechaCheck();
    let validCant = this.CantidadCheck();

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
      this.TotalsSum(entry);
    });
    return;
  }

  public AddCalculateCheck(entries: EntryModel[]):void{
    this.TotalsSum(entries[entries.length-1]);
    return;
  }

  public TotalsSum(entry: EntryModel): void {
    console.log(entry);
    this.Total += entry.Cantidad;
    if(entry.Cantidad > 0 ){
      this.Ingresos += entry.Cantidad;
    } else {
      this.Gastos += entry.Cantidad
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
    }
    return;
  }




}

enum ErrorField  {
  Fecha,
  Cantidad,
  Descripcion,
  Categoria,
}
