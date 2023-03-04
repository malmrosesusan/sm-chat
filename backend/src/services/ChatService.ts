// data typing
import { ChatMessage } from '../../../shared/typing/Typing';

export class ChatService {

    // Stores used messages so bot won't repeat any until all have been used.
    private usedJokeMessages: string[] = [];
    private usedWeatherMessages: string[] = [];
    private usedGreetingMessages: string[] = [];
    private usedMusicMessages: string[] = [];
    private usedEncouragementMessages: string[] = [];


    constructor() {
    }


    /**
     * Looks for key words sent in a message and generates a reply from the bot.
     * @param msg
     * @returns
     */
    public handleMessage = (msg: ChatMessage): ChatMessage | void => {

        switch (true) {
            case msg.message.includes('joke'):
                return {
                    user: {
                        name: 'bot',
                        isOnline: true,
                        isTyping: false
                    },
                    message: this.getRandomJokeMessage(),
                    createdAt: new Date(),
                };
                break;
            case msg.message.includes('weather'):
                return {
                    user: {
                        name: 'bot',
                        isOnline: true,
                        isTyping: false
                    },
                    message: this.getRandomWeatherMessage(),
                    createdAt: new Date(),
                };
                break;
            case msg.message.includes('how are you'):
                return {
                    user: {
                        name: 'bot',
                        isOnline: true,
                        isTyping: false
                    },
                    message: this.getRandomHowAreYouMessage(),
                    createdAt: new Date(),
                };
                break;
            case msg.message.includes('music'):
                return {
                    user: {
                        name: 'bot',
                        isOnline: true,
                        isTyping: false
                    },
                    message: this.getRandomMusicMessage(),
                    createdAt: new Date(),
                };
                break;
            case msg.message.includes('bad day'):
                return {
                    user: {
                        name: 'bot',
                        isOnline: true,
                        isTyping: false
                    },
                    message: this.getRandomEncouragingMessage(),
                    createdAt: new Date(),
                };
                break;

        }

    }

    /**
     * Gets random message on the topic of music.
     * @returns
     */
    private getRandomMusicMessage(): string {
        console.log('getRandomMusicMessage');
        let messages: string[] = [
            `The new Beyonce album is great.`,
            `Check out a band called Fleetwood Mac.`,
            `Harry Styles can do no wrong.`,
            `Pink is cool, Pink Floyd is cooler.`,
            `I once saw Nirvana play a college dorm party.`,
        ];
        if (this.usedMusicMessages.length === messages.length) {
            this.usedMusicMessages = [];
        }
        let message = this.randomElement(messages);
        let hasSentMessage: boolean = this.usedMusicMessages.includes(message);
        do {
            message = this.randomElement(messages);
            hasSentMessage = this.usedMusicMessages.includes(message);
        }
        while(hasSentMessage === true)
        this.usedMusicMessages.push(message);
        return message;

    }

    /**
     * Gets random encouraging message.
     * @returns
     */
    private getRandomEncouragingMessage(): string {
        let messages: string[] = [
            `It's ok, you got this.`,
            `Don't give up! It'll get better.`,
            `Stay strong, and focus on what's important.`,
            `Believe in yourself!`,
            `You can do it. I believe in you.`,
        ]
        if (this.usedEncouragementMessages.length === messages.length) {
            this.usedEncouragementMessages = [];
        }
        let message = this.randomElement(messages);
        let hasSentMessage: boolean = this.usedEncouragementMessages.includes(message);
        do {
            message = this.randomElement(messages);
            hasSentMessage = this.usedEncouragementMessages.includes(message);
        }
        while(hasSentMessage === true)
        this.usedEncouragementMessages.push(message);
        return message;
    }


    /**
     * Gets random joke message.
     * @returns
     */
    private getRandomJokeMessage(): string {
        let messages: string[] = [
            `Here's a good one... Why do bicycles fall over? Because they are two-tired!`,
            `Why was the broom late? It over swept!`,
            `Why did the cookie go to the hospital? It was feeling crummy.`,
            `Someone sent me a postcard picture of the earth. On the back it said, "Wish you were here."`,
            `I spilled spot remover on my dog. Now he's gone.`,
            `It's a small world, but I wouldn't want to have to paint it.`,
            `I had amnesia once or twice.`,
        ]
        if (this.usedJokeMessages.length === messages.length) {
            this.usedJokeMessages = [];
        }
        let message = this.randomElement(messages);
        let hasSentMessage: boolean = this.usedJokeMessages.includes(message);
        do {
            message = this.randomElement(messages);
            hasSentMessage = this.usedJokeMessages.includes(message);
        }
        while(hasSentMessage === true)
        this.usedJokeMessages.push(message);
        return message;
    }


    /**
     * Gets random greeting message answer.
     * @returns
     */
    private getRandomHowAreYouMessage(): string {
        let messages: string[] = [
            `Feeling well, how are you?`,
            `A little tired, but doing ok.`,
            `I am super excited about the new Beyonce album!`,
            `Doing really good today, hope you are too!`,
            `Looking forward to the new Marvel movie.`,
        ]
        if (this.usedGreetingMessages.length === messages.length) {
            this.usedGreetingMessages = [];
        }
        let message = this.randomElement(messages);
        let hasSentMessage: boolean = this.usedGreetingMessages.includes(message);
        do {
            message = this.randomElement(messages);
            hasSentMessage = this.usedGreetingMessages.includes(message);
        }
        while(hasSentMessage === true)
        this.usedGreetingMessages.push(message);
        return message;
    }


    /**
     * Gets random message on the topic of the weather.
     * @returns
     */
    private getRandomWeatherMessage(): string {
        let messages: string[] = [
            `You'd better take an umbrella.`,
            `Gonna be a hot one, stay hydrated!`,
            `Might be windy, don't bother with a hat today.`,
            `A bit chilly, wear a coat.`,
        ]
        if (this.usedWeatherMessages.length === messages.length) {
            this.usedWeatherMessages = [];
        }
        let message = this.randomElement(messages);
        let hasSentMessage: boolean = this.usedWeatherMessages.includes(message);
        do {
            message = this.randomElement(messages);
            hasSentMessage = this.usedWeatherMessages.includes(message);
        }
        while(hasSentMessage === true)
        this.usedWeatherMessages.push(message);
        return message;
    }

    /**
     * Returns a random element of an array.
     * @param arr
     * @returns
     */
    private randomElement = (arr: string[]): string => {
        const random = Math.floor(Math.random() * arr.length);
        return arr[random];
    }

}
