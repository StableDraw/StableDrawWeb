import asyncio
import websockets
import requests
import base64

TOKEN = "5510277833:AAE9taie2wHrk31jQdetZEBAPSHAa6QzjmA"
URL = "https://api.telegram.org/bot{}/".format(TOKEN)
chat_id = -1001837035138

USERS = set()

async def addUser(websocket):
    USERS.add(websocket)

async def removeUser(websocket):
    USERS.remove(websocket)

async def socket(websocket):
    await addUser(websocket)
    try:
        while True:
            data = await websocket.recv()
            binary_data = base64.b64decode(bytes(data[22:], 'utf-8'))
            files = {'document': ('drawing.png', binary_data)}
            requests.post("https://api.telegram.org/bot5510277833:AAE9taie2wHrk31jQdetZEBAPSHAa6QzjmA/sendDocument?caption={}&chat_id=-1001837035138".format(websocket), files = files)
            reply = f"Data recieved as:  {data}!"
            await websocket.send(reply)
            
            await asyncio.wait([user.send(data) for user in USERS])
    finally:
        await removeUser(websocket)

start_server = websockets.serve(socket, "192.168.0.101", 8081)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()