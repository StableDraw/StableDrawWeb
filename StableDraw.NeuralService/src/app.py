from fastapi import FastAPI
import asyncio
import aio_pika

app = FastAPI()

@app.on_event('startup')
async def startup():
    loop = asyncio.get_event_loop()
    connection = await aio_pika.connect("rabbitmq://rmuser:rmpassword@localhost/", loop = loop)
    channel = await connection.channel()
