import { CSSProperties, Ref, ref, defineComponent, inject, PropType, watchEffect } from "vue";
import { DrawableElement, DrawableElementInit } from "../../meta/element";
import Binding from "../../binding/Binding";
import { getTransform } from "./util";
import { Dictionary } from "field-metadata/lib/types/base";

import { Group } from "./elements/Group";
import { Text } from "./elements/Text";
import { Sprite } from "./elements/Sprite";
import { Graphics } from "./elements/Graphics";


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
    watchEffect(() => {
      boundElement.value = binding.getBoundElement(props.element);
    });


    
    return {
      boundElement
    };
  },
  render() {
    const e = this.boundElement;

    const attrs = {
      ...getTransform(e),
    };
  
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