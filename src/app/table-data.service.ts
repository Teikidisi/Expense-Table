import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as moment from 'moment';
import {environment} from '../environments/environment'
import { EntryModel } from './Models/Entry';

@Injectable({
  providedIn: 'root'
})

export class TableDataService {

  private supabaseKey = environment.SUPABASE_KEY;
  private supabaseURL = environment.SUPABASE_URL;
  private supabaseClient: SupabaseClient;

  constructor(private http: HttpClient) {
    this.supabaseClient = createClient(this.supabaseURL, this.supabaseKey);
  }

  public getAllData() {
    return this.supabaseClient.from('Expenses').select('*');
  }

  public getUser(){
    return this.supabaseClient.auth.getUser();
  }

  public addEntry(entry: EntryModel){
    let modifiedDate = moment(entry.Fecha, "DD-MM-YYYY").format("YYYY-MM-DD");
    console.log(modifiedDate);
    this.supabaseClient.from('Expenses').insert([
      {Date: entry.Fecha},
      {Quantity: entry.Cantidad},
      {Category: entry.Categoria},
      {Description: entry.Descripcion},
    ])
  }
}
