import { CSSProperties } from "vue";
import { DrawableElementInit } from "../../meta/element";


export interface ElementProps<T extends DrawableElementInit> {
  element: T;
  style?: CSSProperties;
}
