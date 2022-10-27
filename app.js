import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import pug from 'pug';

import telegram from './middlewares/telegram.js';
import message from './middlewares/message.js';

import sendMessage from './utils/sendMessage.js';
import wikipedia from './utils/wikipedia.js';

import './utils/db.js';
import History from './models/History.js';

const application = new Koa();

application.use(bodyparser());
application.use(telegram);
application.use(message);

application.use(async (ctx) => {
    switch (ctx.state.text) {
        case '/start':
            await sendMessage(ctx.state.chat_id, { text: 'привет! отправь мне свой запрос' });
            break;
        case '/history':
            const history = await History.find({
                chat_id: ctx.state.chat_id
            })
            .sort({ createdAt: -1 })
            .limit(10)

            const m = history.length === 0
                ? { text: 'вы еще пока ничего не искали' }
                : {
                    parse_mode: 'html',
                    disable_web_page_preview: true,
                    text: pug.renderFile('utils/history.pug', { results: history, pretty: true })
                };

            await sendMessage(ctx.state.chat_id, m);
            break;
        default:
            const results = await wikipedia(ctx.state.text);
            const message = results.length === 0
                ? { text: 'к сожалению, ничего найти не удалось' }
                : {
                    parse_mode: 'html',
                    disable_web_page_preview: true,
                    text: pug.renderFile('utils/messages.pug', { results, pretty: true })
                };

            await History.create({
                chat_id: ctx.state.chat_id,
                query: ctx.state.text,
            });
            await sendMessage(ctx.state.chat_id, message);
    }

    ctx.body = 'ok';
});

export default application;