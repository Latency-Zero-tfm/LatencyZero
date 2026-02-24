import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'opinion-users',
  imports: [ReactiveFormsModule],
  templateUrl: './opinion-users.html',
  styleUrl: './opinion-users.css',
})
export class OpinionUsers {

  opinionForm: FormGroup;
  submitted = false;
  sending = false;

  constructor(private fb: FormBuilder) {
    this.opinionForm = this.fb.group({
      name: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.opinionForm.invalid) return;
    this.sending = true;
    setTimeout(() => {
      this.submitted = true;
      this.sending = false;
    }, 600);
  }

}
