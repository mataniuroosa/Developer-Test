import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';// this module is used to see the NgModule two way data passing example
import {  Router } from '@angular/router';
@Component({
  selector: 'app-details-appointment',
  templateUrl: './details-appointment.component.html',
  styleUrls: ['./details-appointment.component.scss']
})
export class DetailsTransationComponent implements OnInit {

  resultFound:boolean=false
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
  get appointmentid() {
    return this.transactionForm.get('appointmentid') as FormControl
  }
  
  constructor(private service :ServiceService,private router : Router) { }


  ngOnInit(): void {
    if(localStorage.getItem('status')=='current'){
    this.service.QueryAppointment(this.service.getUserId(),localStorage.getItem('appointment_id')).subscribe((prod :query)=>{
      if(prod.status==200){
        console.log("responces",prod);
        const data:transaction= JSON.parse(prod.data);
        this.transactionForm = new FormGroup({
          appointmentid: new FormControl(data.appointmentid),
          org: new FormControl(data.org),
          to: new FormControl(data.to),
          from: new FormControl(data.from),
          date: new FormControl(data.date),
          content: new FormControl(data.content),
          updatedbyuserId: new FormControl(data.updatedbyuserId),
          updatedbyorg: new FormControl(data.updatedbyorg)
          
        })
        this.resultFound=true
      }else{
        this.toggle_message='fail'
        this.message= prod.message
      }
    });
    }else{
      
      const data:transaction= JSON.parse(localStorage.getItem('value'));
      console.log(data);
      
        this.transactionForm = new FormGroup({
          appointmentid: new FormControl(data.appointmentid),
          org: new FormControl(data.org),
          to: new FormControl(data.to),
          from: new FormControl(data.from),
          date: new FormControl(data.date),
          content: new FormControl(data.content),
          updatedbyuserId: new FormControl(data.updatedbyuserId),
          updatedbyorg: new FormControl(data.updatedbyorg)
    })
    this.resultFound=true

  }
}

}
export interface query {
  status:number,
  message:string,
  data:string
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