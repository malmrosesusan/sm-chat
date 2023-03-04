import { Component, Input } from '@angular/core';

// Data typing
import {  User } from '../../../../../../shared/typing/Typing';

// Font awesome
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-typing',
  templateUrl: './user-typing.component.html',
  styleUrls: ['./user-typing.component.scss']
})
export class UserTypingComponent  {

    @Input() user: User;

    public faSpinner = faSpinner;

}
