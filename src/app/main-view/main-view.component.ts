import { Component, OnInit } from '@angular/core';
import { Categories } from '../Models/Categories';
import { EntryModel } from '../Models/Entry';
import { NgForm } from '@angular/forms';
import { NgModel, FormBuilder } from '@angular/forms';

@Component({
  selector: 'MainView',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public Entry = new EntryModel();
  public EntriesCollection: EntryModel[] = [];
  public Fecha:string;
  public Cantidad: number;
  public Categoria: string = 'Seleccionar';
  public Descripcion: string = '';
  public Categories: (string|Categories)[] = Object.values(Categories).filter(x => isNaN(Number(x)));

  constructor(private formBuilder : FormBuilder) {
    console.log(this.Entry)
    console.log(this.EntriesCollection);

  }


  ngOnInit(): void {
    console.log(this.EntriesCollection[0]);
    console.log(this.Fecha);
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
    this.Entry = new EntryModel();
    this.Fecha = "";
    this.Cantidad = 0;
    this.Categoria = "";
    this.Descripcion = "";
    console.log(this.EntriesCollection);
  }

  public Validations(form:NgForm):boolean{
    let validCat = this.CategoriaCheck();
    let validFecha = this.FechaCheck();
    let validCant = this.CantidadCheck();
    console.log(form.controls);
    if(!validCat || !validFecha || !validCant){
      if (!validCat){
        form.controls["Categoria"].setErrors({"invalid":true})
      }
      if (!validFecha){
        form.controls["Fecha"].setErrors({invalid:true})
      }
      if (!validCant){
        form.controls["Cantidad"].setErrors({invalid:true})
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
    if(this.Fecha != undefined && this.Fecha != null && this.Fecha != ""){
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



}

enum ErrorField  {
  Fecha,
  Cantidad,
  Descripcion,
  Categoria,
}
