<template>
  <div class="container">
    <div class="flex gap">
      <div>Template: {{ template.name }}</div>
      <div>Preset: </div>
      <select v-model="preset">
        <option v-for="p in template.presets" :key="p.name"
          :value="p.name">
          {{ p.name }}
        </option>
      </select>
    </div>

    <div class="wrapper">
      <HtmlRender
        v-model:params="params"
        :template="template" 
        :preset="preset">
      </HtmlRender>
    </div>

    <div class="flex gap wrap">
      <div v-for="(f, key) in template.meta.fields" :key="key"
        style="margin-right: 16px;">
        <label class="flex gap">
          <div>{{ f.name }}</div>

          <input type="number" v-if="f.type == 'number'" v-model.number="params[f.field]" />
          <input type="color" v-else-if="f.type == 'color'" v-model="params[f.field]" />
          <input v-else v-model="params[f.field]" />            
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HtmlRender from '../lib/render/html/HtmlRender';

import { CanvasTemplate } from '../lib/meta/template';
import { ref } from 'vue';

interface Params {
  radiusX: number;
  radiusY: number;
  text: string;
  background: string;
  textColor: string;
}

// 如果将默认预设设为空，就会自动选择第一个预设
const preset = ref("");
const params = ref({
  radiusX: 160,
  radiusY: 90,
  background: "#0040ff",
  textColor: "#eeeeee",
  text: "Text Inside"
});
const template = ref<CanvasTemplate<Params>>({
  key: "test",
  name: "测试模板",
  meta: {
    fields: {
      radiusX: {
        field: "radiusX",
        name: "Ellipse Radius X",
        type: "number"
      },
      radiusY: {
        field: "radiusY",
        name: "Ellipse Radius Y",
        type: "number"
      },
      text: {
        field: "text",
        name: "Text",
        type: "string"
      },
      background: {
        field: "background",
        name: "Background Color",
        type: "color"
      },
      textColor: {
        field: "textColor",
        name: "Text Color",
        type: "color"
      },
    },
    tags: []
  },
  presets: [
    {
      name: "default",
      defaults: {
        radiusX: 160,
        radiusY: 90,
        background: "#0040ff",
        textColor: "#eeeeee",
        text: "Text Inside"
      }
    }
  ],
  elements: [
    {
      kind: "group",
      containerMode: "flex",
      justify: "center",
      align: "center",
      children: [
        {
          kind: "graphics",
          layoutMode: "absolute",
          shape: {
            kind: "ellipse",
            center: {
              x: { "@ref": "radiusX" } as any,
              y: { "@ref": "radiusY" } as any,
            },
            radiusX: { "@ref": "radiusX" } as any,
            radiusY: { "@ref": "radiusY" } as any,
          },
          // path: {
          //   "@refs": [
          //     { 
          //       "@name": "$rx",
          //       "@ref": "radiusX" 
          //     },
          //     { 
          //       "@name": "$ry",
          //       "@ref": "radiusY" 
          //     },
          //   ],
          //   "@str": "M0,${$ry} "+
          //     "a${$rx},${$ry} 0 1 0 ${$rx * 2},0 " +
          //     "a${$rx},${$ry} 0 1 0 ${-$rx * 2},0 "
          // },
          width: {
            "@refs": [
              { 
                "@name": "$rx",
                "@ref": "radiusX" 
              },
            ],
            "@expr": "$rx * 2"
          },
          height: {
            "@refs": [
              { 
                "@name": "$ry",
                "@ref": "radiusY" 
              },
            ],
            "@expr": "$ry * 2"
          },
          fill: { "@ref": "background" },
        },
        {
          kind: "text",
          fill: { "@ref": "textColor" },
          text: { "@ref": "text" },
          fontSize: 48,
          layoutMode: "relative",   
        },
      ]
    }
  ]


});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 12px;
  background: #eee;
}

.wrapper {
  height: 60vh;
}

.flex {
  display: flex;
}
.gap {
  gap: 8px;
}
.wrap {
  flex-wrap: wrap;
}
</style>