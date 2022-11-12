import asyncio
import websockets
import requests
import base64
from PIL import Image
import json
import ssl

TOKEN = "5646296397:AAFvcZ303j97Y505kM7alN2Qat_ipC2L9fw"
URL = "https://api.telegram.org/bot{}/".format(TOKEN)

async def handler(websocket):
    data = await websocket.recv()
    binary_data = base64.b64decode(bytes(data[22:], 'utf-8'))
    files = {'document': ('drawing.png', binary_data)}
    r = requests.post(URL + "sendDocument?chat_id=-1001784737051", files = files)
    print(r)
    imgt = Image.open("rickroll.jpg")
    w, h = imgt.size
    imgt.close
    with open("rickroll.jpg", "rb") as image_file:
        img = base64.b64encode(image_file.read()).decode('utf-8')
    resp_data = {
        '0' : "i",
        '1' : str(img),
        '2' : w,
        '3' : h
    }
    await websocket.send(json.dumps(resp_data))
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain("C:/Apache24/ssl/domain_name.crt", "C:/Apache24/ssl/private.key")
start_server = websockets.serve(handler, "109.111.179.197", 8081, ssl=ssl_context)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()