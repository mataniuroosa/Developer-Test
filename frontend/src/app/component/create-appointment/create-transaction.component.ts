import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';// this module is used to see the NgModule two way data passing example
import {  Router } from '@angular/router';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  transactionForm: FormGroup;
  message:string="";
  toggle_message:string=''
  org:string
  constructor(private service :ServiceService,private router : Router) { }

  get appointment_id() {
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
  
  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      appointment_id: new FormControl('',Validators.required),
      to: new FormControl('',Validators.required),
      from: new FormControl(this.service.getUserId()),
      date: new FormControl('',Validators.required),
      content: new FormControl('',Validators.required)
    })
    this.org= this.service.getOrg();
  }

  submit(){
    const temp:any=this.transactionForm.value
    this.toggle_message=''

    this.service
    .CreateAppointment
    (temp.appointment_id,temp.from,temp.to,temp.date,temp.content)
    .subscribe((prod :query)=>{
      if(prod.status==200){
        console.log("responces",prod);

        this.toggle_message='success'
        this.message="Transacion Successfully Created"
      }else{
        this.toggle_message='fail'
        this.message= prod.message
      }
    });
  }
}

export interface Invoke {
  status:number,
  message:string
}
export interface query {
  status:number,
  message:string,
  data:string
}
