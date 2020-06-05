import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModeStackService } from '../mode-stack.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private modeService: ModeStackService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  loginUser() {
    this.modeService
      .logUser(this.loginForm.value)
      .then((result) => {
        // console.log(result);
        //console.log(result['body'].accessToken);
        this.modeService.setToken(result['body'].accessToken);
        this.toastr.success(`${result['body'].message}`);
        this.router.navigate(['/article-list']);
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error(`${err.error['body'].message}`);
      });
    this.loginForm.reset();
  }
}
