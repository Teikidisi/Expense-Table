
export class EntryModel {
  Fecha = "";
  Cantidad= 0;
  Categoria: string;
  Descripcion: string | null = '';
  ID = 0;
  isDebit:boolean = false;

  constructor(fecha:string,cantidad:number,categoria:string,descripcion:string|null,ID:number,isDebit:boolean){
    this.Fecha = fecha;
    this.Cantidad = cantidad;
    this.Categoria = categoria;
    this.Descripcion = descripcion;
    this.ID = ID;
    this.isDebit = isDebit;
  }
}
