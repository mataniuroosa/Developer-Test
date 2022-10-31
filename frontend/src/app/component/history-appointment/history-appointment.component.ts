import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';// this module is used to see the NgModule two way data passing example
import {  Router } from '@angular/router';
@Component({
  selector: 'app-history-appointment',
  templateUrl: './history-appointment.component.html',
  styleUrls: ['./history-appointment.component.scss']
})
export class HistoryAppointmentComponent implements OnInit {
  data:AppointmentHistory[]
  resultFound:boolean=false
  searchForm: FormGroup;
  message:string="";
  toggle_message:string=''
  transactionForm: FormGroup;
  get org() {
    return this.transactionForm.get('appointment_id') as FormControl
  }
  get to() {
    return this.transactionForm.get('to') as FormControl
  }
  get from() {
    return this.transactionForm.get('from') as FormControl
  }
  get date() {
    return this.transactionForm.get('date') as FormControl
  }
  get content() {
    return this.transactionForm.get('content') as FormControl
  }

  constructor(private service :ServiceService,private router : Router) { }
  get appointment_id() {
    return this.searchForm.get('appointment_id') as FormControl
  }
  

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      appointment_id: new FormControl('',Validators.required)
    })
  }
  search(){
    this.service.GetAppointmentHistory(this.service.getUserId(),this.searchForm.value.appointment_id).subscribe((prod :query)=>{
      if(prod.status==200){
        console.log(prod.data);
        
        this.data= JSON.parse(prod.data);
        console.log(this.data[0]);
        this.resultFound=true
      }else{
        this.toggle_message='fail'
        this.message= prod.message
      }
    });
  }
  getDetails(value:appointment){
    console.log(value);
    localStorage.setObje
    localStorage.setItem('value', JSON.stringify(value));
    localStorage.setItem('status', "history");
    this.router.navigateByUrl('home/details-appointment');
  }
}

export interface query {
  status:number,
  message:string,
  data:string
}

 export interface appointment{
  appointmentid:string,
  to:string,
  from:string,
  date:string,
  org:string,
  content:string,

 }
 export interface appointmentHistory{
  TxId:string,
  Value:string,
  Timestamp:string,
  IsDelete:string,
 }

