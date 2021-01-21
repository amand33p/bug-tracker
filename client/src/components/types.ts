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

export type TriggerButtonTypes =
  | NormalButtonType
  | IconButtonType
  | MenuItemButtonType;
