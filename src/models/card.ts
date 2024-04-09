export type CardValue =
  | "A1"
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | "A11"
  | "J"
  | "Q"
  | "K";

export type CardType = "clubs" | "diamonds" | "hearts" | "spades";

export class Card {
  private value!: number;

  constructor(
    private cardType: CardType,
    cardValue: CardValue,
  ) {
    switch (cardValue) {
      case "A1":
      case 1:
        this.value = 1;
        break;
      case 2:
        this.value = 2;
        break;
      case 3:
        this.value = 3;
        break;
      case 4:
        this.value = 4;
        break;
      case 5:
        this.value = 5;
        break;
      case 6:
        this.value = 6;
        break;
      case 7:
        this.value = 7;
        break;
      case 8:
        this.value = 8;
        break;
      case 9:
        this.value = 9;
        break;
      case "J":
      case "Q":
      case "K":
        this.value = 10;
        break;
      case "A11":
        this.value = 11;
        break;
    }
  }

  getValue = () => this.value;

  getType = () => this.cardType;
}
