### [Notepad++](https://notepad-plus-plus.org/)

#### Install using Git

If you are a Git user, you can install the themes and keep up to date by cloning the repo:

```bash
git clone https://github.com/dracula/notepad-plus-plus.git
```

After cloning, the built theme files live under `generated/` in the repository (`generated/Dracula.xml` and `generated/Alucard.xml`). Copy the file you want from there into your Notepad++ `themes` folder (see **Activating theme** below). To build or refresh the XML locally from source, follow [build.md](./build.md).

Or download the theme file you want:

- **Dracula theme** (dark): [Download Dracula.xml](https://raw.githubusercontent.com/dracula/notepad-plus-plus/main/generated/Dracula.xml)
- **Alucard theme** (light): [Download Alucard.xml](https://raw.githubusercontent.com/dracula/notepad-plus-plus/main/generated/Alucard.xml)

Right-click the link and select "Save link as..." or "Save target as..." to download the file. These URLs track the `main` branch; if an older guide points at `master` or a `Dracula.xml` at the repository root, use the links above instead.

#### Activating theme

1. Open File Explorer and navigate to your Notepad++ themes folder:
   - Press `Win + R`, type `%AppData%\Notepad++\themes` and press Enter
   - Or manually go to: `C:\Users\YourUsername\AppData\Roaming\Notepad++\themes`
   - If you have a portable installation, go to your Notepad++ folder and open the `themes` folder

2. Copy the downloaded theme file (`Dracula.xml` or `Alucard.xml`) into this themes folder

3. Restart Notepad++

4. Go to `Settings > Style Configurator > Theme` and select your theme from the dropdown menu, then click "Save & Close". 💜

If the editor still looks like the default black-and-white scheme, confirm the theme is selected in that dropdown (not **Default**) and that you restarted Notepad++ after copying the file.

#### Troubleshooting tab colors (active/inactive tabs)

If tab text or tab backgrounds do not match the theme (for example, unreadable active/inactive tab contrast), check these Notepad++ settings:

1. `Settings > Preferences > General`
   - Enable inactive tab colorization, otherwise inactive tabs can keep default background colors.
2. `Settings > Preferences > Dark Mode`
   - Newer Notepad++ builds can use dedicated dark-mode tab colors instead of theme tab colors.
3. Advanced config (`config.xml`)
   - If needed, enable `darkTabUseTheme` (and `lightTabUseTheme` for light mode) so tab backgrounds follow theme colors.

Notepad++ can prioritize dark-mode defaults over theme tab colors depending on configuration, so this behavior is not always caused by a broken theme XML file.

#### Language and file extensions

- **`.cfg` files:** This theme styles them under the **ini file** lexer (same as `.ini`). If a `.cfg` file opens as plain text, use **Language → I → ini file** (or **Language → Define your language…** / **Settings → Style Configurator** to associate the extension with **ini file**).
- **VHDL:** Use **Language → H → VHDL** after installing the theme; the lexer is included in the generated XML.
