import { EntryModel } from "src/app/Models/Entry";
import { TableDataService } from "src/app/Services/table-data.service";
import { ITableProvider } from "../Contracts/ITableProvider";

export class TableProvider implements ITableProvider{

    constructor(private tableService: TableDataService) { 
        
    }

    async getAllData(): Promise<EntryModel[]> {
        const {data: datas, error} = await this.tableService.getAllData();
        // eslint-disable-next-line prefer-const
        if (error){
          console.error('error',error.message);
          return [];
        } else {
          return datas;
        }
      }
    
      async getAllDataByDate():Promise<EntryModel[]>{
        const {data: data, error} = await this.tableService.getAllDataByDate();
        if(error){
          console.error('error',error.message)
          return [];
        } else{
          return data;
        }
      }
    
      async addEntry(entry: EntryModel,userId:string): Promise<string>{
        const {data:data,error} = await this.tableService.addEntry(entry,userId)
        if(error){
          console.error('error',error.message)
          return "error"
        } else{
          return 'Success'
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
}