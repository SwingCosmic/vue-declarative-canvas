import { getNestedProperty } from "../types/base";
import { Dictionary } from "@lovekicher/iterable-chain";
import { DrawableElementInit, DrawableElement } from "../meta/element";
import _ from "lodash";
import { NamedParamRef, ParamRef, isParamRef } from "./ParamRef";
import { Ref } from "vue";
import { ParamComputed, isParamComputed } from "./ParamComputed";
import { createExpression } from "./expression";
import { StringTemplate, isStringTemplate } from "./StringTemplate";

const specialProps =  ["kind", "children"];

class BindingContext {
  readonly paths: string[] = [];

  getPropertyPath() {
    return this.paths.join("->");
  }
}

export class BindingError extends Error {
  path: string;
  constructor(message: string, path: string, cause?: any) {
    super(message + "\nPath: " + path, { cause });
    this.path = path;
  }
}


export default class Binding {

  readonly params: Ref<Dictionary<any>>;

  constructor(params: Ref<Dictionary<any>>) {
    this.params = params;
  }

  private getParamRefValue(value: ParamRef<any>, ctx: BindingContext): any {
    try {
      return getNestedProperty(value["@ref"], this.params.value);
    } catch (error) {
      throw new BindingError("无效的属性路径", ctx.getPropertyPath(), error);
    }
  }

  private getParamComputedValue(value: ParamComputed<any>, ctx: BindingContext): any {
    try {
      ctx.paths.push("<Computed>");

      const args = this.getArgs(value["@refs"], ctx);
      const expr = createExpression<any>(args, value["@expr"], ctx.getPropertyPath());
      value = expr();
  
      ctx.paths.pop();
    } catch (error: any) {
      console.error("计算引用错误：" + error.message, error);
    }
    return value;
  }

  private getStringTemplateValue(value: StringTemplate, ctx: BindingContext): string {
    let v: string = value as any;
    try {
      ctx.paths.push("<String>");

      const args = this.getArgs(value["@refs"], ctx);
      v = _.template(value["@str"])(args);
  
      ctx.paths.pop();
    } catch (error: any) {
      console.error("字符串模板引用错误：" + error.message, error);
    }
    return v;
  }

  private getArgs(refs: NamedParamRef[], ctx: BindingContext) {
    return refs.reduce<Dictionary<any>>((a, v) => {
      ctx.paths.push(v["@name"]);
      a[v["@name"]] = this.getParamRefValue(v, ctx);
      ctx.paths.pop();
      return a;
    }, {});
  }

  private getBoundValue<T = any>(value: any, ctx: BindingContext): T {
    let v: any = value;
    if (isParamRef(value)) {
      v = this.getParamRefValue(value, ctx);
    } else if (isParamComputed(value)) {
      v = this.getParamComputedValue(value, ctx);
    } else if (isStringTemplate(value)) {
      v = this.getStringTemplateValue(value, ctx);
    } else if (Array.isArray(value)) {
      v = value.map((c, i) => {
        ctx.paths.push(`[${i}]`);
        const child = this.getBoundValue(c, ctx);
        ctx.paths.pop();
        return child;
      });
    } else if (typeof value === "object" && value != null) {
      v = Object.fromEntries(
        Object.entries(value)
          .map(p => {
            ctx.paths.push(p[0]);
            p[1] = this.getBoundValue(p[1], ctx);
            ctx.paths.pop();
            return p;
          }
        )
      );
    }
    return v;
  }

  getBoundElement(e: DrawableElementInit): DrawableElement {
    const ctx = new BindingContext();

    const attrs: Dictionary<any> = _.pick(e, specialProps);
    const config: Dictionary<any> = _.omit(e, specialProps);
    for (const [key, value] of Object.entries(config)) {
      ctx.paths.push(key);
      attrs[key] = this.getBoundValue(value, ctx);
      ctx.paths.pop();
    }
    return attrs as any;
  }
}
