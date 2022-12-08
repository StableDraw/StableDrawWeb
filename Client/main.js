const cursor = document.querySelector(".cursor")
const cursor_image = document.querySelector('.cursimg')
let cursor_type = -1

const nav_panel = document.querySelector('.nav')

const canvas_foreground = document.getElementById("canvas_foreground") 
const canvas_background = document.getElementById("canvas_background")
const canvas_additional = document.getElementById("canvas_additional") 

const canvas_layer_1 = document.getElementById("layer_1_display_canvas")
const canvas_layer_2 = document.getElementById("layer_2_display_canvas") 

const d_frame = document.getElementById("d_frame")
const spanel = document.getElementById("mySidepanel")

const clr_w = document.getElementById("clr_window")
const pencil_w = document.getElementById("pencil_window")
const eraser_w = document.getElementById("eraser_window")
const ok_clr_btn = document.getElementById("ok_clr_btn") 
const cur_color = document.getElementById("color") 
const clrimg = document.getElementById('clrimg')
const ctx_foreground = canvas_foreground.getContext("2d", { willReadFrequently: true })
const ctx_background = canvas_background.getContext("2d", { willReadFrequently: true })
const ctx_add = canvas_additional.getContext("2d", { willReadFrequently: true })

const ctx_layer_1 = canvas_layer_1.getContext("2d", { willReadFrequently: true })
const ctx_layer_2 = canvas_layer_2.getContext("2d", { willReadFrequently: true })

const ratio_field = document.querySelector('.f_ratio')
const ratio_tooltip = document.querySelector('ratio_tooltip')

const thickness_slider = document.querySelector('.thickness_slider')
const thickness_field = document.querySelector('.thickness_field')
const e_thickness_slider = document.querySelector('.e_thickness_slider')
const e_thickness_field = document.querySelector('.e_thickness_field')

const smoothing_slider = document.querySelector('.smoothing_slider')
const smoothing_field = document.querySelector('.smoothing_field')

const layer_1 = document.getElementById("layer_1")

const EL = (sel) => document.querySelector(sel)

const id_list = ['p', 'i', 'u', 'f']

const Pi_div_4 = Math.PI / 4

let nstack = []
let pstack = []
let curprim = []
let fp = true
let on_d_frame = false
let on_d_fiend = false

let prevX = null
let prevY = null
let move_prevX = null
let move_prevY = null
let X_move = null
let Y_move = null

let cX
let cY

let is_shift_on = false

let fup = false
let fdown = false
let fright = false
let fleft = false 
let cfup = false
let cfleft = false

let W = window.innerWidth
let H = window.innerHeight

let fW_max = W * 0.8
let fH_max = H * 0.8
let fW_min = W * 0.1
let fH_min = H * 0.1

let cW = canvas_foreground.offsetWidth
let cH = canvas_foreground.offsetHeight
let cD = cW / cH
let Max_cW = cW
let Max_cH = cH

let lW = canvas_layer_1.offsetWidth
let lH = canvas_layer_1.offsetHeight
let orig_lW = lW
let orig_lH = lH
let orig_lD = lW / lH

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

let lWp = Math.round(995 * (lW / orig_lW)) / 10 + "%"
let lHp = Math.round(1000 * (lH / orig_lH)) / 10 + "%"
canvas_layer_1.style.width = lWp
canvas_layer_2.style.width = lWp
canvas_layer_1.style.height = lHp
canvas_layer_2.style.height = lHp

let cur_real_ratio = cH / cW

let l_width = 1

let W_f = (W - cW) / 2 + cW / 105 - l_width / 2 + 5
let H_f = (H - cH) / 2 + cH / 135 - l_width / 2 + 5
let f_dW = d_frame.offsetWidth * 0.96
let f_dH = d_frame.offsetHeight * 0.96 // костыли
let orig_f_dW = f_dW
let orig_f_dH = f_dH
let cmp_W = 1
let cmp_H = 1
let cmp_W_b = 0
let cmp_H_b = 0
d_frame.style.width = f_dW + "px"
d_frame.style.height = f_dH + "px"
let H_min = (H - f_dH) / 4
let H_max = f_dH + H_min

let W_min = (W - f_dW) / 4
let W_max = f_dW + W_min

canvas_foreground.height = cH
canvas_foreground.width = cW
canvas_background.height = cH
canvas_background.width = cW
canvas_additional.height = cH
canvas_additional.width = cW

let iscaption = false //Временый костыль, убрать
let ispicture = false //Тоже временный костыль, убрать

let draw = false
let enddraw = false
let f_move = false
let end_f_move = false

let old_btn_clr = false //изначально чёрный текст у кнопок цвета
let on_clr_window = false

let is_background_used = false
let cur_background_clr = "#fff"
let new_background_clr = cur_background_clr
let cur_brush_clr = "#000000"

ctx_background.fillStyle = cur_background_clr //заливка фона белым, костыль, убрать
ctx_background.fillRect(0, 0, cW, cH)
let is_clr_brash = true

let cur_ratio_val = get_visual_ratio(false, cW, cH)
ratio_field.value = cur_ratio_val //устанавливаем соотношение сторон при запуске

let is_first_upload_btn_click = true //костыль, чтобы кнопка не срабатывала дважды

let original_image_buf = "" //переменная для хранения исходных изображений

let is_foreground_selected = true //выбран ли верхний слой, по-умолчанию выбран
let cur_draw_ctx = ctx_foreground //текущий выбранный слой для рисования, по-умолчанию верхний
let cur_canvas = canvas_foreground //текущий выбранный слой для рисования ввиде слоя, не контекста, по-умолчанию верхний
let cur_ctx_layer = ctx_layer_1 //текущий выбранный слой для рисования ввиде контекста кнопки который в углу, по-умолчанию верхний

