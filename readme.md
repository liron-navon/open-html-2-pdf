# open html 2 pdf

A simple server to convert html to pdf.

##### * this will not work on windows machines properly.

deploy to heroku:
```
heroku create
```
```
git push heroku master
```
```
heroku open
```

debug:
run: ```npm run debug```, get a websocket url and open:
```
chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&<WEBSOCKET_URL>
```
