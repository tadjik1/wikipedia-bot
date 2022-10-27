import { SECRET_TOKEN } from "../config.js";

export default function telegram(ctx, next) {
    const secret_token = ctx.get('X-Telegram-Bot-Api-Secret-Token');
    if (secret_token !== SECRET_TOKEN) {
        ctx.throw(403, 'hacker?!');
    }
    return next();
}