let graphic_tablet_mode = false //режим графического планшета

let is_clr_window = false //отображение окна с палитрой
let is_pencil_window = true //отображение окна настроек кисти
let is_eraser_window = false //отображение окна настроек ластика

let cur_smoothing = 0 //параметр сглаживания
let cur_smooth_prim = [] //текущий сглаженный примитив
let k_smooth = 0 //текущий коэффициент сглаживания

let is_foreground_visible = true //включена ли видимость переднего слоя
let is_background_visible = true //включена ли видимость заднего слоя

ctx_foreground.lineCap = 'round'
ctx_foreground.lineJoin = 'round'
ctx_add.lineCap = 'round'
ctx_add.lineJoin = 'round'
ctx_background.lineCap = 'round'
ctx_background.lineJoin = 'round'

layer_1.style.border = "5px solid #000000"
layer_2.style.border = "1px solid #707070"

ws = new WebSocket('wss://stabledraw.com:8081')
let chain_id = -1
let task_id

ws.onmessage = function(event)
{
    var jdata = JSON.parse(event.data)
    var type = jdata[0];
    if (type == "t") //если текстовое сообщение
    {
        alert(jdata[1])
        return
    }
    if (type == "c") //если подпись
    {
        task_id = jdata[1]
        alert(jdata[2]) //костыль, потом заменить
        chain_id = jdata[3]
        return
    }
    if (type == "i") //если изображение
    {
        let image = new Image()
        image.onload = function() 
        {
            ctx_foreground.clearRect(0, 0, cW, cH) // очищаем верхний холст
            ctx_foreground.drawImage(image, 0, 0, jdata[2], jdata[3], 0, 0, cW, cH)
            pstack.push(['u', cur_draw_ctx, image, jdata[2], jdata[3]])
            ctx_layer_1.clearRect(0, 0, lW, lH)
            canvas_to_layer(cur_canvas, cur_ctx_layer)
        }
        original_image_buf = "data:image/png;base64," + jdata[1]
        image.src = original_image_buf
        chain_id = jdata[4]
        return
    }
}

//ws.onopen = function(){alert("open");} 

ws.onclose = function() //Убрать
{
    alert("Соединение разорвано");
}

//ws.onerror = function(){alert("error");}

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
    W_f = (W - cW) / 2 + cW / 105 - l_width / 2 + 5
    H_f = (H - cH) / 2 + cH / 135 - l_width / 2 + 5
    f_dW = d_frame.offsetWidth
    f_dH = d_frame.offsetHeight
    orig_f_dW = f_dW
    orig_f_dH = f_dH
    d_frame.style.width = f_dW + "px"
    d_frame.style.height = f_dH + "px"
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

ratio_field.onchange = function() 
{
    let t_v = ratio_field.value
    let pos = t_v.indexOf(":")
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
    let new_r_w_s = t_v.slice(0, pos)
    let new_r_h_s = t_v.slice(pos + 1)
    let new_r_w = parseInt(new_r_w_s)
    let new_r_h = parseInt(new_r_h_s)
    let new_dfw, new_dfh
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
    change_drawfield_size(new_dfw, new_dfh)
    let ps_size = pstack.length
    if (ps_size != 0 && pstack[ps_size - 1][0] == 'r')
    {
        pstack.pop()
    }
    pstack.push(['r', new_dfw, new_dfh, true])
    replay_actions(pstack) //Повторная отрисовка с новым разрешением
    return get_visual_ratio(true, new_dfw, new_dfh)
}

