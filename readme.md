# open html 2 pdf

A simple server to convert html to pdf.


deploy to heroku:
```
heroku create
```
```
git push heroku master
```
Set buildpacks for the app to run properly on heroku
```
heroku buildpacks:set jontewks/puppeteer
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks # should output node, and then puppeteer
```
```
heroku open
```

debug:
run: ```npm run debug```, get a websocket url and open:
```
chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&<WEBSOCKET_URL>
```
