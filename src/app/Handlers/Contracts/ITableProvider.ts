import { EntryModel } from "src/app/Models/Entry";

export interface ITableProvider {
    getAllData: () => Promise<EntryModel[]>
    getAllDataByDate: () => Promise<EntryModel[]>
    addEntry: (entry: EntryModel,userId:string) => Promise<boolean>
    deleteEntry: (entryId: number, userId: string) => Promise<boolean>

}