import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  name: string ="";
  dob: string ="";
  email: string ="";
  password: string ="";

  constructor(private router: Router,private http: HttpClient) 
  {
  }
  

  ngOnInit(): void
  {
  }

  register()
  {
    let bodyData = 
    {
      "name" : this.name,
      "dob" : this.dob,
      "email" : this.email,
      "password" : this.password,
    };
    this.http.post("http://localhost:9992/student/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully");
        this.router.navigateByUrl('/login');
    });
  }

  save()
  {
    this.register();
  }

}