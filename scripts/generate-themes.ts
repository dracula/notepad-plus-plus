import * as fs from "node:fs";
import * as path from "node:path";
import { alucardTheme } from "../themes/alucard";
import { draculaTheme } from "../themes/dracula";
import {
  type GlobalStyleDef,
  globalStylesTemplate,
  type LexerDef,
  lexerTemplate,
  type StyleDef,
} from "../themes/template";
import type { ThemeDefinition } from "../themes/theme-types";

/**
 * Computes Notepad++ `colorStyle` for a lexer `WordsStyle` row.
 *
 * @returns `0` or `1`. An explicit `style.colorStyle` always wins; otherwise `DEFAULT`
 *          uses `0` and all other style names use `1`.
 */
const resolveWordsStyleColorStyle = (style: StyleDef): number =>
  style.colorStyle ?? (style.name === "DEFAULT" ? 0 : 1);

/**
 * Serializes lexer definitions to the `<LexerStyles>` XML fragment.
 *
 * Writes `fgColor` / `bgColor` from the theme palette. Leaves `fontName` and `fontSize`
 * empty so the user’s Notepad++ font choice is unchanged.
 *
 * @param lexers — source tree (normally `lexerTemplate`)
 * @param theme — palette and display name
 * @returns Indented XML string including opening and closing `<LexerStyles>` tags
 */
const generateLexerStyles = (lexers: LexerDef[], theme: ThemeDefinition): string => {
  let output = "    <LexerStyles>\n";

  for (const lexer of lexers) {
    output += `        <LexerType name="${lexer.name}" desc="${lexer.desc}" ext="${lexer.ext}">\n`;

    for (const style of lexer.styles) {
      let line = `            <WordsStyle name="${style.name}" styleID="${style.styleID}"`;

      if (style.fgColorKey) {
        line += ` fgColor="${theme.colors[style.fgColorKey]}"`;
      }
      if (style.bgColorKey) {
        line += ` bgColor="${theme.colors[style.bgColorKey]}"`;
      }

      line += ` fontName="" fontStyle="${style.fontStyle}" fontSize=""`;

      line += ` colorStyle="${resolveWordsStyleColorStyle(style)}"`;

      if (style.keywordClass) {
        line += ` keywordClass="${style.keywordClass}"`;
      }

      if (style.customText) {
        line += `>${style.customText}</WordsStyle>\n`;
      } else {
        line += ` />\n`;
      }

      output += line;
    }

    output += `        </LexerType>\n`;
  }

  output += "    </LexerStyles>\n";
  return output;
};

/**
 * Serializes global UI styles to the `<GlobalStyles>` XML fragment.
 *
 * Same empty `fontName` / `fontSize` convention as lexer word styles above.
 *
 * @param globalStyles — source list (normally `globalStylesTemplate`)
 * @param theme — palette used for optional fg/bg on each row
 * @returns Indented XML string including opening and closing `<GlobalStyles>` tags
 */
const generateGlobalStyles = (globalStyles: GlobalStyleDef[], theme: ThemeDefinition): string => {
  let output = "    <GlobalStyles>\n";

  for (const style of globalStyles) {
    let line = `        <WidgetStyle name="${style.name}" styleID="${style.styleID}"`;

    if (style.fgColorKey) {
      line += ` fgColor="${theme.colors[style.fgColorKey]}"`;
    }
    if (style.bgColorKey) {
      line += ` bgColor="${theme.colors[style.bgColorKey]}"`;
    }

    line += ` fontName=""`;

    if (style.fontStyle !== undefined) {
      line += ` fontStyle="${style.fontStyle}"`;
    }

    line += ` fontSize=""`;

    line += `></WidgetStyle>\n`;
    output += line;
  }

  output += "    </GlobalStyles>\n";
  return output;
};

/**
 * XML declaration, `<NotepadPlus>` opener, and comment blocks (title, author, date, license).
 *
 * The date is generated at build time; everything else follows the upstream theme blurb.
 *
 * @param theme — used to pick display name and light/dark wording
 */
const getThemeComments = (theme: ThemeDefinition): string => {
  const themeName = theme.name === "Dracula" ? "Dracula" : "Alucard";
  const variant = theme.name === "Dracula" ? "dark" : "light";

  return `<?xml version="1.0" encoding="UTF-8" ?>

<NotepadPlus>
<!--
		${themeName}
		A ${variant} theme style based on the Dracula Theme color palette.

		Theme by Dracula Theme (draculatheme.com)
-->

<!--
  Style name:   	${themeName}
  Author:       	Dracula Theme
  Date:         	${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
  License:      	MIT (https://choosealicense.com/licenses/mit/)
  Description:  	A ${variant} theme style based on the Dracula Theme color palette
  Languages:    	Should work with all languages without issue but hasn't been tested on absolutely every one of them.
-->
`;
};

/**
 * Assembles a complete `.xml` document: header comments, lexer styles, global styles, footer.
 *
 * @param theme — colors and naming for this variant
 */
const generateXML = (theme: ThemeDefinition): string => {
  const header = getThemeComments(theme);
  const lexerStyles = generateLexerStyles(lexerTemplate, theme);
  const globalStyles = generateGlobalStyles(globalStylesTemplate, theme);
  const footer = `</NotepadPlus>`;

  return header + lexerStyles + globalStyles + footer;
};

/**
 * CLI entry (`npm run build` / `ts-node scripts/generate-themes.ts`).
 *
 * Ensures `generated/` exists, then writes each theme by merging `lexerTemplate` and
 * `globalStylesTemplate` with that theme’s `colors` map.
 */
const main = () => {
  const rootDir = path.join(__dirname, "..");
  const outputDir = path.join(rootDir, "generated");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const themes: Array<{ theme: ThemeDefinition; filename: string }> = [
    { theme: draculaTheme, filename: "Dracula.xml" },
    { theme: alucardTheme, filename: "Alucard.xml" },
  ];

  for (const { theme, filename } of themes) {
    const xml = generateXML(theme);
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, xml, "utf-8");
    console.log(`✓ Generated ${filename}`);
  }

  console.log(`\n✨ All themes generated successfully in ${outputDir}/`);
};

if (require.main === module) {
  main();
}
