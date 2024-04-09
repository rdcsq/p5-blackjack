import p5 from "p5";
import { GameState } from "./state";
import { drawDeck } from "./components/deck";

// @ts-ignore
window.p5 = p5;
// @ts-ignore
const s: p5 = window;

let state: GameState;

s.setup = () => {
  s.createCanvas(900, 500);
  // const players = Number.parseInt(prompt("Cantidad de jugadores") ?? "4");
  state = new GameState(4);
};

s.draw = () => {
  s.background(255, 255, 255);
  drawDeck(s, 500, 100, state.getDealer(), true);
  state.getPlayers().forEach((player, i) => {
    drawDeck(s, 200 + 200 * i, 300, player);
  });
};
