# Frontend kit
- Gulp
- Jade
- PostCss
- Babel

## Start project
- [Install Node.js](https://github.com/creationix/nvm)
```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
source ~/.bashrc
nvm install 0.12.0
nvm alias default 0.12.0
```
- Run following in project root:
```bash
git clone git@github.com:AleksandrZhukov/frontend-kit.git
cd frontend-kit
npm install
npm install -g gulp bower
bower install
gulp server
```