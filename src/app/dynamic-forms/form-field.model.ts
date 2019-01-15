export interface LabelValue<K, V> {
  label: K;
  value: V;
}

export enum FieldTypes {
  minMax = 'minMax',
  number = 'number',
  text = 'text',
  select = 'select'
}

export class Field {
  label: string;
  key: string;
  type: FieldTypes | string;
  validators?: any;
  options?: LabelValue<string, any>[];
}
