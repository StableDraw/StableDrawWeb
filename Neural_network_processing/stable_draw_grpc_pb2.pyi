from google.protobuf import any_pb2 as _any_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Dictionary(_message.Message):
    __slots__ = ["pairs"]
    PAIRS_FIELD_NUMBER: _ClassVar[int]
    pairs: _containers.RepeatedCompositeFieldContainer[Pair]
    def __init__(self, pairs: _Optional[_Iterable[_Union[Pair, _Mapping]]] = ...) -> None: ...

class FromImageRequest(_message.Message):
    __slots__ = ["init_img_binary_data", "params"]
    INIT_IMG_BINARY_DATA_FIELD_NUMBER: _ClassVar[int]
    PARAMS_FIELD_NUMBER: _ClassVar[int]
    init_img_binary_data: bytes
    params: Dictionary
    def __init__(self, init_img_binary_data: _Optional[bytes] = ..., params: _Optional[_Union[Dictionary, _Mapping]] = ...) -> None: ...

class FromImageandTextRequest(_message.Message):
    __slots__ = ["caption", "init_img_binary_data", "params"]
    CAPTION_FIELD_NUMBER: _ClassVar[int]
    INIT_IMG_BINARY_DATA_FIELD_NUMBER: _ClassVar[int]
    PARAMS_FIELD_NUMBER: _ClassVar[int]
    caption: str
    init_img_binary_data: bytes
    params: Dictionary
    def __init__(self, init_img_binary_data: _Optional[bytes] = ..., caption: _Optional[str] = ..., params: _Optional[_Union[Dictionary, _Mapping]] = ...) -> None: ...

class FromImgOnlyRequest(_message.Message):
    __slots__ = ["init_img_binary_data"]
    INIT_IMG_BINARY_DATA_FIELD_NUMBER: _ClassVar[int]
    init_img_binary_data: bytes
    def __init__(self, init_img_binary_data: _Optional[bytes] = ...) -> None: ...

class FromImgandMaskandTextRequest(_message.Message):
    __slots__ = ["caption", "init_img_binary_data", "mask", "params"]
    CAPTION_FIELD_NUMBER: _ClassVar[int]
    INIT_IMG_BINARY_DATA_FIELD_NUMBER: _ClassVar[int]
    MASK_FIELD_NUMBER: _ClassVar[int]
    PARAMS_FIELD_NUMBER: _ClassVar[int]
    caption: str
    init_img_binary_data: bytes
    mask: bytes
    params: Dictionary
    def __init__(self, init_img_binary_data: _Optional[bytes] = ..., mask: _Optional[bytes] = ..., caption: _Optional[str] = ..., params: _Optional[_Union[Dictionary, _Mapping]] = ...) -> None: ...

class FromTextRequest(_message.Message):
    __slots__ = ["caption", "params"]
    CAPTION_FIELD_NUMBER: _ClassVar[int]
    PARAMS_FIELD_NUMBER: _ClassVar[int]
    caption: str
    params: Dictionary
    def __init__(self, caption: _Optional[str] = ..., params: _Optional[_Union[Dictionary, _Mapping]] = ...) -> None: ...

class ImageReply(_message.Message):
    __slots__ = ["binary_data", "h", "w"]
    BINARY_DATA_FIELD_NUMBER: _ClassVar[int]
    H_FIELD_NUMBER: _ClassVar[int]
    W_FIELD_NUMBER: _ClassVar[int]
    binary_data: bytes
    h: int
    w: int
    def __init__(self, w: _Optional[int] = ..., h: _Optional[int] = ..., binary_data: _Optional[bytes] = ...) -> None: ...

class IntReply(_message.Message):
    __slots__ = ["c"]
    C_FIELD_NUMBER: _ClassVar[int]
    c: int
    def __init__(self, c: _Optional[int] = ...) -> None: ...

class Pair(_message.Message):
    __slots__ = ["pair"]
    class PairEntry(_message.Message):
        __slots__ = ["key", "value"]
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: _any_pb2.Any
        def __init__(self, key: _Optional[str] = ..., value: _Optional[_Union[_any_pb2.Any, _Mapping]] = ...) -> None: ...
    PAIR_FIELD_NUMBER: _ClassVar[int]
    pair: _containers.MessageMap[str, _any_pb2.Any]
    def __init__(self, pair: _Optional[_Mapping[str, _any_pb2.Any]] = ...) -> None: ...

class TextReply(_message.Message):
    __slots__ = ["caption"]
    CAPTION_FIELD_NUMBER: _ClassVar[int]
    caption: str
    def __init__(self, caption: _Optional[str] = ...) -> None: ...
