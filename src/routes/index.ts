import * as express from 'express';
import convert from './handlers/convert';
import ping from './handlers/ping';

const router = express.Router();

router.post('/convert', convert);
router.all('/ping', ping);

export default router;
