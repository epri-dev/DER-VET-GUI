export interface Condition {
  field: string;
  condition: (x: any) => boolean;
}

export interface ValueCondition {
  field: string;
  condition: (x: any) => number;
}
