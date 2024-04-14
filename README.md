# vue-declarative-canvas

基于Vue的声明式绘图渲染，可用于动态生成logo、图标、表情包等

> ⚠️ 由于`vue@>=3.4`对`watchEffect`的破坏性改动，升级依赖将会导致组件不能工作

> ⚠️ 本项目还在早期开发中，API可能会频繁发生变动且不进行通知，请开发时以最新代码为准

## 特性

*  采用声明式的配置对象描述渲染过程，将绘图从冗长的坐标计算中解放出来，所见即所得

   * 使用类似SVG的元素对象层次描述，简单直观
   * 强大的绑定系统，支持参数引用、表达式计算和字符串模板，满足多种动态处理
      * 表达式兼容`JavaScript`语法（甚至写`TypeScipt`也是可以的），经过语法安全检查和`Babel`编译，会在一个沙箱环境内执行
   * 支持HTML+SVG渲染器和Canvas(pixi.js)渲染器，也可以根据配置实现其它的渲染器

* 强类型的绘图模板，提供丰富的自描述元数据信息，满足编辑参数需要
   * 绘图参数元数据描述：拥有极其严格的类型检查和参数描述，能够直接根据元数据生成编辑参数的表单组件
   * 模板可以提供预设(presets)，通过切换预设可以让用户快速配出多种变体，便于调整修改
   * 资源定义：描述自己用到了什么外部资源（如图片、字体等），如果要更换自己的资源加载机制也很容易

## 开始使用

> ⚠️ 运行Binding需要`new Function()`等动态代码执行要求，在部分禁用动态代码的小程序中可能无法使用

目前只实现了`HtmlRender`。

```html
<template>
   <HtmlRender ref="render"
      v-model:params="params"
      :template="template" 
      :preset="preset">

   </HtmlRender>
</template>

<script setup lang="ts">
import { HtmlRender, CanvasTemplate, RenderInstance } from 'vue-declarative-canvas';
import 'vue-declarative-canvas/dist/style.css';

interface Params {
   // 你自己的参数类型
}

// 如果将默认预设设为空，就会自动选择第一个预设
const preset = ref("");
const params = ref<Params>({});
const template = ref<CanvasTemplate<Params>>({
   // 编写模板
});

const render = shallowRef<RenderInstance>(null!);


async function exportImage() {
   const file = await render.value.exportToImage({
      imageFormat: "image/png"
   });
   // 下载文件或者展示在img上
}
</script>

```

## 模板元素

模板元素是构成模板的基本组成部分，用于绘制图形内容，或者提供布局，或者执行数据转换逻辑。

### 布局元素

* Group: 分组容器，用于包含其他元素，也可以用于排列子元素，相当于SVG的`g`但支持flex布局

### 内容元素
* Text: 渲染文本元素
* Sprite: 渲染图片，图片可以从大的图像文件中进行切割
* Graphics: 2D几何元素，用于绘制矢量图形
   * Shape: 每个Graphics都包含了一个几何图形的定义，包括Line, Ellipse，Polygon等，也可以使用类似SVG `path`元素的方式定义复杂图形

### 重要的概念和类型

1. 变换
每个元素都拥有`transform`属性，可以为元素及其子元素提供2D和3D变换

提供Skew、Translate、Scale3D、Rotate3D、Perspective等封装的基本变换，也可以使用上述变换的组合，或者直接使用MatrixTransform提供3x2或者4x4变换矩阵

可以使用多种格式初始化transform属性的值，便于进行绑定

导出图片时会自动计算画布边界，超出可视区域的部分也会被处理。大量使用变换使元素变形并超出容器（特别是在-x轴方向超出），可能会造成画布裁剪错误，或者带来性能问题。

2. 带单位数值
不少属性的类型是`NumberOrUnitValue<U>`，即可以是数值，或者后跟CSS单位的字符串。此类属性可通过不同的单位提供不同方式的数值，实现和CSS类似的便捷数值计算。

对于数值来说，单位采用的是该类物理量的默认单位。例如长度的单位默认为`px`，角度的单位默认为`deg`，等等。

部分属性只能使用该物理量可用单位的一部分子集，会在泛型参数`U`上指定。一些只能使用一种单位的属性，会直接将类型指定为number简化操作。


## 绑定

绑定用于将参数值动态加入到渲染中，例如把Text的文字绑到到用户输入的字符串。

模板元素的所有属性（包含对象的嵌套属性和数组元素）均可以使用绑定。
在编写模板时提供了TypeScript类型解析，可以同时使用原始类型和各种绑定类型而不报错（目前暂不支持嵌套对象的类型检查）

所有的绑定均为对象，并且采用以`@`开头的特殊属性名区分

绑定目前有以下几种：

### 参数引用

最简单的绑定，直接将参数中的某个属性绑定到当前元素的某个属性
* @ref: 要绑定的参数的路径，对于嵌套对象，中间的每一层使用`.`分隔属性，如果为数组直接使用数字，如`positions.0.x`

### 字符串模板

将多个参数绑定到一个字符串模板中进行拼接
* @refs: 要绑定的参数列表，每个参数有以下属性：
   * @name: 参数名称，必须以`$`开头
   * @ref: 参数引用路径
* @str: 要拼接的字符串，使用js字符串插值语法`${$paramName}`来插入上面定义的参数`$paramName`

### 表达式
直接计算参数返回一个值

* @refs: 同字符串模板
* @expr: 合法的TypeScript表达式，使用上面的参数算出一个值

可以使用ESNext的最新语法，但不会对运行时对象提供任何补丁。
例如当前版本支持`using`变量声明，但访问`Symbol.dispose`可能得到的依然是`undefined`

表达式有严格的限制，例如必须是无副作用的，不能使用任何形式的赋值表达式，不能写变量、类和函数声明

表达式在全局作用域求值，可以使用部分JS全局对象如`Math`，不过`window`、`self`、`globalThis`之类的都是不能使用的，也不存在`this`。

由于绘图可能发生在nodejs环境(如nw.js)或者web环境，访问DOM API、浏览器API和nodejs API将会带来未定义的行为，请尽量避免此类使用方式

表达式只能写一条语句，如果计算复杂需要多行语句，可以编写箭头函数表达式，最后返回计算结果，例：

```typescript
() => {
   const points: [number, number][] = $points;
   const line = points
      .map(p => p[0] + "," + p[1])
      .join(" ");
   return `M0,0 L${line} Z`;
};
```
