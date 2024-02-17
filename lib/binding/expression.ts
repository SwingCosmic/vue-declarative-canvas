import * as Babel from "@babel/standalone";
import * as t from "@babel/types";
import _ from "lodash";
import type { NodePath, PluginObj } from "@babel/core";
import { Dictionary } from "@lovekicher/iterable-chain";

const CONTEXT_VARIABLE = "__ctx__";

export function ExpressionBuilderPlugin(): PluginObj {
  return {
    name: "ExpressionBuilderPlugin",
    visitor: {
      Program(path0, state: any) {
        const path = path0 as NodePath<t.Program>;
        const body = path.node.body;

        if (body.length == 0) {
          throw new SyntaxError("表达式不能为空");
        }
        if (body.length > 1) {
          throw new Error("表达式只允许包含一条语句");
        }
        const es = body[0];
        if (es.type != "ExpressionStatement") {
          throw new Error("语句不是表达式");
        }
        let expr = es.expression;
        if (expr.type == "AssignmentExpression") {
          throw new Error("表达式不能包含赋值语句");
        } 
        
        if (expr.type == "FunctionExpression" || expr.type == "ArrowFunctionExpression") {
          if (expr.params.length > 0) {
            throw new Error("函数表达式不能包含参数");
          }
          
          expr = t.callExpression(
            expr,
            []
          );
        } 
        path.node.body = [
          t.expressionStatement(
            t.assignmentExpression(
              "=",
              t.memberExpression(
                t.identifier("exports"),
                t.identifier("default")
              ),
              expr
            )              
          )
        ];         
      },
      Identifier(path, state: any) {
        const parent: any = path.parent;

        let refs: string[] = state.opts?.refs;
        if (!refs) {
          refs = [];
          if (state.opts) {
            state.opts.refs = refs;
          }
        }

        // 忽略直接访问FORM_VARIABLE
        if (path.node.name == CONTEXT_VARIABLE) {
          return;
        }
        // 忽略不是以$开头的变量
        if (!path.node.name.startsWith("$")) {
          return;
        }
        // 忽略obj.prop中的prop，但不忽略obj[field]中的field
        if (t.isMemberExpression(parent) && path.key == "property" && !parent.computed) {
          return;
        }
        // 忽略sum(arg)中的sum
        if (t.isCallExpression(parent) && path.key == "callee") {
          return;
        }

        const newNode = t.memberExpression(
          t.identifier(CONTEXT_VARIABLE),
          t.identifier(path.node.name)
        );

        refs.push(path.node.name);

        if (path.listKey) {
          parent[path.listKey][path.key!] = newNode;
        } else {
          parent[path.key!] = newNode;
        }
      }
    }
  }
}

  
export function createExpression<T>(
  ctx: Dictionary<any>, expr: string, 
  fileName: string,
  out: { refs: string[] } = { refs: [] }
): () => T {

  let _code = "";
  try {
    const ctx = {
      refs: [] as string[]
    };
    const compileResult = Babel.transform(expr, {
      filename: `${fileName}.g.ts`,
      presets: [
        [
          Babel.availablePresets["env"], {
            useBuiltIns: false
          }
        ],
        [
          Babel.availablePresets["typescript"], {}
        ],
      ],
      plugins: [
        [
          ExpressionBuilderPlugin, ctx
        ]
      ]
    });

    _code = compileResult.code!
    out.refs = ctx.refs;
  }
  catch (error: any) {
    throw new Error("表达式编译失败：" + error.message);
  }

  const _exports = { default: undefined! as T };
  const f = new Function("__ctx__", "exports", _code);
  return () => {
    f(ctx, _exports);
    return _exports.default;
  };
}