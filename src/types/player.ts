import { Deck } from "../models/deck";

export type Player = {
  id: number;
  name: string;
  deck: Deck;
};
