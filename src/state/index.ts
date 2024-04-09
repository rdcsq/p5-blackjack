import { Card } from "../models/card";
import { Deck } from "../models/deck";
import { Player } from "../types/player";

export class GameState {
  private dealer: Player;
  private players: Player[];
  private firstRound = true;
  private dealerShowCards = false;
  private playersThatWon: number[] = [];

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
      if (card.getValue() == "A" && i == 0) {
        card.setACardAs(Math.random() > 0.5 ? 1 : 11);
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

  getShowTakeCardPrompt = () => this.firstRound;

  getDealerShowCards = () => this.dealerShowCards;

  getPlayersThatWon = () => this.playersThatWon;

  /**
   * @returns true if 1, false if 11
   */
  askForCardA = () =>
    Number.parseInt(prompt("Valor de carta A: (1 / 11)") ?? "1") == 1;

  nextTurn = (playerOneTakeCard?: boolean) => {
    if (this.dealer.deck.getCards().length < 2) {
      this.dealer.deck.addCard(Card.generateRandomCard());
    }

    this.players.forEach((player, i) => {
      let card: Card | undefined;

      // first player
      if (this.firstRound || (i == 0 && playerOneTakeCard == true)) {
        card = Card.generateRandomCard();

        if (i == 0 && card.getValue() == "A") {
          card.setACardAs(Math.random() > 0.5 ? 1 : 11);
        }
      }

      // draw card 50% of the time for other players that havent overdrawn
      if (i != 0 && player.deck.getValue() < 21 && Math.random() > 0.5) {
        card = Card.generateRandomCard();
      }

      if (!card) return;

      player.deck.addCard(card);
    });

    this.firstRound = false;
  };

  finishGame = () => {
    this.dealerShowCards = true;
    if (this.dealer.deck.getValue() <= 16) {
      this.dealer.deck.addCard(Card.generateRandomCard());
    }

    let dealersDeckValue = this.dealer.deck.getValue();
    if (dealersDeckValue > 21) {
      this.players.forEach((player) => this.playersThatWon.push(player.id));
      return;
    }

    this.players.forEach((player) => {
      let value = player.deck.getValue();
      if (value <= 21 && value >= dealersDeckValue) {
        this.playersThatWon.push(player.id + 1);
      }
    });
  };
}
