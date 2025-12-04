### [Notepad++](https://notepad-plus-plus.org/)

#### Syntax Highlighting
##### Install using Git

If you are a Git user, you can install the themes and keep up to date by cloning the repo:

```bash
git clone https://github.com/dracula/notepad-plus-plus.git
```

Or download the theme file you want:

- **Dracula theme** (dark): [Download Dracula.xml](https://raw.githubusercontent.com/dracula/notepad-plus-plus/main/generated/Dracula.xml)
- **Alucard theme** (light): [Download Alucard.xml](https://raw.githubusercontent.com/dracula/notepad-plus-plus/main/generated/Alucard.xml)

Right-click the link and select "Save link as..." or "Save target as..." to download the file.

##### Activating theme

1. Open File Explorer and navigate to your Notepad++ themes folder:

   - Press `Win + R`, type `%AppData%\Notepad++\themes` and press Enter
   - Or manually go to: `C:\Users\YourUsername\AppData\Roaming\Notepad++\themes`
   - If you have a portable installation, go to your Notepad++ folder and open the `themes` folder

2. Copy the downloaded theme file (`Dracula.xml` or `Alucard.xml`) into this themes folder

3. Restart Notepad++

4. Go to `Settings > Style Configurator > Theme` and select your theme from the dropdown menu, then click "Save & Close". 💜


#### UI Themeing

Notepad++ can only partially theme its UI; Windows still controls elements like menus and scrollbars.

To apply the UI theme:

- Edit `%AppData%\Notepad++\config.xml`.
- Replace the existing `<GUIConfig name="DarkMode" ...>` line with the snippet shown below.
- Restart Notepad++ to apply the change.

Notes:

- Older Notepad++ versions may remove unknown properties — re-add the line after updating if needed.
- Dark mode must be enabled for both Dracula and Alucard.

Warning: Do not edit `config.xml` from inside Notepad++ — the app will overwrite external edits when it exits.

<details>
<summary>Alucard</summary>
```xml
<GUIConfig name="DarkMode" enable="yes" colorTone="32" customColorTop="26317238" customColorMenuHotTrack="12411129" customColorActive="44739226" customColorMain="26317238" customColorError="13340842" customColorText="16316626" customColorDarkText="12411129" customColorDisabledText="10129918" customColorLinkText="9150323" customColorEdge="44739226" customColorHotEdge="12411129" customColorDisabledEdge="11250623" enableWindowsMode="no" darkThemeName="Alucard.xml" darkToolBarIconSet="2" darkTbFluentColor="7" darkTbFluentCustomColor="12411129" darkTbFluentMono="no" darkTabIconSet="1" darkTabUseTheme="yes" lightThemeName="Alucard.xml" lightToolBarIconSet="2" lightTbFluentColor="7" lightTbFluentCustomColor="12411129" lightTbFluentMono="no" lightTabIconSet="1" lightTabUseTheme="yes" />
```
</details>

<details>
<summary>Dracula</summary>
```xml
<GUIConfig name="DarkMode" enable="yes" colorTone="32" customColorTop="16775275" customColorMenuHotTrack="6573897" customColorActive="7105227" customColorMain="16775275" customColorError="13340842" customColorText="2039583" customColorDarkText="7105227" customColorDisabledText="13619166" customColorLinkText="224022" customColorEdge="7105227" customColorHotEdge="10617517" customColorDisabledEdge="8676629" enableWindowsMode="no" darkThemeName="Dracula.xml" darkToolBarIconSet="2" darkTbFluentColor="7" darkTbFluentCustomColor="6573897" darkTbFluentMono="no" darkTabIconSet="1" darkTabUseTheme="yes" lightThemeName="Dracula.xml" lightToolBarIconSet="2" lightTbFluentColor="7" lightTbFluentCustomColor="6573897" lightTbFluentMono="no" lightTabIconSet="1" lightTabUseTheme="yes" />
```
</details>

##### Activating theme
Relaunch Notepad++ and it should be automatically activated. 💜
