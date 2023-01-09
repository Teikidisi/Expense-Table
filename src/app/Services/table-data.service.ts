import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as moment from 'moment';
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

  public getAllData() {
    return this.supabaseClient.from('Expenses').select('*');
  }

  public getAllDataByDate(){
    return this.supabaseClient.from('Expenses').select('*').order('Fecha',{ascending:false});
  }

  public addEntry(entry: EntryModel,userId:string){
    const modifiedDate = moment(entry.Fecha, "YYYY-MM-DD").format("YYYY-MM-DD");
    return this.supabaseClient.from('Expenses').insert({
      Fecha: entry.Fecha, Cantidad:entry.Cantidad,Categoria:entry.Categoria,Descripcion:entry.Descripcion,user_id: userId
    });
  }

  public deleteEntry(entryId:number,userId:string){
    return this.supabaseClient.from('Expenses').delete().eq('ID',entryId).eq('user_id',userId);
  }
}
