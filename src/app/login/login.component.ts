import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    
    const token = localStorage.getItem('token');
    if (token) {
      
      this.router.navigateByUrl('/home');
    }
  }

  login() {
    console.log(this.email);
    console.log(this.password);

    let bodyData = {
      email: this.email,
      password: this.password,
    };

    this.http.post("http://localhost:9992/student/login", bodyData).subscribe(
      (resultData: any) => {
        console.log("result data in result component", resultData);

        if (resultData.status && resultData.token) {
          alert('Login Success');
          console.log(resultData);
          localStorage.setItem('token', resultData.token);
          this.router.navigateByUrl('/home');
        } else {
          alert("Incorrect Email or Password");
          console.log("Error login");
        }
      },
      error => {
        console.error("Error occurred:", error);
        
      }
    );
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}
