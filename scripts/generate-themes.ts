import * as fs from "node:fs";
import * as path from "node:path";
import { alucardTheme } from "../themes/alucard";
import { draculaTheme } from "../themes/dracula";
import {
  type GlobalStyleDef,
  globalStylesTemplate,
  type LexerDef,
  lexerTemplate,
} from "../themes/template";
import type { ThemeDefinition } from "../themes/theme-types";

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

      // fontName and fontSize are left empty so users can set their own values
      line += ` fontName="" fontStyle="${style.fontStyle}"  fontSize=""`;

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
    
    // fontName and fontSize are left empty so users can set their own values
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

const generateXML = (theme: ThemeDefinition): string => {
  const header = getThemeComments(theme);
  const lexerStyles = generateLexerStyles(lexerTemplate, theme);
  const globalStyles = generateGlobalStyles(globalStylesTemplate, theme);
  const footer = `</NotepadPlus>`;

  return header + lexerStyles + globalStyles + footer;
};

const main = () => {
  const rootDir = path.join(__dirname, "..");
  const outputDir = path.join(rootDir, "generated");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate XML for each theme
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
