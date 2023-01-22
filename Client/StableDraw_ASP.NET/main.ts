const body: HTMLElement = <HTMLElement> document.querySelector("body")
const cursor: HTMLElement = <HTMLElement> document.querySelector(".cursor")
const cursor_image: HTMLElement = <HTMLElement> document.querySelector(".cursimg")
let cursor_type: number = -1

const nav_panel: HTMLElement = <HTMLElement> document.querySelector(".nav")

const canvas_foreground: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas_foreground") 
const canvas_background: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas_background")
const canvas_additional: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas_additional") 

const canvas_layer_1: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("layer_1_display_canvas")
const canvas_layer_2: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("layer_2_display_canvas") 
const layer_icon_1: HTMLElement = <HTMLElement> document.getElementById("layer_display_icon_1")
const layer_icon_2: HTMLElement = <HTMLElement> document.getElementById("layer_display_icon_2")

const d_frame: HTMLInputElement = <HTMLInputElement> document.getElementById("d_frame")
const spanel: HTMLElement = <HTMLElement> document.getElementById("mySidepanel")
const spanel_openbtn: HTMLElement = <HTMLElement> document.querySelector(".openbtn")
const generateBtn: HTMLElement = <HTMLElement> document.getElementById("generate")

const clr_w: HTMLElement = <HTMLElement> document.getElementById("clr_window")
const pencil_w: HTMLElement = <HTMLElement> document.getElementById("pencil_window")
const eraser_w: HTMLElement = <HTMLElement> document.getElementById("eraser_window")
const ok_clr_btn: HTMLElement = <HTMLElement> document.getElementById("ok_clr_btn") 
const cur_color: HTMLInputElement = <HTMLInputElement> document.getElementById("color") 
const clrimg: HTMLElement = <HTMLElement> document.getElementById("clrimg")

const ctx_foreground: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas_foreground.getContext("2d", { willReadFrequently: true })
const ctx_background: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas_background.getContext("2d", { willReadFrequently: true })
const ctx_add: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas_additional.getContext("2d", { willReadFrequently: true })

const ctx_layer_1: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas_layer_1.getContext("2d", { willReadFrequently: true })
const ctx_layer_2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas_layer_2.getContext("2d", { willReadFrequently: true })

const ratio_field: HTMLInputElement = <HTMLInputElement> document.querySelector(".f_ratio")
const ratio_tooltip: HTMLElement = <HTMLElement> document.querySelector("ratio_tooltip")

const thickness_slider: HTMLInputElement = <HTMLInputElement> document.getElementById("thickness_sliderValue")
const thickness_field: HTMLInputElement = <HTMLInputElement> document.getElementById("thickness_rangeValue")
const smoothing_slider: HTMLInputElement = <HTMLInputElement> document.getElementById("smoothing_sliderValue")
const smoothing_field: HTMLInputElement = <HTMLInputElement> document.getElementById("smoothing_rangeValue")
const e_thickness_slider: HTMLInputElement = <HTMLInputElement> document.getElementById("e_thickness_sliderValue")
const e_thickness_field: HTMLInputElement = <HTMLInputElement> document.getElementById("e_thickness_rangeValue")

const layer_1: HTMLElement = <HTMLElement> document.getElementById("layer_1")
const layer_2: HTMLElement = <HTMLElement> document.getElementById("layer_2")

const scale_field: HTMLElement = <HTMLElement> document.querySelector(".scale_field")
const div_layers: HTMLElement = <HTMLElement> document.querySelector(".layers")
const layers_buttons: HTMLElement = <HTMLElement> document.querySelector(".layers_buttons")

const modal_header: HTMLElement = <HTMLElement> document.querySelector(".modal__header")
const modal_body: HTMLElement = <HTMLElement> document.querySelector(".modal__body")
const modal_footer: HTMLElement = <HTMLElement> document.querySelector(".modal__footer")

const text_label_clr: HTMLElement = <HTMLElement> document.getElementById("text_label_clr")
const blackout: HTMLElement = <HTMLElement> document.getElementById("full_blackout")
const side_panel_blackout: HTMLElement = <HTMLElement> document.getElementById("side_panel_blackout")

const before_gen_block: HTMLElement = <HTMLElement>document.getElementById("before_gen_block")
const close_before_gen_block: HTMLElement = <HTMLElement>document.getElementById("close_before_gen_block")
const before_gen: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("before_gen")
const before_gen_ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>before_gen.getContext("2d", { willReadFrequently: true })

const change_themeBtn: HTMLElement = <HTMLElement>document.getElementById("change_theme")
const tmimg: HTMLElement = <HTMLElement>document.getElementById("theme_mode_img")
const graphic_tabletBtn: HTMLElement = <HTMLElement>document.getElementById("graphic_tablet")
const first_layer_visibilityBtn: HTMLElement = <HTMLElement>document.getElementById("layer_1_visibility_button")
const first_layer_visibility_img: HTMLElement = <HTMLElement>document.getElementById("layer_1_visibility_img")
const second_layer_visibilityBtn: HTMLElement = <HTMLElement>document.getElementById("layer_2_visibility_button")
const second_layer_visibility_img: HTMLElement = <HTMLElement>document.getElementById("layer_2_visibility_img")
const clear_first_layer_Btn: HTMLElement = <HTMLElement>document.getElementById("clear_layer_1")
const clear_second_layer_Btn: HTMLElement = <HTMLElement>document.getElementById("clear_layer_2")
const select_first_layerBtn: HTMLElement = <HTMLElement>document.getElementById("layer_button_1")
const colourBtn: HTMLElement = <HTMLElement>document.getElementById("palette")
const ok_clr: HTMLElement = <HTMLElement>document.querySelector(".ok_clr_btn")
const ctype_clr_btn: HTMLElement = <HTMLElement>document.querySelector(".ctype_clr_btn")

const id_list: string[] = ['p', 'i', 'u', 'f']

const Pi_div_4: number = Math.PI / 4

let nstack: any = []
let pstack: any = []
let curprim: [number, number, number][] = []
let fp: boolean = true
let on_d_frame: boolean = false
let on_d_fiend: boolean = false

let prevX: number
let prevY: number
let move_prevX: number
let move_prevY: number
let X_move: number
let Y_move: number

