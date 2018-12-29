import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apikey } from '../../app/apiurls/serverulrs.js'; 
import { Http , Headers } from '@angular/http'; 
import { Storage } from '@ionic/storage'; 
import 'rxjs/add/operator/map'; 
/*
  Generated class for the CrudProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  , public headers: Headers
*/
@Injectable()
export class CrudProvider {

  constructor(public http: Http , public storage: Storage ) {
    console.log('Hello CrudProvider Provider');
  }
getBooks(){
  return new Promise((resolve , reject)=> {
this.storage.get('token').then((value)=>{
let headers =  new Headers(); 
headers.append('content-Type' , 'application/json'); 
headers.append('Authorization' , 'Bearer '+value); 
console.log('value' + value); 
this.http.get(apikey+'/books' , { headers: headers})
.map(res => res.json())
.subscribe(data => {
  resolve(data); 
}, 
(err) => {
  reject(err)
}
);
})
  });
}
insertBook(BookInfo){
  return new Promise ((resolve , reject) => {
    this.storage.get('token').then((value)=>{
      let headers = new Headers(); 
      headers.append('content-Type' , 'application/json'); 
      headers.append('Authorization' , 'Bearer '+value); 
      console.log('value' + value); 
      this.http.post(apikey+'/books/' , JSON.stringify(BookInfo)  , { headers: headers})
      .map( res => res.json()).subscribe(data => {
        resolve(data); 
    
      }, (err)=>{
        reject(err);
      });

    })
  }); 
}
editBook(id , BookInfo){
  return new Promise ((resolve , reject)=> {
    this.storage.get('token').then((value)=>{
      let headers = new Headers(); 
      headers.append('Content-Type' , 'application/json'); 
      headers.append('Authorization' , 'Bearer '+value); 
      console.log('value' + value); 
      this.http.put(apikey+'/books/'+id+'/' , JSON.stringify(BookInfo), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      } , (err) => {
        reject(err);
      });
  })
});
}
deleteBook(id){
  return new Promise ((resolve , reject )=> {
    this.storage.get('token').then((value)=>{
let headers = new Headers(); 
headers.append('content-Type' , 'application/json'); 
headers.append('Authorization' , 'Bearer '+value); 
console.log('value' + value); 
this.http.delete(apikey+'/books/'+id+ '/' , { headers: headers})
.map(res=>res.json())
.subscribe(data => {
  resolve(data); 
}, (err) => {
  reject(err);
});
    })
  });
}
}