function get_visual_ratio(abs, w, h)
{
    let rat = [[2.0556, 21, 9], [1.5556, 16, 9], [1.1667, 4, 3], [0.875, 1, 1], [0.6562, 3, 4], [0.4955, 9, 16]]
    let cur_ratio = w / h
    let v_w, v_h, cur_k
    if (cur_ratio <= 0.4955)
    {
        v_w = 9
        v_h = 21
    }
    else
    {
        for (let r of rat)
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
    let res = (v_w).toString() + ":" + (v_h).toString()
    if (!abs)
    {
        res = "≈" + res
    }
    return res
}

// Установить ширину боковой панели на 250 пикселей (показать)
function openNav() 
{
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
    spanel.style.width = "0"
    setTimeout(closeNav_border, 490);
}

let backBtn = document.getElementById("arrow_back")

backBtn.addEventListener("click", () => 
{
    undo_action()
})

let nextBtn = document.getElementById("arrow_next")

nextBtn.addEventListener("click", () => 
{
    repeat_action()
})

function hexDec(h)
{
    let m=h.slice(1).match(/.{2}/g)
    m[0]=parseInt(m[0], 16)
    m[1]=parseInt(m[1], 16)
    m[2]=parseInt(m[2], 16)
    return m[0], m[1], m[2]
}

function handleclr_PointerMove() 
{
    on_clr_window = true
    let ccv = cur_color.value
    let rgb = [0, 0, 0]
    if (ccv == "#NaNNaNNaN")
    {
        ccv = "#" + colourBtn.style.background.split("(")[1].split(")")[0].split(",").map(function(x) 
        {
            x = parseInt(x).toString(16)
            return (x.length==1) ? "0" + x : x
        }).join("")
        cur_color.value = ccv
    }
    rgb[0], rgb[1], rgb[2] = hexDec(ccv)
    if (rgb[0] + rgb[1] + rgb[2] > 255)
    {
        if(!old_btn_clr)
        {
            old_btn_clr = true
            ok_clr_btn.style.color = '#000000'
            clrimg.setAttribute('src', 'palette.png');
        }
    }
    else
    {
        if(old_btn_clr)
        {
            old_btn_clr = false
            ok_clr_btn.style.color = '#fff'
            clrimg.setAttribute('src', 'palette_w.png');
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
    let rgb = [0, 0, 0]
    if (is_clr_brash)
    {
        is_background_used = true
        cur_brush_clr = cur_color.value
        ctype_clr_btn.textContent = "Цвет кисти"
        cur_color.value = cur_background_clr
        rgb[0], rgb[1], rgb[2] = hexDec(cur_brush_clr)
        if (rgb[0] + rgb[1] + rgb[2] > 255)
        {
            ctype_clr_btn.style.color = '#000000'
            clrimg.setAttribute('src', 'palette_w.png');
        }
        else
        {
            ctype_clr_btn.style.color = '#fff'
            clrimg.setAttribute('src', 'palette.png');
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
        rgb[0], rgb[1], rgb[2] = hexDec(new_background_clr)
        if (rgb[0] + rgb[1] + rgb[2] > 255)
        {
            ctype_clr_btn.style.color = '#000000'
            clrimg.setAttribute('src', 'palette_w.png');
        }
        else
        {
            ctype_clr_btn.style.color = '#fff'
        }
        ctype_clr_btn.style.background = new_background_clr
        rgb[0], rgb[1], rgb[2] = hexDec(ccv)
        if (rgb[0] + rgb[1] + rgb[2] > 255)
        {
            if(!old_btn_clr)
            {
                old_btn_clr = true
                clrimg.setAttribute('src', 'palette.png');
            }
        }
        else
        {
            if(old_btn_clr)
            {
                old_btn_clr = false
                clrimg.setAttribute('src', 'palette_w.png');
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
    let ccv = cur_color.value
    if (ccv == "#NaNNaNNaN")
    {
        ccv = "#" + colourBtn.style.background.split("(")[1].split(")")[0].split(",").map(function(x) 
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
    if (is_background_used)
    {
        if (cur_background_clr != new_background_clr) //почему-то не работает, из-за этого пришлось сделать костыль строчкой сверху. Убрать
        {
            pstack.push(['i', ctx_background, new_background_clr]) //залить фон
            ctx_background.fillStyle = new_background_clr; //заливка фона белым, костыль, убрать
            ctx_background.fillRect(0, 0, cW, cH);
            canvas_to_layer(canvas_background, ctx_layer_2)
        }
        else
        {
            is_background_used = false
        }
    }
    ctx_foreground.strokeStyle = cur_brush_clr
    ctx_add.strokeStyle = cur_brush_clr
    ctx_background.strokeStyle = cur_brush_clr
    clr_w.style.display = "none"
}

const select_first_layerBtn = document.getElementById("layer_button_1")

select_first_layerBtn.addEventListener("click", () => 
{
    if (!is_foreground_selected)
    {
        layer_1.style.border = "5px solid #000000"
        layer_2.style.border = "1px solid #707070"
        cur_draw_ctx = ctx_foreground
        cur_canvas = canvas_foreground
        cur_ctx_layer = ctx_layer_1
        is_foreground_selected = true
    }
})

const select_second_layerBtn = document.getElementById("layer_button_2")

select_second_layerBtn.addEventListener("click", () => 
{
    if (is_foreground_selected)
    {
        is_background_used = true
        layer_1.style.border = "1px solid #707070"
        layer_2.style.border = "5px solid #000000"
        cur_draw_ctx = ctx_background
        cur_canvas = canvas_background
        cur_ctx_layer = ctx_layer_2
        is_foreground_selected = false
    }
})

const first_layer_visibilityBtn = document.getElementById("layer_1_visibility_button")
const first_layer_visibility_img = document.getElementById("layer_1_visibility_img")

first_layer_visibilityBtn.addEventListener("click", () => 
{
    if (is_foreground_visible)
    {
        is_foreground_visible = false
        canvas_foreground.style.display = "none"
        first_layer_visibility_img.setAttribute('src', "visibility_off.png")
    }
    else
    {
        is_foreground_visible = true
        canvas_foreground.style.display = "block"
        first_layer_visibility_img.setAttribute('src', "visibility_on.png")
    }
})

const second_layer_visibilityBtn = document.getElementById("layer_2_visibility_button")
const second_layer_visibility_img = document.getElementById("layer_2_visibility_img")

second_layer_visibilityBtn.addEventListener("click", () => 
{
    if (is_background_visible)
    {
        is_background_visible = false
        is_background_used = false
        canvas_background.style.display = "none"
        second_layer_visibility_img.setAttribute('src', "visibility_off.png")
    }
    else
    {
        is_background_visible = true
        is_background_used = true
        canvas_background.style.display = "block"
        second_layer_visibility_img.setAttribute('src', "visibility_on.png")
    }
})

const merge_layersBtn = document.getElementById("merge_layers")

function merge_layers_in_stack(stack, local_ctx)
{
    let substack_1 = []
    let substack_2 = []
    if (local_ctx == ctx_foreground)
    {
        for (let i = 0; i < stack.length; i++)
        {
            if (id_list.includes(stack[i][0]) && stack[i][1] == ctx_background)
            {
                stack[i][1] = local_ctx
                substack_2.push(stack[i])
            }
            else
            {
                substack_1.push(stack[i])
            }
        }
    }
    else
    {
        for (let i = 0; i < stack.length; i++)
        {
            if (id_list.includes(stack[i][0]) && stack[i][1] == ctx_foreground)
            {
                stack[i][1] = local_ctx
                substack_1.push(stack[i])
            }
            else
            {
                substack_2.push(stack[i])
            }
        }
    }
    stack = substack_2.concat(substack_1)
    return stack
}

merge_layersBtn.addEventListener("click", () => 
{
    pstack = merge_layers_in_stack(pstack, cur_draw_ctx)
    nstack = merge_layers_in_stack(nstack, cur_draw_ctx)
    replay_actions(pstack)
    if (is_foreground_selected)
    {
        ctx_layer_2.clearRect(0, 0, lW, lH)
    }
    else
    {
        ctx_layer_1.clearRect(0, 0, lW, lH)
    }
    cur_ctx_layer.clearRect(0, 0, lW, lH)
    canvas_to_layer(cur_canvas, cur_ctx_layer)
})

const swap_layersBtn = document.getElementById("swap_layers")

function swap_layers_in_stack(stack)
{
    for (let i = 0; i < stack.length; i++)
    {
        if (id_list.includes(stack[i][0]))
        {
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
    return stack
}

swap_layersBtn.addEventListener("click", () => 
{
    pstack = swap_layers_in_stack(pstack)
    nstack = swap_layers_in_stack(nstack)
    replay_actions(pstack)
    ctx_layer_1.clearRect(0, 0, lW, lH)
    canvas_to_layer(canvas_foreground, ctx_layer_1)
    ctx_layer_2.clearRect(0, 0, lW, lH)
    canvas_to_layer(canvas_background, ctx_layer_2)
})

const graphic_tabletBtn = document.getElementById("graphic_tablet")

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

let colourBtn = document.getElementById("palette")
colourBtn.style.background = "#000000"
let ok_clr = document.querySelector(".ok_clr_btn")
let ctype_clr_btn = document.querySelector(".ctype_clr_btn")

colourBtn.addEventListener("click", () => 
{
    if (is_pencil_window || is_eraser_window)
    {
        pencil_w.style.display = 'none'
        is_pencil_window = false
        eraser_w.style.display = 'none'
        is_eraser_window = false
    }
    cur_color.value = cur_brush_clr
    if (is_clr_window == false)
    {
        clr_w.style.display = "block"
        is_clr_window = true
        clr_w.addEventListener("pointermove", handleclr_PointerMove)
        ctype_clr_btn.addEventListener("click", handlet_clr_Click)
        ok_clr.addEventListener("click", () => 
        {
            cursor_type = 3
            cursor_image.setAttribute('src', cur_tool[2])
            cursor.style.left = (cX + 7.5) + "px";
            cursor.style.top = (cY + 7.5) + "px";
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

function change_thickness(flag)
{
    let t_v
    if (flag)
    {
        t_v = thickness_field.value - 1
    }
    else
    {
        t_v = e_thickness_field.value - 1
    }
    let real_t_v = Math.min(100, Math.max(0, t_v))
    if (t_v != real_t_v)
    {
        t_v = real_t_v
    }
    thickness_field.value = t_v + 1
    e_thickness_field.value = t_v + 1
    thickness_slider.value = t_v + 1
    e_thickness_slider.value = t_v + 1
    let thickness_k = t_v * t_v * 0.0001 //коэффициент, чтобы толщина не увеличивалась так резко, сейчас это квадрат
    l_width = 1 + Math.max(cW, cH) * thickness_k
    W_f = (W - cW) / 2 + cW / 105 - l_width / 2 + 5
    H_f = (H - cH) / 2 + cH / 135 - l_width / 2 + 5
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
    let real_s_v = Math.min(100, Math.max(0, cur_smoothing))
    if (cur_smoothing != real_s_v)
    {
        cur_smoothing = real_s_v
        smoothing_field.value = cur_smoothing
    }
    k_smooth = 0
    step = 1.0 / cur_smoothing
    for (let t = 0; t < 1 + step; t += step) //очень странный костыль, исправлю позже
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

const setpencilBtn = document.getElementById("pencil")
setpencilBtn.style.border = "5px solid #000000"
let cur_tool = ['k', setpencilBtn, 'aero_pen.cur'] //текущий инструмент (карандаш)

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
            change_thickness()
            eraser_w.style.display = 'none'
            is_eraser_window = false
            ctx_foreground.globalCompositeOperation="source-over";
            ctx_background.globalCompositeOperation="source-over";
        }
        is_pencil_window = true
        pencil_w.style.display = 'block'
        setpencilBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['k', setpencilBtn, 'aero_pen.cur']
    }
    else
    {
        if (is_pencil_window)
        {
            change_thickness()
            pencil_w.style.display = 'none'
            is_pencil_window = false
        }
        else
        {
            pencil_w.style.display = 'block'
            is_pencil_window = true
        }
    }
})

const seteraserBtn = document.getElementById("eraser")

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
            change_thickness()
            pencil_w.style.display = 'none'
            is_pencil_window = false
            ctx.globalCompositeOperation="destination-out";
            ctx_background.globalCompositeOperation="destination-out";
        }
        is_eraser_window = true
        eraser_w.style.display = 'block'
        seteraserBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['e', seteraserBtn, 'aero_eraser.png']
    }
    else
    {
        if (is_eraser_window)
        {
            change_thickness()
            eraser_w.style.display = 'none'
            is_eraser_window = false
        }
        else
        {
            eraser_w.style.display = 'block'
            is_eraser_window = true
        }
    }
})

const setbucketBtn = document.getElementById("bucket")

setbucketBtn.addEventListener("click", () => 
{
    if (cur_tool[0] != 'b')
    {
        if (cur_tool[0] == 'k' || cur_tool[0] == 'e')
        {
            pencil_w.style.display = 'none'
            is_pencil_window = false
            eraser_w.style.display = 'none'
            is_eraser_window = false
            change_thickness()
            pencil_w.style.display = 'none'
        }
        setbucketBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['b', setbucketBtn, 'aero_bucket.png']
    }
})

const setpipetteBtn = document.getElementById("pipette")

setpipetteBtn.addEventListener("click", () => 
{
    if (cur_tool[0] != 'p')
    {
        if (cur_tool[0] == 'k' || cur_tool[0] == 'e')
        {
            pencil_w.style.display = 'none'
            is_pencil_window = false
            eraser_w.style.display = 'none'
            is_eraser_window = false
            change_thickness()
            pencil_w.style.display = 'none'
        }
        setpipetteBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['p', setpipetteBtn, 'aero_pipette.png']
    }
})

const clearBtn = document.getElementById("clear")

function clear_drawfield()
{
    original_image_buf = ""
    cur_background_clr = "#fff"
    ctx_background.fillStyle = cur_background_clr
    ctx_background.fillRect(0, 0, cW, cH)
    //ctx_layer_1.clearRect(0, 0, lW, lH)
    ctx_foreground.clearRect(0, 0, cW, cH)
}

clearBtn.addEventListener("click", () => 
{
    iscaption = false //убрать
    ispicture = false //убрать
    let inds = pstack.length
    if(inds != 0)
    {
        if(pstack[inds - 1][0] != 'd')
        {
            pstack.push(['d']) //тип - очистка экрана
        }
    }
    clear_drawfield()
})

const mhf = document.getElementById('my_hidden_file')
const uploadBtn = document.getElementById("upload")

uploadBtn.addEventListener("click", () => 
{
    if(!is_first_upload_btn_click) //костыль чтобы кнопка не срабатывала дважды
    {
        is_first_upload_btn_click = true
        return
    }
    is_first_upload_btn_click = false
    mhf.click(); 
    mhf.addEventListener("change", function readImage()
    {
        if (!this.files || !this.files[0]) return;
        chain_id = -1
        const FR = new FileReader();
        FR.addEventListener("load", (evt) => 
        {
            let new_img_w
            let new_img_h
            let img = new Image();
            img.addEventListener("load", () => 
            {
                let img_w = img.width
                let img_h = img.height
                let new_dfw
                let new_dfh
                let ps_size = pstack.length
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
                new_dfw *= 0.982 //костыль. Я не понимаю, почему пустое поле появляется справа (ширину берёт больше, чем надо)
                change_drawfield_size(new_dfw, new_dfh)
                cur_ratio_val = get_visual_ratio(false, cW, cH)
                ratio_field.value = cur_ratio_val //устанавливаем соотношение сторон
                replay_actions(pstack) //воспроизводим действия
                if (ps_size != 0 && pstack[ps_size - 1][0] == 'r')
                {
                    pstack.pop()
                }
                pstack.push(['r', new_dfw, new_dfh, false])
                cur_draw_ctx.clearRect(0, 0, cW, cH) //очищаем текущий слой
                cur_draw_ctx.drawImage(img, 0, 0, new_img_w, new_img_h, 0, 0, cW, cH)
                pstack.push(['u', cur_draw_ctx, img, new_img_w, new_img_h])
                cur_ctx_layer.clearRect(0, 0, lW, lH)
                canvas_to_layer(cur_canvas, cur_ctx_layer)
            }, 
            { 
                once: true 
            });
            original_image_buf = evt.target.result
            img.src = original_image_buf
        }, 
        { 
            once: true 
        });
        FR.readAsDataURL(this.files[0]);
    }, 
    { 
        once: true 
    });
})

const saveBtn = document.getElementById("save")

saveBtn.addEventListener("click", () => 
{
    let image = new Image()
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
            let a = document.createElement("a")
            ctx_background.drawImage(image, 0, 0, image.width, image.height, 0, 0, cW, cH)
            a.href = canvas_background.toDataURL("imag/png")
            a.download = "sketch.png"
            a.click()
            replay_actions(pstack)
        }
        image.src = canvas_foreground.toDataURL()
    }
    else
    {
        let a = document.createElement("a")
        a.href = original_image_buf
        a.download = "sketch.png"
        a.click()
    }
})

const generateBtn = document.getElementById("generate")

generateBtn.addEventListener("click", () => 
{
    let send_data
    let data
    let background_data
    if (!iscaption) //убрать
    {
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
        if (!ispicture)
        {
            if (is_background_used == true && is_background_visible)
            {
                background_data = canvas_background.toDataURL("imag/png")
            }
            else
            {
                background_data = ""
            }
            send_data = JSON.stringify({ 
                "type": "d", //рисунок
                "data": data,
                "backgroung": background_data
            });
            iscaption = true
        }
        else //удаление фона
        {
            if (chain_id != -1) 
            {
                data = ""
            }
            ispicture = false
            send_data = JSON.stringify({ 
                "type": "b", //просьба удалить фон
                "data": data,
                "chain_id": chain_id, //id последнего звена цепочки
                "task_id": task_id //id задания
            });
        }
    }
    else
    {
        iscaption = false //убрать
        send_data = JSON.stringify({ 
            "type": "g", //просьба сгенерировать с текущей подписью
            "chain_id": chain_id, //id последнего звена цепочки
            "task_id": task_id //id задания
        });
        ispicture = true
    }
    ws.send(send_data)
})

document.addEventListener('pointerenter', (e) => 
{
    let cX = e.clientX
    let cY = e.clientY
    cursor.style.left = (cX + 7.5) + "px";
    cursor.style.top = (cY + 7.5) + "px";
}, { once: true });

function replay_action(act, k_X, k_Y, fW_pred, fH_pred)
{
    let act_type = act[0]
    switch (act_type)
    {
        case 'p': //если это примитив
            let prim = act[2]
            act[1].strokeStyle = act[3]
            act[1].beginPath()
            for (i = 1; i < prim.length; i++) 
            {
                act[1].lineWidth = prim[i][2]
                act[1].moveTo(prim[i - 1][0] / k_X, prim[i - 1][1] / k_Y)
                act[1].lineTo(prim[i][0] / k_X, prim[i][1] / k_Y)
            }
            act[1].stroke()
            break
        case 'd': //если очистка экрана
            cur_background_clr = "#fff"
            ctx_background.fillStyle = cur_background_clr
            ctx_background.fillRect(0, 0, cW, cH)
            ctx_foreground.clearRect(0, 0, canvas_foreground.width, canvas_foreground.height)
            break
        case 'r': //если изменение размеров экрана
            k_X = (k_X * act[1]) / fW_pred
            k_Y = (k_Y * act[2]) / fH_pred
            fW_pred = act[1]
            fH_pred = act[2]
            break
        case 'i': //если заливка слоя целиком
            act[1].fillStyle = act[2]
            act[1].fillRect(0, 0, cW, cH);
            break
        case 'u': //если добавление изображения с ПК
            act[1].clearRect(0, 0, cW, cH) //очищаем нужный слой
            act[1].drawImage(act[2], 0, 0, act[3], act[4], 0, 0, cW, cH)
            break
        case 'f': //если заливка
            floodFill(act[1], act[2], act[3], act[4])
            break
    }
    return k_X, k_Y, fW_pred, fH_pred
}

function replay_actions(cur_pstack)
{
    clear_drawfield()
    let change_bash_clr = false
    let new_bash_clr
    let fW_pred = orig_f_dW
    let fH_pred = orig_f_dH
    let k_X = fW_pred / f_dW
    let k_Y = fH_pred / f_dH
    let cur_thickness = 1
    ctx_foreground.lineWidth = cur_thickness
    ctx_background.lineWidth = cur_thickness
    ctx_background.strokeStyle = "#000000"
    ctx_foreground.lineCap = 'round'
    ctx_foreground.lineJoin = 'round'
    ctx_add.lineCap = 'round'
    ctx_add.lineJoin = 'round'
    ctx_background.lineCap = 'round'
    ctx_background.lineJoin = 'round'
    for (let act of cur_pstack) 
    {
        k_X, k_Y, fW_pred, fH_pred = replay_action(act, k_X, k_Y, fW_pred, fH_pred)
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

function canvas_to_layer(local_canvas, local_layer)
{
    let image_layer = new Image()
    image_layer.onload = function() 
    {
        local_layer.drawImage(image_layer, 0, 0, cW, cH, 0, 0, canvas_layer_1.width, canvas_layer_1.height)
    }
    image_layer.src = local_canvas.toDataURL()
}

function undo_action()
{
    let pstack_size = pstack.length
    if (pstack_size != 0)
    {
        let cur_act = pstack.pop()
        let is_r = false
        let local_cur_ctx_layer = cur_ctx_layer
        let local_cur_canvas = cur_canvas
        if (id_list.includes(cur_act[0]))
        {
            if (cur_act[0] == 'r')
            {
                is_r = true
            }
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
        pstack_size--
        nstack.push(cur_act)
        if (is_r)
        {
            let buf_r_elem = ['r', fW_max, fH_max, false]
            for (let i = pstack_size - 1; i > -1; i--)
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
        local_cur_ctx_layer.clearRect(0, 0, lW, lH)
        canvas_to_layer(local_cur_canvas, local_cur_ctx_layer)
    }
}

function repeat_action()
{
    if (nstack.length != 0)
    {
        let cur_act = nstack.pop()
        let cur_acts = []
        let local_cur_ctx_layer = cur_ctx_layer
        let local_cur_canvas = cur_canvas
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

document.addEventListener('keydown', (event) => 
{
    if (event.code == 'Delete')
    {
        clear_drawfield()
        return
    }
    if (event.shiftKey)
    {
        is_shift_on = true
        return
    }
    if (event.ctrlKey) 
    {
        if (event.code == 'KeyZ') 
        {
            undo_action()
            return
        }
        if (event.code == 'KeyX') 
        {
            repeat_action()
            return
        }
    }
}, false);

document.addEventListener('keyup', (event) => 
{
    if (event.code.slice(0, 5) == 'Shift')
    {
        ctx_add.clearRect(0, 0, cW, cH)
        drawLines(cur_draw_ctx, curprim)
        let cpl = curprim.length - 1
        prevX = curprim[cpl][0]
        prevY = curprim[cpl][1]
        is_shift_on = false
    }
}, false);

canvas_additional.addEventListener("pointerdown", (e) => 
{
    if (is_foreground_selected)
    {
        if (!is_foreground_visible)
        {
            if (!is_background_visible)
            {
                is_foreground_visible = true
                is_background_used = true
                canvas_foreground.style.display = "block"
                first_layer_visibility_img.setAttribute('src', "visibility_on.png")
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
                is_background_used = true
                canvas_foreground.style.display = "block"
                first_layer_visibility_img.setAttribute('src', "visibility_on.png")
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
    let cur_x = e.clientX
    let cur_y = e.clientY
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

function rgbToHex(r, g, b) 
{
    return ((r << 16) | (g << 8) | b).toString(16);
}

function rgbaToHex(r, g, b, a) 
{
    return ((r << 24) | (g << 16) | (b << 8) | a).toString(16);
}

function getPixel(pixelData, x, y) 
{
    if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) 
    {
        return -1;
    } 
    else 
    {
        return pixelData.data[y * pixelData.width + x];
    }
}

function floodFill(local_ctx, x, y, fillColor) 
{
    let dex_clr = parseInt("FF" + fillColor.slice(6, 8) + fillColor.slice(4, 6) + fillColor.slice(2, 4), 16)
    const imageData = local_ctx.getImageData(0, 0, local_ctx.canvas.width, local_ctx.canvas.height);
    const pixelData = 
    {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
    }
    const targetColor = getPixel(pixelData, x, y);
    if (targetColor !== fillColor) 
    {
        const spansToCheck = []
        function addSpan(left, right, y, direction) 
        {
            spansToCheck.push({left, right, y, direction})
        }
        function checkSpan(left, right, y, direction) 
        {
            let inSpan = false;
            let start;
            let x;
            for (x = left; x < right; ++x) 
            {
                const color = getPixel(pixelData, x, y);
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
                        addSpan(start, x - 1, y, direction);
                    }
                }
            }
            if (inSpan) 
            {
                inSpan = false
                addSpan(start, x - 1, y, direction);
            }
        }
        addSpan(x, x, y, 0)
        let iter_max = Math.round(cH) * 2 + 1
        let iter = 0
        while (spansToCheck.length > 0 && iter <= iter_max) 
        {
            iter++
            const {left, right, y, direction} = spansToCheck.pop()
            let l = left;
            let iter_l_max = left - cH / 3
            while (true)
            {
                --l
                const color = getPixel(pixelData, l, y)
                if (color !== targetColor || l < iter_l_max) 
                {
                    break
                }
            }
            ++l
            let r = right
            let iter_r_max = right + cW / 3
            while (true)
            {
                ++r;
                const color = getPixel(pixelData, r, y)
                if (color !== targetColor || r > iter_r_max)
                {
                    break
                }
            }
            const lineOffset = y * pixelData.width
            pixelData.data.fill(dex_clr, lineOffset + l - 1, lineOffset + r + 1)
            if (direction <= 0) 
            {
                checkSpan(l, r, y - 1, -1);
            } 
            else
            {
                checkSpan(l, left, y - 1, -1);
                checkSpan(right, r, y - 1, -1);
            }
            if (direction >= 0) 
            {
                checkSpan(l, r, y + 1, +1);
            } 
            else 
            {
                checkSpan(l, left, y + 1, +1);
                checkSpan(right, r, y + 1, +1);
            }     
        }

        local_ctx.putImageData(imageData, 0, 0);
    }
}

d_frame.addEventListener("pointerdown", (e) => 
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
        cur_x = e.clientX - W_f
        cur_y = e.clientY - H_f
        if (cur_tool[0] == 'p') //если выбрана пипетка
        {

            let rgba = cur_draw_ctx.getImageData(cur_x + l_width / 2, cur_y - l_width / 2, 1, 1).data //пока снимаем цвет только с верхнего слоя, временно. Потом надо снимать с текущего выбранного
            let hex
            if (rgba[3] != 0)
            {
                hex = "#" + ("000000" + rgbToHex(rgba[0], rgba[1], rgba[2])).slice(-6)
                cur_brush_clr = hex
                cur_draw_ctx.strokeStyle = cur_brush_clr
                if (rgba[0] + rgba[1] + rgba[2] > 255)
                {
                    clrimg.setAttribute('src', 'palette.png');
                }
                else
                {
                    clrimg.setAttribute('src', 'palette_w.png');
                }
                colourBtn.style.background = cur_brush_clr
            }
            draw = false
            return
        }
        else
        {
            if (cur_tool[0] == 'b') //если выбрана заливка
            {
                cur_x = Math.floor(cur_x + l_width / 2 + 2)
                cur_y = Math.floor(cur_y - l_width / 2 + 19)
                let rgba = cur_draw_ctx.getImageData(cur_x, cur_y, 1, 1).data
                hex = "#" + ("00000000" + rgbaToHex(rgba[0], rgba[1], rgba[2], rgba[3])).slice(-8)
                if (cur_brush_clr + "ff" != hex) //если цвет выбранной точки не равен текущему
                {
                    let cur_form_clr = "0x" + cur_brush_clr.slice(1) + "FF"
                    floodFill(cur_draw_ctx, cur_x, cur_y, cur_form_clr);
                    pstack.push(['f', cur_draw_ctx, cur_x, cur_y, cur_form_clr])
                    canvas_to_layer(cur_canvas, cur_ctx_layer)
                }
                draw = false
                return
            }
            else
            {
                if (is_pencil_window)
                {
                    change_thickness()
                    pencil_w.style.display = 'none'
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

function addGraphicTabletButton(e)
{
    if (e.pointerType == "pen")
    {
        graphic_tabletBtn.style.display = 'block'
        nav_panel.removeEventListener("pointermove", addGraphicTabletButton)
    }
}

nav_panel.addEventListener("pointermove", addGraphicTabletButton) //проверка курсора на поле с кнопками

canvas_additional.addEventListener("pointermove", (e) => //проверка курсора на поле для рисования
{
    on_d_fiend = true
    if(!cursor_type != 3 && !f_move)
    {
        cursor_type = 3
        cursor_image.setAttribute('src', cur_tool[2])
    }
})

function getBezierBasis(i, n, t) //Базисная функция i - номер вершины, n - количество вершин, t - положение кривой (от 0 до 1)
{
	// Факториал
	function f(n)
    {
		return (n <= 1) ? 1 : n * f(n - 1);
	}
	// считаем i-й элемент полинома Берштейна
	return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
}

// arr - массив опорных точек. Точка - двухэлементный массив, (x = arr[0], y = arr[1]), step - шаг при расчете кривой (0 < step < 1), по умолчанию 0.01
function getBezierCurve(arr, step) 
{
	step = 1.0 / step
	let res = new Array()
	for (let t = 0; t < 1 + step; t += step) 
    {
		t = Math.min(1, t)
		let ind = res.length;
		res[ind] = new Array(0, 0, 0);
		for (let i = 0; i < arr.length; i++) 
        {
			let b = getBezierBasis(i, arr.length - 1, t);
			res[ind][0] += arr[i][0] * b;
			res[ind][1] += arr[i][1] * b;
            res[ind][2] += arr[i][2] * b;
		}
	}
	return res;
}

function drawLines(local_ctx, arr) 
{
    local_ctx.beginPath()
    for (let i = 0; i < arr.length - 1; i++)
    {
        local_ctx.lineWidth = arr[i][2]
		local_ctx.moveTo(arr[i][0], arr[i][1])
		local_ctx.lineTo(arr[i + 1][0], arr[i + 1][1])
		local_ctx.stroke()
    }
}

d_frame.addEventListener("pointermove", (e) => //проверка курсора на поле вместе с рамкой
{
    on_d_frame = true
    if(!on_d_fiend && !draw)
    {
        let X = e.clientX - W_min
        let Y = e.clientY - H_min
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
                cursor_image.setAttribute('src', 'aero_nwse.cur');
            }
        }
        else
        {
            if(fleft && fdown || fright && fup)
            {
                if(cursor_type != 5)
                {
                    cursor_type = 5
                    cursor_image.setAttribute('src', 'aero_nesw.cur');
                }
            }
            else
            {
                if (fleft || fright)
                {
                    if(cursor_type != 2)
                    {
                        cursor_type = 2
                        cursor_image.setAttribute('src', 'aero_ew.cur');
                    }
                }
                else
                {
                    if(cursor_type != 1)
                    {
                        cursor_type = 1
                        cursor_image.setAttribute('src', 'aero_ns.cur');
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
    let pX = e.clientX - W_f
    let pY = e.clientY - H_f
    let pW = e.pressure
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
            draw = false
            enddraw = false
            prevX = pX
            prevY = pY
            fp = true
            if (cur_smoothing == 0)
            {
                pstack.push(['p', cur_draw_ctx, curprim, cur_brush_clr])
            }
            else
            {
                pstack.push(['p', cur_draw_ctx, cur_smooth_prim, cur_brush_clr])
            }
            canvas_to_layer(cur_canvas, cur_ctx_layer)
            nstack = []
            curprim = []
            return 
        }
        let currentX = pX * cmp_W + (pX - W_min) * 0.025 - l_width
        let currentY = pY * cmp_H - l_width / 2
        let currentW
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
            let delta_x = currentX - prevX
            let delta_y = currentY - prevY
            let k_tan = Math.round(Math.atan(delta_y / delta_x) / Pi_div_4)
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

function change_drawfield_size(new_dfw, new_dfh)//функция изменения размеров окна
{
    let prev_f_dW = f_dW
    let prev_f_dH = f_dH
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

    lWp = Math.round(995 * (lW / orig_lW)) / 10 + "%"
    lHp = Math.round(1000 * (lH / orig_lH)) / 10 + "%"
    canvas_layer_1.style.width = lWp
    canvas_layer_2.style.width = lWp
    canvas_layer_1.style.height = lHp
    canvas_layer_2.style.height = lHp
    canvas_foreground.width = cW
    canvas_foreground.height = cH
    canvas_background.width = cW
    canvas_background.height = cH
    canvas_additional.height = cH
    canvas_additional.width = cW
    ctx_foreground.lineWidth = l_width
    ctx_background.lineWidth = l_width
    W_f = (W - cW) / 2 + cW / 105 - l_width / 2 + 5
    W_min = (W - f_dW) / 4
    W_max = f_dW + W_min
    H_f = (H - cH) / 2 + cH / 135 - l_width / 2 + 5
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
                cursor.style.display = "block";
            }
        }
        else
        {
            if(cursor_type != -1)
            {
                cursor_type = -1
                cursor.style.display = "none";
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
                cursor.style.display = "none";
            }
        }
        else
        {
            if(cursor_type != 0)
            {
                cursor_type = 0
                cursor.style.display = "block";
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
        let cur_new_dfw = f_dW + X_move
        let cur_new_dfh = f_dH + Y_move
        let ps_size = pstack.length
        change_drawfield_size(cur_new_dfw, cur_new_dfh)
        cur_ratio_val = get_visual_ratio(false, cW, cH)
        ratio_field.value = cur_ratio_val //устанавливаем соотношение сторон
        if (ps_size != 0 && pstack[ps_size - 1][0] == 'r')
        {
            pstack.pop()
        }
        pstack.push(['r', cur_new_dfw, cur_new_dfh, false])
        replay_actions(pstack) //Повторная отрисовка с новым разрешением
    }
    if(cursor_type != 0 && cursor_type != 3)
    {
        cursor.style.left = cX + "px";
        cursor.style.top = cY + "px";
    }
    else
    {
        cursor.style.left = (cX + 7.5) + "px";
        cursor.style.top = (cY + 7.5) + "px";
    }
    move_prevX = cX
    move_prevY = cY
    on_d_frame = false
})