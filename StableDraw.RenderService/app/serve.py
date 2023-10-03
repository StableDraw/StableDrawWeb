import json
import logging
from typing import Optional

import anyio
from propan import PropanApp, RabbitBroker, RabbitRouter
from propan.annotations import RabbitBroker as Broker, ContextRepo
from propan.brokers.rabbit import RabbitExchange, ExchangeType

from config import init_settings

router = RabbitRouter()

broker = RabbitBroker()
broker.include_router(router)

app = PropanApp(broker)


exchInput = RabbitExchange(
    "StableDraw.Contracts.RenderContracts.Requests:IGetRenderedImageRequest", durable=True, type=ExchangeType.FANOUT)

exchOutput = RabbitExchange(
    "StableDraw.Contracts.RenderContracts.Replies:IGetRenderedImageReply", durable=True, type=ExchangeType.FANOUT)


@broker.handle(queue="get-rendered-image", exchange=exchInput)
async def reander_handler(body):
    body_json = json.loads(body.decode('utf8'))
    msg = body_json['massage']

@app.on_startup
async def init_app(broker: Broker, context: ContextRepo, env: Optional[str] = None):
    settings = init_settings(env)
    context.set_global("settings", settings)

    logger_level = logging.DEBUG if settings.debug else logging.INFO
    app.logger.setLevel(logger_level)
    broker.logger.setLevel(logger_level)

    await broker.connect(settings.broker.url)


if __name__ == "__main__":
    anyio.run(app.run)