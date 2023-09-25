import logging
from typing import Optional
from propan.annotations import Logger

import anyio
from propan.brokers.rabbit import RabbitQueue, RabbitExchange, ExchangeType
from propan import PropanApp, RabbitBroker, RabbitRouter
from propan.annotations import RabbitBroker as Broker, ContextRepo

from config import init_settings
import json

router = RabbitRouter()
exchInput = RabbitExchange(
    "StableDraw.Contracts.NeuralContracts.Requests:INeuralRequest", durable=True, type=ExchangeType.FANOUT)

exchOutput = RabbitExchange(
    "StableDraw.Contracts.NeuralContracts.Replies:INeuralReply", durable=True, type=ExchangeType.FANOUT)


def gen_responce(body, message, exchange):
    body_json = json.loads(body.decode('utf8'))
    response = {
        "messageId": body_json['messageId'],
        "conversationId": body_json['conversationId'],
        "sourceAddress": body_json['sourceAddress'],
        "destinationAddress": body_json['destinationAddress'],
        "requestId": body_json['requestId'],
        "messageType": ['urn:message:' + exchange],
        "message": message
    }


@router.handle(queue="neural-run", exchange=exchInput)
async def base_handler(body, logger: Logger):

    print(my_json)
    result = {"orderId": my_json["message"]["orderId"],
              "neuralType": my_json["message"]["neuralType"], }

    print(my_json)

    await broker.publish(json.dumps(response), queue="saga-state", exchange=exchOutput)

broker = RabbitBroker()
broker.include_router(router)


app = PropanApp(broker)


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
