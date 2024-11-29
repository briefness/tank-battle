export declare type ActionKey = 'up' | 'left' | 'down' | 'right';

interface SizeProps {
  width: number;
  height: number;
}
export interface OptionProps {
  x?: number;
  y?: number;
  url: string;
  size: SizeProps,
  total: number;
  action: ActionKey;
  actions: Record<string, number | number[]>;
}

