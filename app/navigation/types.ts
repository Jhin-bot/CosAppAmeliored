// Type definitions for navigation components

export type AppTheme = {
  colors: {
    primary: string;
    onPrimary: string;
    surface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    onSurface: string;
    outline: string;
    error: string;
    onError: string;
    background: string;
  };
};

export interface HeaderTitleProps<T = AppTheme> {
  theme: T;
  options: {
    title?: string;
  };
  route: {
    name: string;
  };
}

export interface TabBarIconProps {
  focused: boolean;
  name: string;
  label: string;
}

export interface ScreenOptionsProps {
  route: {
    name: string;
  };
  options: {
    title?: string;
  };
}
