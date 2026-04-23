/**
 * Semantic color map for a Notepad++ theme.
 *
 * Each value is a six-digit hex string (no `0x` prefix), written to `fgColor` / `bgColor`
 * in the generated XML. Template data in `themes/template.ts` references these keys.
 */
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
  incrementalHighlight: string;
  activeTab: string;
  yellow: string;
  green: string;
  orange: string;
  purple: string;
  /**
   * Custom tab color slot 1 when Notepad++ uses dark window chrome.
   * Keep contrast low so labels stay readable on dark UI.
   */
  tabDarkMode1: string;
  /**
   * Custom tab color slot 2 when Notepad++ uses dark window chrome.
   * Pairs with `tabDarkMode1` for alternating or grouped tabs.
   */
  tabDarkMode2: string;
  /**
   * Background for matched XML/HTML tag pairs.
   * Intentionally subtle so normal selection remains obvious.
   */
  tagMatchHighlight: string;
  /**
   * Brackets, `/>`, `<?` / `?>`, unknown-tag prefixes, and related boundary tokens in XML/HTML.
   * Distinct from pink tag names so structure reads at a glance.
   */
  markupDelimiter: string;
  /** Markup attribute names (`name=`, `styleID=`). Often aligned with `url` on dark themes. */
  markupAttribute: string;
  /**
   * Background for the GlobalStyles “Tags attribute” highlight (paired tag / attribute chrome).
   */
  tagAttributeChrome: string;
}

/**
 * One installable theme: how it is labeled and which colors fill the template.
 *
 * `fontName` / `fontSize` are optional hints; the generator still emits empty font
 * attributes in XML so end users keep their own editor font.
 */
export interface ThemeDefinition {
  /** Shown in XML comments and used to pick light vs dark copy in the header. */
  name: string;
  colors: ColorPalette;
  /**
   * Suggested editor font (metadata only).
   * The generator still outputs empty `fontName` / `fontSize` on styles so user settings win.
   */
  fontName?: string;
  /** Companion to `fontName`; same XML behavior. */
  fontSize?: string;
}
