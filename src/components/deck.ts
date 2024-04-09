import p5 from "p5";
import { Player } from "../types/player";

export function drawDeck(
  s: p5,
  x: number,
  y: number,
  player: Player,
  isDealer: boolean = false,
) {
  s.push();
  s.textSize(20);
  player.deck.getCards().forEach((card, i) => {
    s.fill(255, 255, 255);
    s.stroke(0, 0, 0);
    s.rect(x - 100 + i * 50, y, 100, 160, 10, 10, 10, 10);
    if (isDealer && i > 0) {
      s.fill(128, 128, 128);
    } else {
      s.fill(0, 0, 0);
      s.noStroke();
      s.text(card.toString(), x - 90 + i * 50, y + 10, 50, 80);
    }
  });
  s.pop();
}
