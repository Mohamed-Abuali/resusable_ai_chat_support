import bankingIntents from '../../banking_intents.json';
import { BankingIntent, BankingIntents } from '../types/types';

// Type assertion for JSON import
const typedIntents = bankingIntents as BankingIntents;

// Initialize with proper typing
export class BankingAssistant {
    private readonly intents: BankingIntent[];
    private readonly fallback: BankingIntent;

    constructor(intentsData: BankingIntents) {
        this.intents = intentsData.intents;
        this.fallback = intentsData.fallback;

        // Validate structure on initialization
        if (!this.intents || !this.fallback) {
            throw new Error('Invalid intents structure');
        }
    }

    // Core response handler
    public handleQuery(query: string): string {
        const normalized = this.normalizeInput(query);
        const matchedIntent = this.findIntentMatch(normalized);
        return this.selectResponse(matchedIntent);
    }

    private normalizeInput(input: string): string {
        return input
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .trim();
    }

    private findIntentMatch(input: string): BankingIntent {
        return this.intents.find(intent =>
            intent.patterns.some(pattern =>
                this.normalizeInput(pattern) === input
            )
        ) || this.fallback;
    }

    private selectResponse(intent: BankingIntent): string {
        const randomIndex = Math.floor(Math.random() * intent.responses.length);
        return intent.responses[randomIndex];
    }
}

// Initialize instance
export const assistant = new BankingAssistant(typedIntents);