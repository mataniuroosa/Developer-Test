import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = environment.URL;

  constructor(private httpclient: HttpClient) { }



  login(email: string, pass: string) {
    var data = {
      user_id: email,
      password: pass
    };
    return this.httpclient.post(this.url + '/users/login', data)
  }
  getOrg() {

    return localStorage.getItem('org')
  }
  setOrg(org: string) {

    localStorage.setItem('org', org);
  }
  getUserId() {
    return localStorage.getItem('userid')
  }
  setUserId(org: string) {
    localStorage.setItem('userid', org);
  }

  QueryUser(user_id:string){
    return this.httpclient.get(this.url + '/users/QueryUser',{
      params:{
        user_id: user_id,
        org:localStorage.getItem('org')
      }
    })
  }

  isExist(user_id:string){
    return this.httpclient.get(this.url + '/users/isExist',{
      params:{
        user_id: user_id,
      }
    })
  }


  createUser(name: string,email: string, pass: string,org:string) {
    console.log(email);
    
    var data = {
      name:name,
      user_id: email,
      password: pass,
      org:org
    };
    return this.httpclient.post(this.url + '/users/createUser', data)
  }

  CreateAppointment(appointmentId: string,user_id: string, to: string,date :string,content:string) {

    var data = {
      appointmentId:appointmentId,
      user_id: user_id,
      To: to,
      From:user_id,
      Date:date,
      Content:content,
      org:localStorage.getItem('org')
    };
    return this.httpclient.post(this.url + '/transation/CreateAppointment', data)
  }


  UpdateAppointment(appointmentId: string,content:string) {
    var data = {
      appointmentId:appointmentId,
      user_id: this.getUserId(),
      Content:content,
      org:localStorage.getItem('org')
    };
    return this.httpclient.post(this.url + '/transation/UpdateAppointment', data)
  }

  QueryAllAppointment(org:string){
    return this.httpclient.get(this.url + '/transation/QueryAllAppointment',{
      params:{
        user_id: this.getUserId(),
        org:org,
        user_org: this.getOrg()
      }
    })
  }

  QueryAppointment(user_id:string,appointmentId:string){
    return this.httpclient.get(this.url + '/transation/QueryAppointment',{
      params:{
        user_id: user_id,
        appointmentId:appointmentId,
        org:localStorage.getItem('org')
      }
    })
  }

  GetAppointmentHistory(user_id:string,appointmentId:string){
    return this.httpclient.get(this.url + '/transation/GetAppointmentHistory',{
      params:{
        user_id: user_id,
        appointmentId:appointmentId,
        org:localStorage.getItem('org')
      }
    })
  }
}
