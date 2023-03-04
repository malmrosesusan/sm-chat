import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Data typing
import { ChatMessage, User, SocketEvent } from '../../../../../shared/typing/Typing';

@Injectable()
export class ChatService {
    constructor(private socket: Socket) {
    }

    /**
     * Sends a chat message via the socket.
     * @param messageData
     */
    public sendMessage(messageData: ChatMessage): void {
        this.socket.emit(SocketEvent.MSG, messageData);
    }

    /**
     * Gets a message when socket has emitted any.
     * @returns
     */
    public getMessages(): Observable<ChatMessage> {
        return this.socket.fromEvent(SocketEvent.MSG)
            .pipe(
                map((data: any) => data.msg)
            );
    }

    /**
     * Listens to socket for indication user is typing.
     * @returns
     */
    public getUserIsTyping(): Observable<User> {
        return this.socket.fromEvent(SocketEvent.USER_TYPING)
            .pipe(
                map((data: any) => data.user)
            );
    }

    /**
     * Tells the socket a user is typing.
     * @returns
     */
    public userIsTyping(user: User): void {
        return this.socket.emit(SocketEvent.USER_TYPING, user);
    }

    /**
     * Tells the socket a user has stopped typing.
     * @returns
     */
    public userStoppedTyping(user: User): void {
        return this.socket.emit(SocketEvent.USER_STOPPED_TYPING, user);
    }

    /**
     * Listens to socket for indication user has stopped typing.
     * @returns
     */
    public getUserStoppedTyping(): Observable<User> {
        return this.socket.fromEvent(SocketEvent.USER_STOPPED_TYPING)
            .pipe(
                map((data: any) => data.user)
            );
    }


    /**
     * Connects to chat and tells socket that user has joined.
     * @param user
     */
    public joinChat(user: User): void {
        this.socket.connect();
        this.socket.emit(SocketEvent.JOIN_CHAT, user);
    }

    /**
     * Tells socket user has left a chat and disconnects from socket.
     * @param user
     */
    public leaveChat(user: User): void {
        this.socket.emit(SocketEvent.LEAVE_CHAT, user);
        this.socket.disconnect();
    }

    /**
     * Listens for user leaving a chat.
     * @returns
     */
    public userHasLeftChat(): Observable<ChatMessage> {
        return this.socket.fromEvent(SocketEvent.LEAVE_CHAT)
            .pipe(
                map((data: any) => data.msg)
            );
    }

}
