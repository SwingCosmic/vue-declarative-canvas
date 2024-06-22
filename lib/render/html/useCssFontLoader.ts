import { Property } from "csstype";
import { Ref, ShallowRef, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { FontInfo } from "../../meta/resource";
import { fontsToCss } from "@lib/util/font";

export function useCssFontLoader(
  root: ShallowRef<HTMLElement>,
  fonts: Ref<FontInfo[]>,
  autoLoad = true
) {
  const cssText = ref("");

  function load() {
    let css = fontsToCss(fonts.value);

    if (!root.value) {
      return;
    }
    cssText.value = css;
    let style: HTMLStyleElement | null = root.value.querySelector(
      "style.__html-render--font__"
    );
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
  if (autoLoad) {
    onMounted(() => load());
    onBeforeUnmount(() => unload());
  }

  return {
    load,
    unload,
    cssText: cssText as Readonly<Ref<string>>,
  };
}
