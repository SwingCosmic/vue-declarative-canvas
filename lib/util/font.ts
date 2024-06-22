import _ from "lodash";
import { FontInfo } from "..";


export function fontsToCss(fonts: FontInfo[]) {
  return fonts
    .map((f) => {
      let src = `url('${f.url}')`;
      if (f.format) {
        src += ` format('${f.format}')`;
      }

      let unicodeRange = "";
      if (f.unicodeRanges && f.unicodeRanges.length > 0) {
        unicodeRange = `unicode-range: ${f.unicodeRanges.join(", ")};`;
      }

      let fontWeight = "";
      if (f.fontWeight) {
        fontWeight = `font-weight: ${f.fontWeight};`;
      }

      return `
@font-face {
  font-family: ${f.fontFamily};
  src: ${src};
  ${fontWeight}
  ${unicodeRange}
}
`;
    })
    .join("\n");
}

export async function fontsToEmbeddedCss(fonts: FontInfo[]) {
  const inlineFonts = await Promise.all(
    fonts.map(async (font) => {
      const res = await fetch(font.url);
      const blob = await res.blob();

      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const embFont = _.cloneDeep(font);
      embFont.url = dataUrl;
      return embFont;
    })
  );

  return fontsToCss(inlineFonts);
}

