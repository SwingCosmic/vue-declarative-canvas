import { PropType, Ref, computed, defineComponent, ref, toRef, watchEffect } from "vue";
import { CanvasTemplate } from "../../meta/template";
import "./index.scss";
import { useCurrentElement } from '@vueuse/core';
import { Dictionary } from "@lovekicher/iterable-chain";

interface Props<T extends {}> {
  template: CanvasTemplate<T>;
  params: Partial<T>;
  preset?: string | null;
}

export default defineComponent<Props<Record<string, any>>>(
  <T extends {}>(props: Props<T>) => {

    return () => {
      return <div>暂不支持PixiRender</div>
    }
  }, 
  {
    name: "PixiRender",
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
  }
)