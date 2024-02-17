import { Property } from "csstype";
import { Ref, ShallowRef, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { FontInfo } from "../../meta/resource";


export function useCssFontLoader(root: ShallowRef<HTMLElement>, fonts: Ref<FontInfo[]>) {

  function load() {
    let css = fonts.value.map(f => {
      let src = `url('${f.url}')`;
      if (f.format) {
        src += ` format('${f.format}')`;
      }

      let unicodeRange = "";
      if (f.unicodeRanges && f.unicodeRanges.length > 0) {
        unicodeRange = `unicode-range: ${f.unicodeRanges.join(", ")};`
      }

      let fontWeight = "";
      if (f.fontWeight) {
        fontWeight = `font-weight: ${f.fontWeight};`
      }
      
      return `
@font-face {
  font-family: ${f.fontFamily};
  src: ${src};
  ${fontWeight}
  ${unicodeRange}
}
`;
      }).join("\n");

      if (!root.value) {
        return;
      }
      let style: HTMLStyleElement | null = root.value.querySelector("style.__html-render--font__");
      if (!style) {
        style = document.createElement("style");
        style.className = "__html-render--font__";
        root.value.appendChild(style);
      }
      style.innerHTML = css;
  }

  function unload() {
    let style = root.value.querySelector("style.__html-render--font__");
    if (style) {
      root.value.removeChild(style);
    }
  }

  watch(fonts, () => load());
  onMounted(() => load());
  onBeforeUnmount(() => unload())

  return {
    load,
    unload,
  };
}

