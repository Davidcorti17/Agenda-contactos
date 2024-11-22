import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginData } from '../../interfaces/login';

@Component({
  selector: 'app-login',
  imports: [RouterModule, MatInputModule,MatFormFieldModule,MatButtonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  async login(form:LoginData){
    if(!form.username) return;
    if(!form.password) return;
    const login = await this.authService.login(form);
    if(login.success) this.router.navigate(["contacts"]);
  }

}
