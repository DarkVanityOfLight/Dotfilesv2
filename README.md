# My Dotfiles

## I3 Gaps
As window manager I am using i3 gaps. 

### Installation
I3 Gaps is easily installed using pacman:
`sudo pacman -S i3-gaps`

### Config
The config is as easy as copying 
`.config/i3/config` to `~/.config/i3/config`

## Picom
We use Picom as the compositor because it is lightwheight and we don't really need 
alot of features from our compositor.

### Install
`sudo pacman -S picom`

### Config
We don't configure alot but we need some config done so,
copy `.config/picom/picom.conf` to `~/.config/picom/picom.conf`.

## Terminal
The Terminal we use is kitty.

### Installation
`sudo pacman -S kitty`

### Config
Copy the config from:  
`.config/kitty/kitty.conf` to `~/.config/kitty/kitty.conf`

and set the theme using
`kitty +kitten themes --reload-in=all Catpuccin-Mocha`


## Editor
I am using Neo Vim with AstroNvim as Editor.

### Install
`sudo pacman -S neovim`

After that we need to install AstroNvim, for that we run
`git clone --depth 1 https://github.com/AstroNvim/AstroNvim ~/.config/nvim`

### Config 
To configure we just need to download our config from Github now and we are done.
`git clone https://github.com/DarkVanityOfLight/astrovim-config.git ~/.config/nvim/lua/user`

## Fonts
I only use the Fira Code Nerd font but if you want others go ahead.

### Install
You can either manually install or use the AUR
`yay -S ttf-firacode-nerd`
