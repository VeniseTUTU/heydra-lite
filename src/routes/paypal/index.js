import express from 'express';
import PaypalWebhookHandler from './PaypalWebhookHandler';

const router = express.Router();

router.post('/webhook', PaypalWebhookHandler);

export default router;
