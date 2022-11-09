import asyncio
import websockets
import requests
import base64

TOKEN = "5510277833:AAE9taie2wHrk31jQdetZEBAPSHAa6QzjmA"
URL = "https://api.telegram.org/bot{}/".format(TOKEN)

async def handler(websocket):
    data = await websocket.recv()
    binary_data = base64.b64decode(bytes(data[22:], 'utf-8'))
    files = {'document': ('drawing.png', binary_data)}
    requests.post(URL + "sendDocument?chat_id={}".format(-1001837035138), files = files)
    reply = f"Data recieved as:  {data}!"
    await websocket.send(reply)
start_server = websockets.serve(handler, "192.168.0.101", 8081)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()