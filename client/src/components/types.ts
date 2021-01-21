import { SvgIconProps } from '@material-ui/core';

interface NormalButtonType {
  type: 'normal';
  text: string;
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium' | 'large';
  style?: { [name: string]: string } | { [name: string]: number };
  variant?: 'outlined' | 'contained' | 'text';
}

interface IconButtonType {
  type: 'icon';
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium';
  iconSize?: 'small' | 'default' | 'large';
}

interface MenuItemButtonType {
  type: 'menu';
  text: string;
  icon: (props: SvgIconProps) => JSX.Element;
}

interface FabButtonType {
  type: 'fab';
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium' | 'large';
  variant?: 'extended' | 'round';
  text?: string;
}

export type TriggerButtonTypes =
  | NormalButtonType
  | IconButtonType
  | MenuItemButtonType
  | FabButtonType;
