import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';// this module is used to see the NgModule two way data passing example
import {  Router } from '@angular/router';

@Component({
  selector: 'app-get-all-appointment',
  templateUrl: './get-all-appointment.component.html',
  styleUrls: ['./get-all-appointment.component.scss']
})
export class GetAllAppointmentComponent implements OnInit {
  org:string
  transactionForm: FormGroup;
  showresult:boolean=false
  data:string[];

  constructor(private service :ServiceService,private router : Router) { }
  get transation_type() {
    return this.transactionForm.get('transation_type') as FormControl
  }
  
  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      transation_type: new FormControl('',Validators.required),
    })
    this.org= this.service.getOrg();
  }

  getTransation(){
    console.log(this.transactionForm.value.transation_type);
    this.service
    .QueryAllAppointment
    (this.transactionForm.value.transation_type)
    .subscribe((prod :query)=>{
      if(prod.status==200){
        // console.log("responces",prod);
         this.data=JSON.parse("[" + prod.data + "]");
         this.showresult=true
      }else{
        this.showresult=false
      }
    });
  }
  
  getDetails(appointment_id){
    console.log(appointment_id);
    localStorage.setItem('status', "current");
    localStorage.setItem('appointment_id', appointment_id);
    this.router.navigateByUrl('home/details-transaction');
  }
}
export interface query {
  status:number,
  message:string,
  data:string
}