const cardValueList = [
  "A",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "J",
  "Q",
  "K",
] as const;

export type CardValue = (typeof cardValueList)[number];

const cardTypeList = ["♣", "♦", "♥", "♠"] as const;

export type CardType = (typeof cardTypeList)[number];

const currentDeck: string[] = [];

export class Card {
  private value!: number;

  constructor(
    private cardType: CardType,
    private cardValue: CardValue,
    ifAIsOne: boolean,
  ) {
    switch (cardValue) {
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
      case "A": {
        this.value = ifAIsOne ? 1 : 11;
        break;
      }
    }
  }

  getNumericalValue = () => this.value;

  getValue = () => this.cardValue;

  getType = () => this.cardType;

  setACardAs = (value: 1 | 11) => {
    if (this.cardValue == "A") this.value = value;
  };

  toString = () => `${this.cardValue.toString()}\n${this.cardType.toString()}`;

  static generateRandomCard = (): Card => {
    const result = Math.random();

    let i = 0;
    for (let j = 0; j <= result; i++, j += 1 / cardValueList.length) {}
    i--;

    let type = cardTypeList[Math.floor(Math.random() * 4)];
    let value = cardValueList[i];

    // prevent cards from repeating
    let valueSearch = `${type}${value}`;
    if (currentDeck.find((x) => x == valueSearch) != undefined) {
      return this.generateRandomCard();
    }

    currentDeck.push(valueSearch);

    return new Card(
      cardTypeList[Math.floor(Math.random() * 4)],
      cardValueList[i],
      Math.random() > 0.5,
    );
  };
}
