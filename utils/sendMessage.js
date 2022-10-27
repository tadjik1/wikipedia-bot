import axios from 'axios';
import pug from 'pug';

import { BOT_TOKEN } from '../config.js';

export default async function sendMessage(chat_id, results) {
    try {
        const message = results.length === 0
            ? { text: 'к сожалению, ничего найти не удалось' }
            : {
                parse_mode: 'html',
                disable_web_page_preview: true,
                text: pug.renderFile('utils/messages.pug', { results, pretty: true })
            };

        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: chat_id,
            ...message,
        });
    } catch (error) {
        console.error(error);
    }
}