import { CSSProperties } from "vue";
import { DrawableElement } from "../../meta/element";
import { getUnitValue } from "@lib/math/UnitValue";
import { Vector2 } from "@lib/math";
// import html2canvas from "html2canvas";
import { domToBlob, Options } from "modern-screenshot";
import { ExportImageOption } from "@lib/index";

export function getLayout(e: DrawableElement) {
  let origin = e.origin;
  if (Array.isArray(origin)) {
    origin = origin.join(" ");
  }

  const attrs: CSSProperties = {
    left: getUnitValue(e.x),
    top: getUnitValue(e.y),
    transformOrigin: typeof origin === "object" ? Vector2.fromJSON(origin).toString() : origin,
    zIndex: e.zIndex,
  };

  let mode = e.layoutMode;
  attrs.position = mode  || "static";
  return attrs;
}


// export async function renderToImageBad(root: HTMLElement) {
//   const canvas = await html2canvas(root, {
//     width: root.clientWidth,
//     height: root.clientHeight,
//     backgroundColor: null,
//   });
//   return await new Promise<Blob>((s, e) => {
//     try {
//       canvas.toBlob(b => {
//         if (!b) {
//           return e(new Error("render failed"));
//         }
//         s(b);
//       });
//     } catch (error) {
//       e();
//     }  
//   })
// }

/**
 * 获取根元素内所有包含子元素的最大空间范围
 * @author ChatGPT
 * @param root 根元素
 */
function getMaxRect(root: HTMLElement) {
  // 获取所有子元素
  let children = Array.from(root.querySelectorAll("*")).filter((child) => {
    if (
      child.tagName.toLowerCase() == "style" ||
      child.tagName.toLowerCase() == "script"
    ) {
      return false;
    }
    return true;
  });

  // 初始化父元素范围
  let parentRect = root.getBoundingClientRect();
  let parentSpace = {
    top: parentRect.top,
    right: parentRect.right,
    bottom: parentRect.bottom,
    left: parentRect.left
  };

  // 遍历子元素，计算占据的空间
  children.forEach(child => {
    let childRect = child.getBoundingClientRect();
    parentSpace.top = Math.min(parentSpace.top, childRect.top);
    parentSpace.right = Math.max(parentSpace.right, childRect.right);
    parentSpace.bottom = Math.max(parentSpace.bottom, childRect.bottom);
    parentSpace.left = Math.min(parentSpace.left, childRect.left);
  });

  // 计算父元素范围内所有子元素占据的空间
  let parentWidth = parentSpace.right - parentSpace.left;
  let parentHeight = parentSpace.bottom - parentSpace.top;


  // 把相对window的偏移转换成相对父元素的偏移
  return new DOMRect(
    parentSpace.left - parentRect.left, 
    parentSpace.top - parentRect.top, 
    parentWidth, 
    parentHeight,
  );
}

export async function renderToImage(root: HTMLElement, option: ExportImageOption = {}) {
  let opt: Options = {};
  opt.backgroundColor = option.backgroundColor || "transparent";
  if (option.font) {
    opt.font = {
      cssText: option.font
    }
  }

  opt.type = option.imageFormat;

  if (!opt.width || !opt.height) {
    const rect = getMaxRect(root);
    opt.width = rect.width;
    opt.height = rect.height;

    // 抵消因为顶出父元素范围导致被裁剪的区域
    opt.style ||= {};
    opt.style.marginLeft = -rect.left + "px";
    opt.style.marginTop = -rect.top + "px";

    console.log(opt, rect)
  }
  

  return await domToBlob(root, opt);
}