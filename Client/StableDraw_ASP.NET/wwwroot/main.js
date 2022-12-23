"use strict";
var body = document.querySelector("body");
var cursor = document.querySelector(".cursor");
var cursor_image = document.querySelector(".cursimg");
var cursor_type = -1;
var nav_panel = document.querySelector(".nav");
var canvas_foreground = document.getElementById("canvas_foreground");
var canvas_background = document.getElementById("canvas_background");
var canvas_additional = document.getElementById("canvas_additional");
var canvas_layer_1 = document.getElementById("layer_1_display_canvas");
var canvas_layer_2 = document.getElementById("layer_2_display_canvas");
var layer_icon_1 = document.getElementById("layer_display_icon_1");
var layer_icon_2 = document.getElementById("layer_display_icon_2");
var d_frame = document.getElementById("d_frame");
var spanel = document.getElementById("mySidepanel");
var spanel_openbtn = document.querySelector(".openbtn");
var generateBtn = document.getElementById("generate");
var clr_w = document.getElementById("clr_window");
var pencil_w = document.getElementById("pencil_window");
var eraser_w = document.getElementById("eraser_window");
var ok_clr_btn = document.getElementById("ok_clr_btn");
var cur_color = document.getElementById("color");
var clrimg = document.getElementById("clrimg");
var ctx_foreground = canvas_foreground.getContext("2d", { willReadFrequently: true });
var ctx_background = canvas_background.getContext("2d", { willReadFrequently: true });
var ctx_add = canvas_additional.getContext("2d", { willReadFrequently: true });
var ctx_layer_1 = canvas_layer_1.getContext("2d", { willReadFrequently: true });
var ctx_layer_2 = canvas_layer_2.getContext("2d", { willReadFrequently: true });
var ratio_field = document.querySelector(".f_ratio");
var ratio_tooltip = document.querySelector("ratio_tooltip");
var thickness_slider = document.getElementById("thickness_sliderValue");
var thickness_field = document.getElementById("thickness_rangeValue");
var smoothing_slider = document.getElementById("smoothing_sliderValue");
var smoothing_field = document.getElementById("smoothing_rangeValue");
var e_thickness_slider = document.getElementById("e_thickness_sliderValue");
var e_thickness_field = document.getElementById("e_thickness_rangeValue");
var layer_1 = document.getElementById("layer_1");
var layer_2 = document.getElementById("layer_2");
var scale_field = document.querySelector(".scale_field");
var div_layers = document.querySelector(".layers");
var layers_buttons = document.querySelector(".layers_buttons");
var modal_header = document.querySelector(".modal__header");
var modal_body = document.querySelector(".modal__body");
var modal_footer = document.querySelector(".modal__footer");
var text_label_clr = document.getElementById("text_label_clr");
var blackout = document.getElementById("full_blackout");
var side_panel_blackout = document.getElementById("side_panel_blackout");
var EL = function (sel) { return document.querySelector(sel); };
var id_list = ['p', 'i', 'u', 'f'];
var Pi_div_4 = Math.PI / 4;
var nstack = [];
var pstack = [];
var curprim = [];
var fp = true;
var on_d_frame = false;
var on_d_fiend = false;
var prevX = null;
var prevY = null;
var move_prevX = null;
var move_prevY = null;
var X_move = null;
var Y_move = null;
var cX;
var cY;
var is_shift_on = false;
var fup = false;
var fdown = false;
var fright = false;
var fleft = false;
var cfup = false;
var cfleft = false;
var W = window.innerWidth;
var H = window.innerHeight;
var fW_max = W * 0.8;
var fH_max = H * 0.8;
var fW_min = W * 0.1;
var fH_min = H * 0.1;
var cW = canvas_foreground.offsetWidth;
var cH = canvas_foreground.offsetHeight;
var cD = cW / cH;
var Max_cW = cW;
var Max_cH = cH;
var lW = layer_icon_1.offsetWidth;
var lH = layer_icon_1.offsetHeight;
var lwW = canvas_layer_1.width;
var lwH = canvas_layer_1.height;
var orig_lW = lW;
var orig_lH = lH;
var orig_lD = lW / lH;
if (cD > orig_lD) {
    lW = orig_lW;
    lH = orig_lW / cD;
}
else {
    lH = orig_lH;
    lW = orig_lH * cD;
}
var lWp = Math.round(995 * (lW / orig_lW)) / 10 + "%";
var lHp = Math.round(1000 * (lH / orig_lH)) / 10 + "%";
layer_icon_1.style.width = lWp;
layer_icon_2.style.width = lWp;
layer_icon_1.style.height = lHp;
layer_icon_2.style.height = lHp;
/*layer_alpha_img_1.width = lWp
layer_alpha_img_1.height = lHp
layer_alpha_img_2.width = lWp
layer_alpha_img_2.height = lHp*/
var cur_real_ratio = cH / cW;
var l_width = 1;
var W_f = (W - cW) / 2 - l_width / 2 + 12;
var H_f = (H - cH) / 2 - l_width / 2 + 12;
var f_dW = d_frame.offsetWidth;
var f_dH = d_frame.offsetHeight;
var orig_f_dW = f_dW;
var orig_f_dH = f_dH;
var fW_pred = orig_f_dW;
var fH_pred = orig_f_dH;
var cmp_W = 1;
var cmp_H = 1;
var cmp_W_b = 0;
var cmp_H_b = 0;
d_frame.width = f_dW;
d_frame.height = f_dH;
var H_min = (H - f_dH) / 4;
var H_max = f_dH + H_min;
var W_min = (W - f_dW) / 4;
var W_max = f_dW + W_min;
canvas_foreground.height = cH;
canvas_foreground.width = cW;
canvas_background.height = cH;
canvas_background.width = cW;
canvas_additional.height = cH;
canvas_additional.width = cW;
var draw = false;
var enddraw = false;
var f_move = false;
var end_f_move = false;
var old_btn_clr = false; //изначально чёрный текст у кнопок цвета
var on_clr_window = false;
var cur_background_clr = "#fff";
var new_background_clr = cur_background_clr;
var cur_brush_clr = "#000000";
ctx_background.fillStyle = cur_background_clr; //заливка фона белым, костыль, убрать
ctx_layer_2.fillStyle = cur_background_clr; //заливка иконки фона белым, костыль, убрать
pstack.push(['i', ctx_background, cur_background_clr]);
ctx_background.fillRect(0, 0, cW, cH);
ctx_layer_2.fillRect(0, 0, cW, cH);
var is_clr_brash = true;
var cur_ratio_val = get_visual_ratio(false, cW, cH);
ratio_field.value = cur_ratio_val; //устанавливаем соотношение сторон при запуске
var is_first_upload_btn_click = true; //костыль, чтобы кнопка не срабатывала дважды
var is_foreground_selected = true; //выбран ли верхний слой, по-умолчанию выбран
var cur_draw_ctx = ctx_foreground; //текущий выбранный слой для рисования, по-умолчанию верхний
var cur_canvas = canvas_foreground; //текущий выбранный слой для рисования ввиде слоя, не контекста, по-умолчанию верхний
var cur_ctx_layer = ctx_layer_1; //текущий выбранный слой для рисования ввиде контекста кнопки который в углу, по-умолчанию верхний
var graphic_tablet_mode = false; //режим графического планшета
var is_clr_window = false; //отображение окна с палитрой
var is_pencil_window = true; //отображение окна настроек кисти
var is_eraser_window = false; //отображение окна настроек ластика
var cur_smoothing = 0; //параметр сглаживания
var cur_smooth_prim = []; //текущий сглаженный примитив
var k_smooth = 0; //текущий коэффициент сглаживания
var is_foreground_visible = true; //включена ли видимость переднего слоя
var is_background_visible = true; //включена ли видимость заднего слоя
ctx_foreground.lineCap = "round";
ctx_foreground.lineJoin = "round";
ctx_add.lineCap = "round";
ctx_add.lineJoin = "round";
ctx_background.lineCap = "round";
ctx_background.lineJoin = "round";
layer_1.style.border = "5px solid #000000";
layer_2.style.border = "1px solid #707070";
var is_dark_mode = false; //тёмная тема (отключена по-умолчанию)
var is_modal_open = false;
var is_side_panel_open = false;
var caption_field;
var style_field;
var is_human_caption;
var original_image_buf = ""; //переменная для хранения исходных изображений
var ws = new WebSocket("wss://stabledraw.com:8081");
var chain_id = -1;
var task_id;
var main_modal = function (options) {
    var _elemModal;
    var _eventShowModal;
    var _eventHideModal;
    var _hiding = false;
    var _destroyed = false;
    var _animationSpeed = 200;
    function _createModal(options) {
        var elemModal = document.createElement("div"), modalTemplate = '<div class="modal__backdrop" data-dismiss="modal"><div class="modal__content"><div class="modal__header"><div class="modal__title" data-modal="title">{{title}}</div><span class="modal__btn-close" data-dismiss="modal" title="Закрыть">&times;</span></div><div class="modal__body" data-modal="content">{{content}}</div>{{footer}}</div></div>', modalFooterTemplate = '<div class = "modal__footer">{{buttons}}</div>', modalButtonTemplate = '<button type = "button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>', modalHTML, modalFooterHTML = "";
        elemModal.classList.add("modal");
        modalHTML = modalTemplate.replace("{{title}}", options.title || "");
        modalHTML = modalHTML.replace("{{content}}", options.content || "");
        if (options.footerButtons) {
            for (var i = 0, length = options.footerButtons.length; i < length; i++) {
                var modalFooterButton = modalButtonTemplate.replace("{{button_class}}", options.footerButtons[i].class);
                modalFooterButton = modalFooterButton.replace("{{button_handler}}", options.footerButtons[i].handler);
                modalFooterButton = modalFooterButton.replace("{{button_text}}", options.footerButtons[i].text);
                modalFooterHTML += modalFooterButton;
            }
        }
        modalFooterHTML = modalFooterTemplate.replace("{{buttons}}", modalFooterHTML);
        modalHTML = modalHTML.replace("{{footer}}", modalFooterHTML);
        elemModal.innerHTML = modalHTML;
        document.body.appendChild(elemModal);
        return elemModal;
    }
    function _showModal() {
        is_modal_open = true;
        if (!_destroyed && !_hiding) {
            _elemModal.classList.add("modal__show");
            document.dispatchEvent(_eventShowModal);
        }
    }
    function _hideModal() {
        is_modal_open = false;
        _hiding = true;
        _elemModal.classList.remove("modal__show");
        _elemModal.classList.add("modal__hiding");
        setTimeout(function () {
            _elemModal.classList.remove("modal__hiding");
            _hiding = false;
        }, _animationSpeed);
        document.dispatchEvent(_eventHideModal);
    }
    function _handlerCloseModal(e) {
        if (e.target.dataset.dismiss === "modal") {
            _hideModal();
        }
    }
    _elemModal = _createModal(options);
    _elemModal.addEventListener("click", _handlerCloseModal);
    _eventShowModal = new CustomEvent("show.modal", { detail: _elemModal });
    _eventHideModal = new CustomEvent("hide.modal", { detail: _elemModal });
    return {
        show: _showModal,
        hide: _hideModal,
        destroy: function () {
            _elemModal.parentElement.removeChild(_elemModal),
                _elemModal.removeEventListener("click", _handlerCloseModal),
                _destroyed = true;
        }, setContent: function (html) {
            _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
        }, setTitle: function (text) {
            _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    };
};
(function () {
    var modal = main_modal({
        title: "Генерация",
        content: "<p>Содержмиое модального окна...<p>",
        footerButtons: [
            { class: "modal_btn modal_btn-3", id: "cur_gen_params_btn", text: "Параметры", handler: "modalHandlerParams" },
            { class: "modal_btn modal_btn-2", id: "SD1_btn", text: "StableDiffusion 1", handler: "modalHandlerGenSD1" },
            { class: "modal_btn modal_btn-2", id: "SD2_btn", text: "StableDiffusion 2", handler: "modalHandlerGenSD2" },
            { class: "modal_btn modal_btn-1", text: "Отмена", handler: "modalHandlerCancel" }
        ]
    });
    document.addEventListener("show.modal", function (e) {
        //document.querySelector(".actions").textContent = "Действия при открытии модального окна..."
        // получить ссылку на DOM-элемент показываемого модального окна (.modal)
        //console.log(e.detail)
    });
    document.addEventListener("hide.modal", function (e) {
        //document.querySelector(".actions").textContent = "Действия при закрытии модального окна..."
        // получить ссылку на DOM-элемент скрываемого модального окна (.modal)
        //console.log(e.detail)
    });
    document.addEventListener("click", function (e) {
        if (e.target.dataset.toggle === "modal") {
            var elemTarget = e.target;
            var content = void 0;
            if (original_image_buf == "") {
                content = 'Подпись:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"/><p><button class = "modal_btn modal_btn-2" id = "modal_caption_auto_gen" onclick = "gen_caption_for_image()">Сгенерировать автоматически</button><p>Стиль:<p><input class = "modal_input" id = "style_input" value = "4к фотореалистично" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"/>';
            }
            else {
                content = 'Подпись:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"/><p><button class = "modal_btn modal_btn-2" id = "modal_caption_auto_gen" onclick = "gen_caption_for_image()">Сгенерировать автоматически</button><button class = "modal_btn modal_btn-4" style = "right: 25%" onclick = "upscale()">Апскейл</button><button class = "modal_btn modal_btn-4" onclick = "delete_background()">Удалить фон</button><p>Стиль:<p><input class = "modal_input" id = "style_input" value = "4к фотореалистично" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"/>';
            }
            modal.show();
            modal.setContent(content);
            caption_field = document.getElementById("caption_input");
            style_field = document.getElementById("style_input");
            ws.onmessage = function (event) {
                var jdata = JSON.parse(event.data);
                var type = jdata[0];
                if (type == 't') //если текстовое сообщение
                 {
                    //alert(jdata[1])
                    return;
                }
                if (type == 'c') //если подпись
                 {
                    task_id = jdata[1];
                    caption_field.value = jdata[2];
                    chain_id = jdata[3];
                    last_task_image_name = jdata[4];
                    is_human_caption = false;
                    blackout.style.display = "none";
                    return;
                }
                if (type == 'i') //если изображение
                 {
                    var image_1 = new Image();
                    image_1.onload = function () {
                        ctx_foreground.clearRect(0, 0, cW, cH); // очищаем верхний холст
                        ctx_foreground.drawImage(image_1, 0, 0, jdata[2], jdata[3], 0, 0, cW, cH);
                        push_action_to_stack(['u', cur_draw_ctx, image_1, jdata[2], jdata[3]]);
                        ctx_layer_1.clearRect(0, 0, lwW, lwH);
                        canvas_to_layer(cur_canvas, cur_ctx_layer);
                    };
                    original_image_buf = "data:image/png;base64," + jdata[1];
                    image_1.src = original_image_buf;
                    chain_id = jdata[4];
                    last_task_image_name = jdata[5];
                    blackout.style.display = "none";
                    modal.hide();
                    return;
                }
            };
        }
        else if (e.target.dataset.handler === "modalHandlerCancel") {
            modal.hide();
            //document.querySelector(".message").textContent = "Вы нажали на кнопку Отмена, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerParams") {
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerGenSD1") {
            if (caption_field.value == "") {
                gen_caption_for_image();
            }
            var full_prompt = caption_field.value + " " + style_field.value;
            gen_picture_by_promot(false, full_prompt);
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerGenSD2") {
            if (caption_field.value == "") {
                gen_caption_for_image();
            }
            var full_prompt = caption_field.value + " " + style_field.value;
            gen_picture_by_promot(true, full_prompt);
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.dismiss === "modal") {
            //document.querySelector(".message").textContent = "Вы закрыли модальное окно нажав на крестик или на область вне модального окна, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
    });
})();
var last_task_image_name = "drawing_0.png";
//ws.onopen = function(){alert("open");} 
ws.onclose = function () {
    alert("Соединение разорвано");
};
//ws.onerror = function(){alert("error");}
function check_data_before_sending() {
    var local_is_foreground_used = false;
    var local_is_background_used = false;
    var local_is_drawing_on_foreground = true;
    var local_is_drawing_on_background = true;
    var local_sure_on_foreground = true;
    var local_sure_on_background = true;
    var local_how_many_prims_on_foreground = 0;
    var local_how_many_dots_on_foreground = 0;
    var local_how_many_prims_on_background = 0;
    var local_how_many_dots_on_background = 0;
    for (var i = 0; i < pstack.length; i++) {
        switch (pstack[i][0]) {
            case 'p':
                if (pstack[i][1] == ctx_foreground) {
                    if (local_is_drawing_on_foreground == false && local_sure_on_foreground == true) {
                        local_sure_on_foreground = false;
                    }
                    local_is_drawing_on_foreground = true;
                    local_is_foreground_used = true;
                    local_how_many_prims_on_foreground++;
                    local_how_many_dots_on_foreground += pstack[i][2].length;
                }
                else {
                    if (local_is_drawing_on_background == false && local_sure_on_background == true) {
                        local_sure_on_background = false;
                    }
                    local_is_drawing_on_background = true;
                    local_is_background_used = true;
                    local_how_many_prims_on_background++;
                    local_how_many_dots_on_background += pstack[i][2].length;
                }
                break;
            case 'f':
                if (pstack[i][1] == ctx_foreground) {
                    if (local_is_drawing_on_foreground == false && local_sure_on_foreground == true) {
                        local_sure_on_foreground = false;
                    }
                    local_is_drawing_on_foreground = true;
                    local_is_foreground_used = true;
                    local_how_many_prims_on_foreground++;
                }
                else {
                    if (local_is_drawing_on_background == false && local_sure_on_background == true) {
                        local_sure_on_background = false;
                    }
                    local_is_drawing_on_background = true;
                    local_is_background_used = true;
                    local_how_many_prims_on_background++;
                }
                break;
            case 'd':
                local_is_foreground_used = false;
                local_is_background_used = false;
                local_is_drawing_on_foreground = true;
                local_is_drawing_on_background = true;
                local_sure_on_foreground = true;
                local_sure_on_background = true;
                local_how_many_prims_on_foreground = 0;
                local_how_many_dots_on_foreground = 0;
                local_how_many_prims_on_background = 0;
                local_how_many_dots_on_background = 0;
                break;
            case 'i':
                if (pstack[i][2] == "#fff") {
                    if (pstack[i][1] == ctx_foreground) {
                        local_is_foreground_used = false;
                        local_is_drawing_on_foreground = true;
                        local_sure_on_foreground = true;
                        local_how_many_prims_on_foreground = 0;
                        local_how_many_dots_on_foreground = 0;
                    }
                    else {
                        local_is_background_used = false;
                        local_is_drawing_on_background = true;
                        local_sure_on_background = true;
                        local_how_many_prims_on_background = 0;
                        local_how_many_dots_on_background = 0;
                    }
                }
                else {
                    if (pstack[i][1] == ctx_foreground) {
                        local_sure_on_foreground = true;
                        local_is_drawing_on_foreground = true;
                        local_is_foreground_used = true;
                        local_how_many_prims_on_foreground++;
                        local_how_many_prims_on_foreground = 0;
                        local_how_many_dots_on_foreground = 0;
                    }
                    else {
                        local_sure_on_background = false;
                        local_is_drawing_on_background = true;
                        local_is_background_used = true;
                        local_how_many_prims_on_background++;
                        local_how_many_prims_on_background = 0;
                        local_how_many_dots_on_background = 0;
                    }
                }
                break;
            case 'c':
                if (pstack[i][1] == ctx_foreground) {
                    local_is_foreground_used = false;
                    local_is_drawing_on_foreground = true;
                    local_sure_on_foreground = true;
                    local_how_many_prims_on_foreground = 0;
                    local_how_many_dots_on_foreground = 0;
                }
                else {
                    local_is_background_used = false;
                    local_is_drawing_on_background = true;
                    local_sure_on_background = true;
                    local_how_many_prims_on_background = 0;
                    local_how_many_dots_on_background = 0;
                }
                break;
            case 'u':
                if (pstack[i][1] == ctx_foreground) {
                    if (local_is_drawing_on_foreground == true && local_sure_on_foreground == true) {
                        local_sure_on_foreground = false;
                    }
                    local_is_drawing_on_foreground = false;
                    local_is_foreground_used = true;
                    local_how_many_prims_on_foreground = 0;
                    local_how_many_dots_on_foreground = 0;
                }
                else {
                    if (local_is_drawing_on_background == true && local_sure_on_background == true) {
                        local_sure_on_background = false;
                    }
                    local_is_drawing_on_background = false;
                    local_is_background_used = true;
                    local_how_many_prims_on_background = 0;
                    local_how_many_dots_on_background = 0;
                }
                break;
            default:
                break;
        }
    }
    var local_is_drawing;
    var local_sure;
    var local_how_many_prims;
    var local_how_many_dots;
    if (!local_is_foreground_used) {
        local_how_many_prims_on_foreground = 0;
        local_how_many_dots_on_foreground = 0;
        local_sure_on_foreground = true;
        local_is_drawing_on_foreground = true;
    }
    if (!local_is_background_used) {
        local_how_many_prims_on_background = 0;
        local_how_many_dots_on_background = 0;
        local_sure_on_background = true;
        local_is_drawing_on_background = true;
    }
    if (local_sure_on_foreground && local_sure_on_background) {
        local_sure = true;
    }
    else {
        local_sure = false;
    }
    if (local_is_drawing_on_foreground && !local_is_drawing_on_background) {
        local_is_drawing = true;
        local_sure = false;
    }
    else {
        if (!local_is_drawing_on_foreground && local_is_drawing_on_background) {
            local_is_drawing = false;
            local_sure = false;
        }
        else {
            if (local_is_drawing_on_foreground && local_is_drawing_on_background) {
                local_is_drawing = true;
            }
            else {
                local_is_drawing = false;
            }
        }
    }
    local_how_many_prims = local_how_many_prims_on_foreground + local_how_many_prims_on_background;
    local_how_many_dots = local_how_many_dots_on_foreground + local_how_many_dots_on_background;
    if (local_how_many_prims == 0) {
        local_is_drawing = false;
        local_sure = true;
    }
    return { local_is_foreground_used: local_is_foreground_used, local_is_background_used: local_is_background_used, local_is_drawing: local_is_drawing, local_sure: local_sure, local_how_many_prims: local_how_many_prims, local_how_many_dots: local_how_many_dots };
}
function push_action_to_stack(local_act) {
    var need_add = true;
    var pstack_length = pstack.length - 1;
    if (pstack_length != -1 && pstack[pstack_length][0] == local_act[0] && local_act[0] != 'p' && local_act[0] != 'u' && pstack[pstack_length] == local_act) {
        need_add = false;
    }
    if (need_add) {
        pstack.push(local_act);
        nstack = [];
    }
}
function gen_picture_by_promot(is_SD2, full_prompt) {
    blackout.style.display = "block";
    var local_type;
    var send_data;
    if (is_SD2) {
        local_type = "2";
    }
    else {
        local_type = "1";
    }
    if (is_human_caption) {
        var data = void 0;
        var background_data = void 0;
        if (original_image_buf == "") {
            if (is_foreground_visible) {
                data = canvas_foreground.toDataURL("imag/png");
            }
            else {
                if (is_background_visible) {
                    data = canvas_background.toDataURL("imag/png");
                }
                else {
                    alert("Выключены оба слоя, вы не можете отправить изображение");
                    return;
                }
            }
        }
        else {
            data = original_image_buf;
        }
        var _a = check_data_before_sending(), local_is_foreground_used = _a.local_is_foreground_used, local_is_background_used = _a.local_is_background_used, local_is_drawing = _a.local_is_drawing, local_sure = _a.local_sure, local_how_many_prims = _a.local_how_many_prims, local_how_many_dots = _a.local_how_many_dots;
        if (original_image_buf == "") {
            if (local_is_background_used && is_background_visible) {
                background_data = canvas_background.toDataURL("imag/png");
            }
            else {
                background_data = "";
            }
        }
        else {
            background_data = "";
        }
        if (chain_id != -1) {
            data = "";
            background_data = "";
        }
        send_data = JSON.stringify({
            "type": "hg" + local_type,
            "chain_id": chain_id,
            "task_id": task_id,
            "data": data,
            "backgroung": background_data,
            "prompt": full_prompt,
            "is_drawing": local_is_drawing,
            "sure": local_sure,
            "prims_count": local_how_many_prims,
            "dots_count": local_how_many_dots,
            "img_name": last_task_image_name
        });
        /*send_data = JSON.stringify({
            "type": "hg" + local_type, //рисунок
            "chain_id": chain_id, //id последнего звена цепочки
            "task_id": task_id, //id задания
            "data": data,
            "backgroung": background_data,
            "prompt": full_prompt, //подпись к изображению
            "img_name": last_task_image_name
        })*/
    }
    else {
        send_data = JSON.stringify({
            "type": 'g' + local_type,
            "chain_id": chain_id,
            "task_id": task_id,
            "img_name": last_task_image_name //имя последнего файла изображения
        });
    }
    ws.send(send_data);
}
function delete_background() {
    blackout.style.display = "block";
    var task_id = -1;
    var data = original_image_buf;
    if (chain_id != -1) {
        data = "";
    }
    var send_data_del = JSON.stringify({
        "type": 'b',
        "data": data,
        "chain_id": chain_id,
        "task_id": task_id,
        "img_name": last_task_image_name //имя последнего файла изображения
    });
    ws.send(send_data_del);
}
function upscale() {
    blackout.style.display = "block";
    var task_id = -1;
    var data = original_image_buf;
    if (chain_id != -1) {
        data = "";
    }
    var send_data_ups = JSON.stringify({
        "type": 'a',
        "data": data,
        "chain_id": chain_id,
        "task_id": task_id,
        "img_name": last_task_image_name //имя последнего файла изображения
    });
    ws.send(send_data_ups);
}
window.onresize = function () {
    W = document.documentElement.clientWidth;
    H = document.documentElement.clientHeight;
    fW_max = W * 0.8;
    fH_max = H * 0.8;
    fW_min = W * 0.1;
    fH_min = H * 0.1;
    cW = canvas_foreground.offsetWidth;
    cH = canvas_foreground.offsetHeight;
    Max_cW = cW;
    Max_cH = cH;
    cur_real_ratio = cH / cW;
    W_f = (W - cW) / 2 - l_width / 2 + 12;
    H_f = (H - cH) / 2 - l_width / 2 + 12;
    f_dW = d_frame.offsetWidth;
    f_dH = d_frame.offsetHeight;
    orig_f_dW = f_dW;
    orig_f_dH = f_dH;
    d_frame.width = f_dW;
    d_frame.height = f_dH;
    H_min = (H - f_dH) / 4;
    H_max = f_dH + H_min;
    W_min = (W - f_dW) / 4;
    W_max = f_dW + W_min;
    canvas_foreground.height = cH;
    canvas_foreground.width = cW;
    canvas_background.height = cH;
    canvas_background.width = cW;
    canvas_additional.height = cH;
    canvas_additional.width = cW;
    replay_actions(pstack);
};
var slider_range = document.querySelectorAll('input[type="range"]');
function update_slider() {
    for (var _i = 0, slider_range_2 = slider_range; _i < slider_range_2.length; _i++) {
        var e = slider_range_2[_i];
        e.style.setProperty('--value', e.value);
    }
}
var _loop_1 = function (e) {
    e.style.setProperty("--value", e.value);
    e.style.setProperty("--min", e.min == "" ? '0' : e.min);
    e.style.setProperty("--max", e.max == "" ? "100" : e.max);
    e.addEventListener("input", function () { return e.style.setProperty("--value", e.value); });
};
for (var _i = 0, slider_range_1 = slider_range; _i < slider_range_1.length; _i++) {
    var e = slider_range_1[_i];
    _loop_1(e);
}
ratio_field.onchange = function () {
    var t_v = ratio_field.value;
    var pos = t_v.indexOf(':');
    if (pos == -1) {
        ratio_field.value = cur_ratio_val;
        return;
    }
    if (t_v[0] == '≈') {
        t_v = t_v.slice(1);
        pos--;
    }
    var new_r_w_s = t_v.slice(0, pos);
    var new_r_h_s = t_v.slice(pos + 1);
    var new_r_w = parseInt(new_r_w_s);
    var new_r_h = parseInt(new_r_h_s);
    var new_dfw;
    var new_dfh;
    if (new_r_w / new_r_h > Max_cW / Max_cH) {
        new_dfh = Math.max(fH_min, (fW_max / new_r_w) * new_r_h);
        new_dfw = fW_max;
    }
    else {
        new_dfw = Math.max(fW_min, (fH_max / new_r_h) * new_r_w);
        new_dfh = fH_max;
    }
    fW_pred = f_dW;
    fH_pred = f_dH;
    change_drawfield_size(new_dfw, new_dfh);
    push_action_to_stack(['r', new_dfw, new_dfh, true]);
    replay_actions(pstack); //Повторная отрисовка с новым разрешением
    return get_visual_ratio(true, new_dfw, new_dfh);
};
function get_visual_ratio(abs, w, h) {
    var rat = [[2.0556, 21, 9], [1.5556, 16, 9], [1.1667, 4, 3], [0.875, 1, 1], [0.6562, 3, 4], [0.4955, 9, 16]];
    var cur_ratio = w / h;
    var v_w;
    var v_h;
    var cur_k;
    if (cur_ratio <= 0.4955) {
        v_w = 9;
        v_h = 21;
    }
    else {
        var r = void 0;
        for (var _i = 0, rat_1 = rat; _i < rat_1.length; _i++) {
            r = rat_1[_i];
            if (cur_ratio > r[0]) {
                v_w = r[1];
                v_h = r[2];
                break;
            }
        }
    }
    if (cur_ratio > v_w / v_h) {
        cur_k = h / v_h;
        v_w = Math.round(w / cur_k);
    }
    else {
        cur_k = w / v_w;
        v_h = Math.round(h / cur_k);
    }
    var res = (v_w).toString() + ":" + (v_h).toString();
    if (!abs) {
        res = "≈" + res;
    }
    return res;
}
// Установить ширину боковой панели на 250 пикселей (показать)
function openNav() {
    is_side_panel_open = true;
    side_panel_blackout.style.display = "block";
    spanel.style.width = "250px";
    spanel.style.border = "2px solid #4c4c4c";
    spanel.style.borderLeftStyle = "hidden";
    spanel.style.borderTopStyle = "hidden";
}
function closeNav_border() {
    spanel.style.borderLeftStyle = "hidden";
    spanel.style.borderRightStyle = "hidden";
}
function closeNav() {
    is_side_panel_open = false;
    side_panel_blackout.style.display = "none";
    spanel.style.width = "0";
    setTimeout(closeNav_border, 490);
}
var backBtn = document.getElementById("arrow_back");
backBtn.addEventListener("click", function () {
    undo_action();
});
var nextBtn = document.getElementById("arrow_next");
nextBtn.addEventListener("click", function () {
    repeat_action();
});
var initial_picker = $(document).ready(function () {
    var picker = $("#picker");
    var picker_fabritastic = picker.farbtastic("#color");
});
function hexDec(h) {
    var m = h.slice(1).match(/.{2}/g);
    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);
    return m[0] + m[1] + m[2];
}
var colourBtn = document.getElementById("palette");
colourBtn.style.background = "#000000";
var ok_clr = document.querySelector(".ok_clr_btn");
var ctype_clr_btn = document.querySelector(".ctype_clr_btn");
function handleclr_PointerMove() {
    on_clr_window = true;
    var ccv = cur_color.value;
    if (ccv == "#NaNNaNNaN") {
        ccv = "#" + colourBtn.style.background.split("(")[1].split(")")[0].split(",").map(function (x) {
            x = parseInt(x).toString(16);
            return (x.length == 1) ? "0" + x : x;
        }).join("");
        cur_color.value = ccv;
    }
    if (hexDec(ccv) > 382) {
        if (!old_btn_clr) {
            old_btn_clr = true;
            ok_clr_btn.style.color = "#000000";
            clrimg.style.filter = "invert(0)";
        }
    }
    else {
        if (old_btn_clr) {
            old_btn_clr = false;
            ok_clr_btn.style.color = "#fff";
            clrimg.style.filter = "invert(1)";
        }
    }
    if (is_clr_brash) {
        ctype_clr_btn.background = ccv;
    }
    ok_clr_btn.style.background = ccv;
    colourBtn.style.background = ccv;
}
function handlet_clr_Click() {
    if (is_clr_brash) {
        cur_brush_clr = cur_color.value;
        ctype_clr_btn.textContent = "Цвет кисти";
        cur_color.value = cur_background_clr;
        if (hexDec(cur_brush_clr) > 382) {
            ctype_clr_btn.style.color = "#000000";
            clrimg.style.filter = "invert(0)";
        }
        else {
            ctype_clr_btn.style.color = "#fff";
            clrimg.style.filter = "invert(1)";
        }
        ctype_clr_btn.style.background = cur_brush_clr;
        is_clr_brash = false;
    }
    else {
        ctype_clr_btn.textContent = "Цвет фона";
        var ccv = cur_brush_clr;
        new_background_clr = cur_color.value;
        cur_color.value = ccv;
        if (hexDec(new_background_clr) > 382) {
            ctype_clr_btn.style.color = "#000000";
            clrimg.style.filter = "invert(0)";
        }
        else {
            ctype_clr_btn.style.color = "#fff";
            clrimg.style.filter = "invert(1)";
        }
        ctype_clr_btn.style.background = new_background_clr;
        if (hexDec(ccv) > 382) {
            if (!old_btn_clr) {
                old_btn_clr = true;
                clrimg.style.filter = "invert(0)";
            }
        }
        else {
            if (old_btn_clr) {
                old_btn_clr = false;
                clrimg.style.filter = "invert(1)";
            }
        }
        ok_clr_btn.style.background = ccv;
        colourBtn.style.background = ccv;
        is_clr_brash = true;
    }
}
function close_clr_window() {
    clr_w.removeEventListener("pointermove", handleclr_PointerMove);
    ctype_clr_btn.removeEventListener("click", handlet_clr_Click);
    is_clr_window = false;
    var ccv = cur_color.value;
    if (ccv == "#NaNNaNNaN") {
        ccv = "#" + colourBtn.style.background.split("(")[1].split(")")[0].split(",").map(function (x) {
            x = parseInt(x).toString(16);
            return (x.length == 1) ? "0" + x : x;
        }).join("");
        cur_color.value = ccv;
    }
    if (!is_clr_brash) {
        new_background_clr = ccv;
        is_clr_brash = true;
    }
    else {
        cur_brush_clr = ccv;
    }
    if (cur_background_clr != new_background_clr) //почему-то не работает, из-за этого пришлось сделать костыль строчкой сверху. Убрать
     {
        push_action_to_stack(['i', ctx_background, new_background_clr]); //залить фон
        ctx_background.fillStyle = new_background_clr; //заливка фона
        ctx_background.fillRect(0, 0, cW, cH);
        canvas_to_layer(canvas_background, ctx_layer_2);
    }
    ctx_foreground.strokeStyle = cur_brush_clr;
    ctx_add.strokeStyle = cur_brush_clr;
    ctx_background.strokeStyle = cur_brush_clr;
    clr_w.style.display = "none";
}
var change_themeBtn = document.getElementById("change_theme");
var tmimg = document.getElementById("theme_mode_img");
var graphic_tabletBtn = document.getElementById("graphic_tablet");
var first_layer_visibilityBtn = document.getElementById("layer_1_visibility_button");
var first_layer_visibility_img = document.getElementById("layer_1_visibility_img");
var second_layer_visibilityBtn = document.getElementById("layer_2_visibility_button");
var second_layer_visibility_img = document.getElementById("layer_2_visibility_img");
var clear_first_layer_Btn = document.getElementById("clear_layer_1");
var clear_second_layer_Btn = document.getElementById("clear_layer_2");
change_themeBtn.addEventListener("click", function () {
    if (is_dark_mode) {
        tmimg.setAttribute("src", "dark mode.png");
        is_dark_mode = false;
        nav_panel.style.filter = "invert(0)";
        graphic_tabletBtn.style.filter = "invert(0)";
        spanel.style.filter = "invert(0)";
        spanel_openbtn.style.filter = "invert(0)";
        colourBtn.style.filter = "invert(0)";
        scale_field.style.filter = "invert(0)";
        layers_buttons.style.filter = "invert(0)";
        first_layer_visibilityBtn.style.filter = "invert(0)";
        second_layer_visibilityBtn.style.filter = "invert(0)";
        clear_first_layer_Btn.style.filter = "invert(0)";
        clear_second_layer_Btn.style.filter = "invert(0)";
        pencil_w.style.filter = "invert(0)";
        pencil_w.style.border = "2px solid #292929";
        eraser_w.style.filter = "invert(0)";
        eraser_w.style.border = "2px solid #292929";
        clr_w.style.backgroundColor = "#ffffff";
        clr_w.style.border = "2px solid #292929";
        body.style.backgroundColor = "#ffffff";
        div_layers.style.backgroundColor = "#ffffff";
        text_label_clr.style.color = "#000000";
        modal_header.style.filter = "invert(0)";
        modal_body.style.filter = "invert(0)";
        modal_footer.style.filter = "invert(0)";
        modal_header.style.backgroundColor = "#ffffff";
        modal_body.style.backgroundColor = "#ffffff";
        modal_footer.style.backgroundColor = "#ffffff";
        if (is_foreground_selected) {
            layer_1.style.border = "5px solid #000000";
        }
        else {
            layer_2.style.border = "5px solid #000000";
        }
    }
    else {
        tmimg.setAttribute("src", "light mode.png");
        is_dark_mode = true;
        nav_panel.style.filter = "invert(0.9)";
        graphic_tabletBtn.style.filter = "invert(0.9)";
        spanel.style.filter = "invert(0.9)";
        spanel_openbtn.style.filter = "invert(0.9)";
        colourBtn.style.filter = "invert(1.1)";
        scale_field.style.filter = "invert(0.9)";
        layers_buttons.style.filter = "invert(0.9)";
        first_layer_visibilityBtn.style.filter = "invert(0.9)";
        second_layer_visibilityBtn.style.filter = "invert(0.9)";
        clear_first_layer_Btn.style.filter = "invert(0.9)";
        clear_second_layer_Btn.style.filter = "invert(0.9)";
        pencil_w.style.filter = "invert(0.9)";
        pencil_w.style.border = "2px solid #aaaaaa";
        eraser_w.style.filter = "invert(0.9)";
        eraser_w.style.border = "2px solid #aaaaaa";
        clr_w.style.backgroundColor = "#303030";
        clr_w.style.border = "2px solid #aaaaaa";
        body.style.backgroundColor = "#303030";
        div_layers.style.backgroundColor = "#222222";
        text_label_clr.style.color = "#ffffff";
        modal_header.style.filter = "invert(0.9)";
        modal_body.style.filter = "invert(0.9)";
        modal_footer.style.filter = "invert(0.9)";
        modal_header.style.backgroundColor = "#cccccc";
        modal_body.style.backgroundColor = "#cccccc";
        modal_footer.style.backgroundColor = "#cccccc";
        if (is_foreground_selected) {
            layer_1.style.border = "5px solid #cccccc";
        }
        else {
            layer_2.style.border = "5px solid #cccccc";
        }
    }
});
var select_first_layerBtn = document.getElementById("layer_button_1");
select_first_layerBtn.addEventListener("click", function () {
    if (!is_foreground_selected) {
        if (is_dark_mode) {
            layer_1.style.border = "5px solid #cccccc";
        }
        else {
            layer_1.style.border = "5px solid #000000";
        }
        layer_2.style.border = "1px solid #707070";
        cur_draw_ctx = ctx_foreground;
        cur_canvas = canvas_foreground;
        cur_ctx_layer = ctx_layer_1;
        is_foreground_selected = true;
    }
});
var select_second_layerBtn = document.getElementById("layer_button_2");
select_second_layerBtn.addEventListener("click", function () {
    if (is_foreground_selected) {
        layer_1.style.border = "1px solid #707070";
        if (is_dark_mode) {
            layer_2.style.border = "5px solid #cccccc";
        }
        else {
            layer_2.style.border = "5px solid #000000";
        }
        cur_draw_ctx = ctx_background;
        cur_canvas = canvas_background;
        cur_ctx_layer = ctx_layer_2;
        is_foreground_selected = false;
    }
});
first_layer_visibilityBtn.addEventListener("click", function () {
    if (is_foreground_visible) {
        is_foreground_visible = false;
        canvas_foreground.style.display = "none";
        first_layer_visibility_img.setAttribute("src", "visibility_off.png");
    }
    else {
        is_foreground_visible = true;
        canvas_foreground.style.display = "block";
        first_layer_visibility_img.setAttribute("src", "visibility_on.png");
    }
});
clear_first_layer_Btn.addEventListener("click", function () {
    ctx_foreground.clearRect(0, 0, cW, cH);
    ctx_layer_1.clearRect(0, 0, lwW, lwH);
    push_action_to_stack(['c', ctx_foreground]);
});
second_layer_visibilityBtn.addEventListener("click", function () {
    if (is_background_visible) {
        is_background_visible = false;
        canvas_background.style.display = "none";
        second_layer_visibility_img.setAttribute("src", "visibility_off.png");
    }
    else {
        is_background_visible = true;
        canvas_background.style.display = "block";
        second_layer_visibility_img.setAttribute("src", "visibility_on.png");
    }
});
clear_second_layer_Btn.addEventListener("click", function () {
    ctx_background.clearRect(0, 0, cW, cH);
    ctx_layer_2.clearRect(0, 0, lwW, lwH);
    push_action_to_stack(['c', ctx_background]);
});
var merge_layersBtn = document.getElementById("merge_layers");
function merge_layers_in_stack(stack, local_ctx) {
    var substack_1 = [];
    var substack_2 = [];
    var is_changed_stack = [];
    var another_ctx;
    var is_foreground;
    if (local_ctx == ctx_foreground) {
        another_ctx = ctx_background;
        is_foreground = true;
    }
    else {
        another_ctx = ctx_foreground;
        is_foreground = false;
    }
    for (var i = 0; i < stack.length; i++) {
        if (id_list.includes(stack[i][0]) && stack[i][1] == another_ctx) {
            stack[i][1] = local_ctx;
            substack_1.push(stack[i]);
            is_changed_stack.push(true);
        }
        else {
            substack_2.push(stack[i]);
            is_changed_stack.push(false);
        }
    }
    if (is_foreground) {
        if (substack_1.length == 0) {
            is_changed_stack = [];
            return { stack: stack, is_changed_stack: is_changed_stack };
        }
        substack_1 = substack_1.concat(substack_2);
        return { substack_1: substack_1, is_changed_stack: is_changed_stack };
    }
    else {
        if (substack_1.length == 0) {
            is_changed_stack = [];
            return { stack: stack, is_changed_stack: is_changed_stack };
        }
        substack_2 = substack_2.concat(substack_1);
        return { substack_2: substack_2, is_changed_stack: is_changed_stack };
    }
}
function unmerge_layers_in_stack(stack, local_ctx, local_ics) {
    if (local_ics.length == 0) {
        return stack;
    }
    var substack_1 = [];
    var substack_2 = [];
    var another_ctx;
    var is_foreground;
    if (local_ctx == ctx_foreground) {
        another_ctx = ctx_background;
        is_foreground = true;
    }
    else {
        another_ctx = ctx_foreground;
        is_foreground = false;
    }
    for (var i = 0; i < stack.length; i++) {
        if (local_ics[i] == true) {
            stack[i][1] = another_ctx;
            substack_1.push(stack[i]);
        }
        else {
            substack_2.push(stack[i]);
        }
    }
    if (is_foreground) {
        return substack_1.concat(substack_2);
    }
    else {
        return substack_2.concat(substack_1);
    }
}
function unmerge_layers(local_ctx, local_ics_1, local_ics_2) {
    pstack = unmerge_layers_in_stack(pstack, local_ctx, local_ics_1);
    nstack = unmerge_layers_in_stack(nstack, local_ctx, local_ics_2);
    replay_actions(pstack);
    ctx_layer_1.clearRect(0, 0, lwW, lwH);
    canvas_to_layer(canvas_foreground, ctx_layer_1);
    ctx_layer_2.clearRect(0, 0, lwW, lwH);
    canvas_to_layer(canvas_background, ctx_layer_2);
}
function merge_layers(local_draw_ctx) {
    var _a = merge_layers_in_stack(pstack, local_draw_ctx), local_stack_1 = _a.local_stack_1, is_changed_stack_1 = _a.is_changed_stack_1;
    pstack = local_stack_1;
    if (is_changed_stack_1.length == 0) {
        return [[], []];
    }
    var _b = merge_layers_in_stack(nstack, local_draw_ctx), local_stack_2 = _b.local_stack_2, is_changed_stack_2 = _b.is_changed_stack_2;
    nstack = local_stack_2;
    replay_actions(pstack);
    if (local_draw_ctx == ctx_foreground) {
        ctx_layer_2.clearRect(0, 0, lwW, lwH);
        canvas_to_layer(canvas_foreground, ctx_layer_1);
    }
    else {
        ctx_layer_1.clearRect(0, 0, lwW, lwH);
        canvas_to_layer(canvas_background, ctx_layer_2);
    }
    return [is_changed_stack_1, is_changed_stack_2];
}
merge_layersBtn.addEventListener("click", function () {
    var is_changed_stack = [];
    is_changed_stack = merge_layers(cur_draw_ctx);
    if (is_changed_stack[0].length == 0 && is_changed_stack[1].length == 0) {
        return;
    }
    push_action_to_stack(['m', cur_draw_ctx, is_changed_stack[0], is_changed_stack[1]]);
});
var swap_layersBtn = document.getElementById("swap_layers");
function swap_layers_in_stack(stack) {
    var is_swapped = false;
    for (var i = 0; i < stack.length; i++) {
        if (id_list.includes(stack[i][0])) {
            is_swapped = true;
            if (stack[i][1] == ctx_foreground) {
                stack[i][1] = ctx_background;
            }
            else {
                stack[i][1] = ctx_foreground;
            }
        }
    }
    return [stack, is_swapped];
}
function swap_layers() {
    var input_value;
    input_value = swap_layers_in_stack(pstack);
    pstack = input_value[0];
    if (input_value[1] == false) {
        return;
    }
    input_value = swap_layers_in_stack(nstack);
    nstack = input_value[0];
    replay_actions(pstack);
    ctx_layer_1.clearRect(0, 0, lwW, lwH);
    canvas_to_layer(canvas_foreground, ctx_layer_1);
    ctx_layer_2.clearRect(0, 0, lwW, lwH);
    canvas_to_layer(canvas_background, ctx_layer_2);
}
swap_layersBtn.addEventListener("click", function () {
    swap_layers();
    push_action_to_stack(['s']);
});
graphic_tabletBtn.addEventListener("click", function () {
    if (graphic_tablet_mode) {
        graphic_tabletBtn.style.border = "1px solid #707070";
        graphic_tablet_mode = false;
    }
    else {
        graphic_tabletBtn.style.border = "5px solid #000000";
        graphic_tablet_mode = true;
    }
});
colourBtn.addEventListener("click", function () {
    if (is_pencil_window || is_eraser_window) {
        pencil_w.style.display = "none";
        is_pencil_window = false;
        eraser_w.style.display = "none";
        is_eraser_window = false;
    }
    cur_color.value = cur_brush_clr;
    if (is_clr_window == false) {
        clr_w.style.display = "block";
        update_slider();
        is_clr_window = true;
        clr_w.addEventListener("pointermove", handleclr_PointerMove);
        ctype_clr_btn.addEventListener("click", handlet_clr_Click);
        ok_clr.addEventListener("click", function () {
            cursor_type = 3;
            cursor_image.setAttribute("src", cur_tool[2]);
            cursor.style.left = (cX + 7.5) + "px";
            cursor.style.top = (cY + 7.5) + "px";
            cursor.style.display = "block";
            close_clr_window();
        }, {
            once: true
        });
    }
    else {
        close_clr_window();
    }
});
function change_thickness(flag) {
    var t_v;
    if (flag) {
        t_v = thickness_field.value - 1;
    }
    else {
        t_v = e_thickness_field.value - 1;
    }
    var real_t_v = Math.min(100, Math.max(0, t_v));
    if (t_v != real_t_v) {
        t_v = real_t_v;
    }
    thickness_field.value = t_v + 1;
    e_thickness_field.value = t_v + 1;
    thickness_slider.value = t_v + 1;
    e_thickness_slider.value = t_v + 1;
    var thickness_k = t_v * t_v * 0.0001; //коэффициент, чтобы толщина не увеличивалась так резко, сейчас это квадрат
    l_width = 1 + Math.max(cW, cH) * thickness_k;
    W_f = (W - cW) / 2 - l_width / 2 + 12;
    H_f = (H - cH) / 2 - l_width / 2 + 12;
    ctx_foreground.lineWidth = l_width;
    ctx_add.lineWidth = l_width;
    ctx_background.lineWidth = l_width;
}
thickness_slider.onchange = function () {
    change_thickness(true);
};
thickness_field.onchange = function () {
    change_thickness(true);
};
e_thickness_slider.onchange = function () {
    change_thickness(false);
};
e_thickness_field.onchange = function () {
    change_thickness(false);
};
function change_smoothing() {
    cur_smoothing = smoothing_field.value;
    var real_s_v = Math.min(100, Math.max(0, cur_smoothing));
    if (cur_smoothing != real_s_v) {
        cur_smoothing = real_s_v;
        smoothing_field.value = cur_smoothing;
    }
    k_smooth = 0;
    var step = 1.0 / cur_smoothing;
    for (var t = 0; t < 1 + step; t += step) //очень странный костыль, исправлю позже
     {
        t = Math.min(1, t);
        k_smooth++;
    }
}
smoothing_slider.onchange = function () {
    change_smoothing();
};
smoothing_field.onchange = function () {
    change_smoothing();
};
var setpencilBtn = document.getElementById("pencil");
setpencilBtn.style.border = "5px solid #000000";
var cur_tool = ['k', setpencilBtn, "aero_pen.cur"]; //текущий инструмент (карандаш)
setpencilBtn.addEventListener("click", function () {
    if (is_clr_window) {
        close_clr_window();
    }
    if (cur_tool[0] != 'k') {
        if (cur_tool[0] == 'e') {
            change_thickness(false);
            eraser_w.style.display = "none";
            is_eraser_window = false;
        }
        is_pencil_window = true;
        pencil_w.style.display = "block";
        update_slider();
        setpencilBtn.style.border = "5px solid #000000";
        cur_tool[1].style.border = "1px solid #707070";
        cur_tool = ['k', setpencilBtn, "aero_pen.cur"];
    }
    else {
        if (is_pencil_window) {
            change_thickness(true);
            pencil_w.style.display = "none";
            is_pencil_window = false;
        }
        else {
            pencil_w.style.display = "block";
            update_slider();
            is_pencil_window = true;
        }
    }
});
var seteraserBtn = document.getElementById("eraser");
seteraserBtn.addEventListener("click", function () {
    if (is_clr_window) {
        close_clr_window();
    }
    if (cur_tool[0] != 'e') {
        if (cur_tool[0] == 'k') {
            change_thickness(true);
            pencil_w.style.display = "none";
            is_pencil_window = false;
        }
        is_eraser_window = true;
        eraser_w.style.display = "block";
        update_slider();
        seteraserBtn.style.border = "5px solid #000000";
        cur_tool[1].style.border = "1px solid #707070";
        cur_tool = ['e', seteraserBtn, "aero_eraser.png"];
    }
    else {
        if (is_eraser_window) {
            change_thickness(false);
            eraser_w.style.display = "none";
            is_eraser_window = false;
        }
        else {
            eraser_w.style.display = "block";
            update_slider();
            is_eraser_window = true;
        }
    }
});
var setbucketBtn = document.getElementById("bucket");
setbucketBtn.addEventListener("click", function () {
    if (cur_tool[0] != 'b') {
        if (cur_tool[0] == 'k' || cur_tool[0] == 'e') {
            pencil_w.style.display = "none";
            is_pencil_window = false;
            eraser_w.style.display = "none";
            is_eraser_window = false;
            if (cur_tool[0] == 'k') {
                change_thickness(true);
            }
            else {
                change_thickness(false);
            }
            pencil_w.style.display = "none";
        }
        setbucketBtn.style.border = "5px solid #000000";
        cur_tool[1].style.border = "1px solid #707070";
        cur_tool = ['b', setbucketBtn, "aero_bucket.png"];
    }
});
var setpipetteBtn = document.getElementById("pipette");
setpipetteBtn.addEventListener("click", function () {
    if (cur_tool[0] != 'p') {
        if (cur_tool[0] == 'k' || cur_tool[0] == 'e') {
            pencil_w.style.display = "none";
            is_pencil_window = false;
            eraser_w.style.display = "none";
            is_eraser_window = false;
            if (cur_tool[0] == 'k') {
                change_thickness(true);
            }
            else {
                change_thickness(false);
            }
            pencil_w.style.display = "none";
        }
        setpipetteBtn.style.border = "5px solid #000000";
        cur_tool[1].style.border = "1px solid #707070";
        cur_tool = ['p', setpipetteBtn, "aero_pipette.png"];
    }
});
function full_clear_drawfield() {
    original_image_buf = "";
    cur_background_clr = "#fff";
    ctx_background.fillStyle = cur_background_clr;
    ctx_foreground.clearRect(0, 0, cW, cH);
    ctx_background.clearRect(0, 0, cW, cH);
}
function clear_drawfield() {
    original_image_buf = "";
    cur_background_clr = "#fff";
    ctx_background.fillStyle = cur_background_clr;
    ctx_foreground.clearRect(0, 0, cW, cH);
    ctx_background.fillRect(0, 0, cW, cH);
}
var clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {
    clear_drawfield();
    push_action_to_stack(['d']); //тип - очистка экрана
});
var mhf = document.getElementById("my_hidden_file");
var uploadBtn = document.getElementById("upload");
uploadBtn.addEventListener("click", function () {
    if (!is_first_upload_btn_click) //костыль чтобы кнопка не срабатывала дважды
     {
        is_first_upload_btn_click = true;
        return;
    }
    is_first_upload_btn_click = false;
    mhf.click();
    mhf.addEventListener("change", function readImage() {
        if (!this.files || !this.files[0])
            return;
        chain_id = -1;
        var FR = new FileReader();
        FR.addEventListener("load", function (evt) {
            var new_img_w;
            var new_img_h;
            var img = new Image();
            img.addEventListener("load", function () {
                var img_w = img.width;
                var img_h = img.height;
                var new_dfw;
                var new_dfh;
                var is_drawfield_used = false;
                var ps_size = pstack.length;
                var x_paste_pos = 0;
                var y_paste_pos = 0;
                var i;
                if (ps_size != 0 && pstack[0] == 'i', ctx_background, "#fff") {
                    i = 1;
                }
                else {
                    i = 0;
                }
                var local_id_list = ['r', 'p', 'i', 'u', 'f'];
                for (i; i < ps_size; i++) {
                    if (local_id_list.includes(pstack[i][0])) {
                        is_drawfield_used = true;
                        break;
                    }
                }
                if (is_drawfield_used) {
                    if (img_w / img_h > cW / cH) {
                        new_img_w = cW;
                        new_img_h = (cW / img_w) * img_h;
                        y_paste_pos = (cH - new_img_h) / 2;
                    }
                    else {
                        new_img_h = cH;
                        new_img_w = (cH / img_h) * img_w;
                        x_paste_pos = (cW - new_img_w) / 2;
                    }
                    cur_draw_ctx.clearRect(0, 0, cW, cH); //очищаем текущий слой
                }
                else {
                    if (img_w / img_h > Max_cW / Max_cH) {
                        new_dfw = fW_max;
                        new_dfh = (fW_max / img_w) * img_h;
                        new_img_w = Max_cW;
                        new_img_h = (Max_cW / img_w) * img_h;
                    }
                    else {
                        new_dfh = fH_max;
                        new_dfw = (fH_max / img_h) * img_w;
                        new_img_h = Max_cH;
                        new_img_w = (Max_cH / img_h) * img_w;
                    }
                    change_drawfield_size(new_dfw, new_dfh);
                    cur_ratio_val = get_visual_ratio(false, cW, cH);
                    ratio_field.value = cur_ratio_val; //устанавливаем соотношение сторон
                    replay_actions(pstack); //воспроизводим действия
                    fW_pred = f_dW;
                    fH_pred = f_dH;
                    push_action_to_stack(['r', new_dfw, new_dfh, false]);
                }
                cur_draw_ctx.drawImage(img, 0, 0, img_w, img_h, x_paste_pos, y_paste_pos, cW - x_paste_pos * 2, cH - y_paste_pos * 2);
                push_action_to_stack(['u', cur_draw_ctx, img, img_w, img_h, x_paste_pos, y_paste_pos]);
                original_image_buf = img.src;
                cur_ctx_layer.clearRect(0, 0, lwW, lwH);
                canvas_to_layer(cur_canvas, cur_ctx_layer);
            }, {
                once: true
            });
            original_image_buf = evt.target.result;
            img.src = original_image_buf;
        }, {
            once: true
        });
        FR.readAsDataURL(this.files[0]);
    }, {
        once: true
    });
});
var saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", function () {
    var image = new Image();
    if (original_image_buf == "") {
        if (!is_foreground_visible) {
            ctx_foreground.clearRect(0, 0, cW, cH);
        }
        if (!is_background_visible) {
            ctx_background.clearRect(0, 0, cW, cH);
        }
        image.onload = function () {
            var a = document.createElement("a");
            ctx_background.drawImage(image, 0, 0, image.width, image.height, 0, 0, cW, cH);
            a.href = canvas_background.toDataURL("imag/png");
            a.download = "sketch.png";
            a.click();
            replay_actions(pstack);
            canvas_to_layer(canvas_foreground, ctx_layer_1);
            canvas_to_layer(canvas_background, ctx_layer_2);
        };
        image.src = canvas_foreground.toDataURL();
    }
    else {
        var a = document.createElement("a");
        a.href = original_image_buf;
        a.download = "sketch.png";
        a.click();
    }
});
function gen_caption_for_image() {
    blackout.style.display = "block";
    var send_data;
    var data;
    var background_data;
    if (original_image_buf == "") {
        if (is_foreground_visible) {
            data = canvas_foreground.toDataURL("imag/png");
        }
        else {
            if (is_background_visible) {
                data = canvas_background.toDataURL("imag/png");
            }
            else {
                alert("Выключены оба слоя, вы не можете отправить изображение");
                return;
            }
        }
    }
    else {
        data = original_image_buf;
    }
    var _a = check_data_before_sending(), local_is_foreground_used = _a.local_is_foreground_used, local_is_background_used = _a.local_is_background_used, local_is_drawing = _a.local_is_drawing, local_sure = _a.local_sure, local_how_many_prims = _a.local_how_many_prims, local_how_many_dots = _a.local_how_many_dots;
    if (local_is_background_used && is_background_visible) {
        background_data = canvas_background.toDataURL("imag/png");
    }
    else {
        background_data = "";
    }
    send_data = JSON.stringify({
        "type": 'd',
        "chain_id": chain_id,
        "task_id": task_id,
        "data": data,
        "backgroung": background_data,
        "is_drawing": local_is_drawing,
        "sure": local_sure,
        "prims_count": local_how_many_prims,
        "dots_count": local_how_many_dots,
        "img_name": last_task_image_name
    });
    /*
    send_data = JSON.stringify({
        "type": 'd', //просьба сгенерировать подпись для изображения
        "chain_id": chain_id, //id последнего звена цепочки
        "task_id": task_id, //id задания
        "data": data,
        "backgroung": background_data,
        "img_name": last_task_image_name
    })*/
    ws.send(send_data);
}
document.addEventListener("pointerenter", function (e) {
    var cX = e.clientX;
    var cY = e.clientY;
    cursor.style.left = (cX + 7.5) + "px";
    cursor.style.top = (cY + 7.5) + "px";
}, { once: true });
function replay_action(act, k_X, k_Y, fW_pred, fH_pred) {
    var act_type = act[0];
    switch (act_type) {
        case 'p': //если это примитив
            var prim = act[2];
            act[1].strokeStyle = act[3];
            act[1].globalCompositeOperation = act[4];
            act[1].beginPath();
            for (var i = 1; i < prim.length; i++) {
                act[1].lineWidth = prim[i][2];
                act[1].moveTo(prim[i - 1][0] / k_X, prim[i - 1][1] / k_Y);
                act[1].lineTo(prim[i][0] / k_X, prim[i][1] / k_Y);
            }
            act[1].stroke();
            act[1].globalCompositeOperation = "source-over";
            break;
        case 'd': //если очистка экрана
            cur_background_clr = "#fff";
            ctx_background.fillStyle = cur_background_clr;
            ctx_background.fillRect(0, 0, cW, cH);
            ctx_foreground.clearRect(0, 0, cW, cH);
            break;
        case 'r': //если изменение размеров экрана
            k_X = (k_X * act[1]) / fW_pred;
            k_Y = (k_Y * act[2]) / fH_pred;
            fW_pred = act[1];
            fH_pred = act[2];
            break;
        case 'i': //если заливка слоя целиком
            act[1].fillStyle = act[2];
            act[1].fillRect(0, 0, cW, cH);
            break;
        case 'u': //если добавление изображения с ПК
            act[1].clearRect(0, 0, cW, cH); //очищаем нужный слой
            act[1].drawImage(act[2], 0, 0, act[3], act[4], act[5], act[6], cW - act[5] * 2, cH - act[6] * 2);
            break;
        case 'f': //если заливка
            floodFill(act[1], act[2], act[3], act[4]);
            break;
        case 'c': //если очистка одного слоя
            act[1].clearRect(0, 0, cW, cH);
            break;
        default:
            break;
    }
    return [k_X, k_Y, fW_pred, fH_pred];
}
function replay_actions(cur_pstack) {
    full_clear_drawfield();
    var change_bash_clr = false;
    var new_bash_clr;
    var k_X = fW_pred / f_dW;
    var k_Y = fH_pred / f_dH;
    var cur_thickness = 1;
    ctx_foreground.lineWidth = cur_thickness;
    ctx_background.lineWidth = cur_thickness;
    ctx_background.strokeStyle = "#000000";
    ctx_foreground.lineCap = "round";
    ctx_foreground.lineJoin = "round";
    ctx_add.lineCap = "round";
    ctx_add.lineJoin = "round";
    ctx_background.lineCap = "round";
    ctx_background.lineJoin = "round";
    var elem;
    for (var _i = 0, cur_pstack_1 = cur_pstack; _i < cur_pstack_1.length; _i++) {
        var act = cur_pstack_1[_i];
        elem = replay_action(act, k_X, k_Y, fW_pred, fH_pred);
        k_X = elem[0];
        k_Y = elem[1];
        fW_pred = elem[2];
        fH_pred = elem[3];
    }
    ctx_add.strokeStyle = cur_brush_clr;
    ctx_foreground.strokeStyle = cur_brush_clr;
    ctx_background.strokeStyle = cur_brush_clr;
    ctx_background.fillStyle = cur_brush_clr;
    ctx_add.lineWidth = l_width;
    ctx_foreground.lineWidth = l_width;
    ctx_background.lineWidth = l_width;
    if (change_bash_clr) {
        cur_brush_clr = new_bash_clr;
    }
}
function canvas_to_layer(local_canvas, local_layer) {
    var image_layer = new Image();
    image_layer.onload = function () {
        local_layer.drawImage(image_layer, 0, 0, cW, cH, 0, 0, lwW, lwH);
    };
    image_layer.src = local_canvas.toDataURL();
}
function undo_action() {
    var pstack_size = pstack.length;
    if (pstack_size != 0) {
        var cur_act = pstack.pop();
        var is_r = false;
        if (id_list.includes(cur_act[0])) {
            if (cur_act[0] == 'r') {
                is_r = true;
            }
        }
        pstack_size--;
        nstack.push(cur_act);
        if (cur_act[0] == 's') {
            swap_layers();
            return;
        }
        else {
            if (cur_act[0] == 'm') {
                unmerge_layers(cur_act[1], cur_act[2], cur_act[3]);
                return;
            }
        }
        if (is_r) {
            var buf_r_elem = ['r', fW_max, fH_max, false];
            for (var i = pstack_size - 1; i > -1; i--) {
                if (pstack[i][0] == 'r') {
                    buf_r_elem = pstack[i];
                    break;
                }
            }
            change_drawfield_size(buf_r_elem[1], buf_r_elem[2]);
            cur_ratio_val = get_visual_ratio(buf_r_elem[3], cW, cH);
            ratio_field.value = cur_ratio_val;
        }
        replay_actions(pstack);
        ctx_layer_1.clearRect(0, 0, lwW, lwH);
        canvas_to_layer(canvas_foreground, ctx_layer_1);
        ctx_layer_2.clearRect(0, 0, lwW, lwH);
        canvas_to_layer(canvas_background, ctx_layer_2);
    }
}
function repeat_action() {
    if (nstack.length != 0) {
        var cur_act = nstack.pop();
        var cur_acts = [];
        var local_cur_ctx_layer = cur_ctx_layer;
        var local_cur_canvas = cur_canvas;
        if (id_list.includes(cur_act[0])) {
            if (cur_act[1] == ctx_foreground) {
                local_cur_ctx_layer = ctx_layer_1;
                local_cur_canvas = canvas_foreground;
            }
            else {
                local_cur_ctx_layer = ctx_layer_2;
                local_cur_canvas = canvas_background;
            }
        }
        cur_acts.push(cur_act);
        pstack.push(cur_act);
        if (cur_act[0] == 's') {
            swap_layers();
            return;
        }
        else {
            if (cur_act[0] == 'm') {
                merge_layers(cur_act[1]);
                return;
            }
        }
        if (cur_act[0] == 'r') {
            change_drawfield_size(cur_act[1], cur_act[2]);
            cur_ratio_val = get_visual_ratio(cur_act[3], cW, cH);
            ratio_field.value = cur_ratio_val;
        }
        replay_action(cur_act, orig_f_dW / f_dW, orig_f_dH / f_dH, orig_f_dW, orig_f_dH);
        canvas_to_layer(local_cur_canvas, local_cur_ctx_layer);
    }
}
document.addEventListener("keydown", function (event) {
    if (is_modal_open || is_side_panel_open) {
        return;
    }
    switch (event.code) {
        case "KeyT": //Режим графического планшета
            if (graphic_tabletBtn.style.display == "block") {
                graphic_tabletBtn.click();
            }
            return;
        case "KeyP": //Палитра (выбор цвета)
            colourBtn.click();
            return;
        case "KeyB": //Карандаш
            setpencilBtn.click();
            return;
        case "KeyE": //Ластик
            seteraserBtn.click();
            return;
        case "KeyG": //Заливка
            setbucketBtn.click();
            return;
        case "KeyI": //Пипетка
            setpipetteBtn.click();
            return;
        case "Delete": //Очистить всё
            clearBtn.click();
            return;
        case "KeyO": //Добавить изображение с ПК
            uploadBtn.click();
            return;
        case "KeyD": //Сохранить изображение на ПК
            saveBtn.click();
            return;
        case "KeyR": //Открыть окно генерации
            generateBtn.click();
            return;
        case "KeyС": //очистить текущий слой
            if (is_foreground_selected) {
                clear_first_layer_Btn.click();
            }
            else {
                clear_second_layer_Btn.click();
            }
            return;
        case "KeyS": //поменять слои местами
            swap_layersBtn.click();
            return;
        case "KeyM": //объединить слои
            merge_layersBtn.click();
            return;
        default:
            if (event.shiftKey) {
                is_shift_on = true;
                return;
            }
            if (event.ctrlKey) {
                switch (event.code) {
                    case "KeyZ": //отмена последнего действия
                        undo_action();
                        return;
                    case "KeyX": //вернуть последнее отменённое действие
                        repeat_action();
                        return;
                }
            }
    }
}, false);
document.addEventListener("keyup", function (event) {
    if (event.code.slice(0, 5) == "Shift") {
        if (draw) {
            ctx_add.clearRect(0, 0, cW, cH);
            drawLines(cur_draw_ctx, curprim);
            var cpl = curprim.length - 1;
            prevX = curprim[cpl][0];
            prevY = curprim[cpl][1];
        }
        is_shift_on = false;
    }
}, false);
canvas_additional.addEventListener("pointerdown", function (e) {
    if (is_foreground_selected) {
        if (!is_foreground_visible) {
            if (!is_background_visible) {
                is_foreground_visible = true;
                canvas_foreground.style.display = "block";
                first_layer_visibility_img.setAttribute("src", "visibility_on.png");
            }
            else {
                layer_1.style.border = "1px solid #707070";
                layer_2.style.border = "5px solid #000000";
                cur_draw_ctx = ctx_background;
                cur_canvas = canvas_layer_2;
                cur_ctx_layer = canvas_background;
                is_foreground_selected = false;
            }
        }
    }
    else {
        if (!is_background_visible) {
            if (!is_foreground_visible) {
                is_foreground_visible = true;
                canvas_foreground.style.display = "block";
                first_layer_visibility_img.setAttribute("src", "visibility_on.png");
                layer_1.style.border = "5px solid #000000";
                layer_2.style.border = "1px solid #707070";
                cur_draw_ctx = ctx_foreground;
                cur_canvas = canvas_layer_1;
                cur_ctx_layer = canvas_foreground;
                is_foreground_selected = true;
            }
            else {
                layer_1.style.border = "5px solid #000000";
                layer_2.style.border = "1px solid #707070";
                cur_draw_ctx = ctx_foreground;
                cur_canvas = canvas_layer_1;
                cur_ctx_layer = canvas_foreground;
                is_foreground_selected = true;
            }
        }
    }
    var cur_x = e.clientX;
    var cur_y = e.clientY;
    prevX = cur_x - W_f;
    prevY = cur_y - H_f;
    draw = true;
    enddraw = false;
    if (is_clr_window == true) {
        close_clr_window();
    }
    else {
        original_image_buf == ""; //очистить буфер изображения
    }
});
function rgbToHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}
function rgbaToHex(r, g, b, a) {
    return ((r << 24) | (g << 16) | (b << 8) | a).toString(16);
}
function getPixel(pixelData, x, y) {
    if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
        return -1;
    }
    else {
        return pixelData.data[y * pixelData.width + x];
    }
}
function addSpan(spansToCheck, left, right, y, direction) {
    spansToCheck.push({ left: left, right: right, y: y, direction: direction });
}
function checkSpan(pixelData, targetColor, spansToCheck, left, right, y, direction) {
    var inSpan = false;
    var start;
    var x;
    for (x = left; x < right; ++x) {
        var color = getPixel(pixelData, x, y);
        if (color === targetColor) {
            if (!inSpan) {
                inSpan = true;
                start = x;
            }
        }
        else {
            if (inSpan) {
                inSpan = false;
                addSpan(spansToCheck, start, x - 1, y, direction);
            }
        }
    }
    if (inSpan) {
        inSpan = false;
        addSpan(spansToCheck, start, x - 1, y, direction);
    }
}
function floodFill(local_ctx, x, y, fillColor) {
    var dex_clr = parseInt("FF" + fillColor.slice(6, 8) + fillColor.slice(4, 6) + fillColor.slice(2, 4), 16);
    var imageData = local_ctx.getImageData(0, 0, local_ctx.canvas.width, local_ctx.canvas.height);
    var pixelData = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
    };
    var targetColor = getPixel(pixelData, x, y);
    if (targetColor !== fillColor) {
        var spansToCheck = [];
        addSpan(spansToCheck, x, x, y, 0);
        var iter_max = Math.round(cH) * 2;
        var iter = 0;
        while (spansToCheck.length > 0 && iter <= iter_max) {
            iter++;
            var _a = spansToCheck.pop(), left = _a.left, right = _a.right, y_1 = _a.y, direction = _a.direction;
            var l = left;
            var iter_l_max = left - cH / 2;
            while (true) {
                --l;
                var color = getPixel(pixelData, l, y_1);
                if (color !== targetColor || l < iter_l_max) {
                    break;
                }
            }
            ++l;
            var r = right;
            var iter_r_max = right + cW / 2;
            while (true) {
                ++r;
                var color = getPixel(pixelData, r, y_1);
                if (color !== targetColor || r > iter_r_max) {
                    break;
                }
            }
            var lineOffset = y_1 * pixelData.width;
            pixelData.data.fill(dex_clr, lineOffset + l, lineOffset + r);
            if (direction <= 0) {
                checkSpan(pixelData, targetColor, spansToCheck, l, r, y_1 - 1, -1);
            }
            else {
                checkSpan(pixelData, targetColor, spansToCheck, l, left, y_1 - 1, -1);
                checkSpan(pixelData, targetColor, spansToCheck, right, r, y_1 - 1, -1);
            }
            if (direction >= 0) {
                checkSpan(pixelData, targetColor, spansToCheck, l, r, y_1 + 1, +1);
            }
            else {
                checkSpan(pixelData, targetColor, spansToCheck, l, left, y_1 + 1, +1);
                checkSpan(pixelData, targetColor, spansToCheck, right, r, y_1 + 1, +1);
            }
        }
        local_ctx.putImageData(imageData, 0, 0);
    }
}
d_frame.addEventListener("pointerdown", function (e) {
    if (!draw) {
        prevX = e.clientX - W_f;
        prevY = e.clientY - H_f;
        cfup = fup;
        cfleft = fleft;
        f_move = true;
        end_f_move = false;
    }
    else {
        var cur_x = e.clientX - W_f;
        var cur_y = e.clientY - H_f;
        if (cur_tool[0] == 'p') //если выбрана пипетка
         {
            var rgba = void 0;
            if (is_foreground_visible) {
                rgba = ctx_foreground.getImageData(cur_x - 1, cur_y - 1, 1, 1).data;
            }
            var hex = void 0;
            if (!is_foreground_visible || rgba[3] == 0) {
                if (cur_draw_ctx == ctx_foreground && is_background_visible) {
                    rgba = ctx_background.getImageData(cur_x - 1, cur_y - 1, 1, 1).data;
                }
            }
            if (rgba[3] != 0) {
                hex = '#' + ("000000" + rgbToHex(rgba[0], rgba[1], rgba[2])).slice(-6);
            }
            else {
                hex = "#255255255";
            }
            cur_brush_clr = hex;
            cur_draw_ctx.strokeStyle = cur_brush_clr;
            if (rgba[0] + rgba[1] + rgba[2] > 382) {
                clrimg.style.filter = "invert(0)";
            }
            else {
                clrimg.style.filter = "invert(1)";
            }
            colourBtn.style.background = cur_brush_clr;
            draw = false;
            return;
        }
        else {
            if (cur_tool[0] == 'b') //если выбрана заливка
             {
                cur_x = Math.floor(cur_x + 2);
                cur_y = Math.floor(cur_y + 18);
                var rgba = cur_draw_ctx.getImageData(cur_x, cur_y, 1, 1).data;
                var hex = '#' + ("00000000" + rgbaToHex(rgba[0], rgba[1], rgba[2], rgba[3])).slice(-8);
                if (cur_brush_clr + "ff" != hex) //если цвет выбранной точки не равен текущему
                 {
                    var cur_form_clr = "0x" + cur_brush_clr.slice(1) + "FF";
                    floodFill(cur_draw_ctx, cur_x, cur_y, cur_form_clr);
                    push_action_to_stack(['f', cur_draw_ctx, cur_x, cur_y, cur_form_clr]);
                    canvas_to_layer(cur_canvas, cur_ctx_layer);
                }
                draw = false;
                return;
            }
            else {
                if (is_pencil_window) {
                    if (cur_tool[0] == 'k') {
                        change_thickness(true);
                    }
                    else {
                        change_thickness(false);
                    }
                    pencil_w.style.display = "none";
                    is_pencil_window = false;
                }
            }
        }
    }
});
window.addEventListener("pointerup", function (e) {
    enddraw = true;
    end_f_move = true;
});
function addGraphicTabletButton(e) {
    if (e.pointerType == "pen") {
        graphic_tabletBtn.style.display = "block";
        nav_panel.removeEventListener("pointermove", addGraphicTabletButton);
    }
}
nav_panel.addEventListener("pointermove", addGraphicTabletButton); //проверка курсора на поле с кнопками
canvas_additional.addEventListener("pointermove", function (e) {
    on_d_fiend = true;
    if (cursor_type != 3 && !f_move) {
        cursor_type = 3;
        cursor_image.setAttribute("src", cur_tool[2]);
    }
});
function getBezierBasis(i, n, t) {
    // Факториал
    function f(n) {
        return (n <= 1) ? 1 : n * f(n - 1);
    }
    // считаем i-й элемент полинома Берштейна
    return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}
