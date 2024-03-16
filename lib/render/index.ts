import { Color } from "@lib/meta/base";
export interface ExportImageOption {
  width?: number;
  height?: number;
  backgroundColor?: Color;
  imageFormat?: string;
}


export interface RenderInstance {
  exportToImage(option?: ExportImageOption): Promise<Blob>;
}

export { default as HtmlRender } from "./html/HtmlRender";
export { default as PixiRender } from "./pixi/PixiRender";