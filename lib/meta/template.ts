import { Dictionary } from "@lovekicher/iterable-chain";
import { DrawableElement, DrawableElementBase, DrawableElementInit } from "./element";
import { TemplateResource } from "./resource";
import { FieldMeta } from "field-metadata";

export interface TemplateMeta<T extends {}> {
  fields: {
    [P in keyof T]: FieldMeta;
  };
  tags: string[];
}

export interface TemplatePreset<T> {
  name: string;
  defaults: T;
}


export interface CanvasTemplate<T extends {}, C extends {} = Dictionary<any>> {
  key: string;
  name: string;
  description?: string;
  previewImage?: string;
  elements: DrawableElementInit[];
  meta: TemplateMeta<T>;
  presets: TemplatePreset<T>[];
  resources?: TemplateResource;
  config?: C;
}