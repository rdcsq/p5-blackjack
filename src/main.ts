import p5 from "p5";
import { GameState } from "./state";
import { drawDeck } from "./components/deck";

// @ts-ignore
window.p5 = p5;
// @ts-ignore
const s: p5 = window;

let state: GameState;
let nextTurnButton: p5.Element;
let takeCardSecondTurn: p5.Element;
let keepSecondTurn: p5.Element;

s.setup = () => {
  s.createCanvas(900, 500);
  s.noLoop();

  // const players = Number.parseInt(prompt("Cantidad de jugadores") ?? "4");
  state = new GameState(4);

  nextTurnButton = s.createButton("Siguiente turno");
  nextTurnButton.position(50, 50);
  nextTurnButton.mouseClicked(nextTurnButtonMouseClicked);

  takeCardSecondTurn = s.createButton("Pedir carta");
  takeCardSecondTurn.position(50, 50);
  takeCardSecondTurn.hide();
  takeCardSecondTurn.mouseClicked(takeCardSecondTurnMouseClicked);

  keepSecondTurn = s.createButton("Continuar");
  keepSecondTurn.position(50, 75);
  keepSecondTurn.hide();
  keepSecondTurn.mouseClicked(keepSecondTurnMouseClicked);
};

s.draw = () => {
  s.background(255, 255, 255);
  drawDeck(s, 500, 100, state.getDealer(), state.getDealerShowCards());
  state.getPlayers().forEach((player, i) => {
    drawDeck(s, 200 + 200 * i, 300, player);
  });

  if (state.getDealerShowCards()) {
    s.push();
    s.textSize(25);
    s.textAlign("center");
    console.log(state);
    s.fill(255, 0, 0);
    if (state.getDealer().deck.getValue() > 21) {
      s.text("Perdió el dealer", s.width / 2, 50);
    } else if (state.getPlayersThatWon().length > 0) {
      s.fill(0, 255, 0);
      s.text(
        `Ganadores ${state.getPlayersThatWon().join(",")}`,
        s.width / 2,
        50,
      );
    } else {
      s.text("Ganó el dealer", s.width / 2, 50);
    }
    s.pop();
  }
};

function nextTurnButtonMouseClicked() {
  state.nextTurn();
  nextTurnButton.hide();
  takeCardSecondTurn.show();
  keepSecondTurn.show();
  s.redraw();
}

function takeCardSecondTurnMouseClicked() {
  state.nextTurn(true);
  if (state.getPlayers()[0].deck.getValue() > 21) {
    takeCardSecondTurn.hide();
    keepSecondTurn.hide();
  }
  s.redraw();
}

function keepSecondTurnMouseClicked() {
  state.finishGame();
  takeCardSecondTurn.hide();
  keepSecondTurn.hide();
  s.redraw();
}
