import { EntryModel } from "../Models/Entry";

export default class TableOperations {
    public test: number = 0;

    constructor(){};

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
}
