# Building Themes

This project uses a TypeScript-based build system to generate Notepad++ theme XML files from structured theme definitions.

## Setup

1. Install dependencies:
```bash
npm install
```

## Generating Themes

To generate all theme XML files from the theme definitions:

```bash
npm run build
```

or

```bash
npm run generate
```

This will:
1. Use the TypeScript template (`themes/template.ts`) which defines all lexer structures
2. Apply color palettes from theme definitions (`themes/dracula.ts`, `themes/alucard.ts`)
3. Generate XML files in the `generated/` folder

**Note:** Only colors are applied - fonts and font sizes are not included in the generated files as per design requirements.

## How It Works

### Theme Definitions

Theme colors are defined in TypeScript files under `themes/`:
- `themes/dracula.ts` - Dracula dark theme
- `themes/alucard.ts` - Alucard light theme

Each theme defines a color palette with semantic names like `foreground`, `background`, `keyword`, `string`, etc.

### Color Mapping

The generator:
1. Parses `Dracula.xml` to extract the structure (all lexers and their styles)
2. Creates a mapping from hex colors in the source XML to semantic color keys
3. Applies each theme's color palette to generate new XML files

### Adding a New Theme

1. Create a new file in `themes/` (e.g., `themes/my-theme.ts`)
2. Export a theme definition following the same structure as `dracula.ts`
3. Add it to the themes array in `scripts/generate-themes.ts`
4. Run `npm run build`

### Modifying Colors

To change colors in a theme:
1. Edit the theme file in `themes/` (e.g., `themes/dracula.ts`)
2. Update the hex color values in the `colors` object
3. Run `npm run build` to regenerate the XML files

### Adding New Lexers or Styles

If Notepad++ adds new language lexers or styles:
1. Update `themes/template.ts` with the new lexer/style definitions
2. Run `npm run build` to regenerate all themes
3. The new lexers/styles will be included in all generated themes

## File Structure

```
.
├── themes/
│   ├── theme-types.ts      # TypeScript type definitions
│   ├── template.ts         # Template with all lexer/style structures
│   ├── dracula.ts          # Dracula theme colors
│   └── alucard.ts          # Alucard theme colors
├── scripts/
│   ├── generate-themes.ts  # Theme generator script
│   └── extract-template.ts # One-time script to extract template from XML
├── generated/
│   ├── Dracula.xml         # Generated Dracula theme
│   └── Alucard.xml         # Generated Alucard theme
├── package.json            # npm configuration
└── tsconfig.json           # TypeScript configuration
```

