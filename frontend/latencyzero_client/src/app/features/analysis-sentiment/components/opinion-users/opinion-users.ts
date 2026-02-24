import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpinionService } from '../../services/opinion.service';

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

  private fb = inject(FormBuilder);
  private opinionService = inject(OpinionService);

  constructor() {
    this.opinionForm = this.fb.group({
      name: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.opinionForm.invalid) return;
    this.sending = true;
    const { name, message } = this.opinionForm.value;
    this.opinionService.submit({ name: name || undefined, message }).subscribe({
      next: () => {
        this.submitted = true;
        this.sending = false;
      },
      error: () => {
        this.sending = false;
      }
    });
  }

}

