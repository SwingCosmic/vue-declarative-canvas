import { PropType, Ref, computed, defineComponent, provide, ref, toRef, watchEffect } from "vue";
import { CanvasTemplate } from "../../meta/template";
import "./index.scss";
import { useCssFontLoader } from "./useCssFontLoader";
import { useCurrentElement } from '@vueuse/core';
import { Dictionary } from "@lovekicher/iterable-chain";
import ElementRender from "./ElementRender";
import _ from "lodash";

interface Props<T extends {}> {
  template: CanvasTemplate<T>;
  params: Partial<T>;
  preset?: string | null;
}

export default defineComponent<Props<Record<string, any>>>(
  (props, ctx) => {

    const realParams = computed({
      get() {
        return props.params;
      },
      set(v) {
        ctx.emit("update:params", v);
      }
    });
    watchEffect(() => {
      let presetName = props.preset || props.template.presets[0].name;
      let preset = props.template.presets.find(p => p.name == presetName);
      if (!preset) {
        console.warn("找不到预设 " + presetName);
        preset = props.template.presets[0];
      }

      let params = preset.defaults;
      realParams.value = _.cloneDeep(params);
    });

    const paramsWithConfig = computed<Dictionary<any>>(() => {
      return {
        ...realParams.value,
        $config: props.template.config || {},
      };
    });
    
    const el: Ref<HTMLElement> = useCurrentElement() as any;
    const fonts = computed(() => props.template.resources?.fonts || []);
    useCssFontLoader(el, fonts);

    provide("params", paramsWithConfig);

    return () => {
      const elements = props.template.elements
        .map(e => (
          <ElementRender element={e} />
        ));

      return <div class="html-render">
        <div class="canvas-root">
          {elements}
        </div>
      </div>;
    }
  }, 
  {
    name: "HtmlRender",
    props: {
      template: {
        type: Object as PropType<CanvasTemplate<Dictionary<any>>>,
        required: true,
      },
      params: {
        type: Object,
        default: () => ({})
      },
      preset: {
        type: String,
      },
    },
    emits: ["update:params"],
  }
)