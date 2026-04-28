
```json
          {
            "background": "#1E1E2E",
            "black": "#45475A",
            "blue": "#89B4FA",
            "brightBlack": "#585B70",
            "brightBlue": "#89B4FA",
            "brightCyan": "#94E2D5",
            "brightGreen": "#A6E3A1",
            "brightPurple": "#F5C2E7",
            "brightRed": "#F38BA8",
            "brightWhite": "#A6ADC8",
            "brightYellow": "#F9E2AF",
            "cursorColor": "#F5E0DC",
            "cyan": "#94E2D5",
            "foreground": "#CDD6F4",
            "green": "#A6E3A1",
            "name": "Catppuccin Mocha",
            "purple": "#F5C2E7",
            "red": "#F38BA8",
            "selectionBackground": "#585B70",
            "white": "#BAC2DE",
            "yellow": "#F9E2AF"
        }
```
Step 2: Replace the Profile Defaults
Find the "profiles": section, and directly underneath it, replace your entire existing "defaults": { ... } block with this improved one:

```json
"defaults": 
        {
            "colorScheme": "Catppuccin Mocha",
            "cursorShape": "bar",
            "experimental.retroTerminalEffect": false,
            "font": 
            {
                "builtinGlyphs": true,
                "cellHeight": "1.2",
                "colorGlyphs": true,
                "face": "JetBrainsMono Nerd Font",
                "size": 11,
                "weight": "medium"
            },
            "intenseTextStyle": "all",
            "opacity": 75,
            "padding": "16",
            "scrollbarState": "hidden",
            "useAcrylic": true
        },
```

Other with fonts

```bash
"defaults": 
        {
            "colorScheme": "Catppuccin Mocha",
            "cursorShape": "bar",
            "font": 
            {
                "face": "FiraCode Nerd Font",
                "size": 11,
                "weight": "medium",
                "features": {
                    "calt": 1,
                    "liga": 1
                }
            },
            "padding": "16",
            "scrollbarState": "hidden",
            "useAcrylic": true,
            "opacity": 75
        },
```

Step 2: Global UI Tweaks (Optional but Recommended)
For the most modern look, make sure these settings exist in the "root" of your JSON file (usually right near the top or bottom, outside of the profiles array). You can add them anywhere in the main block:

```json
    "centerOnLaunch": true,
    "tabWidthMode": "titleLength",
    "theme": "dark",
    "useAcrylicInTabRow": true,
    "windowingBehavior": "useExisting",
```

## Fonts

Step 1: Download the Font
Since you want ligatures, FiraCode Nerd Font is the gold standard.

Open your Windows web browser and go to the official Nerd Fonts download page: https://www.nerdfonts.com/font-downloads

Scroll down to FiraCode Nerd Font and click Download.

This will download a .zip file to your Windows Downloads folder.

Step 2: The "No Admin" Installation
Extract the downloaded .zip file. You will see a bunch of .ttf (TrueType Font) files inside.

Select all the .ttf files (or just the "Regular", "Bold", and "Italic" ones if you want to keep it simple).

Right-click the selected files.

Click Install (If you are on Windows 11, you might need to click "Show more options" first).

🛑 CRITICAL: Do not click "Install for all users". That is the option that triggers the admin password prompt. Clicking just "Install" puts it in C:\Users\YourName\AppData\Local\Microsoft\Windows\Fonts, which requires zero special permissions.

Step 3: Update Windows Terminal
Now you just need to tell Windows Terminal to use it. Open your settings.json file and update your "defaults" block to use FiraCode Nerd Font.

If you want to explicitly ensure ligatures (font features) are enabled, you can format your font block like this:



## Space

```bash
export PS1="\[\033[01;32m\]\u\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ "
```
and
```bash
export PS1="\[\033[01;34m\]\W\[\033[00m\] \$ "
```

Method 2: "Focus Mode" (Zero Header)
If you want maximum terminal space with absolutely no tabs or title bars showing at all, Windows Terminal has a built-in "Focus Mode".

You don't even need to edit your JSON for this:

While in the terminal, press Ctrl + Shift + P to open the Command Palette.

Type Focus Mode and hit Enter.


```json
"launchMode": "fullscreen",
```

## Catppuccin Theme
To get the Catppuccin look in your WSL terminal, you usually need to do two things: apply the color scheme to Windows Terminal (the app hosting WSL) and then (optionally) theme your shell prompt (like bash or zsh) for the full aesthetic.

1. Apply Catppuccin to Windows Terminal
This changes the background, text colors, and the "flavour" (Mocha, Macchiato, Frappé, or Latte).  

Get the Colors: Go to the Catppuccin Windows Terminal GitHub.

Open Settings: In Windows Terminal, press Ctrl + ,.

Open the JSON: Click Open JSON file at the bottom left of the settings screen.  

Add the Scheme: Find the "schemes": [] section in the text file and paste the JSON for your preferred flavor (e.g., Mocha.json) inside those brackets.

Enable it: Save the file, go back to the Terminal UI, select your WSL Profile > Appearance > Color scheme, and pick Catppuccin.
