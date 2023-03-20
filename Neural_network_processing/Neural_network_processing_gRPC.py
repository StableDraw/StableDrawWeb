import grpc
from concurrent import futures
import logging
import stable_draw_grpc_pb2
import stable_draw_grpc_pb2_grpc

from Image_caption_generator import Gen_caption as Gen_caption_gRPC
from Delete_background import Delete_background as Delete_background_gRPC
from Upscaler import Upscale as Upscale_gRPC
from Stable_diffusion import Stable_diffusion_image_to_image as Stable_diffusion_image_to_image_gRPC
from Stable_diffusion import Stable_diffusion_text_to_image as Stable_diffusion_text_to_image_gRPC
from Stable_diffusion import Stable_diffusion_depth_to_image as Stable_diffusion_depth_to_image_gRPC
from Stable_diffusion import Stable_diffusion_inpainting as Stable_diffusion_inpainting_gRPC
from Stable_diffusion import Stable_diffusion_upscaler as Stable_diffusion_upscaler_gRPC
from Stable_diffusion import Stable_diffusion_upscaler_xX as Stable_diffusion_upscaler_xX_gRPC
from Image_classifier import Get_image_class as Get_image_class_gRPC
from Image_сolorization import Image_сolorizer as Image_сolorizer_gRPC

class StableDrawGRPC(stable_draw_grpc_pb2_grpc.StableDrawGRPC):#grpc
    def GenCaption(init_img_binary_data, params):
        return stable_draw_grpc_pb2.TextReply(Gen_caption_gRPC(init_img_binary_data, params))
    def StableDiffusionDepthToImage(init_img_binary_data, caption, params):
        return stable_draw_grpc_pb2.ImageReply(Stable_diffusion_depth_to_image_gRPC(init_img_binary_data, caption, params))
    def StableDiffusionInpainting(init_img_binary_data, mask_binary_data, caption, params):
        return stable_draw_grpc_pb2.ImageReply(Stable_diffusion_inpainting_gRPC(init_img_binary_data, mask_binary_data, caption, params))
    def StableDiffusionUpscaler(init_img_binary_data, caption, params):
        return stable_draw_grpc_pb2.ImageReply(Stable_diffusion_upscaler_gRPC(init_img_binary_data, caption, params))
    def StableDiffusionUpscalerXX(init_img_binary_data, caption, params):
        return stable_draw_grpc_pb2.ImageReply(Stable_diffusion_upscaler_xX_gRPC(init_img_binary_data, caption, params))
    def StableDiffusionImageToImage(init_img_binary_data, caption, params):
        return stable_draw_grpc_pb2.ImageReply(Stable_diffusion_image_to_image_gRPC(init_img_binary_data, caption, params))
    def StableDiffusionTextToImage(caption, params):
        return stable_draw_grpc_pb2.ImageReply(Stable_diffusion_text_to_image_gRPC(caption, params))
    def DeleteDackground(init_img_binary_data):
        return stable_draw_grpc_pb2.ImageReply(Delete_background_gRPC(init_img_binary_data))
    def Upscale(init_img_binary_data, params):
        return stable_draw_grpc_pb2.ImageReply(Upscale_gRPC(init_img_binary_data, params))
    def GetImageClass(init_img_binary_data):
        return stable_draw_grpc_pb2.IntReply(Get_image_class_gRPC(init_img_binary_data))
    def ImageColorizer(init_img_binary_data):
        return stable_draw_grpc_pb2.ImageReply(Image_сolorizer_gRPC(init_img_binary_data))

if __name__ == "__main__":
    logging.basicConfig()#grpc
    port = "8082"
    server = grpc.server(futures.ThreadPoolExecutor(max_workers = 1))
    stable_draw_grpc_pb2_grpc.add_StableDrawGRPCServicer_to_server(StableDrawGRPC(), server)
    server.add_insecure_port("109.111.179.197:" + port)
    server.start()
    print("Server started, listening on: " + port)
    server.wait_for_termination()