const body: any = document.querySelector("body")
const cursor: any = document.querySelector(".cursor")
const cursor_image: any = document.querySelector(".cursimg")
let cursor_type: any = -1

const nav_panel: any = document.querySelector(".nav")

const canvas_foreground: any = document.getElementById("canvas_foreground") 
const canvas_background: any = document.getElementById("canvas_background")
const canvas_additional: any = document.getElementById("canvas_additional") 

const canvas_layer_1: any = document.getElementById("layer_1_display_canvas")
const canvas_layer_2: any = document.getElementById("layer_2_display_canvas") 
const layer_icon_1: any = document.getElementById("layer_display_icon_1")
const layer_icon_2: any = document.getElementById("layer_display_icon_2")

const d_frame: any = document.getElementById("d_frame")
const spanel: any = document.getElementById("mySidepanel")
const spanel_openbtn: any = document.querySelector(".openbtn")
const generateBtn: any = document.getElementById("generate")

const clr_w: any = document.getElementById("clr_window")
const pencil_w: any = document.getElementById("pencil_window")
const eraser_w: any = document.getElementById("eraser_window")
const ok_clr_btn: any = document.getElementById("ok_clr_btn") 
const cur_color: any = document.getElementById("color") 
const clrimg: any = document.getElementById("clrimg")

const ctx_foreground: any = canvas_foreground.getContext("2d", { willReadFrequently: true })
const ctx_background: any = canvas_background.getContext("2d", { willReadFrequently: true })
const ctx_add: any = canvas_additional.getContext("2d", { willReadFrequently: true })

const ctx_layer_1: any = canvas_layer_1.getContext("2d", { willReadFrequently: true })
const ctx_layer_2: any = canvas_layer_2.getContext("2d", { willReadFrequently: true })

const ratio_field: any = document.querySelector(".f_ratio")
const ratio_tooltip: any = document.querySelector("ratio_tooltip")

const thickness_slider: any = document.getElementById("thickness_sliderValue")
const thickness_field: any = document.getElementById("thickness_rangeValue")
const smoothing_slider: any = document.getElementById("smoothing_sliderValue")
const smoothing_field: any = document.getElementById("smoothing_rangeValue")
const e_thickness_slider: any = document.getElementById("e_thickness_sliderValue")
const e_thickness_field: any = document.getElementById("e_thickness_rangeValue")

const layer_1: any = document.getElementById("layer_1")
const layer_2: any = document.getElementById("layer_2")

const scale_field: any = document.querySelector(".scale_field")
const div_layers: any = document.querySelector(".layers")
const layers_buttons: any = document.querySelector(".layers_buttons")

const modal_header: any = document.querySelector(".modal__header")
const modal_body: any = document.querySelector(".modal__body")
const modal_footer: any = document.querySelector(".modal__footer")

const text_label_clr: any = document.getElementById("text_label_clr")
const blackout: any = document.getElementById("full_blackout")
const side_panel_blackout: any = document.getElementById("side_panel_blackout")

const EL: any = (sel: any) => document.querySelector(sel)

const id_list: any = ['p', 'i', 'u', 'f']

const Pi_div_4: any = Math.PI / 4

let nstack: any = []
let pstack: any = []
let curprim: any = []
let fp: any = true
let on_d_frame: any = false
let on_d_fiend: any = false

let prevX: any = null
let prevY: any = null
let move_prevX: any = null
let move_prevY: any = null
let X_move: any = null
let Y_move: any = null

let cX: any
let cY: any

let is_shift_on: any = false

let fup: any = false
let fdown: any = false
let fright: any = false
let fleft: any = false 
let cfup: any = false
let cfleft: any = false

let W: any = window.innerWidth
let H: any = window.innerHeight

let fW_max: any = W * 0.8
let fH_max: any = H * 0.8
let fW_min: any = W * 0.1
let fH_min: any = H * 0.1

let cW: any = canvas_foreground.offsetWidth
let cH: any = canvas_foreground.offsetHeight
let cD: any = cW / cH
let Max_cW: any = cW
let Max_cH: any = cH

let lW: any = layer_icon_1.offsetWidth
let lH: any = layer_icon_1.offsetHeight
let lwW: any = canvas_layer_1.width
let lwH: any = canvas_layer_1.height
let orig_lW: any = lW
let orig_lH: any = lH
let orig_lD: any = lW / lH

if (cD > orig_lD)
{
    lW = orig_lW
    lH = orig_lW / cD
}
else
{
    lH = orig_lH
    lW = orig_lH * cD
}

let lWp: any = Math.round(995 * (lW / orig_lW)) / 10 + "%"
let lHp: any = Math.round(1000 * (lH / orig_lH)) / 10 + "%"
layer_icon_1.style.width = lWp
layer_icon_2.style.width = lWp
layer_icon_1.style.height = lHp
layer_icon_2.style.height = lHp
/*layer_alpha_img_1.width = lWp
layer_alpha_img_1.height = lHp
layer_alpha_img_2.width = lWp
layer_alpha_img_2.height = lHp*/

let cur_real_ratio: any = cH / cW

let l_width: any = 1

let W_f: any = (W - cW) / 2 - l_width / 2 + 12
let H_f: any = (H - cH) / 2 - l_width / 2 + 12
let f_dW: any = d_frame.offsetWidth
let f_dH: any = d_frame.offsetHeight
let orig_f_dW: any = f_dW
let orig_f_dH: any = f_dH
let fW_pred: any = orig_f_dW
let fH_pred: any = orig_f_dH
let cmp_W: any = 1
let cmp_H: any = 1
let cmp_W_b: any = 0
let cmp_H_b: any = 0
d_frame.width = f_dW
d_frame.height = f_dH
let H_min: any = (H - f_dH) / 4
let H_max: any = f_dH + H_min

let W_min: any = (W - f_dW) / 4
let W_max: any = f_dW + W_min

canvas_foreground.height = cH
canvas_foreground.width = cW
canvas_background.height = cH
canvas_background.width = cW
canvas_additional.height = cH
canvas_additional.width = cW

let draw: any = false
let enddraw: any = false
let f_move: any = false
let end_f_move: any = false

let old_btn_clr: any = false //изначально чёрный текст у кнопок цвета
let on_clr_window: any = false

let cur_background_clr: any = "#fff"
let new_background_clr: any = cur_background_clr
let cur_brush_clr: any = "#000000"

ctx_background.fillStyle = cur_background_clr //заливка фона белым, костыль, убрать
ctx_layer_2.fillStyle = cur_background_clr //заливка иконки фона белым, костыль, убрать
pstack.push(['i', ctx_background, cur_background_clr])
ctx_background.fillRect(0, 0, cW, cH)
ctx_layer_2.fillRect(0, 0, cW, cH)
let is_clr_brash: any = true

let cur_ratio_val: any = get_visual_ratio(false, cW, cH)
ratio_field.value = cur_ratio_val //устанавливаем соотношение сторон при запуске

let is_first_upload_btn_click: any = true //костыль, чтобы кнопка не срабатывала дважды

let is_foreground_selected: any = true //выбран ли верхний слой, по-умолчанию выбран
let cur_draw_ctx: any = ctx_foreground //текущий выбранный слой для рисования, по-умолчанию верхний
let cur_canvas: any = canvas_foreground //текущий выбранный слой для рисования ввиде слоя, не контекста, по-умолчанию верхний
let cur_ctx_layer: any = ctx_layer_1 //текущий выбранный слой для рисования ввиде контекста кнопки который в углу, по-умолчанию верхний

let graphic_tablet_mode: any = false //режим графического планшета

let is_clr_window: any = false //отображение окна с палитрой
let is_pencil_window: any = true //отображение окна настроек кисти
let is_eraser_window: any = false //отображение окна настроек ластика

let cur_smoothing: any = 0 //параметр сглаживания
let cur_smooth_prim: any = [] //текущий сглаженный примитив
let k_smooth: any = 0 //текущий коэффициент сглаживания

let is_foreground_visible: any = true //включена ли видимость переднего слоя
let is_background_visible: any = true //включена ли видимость заднего слоя

ctx_foreground.lineCap = "round"
ctx_foreground.lineJoin = "round"
ctx_add.lineCap = "round"
ctx_add.lineJoin = "round"
ctx_background.lineCap = "round"
ctx_background.lineJoin = "round"

layer_1.style.border = "5px solid #000000"
layer_2.style.border = "1px solid #707070"

let is_dark_mode: any = false //тёмная тема (отключена по-умолчанию)
let is_modal_open: any = false
let is_side_panel_open: any = false

let caption_field: any
let style_field: any
let is_human_caption: any
let original_image_buf: any = "" //переменная для хранения исходных изображений


let ws: any = new WebSocket("wss://stabledraw.com:8081")
let chain_id: any = -1
let task_id: any

