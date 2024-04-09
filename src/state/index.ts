import { Card } from "../models/card";
import { Deck } from "../models/deck";
import { Player } from "../types/player";

export class GameState {
  private dealer: Player;
  private players: Player[];

  constructor(private playerCount: number) {
    let dealerDeck = new Deck();
    dealerDeck.addCard(Card.generateRandomCard());
    this.dealer = {
      id: 0,
      name: "Dealer",
      deck: dealerDeck,
    };

    this.players = [];
    for (let i = 0; i < playerCount; i++) {
      let deck = new Deck();
      let card = Card.generateRandomCard();
      if (i == 0) {
        card.setACardAs(this.askForCardA() ? 1 : 11);
      }
      deck.addCard(card);
      this.players.push({
        id: i,
        name: `Jugador ${i}`,
        deck,
      });
    }
  }

  getDealer = () => this.dealer;

  getPlayers = () => this.players;

  getPlayerCount = (): number => this.playerCount;

  /**
   * @returns true if 1, false if 11
   */
  askForCardA = () =>
    Number.parseInt(prompt("Valor de carta A: (1 / 11)") ?? "1") == 1;

  nextTurn = () => {
    this.dealer.deck.addCard(Card.generateRandomCard());

    this.players.forEach((player, i) => {
      let card = Card.generateRandomCard();
      if (i == 0) {
        card.setACardAs(this.askForCardA() ? 1 : 11);
      }
      player.deck.addCard(card);
    });
  };
}
