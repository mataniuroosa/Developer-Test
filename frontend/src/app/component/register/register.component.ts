import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';// this module is used to see the NgModule two way data passing example
import { debounceTime, tap } from 'rxjs/operators';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  message:string; 
  toggle_message:string=''


  constructor(private service :ServiceService,private router : Router) { }
  get user_id() {
    return this.userForm.get('user_id') as FormControl
  }
  
  get password() {
    return this.userForm.get('password') as FormControl
  }
  
  get name() {
    return this.userForm.get('name') as FormControl
  }  get org() {
    return this.userForm.get('org') as FormControl
  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('',Validators.required),
      org: new FormControl('',Validators.required),
      user_id: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
    this.isExit()
  }
  submit(){
    this.service.createUser(this.userForm.value.name,this.userForm.value.user_id,this.userForm.value.password,this.userForm.value.org).subscribe((prod :Invoke)=>{
      
      if(prod.status==200){
        console.log("responces",prod);

        this.toggle_message='success'
        this.message="User Successfully Created"
      }else{
        this.toggle_message='fail'
        this.message= prod.message
      }
    });
  }

login(){
  this.router.navigateByUrl('login');
}

  isExit(){
    this.user_id.valueChanges.pipe(
      debounceTime(500)
      ,tap(
        user_id=>{

          if (user_id !=='' && !this.user_id.invalid){
            this.user_id.markAsPending();
          }else{
            this.user_id.setErrors({'invalid':true})
          }
        }
      )
    ).subscribe(
      user_id=>{
         this.service.isExist(user_id).subscribe((prob:query)=>{
           console.log("isEsit"+prob.data);
           
           if(prob.data=='true'){
             this.user_id.markAsPending({onlySelf:false})
             this.user_id.setErrors({'notUnique':true})
             console.log(this.user_id.errors);

           }else{
            this.user_id.markAsPending({onlySelf:false})
            this.user_id.setErrors(null)
           }
         })
      }
    )

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
