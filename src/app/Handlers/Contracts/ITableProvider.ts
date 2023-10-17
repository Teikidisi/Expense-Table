import { CreditCheckModel } from "src/app/Models/CreditCheckModel";
import { EntryModel } from "src/app/Models/Entry";

export interface ITableProvider {
    getAllData: (userID:string) => Promise<EntryModel[]>
    getAllDataByDate: (userID:string) => Promise<EntryModel[]>
    addEntry: (entry: EntryModel,userId:string) => Promise<boolean>
    deleteEntry: (entryId: number, userId: string) => Promise<boolean>
    updateEntryDebit: (entry: EntryModel, userId: string) => Promise<boolean>
    getDebitExpenses: (userId:string) => Promise<CreditCheckModel[]>

}