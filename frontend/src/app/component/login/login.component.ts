import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';// this module is used to see the NgModule two way data passing example
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  message:string="";
  toggle_message:boolean=false

  constructor(private service :ServiceService,private router : Router) { }
  get user_id() {
    return this.userForm.get('user_id') as FormControl
  }
  
  get password() {
    return this.userForm.get('password') as FormControl
  }
  
  ngOnInit(): void {
    this.userForm = new FormGroup({
      user_id: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
  }
  submit(){
    this.service.login(this.userForm.value.user_id,this.userForm.value.password).subscribe((prod :query)=>{
      if(prod.data=='false'){
        this.message="Wrong Id or Password"
        this.toggle_message=true
      }else if(prod.status==200){
        this.toggle_message=false

        const tem:any[]=prod.data.split(",");
        this.service.setOrg(tem[1]);
        this.service.setUserId(this.userForm.value.user_id);
        this.router.navigateByUrl('home');
      }else{
        this.message=prod.message
        this.toggle_message=true
      }
    });
  }

  register(){
    this.router.navigateByUrl('register');
  }
}
export interface query {
  status:number,
  message:string,
  data:string
}
