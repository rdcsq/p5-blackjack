import { Card } from "../models/card";
import { Deck } from "../models/deck";
import { Player } from "../types/player";

export class GameState {
  private players: Player[];

  constructor(private playerCount: number) {
    this.players = [];
    for (let i = 0; i < playerCount; i++) {
      let deck = new Deck();
      deck.addCard(Card.generateRandomCard());
      this.players.push({
        id: i,
        name: `Jugador ${i}`,
        deck,
      });
    }
  }

  getPlayerCount = (): number => this.playerCount;
}
