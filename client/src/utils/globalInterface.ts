export type DynamicObject = {
  [key: string]: string | number | boolean | object | DynamicObject | DynamicObject[];
}