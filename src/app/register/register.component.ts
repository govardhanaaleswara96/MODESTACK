import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModeStackService } from '../mode-stack.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(5)]],
    address: [null, [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private fb: FormBuilder,
    private modeService: ModeStackService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  registerUser() {
    //console.log(this.registerForm);
    this.modeService
      .createUser(this.registerForm.value)
      .then((result) => {
        // console.log(result);
        this.toastr.success(`${result['body'].message}`);
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.log(err);
        // this.toastr.error(`${err.error['body'].message}`);
        this.toastr.error(`User Registration Failed`);
      });
    this.registerForm.reset();
  }
}
