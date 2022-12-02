const cursor = document.querySelector(".cursor")
const cursor_image = document.querySelector('.cursimg')
let cursor_type = -1

const nav_panel = document.querySelector('.nav')

const canvas_foreground = document.getElementById("canvas_foreground") 
const canvas_background = document.getElementById("canvas_background")
const canvas_additional = document.getElementById("canvas_current") 
const d_frame = document.getElementById("d_frame")
const spanel = document.getElementById("mySidepanel")

const clr_w = document.getElementById("clr_window")
const pencil_w = document.getElementById("pencil_window")
const eraser_w = document.getElementById("eraser_window")
const ok_clr_btn = document.getElementById("ok_clr_btn") 
const cur_color = document.getElementById("color") 
const clrimg = document.querySelector('.clrimg')
const ctx = canvas_foreground.getContext("2d", { willReadFrequently: true })
const ctx_background = canvas_background.getContext("2d", { willReadFrequently: true })
const ctx_add = canvas_additional.getContext("2d", { willReadFrequently: true })

const ratio_field = document.querySelector('.f_ratio')
const ratio_tooltip = document.querySelector('ratio_tooltip')

const thickness_slider = document.querySelector('.thickness_slider')
const thickness_field = document.querySelector('.thickness_field')
const e_thickness_slider = document.querySelector('.e_thickness_slider')
const e_thickness_field = document.querySelector('.e_thickness_field')

const smoothing_slider = document.querySelector('.smoothing_slider')
const smoothing_field = document.querySelector('.smoothing_field')

const EL = (sel) => document.querySelector(sel)

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

let shift_k = false
let shift_x = false
let shift_y = false

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
let Max_cW = cW
let Max_cH = cH

let cur_real_ratio = cH / cW

let l_width

let W_f = (W - cW) / 2 + cW / 86 - l_width / 2 + 5
let H_f = (H - cH) / 2 + cH / 86 - l_width / 2 + 5
let f_dW = d_frame.offsetWidth * 0.971
let f_dH = d_frame.offsetHeight * 0.971 // костыли
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
ctx.lineWidth = l_width
ctx_add.lineWidth = l_width
ctx_background.lineWidth = l_width

let iscaption = false //Временый костыль, убрать
let ispicture = false //Тоже временный костыль, убрать

let draw = false
let enddraw = false
let f_move = false
let end_f_move = false

let is_clr_window = false
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

let cur_draw_ctx = ctx //текущий выбранный слой для рисования, по-умолчанию верхний

let graphic_tablet_mode = false //режим графического планшета

let is_pencil_window = true //отображение окна настроек кисти
let is_eraser_window = false //отображение окна настроек ластика

let cur_smoothing = 0 //параметр сглаживания
let cur_smooth_prim = [] //текущий сглаженный примитив
let k_smooth = 0 //текущий коэффициент сглаживания

ctx.lineCap = 'round'
ctx.lineJoin = 'round'
ctx_add.lineCap = 'round'
ctx_add.lineJoin = 'round'
ctx_background.lineCap = 'round'
ctx_background.lineJoin = 'round'

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
        let image = new Image();
        image.onload = function() 
        {
            ctx.clearRect(0, 0, cW, cH) // очищаем верхний холст
            ctx.drawImage(image, 0, 0, jdata[2], jdata[3], 0, 0, cW, cH)
            pstack.push(['u', image, jdata[2], jdata[3]])
        }
        original_image_buf = "data:image/jpg;base64," + jdata[1]
        image.src = original_image_buf
        chain_id = jdata[4]
        return
    }
}

//ws.onopen = function(){alert("open");} 

ws.onclose = function() // Убрать
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
    W_f = (W - cW) / 2 + cW / 86 - l_width / 2 + 5
    H_f = (H - cH) / 2 + cH / 86 - l_width / 2 + 5
    f_dW = d_frame.offsetWidth * 0.971
    f_dH = d_frame.offsetHeight * 0.971 // костыли
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
        //ratio_tooltip.style.visibility = "visible" //убрать, починить, это не работает
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

let backBtn = document.querySelector(".arrow_back")

backBtn.addEventListener("click", () => 
{
    undo_action()
})

