import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import routes from './routes';

const PORT =  process.env.PORT || 3000;
const app = express();

process.on('uncaughtException', function(err) {
    console.error( 'UNCAUGHT EXCEPTION', err.stack, err.message );
});

const bodyParserOptions = { limit: '1000mb' };

app.use(cors());
app.use(bodyParser(bodyParserOptions));
app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    const url = req.method + ' - ' + req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(url);
    next();
});

app.use('/', routes);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        message: 'something broke!',
        error: err
    });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