var main_modal: any = function (options: any) 
{
    var _elemModal: any
    var _eventShowModal: any
    var _eventHideModal: any
    var _hiding: any = false
    var _destroyed: any = false
    var _animationSpeed: any = 200
    function _createModal(options: any) 
    {
        var elemModal: any = document.createElement("div"),
        modalTemplate = '<div class="modal__backdrop" data-dismiss="modal"><div class="modal__content"><div class="modal__header"><div class="modal__title" data-modal="title">{{title}}</div><span class="modal__btn-close" data-dismiss="modal" title="Закрыть">&times;</span></div><div class="modal__body" data-modal="content">{{content}}</div>{{footer}}</div></div>',
        modalFooterTemplate = '<div class = "modal__footer">{{buttons}}</div>',
        modalButtonTemplate = '<button type = "button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>',
        modalHTML, modalFooterHTML = ""
        elemModal.classList.add("modal")
        modalHTML = modalTemplate.replace("{{title}}", options.title || "")
        modalHTML = modalHTML.replace("{{content}}", options.content || "")
        if (options.footerButtons) 
        {
            for (var i: any = 0, length = options.footerButtons.length; i < length; i++) 
            {
                var modalFooterButton = modalButtonTemplate.replace("{{button_class}}", options.footerButtons[i].class)
                modalFooterButton = modalFooterButton.replace("{{button_handler}}", options.footerButtons[i].handler)
                modalFooterButton = modalFooterButton.replace("{{button_text}}", options.footerButtons[i].text)
                modalFooterHTML += modalFooterButton
            }
        }
        modalFooterHTML = modalFooterTemplate.replace("{{buttons}}", modalFooterHTML)
        modalHTML = modalHTML.replace("{{footer}}", modalFooterHTML)
        elemModal.innerHTML = modalHTML
        document.body.appendChild(elemModal)
        return elemModal
    }
    function _showModal()
    {
        is_modal_open = true
        if (!_destroyed && !_hiding) 
        {
            _elemModal.classList.add("modal__show")
            document.dispatchEvent(_eventShowModal)
        }
    }
    function _hideModal()
    {
        is_modal_open = false
        _hiding = true
        _elemModal.classList.remove("modal__show")
        _elemModal.classList.add("modal__hiding")
        setTimeout(function () 
        {
            _elemModal.classList.remove("modal__hiding")
            _hiding = false
        }, _animationSpeed)
        document.dispatchEvent(_eventHideModal)
    }
    function _handlerCloseModal(e: any) 
    {
        if (e.target.dataset.dismiss === "modal") 
        {
            _hideModal()
        }
    }
    _elemModal = _createModal(options)
    _elemModal.addEventListener("click", _handlerCloseModal)
    _eventShowModal = new CustomEvent("show.modal", { detail: _elemModal })
    _eventHideModal = new CustomEvent("hide.modal", { detail: _elemModal })
    return {
        show: _showModal,
        hide: _hideModal,
        destroy: function () 
        {
            _elemModal.parentElement.removeChild(_elemModal),
            _elemModal.removeEventListener("click", _handlerCloseModal),
            _destroyed = true;
        }, setContent: function (html: any) 
        {
            _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
        }, setTitle: function (text: any) 
        {
            _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    }
};
(function () 
{
    var modal: any = main_modal({
        title: "Генерация",
        content: "<p>Содержмиое модального окна...<p>",
        footerButtons: [
            { class: "modal_btn modal_btn-3", id: "cur_gen_params_btn", text: "Параметры", handler: "modalHandlerParams" },
            { class: "modal_btn modal_btn-2", id: "SD1_btn", text: "StableDiffusion 1", handler: "modalHandlerGenSD1" },
            { class: "modal_btn modal_btn-2", id: "SD2_btn", text: "StableDiffusion 2", handler: "modalHandlerGenSD2" },
            { class: "modal_btn modal_btn-1", text: "Отмена", handler: "modalHandlerCancel" }
        ]
    })
    document.addEventListener("show.modal", function (e: any) 
    {
        //document.querySelector(".actions").textContent = "Действия при открытии модального окна..."
        // получить ссылку на DOM-элемент показываемого модального окна (.modal)
        //console.log(e.detail)
    })
    document.addEventListener("hide.modal", function (e: any) 
    {
        //document.querySelector(".actions").textContent = "Действия при закрытии модального окна..."
        // получить ссылку на DOM-элемент скрываемого модального окна (.modal)
        //console.log(e.detail)
    })
    document.addEventListener("click", function (e: any) 
    {
        if (e.target.dataset.toggle === "modal") 
        {
            let elemTarget: any = e.target
            let content: any
            if (original_image_buf == "")
            {
                content = 'Подпись:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"/><p><button class = "modal_btn modal_btn-2" id = "modal_caption_auto_gen" onclick = "gen_caption_for_image()">Сгенерировать автоматически</button><p>Стиль:<p><input class = "modal_input" id = "style_input" value = "4к фотореалистично" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"/>'
            }
            else
            {
                content = 'Подпись:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"/><p><button class = "modal_btn modal_btn-2" id = "modal_caption_auto_gen" onclick = "gen_caption_for_image()">Сгенерировать автоматически</button><button class = "modal_btn modal_btn-4" style = "right: 25%" onclick = "upscale()">Апскейл</button><button class = "modal_btn modal_btn-4" onclick = "delete_background()">Удалить фон</button><p>Стиль:<p><input class = "modal_input" id = "style_input" value = "4к фотореалистично" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"/>'
            }
            modal.show()
            modal.setContent(content)
            caption_field = document.getElementById("caption_input")
            style_field = document.getElementById("style_input")
            ws.onmessage = function (event: any)
            {
                var jdata: any = JSON.parse(event.data)
                var type: any = jdata[0]
                if (type == 't') //если текстовое сообщение
                {
                    //alert(jdata[1])
                    return
                }
                if (type == 'c') //если подпись
                {
                    task_id = jdata[1]
                    caption_field.value = jdata[2]
                    chain_id = jdata[3]
                    last_task_image_name = jdata[4]
                    is_human_caption = false
                    blackout.style.display = "none"
                    return
                }
                if (type == 'i') //если изображение
                {
                    let image: any = new Image()
                    image.onload = function() 
                    {
                        ctx_foreground.clearRect(0, 0, cW, cH) // очищаем верхний холст
                        ctx_foreground.drawImage(image, 0, 0, jdata[2], jdata[3], 0, 0, cW, cH)
                        push_action_to_stack(['u', cur_draw_ctx, image, jdata[2], jdata[3]])
                        ctx_layer_1.clearRect(0, 0, lwW, lwH)
                        canvas_to_layer(cur_canvas, cur_ctx_layer)
                    }
                    original_image_buf = "data:image/png;base64," + jdata[1]
                    image.src = original_image_buf
                    chain_id = jdata[4]
                    last_task_image_name = jdata[5]
                    blackout.style.display = "none"
                    modal.hide()
                    return
                }
            }
        } 
        else if (e.target.dataset.handler === "modalHandlerCancel")
        {
            modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку Отмена, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerParams")
        {
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerGenSD1") 
        {
            if (caption_field.value == "")
            {
                gen_caption_for_image()
            }
            let full_prompt: any = caption_field.value + " " + style_field.value
            gen_picture_by_promot(false, full_prompt)
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerGenSD2") 
        {
            if (caption_field.value == "")
            {
                gen_caption_for_image()
            }
            let full_prompt = caption_field.value + " " + style_field.value
            gen_picture_by_promot(true, full_prompt)
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.dismiss === "modal") 
        {
            //document.querySelector(".message").textContent = "Вы закрыли модальное окно нажав на крестик или на область вне модального окна, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
    })
})()

let last_task_image_name: any = "drawing_0.png"

//ws.onopen = function(){alert("open");} 

ws.onclose = function() //Убрать
{
    alert("Соединение разорвано");
}

//ws.onerror = function(){alert("error");}

function check_data_before_sending() //проверяет что именно будет отправляться. Функция временная, нужна для сбора статистики по рисункам. Её потом нужно будет заменить прочто на проверку использован ли передний план или фон
{
    let local_is_foreground_used: any = false
    let local_is_background_used: any = false
    let local_is_drawing_on_foreground: any = true
    let local_is_drawing_on_background: any = true
    let local_sure_on_foreground: any = true
    let local_sure_on_background: any = true
    let local_how_many_prims_on_foreground: any = 0
    let local_how_many_dots_on_foreground: any = 0
    let local_how_many_prims_on_background: any = 0
    let local_how_many_dots_on_background: any = 0
    for (let i: any = 0; i < pstack.length; i++)
    {
        switch (pstack[i][0])
        {
            case 'p':
                if (pstack[i][1] == ctx_foreground)
                {
                    if (local_is_drawing_on_foreground == false && local_sure_on_foreground == true)
                    {
                        local_sure_on_foreground = false
                    }
                    local_is_drawing_on_foreground = true
                    local_is_foreground_used = true
                    local_how_many_prims_on_foreground++
                    local_how_many_dots_on_foreground += pstack[i][2].length
                }
                else
                {
                    if (local_is_drawing_on_background == false && local_sure_on_background == true)
                    {
                        local_sure_on_background = false
                    }
                    local_is_drawing_on_background = true
                    local_is_background_used = true
                    local_how_many_prims_on_background++
                    local_how_many_dots_on_background += pstack[i][2].length
                }
                break
            case 'f':
                if (pstack[i][1] == ctx_foreground)
                {
                    if (local_is_drawing_on_foreground == false && local_sure_on_foreground == true)
                    {
                        local_sure_on_foreground = false
                    }
                    local_is_drawing_on_foreground = true
                    local_is_foreground_used = true
                    local_how_many_prims_on_foreground++
                }
                else
                {
                    if (local_is_drawing_on_background == false && local_sure_on_background == true)
                    {
                        local_sure_on_background = false
                    }
                    local_is_drawing_on_background = true
                    local_is_background_used = true
                    local_how_many_prims_on_background++
                }
                break
            case 'd':
                local_is_foreground_used = false
                local_is_background_used = false
                local_is_drawing_on_foreground = true
                local_is_drawing_on_background = true
                local_sure_on_foreground = true
                local_sure_on_background = true
                local_how_many_prims_on_foreground = 0
                local_how_many_dots_on_foreground = 0
                local_how_many_prims_on_background = 0
                local_how_many_dots_on_background = 0
                break
            case 'i':
                if (pstack[i][2] == "#fff")
                {
                    if (pstack[i][1] == ctx_foreground)
                    {
                        local_is_foreground_used = false
                        local_is_drawing_on_foreground = true
                        local_sure_on_foreground = true
                        local_how_many_prims_on_foreground = 0
                        local_how_many_dots_on_foreground = 0
                    }
                    else
                    {
                        local_is_background_used = false
                        local_is_drawing_on_background = true
                        local_sure_on_background = true
                        local_how_many_prims_on_background = 0
                        local_how_many_dots_on_background = 0
                    }
                }
                else
                {
                    if (pstack[i][1] == ctx_foreground)
                    {
                        local_sure_on_foreground = true
                        local_is_drawing_on_foreground = true
                        local_is_foreground_used = true
                        local_how_many_prims_on_foreground++
                        local_how_many_prims_on_foreground = 0
                        local_how_many_dots_on_foreground = 0

                    }
                    else
                    {
                        local_sure_on_background = false
                        local_is_drawing_on_background = true
                        local_is_background_used = true
                        local_how_many_prims_on_background++
                        local_how_many_prims_on_background = 0
                        local_how_many_dots_on_background = 0
                    }
                }
                break
            case 'c':
                if (pstack[i][1] == ctx_foreground)
                {
                    local_is_foreground_used = false
                    local_is_drawing_on_foreground = true
                    local_sure_on_foreground = true
                    local_how_many_prims_on_foreground = 0
                    local_how_many_dots_on_foreground = 0
                }
                else
                {
                    local_is_background_used = false
                    local_is_drawing_on_background = true
                    local_sure_on_background = true
                    local_how_many_prims_on_background = 0
                    local_how_many_dots_on_background = 0
                }
                break
            case 'u':
                if (pstack[i][1] == ctx_foreground)
                {
                    if (local_is_drawing_on_foreground == true && local_sure_on_foreground == true)
                    {
                        local_sure_on_foreground = false
                    }
                    local_is_drawing_on_foreground = false
                    local_is_foreground_used = true
                    local_how_many_prims_on_foreground = 0
                    local_how_many_dots_on_foreground = 0
                }
                else
                {
                    if (local_is_drawing_on_background == true && local_sure_on_background == true)
                    {
                        local_sure_on_background = false
                    }
                    local_is_drawing_on_background = false
                    local_is_background_used = true
                    local_how_many_prims_on_background = 0
                    local_how_many_dots_on_background = 0
                }
                break
            default:
                break
        }
    }
    let local_is_drawing: any
    let local_sure: any
    let local_how_many_prims: any
    let local_how_many_dots: any
    if (!local_is_foreground_used)
    {
        local_how_many_prims_on_foreground = 0
        local_how_many_dots_on_foreground = 0
        local_sure_on_foreground = true
        local_is_drawing_on_foreground = true
    }
    if (!local_is_background_used)
    {
        local_how_many_prims_on_background = 0
        local_how_many_dots_on_background = 0
        local_sure_on_background = true
        local_is_drawing_on_background = true
    }
    if (local_sure_on_foreground && local_sure_on_background)
    {
        local_sure = true
    }
    else
    {
        local_sure = false
    }
    if (local_is_drawing_on_foreground && !local_is_drawing_on_background)
    {
        local_is_drawing = true
        local_sure = false
    }
    else
    {
        if (!local_is_drawing_on_foreground && local_is_drawing_on_background)
        {
            local_is_drawing = false
            local_sure = false
        }
        else
        {
            if (local_is_drawing_on_foreground && local_is_drawing_on_background)
            {
                local_is_drawing = true
            }
            else
            {
                local_is_drawing = false
            }
        }
    }
    local_how_many_prims = local_how_many_prims_on_foreground + local_how_many_prims_on_background
    local_how_many_dots = local_how_many_dots_on_foreground + local_how_many_dots_on_background
    if (local_how_many_prims == 0)
    {
        local_is_drawing = false
        local_sure = true
    }
    return { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots }
}

function push_action_to_stack(local_act: any)
{
    let need_add: any = true
    let pstack_length: any = pstack.length - 1
    if (pstack_length != -1 && pstack[pstack_length][0] == local_act[0] && local_act[0] != 'p' && local_act[0] != 'u' && pstack[pstack_length] == local_act)
    {
        need_add = false
    }
    if (need_add)
    {
        pstack.push(local_act)
        nstack = []
    }
}

function gen_picture_by_promot(is_SD2: any, full_prompt: any)
{
    blackout.style.display = "block"
    let local_type: any
    let send_data: any
    if (is_SD2)
    {
        local_type = "2"
    }
    else
    {
        local_type = "1"
    }
    if (is_human_caption)
    {
        let data: any
        let background_data: any
        if (original_image_buf == "")
        {
            if (is_foreground_visible)
            {
                data = canvas_foreground.toDataURL("imag/png")
            }
            else
            {
                if (is_background_visible)
                {
                    data = canvas_background.toDataURL("imag/png")
                }
                else
                {
                    alert("Выключены оба слоя, вы не можете отправить изображение")
                    return
                }
            }
        }
        else
        {
            data = original_image_buf
        }
        let { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots }: any = check_data_before_sending()
        if (original_image_buf == "")
        {
            if (local_is_background_used && is_background_visible)
            {
                background_data = canvas_background.toDataURL("imag/png")
            }
            else
            {
                background_data = ""
            }
        }
        else
        {
            background_data = ""
        }
        if (chain_id != -1)
        {
            data = ""
            background_data = ""
        }
        send_data = JSON.stringify({
            "type": "hg" + local_type, //рисунок
            "chain_id": chain_id, //id последнего звена цепочки
            "task_id": task_id, //id задания
            "data": data,
            "backgroung": background_data,
            "prompt": full_prompt, //подпись к изображению
            "is_drawing": local_is_drawing,
            "sure": local_sure,
            "prims_count": local_how_many_prims,
            "dots_count": local_how_many_dots,
            "img_name": last_task_image_name
        })

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
    else
    {
        send_data = JSON.stringify({ 
            "type": 'g' + local_type, //просьба сгенерировать с машинной подписью
            "chain_id": chain_id, //id последнего звена цепочки
            "task_id": task_id, //id задания
            "img_name": last_task_image_name //имя последнего файла изображения
        });
    }
    ws.send(send_data)
}

function delete_background()
{
    blackout.style.display = "block"
    let task_id: any = -1
    let data: any = original_image_buf
    if (chain_id != -1) 
    {
        data = ""
    }
    let send_data_del: any = JSON.stringify({ 
        "type": 'b', //просьба удалить фон
        "data": data,
        "chain_id": chain_id, //id последнего звена цепочки
        "task_id": task_id, //id задания
        "img_name": last_task_image_name //имя последнего файла изображения
    });
    ws.send(send_data_del)
}

function upscale()
{
    blackout.style.display = "block"
    let task_id: any = -1
    let data: any = original_image_buf
    if (chain_id != -1)
    {
        data = ""
    }
    let send_data_ups: any = JSON.stringify({
        "type": 'a', //просьба апскейлить изображение
        "data": data,
        "chain_id": chain_id, //id последнего звена цепочки
        "task_id": task_id, //id задания
        "img_name": last_task_image_name //имя последнего файла изображения
    });
    ws.send(send_data_ups)
}

window.onresize = function()
{
    W = document.documentElement.clientWidth
    H = document.documentElement.clientHeight
    fW_max = W * 0.8
    fH_max = H * 0.8
    fW_min = W * 0.1
    fH_min = H * 0.1
    cW = canvas_foreground.offsetWidth
    cH = canvas_foreground.offsetHeight
    Max_cW = cW
    Max_cH = cH
    cur_real_ratio = cH / cW
    W_f = (W - cW) / 2 - l_width / 2 + 12
    H_f = (H - cH) / 2 - l_width / 2 + 12
    f_dW = d_frame.offsetWidth
    f_dH = d_frame.offsetHeight
    orig_f_dW = f_dW
    orig_f_dH = f_dH
    d_frame.width = f_dW
    d_frame.height = f_dH
    H_min = (H - f_dH) / 4
    H_max = f_dH + H_min
    W_min = (W - f_dW) / 4
    W_max = f_dW + W_min
    canvas_foreground.height = cH
    canvas_foreground.width = cW
    canvas_background.height = cH
    canvas_background.width = cW
    canvas_additional.height = cH
    canvas_additional.width = cW
    replay_actions(pstack)
}

let slider_range: any = document.querySelectorAll('input[type="range"]')

function update_slider() //заменить на обдновление одного слайдера, а не всех (костыль)
{
    for (let e of slider_range)
    {
        e.style.setProperty('--value', e.value);
    }
}

for (let e of slider_range)
{
    e.style.setProperty("--value", e.value);
    e.style.setProperty("--min", e.min == "" ? '0' : e.min);
    e.style.setProperty("--max", e.max == "" ? "100" : e.max);
    e.addEventListener("input", () => e.style.setProperty("--value", e.value));
}

ratio_field.onchange = function() 
{
    let t_v: any = ratio_field.value
    let pos: any = t_v.indexOf(':')
    if (pos == -1) 
    {
        ratio_field.value = cur_ratio_val
        return
    }
    if (t_v[0] == '≈')
    {
        t_v = t_v.slice(1)
        pos--
    }
    let new_r_w_s: any = t_v.slice(0, pos)
    let new_r_h_s: any = t_v.slice(pos + 1)
    let new_r_w: any = parseInt(new_r_w_s)
    let new_r_h: any = parseInt(new_r_h_s)
    let new_dfw: any
    let new_dfh: any
    if(new_r_w / new_r_h > Max_cW / Max_cH)
    {
        new_dfh = Math.max(fH_min, (fW_max / new_r_w) * new_r_h)
        new_dfw = fW_max
    }
    else
    { 
        new_dfw = Math.max(fW_min, (fH_max / new_r_h) * new_r_w)
        new_dfh = fH_max
    }
    fW_pred = f_dW
    fH_pred = f_dH
    change_drawfield_size(new_dfw, new_dfh)
    push_action_to_stack(['r', new_dfw, new_dfh, true])
    replay_actions(pstack) //Повторная отрисовка с новым разрешением
    return get_visual_ratio(true, new_dfw, new_dfh)
}

function get_visual_ratio(abs: any, w: any, h: any)
{
    let rat: any = [[2.0556, 21, 9], [1.5556, 16, 9], [1.1667, 4, 3], [0.875, 1, 1], [0.6562, 3, 4], [0.4955, 9, 16]]
    let cur_ratio: any = w / h
    let v_w: any
    let v_h: any
    let cur_k: any
    if (cur_ratio <= 0.4955)
    {
        v_w = 9
        v_h = 21
    }
    else
    {
        let r: any
        for (r of rat)
        {
            if (cur_ratio > r[0])
            {
                v_w = r[1]
                v_h = r[2]
                break
            }
        }
    }
    if (cur_ratio > v_w / v_h)
    {
        cur_k = h / v_h
        v_w = Math.round(w / cur_k)
    }
    else
    {
        cur_k = w / v_w
        v_h = Math.round(h / cur_k)
    }
    let res: any = (v_w).toString() + ":" + (v_h).toString()
    if (!abs)
    {
        res = "≈" + res
    }
    return res
}

// Установить ширину боковой панели на 250 пикселей (показать)
function openNav() 
{
    is_side_panel_open = true
    side_panel_blackout.style.display = "block"
    spanel.style.width = "250px";
    spanel.style.border = "2px solid #4c4c4c";
    spanel.style.borderLeftStyle = "hidden"
    spanel.style.borderTopStyle = "hidden"
}

function closeNav_border()
{
    spanel.style.borderLeftStyle = "hidden"
    spanel.style.borderRightStyle = "hidden"
}

function closeNav() 
{
    is_side_panel_open = false
    side_panel_blackout.style.display = "none"
    spanel.style.width = "0"
    setTimeout(closeNav_border, 490)
}

let backBtn: any = document.getElementById("arrow_back")

backBtn.addEventListener("click", () => 
{
    undo_action()
})

let nextBtn: any = document.getElementById("arrow_next")

nextBtn.addEventListener("click", () => 
{
    repeat_action()
})

const initial_picker = $(document).ready(function ()
{
    let picker: any = $("#picker")
    let picker_fabritastic: any = picker.farbtastic("#color")
})

function hexDec(h: any)
{
    let m: any = h.slice(1).match(/.{2}/g)
    m[0] = parseInt(m[0], 16)
    m[1] = parseInt(m[1], 16)
    m[2] = parseInt(m[2], 16)
    return m[0] + m[1] + m[2]
}

let colourBtn: any = document.getElementById("palette")
colourBtn.style.background = "#000000"
let ok_clr: any = document.querySelector(".ok_clr_btn")
let ctype_clr_btn: any = document.querySelector(".ctype_clr_btn")

function handleclr_PointerMove() 
{
    on_clr_window = true
    let ccv: any = cur_color.value
    if (ccv == "#NaNNaNNaN")
    {
        ccv = "#" + colourBtn.style.background.split("(")[1].split(")")[0].split(",").map(function (x: any) 
        {
            x = parseInt(x).toString(16)
            return (x.length==1) ? "0" + x : x
        }).join("")
        cur_color.value = ccv
    }
    if (hexDec(ccv) > 382)
    {
        if(!old_btn_clr)
        {
            old_btn_clr = true
            ok_clr_btn.style.color = "#000000"
            clrimg.style.filter = "invert(0)"
        }
    }
    else
    {
        if(old_btn_clr)
        {
            old_btn_clr = false
            ok_clr_btn.style.color = "#fff"
            clrimg.style.filter = "invert(1)"
        }
    }
    if (is_clr_brash)
    {
        ctype_clr_btn.background = ccv
    }
    ok_clr_btn.style.background = ccv
    colourBtn.style.background = ccv
}

function handlet_clr_Click()
{
    if (is_clr_brash)
    {
        cur_brush_clr = cur_color.value
        ctype_clr_btn.textContent = "Цвет кисти"
        cur_color.value = cur_background_clr
        if (hexDec(cur_brush_clr) > 382)
        {
            ctype_clr_btn.style.color = "#000000"
            clrimg.style.filter = "invert(0)"
        }
        else
        {
            ctype_clr_btn.style.color = "#fff"
            clrimg.style.filter = "invert(1)"
        }
        ctype_clr_btn.style.background = cur_brush_clr
        is_clr_brash = false
    }
    else
    {
        ctype_clr_btn.textContent = "Цвет фона"
        let ccv = cur_brush_clr
        new_background_clr = cur_color.value
        cur_color.value = ccv
        if (hexDec(new_background_clr) > 382)
        {
            ctype_clr_btn.style.color = "#000000"
            clrimg.style.filter = "invert(0)"
        }
        else
        {
            ctype_clr_btn.style.color = "#fff"
            clrimg.style.filter = "invert(1)"
        }
        ctype_clr_btn.style.background = new_background_clr
        if (hexDec(ccv) > 382)
        {
            if(!old_btn_clr)
            {
                old_btn_clr = true
                clrimg.style.filter = "invert(0)"
            }
        }
        else
        {
            if(old_btn_clr)
            {
                old_btn_clr = false
                clrimg.style.filter = "invert(1)"
            }
        }
        ok_clr_btn.style.background = ccv
        colourBtn.style.background = ccv
        is_clr_brash = true
    }
}

function close_clr_window()
{
    clr_w.removeEventListener("pointermove", handleclr_PointerMove)
    ctype_clr_btn.removeEventListener("click", handlet_clr_Click)
    is_clr_window = false
    let ccv: any = cur_color.value
    if (ccv == "#NaNNaNNaN")
    {
        ccv = "#" + colourBtn.style.background.split("(")[1].split(")")[0].split(",").map(function (x: any) 
        {
            x = parseInt(x).toString(16)
            return (x.length==1) ? "0" + x : x
        }).join("")
        cur_color.value = ccv
    }
    if (!is_clr_brash)
    {
        new_background_clr = ccv
        is_clr_brash = true
    }
    else
    {
        cur_brush_clr = ccv
    }
    if (cur_background_clr != new_background_clr) //почему-то не работает, из-за этого пришлось сделать костыль строчкой сверху. Убрать
    {
        push_action_to_stack(['i', ctx_background, new_background_clr])//залить фон
        ctx_background.fillStyle = new_background_clr //заливка фона
        ctx_background.fillRect(0, 0, cW, cH)
        canvas_to_layer(canvas_background, ctx_layer_2)
    }
    ctx_foreground.strokeStyle = cur_brush_clr
    ctx_add.strokeStyle = cur_brush_clr
    ctx_background.strokeStyle = cur_brush_clr
    clr_w.style.display = "none"
}

const change_themeBtn: any = document.getElementById("change_theme")
const tmimg: any = document.getElementById("theme_mode_img")
const graphic_tabletBtn: any = document.getElementById("graphic_tablet")
const first_layer_visibilityBtn: any = document.getElementById("layer_1_visibility_button")
const first_layer_visibility_img: any = document.getElementById("layer_1_visibility_img")
const second_layer_visibilityBtn: any = document.getElementById("layer_2_visibility_button")
const second_layer_visibility_img: any = document.getElementById("layer_2_visibility_img")
const clear_first_layer_Btn: any = document.getElementById("clear_layer_1")
const clear_second_layer_Btn: any = document.getElementById("clear_layer_2")

change_themeBtn.addEventListener("click", () => 
{
    if (is_dark_mode)
    {
        tmimg.setAttribute("src", "dark mode.png")
        is_dark_mode = false
        nav_panel.style.filter = "invert(0)"
        graphic_tabletBtn.style.filter = "invert(0)"
        spanel.style.filter = "invert(0)"
        spanel_openbtn.style.filter = "invert(0)"
        colourBtn.style.filter = "invert(0)"
        scale_field.style.filter = "invert(0)"
        layers_buttons.style.filter = "invert(0)"
        first_layer_visibilityBtn.style.filter = "invert(0)"
        second_layer_visibilityBtn.style.filter = "invert(0)"
        clear_first_layer_Btn.style.filter = "invert(0)"
        clear_second_layer_Btn.style.filter = "invert(0)"
        pencil_w.style.filter = "invert(0)"
        pencil_w.style.border = "2px solid #292929"
        eraser_w.style.filter = "invert(0)"
        eraser_w.style.border = "2px solid #292929"
        clr_w.style.backgroundColor = "#ffffff"
        clr_w.style.border = "2px solid #292929"
        body.style.backgroundColor = "#ffffff"
        div_layers.style.backgroundColor = "#ffffff"
        text_label_clr.style.color = "#000000"
        modal_header.style.filter = "invert(0)"
        modal_body.style.filter = "invert(0)"
        modal_footer.style.filter = "invert(0)"
        modal_header.style.backgroundColor = "#ffffff"
        modal_body.style.backgroundColor = "#ffffff"
        modal_footer.style.backgroundColor = "#ffffff"
        if (is_foreground_selected)
        {
            layer_1.style.border = "5px solid #000000"
        }
        else
        {
            layer_2.style.border = "5px solid #000000"
        }
    }
    else
    {
        tmimg.setAttribute("src", "light mode.png")
        is_dark_mode = true
        nav_panel.style.filter = "invert(0.9)"
        graphic_tabletBtn.style.filter = "invert(0.9)"
        spanel.style.filter = "invert(0.9)"
        spanel_openbtn.style.filter = "invert(0.9)"
        colourBtn.style.filter = "invert(1.1)"
        scale_field.style.filter = "invert(0.9)"
        layers_buttons.style.filter = "invert(0.9)"
        first_layer_visibilityBtn.style.filter = "invert(0.9)"
        second_layer_visibilityBtn.style.filter = "invert(0.9)"
        clear_first_layer_Btn.style.filter = "invert(0.9)"
        clear_second_layer_Btn.style.filter = "invert(0.9)"
        pencil_w.style.filter = "invert(0.9)"
        pencil_w.style.border = "2px solid #aaaaaa"
        eraser_w.style.filter = "invert(0.9)"
        eraser_w.style.border = "2px solid #aaaaaa"
        clr_w.style.backgroundColor = "#303030"
        clr_w.style.border = "2px solid #aaaaaa"
        body.style.backgroundColor = "#303030"
        div_layers.style.backgroundColor = "#222222"
        text_label_clr.style.color = "#ffffff"
        modal_header.style.filter = "invert(0.9)"
        modal_body.style.filter = "invert(0.9)"
        modal_footer.style.filter = "invert(0.9)"
        modal_header.style.backgroundColor = "#cccccc"
        modal_body.style.backgroundColor = "#cccccc"
        modal_footer.style.backgroundColor = "#cccccc"
        if (is_foreground_selected)
        {
            layer_1.style.border = "5px solid #cccccc"
        }
        else
        {
            layer_2.style.border = "5px solid #cccccc"
        }
    }
})

const select_first_layerBtn: any = document.getElementById("layer_button_1")

select_first_layerBtn.addEventListener("click", () => 
{
    if (!is_foreground_selected)
    {
        if (is_dark_mode)
        {
            layer_1.style.border = "5px solid #cccccc"
        }
        else
        {
            layer_1.style.border = "5px solid #000000"
        }
        layer_2.style.border = "1px solid #707070"
        cur_draw_ctx = ctx_foreground
        cur_canvas = canvas_foreground
        cur_ctx_layer = ctx_layer_1
        is_foreground_selected = true
    }
})

const select_second_layerBtn: any = document.getElementById("layer_button_2")

select_second_layerBtn.addEventListener("click", () => 
{
    if (is_foreground_selected)
    {
        layer_1.style.border = "1px solid #707070"
        if (is_dark_mode)
        {
            layer_2.style.border = "5px solid #cccccc"
        }
        else
        {
            layer_2.style.border = "5px solid #000000"
        }
        cur_draw_ctx = ctx_background
        cur_canvas = canvas_background
        cur_ctx_layer = ctx_layer_2
        is_foreground_selected = false
    }
})

first_layer_visibilityBtn.addEventListener("click", () => 
{
    if (is_foreground_visible)
    {
        is_foreground_visible = false
        canvas_foreground.style.display = "none"
        first_layer_visibility_img.setAttribute("src", "visibility_off.png")
    }
    else
    {
        is_foreground_visible = true
        canvas_foreground.style.display = "block"
        first_layer_visibility_img.setAttribute("src", "visibility_on.png")
    }
})

clear_first_layer_Btn.addEventListener("click", () =>
{
    ctx_foreground.clearRect(0, 0, cW, cH)
    ctx_layer_1.clearRect(0, 0, lwW, lwH)
    push_action_to_stack(['c', ctx_foreground])
})

second_layer_visibilityBtn.addEventListener("click", () => 
{
    if (is_background_visible)
    {
        is_background_visible = false
        canvas_background.style.display = "none"
        second_layer_visibility_img.setAttribute("src", "visibility_off.png")
    }
    else
    {
        is_background_visible = true
        canvas_background.style.display = "block"
        second_layer_visibility_img.setAttribute("src", "visibility_on.png")
    }
})

clear_second_layer_Btn.addEventListener("click", () => {
    ctx_background.clearRect(0, 0, cW, cH)
    ctx_layer_2.clearRect(0, 0, lwW, lwH)
    push_action_to_stack(['c', ctx_background])
})

const merge_layersBtn: any = document.getElementById("merge_layers")

function merge_layers_in_stack(stack: any, local_ctx: any)
{
    let substack_1: any = []
    let substack_2: any = []
    let is_changed_stack: any = []
    let another_ctx: any
    let is_foreground: any
    if (local_ctx == ctx_foreground)
    {
        another_ctx = ctx_background
        is_foreground = true
    }
    else
    {
        another_ctx = ctx_foreground
        is_foreground = false
    }
    for (let i = 0; i < stack.length; i++)
    {
        if (id_list.includes(stack[i][0]) && stack[i][1] == another_ctx)
        {
            stack[i][1] = local_ctx
            substack_1.push(stack[i])
            is_changed_stack.push(true)
        }
        else
        {
            substack_2.push(stack[i])
            is_changed_stack.push(false)
        }
    }
    if (is_foreground)
    {
        if (substack_1.length == 0)
        {
            is_changed_stack = []
            return { stack, is_changed_stack }
        }
        substack_1 = substack_1.concat(substack_2)
        return { substack_1, is_changed_stack }
    }
    else
    {
        if (substack_1.length == 0)
        {
            is_changed_stack = []
            return { stack, is_changed_stack }
        }
        substack_2 = substack_2.concat(substack_1)
        return { substack_2, is_changed_stack }
    }
}

function unmerge_layers_in_stack(stack: any, local_ctx: any, local_ics: any)
{
    if (local_ics.length == 0)
    {
        return stack
    }
    let substack_1: any = []
    let substack_2: any = []
    let another_ctx: any
    let is_foreground: any
    if (local_ctx == ctx_foreground)
    {
        another_ctx = ctx_background
        is_foreground = true
    }
    else
    {
        another_ctx = ctx_foreground
        is_foreground = false
    }
    for (let i = 0; i < stack.length; i++)
    {
        if (local_ics[i] == true)
        {
            stack[i][1] = another_ctx
            substack_1.push(stack[i])
        }
        else
        {
            substack_2.push(stack[i])
        }
    }
    if (is_foreground)
    {
        return substack_1.concat(substack_2)
    }
    else
    {
        return substack_2.concat(substack_1)
    }
}

function unmerge_layers(local_ctx: any, local_ics_1: any, local_ics_2: any)
{
    pstack = unmerge_layers_in_stack(pstack, local_ctx, local_ics_1)
    nstack = unmerge_layers_in_stack(nstack, local_ctx, local_ics_2)
    replay_actions(pstack)
    ctx_layer_1.clearRect(0, 0, lwW, lwH)
    canvas_to_layer(canvas_foreground, ctx_layer_1)
    ctx_layer_2.clearRect(0, 0, lwW, lwH)
    canvas_to_layer(canvas_background, ctx_layer_2)
}

function merge_layers(local_draw_ctx: any)
{
    let { local_stack_1, is_changed_stack_1 }: any = merge_layers_in_stack(pstack, local_draw_ctx)
    pstack = local_stack_1
    if (is_changed_stack_1.length == 0)
    {
        return [[], []]
    }
    let { local_stack_2, is_changed_stack_2 }: any = merge_layers_in_stack(nstack, local_draw_ctx)
    nstack = local_stack_2
    replay_actions(pstack)
    if (local_draw_ctx == ctx_foreground)
    {
        ctx_layer_2.clearRect(0, 0, lwW, lwH)
        canvas_to_layer(canvas_foreground, ctx_layer_1)
    }
    else
    {
        ctx_layer_1.clearRect(0, 0, lwW, lwH)
        canvas_to_layer(canvas_background, ctx_layer_2)
    }
    return [is_changed_stack_1, is_changed_stack_2]
}

merge_layersBtn.addEventListener("click", () => 
{
    let is_changed_stack: any = []
    is_changed_stack = merge_layers(cur_draw_ctx)
    if (is_changed_stack[0].length == 0 && is_changed_stack[1].length == 0)
    {
        return
    }
    push_action_to_stack(['m', cur_draw_ctx, is_changed_stack[0], is_changed_stack[1]])
})

const swap_layersBtn: any = document.getElementById("swap_layers")

function swap_layers_in_stack(stack: any)
{
    let is_swapped: any = false
    for (let i = 0; i < stack.length; i++)
    {
        if (id_list.includes(stack[i][0]))
        {
            is_swapped = true
            if (stack[i][1] == ctx_foreground)
            {
                stack[i][1] = ctx_background
            }
            else
            {
                stack[i][1] = ctx_foreground
            }
        }
    }
    return [stack, is_swapped]
}

function swap_layers()
{
    let input_value: any
    input_value = swap_layers_in_stack(pstack)
    pstack = input_value[0]
    if (input_value[1] == false)
    {
        return
    }
    input_value = swap_layers_in_stack(nstack)
    nstack = input_value[0]
    replay_actions(pstack)
    ctx_layer_1.clearRect(0, 0, lwW, lwH)
    canvas_to_layer(canvas_foreground, ctx_layer_1)
    ctx_layer_2.clearRect(0, 0, lwW, lwH)
    canvas_to_layer(canvas_background, ctx_layer_2)
}

swap_layersBtn.addEventListener("click", () => 
{
    swap_layers()
    push_action_to_stack(['s'])
})

graphic_tabletBtn.addEventListener("click", () => 
{
    if (graphic_tablet_mode)
    {
        graphic_tabletBtn.style.border = "1px solid #707070"
        graphic_tablet_mode = false
    }
    else
    {
        graphic_tabletBtn.style.border = "5px solid #000000"
        graphic_tablet_mode = true
    }
})

colourBtn.addEventListener("click", () => 
{
    if (is_pencil_window || is_eraser_window)
    {
        pencil_w.style.display = "none"
        is_pencil_window = false
        eraser_w.style.display = "none"
        is_eraser_window = false
    }
    cur_color.value = cur_brush_clr
    if (is_clr_window == false)
    {
        clr_w.style.display = "block"
        update_slider()
        is_clr_window = true
        clr_w.addEventListener("pointermove", handleclr_PointerMove)
        ctype_clr_btn.addEventListener("click", handlet_clr_Click)
        ok_clr.addEventListener("click", () => 
        {
            cursor_type = 3
            cursor_image.setAttribute("src", cur_tool[2])
            cursor.style.left = (cX + 7.5) + "px"
            cursor.style.top = (cY + 7.5) + "px"
            cursor.style.display = "block"
            close_clr_window()
        }, 
        { 
            once: true 
        })
    }
    else
    {
        close_clr_window()
    }
})

function change_thickness(flag: any)
{
    let t_v: any
    if (flag)
    {
        t_v = thickness_field.value - 1
    }
    else
    {
        t_v = e_thickness_field.value - 1
    }
    let real_t_v: any = Math.min(100, Math.max(0, t_v))
    if (t_v != real_t_v)
    {
        t_v = real_t_v
    }
    thickness_field.value = t_v + 1
    e_thickness_field.value = t_v + 1
    thickness_slider.value = t_v + 1
    e_thickness_slider.value = t_v + 1
    let thickness_k: any = t_v * t_v * 0.0001 //коэффициент, чтобы толщина не увеличивалась так резко, сейчас это квадрат
    l_width = 1 + Math.max(cW, cH) * thickness_k
    W_f = (W - cW) / 2 - l_width / 2 + 12
    H_f = (H - cH) / 2 - l_width / 2 + 12
    ctx_foreground.lineWidth = l_width
    ctx_add.lineWidth = l_width
    ctx_background.lineWidth = l_width
}

thickness_slider.onchange = function()
{
    change_thickness(true)
}

thickness_field.onchange = function()
{
    change_thickness(true)
}

e_thickness_slider.onchange = function()
{
    change_thickness(false)
}

e_thickness_field.onchange = function()
{
    change_thickness(false)
}

function change_smoothing()
{
    cur_smoothing = smoothing_field.value
    let real_s_v: any = Math.min(100, Math.max(0, cur_smoothing))
    if (cur_smoothing != real_s_v)
    {
        cur_smoothing = real_s_v
        smoothing_field.value = cur_smoothing
    }
    k_smooth = 0
    let step: any = 1.0 / cur_smoothing
    for (let t: any = 0; t < 1 + step; t += step) //очень странный костыль, исправлю позже
    {
        t = Math.min(1, t)
        k_smooth++
    }
}

smoothing_slider.onchange = function()
{
    change_smoothing()
}

smoothing_field.onchange = function()
{
    change_smoothing()
}

const setpencilBtn: any = document.getElementById("pencil")
setpencilBtn.style.border = "5px solid #000000"
let cur_tool: any = ['k', setpencilBtn, "aero_pen.cur"] //текущий инструмент (карандаш)

setpencilBtn.addEventListener("click", () =>
{
    if (is_clr_window)
    {
        close_clr_window()
    }
    if (cur_tool[0] != 'k')
    {
        if (cur_tool[0] == 'e')
        {
            change_thickness(false)
            eraser_w.style.display = "none"
            is_eraser_window = false
        }
        is_pencil_window = true
        pencil_w.style.display = "block"
        update_slider()
        setpencilBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['k', setpencilBtn, "aero_pen.cur"]
    }
    else
    {
        if (is_pencil_window)
        {
            change_thickness(true)
            pencil_w.style.display = "none"
            is_pencil_window = false
        }
        else
        {
            pencil_w.style.display = "block"
            update_slider()
            is_pencil_window = true
        }
    }
})

const seteraserBtn: any = document.getElementById("eraser")

seteraserBtn.addEventListener("click", () => 
{
    if (is_clr_window)
    {
        close_clr_window()
    }
    if (cur_tool[0] != 'e')
    {
        if (cur_tool[0] == 'k')
        {
            change_thickness(true)
            pencil_w.style.display = "none"
            is_pencil_window = false
        }
        is_eraser_window = true
        eraser_w.style.display = "block"
        update_slider()
        seteraserBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['e', seteraserBtn, "aero_eraser.png"]
    }
    else
    {
        if (is_eraser_window)
        {
            change_thickness(false)
            eraser_w.style.display = "none"
            is_eraser_window = false
        }
        else
        {
            eraser_w.style.display = "block"
            update_slider()
            is_eraser_window = true
        }
    }
})

const setbucketBtn: any = document.getElementById("bucket")

setbucketBtn.addEventListener("click", () => 
{
    if (cur_tool[0] != 'b')
    {
        if (cur_tool[0] == 'k' || cur_tool[0] == 'e')
        {
            pencil_w.style.display = "none"
            is_pencil_window = false
            eraser_w.style.display = "none"
            is_eraser_window = false
            if (cur_tool[0] == 'k')
            {
                change_thickness(true)
            }
            else
            {
                change_thickness(false)
            }
            pencil_w.style.display = "none"
        }
        setbucketBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['b', setbucketBtn, "aero_bucket.png"]
    }
})

const setpipetteBtn: any = document.getElementById("pipette")

setpipetteBtn.addEventListener("click", () => 
{
    if (cur_tool[0] != 'p')
    {
        if (cur_tool[0] == 'k' || cur_tool[0] == 'e')
        {
            pencil_w.style.display = "none"
            is_pencil_window = false
            eraser_w.style.display = "none"
            is_eraser_window = false
            if (cur_tool[0] == 'k')
            {
                change_thickness(true)
            }
            else
            {
                change_thickness(false)
            }
            pencil_w.style.display = "none"
        }
        setpipetteBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['p', setpipetteBtn, "aero_pipette.png"]
    }
})

function full_clear_drawfield()
{
    original_image_buf = ""
    cur_background_clr = "#fff"
    ctx_background.fillStyle = cur_background_clr
    ctx_foreground.clearRect(0, 0, cW, cH)
    ctx_background.clearRect(0, 0, cW, cH)
}

function clear_drawfield()
{
    original_image_buf = ""
    cur_background_clr = "#fff"
    ctx_background.fillStyle = cur_background_clr
    ctx_foreground.clearRect(0, 0, cW, cH)
    ctx_background.fillRect(0, 0, cW, cH)
}

const clearBtn: any = document.getElementById("clear")

clearBtn.addEventListener("click", () => 
{
    clear_drawfield()
    push_action_to_stack(['d']) //тип - очистка экрана
})

const mhf: any = document.getElementById("my_hidden_file")
const uploadBtn: any = document.getElementById("upload")

uploadBtn.addEventListener("click", () => 
{
    if(!is_first_upload_btn_click) //костыль чтобы кнопка не срабатывала дважды
    {
        is_first_upload_btn_click = true
        return
    }
    is_first_upload_btn_click = false
    mhf.click()
    mhf.addEventListener("change", function readImage(this: any)
    {
        if (!this.files || !this.files[0]) return
        chain_id = -1
        const FR: any = new FileReader()
        FR.addEventListener("load", (evt: any) => 
        {
            let new_img_w: any
            let new_img_h: any
            let img = new Image()
            img.addEventListener("load", () => 
            {
                let img_w: any = img.width
                let img_h: any = img.height
                let new_dfw: any
                let new_dfh: any
                let is_drawfield_used: any = false
                let ps_size: any = pstack.length
                let x_paste_pos: any = 0
                let y_paste_pos: any = 0
                let i: any
                if (ps_size != 0 && pstack[0] == 'i', ctx_background, "#fff")
                {
                    i = 1
                }
                else
                {
                    i = 0
                }
                let local_id_list: any = ['r', 'p', 'i', 'u', 'f']
                for (i; i < ps_size; i++)
                {
                    if (local_id_list.includes(pstack[i][0]))
                    {
                        is_drawfield_used = true
                        break
                    }
                }
                if (is_drawfield_used)
                {
                    if (img_w / img_h > cW / cH)
                    {
                        new_img_w = cW
                        new_img_h = (cW / img_w) * img_h
                        y_paste_pos = (cH - new_img_h) / 2
                    }
                    else
                    {
                        new_img_h = cH
                        new_img_w = (cH / img_h) * img_w
                        x_paste_pos = (cW - new_img_w) / 2
                    }
                    cur_draw_ctx.clearRect(0, 0, cW, cH) //очищаем текущий слой
                }
                else
                {
                    if (img_w / img_h > Max_cW / Max_cH)
                    {
                        new_dfw = fW_max
                        new_dfh = (fW_max / img_w) * img_h
                        new_img_w = Max_cW
                        new_img_h = (Max_cW / img_w) * img_h
                    }
                    else
                    {
                        new_dfh = fH_max
                        new_dfw = (fH_max / img_h) * img_w
                        new_img_h = Max_cH
                        new_img_w = (Max_cH / img_h) * img_w
                    }
                    change_drawfield_size(new_dfw, new_dfh)
                    cur_ratio_val = get_visual_ratio(false, cW, cH)
                    ratio_field.value = cur_ratio_val //устанавливаем соотношение сторон
                    replay_actions(pstack) //воспроизводим действия
                    fW_pred = f_dW
                    fH_pred = f_dH
                    push_action_to_stack(['r', new_dfw, new_dfh, false])
                }   
                cur_draw_ctx.drawImage(img, 0, 0, img_w, img_h, x_paste_pos, y_paste_pos, cW - x_paste_pos * 2, cH - y_paste_pos * 2)
                push_action_to_stack(['u', cur_draw_ctx, img, img_w, img_h, x_paste_pos, y_paste_pos])
                original_image_buf = img.src
                cur_ctx_layer.clearRect(0, 0, lwW, lwH)
                canvas_to_layer(cur_canvas, cur_ctx_layer)
            }, 
            { 
                once: true 
            })
            original_image_buf = evt.target.result
            img.src = original_image_buf
        }, 
        { 
            once: true 
        })
        FR.readAsDataURL(this.files[0])
    }, 
    { 
        once: true 
    })
})

const saveBtn: any = document.getElementById("save")

saveBtn.addEventListener("click", () => 
{
    let image: any = new Image()
    if (original_image_buf == "")
    {
        if (!is_foreground_visible)
        {
            ctx_foreground.clearRect(0, 0, cW, cH)
        }
        if (!is_background_visible)
        {
            ctx_background.clearRect(0, 0, cW, cH)
        }
        image.onload = function()
        {
            let a: any = document.createElement("a")
            ctx_background.drawImage(image, 0, 0, image.width, image.height, 0, 0, cW, cH)
            a.href = canvas_background.toDataURL("imag/png")
            a.download = "sketch.png"
            a.click()
            replay_actions(pstack)
            canvas_to_layer(canvas_foreground, ctx_layer_1)
            canvas_to_layer(canvas_background, ctx_layer_2)
        }
        image.src = canvas_foreground.toDataURL()
    }
    else
    {
        let a: any = document.createElement("a")
        a.href = original_image_buf
        a.download = "sketch.png"
        a.click()
    }
})

function gen_caption_for_image()
{
    blackout.style.display = "block"
    let send_data: any
    let data: any
    let background_data: any
    if (original_image_buf == "")
    {
        if (is_foreground_visible)
        {
            data = canvas_foreground.toDataURL("imag/png")
        }
        else
        {
            if (is_background_visible)
            {
                data = canvas_background.toDataURL("imag/png")
            }
            else
            {
                alert("Выключены оба слоя, вы не можете отправить изображение")
                return
            }
        }
    }
    else
    {
        data = original_image_buf
    }
    let { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots }: any = check_data_before_sending()
    if (local_is_background_used && is_background_visible)
    {
        background_data = canvas_background.toDataURL("imag/png")
    }
    else
    {
         background_data = ""
    }

    send_data = JSON.stringify({
        "type": 'd', //просьба сгенерировать подпись для изображения
        "chain_id": chain_id, //id последнего звена цепочки
        "task_id": task_id, //id задания
        "data": data,
        "backgroung": background_data,
        "is_drawing": local_is_drawing,
        "sure": local_sure,
        "prims_count": local_how_many_prims,
        "dots_count": local_how_many_dots,
        "img_name": last_task_image_name
    })

    /*
    send_data = JSON.stringify({ 
        "type": 'd', //просьба сгенерировать подпись для изображения
        "chain_id": chain_id, //id последнего звена цепочки
        "task_id": task_id, //id задания
        "data": data,
        "backgroung": background_data,
        "img_name": last_task_image_name
    })*/
    ws.send(send_data)
}

document.addEventListener("pointerenter", (e) => 
{
    let cX = e.clientX
    let cY = e.clientY
    cursor.style.left = (cX + 7.5) + "px"
    cursor.style.top = (cY + 7.5) + "px"
}, { once: true })

function replay_action(act: any, k_X: any, k_Y: any, fW_pred: any, fH_pred: any)
{
    let act_type: any = act[0]
    switch (act_type)
    {
        case 'p': //если это примитив
            let prim = act[2]
            act[1].strokeStyle = act[3]
            act[1].globalCompositeOperation = act[4]
            act[1].beginPath()
            for (let i: any = 1; i < prim.length; i++)
            {
                act[1].lineWidth = prim[i][2]
                act[1].moveTo(prim[i - 1][0] / k_X, prim[i - 1][1] / k_Y)
                act[1].lineTo(prim[i][0] / k_X, prim[i][1] / k_Y)
            }
            act[1].stroke()
            act[1].globalCompositeOperation = "source-over"
            break
        case 'd': //если очистка экрана
            cur_background_clr = "#fff"
            ctx_background.fillStyle = cur_background_clr
            ctx_background.fillRect(0, 0, cW, cH)
            ctx_foreground.clearRect(0, 0, cW, cH)
            break
        case 'r': //если изменение размеров экрана
            k_X = (k_X * act[1]) / fW_pred
            k_Y = (k_Y * act[2]) / fH_pred
            fW_pred = act[1]
            fH_pred = act[2]
            break
        case 'i': //если заливка слоя целиком
            act[1].fillStyle = act[2]
            act[1].fillRect(0, 0, cW, cH)
            break
        case 'u': //если добавление изображения с ПК
            act[1].clearRect(0, 0, cW, cH) //очищаем нужный слой
            act[1].drawImage(act[2], 0, 0, act[3], act[4], act[5], act[6], cW - act[5] * 2, cH - act[6] * 2)
            break
        case 'f': //если заливка
            floodFill(act[1], act[2], act[3], act[4])
            break
        case 'c': //если очистка одного слоя
            act[1].clearRect(0, 0, cW, cH)
            break
        default:
            break
    }
    return [k_X, k_Y, fW_pred, fH_pred]
}

function replay_actions(cur_pstack: any)
{
    full_clear_drawfield()
    let change_bash_clr = false
    let new_bash_clr
    let k_X = fW_pred / f_dW
    let k_Y = fH_pred / f_dH
    let cur_thickness = 1
    ctx_foreground.lineWidth = cur_thickness
    ctx_background.lineWidth = cur_thickness
    ctx_background.strokeStyle = "#000000"
    ctx_foreground.lineCap = "round"
    ctx_foreground.lineJoin = "round"
    ctx_add.lineCap = "round"
    ctx_add.lineJoin = "round"
    ctx_background.lineCap = "round"
    ctx_background.lineJoin = "round"
    let elem: any
    for (let act of cur_pstack) 
    {
        elem = replay_action(act, k_X, k_Y, fW_pred, fH_pred)
        k_X = elem[0]
        k_Y = elem[1]
        fW_pred = elem[2]
        fH_pred = elem[3]
    }
    ctx_add.strokeStyle = cur_brush_clr
    ctx_foreground.strokeStyle = cur_brush_clr
    ctx_background.strokeStyle = cur_brush_clr
    ctx_background.fillStyle = cur_brush_clr
    ctx_add.lineWidth = l_width
    ctx_foreground.lineWidth = l_width
    ctx_background.lineWidth = l_width
    if (change_bash_clr)
    {
        cur_brush_clr = new_bash_clr
    }
}

function canvas_to_layer(local_canvas: any, local_layer: any)
{
    let image_layer: any = new Image()
    image_layer.onload = function() 
    {
        local_layer.drawImage(image_layer, 0, 0, cW, cH, 0, 0, lwW, lwH)
    }
    image_layer.src = local_canvas.toDataURL()
}

function undo_action()
{
    let pstack_size: any = pstack.length
    if (pstack_size != 0)
    {
        let cur_act: any = pstack.pop()
        let is_r: any = false
        if (id_list.includes(cur_act[0]))
        {
            if (cur_act[0] == 'r')
            {
                is_r = true
            }
        }
        pstack_size--
        nstack.push(cur_act)
        if (cur_act[0] == 's')
        {
            swap_layers()
            return
        }
        else
        {
            if (cur_act[0] == 'm')
            {
                unmerge_layers(cur_act[1], cur_act[2], cur_act[3])
                return
            }
        }
        if (is_r)
        {
            let buf_r_elem = ['r', fW_max, fH_max, false]
            for (let i: any = pstack_size - 1; i > -1; i--)
            {
                if (pstack[i][0] == 'r')
                {
                    buf_r_elem = pstack[i]
                    break
                }
            }
            change_drawfield_size(buf_r_elem[1], buf_r_elem[2])
            cur_ratio_val = get_visual_ratio(buf_r_elem[3], cW, cH)
            ratio_field.value = cur_ratio_val
        }
        replay_actions(pstack)
        ctx_layer_1.clearRect(0, 0, lwW, lwH)
        canvas_to_layer(canvas_foreground, ctx_layer_1)
        ctx_layer_2.clearRect(0, 0, lwW, lwH)
        canvas_to_layer(canvas_background, ctx_layer_2)
    }
}

function repeat_action()
{
    if (nstack.length != 0)
    {
        let cur_act: any = nstack.pop()
        let cur_acts: any = []
        let local_cur_ctx_layer: any = cur_ctx_layer
        let local_cur_canvas: any = cur_canvas
        if (id_list.includes(cur_act[0]))
        {
            if (cur_act[1] == ctx_foreground)
            {
                local_cur_ctx_layer = ctx_layer_1
                local_cur_canvas = canvas_foreground
            }
            else
            {
                local_cur_ctx_layer = ctx_layer_2
                local_cur_canvas = canvas_background
            }
        }
        cur_acts.push(cur_act)
        pstack.push(cur_act)
        if (cur_act[0] == 's')
        {
            swap_layers()
            return
        }
        else
        {
            if (cur_act[0] == 'm')
            {
                merge_layers(cur_act[1])
                return
            }
        }
        if (cur_act[0] == 'r')
        {
            change_drawfield_size(cur_act[1], cur_act[2])
            cur_ratio_val = get_visual_ratio(cur_act[3], cW, cH)
            ratio_field.value = cur_ratio_val
        }
        replay_action(cur_act, orig_f_dW / f_dW, orig_f_dH / f_dH, orig_f_dW, orig_f_dH)
        canvas_to_layer(local_cur_canvas, local_cur_ctx_layer)
    }
}

document.addEventListener("keydown", (event) => 
{
    if (is_modal_open || is_side_panel_open)
    {
        return
    }
    switch(event.code)
    {
        case "KeyT": //Режим графического планшета
            if (graphic_tabletBtn.style.display == "block")
            {
                graphic_tabletBtn.click()
            }
            return
        case "KeyP": //Палитра (выбор цвета)
            colourBtn.click()
            return
        case "KeyB": //Карандаш
            setpencilBtn.click()
            return
        case "KeyE": //Ластик
            seteraserBtn.click()
            return
        case "KeyG": //Заливка
            setbucketBtn.click()
            return
        case "KeyI": //Пипетка
            setpipetteBtn.click()
            return
        case "Delete": //Очистить всё
            clearBtn.click()
            return
        case "KeyO": //Добавить изображение с ПК
            uploadBtn.click()
            return
        case "KeyD": //Сохранить изображение на ПК
            saveBtn.click()
            return
        case "KeyR": //Открыть окно генерации
            generateBtn.click()
            return
        case "KeyС": //очистить текущий слой
            if (is_foreground_selected)
            {
                clear_first_layer_Btn.click()
            }
            else
            {
                clear_second_layer_Btn.click()
            }
            return
        case "KeyS": //поменять слои местами
            swap_layersBtn.click()
            return
        case "KeyM": //объединить слои
            merge_layersBtn.click()
            return
        default:
            if (event.shiftKey)
            {
                is_shift_on = true
                return
            }
            if (event.ctrlKey)
            {
                switch (event.code)
                {
                    case "KeyZ": //отмена последнего действия
                        undo_action()
                        return
                    case "KeyX": //вернуть последнее отменённое действие
                        repeat_action()
                        return
                }
            }
    }
}, false)

document.addEventListener("keyup", (event) => 
{
    if (event.code.slice(0, 5) == "Shift")
    {
        if (draw)
        {
            ctx_add.clearRect(0, 0, cW, cH)
            drawLines(cur_draw_ctx, curprim)
            let cpl: any = curprim.length - 1
            prevX = curprim[cpl][0]
            prevY = curprim[cpl][1]
        }
        is_shift_on = false
    }
}, false)

canvas_additional.addEventListener("pointerdown", (e: any) => 
{
    if (is_foreground_selected)
    {
        if (!is_foreground_visible)
        {
            if (!is_background_visible)
            {
                is_foreground_visible = true
                canvas_foreground.style.display = "block"
                first_layer_visibility_img.setAttribute("src", "visibility_on.png")
            }
            else
            {
                layer_1.style.border = "1px solid #707070"
                layer_2.style.border = "5px solid #000000"
                cur_draw_ctx = ctx_background
                cur_canvas = canvas_layer_2
                cur_ctx_layer = canvas_background
                is_foreground_selected = false
            }
        }
    }
    else
    {
        if (!is_background_visible)
        {
            if (!is_foreground_visible)
            {
                is_foreground_visible = true
                canvas_foreground.style.display = "block"
                first_layer_visibility_img.setAttribute("src", "visibility_on.png")
                layer_1.style.border = "5px solid #000000"
                layer_2.style.border = "1px solid #707070"
                cur_draw_ctx = ctx_foreground
                cur_canvas = canvas_layer_1
                cur_ctx_layer = canvas_foreground
                is_foreground_selected = true
            }
            else
            {
                layer_1.style.border = "5px solid #000000"
                layer_2.style.border = "1px solid #707070"
                cur_draw_ctx = ctx_foreground
                cur_canvas = canvas_layer_1
                cur_ctx_layer = canvas_foreground
                is_foreground_selected = true
            }
        }
    }
    let cur_x: any = e.clientX
    let cur_y: any = e.clientY
    prevX = cur_x - W_f
    prevY = cur_y - H_f
    draw = true
    enddraw = false
    if (is_clr_window == true)
    {
        close_clr_window()
    }
    else
    {
        original_image_buf == "" //очистить буфер изображения
    }
})

function rgbToHex(r: any, g: any, b: any) 
{
    return ((r << 16) | (g << 8) | b).toString(16)
}

function rgbaToHex(r: any, g: any, b: any, a: any) 
{
    return ((r << 24) | (g << 16) | (b << 8) | a).toString(16)
}

function getPixel(pixelData: any, x: any, y: any) 
{
    if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) 
    {
        return -1
    } 
    else 
    {
        return pixelData.data[y * pixelData.width + x]
    }
}

function addSpan(spansToCheck: any, left: any, right: any, y: any, direction: any)
{
    spansToCheck.push({ left, right, y, direction })
}

function checkSpan(pixelData: any, targetColor: any, spansToCheck: any, left: any, right: any, y: any, direction: any)
{
    let inSpan: any = false
    let start: any
    let x: any
    for (x = left; x < right; ++x)
    {
        let color: any = getPixel(pixelData, x, y)
        if (color === targetColor)
        {
            if (!inSpan)
            {
                inSpan = true
                start = x
            }
        }
        else
        {
            if (inSpan)
            {
                inSpan = false
                addSpan(spansToCheck, start, x - 1, y, direction)
            }
        }
    }
    if (inSpan)
    {
        inSpan = false
        addSpan(spansToCheck, start, x - 1, y, direction)
    }
}

function floodFill(local_ctx: any, x: any, y: any, fillColor: any) 
{
    let dex_clr: any = parseInt("FF" + fillColor.slice(6, 8) + fillColor.slice(4, 6) + fillColor.slice(2, 4), 16)
    let imageData: any = local_ctx.getImageData(0, 0, local_ctx.canvas.width, local_ctx.canvas.height)
    let pixelData: any = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
    }
    let targetColor: any = getPixel(pixelData, x, y)
    if (targetColor !== fillColor) 
    {
        let spansToCheck: any = []
        addSpan(spansToCheck, x, x, y, 0)
        let iter_max: any = Math.round(cH) * 2
        let iter: any = 0
        while (spansToCheck.length > 0 && iter <= iter_max) 
        {
            iter++
            let { left, right, y, direction }: any = spansToCheck.pop()
            let l: any = left
            let iter_l_max: any = left - cH / 2
            while (true)
            {
                --l
                let color: any = getPixel(pixelData, l, y)
                if (color !== targetColor || l < iter_l_max) 
                {
                    break
                }
            }
            ++l
            let r: any = right
            let iter_r_max: any = right + cW / 2
            while (true)
            {
                ++r
                let color: any = getPixel(pixelData, r, y)
                if (color !== targetColor || r > iter_r_max)
                {
                    break
                }
            }
            let lineOffset: any = y * pixelData.width
            pixelData.data.fill(dex_clr, lineOffset + l, lineOffset + r)
            if (direction <= 0) 
            {
                checkSpan(pixelData, targetColor, spansToCheck, l, r, y - 1, -1)
            } 
            else
            {
                checkSpan(pixelData, targetColor, spansToCheck, l, left, y - 1, -1)
                checkSpan(pixelData, targetColor, spansToCheck, right, r, y - 1, -1)
            }
            if (direction >= 0) 
            {
                checkSpan(pixelData, targetColor, spansToCheck, l, r, y + 1, +1)
            } 
            else 
            {
                checkSpan(pixelData, targetColor, spansToCheck, l, left, y + 1, +1)
                checkSpan(pixelData, targetColor, spansToCheck, right, r, y + 1, +1)
            }     
        }
        local_ctx.putImageData(imageData, 0, 0)
    }
}

d_frame.addEventListener("pointerdown", (e: any) => 
{
    if(!draw)
    {
        prevX = e.clientX - W_f
        prevY = e.clientY - H_f
        cfup = fup
        cfleft = fleft
        f_move = true
        end_f_move = false
    }
    else
    {
        let cur_x: any = e.clientX - W_f
        let cur_y: any = e.clientY - H_f
        if (cur_tool[0] == 'p') //если выбрана пипетка
        {
            let rgba: any
            if (is_foreground_visible)
            {
                rgba = ctx_foreground.getImageData(cur_x - 1, cur_y - 1, 1, 1).data
            }
            let hex: any
            if (!is_foreground_visible || rgba[3] == 0)
            {
                if (cur_draw_ctx == ctx_foreground && is_background_visible)
                {
                    rgba = ctx_background.getImageData(cur_x - 1, cur_y - 1, 1, 1).data
                }
            }
            if (rgba[3] != 0)
            {
                hex = '#' + ("000000" + rgbToHex(rgba[0], rgba[1], rgba[2])).slice(-6)
            }
            else
            {
                hex = "#255255255"
            }
            cur_brush_clr = hex
            cur_draw_ctx.strokeStyle = cur_brush_clr
            if (rgba[0] + rgba[1] + rgba[2] > 382)
            {
                clrimg.style.filter = "invert(0)"
            }
            else
            {
                clrimg.style.filter = "invert(1)"
            }
            colourBtn.style.background = cur_brush_clr
            draw = false
            return
        }
        else
        {
            if (cur_tool[0] == 'b') //если выбрана заливка
            {
                cur_x = Math.floor(cur_x + 2)
                cur_y = Math.floor(cur_y + 18)
                let rgba: any = cur_draw_ctx.getImageData(cur_x, cur_y, 1, 1).data
                let hex: any = '#' + ("00000000" + rgbaToHex(rgba[0], rgba[1], rgba[2], rgba[3])).slice(-8)
                if (cur_brush_clr + "ff" != hex) //если цвет выбранной точки не равен текущему
                {
                    let cur_form_clr: any = "0x" + cur_brush_clr.slice(1) + "FF"
                    floodFill(cur_draw_ctx, cur_x, cur_y, cur_form_clr)
                    push_action_to_stack(['f', cur_draw_ctx, cur_x, cur_y, cur_form_clr])
                    canvas_to_layer(cur_canvas, cur_ctx_layer)
                }
                draw = false
                return
            }
            else
            {
                if (is_pencil_window)
                {
                    if (cur_tool[0] == 'k')
                    {
                        change_thickness(true)
                    }
                    else
                    {
                        change_thickness(false)
                    }
                    pencil_w.style.display = "none"
                    is_pencil_window = false
                }
            }
        }
    }
})

window.addEventListener("pointerup", (e) => 
{
    enddraw = true
    end_f_move = true
})

function addGraphicTabletButton(e: any)
{
    if (e.pointerType == "pen")
    {
        graphic_tabletBtn.style.display = "block"
        nav_panel.removeEventListener("pointermove", addGraphicTabletButton)
    }
}

nav_panel.addEventListener("pointermove", addGraphicTabletButton) //проверка курсора на поле с кнопками

canvas_additional.addEventListener("pointermove", (e: any) => //проверка курсора на поле для рисования
{
    on_d_fiend = true
    if(cursor_type != 3 && !f_move)
    {
        cursor_type = 3
        cursor_image.setAttribute("src", cur_tool[2])
    }
})

function getBezierBasis(i: any, n: any, t: any) //Базисная функция i - номер вершины, n - количество вершин, t - положение кривой (от 0 до 1)
{
	// Факториал
	function f(n: any): any
    {
		return (n <= 1) ? 1 : n * f(n - 1)
	}
	// считаем i-й элемент полинома Берштейна
	return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i) * Math.pow(1 - t, n - i)
}

// arr - массив опорных точек. Точка - двухэлементный массив, (x = arr[0], y = arr[1]), step - шаг при расчете кривой (0 < step < 1), по умолчанию 0.01
function getBezierCurve(arr: any, step: any) 
{
	step = 1.0 / step
    let res: any = new Array()
    for (let t: any = 0; t < 1 + step; t += step) 
    {
		t = Math.min(1, t)
        let ind: any = res.length
		res[ind] = new Array(0, 0, 0)
        for (let i: any = 0; i < arr.length; i++) 
        {
            let b: any = getBezierBasis(i, arr.length - 1, t)
			res[ind][0] += arr[i][0] * b
			res[ind][1] += arr[i][1] * b
            res[ind][2] += arr[i][2] * b
		}
	}
	return res
}

function drawLines(local_ctx: any, arr: any) 
{
    local_ctx.beginPath()
    for (let i: any = 0; i < arr.length - 1; i++)
    {
        local_ctx.lineWidth = arr[i][2]
		local_ctx.moveTo(arr[i][0], arr[i][1])
		local_ctx.lineTo(arr[i + 1][0], arr[i + 1][1])
		local_ctx.stroke()
    }
}

d_frame.addEventListener("pointermove", (e: any) => //проверка курсора на поле вместе с рамкой
{
    on_d_frame = true
    if(!on_d_fiend && !draw)
    {
        let X: any = e.clientX - W_min
        let Y: any = e.clientY - H_min
        fup = false
        fdown = false
        fright = false
        fleft = false 
        if(H_min + 40 > Y) //если верхняя часть горизонтальной части рамки 
        {
            fup = true
        }
        else
        {
            if(Y > H_max - 40) //если нижняя часть горизонтальной рамки
            {
                fdown = true
            }
        }
        if(W_min + 40 > X) //если левая часть вертикальной рамки
        {
            fleft = true
        }
        else
        {
            if(X > W_max - 40) //если правая часть вертикальной рамки
            {
                fright = true
            }
        }
        if(fleft && fup || fright && fdown)
        {
            if(cursor_type != 4)
            {
                cursor_type = 4
                cursor_image.setAttribute("src", "aero_nwse.cur")
            }
        }
        else
        {
            if(fleft && fdown || fright && fup)
            {
                if(cursor_type != 5)
                {
                    cursor_type = 5
                    cursor_image.setAttribute("src", "aero_nesw.cur")
                }
            }
            else
            {
                if (fleft || fright)
                {
                    if(cursor_type != 2)
                    {
                        cursor_type = 2
                        cursor_image.setAttribute("src", "aero_ew.cur")
                    }
                }
                else
                {
                    if(cursor_type != 1)
                    {
                        cursor_type = 1
                        cursor_image.setAttribute("src", "aero_ns.cur")
                    }
                }
            }
        }
    }
    on_d_fiend = false
    if(!draw && !f_move)
    {
        return
    }
    let pX: any = e.clientX - W_f
    let pY: any = e.clientY - H_f
    let pW: any = e.pressure
    //Рисование
    if(draw)
    {
        if(enddraw)
        {
            if (cur_smoothing != 0)
            {
                ctx_add.clearRect(0, 0, cW, cH)
                drawLines(cur_draw_ctx, cur_smooth_prim)
            }
            if (is_shift_on)
            {
                ctx_add.clearRect(0, 0, cW, cH)
                drawLines(cur_draw_ctx, curprim)
            }
            draw = false
            enddraw = false
            prevX = pX
            prevY = pY
            fp = true
            let drawing_mode: any
            if (cur_tool[0] == 'e')
            {
                cur_ctx_layer.clearRect(0, 0, lwW, lwH)
                drawing_mode = "destination-out"
                cur_draw_ctx.globalCompositeOperation = "source-over"
            }
            else
            {
                drawing_mode = "source-over"
            }
            if (cur_smoothing == 0)
            {
                push_action_to_stack(['p', cur_draw_ctx, curprim, cur_brush_clr, drawing_mode])
            }
            else
            {
                push_action_to_stack(['p', cur_draw_ctx, cur_smooth_prim, cur_brush_clr, drawing_mode])
            }
            canvas_to_layer(cur_canvas, cur_ctx_layer)
            nstack = []
            curprim = []
            return 
        }
        let currentX: any = pX * cmp_W - l_width / 2
        let currentY: any = pY * cmp_H - l_width / 2
        let currentW: any
        if (graphic_tablet_mode)
        {
            currentW = pW * l_width
            cur_draw_ctx.lineWidth = currentW
            ctx_add.lineWidth = currentW
            currentX += (l_width - currentW) / 2
        }
        else
        {
            currentW = l_width
        }
        if(fp)
        {
            if (cur_tool[0] == 'e')
            {
                cur_draw_ctx.globalCompositeOperation = "destination-out"
            }
            cur_smooth_prim = []
            fp = false
            curprim.push([currentX, currentY, currentW])
            if(is_shift_on)
            {
                curprim.push([currentX, currentY, currentW])
            }
            prevX = currentX
            prevY = currentY
            return
        }
        if(is_shift_on)
        {
            let delta_x: any = currentX - prevX
            let delta_y: any = currentY - prevY
            let k_tan: any = Math.round(Math.atan(delta_y / delta_x) / Pi_div_4)
            if (k_tan == 2 || k_tan == -2)
            {
                k_tan = 0
            }
            if (Math.abs(delta_x) > Math.abs(delta_y))
            {
                currentY = prevY + delta_x * k_tan
            }
            else
            {
                currentX = prevX + delta_y * k_tan
            }
            curprim[curprim.length - 1] = [currentX, currentY, currentW]
            ctx_add.clearRect(0, 0, cW, cH)
            ctx_add.beginPath()
            ctx_add.moveTo(prevX, prevY)
            ctx_add.lineTo(currentX, currentY)
            ctx_add.stroke()
            return
        }
        cur_draw_ctx.beginPath()
        if (cur_smoothing == 0 || cur_tool[0] == 'e')
        {
            cur_draw_ctx.moveTo(prevX, prevY)
            cur_draw_ctx.lineTo(currentX, currentY)
            cur_draw_ctx.stroke()
        }
        else
        {
            //drawLines(cur_draw_ctx, cur_smooth_prim.slice(0, -k_smooth + 2))
            //cur_smooth_prim = getBezierCurve(curprim.slice(-cur_smoothing), cur_smoothing)

            cur_smooth_prim = cur_smooth_prim.slice(0, -k_smooth + 1).concat(getBezierCurve(curprim.slice(-cur_smoothing), cur_smoothing))
            ctx_add.clearRect(0, 0, cW, cH)
            drawLines(ctx_add, cur_smooth_prim)
        }
        curprim.push([currentX, currentY, currentW])
        prevX = currentX
        prevY = currentY
    }
})

function change_drawfield_size(new_dfw: any, new_dfh: any)//функция изменения размеров окна
{
    let prev_f_dW: any = f_dW
    let prev_f_dH: any = f_dH
    f_dW = Math.min(fW_max, Math.max(fW_min, new_dfw))
    f_dH = Math.min(fH_max, Math.max(fH_min, new_dfh))
    d_frame.style.width = f_dW + "px"
    d_frame.style.height = f_dH + "px"
    cW = cW * (f_dW / prev_f_dW)
    cH = cH * (f_dH / prev_f_dH)
    cD = cW / cH
    if (cD > orig_lD)
    {
        lW = orig_lW
        lH = orig_lW / cD
    }
    else
    {
        lH = orig_lH
        lW = orig_lH * cD
    }
    lWp = Math.round(995 * (lW / orig_lW)) / 10 + '%'
    lHp = Math.round(1000 * (lH / orig_lH)) / 10 + '%'
    layer_icon_1.style.width = lWp
    layer_icon_2.style.width = lWp
    layer_icon_1.style.height = lHp
    layer_icon_2.style.height = lHp
    canvas_foreground.width = cW
    canvas_foreground.height = cH
    canvas_background.width = cW
    canvas_background.height = cH
    canvas_additional.height = cH
    canvas_additional.width = cW
    ctx_foreground.lineWidth = l_width
    ctx_background.lineWidth = l_width
    W_f = (W - cW) / 2 - l_width / 2 + 12
    W_min = (W - f_dW) / 4
    W_max = f_dW + W_min
    H_f = (H - cH) / 2 - l_width / 2 + 12
    H_min = (H - f_dH) / 4
    H_max = f_dH + H_min
    X_move = f_dW - prev_f_dW
    Y_move = f_dH - prev_f_dH
}

window.addEventListener("pointermove", (e) => //проверка курсора на всём окне
{
    cX = e.clientX - 7.5
    cY = e.clientY - 7.5
    if (is_clr_window)
    {
        if (!on_clr_window)
        {
            if(cursor_type != 0)
            {
                cursor_type = 0
                cursor.style.display = "block"
            }
        }
        else
        {
            if(cursor_type != -1)
            {
                cursor_type = -1
                cursor.style.display = "none"
            }
            on_clr_window = false
            return
        }
    }
    if(!f_move)
    {
        if(!on_d_frame && !draw)
        {
            if(cursor_type != -1)
            {
                cursor_type = -1
                cursor.display
                cursor.style.display = "none"
            }
        }
        else
        {
            if(cursor_type != 0)
            {
                cursor_type = 0
                cursor.style.display = "block"
            }
        }
    }
    else //Изменение размеров области рисования
    {
        X_move = (cX - move_prevX) * 2
        Y_move = (cY - move_prevY) * 2
        if(end_f_move)
        {
            f_move = false
            end_f_move = false
            return 
        }
        if(cursor_type == 2)//если вертикальные
        {
            Y_move = 0
        }
        else
        {
            if(cursor_type == 1)//если горизонтальные
            {
                X_move = 0
            }
        }
        if(cfleft == true)
        {
            X_move *= -1
        }
        if(cfup == true)
        {
            Y_move *= -1
        }
        let cur_new_dfw: any = f_dW + X_move
        let cur_new_dfh: any = f_dH + Y_move
        change_drawfield_size(cur_new_dfw, cur_new_dfh)
        cur_ratio_val = get_visual_ratio(false, cW, cH)
        ratio_field.value = cur_ratio_val //устанавливаем соотношение сторон
        fW_pred = f_dW
        fH_pred = f_dH
        pstack.push(['r', cur_new_dfw, cur_new_dfh, false])
        replay_actions(pstack) //Повторная отрисовка с новым разрешением
    }
    if(cursor_type != 0 && cursor_type != 3)
    {
        cursor.style.left = cX + "px"
        cursor.style.top = cY + "px"
    }
    else
    {
        cursor.style.left = (cX + 7.5) + "px"
        cursor.style.top = (cY + 7.5) + "px"
    }
    move_prevX = cX
    move_prevY = cY
    on_d_frame = false
})