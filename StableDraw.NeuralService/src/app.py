import logging
from fastapi import FastAPI
import asyncio
import aio_pika

from neuralConsumer import LOG_FORMAT
from reconnectingNeuralConsumer import ReconnectingExampleConsumer

logging.basicConfig(level=logging.DEBUG, format=LOG_FORMAT)
amqp_url = 'rabbitmq://rmuser:rmpassword@localhost:5672/%2F'
consumer = ReconnectingExampleConsumer(amqp_url)
consumer.run()

# app = FastAPI()

# @app.on_event('startup')
# async def startup():
#     loop = asyncio.get_event_loop()
#     logging.basicConfig(level=logging.DEBUG, format=LOG_FORMAT)
#     amqp_url = 'rabbitmq://rmuser:rmpassword@localhost:5672/%2F'
#     consumer = ReconnectingExampleConsumer(amqp_url)
#     consumer.run()
