# Ensure required directories exist
mkdir -p ~/.config/i3 ~/.config/picom ~/.config/kitty ~/.config/fish ~/.config/rofi ~/.config/eww ~/.config/lockscreen ~/.config/polybar ~/.config/spicetify ~/.config/dunst

# Install software using pacman
sudo pacman -S i3-gaps picom kitty fish starship neovim rustup rofi polybar dunst

# I3 Gaps
cp .config/i3/config ~/.config/i3/

# Picom
cp .config/picom/picom.conf ~/.config/picom/

# Terminal - Kitty
cp .config/kitty/kitty.conf ~/.config/kitty/
kitty +kitten themes --reload-in=all Catpuccin-Mocha

# Fish
cp -r .config/fish/* ~/.config/fish
fish_config theme save "Catppuccin Mocha"

# Starship
cp .config/starship.toml ~/.config/

# Editor - Neo Vim with AstroNvim
git clone --depth 1 https://github.com/AstroNvim/AstroNvim ~/.config/nvim
git clone https://github.com/DarkVanityOfLight/astrovim-config.git ~/.config/nvim/lua/user

# Fonts - Fira Code Nerd
# Manual or AUR installation
yay -S ttf-firacode-nerd

# Rofi
cp -r .config/rofi/* ~/.config/rofi/

# Eww
cd eww
cargo build --release --no-default-features --features x11
cp -r .config/eww/* ~/.config/eww/

# I3lock-color
# Install i3lock-color using AUR helper
yay -S i3lock-color
# Move your lockscreen image to: ~/.config/lockscreen/lockscreen_image.png

# Polybar
cp -r .config/polybar/* ~/.config/polybar/

# Spotify/Spicetify
yay -S spotify spicetify-cli
cp -r .config/spicetify/* ~/.config/spicetify/
# Edit ~/.config/spicetify/config-xpui.ini and set your preference path

# Dunst
cp -r .config/dunst/* ~/.config/dunst/

