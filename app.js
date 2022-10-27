import Koa from 'koa';
import bodyparser from 'koa-bodyparser';

import telegram from './middlewares/telegram.js';
import message from './middlewares/message.js';

import sendMessage from './utils/sendMessage.js';
import wikipedia from './utils/wikipedia.js';

const application = new Koa();

application.use(bodyparser());
application.use(telegram);
application.use(message);

application.use(async (ctx) => {
    const results = await wikipedia(ctx.state.text);
    console.log(results);
    await sendMessage(ctx.state.chat_id, results);
    
    ctx.body = 'ok';
});

export default application;