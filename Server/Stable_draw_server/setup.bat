@cd /d %~dp0
pip install -r requirements.txt
curl -o ./checkpoints/caption.pt https://ofa-beijing.oss-cn-beijing.aliyuncs.com/checkpoints/caption_base_best.pt
@pause