let nextBtn = document.querySelector(".arrow_next")

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
        rgb[0], rgb[1], rgb[2] = hexDec(ccv)
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
    if (!is_clr_brash)
    {
        new_background_clr = cur_color.value
        is_clr_brash = true
    }
    else
    {
        cur_brush_clr = cur_color.value
    }
    if (is_background_used)
    {
        if (cur_background_clr != new_background_clr) //почему-то не работает, из-за этого пришлось сделать костыль строчкой сверху. Убрать
        {
            pstack.push(['b'])
            pstack.push(['i', new_background_clr]) //залить фон
            ctx_background.fillStyle = new_background_clr; //заливка фона белым, костыль, убрать
            ctx_background.fillRect(0, 0, cW, cH);
        }
        else
        {
            is_background_used = false
        }
    }
    pstack.push(['f'])
    ctx.strokeStyle = cur_brush_clr
    ctx.fillStyle = cur_brush_clr
    ctx_add.strokeStyle = cur_brush_clr
    ctx_add.fillStyle = cur_brush_clr
    ctx_background.strokeStyle = cur_brush_clr
    clr_w.style.display = "none"
}

const graphic_tabletBtn = document.querySelector(".graphic_tablet")

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

let colourBtn = document.querySelector(".clr")
let ok_clr = document.querySelector(".ok_clr_btn")
let ctype_clr_btn = document.querySelector(".ctype_clr_btn")

colourBtn.addEventListener("click", () => 
{
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
        }, { once: true })
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
    let thickness_k = t_v * t_v * 0.0001 //коэффициент, чтобы толщина не увеличивалась так резко, сейчас это четвертьокружность
    l_width = 1 + Math.max(cW, cH) * thickness_k
    W_f = (W - cW) / 2 + cW / 86 - l_width / 2 + 5
    H_f = (H - cH) / 2 + cH / 86 - l_width / 2 + 5
    ctx.lineWidth = l_width
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

const setpencilBtn = document.querySelector(".pencil")
let cur_tool = ['k', setpencilBtn, 'aero_pen.cur'] //текущий инструмент (карандаш)

setpencilBtn.addEventListener("click", () =>
{
    if (cur_tool[0] != 'k')
    {
        if (cur_tool[0] == 'e')
        {
            change_thickness()
            eraser_window.style.display = 'none'
            is_eraser_window = false
            ctx.globalCompositeOperation="source-over";
            ctx_background.globalCompositeOperation="source-over";
        }
        is_pencil_window = true
        pencil_window.style.display = 'block'
        setpencilBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['k', setpencilBtn, 'aero_pen.cur']
    }
    else
    {
        if (is_pencil_window)
        {
            change_thickness()
            pencil_window.style.display = 'none'
            is_pencil_window = false
        }
        else
        {
            pencil_window.style.display = 'block'
            is_pencil_window = true
        }
    }
})

const seteraserBtn = document.querySelector(".eraser")

seteraserBtn.addEventListener("click", () => 
{
    if (cur_tool[0] != 'e')
    {
        if (cur_tool[0] == 'k')
        {
            change_thickness()
            pencil_window.style.display = 'none'
            is_pencil_window = false
            ctx.globalCompositeOperation="destination-out";
            ctx_background.globalCompositeOperation="destination-out";
        }
        is_eraser_window = true
        eraser_window.style.display = 'block'
        seteraserBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['e', seteraserBtn, 'aero_eraser.png']
    }
    else
    {
        if (is_eraser_window)
        {
            change_thickness()
            eraser_window.style.display = 'none'
            is_eraser_window = false
        }
        else
        {
            eraser_window.style.display = 'block'
            is_eraser_window = true
        }
    }
})

const setbucketBtn = document.querySelector(".bucket")

setbucketBtn.addEventListener("click", () => 
{
    if (cur_tool[0] != 'b')
    {
        if (cur_tool[0] == 'k' || cur_tool[0] == 'e')
        {
            pencil_window.style.display = 'none'
            is_pencil_window = false
            eraser_window.style.display = 'none'
            is_eraser_window = false
            change_thickness()
            pencil_window.style.display = 'none'
        }
        setbucketBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['b', setbucketBtn, 'aero_bucket.png']
    }
})

const setpipetteBtn = document.querySelector(".pipette")

setpipetteBtn.addEventListener("click", () => 
{
    if (cur_tool[0] != 'p')
    {
        if (cur_tool[0] == 'k' || cur_tool[0] == 'e')
        {
            pencil_window.style.display = 'none'
            is_pencil_window = false
            eraser_window.style.display = 'none'
            is_eraser_window = false
            change_thickness()
            pencil_window.style.display = 'none'
        }
        setpipetteBtn.style.border = "5px solid #000000"
        cur_tool[1].style.border = "1px solid #707070"
        cur_tool = ['p', setpipetteBtn, 'aero_pipette.png']
    }
})

const clearBtn = document.querySelector(".clear")

