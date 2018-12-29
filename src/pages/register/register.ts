import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController , LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login'; 
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
name :string ='';
password :string ='';
email :string ='';
errMsg :string; 

  constructor(public authService: AuthProvider , public alertCtrl: AlertController , public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  errorFunc(message){
    let alert = this.alertCtrl.create({
      title : 'Warning', 
      subTitle : message , 
  buttons : ['OK'],
    });
    alert.present();
  }
  myRegister(){
if (this.email.trim() && this.name.trim() && this.password.trim()){
  if (this.password.trim() === ''){
    this.errorFunc('Please Put your Password');
  }else{
let credentials = {
  email : this.email , 
  name : this.name , 
  password : this.password
}; 
this.authService.createAccount(credentials).then((result)=>{
console.log(result);
this.errorFunc('Welcome to Our App');

this.navCtrl.setRoot(LoginPage);

}, (err) => {
  console.log(err);
  this.errorFunc('Wrong Credentials , Try Again');
  console.log("credentials:" +JSON.stringify(credentials))
}); 
  }
}else {
  this.errorFunc('Please Enter the valid Password ');

}
  }
}
