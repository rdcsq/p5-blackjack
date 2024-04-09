import { GameState } from "./state";

export class Simulation {
  private gameStates: GameState[];
  private currentGame: number;
  private hasFinished: boolean;

  constructor(numberOfGames: number, players: number) {
    this.gameStates = [];
    this.currentGame = 0;
    this.hasFinished = false;
    for (let i = 0; i < numberOfGames; i++) {
      this.gameStates.push(new GameState(players));
    }
  }

  getCurrentGameId = () => this.currentGame;

  getCurrentGame = () => this.gameStates[this.currentGame];

  getHasFinished = () => this.hasFinished;

  private runGame = async (game: GameState) => {
    while (!game.getDealerShowCards()) {
      await new Promise((r) => setTimeout(r, 500));
      game.nextTurn();
      await new Promise((r) => setTimeout(r, 500));
      if (Math.random() > 0.5) {
        game.finishGame();
      }
    }

    if (this.currentGame < this.gameStates.length - 1) {
      this.currentGame += 1;
    } else {
      this.hasFinished = true;
    }
  };

  start = async () => {
    this.runGame(this.gameStates[this.currentGame]).then(async () => {
      if (this.hasFinished) return;
      await this.start();
    });
  };
}
