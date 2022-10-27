export default function message(ctx, next) {
    console.log(ctx.request.body);

    const { chat: { id: chat_id }, text } = ctx.request.body.message;
    ctx.state.chat_id = chat_id;
    ctx.state.text = text;

    return next();
}