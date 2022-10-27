import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import axios from 'axios';

import { BOT_TOKEN } from './config.js';
import telegram from './middlewares/telegram.js';

const application = new Koa();

application.use(bodyparser());
application.use(telegram);

application.use(async (ctx) => {
    const chat_id = ctx.request.body.message.chat.id;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: chat_id,
        text: "hello from bot"
    });

    ctx.body = 'ok';
});

export default application;