function clear_drawfield()
{
    original_image_buf = ""
    cur_background_clr = "#fff"
    ctx_background.fillStyle = cur_background_clr
    ctx_background.fillRect(0, 0, cW, cH)
    ctx.clearRect(0, 0, cW, cH)
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
const uploadBtn = document.querySelector('.upload')

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
                ctx.clearRect(0, 0, cW, cH) //очищаем верхний слой
                ctx.drawImage(img, 0, 0, new_img_w, new_img_h);
                pstack.push(['u', img, new_img_w, new_img_h])
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

const saveBtn = document.querySelector(".save")

saveBtn.addEventListener("click", () => 
{
    let image = new Image()
    if (original_image_buf == "")
    {
        image.onload = function() 
        {
            ctx_background.drawImage(image, 0, 0)
            let a = document.createElement("a")
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

const generateBtn = document.querySelector(".generate")

generateBtn.addEventListener("click", () => 
{
    let send_data
    let data
    if (!iscaption) //убрать
    {
        if (original_image_buf == "")
        {
            data = canvas_foreground.toDataURL("imag/png")
        }
        else
        {
            data = original_image_buf
        }
        if (!ispicture)
        {
            if (is_background_used == true)
            {
                send_data = JSON.stringify({ 
                    "type": "d", //рисунок
                    "data": data,
                    "backgroung": canvas_background.toDataURL("imag/png")
                });
            }
            else
            {
                send_data = JSON.stringify({ 
                    "type": "d", //рисунок
                    "data": data,
                    "backgroung": ""
                });
            }
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

function replay_actions(cur_pstack)
{
    clear_drawfield()
    let act_type
    let cur_ctx = ctx
    let change_bash_clr = false
    let new_bash_clr
    let fW_pred = orig_f_dW
    let fH_pred = orig_f_dH
    let k_X = fW_pred / f_dW
    let k_Y = fH_pred / f_dH
    let cur_thickness = 1
    ctx.lineWidth = cur_thickness
    ctx_background.lineWidth = cur_thickness
    ctx_background.strokeStyle = "#000000"
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx_add.lineCap = 'round'
    ctx_add.lineJoin = 'round'
    ctx_background.lineCap = 'round'
    ctx_background.lineJoin = 'round'
    for (let act of cur_pstack) 
    {
        act_type = act[0]
        switch (act_type)
        {
            case 'f': //если выбран передний план
                cur_ctx = ctx
                break
            case 'b': //если выбран фон
                cur_ctx = ctx_background
                break
            case 'p': //если это примитив
                cur_ctx.strokeStyle = act[2]
                drawLines(cur_ctx, act[1])
                break
            case 'd': //если очистка экрана
                cur_background_clr = "#fff"
                ctx_background.fillStyle = cur_background_clr;
                ctx_background.fillRect(0, 0, cW, cH);
                ctx.clearRect(0, 0, canvas_foreground.width, canvas_foreground.height)
                break
            case 'r': //если изменение размеров экрана
                k_X = (k_X * act[1]) / fW_pred
                k_Y = (k_Y * act[2]) / fH_pred
                fW_pred = act[1]
                fH_pred = act[2]
                break
            case 'i': //если изменение цвета фона
                cur_background_clr = act[2]
                ctx_background.fillStyle = act[2]
                ctx_background.fillRect(0, 0, cW, cH);
                break
            case 'u': //если добавление изображения с ПК
                ctx.clearRect(0, 0, cW, cH) //очищаем верхний слой
                ctx.drawImage(act[1], 0, 0, act[2], act[3])
                break
            case 'f': //если заливка
                floodFill(cur_ctx, act[1], act[2], act[3])
                break
        }
    }
    ctx.strokeStyle = cur_brush_clr
    ctx.fillStyle = cur_brush_clr
    ctx.lineWidth = l_width
    ctx_background.lineWidth = l_width
    if (change_bash_clr)
    {
        cur_brush_clr = new_bash_clr
    }
}

function undo_action()
{
    let pstack_size = pstack.length
    if (pstack_size != 0)
    {
        let cur_act = pstack.pop()
        let is_r = false
        if (cur_act[0] == 'r')
        {
            is_r = true
        }
        let cur_act_visible
        let temp_list = ['f', 'b', 'u']
        pstack_size--
        nstack.push(cur_act)
        if (cur_act in temp_list)
        {
            cur_act_visible = false
        }
        else
        {
            cur_act_visible = true
        }
        while(pstack_size > 1)
        {
            if (temp_list.indexOf(pstack[pstack_size - 1][0]) == -1)
            {
                if (cur_act_visible)
                {
                    break
                }
                else
                {
                    cur_act_visible = true
                }
            }
            cur_act = pstack.pop()
            pstack_size--
            nstack.push(cur_act)
            if (cur_act[0] == 'r')
            {
                is_r = true
            }
        }
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
    }
}

function repeat_action()
{
    if (nstack.length != 0)
    {
        let temp_list = ['f', 'b', 'u']
        let cur_act = nstack.pop()
        let cur_acts = []
        cur_acts.push(cur_act)
        pstack.push(cur_act)
        while(nstack.length != 0 && temp_list.indexOf(cur_act[0]) != -1)
        {
            cur_act = nstack.pop()
            pstack.push(cur_act)
            cur_acts.push(cur_act)
        }
        if (cur_act[0] == 'r')
        {
            change_drawfield_size(cur_act[1], cur_act[2])
            cur_ratio_val = get_visual_ratio(cur_act[3], cW, cH)
            ratio_field.value = cur_ratio_val
        }
        replay_actions(pstack)
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
        shift_k = true
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
    if (event.code == 'Shift')
    {
        shift_k = false
    }
}, false);

canvas_additional.addEventListener("pointerdown", (e) => 
{
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
    if (r > 255 || g > 255 || b > 255)
    {
        throw "Invalid color component";
    }
    return ((r << 16) | (g << 8) | b).toString(16);
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
    const dex_clr = parseInt("FF" + fillColor.slice(6, 8) + fillColor.slice(4, 6) + fillColor.slice(2, 4), 16)
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
                        inSpan = false;
                        addSpan(start, x - 1, y, direction);
                    }
                }
            }
            if (inSpan) 
            {
                inSpan = false;
                addSpan(start, x - 1, y, direction);
            }
        }
        addSpan(x, x, y, 0);
        while (spansToCheck.length > 0) 
        {
            const {left, right, y, direction} = spansToCheck.pop();
            let l = left;
            for (;;) 
            {
                --l;
                const color = getPixel(pixelData, l, y);
                if (color !== targetColor) 
                {
                    break;
                }
            }
            ++l
            let r = right;
            for (;;) 
            {
                ++r;
                const color = getPixel(pixelData, r, y);
                if (color !== targetColor) 
                {
                    break
                }
            }
            const lineOffset = y * pixelData.width;
            pixelData.data.fill(dex_clr, lineOffset + l, lineOffset + r);
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
                let rgba = cur_draw_ctx.getImageData(cur_x + l_width / 2, cur_y - l_width / 2, 1, 1).data
                hex = "#" + ("000000" + rgbToHex(rgba[0], rgba[1], rgba[2])).slice(-6)
                if (cur_brush_clr != hex) //если цвет выбранной точки не равен текущему
                {
                    let cur_form_clr = "0x" + cur_brush_clr.slice(1) + "FF"
                    floodFill(cur_draw_ctx, Math.floor(cur_x + l_width / 2 + 2), Math.floor(cur_y - l_width / 2 + 19), cur_form_clr);
                    pstack.push(['f', Math.floor(cur_x + l_width / 2 + 2), Math.floor(cur_y - l_width / 2 + 19), cur_form_clr])
                }
                draw = false
                return
            }
            else
            {
                if (is_pencil_window)
                {
                    change_thickness()
                    pencil_window.style.display = 'none'
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

// arr - массив опорных точек. Точка - двухэлементный массив, (x = arr[0], y = arr[1])
// step - шаг при расчете кривой (0 < step < 1), по умолчанию 0.01
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
            shift_x = false
            shift_y = false
            prevX = pX
            prevY = pY
            fp = true
            if (cur_smoothing == 0)
            {
                pstack.push(['p', curprim, cur_brush_clr])
            }
            else
            {
                pstack.push(['p', cur_smooth_prim, cur_brush_clr])
            }
            nstack = []
            curprim = []
            return 
        }
        let currentX = pX * cmp_W + (pX - W_min) * 0.01 - l_width
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
            if(shift_k)
            {
                if (Math.abs(currentX - prevX) > Math.abs(currentY - prevY))
                {
                    shift_x = true
                }
                else
                {
                    shift_y = true
                }
            }
            prevX = currentX
            prevY = currentY
            return
        }
        if (shift_x)
        {
            currentY = prevY
        }
        if (shift_y)
        {
            currentX = prevX
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
    canvas_foreground.width = cW
    canvas_foreground.height = cH
    canvas_background.width = cW
    canvas_background.height = cH
    canvas_additional.height = cH
    canvas_additional.width = cW
    ctx.lineWidth = l_width
    ctx_background.lineWidth = l_width
    W_f = (W - cW) / 2 + cW / 86 - l_width / 2 + 5
    W_min = (W - f_dW) / 4
    W_max = f_dW + W_min
    H_f = (H - cH) / 2 + cH / 86 - l_width / 2 + 5
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