import { Property } from "csstype";

export interface FontInfo {
  fontFamily: string;
  url: string;
  format?: "ttf" | "opentype" | "woff" | "woff2" | "svg";
  fontWeight?: Property.FontWeight;
  unicodeRanges?: string[];
}
export interface TemplateResource {
  fonts?: FontInfo[];
}