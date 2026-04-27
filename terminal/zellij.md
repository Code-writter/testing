Install Zellij

```bash
# 1. Download the latest Linux binary
wget https://github.com/zellij-org/zellij/releases/latest/download/zellij-x86_64-unknown-linux-musl.tar.gz

# 2. Extract the downloaded file
tar -xvf zellij-x86_64-unknown-linux-musl.tar.gz

# 3. Make the extracted file executable
chmod +x zellij

# 4. Move it to your system's binaries folder so you can run it from anywhere
# (This will ask for your WSL Ubuntu password)
sudo mv zellij /usr/local/bin/

# 5. Clean up by deleting the downloaded zip file
rm zellij-x86_64-unknown-linux-musl.tar.gz
```

