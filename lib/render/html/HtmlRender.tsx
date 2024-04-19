import { PropType, Ref, computed, defineComponent, provide, ref, shallowRef, toRef, watchEffect } from "vue";
import { CanvasTemplate } from "../../meta/template";
import "./index.scss";
import { useCssFontLoader } from "./useCssFontLoader";
import { useCurrentElement } from '@vueuse/core';
import { Dictionary } from "@lovekicher/iterable-chain";
import ElementRender from "./ElementRender";
import _ from "lodash";
import { renderToImage } from "./util";
import { RenderInstance } from "@lib/index";

interface Props<T extends {}> {
  template: CanvasTemplate<T>;
  params: Partial<T>;
  preset?: string | null;
}

export default defineComponent({
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
  setup(props: Props<Dictionary<any>>, ctx) {
    const root = shallowRef<HTMLElement>(null!);

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
    
    // const el: Ref<HTMLElement> = useCurrentElement() as any;
    const fonts = computed(() => props.template.resources?.fonts || []);
    useCssFontLoader(root, fonts);

    provide("params", paramsWithConfig);

    return {
      exportToImage(option) {
        return renderToImage(root.value, option);
      },
      root,
    } as RenderInstance;
  },
  render() {
    return (
      <div class="html-render">
        <div class="canvas-wrapper" ref="root">
          <div class="canvas-root" >
            {this.template.elements.map(e => (
              <ElementRender element={e} />
            ))}
          </div>
        </div>
      </div>
    );
  }
});