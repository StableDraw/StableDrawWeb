"use strict";
const body = document.querySelector("body");
const cursor = document.querySelector(".cursor");
const cursor_image = document.querySelector(".cursimg");
let cursor_type = -1;
const nav_panel = document.querySelector(".nav");
const canvas_foreground = document.getElementById("canvas_foreground");
const canvas_background = document.getElementById("canvas_background");
const canvas_additional = document.getElementById("canvas_additional");
const canvas_layer_1 = document.getElementById("layer_1_display_canvas");
const canvas_layer_2 = document.getElementById("layer_2_display_canvas");
const layer_icon_1 = document.getElementById("layer_display_icon_1");
const layer_icon_2 = document.getElementById("layer_display_icon_2");
const d_frame = document.getElementById("d_frame");
const spanel = document.getElementById("mySidepanel");
const spanel_openbtn = document.querySelector(".openbtn");
const generateBtn = document.getElementById("generate");
const clr_w = document.getElementById("clr_window");
const pencil_w = document.getElementById("pencil_window");
const eraser_w = document.getElementById("eraser_window");
const ok_clr_btn = document.getElementById("ok_clr_btn");
const cur_color = document.getElementById("color");
const clrimg = document.getElementById("clrimg");
const ctx_foreground = canvas_foreground.getContext("2d", { willReadFrequently: true });
const ctx_background = canvas_background.getContext("2d", { willReadFrequently: true });
const ctx_add = canvas_additional.getContext("2d", { willReadFrequently: true });
const ctx_layer_1 = canvas_layer_1.getContext("2d", { willReadFrequently: true });
const ctx_layer_2 = canvas_layer_2.getContext("2d", { willReadFrequently: true });
const ratio_field = document.querySelector(".f_ratio");
const ratio_tooltip = document.querySelector("ratio_tooltip");
const thickness_slider = document.getElementById("thickness_sliderValue");
const thickness_field = document.getElementById("thickness_rangeValue");
const smoothing_slider = document.getElementById("smoothing_sliderValue");
const smoothing_field = document.getElementById("smoothing_rangeValue");
const e_thickness_slider = document.getElementById("e_thickness_sliderValue");
const e_thickness_field = document.getElementById("e_thickness_rangeValue");
const layer_1 = document.getElementById("layer_1");
const layer_2 = document.getElementById("layer_2");
const scale_field = document.querySelector(".scale_field");
const div_layers = document.querySelector(".layers");
const layers_buttons = document.querySelector(".layers_buttons");
const modal_header = document.querySelector(".modal__header");
const modal_body = document.querySelector(".modal__body");
const modal_footer = document.querySelector(".modal__footer");
const text_label_clr = document.getElementById("text_label_clr");
const blackout = document.getElementById("full_blackout");
const side_panel_blackout = document.getElementById("side_panel_blackout");
const before_gen_block = document.getElementById("before_gen_block");
const close_before_gen_block = document.getElementById("close_before_gen_block");
const before_gen = document.getElementById("before_gen");
const before_gen_ctx = before_gen.getContext("2d", { willReadFrequently: true });
const change_themeBtn = document.getElementById("change_theme");
const tmimg = document.getElementById("theme_mode_img");
const graphic_tabletBtn = document.getElementById("graphic_tablet");
const first_layer_visibilityBtn = document.getElementById("layer_1_visibility_button");
const first_layer_visibility_img = document.getElementById("layer_1_visibility_img");
const second_layer_visibilityBtn = document.getElementById("layer_2_visibility_button");
const second_layer_visibility_img = document.getElementById("layer_2_visibility_img");
const clear_first_layer_Btn = document.getElementById("clear_layer_1");
const clear_second_layer_Btn = document.getElementById("clear_layer_2");
const select_first_layerBtn = document.getElementById("layer_button_1");
const colourBtn = document.getElementById("palette");
const ok_clr = document.querySelector(".ok_clr_btn");
const ctype_clr_btn = document.querySelector(".ctype_clr_btn");
const id_list = ['p', 'i', 'u', 'f'];
const Pi_div_4 = Math.PI / 4;
let nstack = [];
let pstack = [];
let curprim = [];
let fp = true;
let on_d_frame = false;
let on_d_fiend = false;
let prevX;
let prevY;
let move_prevX;
let move_prevY;
let X_move;
let Y_move;
let cX;
let cY;
let is_shift_on = false;
let fup = false;
let fdown = false;
let fright = false;
let fleft = false;
let cfup = false;
let cfleft = false;
let W = window.innerWidth;
let H = window.innerHeight;
let fW_max = W * 0.8;
let fH_max = H * 0.8;
let fW_min = W * 0.1;
let fH_min = H * 0.1;
let cW = canvas_foreground.offsetWidth;
let cH = canvas_foreground.offsetHeight;
let cD = cW / cH;
let Max_cW = cW;
let Max_cH = cH;
let lW = layer_icon_1.offsetWidth;
let lH = layer_icon_1.offsetHeight;
let lwW = canvas_layer_1.width;
let lwH = canvas_layer_1.height;
let orig_lW = lW;
let orig_lH = lH;
let orig_lD = lW / lH;
if (cD > orig_lD) {
    lW = orig_lW;
    lH = orig_lW / cD;
}
else {
    lH = orig_lH;
    lW = orig_lH * cD;
}
let lWp = Math.round(995 * (lW / orig_lW)) / 10 + "%";
let lHp = Math.round(1000 * (lH / orig_lH)) / 10 + "%";
layer_icon_1.style.width = lWp;
layer_icon_2.style.width = lWp;
layer_icon_1.style.height = lHp;
layer_icon_2.style.height = lHp;
/*layer_alpha_img_1.width = lWp
layer_alpha_img_1.height = lHp
layer_alpha_img_2.width = lWp
layer_alpha_img_2.height = lHp*/
let cur_real_ratio = cH / cW;
let l_width = 1;
let W_f = (W - cW) / 2 - l_width / 2 + 12;
let H_f = (H - cH) / 2 - l_width / 2 + 12;
let f_dW = d_frame.offsetWidth;
let f_dH = d_frame.offsetHeight;
let orig_f_dW = f_dW;
let orig_f_dH = f_dH;
let fW_pred = orig_f_dW;
let fH_pred = orig_f_dH;
let cmp_W = 1;
let cmp_H = 1;
let cmp_W_b = 0;
let cmp_H_b = 0;
d_frame.width = f_dW;
d_frame.height = f_dH;
let H_min = (H - f_dH) / 4;
let H_max = f_dH + H_min;
let W_min = (W - f_dW) / 4;
let W_max = f_dW + W_min;
canvas_foreground.height = cH;
canvas_foreground.width = cW;
canvas_background.height = cH;
canvas_background.width = cW;
canvas_additional.height = cH;
canvas_additional.width = cW;
let draw = false;
let enddraw = false;
let f_move = false;
let end_f_move = false;
let old_btn_clr = false; //изначально чёрный текст у кнопок цвета
let on_clr_window = false;
let cur_background_clr = "#fff";
let new_background_clr = cur_background_clr;
let cur_brush_clr = "#000000";
ctx_background.fillStyle = cur_background_clr; //заливка фона белым, костыль, убрать
ctx_layer_2.fillStyle = cur_background_clr; //заливка иконки фона белым, костыль, убрать
pstack.push(['i', ctx_background, cur_background_clr]);
ctx_background.fillRect(0, 0, cW, cH);
ctx_layer_2.fillRect(0, 0, cW, cH);
let is_clr_brash = true;
let cur_ratio_val = get_visual_ratio(false, cW, cH);
ratio_field.value = cur_ratio_val; //устанавливаем соотношение сторон при запуске
let is_first_upload_btn_click = true; //костыль, чтобы кнопка не срабатывала дважды
let is_foreground_selected = true; //выбран ли верхний слой, по-умолчанию выбран
let cur_draw_ctx = ctx_foreground; //текущий выбранный слой для рисования, по-умолчанию верхний
let cur_canvas = canvas_foreground; //текущий выбранный слой для рисования ввиде слоя, не контекста, по-умолчанию верхний
let cur_ctx_layer = ctx_layer_1; //текущий выбранный слой для рисования ввиде контекста кнопки который в углу, по-умолчанию верхний
let graphic_tablet_mode = false; //режим графического планшета
let is_clr_window = false; //отображение окна с палитрой
let is_pencil_window = true; //отображение окна настроек кисти
let is_eraser_window = false; //отображение окна настроек ластика
let cur_smoothing = 0; //параметр сглаживания
let cur_smooth_prim = []; //текущий сглаженный примитив
let k_smooth = 0; //текущий коэффициент сглаживания
let is_foreground_visible = true; //включена ли видимость переднего слоя
let is_background_visible = true; //включена ли видимость заднего слоя
ctx_foreground.lineCap = "round";
ctx_foreground.lineJoin = "round";
ctx_add.lineCap = "round";
ctx_add.lineJoin = "round";
ctx_background.lineCap = "round";
ctx_background.lineJoin = "round";
layer_1.style.border = "5px solid #000000";
layer_2.style.border = "1px solid #707070";
let is_dark_mode = false; //тёмная тема (отключена по-умолчанию)
let is_modal_open = false;
let is_side_panel_open = false;
let caption_field;
let style_field;
let is_human_caption;
let original_image_buf = ""; //переменная для хранения исходных изображений
let original_image_w; //переменная для хранения ширины исходного изображения
let original_image_h; //переменная для хранения высоты исходного изображения
let need_gen_after_caption = [false, false];
const Max_bib_w = W * 0.2;
const Max_bib_h = H * 0.2;
let data_prop;
let ws = new WebSocket("wss://stabledraw.com:8081");
let chain_id = "";
let task_id;
const subbody = document.querySelector(".subbody");
var main_modal = function (options) {
    var _elemModal;
    var _eventShowModal;
    var _eventHideModal;
    var _hiding = false;
    var _destroyed = false;
    var _animationSpeed = 200;
    function _createModal(options) {
        var elemModal = document.createElement("div"), modalTemplate = '<div class = "modal__backdrop"><div class="modal__content"><div class="modal__header"><div class="modal__title" data-modal="title">{{title}}</div><span class="modal__btn-close" data-dismiss="modal" title="Закрыть">&times;</span></div><div class="modal__body" data-modal="content">{{content}}</div>{{footer}}</div></div>', modalFooterTemplate = '<div class = "modal__footer">{{buttons}}</div>', modalButtonTemplate = '<button type = "button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>', modalHTML, modalFooterHTML = "";
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
        subbody.appendChild(elemModal);
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
    let return_elem = {
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
    return return_elem;
};
(function () {
    var modal;
    /*document.addEventListener("show.modal", function (e: any)
    {
        document.querySelector(".actions").textContent = "Действия при открытии модального окна..."
        // получить ссылку на DOM-элемент показываемого модального окна (.modal)
        console.log(e.detail)
    })
    document.addEventListener("hide.modal", function (e: any)
    {
        document.querySelector(".actions").textContent = "Действия при закрытии модального окна..."
        // получить ссылку на DOM-элемент скрываемого модального окна (.modal)
        console.log(e.detail)
    })*/
    document.addEventListener("click", function (e) {
        data_prop = check_data_before_sending();
        let { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots } = data_prop;
        if (e.target.dataset.toggle === "modal") {
            let content;
            if ((!local_is_foreground_used && !local_is_background_used) || (!is_background_visible && !is_foreground_visible)) {
                modal = main_modal({
                    title: "Генерация",
                    content: "<p>Содержмиое модального окна...<p>",
                    footerButtons: [
                        { class: "modal_btn modal_btn-3", id: "cur_gen_params_btn", text: "Параметры", handler: "modalHandlerParams" },
                        { class: "modal_btn modal_btn-2", id: "SD2_btn", text: "StableDiffusion 2", handler: "modalHandlerGenSD2_text_to_image" },
                        { class: "modal_btn modal_btn-2", id: "Dalle2_btn", text: "Dall-e 2", handler: "modalHandlerGenDalle2" },
                        { class: "modal_btn modal_btn-1", text: "Отмена", handler: "modalHandlerCancel" }
                    ]
                });
                content = 'Стиль:<p><input class = "modal_input" id = "style_input" value = "профессиональная фотография" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"></input><p><p>Описание:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"</input>';
            }
            else {
                modal = main_modal({
                    title: "Генерация",
                    content: "<p>Содержмиое модального окна...<p>",
                    footerButtons: [
                        { class: "modal_btn modal_btn-3", id: "cur_gen_params_btn", text: "Параметры", handler: "modalHandlerParams" },
                        { class: "modal_btn modal_btn-2", id: "SD1_btn", text: "StableDiffusion 1", handler: "modalHandlerGenSD1" },
                        { class: "modal_btn modal_btn-2", id: "SD2_btn", text: "StableDiffusion 2", handler: "modalHandlerGenSD2" },
                        { class: "modal_btn modal_btn-1", text: "Отмена", handler: "modalHandlerCancel" }
                    ]
                });
                if (original_image_buf == "") {
                    content = 'Описание:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"></input><p><button class = "modal_btn modal_btn-2" id = "modal_caption_auto_gen" onclick = "gen_caption_for_image(data_prop)">Сгенерировать автоматически</button><p>Стиль:<p><input class = "modal_input" id = "style_input" value = "4к фотореалистично" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"></input>';
                }
                else {
                    if (original_image_h * original_image_w > 262144) {
                        content = 'Описание:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"/><p><button class = "modal_btn modal_btn-2" id = "modal_caption_auto_gen" onclick = "gen_caption_for_image(data_prop)">Сгенерировать автоматически</button><button class = "modal_btn modal_btn-4" onclick = "delete_background()">Удалить фон</button><p>Стиль:<p><input class = "modal_input" id = "style_input" value = "4к фотореалистично" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"/>';
                    }
                    else {
                        content = 'Описание:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"/><p><button class = "modal_btn modal_btn-2" id = "modal_caption_auto_gen" onclick = "gen_caption_for_image(data_prop)">Сгенерировать автоматически</button><button class = "modal_btn modal_btn-4" style = "right: 25%" onclick = "upscale()">Апскейл</button><button class = "modal_btn modal_btn-4" onclick = "delete_background()">Удалить фон</button><p>Стиль:<p><input class = "modal_input" id = "style_input" value = "4к фотореалистично" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"/>';
                    }
                }
            }
            modal.show();
            modal.setContent(content);
            caption_field = document.getElementById("caption_input");
            style_field = document.getElementById("style_input");
            ws.onmessage = function (event) {
                let jdata = JSON.parse(event.data);
                let type = jdata[0];
                if (type == 't') //если текстовое сообщение
                 {
                    //alert(jdata[1])
                    return;
                }
                if (type == 'c') //если описание
                 {
                    task_id = jdata[1];
                    caption_field.value = jdata[2];
                    chain_id = jdata[3];
                    last_task_image_name = jdata[4];
                    last_task_image_suffix = jdata[5];
                    is_human_caption = false;
                    blackout.style.display = "none";
                    if (need_gen_after_caption[0]) {
                        gen_picture_by_drawing(need_gen_after_caption[1], caption_field.value + " " + style_field.value, data_prop);
                        need_gen_after_caption[0] = false;
                    }
                    return;
                }
                if (type == 'i') //если изображение
                 {
                    let image = new Image();
                    let image_on_before_block = new Image();
                    image.onload = function () {
                        if (jdata[7] != "") {
                            image_on_before_block.src = "data:image/png;base64," + jdata[7];
                            image_on_before_block.onload = function () {
                                let bW;
                                let bH;
                                let iw = image_on_before_block.width;
                                let ih = image_on_before_block.height;
                                if (iw / ih > Max_bib_w / Max_bib_h) {
                                    bW = Max_bib_w;
                                    bH = Max_bib_w * ih / iw;
                                }
                                else {
                                    bH = Max_bib_h;
                                    bW = Max_bib_h * iw / ih;
                                }
                                before_gen_block.style.width = bW.toString() + "px";
                                before_gen_block.style.height = bH.toString() + "px";
                                before_gen.width = bW;
                                before_gen.height = bH;
                                before_gen_ctx.drawImage(image_on_before_block, 0, 0, iw, ih, 0, 0, bW, bH);
                                before_gen_block.style.display = "block";
                                show_gen_result(image);
                            };
                        }
                        else {
                            before_gen_block.style.display = "none";
                            show_gen_result(image);
                        }
                        original_image_buf;
                        blackout.style.display = "none";
                        modal.hide();
                        original_image_buf = image.src;
                        return;
                    };
                    original_image_w = jdata[2];
                    original_image_h = jdata[3];
                    chain_id = jdata[4];
                    last_task_image_name = jdata[5];
                    task_id = jdata[6];
                    last_task_image_suffix = jdata[8];
                    image.src = "data:image/png;base64," + jdata[1];
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
                gen_caption_for_image(data_prop);
                need_gen_after_caption[0] = true;
                need_gen_after_caption[1] = false;
            }
            else {
                let full_prompt;
                if (style_field.value == "") {
                    full_prompt = caption_field.value;
                }
                else {
                    full_prompt = caption_field.value + " " + style_field.value;
                }
                gen_picture_by_drawing(false, full_prompt, data_prop);
            }
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerGenSD2") {
            if (caption_field.value == "") {
                gen_caption_for_image(data_prop);
                need_gen_after_caption[0] = true;
                need_gen_after_caption[1] = true;
            }
            else {
                let full_prompt;
                if (style_field.value == "") {
                    full_prompt = caption_field.value;
                }
                else {
                    full_prompt = caption_field.value + " " + style_field.value;
                }
                gen_picture_by_drawing(true, full_prompt, data_prop);
            }
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerGenSD2_text_to_image") {
            if (caption_field.value == "") {
                caption_field.setCustomValidity("Ввод описания в этом режиме обязателен");
                caption_field.reportValidity();
            }
            else {
                let full_prompt;
                if (style_field.value == "") {
                    full_prompt = caption_field.value;
                }
                else {
                    full_prompt = style_field.value + " " + caption_field.value;
                }
                gen_picture_by_prompt(true, full_prompt);
            }
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerGenDalle2") {
            if (caption_field.value == "") {
                caption_field.setCustomValidity("Ввод описания в этом режиме обязателен");
                caption_field.reportValidity();
            }
            else {
                let full_prompt;
                if (style_field.value == "") {
                    full_prompt = caption_field.value;
                }
                else {
                    full_prompt = style_field.value + " " + caption_field.value;
                }
                gen_picture_by_prompt(false, full_prompt);
            }
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.dismiss === "modal") {
            //document.querySelector(".message").textContent = "Вы закрыли модальное окно нажав на крестик или на область вне модального окна, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
    });
})();
function show_gen_result(image) {
    close_all_add_windows();
    is_background_visible = false;
    canvas_background.style.display = "none";
    second_layer_visibility_img.setAttribute("src", "visibility_off.png");
    ctx_foreground.clearRect(0, 0, cW, cH); // очищаем верхний холст
    let img_w = image.width;
    let img_h = image.height;
    if (img_w / img_h == 1 && cW / cH != 1) {
        let new_dfw;
        let new_dfh;
        if (cD > 1) {
            new_dfh = Max_cH;
            new_dfw = Max_cH;
        }
        else {
            new_dfh = Max_cW;
            new_dfw = Max_cW;
        }
        change_drawfield_size(new_dfw, new_dfh);
        cur_ratio_val = get_visual_ratio(false, cW, cH);
        ratio_field.value = cur_ratio_val; //устанавливаем соотношение сторон
        replay_actions(pstack); //воспроизводим действия
        fW_pred = f_dW;
        fH_pred = f_dH;
        push_action_to_stack(['r', new_dfw, new_dfh, false]);
    }
    ctx_foreground.drawImage(image, 0, 0, img_w, img_h, 0, 0, cW, cH);
    push_action_to_stack(['u', cur_draw_ctx, image, img_w, img_h]);
    ctx_layer_1.clearRect(0, 0, lwW, lwH);
    canvas_to_layer(cur_canvas, cur_ctx_layer);
}
let last_task_image_name = "drawing.png";
let last_task_image_suffix = "0";
//ws.onopen = function(){alert("open");} 
ws.onclose = function () {
    alert("Соединение разорвано");
};
//ws.onerror = function(){alert("error");}
function check_data_before_sending() {
    let local_is_foreground_used = false;
    let local_is_background_used = false;
    let local_is_drawing_on_foreground = true;
    let local_is_drawing_on_background = true;
    let local_sure_on_foreground = true;
    let local_sure_on_background = true;
    let local_how_many_prims_on_foreground = 0;
    let local_how_many_dots_on_foreground = 0;
    let local_how_many_prims_on_background = 0;
    let local_how_many_dots_on_background = 0;
    for (let i = 0; i < pstack.length; i++) {
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
    let local_is_drawing;
    let local_sure;
    let local_how_many_prims;
    let local_how_many_dots;
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
    return { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots };
}
function push_action_to_stack(local_act) {
    let need_add = true;
    let pstack_length = pstack.length - 1;
    if (pstack_length != -1 && pstack[pstack_length][0] == local_act[0] && local_act[0] != 'p' && local_act[0] != 'u' && pstack[pstack_length] == local_act) {
        need_add = false;
    }
    if (need_add) {
        pstack.push(local_act);
        nstack = [];
    }
}
function gen_picture_by_drawing(is_SD2, full_prompt, data_prop) {
    blackout.style.display = "block";
    let local_type;
    let send_data_pbp;
    if (is_SD2) {
        local_type = "2";
    }
    else {
        local_type = "1";
    }
    if (is_human_caption) {
        let data;
        let background_data;
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
        let { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots } = data_prop;
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
        if (chain_id != "") {
            data = "";
            background_data = "";
        }
        send_data_pbp = JSON.stringify({
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
            "img_name": last_task_image_name,
            "img_suf": last_task_image_suffix
        });
        /*send_data_pbp = JSON.stringify({
            "type": "hg" + local_type, //рисунок
            "chain_id": chain_id, //id последнего звена цепочки
            "task_id": task_id, //id задания
            "data": data,
            "backgroung": background_data,
            "prompt": full_prompt, //описание изображения
            "img_name": last_task_image_name,
            "img_suf": last_task_image_suffix
        })*/
    }
    else {
        send_data_pbp = JSON.stringify({
            "type": 'g' + local_type,
            "chain_id": chain_id,
            "task_id": task_id,
            "img_name": last_task_image_name,
            "img_suf": last_task_image_suffix
        });
    }
    ws.send(send_data_pbp);
}
function gen_picture_by_prompt(is_SD2, full_prompt) {
    blackout.style.display = "block";
    let local_type;
    let send_data_pbt;
    if (is_SD2) {
        local_type = 's';
    }
    else {
        local_type = 'd';
    }
    send_data_pbt = JSON.stringify({
        "type": "t" + local_type,
        "prompt": full_prompt //описание изображения
    });
    ws.send(send_data_pbt);
}
function delete_background() {
    blackout.style.display = "block";
    let data = original_image_buf;
    if (chain_id != "") {
        data = "";
    }
    let send_data_del = JSON.stringify({
        "type": 'b',
        "data": data,
        "chain_id": chain_id,
        "task_id": task_id,
        "img_name": last_task_image_name,
        "img_suf": last_task_image_suffix
    });
    ws.send(send_data_del);
}
function upscale() {
    blackout.style.display = "block";
    let data = original_image_buf;
    if (chain_id != "") {
        data = "";
    }
    let send_data_ups = JSON.stringify({
        "type": 'a',
        "data": data,
        "chain_id": chain_id,
        "task_id": task_id,
        "img_name": last_task_image_name,
        "img_suf": last_task_image_suffix
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
let slider_range = document.querySelectorAll('input[type="range"]');
let slider_element;
function update_slider() {
    for (slider_element of slider_range) {
        slider_element.style.setProperty('--value', slider_element.value);
    }
}
for (slider_element of slider_range) {
    slider_element.style.setProperty("--value", slider_element.value);
    slider_element.style.setProperty("--min", slider_element.min == "" ? '0' : slider_element.min);
    slider_element.style.setProperty("--max", slider_element.max == "" ? "100" : slider_element.max);
    slider_element.addEventListener("input", () => slider_element.style.setProperty("--value", slider_element.value));
}
ratio_field.onchange = function () {
    let t_v = ratio_field.value;
    let pos = t_v.indexOf(':');
    if (pos == -1) {
        ratio_field.value = cur_ratio_val;
        return;
    }
    if (t_v[0] == '≈') {
        t_v = t_v.slice(1);
        pos--;
    }
    let new_r_w_s = t_v.slice(0, pos);
    let new_r_h_s = t_v.slice(pos + 1);
    let new_r_w = parseInt(new_r_w_s);
    let new_r_h = parseInt(new_r_h_s);
    let new_dfw;
    let new_dfh;
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
    const rat = [[2.0556, 21, 9], [1.5556, 16, 9], [1.1667, 4, 3], [0.875, 1, 1], [0.6562, 3, 4], [0.4955, 9, 16]];
    let cur_ratio = w / h;
    let v_w = 0;
    let v_h = 0;
    let cur_k;
    if (cur_ratio <= 0.4955) {
        v_w = 9;
        v_h = 21;
    }
    else {
        let r;
        for (r of rat) {
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
    let res = (v_w).toString() + ":" + (v_h).toString();
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
const openBtn = document.querySelector(".openbtn");
openBtn.addEventListener("click", () => {
    openNav();
});
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
const closeeBtn = document.getElementById("size_panel_closebtn");
closeeBtn.addEventListener("pointerup", () => {
    closeNav();
});
close_before_gen_block.addEventListener("pointerup", () => {
    before_gen_block.style.display = "none";
});
before_gen.addEventListener("pointerup", () => {
    undo_action();
});
let backBtn = document.getElementById("arrow_back");
backBtn.addEventListener("click", () => {
    undo_action();
});
let nextBtn = document.getElementById("arrow_next");
nextBtn.addEventListener("click", () => {
    repeat_action();
});
const initial_picker = $(document).ready(function () {
    let picker = $("#picker");
    picker.farbtastic("#color");
});
function hexDec(h) {
    let m_s = h.slice(1).match(/.{2}/g);
    let m_n = [];
    m_n[0] = parseInt(m_s[0], 16);
    m_n[1] = parseInt(m_s[1], 16);
    m_n[2] = parseInt(m_s[2], 16);
    return m_n[0] + m_n[1] + m_n[2];
}
colourBtn.style.background = "#000000";
function handleclr_PointerMove() {
    on_clr_window = true;
    let ccv = cur_color.value;
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
        ctype_clr_btn.style.background = ccv;
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
        let ccv = cur_brush_clr;
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
    let ccv = cur_color.value;
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
change_themeBtn.addEventListener("click", () => {
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
select_first_layerBtn.addEventListener("click", () => {
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
const select_second_layerBtn = document.getElementById("layer_button_2");
select_second_layerBtn.addEventListener("click", () => {
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
first_layer_visibilityBtn.addEventListener("click", () => {
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
clear_first_layer_Btn.addEventListener("click", () => {
    original_image_buf = "";
    before_gen_block.style.display = "none";
    ctx_foreground.clearRect(0, 0, cW, cH);
    ctx_layer_1.clearRect(0, 0, lwW, lwH);
    push_action_to_stack(['c', ctx_foreground]);
});
second_layer_visibilityBtn.addEventListener("click", () => {
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
clear_second_layer_Btn.addEventListener("click", () => {
    original_image_buf = "";
    before_gen_block.style.display = "none";
    ctx_background.clearRect(0, 0, cW, cH);
    ctx_layer_2.clearRect(0, 0, lwW, lwH);
    push_action_to_stack(['c', ctx_background]);
});
const merge_layersBtn = document.getElementById("merge_layers");
function merge_layers_in_stack(stack, local_ctx) {
    let substack_1 = [];
    let substack_2 = [];
    let is_changed_stack = [];
    let another_ctx;
    let is_foreground;
    let return_value;
    if (local_ctx == ctx_foreground) {
        another_ctx = ctx_background;
        is_foreground = true;
    }
    else {
        another_ctx = ctx_foreground;
        is_foreground = false;
    }
    for (let i = 0; i < stack.length; i++) {
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
            return_value = [stack, []];
            return return_value;
        }
        return_value = [substack_1.concat(substack_2), is_changed_stack];
        return return_value;
    }
    else {
        if (substack_1.length == 0) {
            return_value = [stack, []];
            return return_value;
        }
        return_value = [substack_2.concat(substack_1), is_changed_stack];
        return return_value;
    }
}
function unmerge_layers_in_stack(stack, local_ctx, local_ics) {
    if (local_ics.length == 0) {
        return stack;
    }
    let substack_1 = [];
    let substack_2 = [];
    let another_ctx;
    let is_foreground;
    if (local_ctx == ctx_foreground) {
        another_ctx = ctx_background;
        is_foreground = true;
    }
    else {
        another_ctx = ctx_foreground;
        is_foreground = false;
    }
    for (let i = 0; i < stack.length; i++) {
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
    let merge_elem = merge_layers_in_stack(pstack, local_draw_ctx);
    let return_value = [merge_elem[1], []];
    pstack = merge_elem[0];
    if (return_value[0].length == 0) {
        return_value[1] = [];
        return return_value;
    }
    merge_elem = merge_layers_in_stack(nstack, local_draw_ctx);
    return_value[1] = merge_elem[1];
    nstack = merge_elem[0];
    replay_actions(pstack);
    if (local_draw_ctx == ctx_foreground) {
        ctx_layer_2.clearRect(0, 0, lwW, lwH);
        canvas_to_layer(canvas_foreground, ctx_layer_1);
    }
    else {
        ctx_layer_1.clearRect(0, 0, lwW, lwH);
        canvas_to_layer(canvas_background, ctx_layer_2);
    }
    return return_value;
}
merge_layersBtn.addEventListener("click", () => {
    let is_changed_stack = merge_layers(cur_draw_ctx);
    if (is_changed_stack[0].length == 0 && is_changed_stack[1].length == 0) {
        return;
    }
    push_action_to_stack(['m', cur_draw_ctx, is_changed_stack[0], is_changed_stack[1]]);
});
const swap_layersBtn = document.getElementById("swap_layers");
function swap_layers_in_stack(stack) {
    let return_value = [[], false];
    for (let i = 0; i < stack.length; i++) {
        if (id_list.includes(stack[i][0])) {
            return_value[1] = true;
            if (stack[i][1] == ctx_foreground) {
                stack[i][1] = ctx_background;
            }
            else {
                stack[i][1] = ctx_foreground;
            }
        }
    }
    return return_value;
}
function swap_layers() {
    let input_value = swap_layers_in_stack(pstack);
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
swap_layersBtn.addEventListener("click", () => {
    swap_layers();
    push_action_to_stack(['s']);
});
graphic_tabletBtn.addEventListener("click", () => {
    if (graphic_tablet_mode) {
        graphic_tabletBtn.style.border = "1px solid #707070";
        graphic_tablet_mode = false;
    }
    else {
        graphic_tabletBtn.style.border = "5px solid #000000";
        graphic_tablet_mode = true;
    }
});
function close_all_add_windows() {
    pencil_w.style.display = "none";
    is_pencil_window = false;
    eraser_w.style.display = "none";
    is_eraser_window = false;
    clr_w.style.display = "none";
    is_clr_window == false;
}
colourBtn.addEventListener("click", () => {
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
        ok_clr.addEventListener("click", () => {
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
    let t_v;
    if (flag) {
        t_v = parseInt(thickness_field.value);
    }
    else {
        t_v = parseInt(e_thickness_field.value);
    }
    t_v -= 1;
    let real_t_v = Math.min(100, Math.max(0, t_v));
    if (t_v != real_t_v) {
        t_v = real_t_v;
    }
    thickness_field.value = (t_v + 1).toString();
    e_thickness_field.value = (t_v + 1).toString();
    thickness_slider.value = (t_v + 1).toString();
    e_thickness_slider.value = (t_v + 1).toString();
    let thickness_k = t_v * t_v * 0.0001; //коэффициент, чтобы толщина не увеличивалась так резко, сейчас это квадрат
    l_width = 1 + Math.max(cW, cH) * thickness_k;
    W_f = (W - cW) / 2 - l_width / 2 + 12;
    H_f = (H - cH) / 2 - l_width / 2 + 12;
    ctx_foreground.lineWidth = l_width;
    ctx_add.lineWidth = l_width;
    ctx_background.lineWidth = l_width;
    update_slider();
}
function change_smoothing() {
    cur_smoothing = parseInt(smoothing_field.value);
    let real_s_v = Math.min(100, Math.max(0, cur_smoothing));
    if (cur_smoothing != real_s_v) {
        cur_smoothing = real_s_v;
        smoothing_field.value = cur_smoothing.toString();
    }
    k_smooth = 0;
    let step = 1.0 / cur_smoothing;
    for (let t = 0; t < 1 + step; t += step) //очень странный костыль, исправлю позже
     {
        t = Math.min(1, t);
        k_smooth++;
    }
    update_slider();
}
thickness_slider.oninput = function () {
    thickness_field.value = thickness_slider.value;
    change_thickness(true);
};
smoothing_slider.oninput = function () {
    smoothing_field.value = smoothing_slider.value;
    change_smoothing();
};
e_thickness_slider.oninput = function () {
    e_thickness_field.value = e_thickness_slider.value;
    change_thickness(false);
};
thickness_field.oninput = function () {
    thickness_slider.value = thickness_field.value;
    change_thickness(true);
};
smoothing_field.oninput = function () {
    smoothing_slider.value = smoothing_field.value;
    change_smoothing();
};
e_thickness_field.oninput = function () {
    e_thickness_slider.value = e_thickness_field.value;
    change_thickness(false);
};
const setpencilBtn = document.getElementById("pencil");
setpencilBtn.style.border = "5px solid #000000";
let cur_tool = ['k', setpencilBtn, "aero_pen.cur"]; //текущий инструмент (карандаш)
setpencilBtn.addEventListener("click", () => {
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
const seteraserBtn = document.getElementById("eraser");
seteraserBtn.addEventListener("click", () => {
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
const setbucketBtn = document.getElementById("bucket");
setbucketBtn.addEventListener("click", () => {
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
const setpipetteBtn = document.getElementById("pipette");
setpipetteBtn.addEventListener("click", () => {
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
    before_gen_block.style.display = "none";
    cur_background_clr = "#fff";
    ctx_background.fillStyle = cur_background_clr;
    ctx_foreground.clearRect(0, 0, cW, cH);
    ctx_background.clearRect(0, 0, cW, cH);
}
function clear_drawfield() {
    original_image_buf = "";
    before_gen_block.style.display = "none";
    cur_background_clr = "#fff";
    ctx_background.fillStyle = cur_background_clr;
    ctx_foreground.clearRect(0, 0, cW, cH);
    ctx_background.fillRect(0, 0, cW, cH);
}
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
    clear_drawfield();
    push_action_to_stack(['d']); //тип - очистка экрана
});
const mhf = document.getElementById("my_hidden_file");
const uploadBtn = document.getElementById("upload");
uploadBtn.addEventListener("click", () => {
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
        chain_id = "";
        const FR = new FileReader();
        FR.addEventListener("load", (evt) => {
            let new_img_w;
            let new_img_h;
            let img = new Image();
            img.addEventListener("load", () => {
                let img_w = img.width;
                let img_h = img.height;
                original_image_w = img_w;
                original_image_h = img_h;
                let new_dfw;
                let new_dfh;
                let is_drawfield_used = false;
                let ps_size = pstack.length;
                let x_paste_pos = 0;
                let y_paste_pos = 0;
                let i;
                if (ps_size != 0 && pstack[0] == 'i', ctx_background, "#fff") {
                    i = 1;
                }
                else {
                    i = 0;
                }
                let local_id_list = ['r', 'p', 'i', 'u', 'f'];
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
const saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", () => {
    let image = new Image();
    if (original_image_buf == "") {
        if (!is_foreground_visible) {
            ctx_foreground.clearRect(0, 0, cW, cH);
        }
        if (!is_background_visible) {
            ctx_background.clearRect(0, 0, cW, cH);
        }
        image.onload = function () {
            let a = document.createElement("a");
            ctx_background.drawImage(image, 0, 0, image.width, image.height, 0, 0, cW, cH);
            a.href = canvas_background.toDataURL("imag/png");
            a.download = "drawing.png";
            a.click();
            replay_actions(pstack);
            canvas_to_layer(canvas_foreground, ctx_layer_1);
            canvas_to_layer(canvas_background, ctx_layer_2);
        };
        image.src = canvas_foreground.toDataURL();
    }
    else {
        let a = document.createElement("a");
        a.href = original_image_buf;
        a.download = "drawing.png";
        a.click();
    }
});
function gen_caption_for_image(data_prop) {
    blackout.style.display = "block";
    let send_data_cpt;
    let data;
    let background_data;
    if (original_image_buf == "") {
        if (is_foreground_visible) {
            data = canvas_foreground.toDataURL("imag/png");
        }
        else {
            data = canvas_background.toDataURL("imag/png");
        }
    }
    else {
        data = original_image_buf;
    }
    let { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots } = data_prop;
    if (local_is_background_used && is_background_visible) {
        background_data = canvas_background.toDataURL("imag/png");
    }
    else {
        background_data = "";
    }
    send_data_cpt = JSON.stringify({
        "type": 'd',
        "chain_id": chain_id,
        "task_id": task_id,
        "data": data,
        "backgroung": background_data,
        "is_drawing": local_is_drawing,
        "sure": local_sure,
        "prims_count": local_how_many_prims,
        "dots_count": local_how_many_dots,
        "img_name": last_task_image_name,
        "img_suf": last_task_image_suffix
    });
    /*
    send_data = JSON.stringify({
        "type": 'd', //просьба сгенерировать описание изображения
        "chain_id": chain_id, //id последнего звена цепочки
        "task_id": task_id, //id задания
        "data": data,
        "backgroung": background_data,
        "img_name": last_task_image_name,
        "img_suf": last_task_image_suffix
    })*/
    ws.send(send_data_cpt);
}
document.addEventListener("pointerenter", (e) => {
    let cX = e.clientX;
    let cY = e.clientY;
    cursor.style.left = (cX + 7.5) + "px";
    cursor.style.top = (cY + 7.5) + "px";
}, { once: true });
function replay_action(act, k_X, k_Y, fW_pred, fH_pred) {
    let act_type = act[0];
    switch (act_type) {
        case 'p': //если это примитив
            let prim = act[2];
            act[1].strokeStyle = act[3];
            act[1].globalCompositeOperation = act[4];
            act[1].beginPath();
            for (let i = 1; i < prim.length; i++) {
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
            original_image_buf = act[2];
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
    let k_X = fW_pred / f_dW;
    let k_Y = fH_pred / f_dH;
    let cur_thickness = 1;
    ctx_foreground.lineWidth = cur_thickness;
    ctx_background.lineWidth = cur_thickness;
    ctx_background.strokeStyle = "#000000";
    ctx_foreground.lineCap = "round";
    ctx_foreground.lineJoin = "round";
    ctx_add.lineCap = "round";
    ctx_add.lineJoin = "round";
    ctx_background.lineCap = "round";
    ctx_background.lineJoin = "round";
    let elem;
    for (let act of cur_pstack) {
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
}
function canvas_to_layer(local_canvas, local_layer) {
    let image_layer = new Image();
    image_layer.onload = function () {
        local_layer.drawImage(image_layer, 0, 0, cW, cH, 0, 0, lwW, lwH);
    };
    image_layer.src = local_canvas.toDataURL();
}
function undo_action() {
    let pstack_size = pstack.length;
    if (pstack_size != 0) {
        let cur_act = pstack.pop();
        let is_r = false;
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
            let buf_r_elem = ['r', fW_max, fH_max, false];
            for (let i = pstack_size - 1; i > -1; i--) {
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
        let cur_act = nstack.pop();
        let local_cur_ctx_layer = cur_ctx_layer;
        let local_cur_canvas = cur_canvas;
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
document.addEventListener("keydown", (event) => {
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
        case "Escape": //скрыть окно просмотра изображения до генерации
            before_gen_block.style.display = "none";
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
document.addEventListener("keyup", (event) => {
    if (event.code.slice(0, 5) == "Shift") {
        if (draw) {
            ctx_add.clearRect(0, 0, cW, cH);
            drawLines(cur_draw_ctx, curprim);
            let cpl = curprim.length - 1;
            prevX = curprim[cpl][0];
            prevY = curprim[cpl][1];
        }
        is_shift_on = false;
    }
}, false);
canvas_additional.addEventListener("pointerdown", (e) => {
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
                cur_ctx_layer = ctx_layer_2;
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
                cur_ctx_layer = ctx_layer_1;
                is_foreground_selected = true;
            }
            else {
                layer_1.style.border = "5px solid #000000";
                layer_2.style.border = "1px solid #707070";
                cur_draw_ctx = ctx_foreground;
                cur_canvas = canvas_layer_1;
                cur_ctx_layer = ctx_layer_1;
                is_foreground_selected = true;
            }
        }
    }
    let cur_x = e.clientX;
    let cur_y = e.clientY;
    prevX = cur_x - W_f;
    prevY = cur_y - H_f;
    draw = true;
    enddraw = false;
    if (is_clr_window == true) {
        close_clr_window();
    }
    else {
        original_image_buf = ""; //очистить буфер изображения
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
    spansToCheck.push({ left, right, y, direction });
}
function checkSpan(pixelData, targetColor, spansToCheck, left, right, y, direction) {
    let inSpan = false;
    let start = 0;
    let x;
    for (x = left; x < right; ++x) {
        let color = getPixel(pixelData, x, y);
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
    let dex_clr = parseInt("FF" + fillColor.slice(6, 8) + fillColor.slice(4, 6) + fillColor.slice(2, 4), 16);
    let imageData = local_ctx.getImageData(0, 0, local_ctx.canvas.width, local_ctx.canvas.height);
    /*let imageData_test_data: Uint8ClampedArray = imageData.data
    for (let i: number = 3; i < imageData_test_data.length; i += 4)
    {
        if (imageData_test_data[i] != 255)
        {
            imageData_test_data[i] = 0
        }
    }
    let pixelData: any = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData_test_data.buffer),
    }*/
    let pixelData = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
    };
    let targetColor = getPixel(pixelData, x, y);
    if (targetColor !== fillColor) {
        let spansToCheck = [];
        addSpan(spansToCheck, x, x, y, 0);
        let iter_max = Math.round(cH) * 2;
        let iter = 0;
        while (spansToCheck.length > 0 && iter <= iter_max) {
            iter++;
            let { left, right, y, direction } = spansToCheck.pop();
            let l = left;
            let iter_l_max = left - cH / 2;
            while (true) {
                --l;
                let color = getPixel(pixelData, l, y);
                if (color !== targetColor || l < iter_l_max) {
                    break;
                }
            }
            ++l;
            let r = right;
            let iter_r_max = right + cW / 2;
            while (true) {
                ++r;
                let color = getPixel(pixelData, r, y);
                if (color !== targetColor || r > iter_r_max) {
                    break;
                }
            }
            let lineOffset = y * pixelData.width;
            pixelData.data.fill(dex_clr, lineOffset + l, lineOffset + r);
            if (direction <= 0) {
                checkSpan(pixelData, targetColor, spansToCheck, l, r, y - 1, -1);
            }
            else {
                checkSpan(pixelData, targetColor, spansToCheck, l, left, y - 1, -1);
                checkSpan(pixelData, targetColor, spansToCheck, right, r, y - 1, -1);
            }
            if (direction >= 0) {
                checkSpan(pixelData, targetColor, spansToCheck, l, r, y + 1, +1);
            }
            else {
                checkSpan(pixelData, targetColor, spansToCheck, l, left, y + 1, +1);
                checkSpan(pixelData, targetColor, spansToCheck, right, r, y + 1, +1);
            }
        }
        local_ctx.putImageData(imageData, 0, 0);
    }
}
d_frame.addEventListener("pointerdown", (e) => {
    if (!draw) {
        prevX = e.clientX - W_f;
        prevY = e.clientY - H_f;
        cfup = fup;
        cfleft = fleft;
        f_move = true;
        end_f_move = false;
    }
    else {
        let cur_x = e.clientX - W_f;
        let cur_y = e.clientY - H_f;
        if (cur_tool[0] == 'p') //если выбрана пипетка
         {
            let rgba = ctx_foreground.getImageData(cur_x - 1, cur_y - 1, 1, 1).data;
            if (!is_foreground_visible) {
                rgba[3] = 0;
            }
            let hex;
            if (rgba[3] == 0) {
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
                let rgba = cur_draw_ctx.getImageData(cur_x, cur_y, 1, 1).data;
                let hex = '#' + ("00000000" + rgbaToHex(rgba[0], rgba[1], rgba[2], rgba[3])).slice(-8);
                if (cur_brush_clr + "ff" != hex) //если цвет выбранной точки не равен текущему
                 {
                    let cur_form_clr = "0x" + cur_brush_clr.slice(1) + "FF";
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
window.addEventListener("pointerup", (e) => {
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
window.addEventListener("pointermove", (e) => //проверка курсора на всём окне, но только один раз
 {
    if (e.pointerType == "pen") {
        graphic_tabletBtn.style.display = "block";
        nav_panel.removeEventListener("pointermove", addGraphicTabletButton);
    }
}, {
    once: true
});
canvas_additional.addEventListener("pointermove", (e) => //проверка курсора на поле для рисования
 {
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
    let res = new Array();
    for (let t = 0; t < 1 + step; t += step) {
        t = Math.min(1, t);
        let ind = res.length;
        res[ind] = [0, 0, 0];
        for (let i = 0; i < arr.length; i++) {
            let b = getBezierBasis(i, arr.length - 1, t);
            res[ind][0] += arr[i][0] * b;
            res[ind][1] += arr[i][1] * b;
            res[ind][2] += arr[i][2] * b;
        }
    }
    return res;
}
function drawLines(local_ctx, arr) {
    local_ctx.beginPath();
    for (let i = 0; i < arr.length - 1; i++) {
        local_ctx.lineWidth = arr[i][2];
        local_ctx.moveTo(arr[i][0], arr[i][1]);
        local_ctx.lineTo(arr[i + 1][0], arr[i + 1][1]);
        local_ctx.stroke();
    }
}
d_frame.addEventListener("pointermove", (e) => //проверка курсора на поле вместе с рамкой
 {
    on_d_frame = true;
    if (!on_d_fiend && !draw) {
        let X = e.clientX - W_min;
        let Y = e.clientY - H_min;
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
    let pX = e.clientX - W_f;
    let pY = e.clientY - H_f;
    let pW = e.pressure;
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
            let drawing_mode;
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
        let currentX = pX * cmp_W - l_width / 2;
        let currentY = pY * cmp_H - l_width / 2;
        let currentW;
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
            original_image_buf = "";
            before_gen_block.style.display = "none";
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
            let delta_x = currentX - prevX;
            let delta_y = currentY - prevY;
            let k_tan = Math.round(Math.atan(delta_y / delta_x) / Pi_div_4);
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
    let prev_f_dW = f_dW;
    let prev_f_dH = f_dH;
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
window.addEventListener("pointermove", (e) => //проверка курсора на всём окне
 {
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
        let cur_new_dfw = f_dW + X_move;
        let cur_new_dfh = f_dH + Y_move;
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
