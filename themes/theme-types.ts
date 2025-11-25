export interface ColorPalette {
  background: string;
  foreground: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  function: string;
  type: string;
  operator: string;
  error: string;
  warning: string;
  info: string;
  regex: string;
  special: string;
  identifier: string;
  selection: string;
  lineHighlight: string;
  lineNumber: string;
  braceHighlight: string;
  braceError: string;
  indentGuide: string;
  fold: string;
  url: string;
  whitespace: string;
  smartHighlight: string;
  activeTab: string;
  yellow: string;
  green: string;
  orange: string;
  purple: string;
}

export interface ThemeDefinition {
  name: string;
  colors: ColorPalette;
  fontName?: string;
  fontSize?: string;
}
