import { Component, input } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-summary',
  imports: [RouterModule,MatIconModule],
  templateUrl: './contact-summary.component.html',
  styleUrl: './contact-summary.component.scss'
})
export class ContactSummaryComponent {
  contact = input.required<Contact>();
}