let cX: number
let cY: number

let is_shift_on: boolean = false

let fup: boolean = false
let fdown: boolean = false
let fright: boolean = false
let fleft: boolean = false 
let cfup: boolean = false
let cfleft: boolean = false

let W: number = window.innerWidth
let H: number = window.innerHeight

let fW_max: number = W * 0.8
let fH_max: number = H * 0.8
let fW_min: number = W * 0.1
let fH_min: number = H * 0.1

let cW: number = canvas_foreground.offsetWidth
let cH: number = canvas_foreground.offsetHeight
let cD: number = cW / cH
let Max_cW: number = cW
let Max_cH: number = cH

let lW: number = layer_icon_1.offsetWidth
let lH: number = layer_icon_1.offsetHeight
let lwW: number = canvas_layer_1.width
let lwH: number = canvas_layer_1.height
let orig_lW: number = lW
let orig_lH: number = lH
let orig_lD: number = lW / lH

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

let lWp: string = Math.round(995 * (lW / orig_lW)) / 10 + "%"
let lHp: string = Math.round(1000 * (lH / orig_lH)) / 10 + "%"
layer_icon_1.style.width = lWp
layer_icon_2.style.width = lWp
layer_icon_1.style.height = lHp
layer_icon_2.style.height = lHp
/*layer_alpha_img_1.width = lWp
layer_alpha_img_1.height = lHp
layer_alpha_img_2.width = lWp
layer_alpha_img_2.height = lHp*/

let cur_real_ratio: number = cH / cW

let l_width: number = 1

let W_f: number = (W - cW) / 2 - l_width / 2 + 12
let H_f: number = (H - cH) / 2 - l_width / 2 + 12
let f_dW: number = d_frame.offsetWidth
let f_dH: number = d_frame.offsetHeight
let orig_f_dW: number = f_dW
let orig_f_dH: number = f_dH
let fW_pred: number = orig_f_dW
let fH_pred: number = orig_f_dH
let cmp_W: number = 1
let cmp_H: number = 1
let cmp_W_b: number = 0
let cmp_H_b: number = 0
d_frame.width = f_dW
d_frame.height = f_dH
let H_min: number = (H - f_dH) / 4
let H_max: number = f_dH + H_min

let W_min: number = (W - f_dW) / 4
let W_max: number = f_dW + W_min

canvas_foreground.height = cH
canvas_foreground.width = cW
canvas_background.height = cH
canvas_background.width = cW
canvas_additional.height = cH
canvas_additional.width = cW

let draw: boolean = false
let enddraw: boolean = false
let f_move: boolean = false
let end_f_move: boolean = false

let old_btn_clr: boolean = false //изначально чёрный текст у кнопок цвета
let on_clr_window: boolean = false

let cur_background_clr: string = "#fff"
let new_background_clr: string = cur_background_clr
let cur_brush_clr: string = "#000000"

ctx_background.fillStyle = cur_background_clr //заливка фона белым, костыль, убрать
ctx_layer_2.fillStyle = cur_background_clr //заливка иконки фона белым, костыль, убрать
pstack.push(['i', ctx_background, cur_background_clr])
ctx_background.fillRect(0, 0, cW, cH)
ctx_layer_2.fillRect(0, 0, cW, cH)
let is_clr_brash: boolean = true

let cur_ratio_val: string = get_visual_ratio(false, cW, cH)
ratio_field.value = cur_ratio_val //устанавливаем соотношение сторон при запуске

let is_first_upload_btn_click: boolean = true //костыль, чтобы кнопка не срабатывала дважды

let is_foreground_selected: boolean = true //выбран ли верхний слой, по-умолчанию выбран
let cur_draw_ctx: CanvasRenderingContext2D = ctx_foreground //текущий выбранный слой для рисования, по-умолчанию верхний
let cur_canvas: HTMLCanvasElement = canvas_foreground //текущий выбранный слой для рисования ввиде слоя, не контекста, по-умолчанию верхний
let cur_ctx_layer: CanvasRenderingContext2D = ctx_layer_1 //текущий выбранный слой для рисования ввиде контекста кнопки который в углу, по-умолчанию верхний

let graphic_tablet_mode: boolean = false //режим графического планшета

let is_clr_window: boolean = false //отображение окна с палитрой
let is_pencil_window: boolean = true //отображение окна настроек кисти
let is_eraser_window: boolean = false //отображение окна настроек ластика

let cur_smoothing: number = 0 //параметр сглаживания
let cur_smooth_prim: [number, number, number][] = [] //текущий сглаженный примитив
let k_smooth: number = 0 //текущий коэффициент сглаживания

let is_foreground_visible: boolean = true //включена ли видимость переднего слоя
let is_background_visible: boolean = true //включена ли видимость заднего слоя

ctx_foreground.lineCap = "round"
ctx_foreground.lineJoin = "round"
ctx_add.lineCap = "round"
ctx_add.lineJoin = "round"
ctx_background.lineCap = "round"
ctx_background.lineJoin = "round"

layer_1.style.border = "5px solid #000000"
layer_2.style.border = "1px solid #707070"

let is_dark_mode: boolean = false //тёмная тема (отключена по-умолчанию)
let is_modal_open: boolean = false
let is_side_panel_open: boolean = false

let caption_field: HTMLInputElement
let style_field: HTMLInputElement
let is_human_caption: boolean
let original_image_buf: string = "" //переменная для хранения исходных изображений

let need_gen_after_caption: boolean[] = [false, false]

const Max_bib_w: number = W * 0.2
const Max_bib_h: number = H * 0.2

let data_prop: any

let ws: WebSocket = new WebSocket("wss://stabledraw.com:8081")
let chain_id: string = ""
let task_id: string

