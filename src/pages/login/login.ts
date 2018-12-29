import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth' 
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
email:string ='';
password:string = ''; 
errorMsg:string; 
  constructor(public authService: AuthProvider , public navCtrl: NavController, public navParams: NavParams , public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
errorFunc(message){
  let alert = this.alertCtrl.create({
    title : 'Warning', 
    subTitle : message , 
buttons : ['OK'],
  });
  alert.present();
}
myLogin(){
if (this.email.trim() !== '' && this.password.trim() !== ''){
  console.log(this.email.trim()+""+this.password.trim());

if(this.password.trim() == ''){
  this.errorFunc('Please Put Your Password');
}else {
  let credentials = {
    email : this.email ,
    password : this.password 

  };
  this.authService.login(credentials).then((result)=>{
    console.log(result);
    this.navCtrl.setRoot(TabsPage);
  }, (err)=>{
    console.log(err);
  this.errorFunc('Wrong Credentials , Try Again');
  console.log("credentials:" +JSON.stringify(credentials))

});
}
}else{
  this.errorFunc('Please Enter the valid Password ');

} 
}
myLogout(){
  this.authService.logout();
 // this.navCtrl.setRoot(TabsPage);

}
}


