import * as express from 'express';

export default function ping(req: express.Request, res: express.Response) {
    res.send('pong');
}
