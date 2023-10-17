import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as moment from 'dayjs';
import {environment} from '../../environments/environment'
import { EntryModel } from '../Models/Entry';

@Injectable({
  providedIn: 'root'
})

export class TableDataService {


  private supabaseKey = environment.SUPABASE_KEY;
  private supabaseURL = environment.SUPABASE_URL;
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(this.supabaseURL, this.supabaseKey);
  }

  public getAllData(userID: string) {
    return this.supabaseClient.from('Expenses').select('*').eq('user_id',userID);
  }

  public getAllDataByDate(userID: string){
    return this.supabaseClient.from('Expenses').select('*').order('Fecha',{ascending:false}).eq('user_id',userID);
  }

  public addEntry(entry: EntryModel,userId:string){
    const modifiedDate = moment(entry.Fecha, "YYYY-MM-DD").format("YYYY-MM-DD");
    return this.supabaseClient.from('Expenses').insert({
      Fecha: entry.Fecha, 
      Cantidad:entry.Cantidad,
      Categoria:entry.Categoria,
      Descripcion:entry.Descripcion,
      user_id: userId, 
      is_debit_payment: entry.isDebit
    });
  }

  public deleteEntry(entryId:number,userId:string){
    return this.supabaseClient.from('Expenses').delete().eq('ID',entryId).eq('user_id',userId);
  }

  updateEntryDebit(entry: EntryModel, userId: string): { error: any; } | PromiseLike<{ error: any; }> {
    return this.supabaseClient.from('Expenses').update({'is_debit_payment': entry.isDebit}).eq('ID',entry.ID).eq('user_id',userId);
  }

  getDebitExpenses(userId:string){
    return this.supabaseClient.from('Expenses').select('Categoria,Cantidad,Fecha').eq('is_debit_payment',true).eq('user_id',userId);
  }
}
