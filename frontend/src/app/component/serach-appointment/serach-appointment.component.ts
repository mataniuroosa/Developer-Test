import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';// this module is used to see the NgModule two way data passing example
import {  Router } from '@angular/router';
@Component({
  selector: 'app-serach-transation',
  templateUrl: './serach-transation.component.html',
  styleUrls: ['./serach-transation.component.scss']
})
export class SerachTransationComponent implements OnInit {
  resultFound:boolean=false
  searchForm: FormGroup;
  message:string="";
  toggle_message:string=''
  transactionForm: FormGroup;
  get org() {
    return this.transactionForm.get('transation_id') as FormControl
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
  get updatedbyuserId() {
    return this.transactionForm.get('updatedbyuserId') as FormControl
  }  get updatedbyorg() {
    return this.transactionForm.get('updatedbyorg') as FormControl
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
    this.service.QueryAppointment(this.service.getUserId(),this.searchForm.value.appointment_id).subscribe((prod :query)=>{
      if(prod.status==200){
        console.log("responces",prod);
        const data:transaction= JSON.parse(prod.data);
        this.resultFound=true
        this.transactionForm = new FormGroup({
          org: new FormControl(data.org),
          to: new FormControl(data.to),
          from: new FormControl(data.from),
          date: new FormControl(data.date),
          content: new FormControl(data.content ,Validators.required),
          updatedbyuserId: new FormControl(data.updatedbyuserId),
          updatedbyorg: new FormControl(data.updatedbyorg)
        })
      }else{
        this.toggle_message='fail'
        this.message= prod.message
      }
    });
  }
  update(){
    this.service.UpdateAppointment(this.searchForm.value.appointment_id,this.transactionForm.value.content).subscribe((prod :Invoke)=>{
      console.log(prod);
      if(prod.status==200){
        this.toggle_message='success'
        this.message= "successfully Updated"
      }else{
        this.toggle_message='fail'
        this.message= prod.message
      }
    })
  }
}
export interface query {
  status:number,
  message:string,
  data:string
}
export interface Invoke {
  status:number,
  message:string
}

 export interface transaction{
  appointmentid:string,
  to:string,
  from:string,
  date:string,
  org:string,
  content:string,
  updatedbyuserId:string,
  updatedbyorg:string
 }