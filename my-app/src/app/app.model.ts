export interface GameConfig {
    mode: 'humanAsks' | 'machineAsks';
    level: 'random' | 'high';
}

export type  GuessResponse = 'tooLow' | 'tooHigh' | 'gameOver' | null;