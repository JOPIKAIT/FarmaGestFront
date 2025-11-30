import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private auth: AuthserviceService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value as any)
      .subscribe({
        next: () => this.router.navigate(['/farmagest/dashboard']),
        error: (err) => console.error(err)
      });
  }
}