// arr - массив опорных точек. Точка - двухэлементный массив, (x = arr[0], y = arr[1]), step - шаг при расчете кривой (0 < step < 1), по умолчанию 0.01
function getBezierCurve(arr, step) {
    step = 1.0 / step;
    var res = new Array();
    for (var t = 0; t < 1 + step; t += step) {
        t = Math.min(1, t);
        var ind = res.length;
        res[ind] = new Array(0, 0, 0);
        for (var i = 0; i < arr.length; i++) {
            var b = getBezierBasis(i, arr.length - 1, t);
            res[ind][0] += arr[i][0] * b;
            res[ind][1] += arr[i][1] * b;
            res[ind][2] += arr[i][2] * b;
        }
    }
    return res;
}
function drawLines(local_ctx, arr) {
    local_ctx.beginPath();
    for (var i = 0; i < arr.length - 1; i++) {
        local_ctx.lineWidth = arr[i][2];
        local_ctx.moveTo(arr[i][0], arr[i][1]);
        local_ctx.lineTo(arr[i + 1][0], arr[i + 1][1]);
        local_ctx.stroke();
    }
}
d_frame.addEventListener("pointermove", function (e) {
    on_d_frame = true;
    if (!on_d_fiend && !draw) {
        var X = e.clientX - W_min;
        var Y = e.clientY - H_min;
        fup = false;
        fdown = false;
        fright = false;
        fleft = false;
        if (H_min + 40 > Y) //если верхняя часть горизонтальной части рамки 
         {
            fup = true;
        }
        else {
            if (Y > H_max - 40) //если нижняя часть горизонтальной рамки
             {
                fdown = true;
            }
        }
        if (W_min + 40 > X) //если левая часть вертикальной рамки
         {
            fleft = true;
        }
        else {
            if (X > W_max - 40) //если правая часть вертикальной рамки
             {
                fright = true;
            }
        }
        if (fleft && fup || fright && fdown) {
            if (cursor_type != 4) {
                cursor_type = 4;
                cursor_image.setAttribute("src", "aero_nwse.cur");
            }
        }
        else {
            if (fleft && fdown || fright && fup) {
                if (cursor_type != 5) {
                    cursor_type = 5;
                    cursor_image.setAttribute("src", "aero_nesw.cur");
                }
            }
            else {
                if (fleft || fright) {
                    if (cursor_type != 2) {
                        cursor_type = 2;
                        cursor_image.setAttribute("src", "aero_ew.cur");
                    }
                }
                else {
                    if (cursor_type != 1) {
                        cursor_type = 1;
                        cursor_image.setAttribute("src", "aero_ns.cur");
                    }
                }
            }
        }
    }
    on_d_fiend = false;
    if (!draw && !f_move) {
        return;
    }
    var pX = e.clientX - W_f;
    var pY = e.clientY - H_f;
    var pW = e.pressure;
    //Рисование
    if (draw) {
        if (enddraw) {
            if (cur_smoothing != 0) {
                ctx_add.clearRect(0, 0, cW, cH);
                drawLines(cur_draw_ctx, cur_smooth_prim);
            }
            if (is_shift_on) {
                ctx_add.clearRect(0, 0, cW, cH);
                drawLines(cur_draw_ctx, curprim);
            }
            draw = false;
            enddraw = false;
            prevX = pX;
            prevY = pY;
            fp = true;
            var drawing_mode = void 0;
            if (cur_tool[0] == 'e') {
                cur_ctx_layer.clearRect(0, 0, lwW, lwH);
                drawing_mode = "destination-out";
                cur_draw_ctx.globalCompositeOperation = "source-over";
            }
            else {
                drawing_mode = "source-over";
            }
            if (cur_smoothing == 0) {
                push_action_to_stack(['p', cur_draw_ctx, curprim, cur_brush_clr, drawing_mode]);
            }
            else {
                push_action_to_stack(['p', cur_draw_ctx, cur_smooth_prim, cur_brush_clr, drawing_mode]);
            }
            canvas_to_layer(cur_canvas, cur_ctx_layer);
            nstack = [];
            curprim = [];
            return;
        }
        var currentX = pX * cmp_W - l_width / 2;
        var currentY = pY * cmp_H - l_width / 2;
        var currentW = void 0;
        if (graphic_tablet_mode) {
            currentW = pW * l_width;
            cur_draw_ctx.lineWidth = currentW;
            ctx_add.lineWidth = currentW;
            currentX += (l_width - currentW) / 2;
        }
        else {
            currentW = l_width;
        }
        if (fp) {
            if (cur_tool[0] == 'e') {
                cur_draw_ctx.globalCompositeOperation = "destination-out";
            }
            cur_smooth_prim = [];
            fp = false;
            curprim.push([currentX, currentY, currentW]);
            if (is_shift_on) {
                curprim.push([currentX, currentY, currentW]);
            }
            prevX = currentX;
            prevY = currentY;
            return;
        }
        if (is_shift_on) {
            var delta_x = currentX - prevX;
            var delta_y = currentY - prevY;
            var k_tan = Math.round(Math.atan(delta_y / delta_x) / Pi_div_4);
            if (k_tan == 2 || k_tan == -2) {
                k_tan = 0;
            }
            if (Math.abs(delta_x) > Math.abs(delta_y)) {
                currentY = prevY + delta_x * k_tan;
            }
            else {
                currentX = prevX + delta_y * k_tan;
            }
            curprim[curprim.length - 1] = [currentX, currentY, currentW];
            ctx_add.clearRect(0, 0, cW, cH);
            ctx_add.beginPath();
            ctx_add.moveTo(prevX, prevY);
            ctx_add.lineTo(currentX, currentY);
            ctx_add.stroke();
            return;
        }
        cur_draw_ctx.beginPath();
        if (cur_smoothing == 0 || cur_tool[0] == 'e') {
            cur_draw_ctx.moveTo(prevX, prevY);
            cur_draw_ctx.lineTo(currentX, currentY);
            cur_draw_ctx.stroke();
        }
        else {
            //drawLines(cur_draw_ctx, cur_smooth_prim.slice(0, -k_smooth + 2))
            //cur_smooth_prim = getBezierCurve(curprim.slice(-cur_smoothing), cur_smoothing)
            cur_smooth_prim = cur_smooth_prim.slice(0, -k_smooth + 1).concat(getBezierCurve(curprim.slice(-cur_smoothing), cur_smoothing));
            ctx_add.clearRect(0, 0, cW, cH);
            drawLines(ctx_add, cur_smooth_prim);
        }
        curprim.push([currentX, currentY, currentW]);
        prevX = currentX;
        prevY = currentY;
    }
});
function change_drawfield_size(new_dfw, new_dfh) {
    var prev_f_dW = f_dW;
    var prev_f_dH = f_dH;
    f_dW = Math.min(fW_max, Math.max(fW_min, new_dfw));
    f_dH = Math.min(fH_max, Math.max(fH_min, new_dfh));
    d_frame.style.width = f_dW + "px";
    d_frame.style.height = f_dH + "px";
    cW = cW * (f_dW / prev_f_dW);
    cH = cH * (f_dH / prev_f_dH);
    cD = cW / cH;
    if (cD > orig_lD) {
        lW = orig_lW;
        lH = orig_lW / cD;
    }
    else {
        lH = orig_lH;
        lW = orig_lH * cD;
    }
    lWp = Math.round(995 * (lW / orig_lW)) / 10 + '%';
    lHp = Math.round(1000 * (lH / orig_lH)) / 10 + '%';
    layer_icon_1.style.width = lWp;
    layer_icon_2.style.width = lWp;
    layer_icon_1.style.height = lHp;
    layer_icon_2.style.height = lHp;
    canvas_foreground.width = cW;
    canvas_foreground.height = cH;
    canvas_background.width = cW;
    canvas_background.height = cH;
    canvas_additional.height = cH;
    canvas_additional.width = cW;
    ctx_foreground.lineWidth = l_width;
    ctx_background.lineWidth = l_width;
    W_f = (W - cW) / 2 - l_width / 2 + 12;
    W_min = (W - f_dW) / 4;
    W_max = f_dW + W_min;
    H_f = (H - cH) / 2 - l_width / 2 + 12;
    H_min = (H - f_dH) / 4;
    H_max = f_dH + H_min;
    X_move = f_dW - prev_f_dW;
    Y_move = f_dH - prev_f_dH;
}
window.addEventListener("pointermove", function (e) {
    cX = e.clientX - 7.5;
    cY = e.clientY - 7.5;
    if (is_clr_window) {
        if (!on_clr_window) {
            if (cursor_type != 0) {
                cursor_type = 0;
                cursor.style.display = "block";
            }
        }
        else {
            if (cursor_type != -1) {
                cursor_type = -1;
                cursor.style.display = "none";
            }
            on_clr_window = false;
            return;
        }
    }
    if (!f_move) {
        if (!on_d_frame && !draw) {
            if (cursor_type != -1) {
                cursor_type = -1;
                cursor.display;
                cursor.style.display = "none";
            }
        }
        else {
            if (cursor_type != 0) {
                cursor_type = 0;
                cursor.style.display = "block";
            }
        }
    }
    else //Изменение размеров области рисования
     {
        X_move = (cX - move_prevX) * 2;
        Y_move = (cY - move_prevY) * 2;
        if (end_f_move) {
            f_move = false;
            end_f_move = false;
            return;
        }
        if (cursor_type == 2) //если вертикальные
         {
            Y_move = 0;
        }
        else {
            if (cursor_type == 1) //если горизонтальные
             {
                X_move = 0;
            }
        }
        if (cfleft == true) {
            X_move *= -1;
        }
        if (cfup == true) {
            Y_move *= -1;
        }
        var cur_new_dfw = f_dW + X_move;
        var cur_new_dfh = f_dH + Y_move;
        change_drawfield_size(cur_new_dfw, cur_new_dfh);
        cur_ratio_val = get_visual_ratio(false, cW, cH);
        ratio_field.value = cur_ratio_val; //устанавливаем соотношение сторон
        fW_pred = f_dW;
        fH_pred = f_dH;
        pstack.push(['r', cur_new_dfw, cur_new_dfh, false]);
        replay_actions(pstack); //Повторная отрисовка с новым разрешением
    }
    if (cursor_type != 0 && cursor_type != 3) {
        cursor.style.left = cX + "px";
        cursor.style.top = cY + "px";
    }
    else {
        cursor.style.left = (cX + 7.5) + "px";
        cursor.style.top = (cY + 7.5) + "px";
    }
    move_prevX = cX;
    move_prevY = cY;
    on_d_frame = false;
});
