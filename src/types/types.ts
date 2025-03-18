export interface BankingIntent {
    tag: string;
    patterns: string[];
    responses: string[];
    followUp?: {
        context: string;
        handler: (params: Record<string, string>) => string;
    };
}

export interface BankingIntents {
    intents: BankingIntent[];
    fallback: BankingIntent;
}