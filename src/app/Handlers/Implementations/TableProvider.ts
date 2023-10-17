import { EntryModel } from "src/app/Models/Entry";
import { TableDataService } from "src/app/Services/table-data.service";
import { ITableProvider } from "../Contracts/ITableProvider";
import { CreditCheckModel } from "src/app/Models/CreditCheckModel";

export class TableProvider implements ITableProvider{

    constructor(private tableService: TableDataService) { 
        
    }

    async getAllData(userID:string): Promise<EntryModel[]> {
        const {data: datas, error} = await this.tableService.getAllData(userID);
        // eslint-disable-next-line prefer-const
        if (error){
          console.error('error',error.message);
          return [];
        } else {
          const entries: EntryModel[] = datas.map(this.entryMapper);
          return entries;
        }
      }
    
      async getAllDataByDate(userID:string):Promise<EntryModel[]>{
        const {data: data, error} = await this.tableService.getAllDataByDate(userID);
        if(error){
          console.error('error',error.message)
          return [];
        } else{
          const entries: EntryModel[] = data.map(this.entryMapper);
          return entries;
        }
      }

      
      async addEntry(entry: EntryModel,userId:string): Promise<boolean>{
        const {data:data,error} = await this.tableService.addEntry(entry,userId)
        if(error){
          console.error('error',error.message)
          return false
        } else{
          return true
        }
      }
      
      async deleteEntry(entryId: number, userId: string): Promise<boolean>{
        const {error} = await this.tableService.deleteEntry(entryId,userId);
        if(error){
          console.error('error',error.message)
          return false
        } else{
          return true
        }
      }
      
      async updateEntryDebit(entry: EntryModel, userId:string):Promise<boolean>{
        const {error} = await this.tableService.updateEntryDebit(entry,userId);
        if (error){
          console.error('error', error.message)
          return false;
        } else{
          return true;
        }
      }

      async getDebitExpenses(userID:string): Promise<CreditCheckModel[]>{
        const {data,error} = await this.tableService.getDebitExpenses(userID);
        if(error){
          console.error('error',error.message)
          return [];
        } else{
          const entries: CreditCheckModel[] = data.map(this.creditCheckMapper);
          return entries;
        }
      }

      private entryMapper = (data: any) => {
        return new EntryModel(data.Fecha,data.Cantidad,data.Categoria,data.Descripcion,data.ID,data.is_debit_payment)
      } 

      private creditCheckMapper = (data: any) =>{
        return new CreditCheckModel(data.Categoria,data.Cantidad, data.Fecha);
      }
      
    }