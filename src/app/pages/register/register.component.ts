import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { RegisterData } from '../../interfaces/register';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../snack-bar.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatButtonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService = inject(AuthService);
  snackBarService = inject(SnackBarService)
  router = inject(Router);

  async register(){
    const registerData : RegisterData = {
      username: '',
      password: '',
      email: ''
    }
    const register = await this.authService.register(registerData);
    if(!register.success){
      this.snackBarService.openSnackbarError(register.message);
    } else {
      this.snackBarService.openSnackbarSuccess(register.message);
      this.router.navigate(["/login"])
    }
  }

}
