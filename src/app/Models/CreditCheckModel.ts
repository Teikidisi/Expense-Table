
export class CreditCheckModel{
    public Categoria: string;
    public Cantidad: number = 0;
    public Fecha: string = "";

    constructor(categoria: string, cantidad:number, fecha:string){
        this.Categoria = categoria;
        this.Cantidad = cantidad;
        this.Fecha = fecha;
    }
}