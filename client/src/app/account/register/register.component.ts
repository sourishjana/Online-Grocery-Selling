import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup
  error:string[]

  constructor(private fb:FormBuilder,private service:AccountService,private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  get displayName(){return this.registerForm.get('displayName')}
  get email(){return this.registerForm.get('email')}
  get password(){return this.registerForm.get('password')}

  createLoginForm(){
    this.registerForm=this.fb.group({
      displayName:['',Validators.required],
      email:['',
        [Validators.required,Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")],
        [this.validateEmailNotTaken()]
      ],
      password:['',Validators.required]
    })
  }
  
  onSubmit(){
    console.log(this.registerForm.value)
    this.service.register(this.registerForm.value).subscribe(resp=>{
      console.log(localStorage.getItem('token'))
      this.router.navigateByUrl('/shop')
    },err=>{
      console.log(err)
      this.error=err.errors
    })
  }

  validateEmailNotTaken():AsyncValidatorFn{
    return control=>{
      if(!control.value) return of(null)
      return this.service.checkEmailExists(control.value).pipe(
        map(res=>{
          return res ? {emailExists:true}:null
        })
      )
    }
  }

}
