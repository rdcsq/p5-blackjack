import p5 from "p5";

// @ts-ignore
window.p5 = p5;
// @ts-ignore
const s: p5 = window;

s.setup = () => {
  s.createCanvas(1920, 1080);
};

s.draw = () => {};
