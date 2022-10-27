import axios from 'axios';

import { BOT_TOKEN } from '../config.js';

export default async function sendMessage(chat_id, message) {
    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: chat_id,
            ...message,
        });
    } catch (error) {
        console.error(error);
    }
}