var main_modal: any = function (options: object) 
{
    var _elemModal: any
    var _eventShowModal: any
    var _eventHideModal: any
    var _hiding: boolean = false
    var _destroyed: boolean = false
    var _animationSpeed: number = 200
    function _createModal (options: any) 
    {
        var elemModal: HTMLElement = document.createElement("div"),
        modalTemplate = '<div class="modal__backdrop" data-dismiss="modal"><div class="modal__content"><div class="modal__header"><div class="modal__title" data-modal="title">{{title}}</div><span class="modal__btn-close" data-dismiss="modal" title="Закрыть">&times;</span></div><div class="modal__body" data-modal="content">{{content}}</div>{{footer}}</div></div>',
        modalFooterTemplate = '<div class = "modal__footer">{{buttons}}</div>',
        modalButtonTemplate = '<button type = "button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>',
        modalHTML, modalFooterHTML = ""
        elemModal.classList.add("modal")
        modalHTML = modalTemplate.replace("{{title}}", options.title || "")
        modalHTML = modalHTML.replace("{{content}}", options.content || "")
        if (options.footerButtons) 
        {
            for (var i: number = 0, length = options.footerButtons.length; i < length; i++) 
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
    let return_elem: Object = {
        show: _showModal,
        hide: _hideModal,
        destroy: function () 
        {
            _elemModal.parentElement.removeChild(_elemModal),
            _elemModal.removeEventListener("click", _handlerCloseModal),
            _destroyed = true;
        }, setContent: function (html: HTMLElement) 
        {
            _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
        }, setTitle: function (text: HTMLElement) 
        {
            _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    }
    return return_elem
};
(function () 
{
    var modal: any
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
    document.addEventListener("click", function (e: any) 
    {
        data_prop = check_data_before_sending()
        let { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots }: any = data_prop
        if (e.target.dataset.toggle === "modal") 
        {
            let content: string
            if ((!local_is_foreground_used && !local_is_background_used) || (!is_background_visible && !is_foreground_visible))
            {
                modal = main_modal({
                    title: "Генерация",
                    content: "<p>Содержмиое модального окна...<p>",
                    footerButtons:
                        [
                            { class: "modal_btn modal_btn-3", id: "cur_gen_params_btn", text: "Параметры", handler: "modalHandlerParams" },
                            { class: "modal_btn modal_btn-2", id: "SD2_btn", text: "StableDiffusion 2", handler: "modalHandlerGenSD2_text_to_image" },
                            { class: "modal_btn modal_btn-2", id: "Dalle2_btn", text: "Dall-e 2", handler: "modalHandlerGenDalle2" },
                            { class: "modal_btn modal_btn-1", text: "Отмена", handler: "modalHandlerCancel" }
                        ]
                })
                content = 'Описание:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"/><p><p>Стиль:<p><input class = "modal_input" id = "style_input" value = "4к фотореалистично" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"/>'
            }
            else
            {
                modal = main_modal({
                    title: "Генерация",
                    content: "<p>Содержмиое модального окна...<p>",
                    footerButtons:
                        [
                            { class: "modal_btn modal_btn-3", id: "cur_gen_params_btn", text: "Параметры", handler: "modalHandlerParams" },
                            { class: "modal_btn modal_btn-2", id: "SD1_btn", text: "StableDiffusion 1", handler: "modalHandlerGenSD1" },
                            { class: "modal_btn modal_btn-2", id: "SD2_btn", text: "StableDiffusion 2", handler: "modalHandlerGenSD2" },
                            { class: "modal_btn modal_btn-1", text: "Отмена", handler: "modalHandlerCancel" }
                        ]
                })
                if (original_image_buf == "")
                {
                    content = 'Описание:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"/><p><button class = "modal_btn modal_btn-2" id = "modal_caption_auto_gen" onclick = "gen_caption_for_image(data_prop)">Сгенерировать автоматически</button><p>Стиль:<p><input class = "modal_input" id = "style_input" value = "4к фотореалистично" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"/>'
                }
                else
                {
                    content = 'Описание:<p><input class = "modal_input" id = "caption_input" required placeholder = "Введите описание изображения" oninput = "is_human_caption = true"/><p><button class = "modal_btn modal_btn-2" id = "modal_caption_auto_gen" onclick = "gen_caption_for_image(data_prop)">Сгенерировать автоматически</button><button class = "modal_btn modal_btn-4" style = "right: 25%" onclick = "upscale()">Апскейл</button><button class = "modal_btn modal_btn-4" onclick = "delete_background()">Удалить фон</button><p>Стиль:<p><input class = "modal_input" id = "style_input" value = "4к фотореалистично" required placeholder = "Введите стиль изображения" oninput = "is_human_caption = true"/>'
                }
            }
            modal.show()
            modal.setContent(content)
            caption_field = <HTMLInputElement> document.getElementById("caption_input")
            style_field = <HTMLInputElement> document.getElementById("style_input")
            ws.onmessage = function (event: any)
            {
                let jdata: any = JSON.parse(event.data)
                let type: string = jdata[0]
                if (type == 't') //если текстовое сообщение
                {
                    //alert(jdata[1])
                    return
                }
                if (type == 'c') //если описание
                {
                    task_id = jdata[1]
                    caption_field.value = jdata[2]
                    chain_id = jdata[3]
                    last_task_image_name = jdata[4]
                    is_human_caption = false
                    blackout.style.display = "none"
                    if (need_gen_after_caption[0])
                    {
                        gen_picture_by_drawing(need_gen_after_caption[1], caption_field.value + " " + style_field.value, data_prop)
                        need_gen_after_caption[0] = false
                    }
                    return
                }
                if (type == 'i') //если изображение
                {
                    let image: HTMLImageElement = new Image()
                    let image_on_before_block: HTMLImageElement = new Image()
                    image.onload = function() 
                    {
                        if (jdata[7] != "")
                        {
                            image_on_before_block.src = "data:image/png;base64," + jdata[7]
                            image_on_before_block.onload = function ()
                            {
                                let bW: number
                                let bH: number
                                let iw: number = image_on_before_block.width
                                let ih: number = image_on_before_block.height
                                if (iw / ih > Max_bib_w / Max_bib_h)
                                {
                                    bW = Max_bib_w
                                    bH = Max_bib_w * ih / iw
                                }
                                else
                                {
                                    bH = Max_bib_h
                                    bW = Max_bib_h * iw / ih
                                }
                                before_gen_block.style.width = bW.toString() + "px"
                                before_gen_block.style.height = bH.toString() + "px"
                                before_gen.width = bW
                                before_gen.height = bH
                                console.log(iw, ih, bW, bH, before_gen_block.offsetWidth, before_gen_block.offsetHeight, before_gen.offsetWidth, before_gen.offsetHeight)
                                before_gen_ctx.drawImage(image_on_before_block, 0, 0, iw, ih, 0, 0, bW, bH)
                                before_gen_block.style.display = "block"
                                show_gen_result(jdata, image)
                            }
                        }
                        else
                        {
                            show_gen_result(jdata, image)
                        }
                    }
                    original_image_buf = "data:image/png;base64," + jdata[1]
                    image.src = original_image_buf
                    chain_id = jdata[4]
                    task_id = jdata[6]
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
                gen_caption_for_image(data_prop)
                need_gen_after_caption[0] = true
                need_gen_after_caption[1] = false
            }
            else
            {
                let full_prompt: string = caption_field.value + " " + style_field.value
                gen_picture_by_drawing(false, full_prompt, data_prop)
            }
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerGenSD2") 
        {
            if (caption_field.value == "")
            {
                gen_caption_for_image(data_prop)
                need_gen_after_caption[0] = true
                need_gen_after_caption[1] = true
            }
            else
            {
                let full_prompt = caption_field.value + " " + style_field.value
                gen_picture_by_drawing(true, full_prompt, data_prop)
            }
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerGenSD2_text_to_image") 
        {
            if (caption_field.value == "")
            {
                caption_field.setCustomValidity("Ввод описания в этом режиме обязателен")
                caption_field.reportValidity()
            }
            else
            {
                let full_prompt = caption_field.value + " " + style_field.value
                gen_picture_by_prompt(true, full_prompt)
            }
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.handler === "modalHandlerGenDalle2") 
        {
            if (caption_field.value == "")
            {
                caption_field.setCustomValidity("Ввод описания в этом режиме обязателен")
                caption_field.reportValidity()
            }
            else
            {
                let full_prompt = caption_field.value + " " + style_field.value
                gen_picture_by_prompt(false, full_prompt)
            }
            //modal.hide()
            //document.querySelector(".message").textContent = "Вы нажали на кнопку ОК, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
        else if (e.target.dataset.dismiss === "modal") 
        {
            //document.querySelector(".message").textContent = "Вы закрыли модальное окно нажав на крестик или на область вне модального окна, а открыли окно с помощью кнопки " + elemTarget.textContent
        }
    })
})()

function show_gen_result(jdata: any[], image: HTMLImageElement)
{
    close_all_add_windows()
    ctx_foreground.clearRect(0, 0, cW, cH) // очищаем верхний холст
    if (jdata[2] / jdata[3] == 1 && cW / cH != 1)
    {
        let new_dfw: number
        let new_dfh: number
        if (cD > 1)
        {
            new_dfh = Max_cH
            new_dfw = Max_cH
        }
        else
        {
            new_dfh = Max_cW
            new_dfw = Max_cW
        }
        change_drawfield_size(new_dfw, new_dfh)
        cur_ratio_val = get_visual_ratio(false, cW, cH)
        ratio_field.value = cur_ratio_val //устанавливаем соотношение сторон
        fW_pred = f_dW
        fH_pred = f_dH
        push_action_to_stack(['r', new_dfw, new_dfh, false])
    }
    console.log(jdata[2], jdata[3], cW, cH, d_frame.offsetWidth, d_frame.offsetHeight, canvas_foreground.offsetWidth, canvas_foreground.offsetHeight)
    ctx_foreground.drawImage(image, 0, 0, jdata[2], jdata[3], 0, 0, cW, cH)
    push_action_to_stack(['u', cur_draw_ctx, image, jdata[2], jdata[3]])
    ctx_layer_1.clearRect(0, 0, lwW, lwH)
    canvas_to_layer(cur_canvas, cur_ctx_layer)
}

let last_task_image_name: string = "drawing_0.png"

//ws.onopen = function(){alert("open");} 

ws.onclose = function() //Убрать
{
    alert("Соединение разорвано");
}

//ws.onerror = function(){alert("error");}

function check_data_before_sending() //проверяет что именно будет отправляться. Функция временная, нужна для сбора статистики по рисункам. Её потом нужно будет заменить проcто на проверку использован ли передний план или фон
{
    let local_is_foreground_used: boolean = false
    let local_is_background_used: boolean = false
    let local_is_drawing_on_foreground: boolean = true
    let local_is_drawing_on_background: boolean = true
    let local_sure_on_foreground: boolean = true
    let local_sure_on_background: boolean = true
    let local_how_many_prims_on_foreground: number = 0
    let local_how_many_dots_on_foreground: number = 0
    let local_how_many_prims_on_background: number = 0
    let local_how_many_dots_on_background: number = 0
    for (let i: number = 0; i < pstack.length; i++)
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
    let local_is_drawing: boolean
    let local_sure: boolean
    let local_how_many_prims: number
    let local_how_many_dots: number
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
    let need_add: boolean = true
    let pstack_length: number = pstack.length - 1
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

function gen_picture_by_drawing(is_SD2: boolean, full_prompt: string, data_prop: any)
{
    blackout.style.display = "block"
    let local_type: string
    let send_data_pbp: any
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
        let data: string
        let background_data: string
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
        let { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots }: any = data_prop
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
        if (chain_id != "")
        {
            data = ""
            background_data = ""
        }
        send_data_pbp = JSON.stringify({
            "type": "hg" + local_type, //рисунок
            "chain_id": chain_id, //id последнего звена цепочки
            "task_id": task_id, //id задания
            "data": data,
            "backgroung": background_data,
            "prompt": full_prompt, //описание изображения
            "is_drawing": local_is_drawing,
            "sure": local_sure,
            "prims_count": local_how_many_prims,
            "dots_count": local_how_many_dots,
            "img_name": last_task_image_name
        })

        /*send_data_pbp = JSON.stringify({ 
            "type": "hg" + local_type, //рисунок
            "chain_id": chain_id, //id последнего звена цепочки
            "task_id": task_id, //id задания
            "data": data,
            "backgroung": background_data,
            "prompt": full_prompt, //описание изображения
            "img_name": last_task_image_name
        })*/
    }
    else
    {
        send_data_pbp = JSON.stringify({ 
            "type": 'g' + local_type, //просьба сгенерировать с машинным описанием
            "chain_id": chain_id, //id последнего звена цепочки
            "task_id": task_id, //id задания
            "img_name": last_task_image_name //имя последнего файла изображения
        });
    }
    ws.send(send_data_pbp)
}

function gen_picture_by_prompt(is_SD2: boolean, full_prompt: string)
{
    blackout.style.display = "block"
    let local_type: string
    let send_data_pbt: any
    if (is_SD2)
    {
        local_type = 's'
    }
    else
    {
        local_type = 'd'
    }
    send_data_pbt = JSON.stringify({
        "type": "t" + local_type, //текст
        "prompt": full_prompt //описание изображения
    })
    ws.send(send_data_pbt)
}

function delete_background()
{
    blackout.style.display = "block"
    let data: string = original_image_buf
    if (chain_id != "") 
    {
        data = ""
    }
    let send_data_del: string = JSON.stringify({ 
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
    let data: string = original_image_buf
    if (chain_id != "")
    {
        data = ""
    }
    let send_data_ups: string = JSON.stringify({
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

let slider_range: NodeListOf<Element> = document.querySelectorAll('input[type="range"]')
let slider_element: any

function update_slider() //заменить на обдновление одного слайдера, а не всех (костыль)
{
    for (slider_element of slider_range)
    {
        slider_element.style.setProperty('--value', slider_element.value)
    }
}

for (slider_element of slider_range)
{
    slider_element.style.setProperty("--value", slider_element.value)
    slider_element.style.setProperty("--min", slider_element.min == "" ? '0' : slider_element.min)
    slider_element.style.setProperty("--max", slider_element.max == "" ? "100" : slider_element.max)
    slider_element.addEventListener("input", () => slider_element.style.setProperty("--value", slider_element.value))
}

ratio_field.onchange = function() 
{
    let t_v: string = ratio_field.value
    let pos: number = t_v.indexOf(':')
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
    let new_r_w_s: string = t_v.slice(0, pos)
    let new_r_h_s: string = t_v.slice(pos + 1)
    let new_r_w: number = parseInt(new_r_w_s)
    let new_r_h: number = parseInt(new_r_h_s)
    let new_dfw: number
    let new_dfh: number
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

function get_visual_ratio(abs: boolean, w: number, h: number)
{
    const rat: [number, number, number][] = [[2.0556, 21, 9], [1.5556, 16, 9], [1.1667, 4, 3], [0.875, 1, 1], [0.6562, 3, 4], [0.4955, 9, 16]]
    let cur_ratio: number = w / h
    let v_w: number = 0
    let v_h: number = 0
    let cur_k: number
    if (cur_ratio <= 0.4955)
    {
        v_w = 9
        v_h = 21
    }
    else
    {
        let r: [number, number, number]
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
    let res: string = (v_w).toString() + ":" + (v_h).toString()
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

const openBtn: HTMLElement = <HTMLElement> document.querySelector(".openbtn")

openBtn.addEventListener("click", () => 
{
    openNav()
})

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

const closeeBtn: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("size_panel_closebtn")

closeeBtn.addEventListener("pointerup", () => 
{
    closeNav()
})

close_before_gen_block.addEventListener("pointerup", () =>
{
    before_gen_block.style.display = "none"
})

before_gen.addEventListener("pointerup", () =>
{
    undo_action()
})

let backBtn: HTMLElement = <HTMLElement> document.getElementById("arrow_back")

backBtn.addEventListener("click", () => 
{
    undo_action()
})

let nextBtn: HTMLElement = <HTMLElement> document.getElementById("arrow_next")

nextBtn.addEventListener("click", () => 
{
    repeat_action()
})

const initial_picker = $(document).ready(function ()
{
    let picker: any = $("#picker")
    picker.farbtastic("#color")
})

function hexDec(h: string)
{
    let m_s: RegExpMatchArray = <RegExpMatchArray> h.slice(1).match(/.{2}/g)
    let m_n: number[] = []
    m_n[0] = parseInt(m_s[0], 16)
    m_n[1] = parseInt(m_s[1], 16)
    m_n[2] = parseInt(m_s[2], 16)
    return m_n[0] + m_n[1] + m_n[2]
}

colourBtn.style.background = "#000000"

function handleclr_PointerMove()
{
    on_clr_window = true
    let ccv: string = cur_color.value
    if (ccv == "#NaNNaNNaN")
    {
        ccv = "#" + colourBtn.style.background.split("(")[1].split(")")[0].split(",").map(function (x: string) 
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
        ctype_clr_btn.style.background = ccv
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
    let ccv: string = cur_color.value
    if (ccv == "#NaNNaNNaN")
    {
        ccv = "#" + colourBtn.style.background.split("(")[1].split(")")[0].split(",").map(function (x: string) 
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

const select_second_layerBtn: HTMLElement = <HTMLElement> document.getElementById("layer_button_2")

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
    original_image_buf = ""
    before_gen_block.style.display = "none"
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

clear_second_layer_Btn.addEventListener("click", () =>
{
    original_image_buf = ""
    before_gen_block.style.display = "none"
    ctx_background.clearRect(0, 0, cW, cH)
    ctx_layer_2.clearRect(0, 0, lwW, lwH)
    push_action_to_stack(['c', ctx_background])
})

const merge_layersBtn: HTMLElement = <HTMLElement> document.getElementById("merge_layers")

function merge_layers_in_stack(stack: any[], local_ctx: CanvasRenderingContext2D)
{
    let substack_1: any[] = []
    let substack_2: any[] = []
    let is_changed_stack: boolean[] = []
    let another_ctx: CanvasRenderingContext2D
    let is_foreground: boolean
    let return_value: [any[], boolean[]]
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
    for (let i: number = 0; i < stack.length; i++)
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
            return_value = [stack, []]
            return return_value
        }
        return_value = [substack_1.concat(substack_2), is_changed_stack]
        return return_value
    }
    else
    {
        if (substack_1.length == 0)
        {
            return_value = [stack, []]
            return return_value
        }
        return_value = [substack_2.concat(substack_1), is_changed_stack]
        return return_value
    }
}

function unmerge_layers_in_stack(stack: any, local_ctx: CanvasRenderingContext2D, local_ics: boolean[])
{
    if (local_ics.length == 0)
    {
        return stack
    }
    let substack_1: any = []
    let substack_2: any = []
    let another_ctx: CanvasRenderingContext2D
    let is_foreground: boolean
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

function unmerge_layers(local_ctx: CanvasRenderingContext2D, local_ics_1: boolean[], local_ics_2: boolean[])
{
    pstack = unmerge_layers_in_stack(pstack, local_ctx, local_ics_1)
    nstack = unmerge_layers_in_stack(nstack, local_ctx, local_ics_2)
    replay_actions(pstack)
    ctx_layer_1.clearRect(0, 0, lwW, lwH)
    canvas_to_layer(canvas_foreground, ctx_layer_1)
    ctx_layer_2.clearRect(0, 0, lwW, lwH)
    canvas_to_layer(canvas_background, ctx_layer_2)
}

function merge_layers(local_draw_ctx: CanvasRenderingContext2D)
{
    let merge_elem: [any[], boolean[]] = merge_layers_in_stack(pstack, local_draw_ctx)
    let return_value: [boolean[], boolean[]] = [merge_elem[1], []]
    pstack = merge_elem[0]
    if (return_value[0].length == 0)
    {
        return_value[1] = []
        return return_value
    }
    merge_elem = merge_layers_in_stack(nstack, local_draw_ctx)
    return_value[1] = merge_elem[1]
    nstack = merge_elem[0]
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
    return return_value
}

merge_layersBtn.addEventListener("click", () => 
{
    let is_changed_stack: [boolean[], boolean[]] = merge_layers(cur_draw_ctx)
    if (is_changed_stack[0].length == 0 && is_changed_stack[1].length == 0)
    {
        return
    }
    push_action_to_stack(['m', cur_draw_ctx, is_changed_stack[0], is_changed_stack[1]])
})

const swap_layersBtn: HTMLElement = <HTMLElement> document.getElementById("swap_layers")

function swap_layers_in_stack(stack: any[])
{
    let return_value: [any[], boolean] = [[], false]
    for (let i = 0; i < stack.length; i++)
    {
        if (id_list.includes(stack[i][0]))
        {
            return_value[1] = true
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
    return return_value
}

function swap_layers()
{
    let input_value: [any[], boolean] = swap_layers_in_stack(pstack)
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

function close_all_add_windows()
{
    pencil_w.style.display = "none"
    is_pencil_window = false
    eraser_w.style.display = "none"
    is_eraser_window = false
    clr_w.style.display = "none"
    is_clr_window == false
}

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

function change_thickness(flag: boolean)
{
    let t_v: number
    if (flag)
    {
        t_v = parseInt(thickness_field.value)
    }
    else
    {
        t_v = parseInt(e_thickness_field.value)
    }
    t_v -= 1
    let real_t_v: number = Math.min(100, Math.max(0, t_v))
    if (t_v != real_t_v)
    {
        t_v = real_t_v
    }
    thickness_field.value = (t_v + 1).toString()
    e_thickness_field.value = (t_v + 1).toString()
    thickness_slider.value = (t_v + 1).toString()
    e_thickness_slider.value = (t_v + 1).toString()
    let thickness_k: number = t_v * t_v * 0.0001 //коэффициент, чтобы толщина не увеличивалась так резко, сейчас это квадрат
    l_width = 1 + Math.max(cW, cH) * thickness_k
    W_f = (W - cW) / 2 - l_width / 2 + 12
    H_f = (H - cH) / 2 - l_width / 2 + 12
    ctx_foreground.lineWidth = l_width
    ctx_add.lineWidth = l_width
    ctx_background.lineWidth = l_width
    update_slider()
}

function change_smoothing()
{
    cur_smoothing = parseInt(smoothing_field.value)
    let real_s_v: number = Math.min(100, Math.max(0, cur_smoothing))
    if (cur_smoothing != real_s_v)
    {
        cur_smoothing = real_s_v
        smoothing_field.value = cur_smoothing.toString()
    }
    k_smooth = 0
    let step: number = 1.0 / cur_smoothing
    for (let t: number = 0; t < 1 + step; t += step) //очень странный костыль, исправлю позже
    {
        t = Math.min(1, t)
        k_smooth++
    }
    update_slider()
}

thickness_slider.oninput = function () 
{
    thickness_field.value = thickness_slider.value
    change_thickness(true)
};
smoothing_slider.oninput = function () 
{
    smoothing_field.value = smoothing_slider.value
    change_smoothing()
};
e_thickness_slider.oninput = function () 
{
    e_thickness_field.value = e_thickness_slider.value
    change_thickness(false)
}

thickness_field.oninput = function () 
{
    thickness_slider.value = thickness_field.value;
    change_thickness(true);
};
smoothing_field.oninput = function () 
{
    smoothing_slider.value = smoothing_field.value;
    change_smoothing()
}

e_thickness_field.oninput = function () 
{
    e_thickness_slider.value = e_thickness_field.value;
    change_thickness(false)
}

const setpencilBtn: HTMLElement = <HTMLElement> document.getElementById("pencil")
setpencilBtn.style.border = "5px solid #000000"
let cur_tool: [string, HTMLElement, string] = ['k', setpencilBtn, "aero_pen.cur"] //текущий инструмент (карандаш)

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

const seteraserBtn: HTMLElement = <HTMLElement> document.getElementById("eraser")

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

const setbucketBtn: HTMLElement = <HTMLElement> document.getElementById("bucket")

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

const setpipetteBtn: HTMLElement = <HTMLElement> document.getElementById("pipette")

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
    before_gen_block.style.display = "none"
    cur_background_clr = "#fff"
    ctx_background.fillStyle = cur_background_clr
    ctx_foreground.clearRect(0, 0, cW, cH)
    ctx_background.clearRect(0, 0, cW, cH)
}

function clear_drawfield()
{
    original_image_buf = ""
    before_gen_block.style.display = "none"
    cur_background_clr = "#fff"
    ctx_background.fillStyle = cur_background_clr
    ctx_foreground.clearRect(0, 0, cW, cH)
    ctx_background.fillRect(0, 0, cW, cH)
}

const clearBtn: HTMLElement = <HTMLElement> document.getElementById("clear")

clearBtn.addEventListener("click", () => 
{
    clear_drawfield()
    push_action_to_stack(['d']) //тип - очистка экрана
})

const mhf: HTMLElement = <HTMLElement> document.getElementById("my_hidden_file")
const uploadBtn: HTMLElement = <HTMLElement> document.getElementById("upload")

uploadBtn.addEventListener("click", () => 
{
    if(!is_first_upload_btn_click) //костыль чтобы кнопка не срабатывала дважды
    {
        is_first_upload_btn_click = true
        return
    }
    is_first_upload_btn_click = false
    mhf.click()
    mhf.addEventListener("change", function readImage(this: HTMLInputElement)
    {
        if (!this.files || !this.files[0]) return
        chain_id = ""
        const FR: FileReader = new FileReader()
        FR.addEventListener("load", (evt: any) => 
        {
            let new_img_w: number
            let new_img_h: number
            let img = new Image()
            img.addEventListener("load", () => 
            {
                let img_w: number = img.width
                let img_h: number = img.height
                let new_dfw: number
                let new_dfh: number
                let is_drawfield_used: boolean = false
                let ps_size: number = pstack.length
                let x_paste_pos: number = 0
                let y_paste_pos: number = 0
                let i: number
                if (ps_size != 0 && pstack[0] == 'i', ctx_background, "#fff")
                {
                    i = 1
                }
                else
                {
                    i = 0
                }
                let local_id_list: string[] = ['r', 'p', 'i', 'u', 'f']
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

const saveBtn: HTMLElement = <HTMLElement> document.getElementById("save")

saveBtn.addEventListener("click", () => 
{
    let image: HTMLImageElement = new Image()
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
            let a: HTMLAnchorElement = document.createElement("a")
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
        let a: HTMLAnchorElement = document.createElement("a")
        a.href = original_image_buf
        a.download = "sketch.png"
        a.click()
    }
})

function gen_caption_for_image(data_prop: any)
{
    blackout.style.display = "block"
    let send_data_cpt: string
    let data: string
    let background_data: string
    if (original_image_buf == "")
    {
        if (is_foreground_visible)
        {
            data = canvas_foreground.toDataURL("imag/png")
        }
        else
        {
            data = canvas_background.toDataURL("imag/png")
        }
    }
    else
    {
        data = original_image_buf
    }
    let { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots }: any = data_prop
    if (local_is_background_used && is_background_visible)
    {
        background_data = canvas_background.toDataURL("imag/png")
    }
    else
    {
         background_data = ""
    }

    send_data_cpt = JSON.stringify({
        "type": 'd', //просьба сгенерировать описание изображения
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
        "type": 'd', //просьба сгенерировать описание изображения
        "chain_id": chain_id, //id последнего звена цепочки
        "task_id": task_id, //id задания
        "data": data,
        "backgroung": background_data,
        "img_name": last_task_image_name
    })*/
    ws.send(send_data_cpt)
}

document.addEventListener("pointerenter", (e) => 
{
    let cX = e.clientX
    let cY = e.clientY
    cursor.style.left = (cX + 7.5) + "px"
    cursor.style.top = (cY + 7.5) + "px"
}, { once: true })

function replay_action(act: any, k_X: number, k_Y: number, fW_pred: number, fH_pred: number)
{
    let act_type: string = act[0]
    switch (act_type)
    {
        case 'p': //если это примитив
            let prim = act[2]
            act[1].strokeStyle = act[3]
            act[1].globalCompositeOperation = act[4]
            act[1].beginPath()
            for (let i: number = 1; i < prim.length; i++)
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
    let k_X: number = fW_pred / f_dW
    let k_Y: number = fH_pred / f_dH
    let cur_thickness: number = 1
    ctx_foreground.lineWidth = cur_thickness
    ctx_background.lineWidth = cur_thickness
    ctx_background.strokeStyle = "#000000"
    ctx_foreground.lineCap = "round"
    ctx_foreground.lineJoin = "round"
    ctx_add.lineCap = "round"
    ctx_add.lineJoin = "round"
    ctx_background.lineCap = "round"
    ctx_background.lineJoin = "round"
    let elem: number[]
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
}

function canvas_to_layer(local_canvas: HTMLCanvasElement, local_layer: CanvasRenderingContext2D)
{
    let image_layer: HTMLImageElement = new Image()
    image_layer.onload = function() 
    {
        local_layer.drawImage(image_layer, 0, 0, cW, cH, 0, 0, lwW, lwH)
    }
    image_layer.src = local_canvas.toDataURL()
}

function undo_action()
{
    let pstack_size: number = pstack.length
    if (pstack_size != 0)
    {
        let cur_act: any = pstack.pop()
        let is_r: boolean = false
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
            let buf_r_elem: [string, number, number, boolean] = ['r', fW_max, fH_max, false]
            for (let i: number = pstack_size - 1; i > -1; i--)
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
        let local_cur_ctx_layer: CanvasRenderingContext2D = cur_ctx_layer
        let local_cur_canvas: HTMLCanvasElement = cur_canvas
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
        case "Escape": //скрыть окно просмотра изображения до генерации
            before_gen_block.style.display = "none"
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
            let cpl: number = curprim.length - 1
            prevX = curprim[cpl][0]
            prevY = curprim[cpl][1]
        }
        is_shift_on = false
    }
}, false)

canvas_additional.addEventListener("pointerdown", (e: PointerEvent) => 
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
                cur_ctx_layer = ctx_layer_2
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
                cur_ctx_layer = ctx_layer_1
                is_foreground_selected = true
            }
            else
            {
                layer_1.style.border = "5px solid #000000"
                layer_2.style.border = "1px solid #707070"
                cur_draw_ctx = ctx_foreground
                cur_canvas = canvas_layer_1
                cur_ctx_layer = ctx_layer_1
                is_foreground_selected = true
            }
        }
    }
    let cur_x: number = e.clientX
    let cur_y: number = e.clientY
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

function rgbToHex(r: number, g: number, b: number) 
{
    return ((r << 16) | (g << 8) | b).toString(16)
}

function rgbaToHex(r: number, g: number, b: number, a: number) 
{
    return ((r << 24) | (g << 16) | (b << 8) | a).toString(16)
}

function getPixel(pixelData: any, x: number, y: number) 
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

function addSpan(spansToCheck: any, left: number, right: number, y: number, direction: number)
{
    spansToCheck.push({ left, right, y, direction })
}

function checkSpan(pixelData: any, targetColor: string, spansToCheck: any, left: number, right: number, y: number, direction: number)
{
    let inSpan: boolean = false
    let start: number = 0
    let x: number
    for (x = left; x < right; ++x)
    {
        let color: string = getPixel(pixelData, x, y)
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
    let dex_clr: number = parseInt("FF" + fillColor.slice(6, 8) + fillColor.slice(4, 6) + fillColor.slice(2, 4), 16)
    let imageData: ImageData = local_ctx.getImageData(0, 0, local_ctx.canvas.width, local_ctx.canvas.height)
    let pixelData: any = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
    }
    let targetColor: string = getPixel(pixelData, x, y)
    if (targetColor !== fillColor) 
    {
        let spansToCheck: [number, number, number, number][] = []
        addSpan(spansToCheck, x, x, y, 0)
        let iter_max: number = Math.round(cH) * 2
        let iter: number = 0
        while (spansToCheck.length > 0 && iter <= iter_max) 
        {
            iter++
            let { left, right, y, direction }: any = spansToCheck.pop()
            let l: number = left
            let iter_l_max: number = left - cH / 2
            while (true)
            {
                --l
                let color: string = getPixel(pixelData, l, y)
                if (color !== targetColor || l < iter_l_max) 
                {
                    break
                }
            }
            ++l
            let r: number = right
            let iter_r_max: number = right + cW / 2
            while (true)
            {
                ++r
                let color: string = getPixel(pixelData, r, y)
                if (color !== targetColor || r > iter_r_max)
                {
                    break
                }
            }
            let lineOffset: number = y * pixelData.width
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

d_frame.addEventListener("pointerdown", (e: PointerEvent) => 
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
        let cur_x: number = e.clientX - W_f
        let cur_y: number = e.clientY - H_f
        if (cur_tool[0] == 'p') //если выбрана пипетка
        {
            let rgba: Uint8ClampedArray = ctx_foreground.getImageData(cur_x - 1, cur_y - 1, 1, 1).data
            if (!is_foreground_visible)
            {
                rgba[3] = 0
            }
            let hex: any
            if (rgba[3] == 0)
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
                let rgba: Uint8ClampedArray = cur_draw_ctx.getImageData(cur_x, cur_y, 1, 1).data
                let hex: string = '#' + ("00000000" + rgbaToHex(rgba[0], rgba[1], rgba[2], rgba[3])).slice(-8)
                if (cur_brush_clr + "ff" != hex) //если цвет выбранной точки не равен текущему
                {
                    let cur_form_clr: string = "0x" + cur_brush_clr.slice(1) + "FF"
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

function addGraphicTabletButton(e: PointerEvent)
{
    if (e.pointerType == "pen")
    {
        graphic_tabletBtn.style.display = "block"
        nav_panel.removeEventListener("pointermove", addGraphicTabletButton)
    }
}

nav_panel.addEventListener("pointermove", addGraphicTabletButton) //проверка курсора на поле с кнопками

window.addEventListener("pointermove", (e: PointerEvent) => //проверка курсора на всём окне, но только один раз
{
    if (e.pointerType == "pen")
    {
        graphic_tabletBtn.style.display = "block"
        nav_panel.removeEventListener("pointermove", addGraphicTabletButton)
    }
},
{
    once: true
}) 

canvas_additional.addEventListener("pointermove", (e: PointerEvent) => //проверка курсора на поле для рисования
{
    on_d_fiend = true
    if(cursor_type != 3 && !f_move)
    {
        cursor_type = 3
        cursor_image.setAttribute("src", cur_tool[2])
    }
})

function getBezierBasis(i: number, n: number, t: number) //Базисная функция i - номер вершины, n - количество вершин, t - положение кривой (от 0 до 1)
{
	// Факториал
	function f(n: number): number
    {
		return (n <= 1) ? 1 : n * f(n - 1)
	}
	// считаем i-й элемент полинома Берштейна
	return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i) * Math.pow(1 - t, n - i)
}

// arr - массив опорных точек. Точка - двухэлементный массив, (x = arr[0], y = arr[1]), step - шаг при расчете кривой (0 < step < 1), по умолчанию 0.01
function getBezierCurve(arr: [number, number, number][], step: number) 
{
	step = 1.0 / step
    let res: [number, number, number][] = new Array()
    for (let t: number = 0; t < 1 + step; t += step) 
    {
		t = Math.min(1, t)
        let ind: number = res.length
		res[ind] = [0, 0, 0]
        for (let i: number = 0; i < arr.length; i++) 
        {
            let b: number = getBezierBasis(i, arr.length - 1, t)
			res[ind][0] += arr[i][0] * b
			res[ind][1] += arr[i][1] * b
            res[ind][2] += arr[i][2] * b
		}
	}
	return res
}

function drawLines(local_ctx: CanvasRenderingContext2D, arr: [number, number, number][]) 
{
    local_ctx.beginPath()
    for (let i: number = 0; i < arr.length - 1; i++)
    {
        local_ctx.lineWidth = arr[i][2]
		local_ctx.moveTo(arr[i][0], arr[i][1])
		local_ctx.lineTo(arr[i + 1][0], arr[i + 1][1])
		local_ctx.stroke()
    }
}

d_frame.addEventListener("pointermove", (e: PointerEvent) => //проверка курсора на поле вместе с рамкой
{
    on_d_frame = true
    if(!on_d_fiend && !draw)
    {
        let X: number = e.clientX - W_min
        let Y: number = e.clientY - H_min
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
    let pX: number = e.clientX - W_f
    let pY: number = e.clientY - H_f
    let pW: number = e.pressure
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
            let drawing_mode: string
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
        let currentX: number = pX * cmp_W - l_width / 2
        let currentY: number = pY * cmp_H - l_width / 2
        let currentW: number
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
        if (fp)
        {
            original_image_buf = ""
            before_gen_block.style.display = "none"
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
            let delta_x: number = currentX - prevX
            let delta_y: number = currentY - prevY
            let k_tan: number = Math.round(Math.atan(delta_y / delta_x) / Pi_div_4)
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
    let prev_f_dW: number = f_dW
    let prev_f_dH: number = f_dH
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
        let cur_new_dfw: number = f_dW + X_move
        let cur_new_dfh: number = f_dH + Y_move
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