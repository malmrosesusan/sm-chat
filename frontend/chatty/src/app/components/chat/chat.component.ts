import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

// RXJS
import { debounceTime, tap, filter, Subscription } from 'rxjs';

// Services
import { ChatService } from 'src/app/services/ChatService';

// Data typing
import { ChatMessage, User } from '../../../../../../shared/typing/Typing';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

    @ViewChild('chatContainer') private chatContainer: ElementRef;

    // forms
    public messageForm: FormGroup;
    public userInfoForm: FormGroup;


    // UI indicators
    public displayMessageForm: boolean = false;

    // This is the user who is utilizing the chat feature.
    // There is no authentication, but think of it as
    // the logged in user.
    public user: User;

    // Arrays containing messages in the chat and users in the chat that
    // are typing.
    public messages: ChatMessage[] = [];
    public typingUsers: User[] = [];

    // Holds subscriptions for subscription management.
    private subscriptions: Subscription = new Subscription();

    constructor(
        private formBuilder: FormBuilder,
        private chatService: ChatService,
    ) {

    }

    /**
     * Angular lifecycle hook.
     */
    public ngOnInit(): void {

        // create form for user to join chat.
        this.userInfoForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required])
        });

        // create form for user to send message to chat.
        this.messageForm = this.formBuilder.group({
            message: new FormControl('', [Validators.required])
        });

        // get the chat messages
        this.subscriptions.add(
            this.chatService.getMessages()
                .pipe(
                    filter((message: ChatMessage) => message && message.user && message.user.name !== this.user?.name),
                    tap((message: ChatMessage) => {
                        this.messages.push(message);
                        this.handleUsersLeaving(message);
                    })
                )
                .subscribe()
        )

        // get typing users
        this.subscriptions.add(
            this.chatService.getUserIsTyping()
                .pipe(
                    filter((user: User) => user.name !== this.user?.name),
                    tap((user: User) => {
                        if (this.typingUsers.filter((u) => u.name === user.name).length === 0) {
                            this.typingUsers.push(user);
                        }
                    })
                )
                .subscribe()
        )

        // get users that have stopped typing
        this.subscriptions.add(
            this.chatService.getUserStoppedTyping()
                .pipe(
                    filter((user: User) => user.name !== this.user?.name),
                    tap((user: User) => {
                        if (this.typingUsers.filter((u) => u.name === user.name).length) {
                            this.typingUsers.splice(this.typingUsers.findIndex(u => u.name === user.name), 1);
                        }
                        this.messages = this.messages.map(m => {
                            if (m.user.name === user.name) {
                                m.user.isTyping = user.isTyping;
                            }
                            return m;
                        })
                    })
                )
                .subscribe()
        )

        // listen for changes in message form input to signal to socket that
        // user has started or stopped typing.
        this.subscriptions.add(
            this.messageForm.valueChanges
                .pipe(
                    tap(() => {
                        this.chatService.userIsTyping(this.user);
                    }),
                    debounceTime(500),
                    tap(() => {
                        this.chatService.userStoppedTyping(this.user);
                    })
                ).subscribe()
        )
    }

    /**
     * Angular lifecycle hook.
     */
    public ngAfterViewChecked(): void {
        // keep UI scrolled to bottom of chat messages
        this.scrollToBottom();
    }

    /**
     * Scrolls chat container to bottom of messages.
     */
    private scrollToBottom(): void {
        try {
            this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }


    /**
     * Handles updating if a user is online or not.
     * @param msg
     */
    private handleUsersLeaving(msg: ChatMessage): void {
        if (!msg.user.isOnline) {
            this.messages.forEach(m => {
                if (m.user.name === msg.user.name) {
                    m.user.isOnline = false;
                }
            })
        }
    }

    /**
     * Adds user to chat.
     */
    public joinChat(): void {
        if (this.userInfoForm.get('name')?.value) {
            this.user = {
                name: this.userInfoForm.get('name')?.value,
                isOnline: true,
                isTyping: false
            }
            this.chatService.joinChat(this.user);
            this.displayMessageForm = true;
        }
    }

    /**
     * Signals to socket that user has left chat and updates UI.
     */
    public leaveChat(): void {
        const user: User = {
            name: this.user.name,
            isOnline: false,
            isTyping: false
        }
        this.chatService.leaveChat(user);
        this.messages = [];
        this.typingUsers = [];
        this.displayMessageForm = false;

    }

    /**
     * Sends a message.
     * @returns
     */
    public sendMessage(): void {
        if (!this.messageForm.valid) {
            return;
        }
        if (this.messageForm.get('message')?.value) {
            const messageData: ChatMessage = {
                user: this.user,
                message: this.messageForm.get('message')?.value,
                createdAt: new Date(),
            }
            this.chatService.sendMessage(messageData);
            this.messages.push(messageData);
            this.messageForm.get('message')?.reset();
        }

    }

    /**
     * Angular lifecycle hook.
     */
    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
