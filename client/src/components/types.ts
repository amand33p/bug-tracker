import { SvgIconProps } from '@material-ui/core';

export interface NormalButtonType {
  type: 'normal';
  text?: string;
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium' | 'large';
  style?: { [name: string]: string } | { [name: string]: number };
  variant?: 'outlined' | 'contained' | 'text';
  className?: string;
  color?: 'primary' | 'secondary' | 'inherit';
}

export interface RoundIconButtonType {
  type: 'round';
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium' | 'large';
  style?: { [name: string]: string } | { [name: string]: number };
  variant?: 'outlined' | 'contained' | 'text';
  color?: 'primary' | 'secondary' | 'inherit';
}

export interface IconButtonType {
  type: 'icon';
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium';
  style?: { [name: string]: string } | { [name: string]: number };
  iconSize?: 'small' | 'default' | 'large';
  className?: string;
  color?: 'primary' | 'secondary' | 'inherit';
}

export interface MenuItemButtonType {
  type: 'menu';
  text: string;
  icon: (props: SvgIconProps) => JSX.Element;
  closeMenu: () => void;
  iconStyle?: { [name: string]: string } | { [name: string]: number };
  className?: string;
}

export interface FabButtonType {
  type: 'fab';
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium' | 'large';
  variant?: 'extended' | 'round';
  text?: string;
  color?: 'primary' | 'secondary' | 'inherit';
}

export type TriggerButtonTypes =
  | NormalButtonType
  | RoundIconButtonType
  | IconButtonType
  | MenuItemButtonType
  | FabButtonType;
