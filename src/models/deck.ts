import { Card } from "./card";

export class Deck {
  private cards: Card[];

  constructor() {
    this.cards = [];
  }

  addCard = (card: Card) => this.cards.push(card);

  getValue = (): number =>
    this.cards.reduce((x, card) => (x += card.getValue()), 0);
}
