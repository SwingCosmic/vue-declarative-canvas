import { CSSProperties, Ref, ref, defineComponent, inject, PropType, watchEffect } from "vue";
import { DrawableElement, DrawableElementInit } from "../../meta/element";
import Binding from "../../binding/Binding";
import { getLayout } from "./util";
import { Dictionary } from "field-metadata/lib/types/base";

import { Group } from "./elements/Group";
import { Text } from "./elements/Text";
import { Sprite } from "./elements/Sprite";
import { Graphics } from "./elements/Graphics";
import { ITransform, createTransform } from "@lib/math/transform";


export default defineComponent({
  name: "ElementRender",
  props: {
    element: {
      type: Object as PropType<DrawableElementInit>,
      required: true,
    }
  },
  setup(props, ctx) {
    const params = inject<Ref<Dictionary<any>>>("params", ref<Dictionary<any>>({}));

    const binding = new Binding(params);
    const boundElement: Ref<DrawableElement> = ref<any>({});
    const transform: Ref<ITransform | null> = ref(null);
    watchEffect(() => {
      boundElement.value = binding.getBoundElement(props.element);
      if (boundElement.value.transform) {
        transform.value = createTransform(boundElement.value.transform);
      }     
    });


    
    return {
      boundElement,
      transform,
    };
  },
  render() {
    const e = this.boundElement;

    const attrs = {
      ...getLayout(e),
      
    };
    if (this.transform) {
      attrs.transform = this.transform.toCSSValue();
    }
  
    switch (e.kind) {
      case "group":
        return <Group style={attrs} element={e} />;
      case "sprite":
        return <Sprite style={attrs} element={e} />;
      case "text":
        return <Text style={attrs} element={e} />;
      case "graphics":
        return <Graphics style={attrs} element={e} />;
      default:
        return <></>;
      }
  }
});