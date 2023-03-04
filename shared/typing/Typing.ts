export interface User {
    name: string,
    isOnline: boolean,
    isTyping: boolean
}
export interface ChatMessage {
    user: User,
    message: string,
    createdAt: Date,
}
export enum SocketEvent {
    CONNECTION = 'connection',
    MSG = 'msg',
    JOIN_CHAT = 'joinChat',
    LEAVE_CHAT = 'leaveChat',
    USER_TYPING = 'userTyping',
    USER_STOPPED_TYPING = 'userStoppedTyping',
}