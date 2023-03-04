import { Component, Input } from '@angular/core';

// Data typing
import { ChatMessage, User } from '../../../../../../shared/typing/Typing';

// Font awesome icons
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {

    @Input() message: ChatMessage;
    @Input() user: User;

    public faCircle = faCircle;

}
