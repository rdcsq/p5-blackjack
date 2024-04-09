import p5 from "p5";
import { Player } from "../types/player";

export function drawDeck(
  s: p5,
  x: number,
  y: number,
  player: Player,
  showExtraCards: boolean = true,
) {
  s.push();
  s.textSize(20);

  if (player.deck.getValue() > 21) {
    s.fill(255, 0, 0);
    s.text("Excedió", x - 90, y - 10);
  }

  player.deck.getCards().forEach((card, i) => {
    s.fill(255, 255, 255);
    s.stroke(0, 0, 0);
    let hideCard = !showExtraCards && i > 0;
    if (hideCard) {
      s.fill(128, 128, 128);
    }
    s.rect(x - 100 + i * 40, y, 100, 160, 10, 10, 10, 10);
    if (!hideCard) {
      s.fill(0, 0, 0);
      s.noStroke();
      let cardText = card.toString();
      if (card.getValue() == "A") {
        cardText += `\n(${card.getNumericalValue()})`;
      }
      console.log(cardText);
      s.text(cardText, x - 90 + i * 40, y + 10, 50, s.height);
    }
  });
  s.pop();
}
