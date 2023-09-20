from propan import RabbitBroker, RabbitRouter
from propan.annotations import Logger
from propan.brokers.rabbit import RabbitQueue, RabbitExchange, ExchangeType
from pydantic import BaseModel
import json

# class ModelTest(BaseModel):
#     message: dic
# router = RabbitRouter()
# exch = RabbitExchange(
#     "StableDraw.Contracts.NeuralContracts.Requests:INeuralRequest", durable=True, type=ExchangeType.FANOUT)


# # async def pub(result: dict):
# #     await broker.publish(result, queue="neural-result", exchange="StableDraw.Contracts.NeuralContracts.Replies:INeuralReply")

# router = RabbitRouter()
# exch = RabbitExchange(
#     "StableDraw.Contracts.NeuralContracts.Requests:INeuralRequest", durable=True, type=ExchangeType.FANOUT)


# @router.handle(queue="neural-run", exchange=exch)
# async def base_handler(body, logger: Logger):
#     # m = ModelTest(body)
#     my_json = body.decode('utf8')
#     data = json.loads(my_json)['message']
#     print(data)
#     result = {"orderId": data['orderId'], "neuralType": data['neuralType']}
#     await broker.publish(result, queue="neural-result", exchange="StableDraw.Contracts.NeuralContracts.Replies:INeuralReply")
# await pub(result)

# result = {"OrderId": body.values['OrderId'],
#           "NeuralType": body.values['NeuralType']}
# await pub(result)

# if body['NeuralType'] == 'colorizer':
#     result["picture"] = interface.colorizer(
#         init_img_binary_data=body['init_img_binary_data'], params=body['params'])
#     return result
# elif body['NeuralType'] == 'delete_background':
#     result["picture"] = interface.delete_background(
#         init_img_binary_data=body['init_img_binary_data'], params=body['params'])
#     return result
# elif body['NeuralType'] == 'upscaler':
#     result["picture"] = interface.upscaler(
#         init_img_binary_data=body['init_img_binary_data'], params=body['params'])
#     return result
# elif body['NeuralType'] == 'image_to_image':
#     saverLists = interface.image_to_image(
#         init_img_binary_data=body['init_img_binary_data'], caption=body['caption'], params=body['params'])
#     return parserForList(saverLists)
# elif body['NeuralType'] == 'text_to_image':
#     saverLists = interface.text_to_image(
#         caption=body['caption'], params=body['params'])
#     return parserForList(saverLists)
# elif body['NeuralType'] == 'image_captioning':
#     result["description"] = interface.image_captioning(
#         init_img_binary_data=body['init_img_binary_data'], caption=body['caption'], params=body['params'])
#     return result
# elif body['NeuralType'] == 'image_classification':
#     saverLists = interface.image_classification(
#         init_img_binary_data=body['init_img_binary_data'])
#     return parserForList(saverLists)
# elif body['NeuralType'] == 'translation':
#     return interface.translation(input_text=body['input_text'], source_lang=body['source_lang'], dest_lang=body['dest_lang'])
# elif body['NeuralType'] == 'inpainting':
#     saverLists = interface.inpainting(
#         init_img_binary_data=body['init_img_binary_data'], mask_binary_data=body['mask_binary_data'], caption=body['caption'], params=body['params'])
#     return parserForList(saverLists)
# elif body['NeuralType'] == 'stylization':
#     saverLists = interface.stylization(
#         content_binary_data=body['init_img_binary_data'], style_binary_data=body['style_binary_data'], prompt=body['prompt'], params=body['params'])
#     return parserForList(saverLists)
# elif body['NeuralType'] == 'image_fusion':
#     saverLists = interface.image_fusion(img1_binary_data=body['img1_binary_data'], img2_binary_data=body[
#                                       'img2_binary_data'], prompt1=body['prompt1'], prompt2=body['prompt2'], params=body['params'])
#     return parserForList(saverLists)
