import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';
import { EditPage } from '../edit/edit';
import { InsertPage } from '../insert/insert';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
mydata : any; 

  constructor(public navCtrl: NavController , public crudProvider: CrudProvider) {
this.crudProvider.getBooks().then((data) => {

  this.mydata = data["data"];
  console.log(this.mydata); 
})
  }
onEdit(id, name , details){
  console.log('edit info :'+id + details)
  this.navCtrl.push(EditPage , {
    id:id , 
    name:name, 
    details:details
  })
}
insertPage(){
  this.navCtrl.push(InsertPage); 
}
onDelete(id){
  this.crudProvider.deleteBook(id).then((result)=>{
    console.log(result)
  }, 
  (err)=> {
    console.log("insert err" +err)
    console.log("Delete Book id " +id)

  })
}
doRefresh(refresher) {
  console.log('Begin async operation', refresher);

  setTimeout(() => {
    console.log('Async operation has ended');
    refresher.complete();
  }, 2000);
}

}
