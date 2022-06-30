import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  returnUrl:string

  constructor(private fb:FormBuilder,private service:AccountService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // after login where we need to redirect to some url
    // if there is any return url we need to return that else we return to shop
    this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl || '/shop'

    this.createLoginForm()
  }

  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  createLoginForm(){
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]],
      password:['',Validators.required]
    })
  }
  
  onSubmit(){
    console.log(this.loginForm.value)
    this.service.login(this.loginForm.value).subscribe(resp=>{
      console.log(localStorage.getItem('token'))
      //this.router.navigateByUrl('/shop')
      this.router.navigateByUrl(this.returnUrl)
    },err=>{
      console.log(err)
    })
  }

}
