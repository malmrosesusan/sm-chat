import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { UserTypingComponent } from './components/user-typing/user-typing.component';

// socket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8000', options: {path: '/socket.io', query: {namespace: 'groupChat'}} };

// services
import { ChatService } from './services/ChatService';

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        ChatMessageComponent,
        UserTypingComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [ChatService],
    bootstrap: [AppComponent]
})
export class AppModule { }
