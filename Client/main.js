const cursor = document.querySelector(".cursor");
const cursor_image = document.querySelector('.cursimg');
let cursor_type = -1

let canvas_foreground = document.getElementById("canvas_foreground") 
let canvas_background = document.getElementById("canvas_background") 
const d_frame = document.getElementById("d_frame")
const spanel = document.getElementById("mySidepanel")

const clr_w = document.getElementById("clr_window") 
const ok_clr_btn = document.getElementById("ok_clr_btn") 
const cur_color = document.getElementById("color") 
const clrimg = document.querySelector('.clrimg');
let ctx = canvas_foreground.getContext("2d")
let ctx_background = canvas_background.getContext("2d")

const ratio_field = document.querySelector('.f_ratio');
const ratio_tooltip = document.querySelector('ratio_tooltip')

const EL = (sel) => document.querySelector(sel);

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

let l_width = 5

let W_f = (W - cW) / 2 + cW / 86
let H_f = (H - cH) / 2 + cH / 86 + l_width / 2
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
ctx.lineWidth = l_width
ctx_background.lineWidth = l_width

let iscaption = false //Временый костыль, убрать

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
let cur_bash_clr = "#000000"

ctx_background.fillStyle = cur_background_clr; //заливка фона белым, костыль, убрать
ctx_background.fillRect(0, 0, cW, cH);
let is_clr_brash = true

let cur_ratio_val = get_visual_ratio(false, cW, cH)
ratio_field.value = cur_ratio_val //устанавливаем соотношение сторон при запуске

let is_first_upload_btn_click = true //костыль, чтобы кнопка не срабатывала дважды

let server_image_buf = "" //переменная для хранения исходного изображения с сервера

ws = new WebSocket('wss://stabledraw.com:8081'); 
let chain_id
let task_id

ws.onmessage = function(event)
{
    var jdata = JSON.parse(event.data)
    var type = jdata[0];
    if (type == "t")
    {
        alert(jdata[1]);
        return
    }
    if (type == "c") //если подпись
    {
        task_id = jdata[1]
        alert(jdata[2]); //костыль, потом заменить
        chain_id = jdata[3]
        return
    }
    if (type == "i")
    {
        let image = new Image();
        image.onload = function() 
        {
            ctx.drawImage(image, 0, 0, jdata[2], jdata[3], 0, 0, cW, cH)
        }
        image.src = "data:image/jpg;base64," + jdata[1];
        server_image_buf = image.src
    }
} 
//ws.onopen = function(){alert("open");} 

ws.onclose = function() {alert("Соединение разорвано");} // Убрать

//ws.onerror = function(){alert("error");}

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

/* Установить ширину боковой панели на 250 пикселей (показать) */
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

function hexDec(h)
{
    let m=h.slice(1).match(/.{2}/g)
    m[0]=parseInt(m[0], 16)
    m[1]=parseInt(m[1], 16)
    m[2]=parseInt(m[2], 16)
    return m[0] + m[1] + m[2]
};

function handleclr_MouseMove() 
{
    on_clr_window = true
    let ccv = cur_color.value
    if (hexDec(ccv) > 255)
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
    if (is_clr_brash)
    {
        is_background_used = true
        cur_bash_clr = cur_color.value
        ctype_clr_btn.textContent = "Цвет кисти"
        cur_color.value = cur_background_clr
        if (hexDec(cur_bash_clr) > 255)
        {
            ctype_clr_btn.style.color = '#000000'
            clrimg.setAttribute('src', 'palette_w.png');
        }
        else
        {
            ctype_clr_btn.style.color = '#fff'
            clrimg.setAttribute('src', 'palette.png');
        }
        ctype_clr_btn.style.background = cur_bash_clr
        is_clr_brash = false
    }
    else
    {
        ctype_clr_btn.textContent = "Цвет фона"
        let ccv = cur_bash_clr
        new_background_clr = cur_color.value
        cur_color.value = ccv
        if (hexDec(new_background_clr) > 255)
        {
            ctype_clr_btn.style.color = '#000000'
            clrimg.setAttribute('src', 'palette_w.png');
        }
        else
        {
            ctype_clr_btn.style.color = '#fff'
        }
        ctype_clr_btn.style.background = new_background_clr
        if (hexDec(ccv) > 255)
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
    clr_w.removeEventListener("mousemove", handleclr_MouseMove)
    ctype_clr_btn.removeEventListener("click", handlet_clr_Click)
    is_clr_window = false
    if (!is_clr_brash)
    {
        new_background_clr = cur_color.value
        is_clr_brash = true
    }
    else
    {
        cur_bash_clr = cur_color.value
    }
    if (is_background_used)
    {
        if (cur_background_clr != new_background_clr) //почему-то не работает, из-за этого пришлось сделать костыль строчкой сверху. Убрать
        {
            pstack.push(['b'])
            pstack.push(['c', new_background_clr])
            pstack.push(['i']) //залить фон
            ctx_background.fillStyle = new_background_clr; //заливка фона белым, костыль, убрать
            ctx_background.fillRect(0, 0, cW, cH);
        }
        else
        {
            is_background_used = false
        }
    }
    pstack.push(['f'])
    pstack.push(['c', cur_bash_clr])
    ctx.strokeStyle = cur_bash_clr
    ctx_background.strokeStyle = cur_bash_clr
    clr_w.style.display = "none"
}

let colourBtn = document.querySelector(".clr")
let ok_clr = document.querySelector(".ok_clr_btn")
let ctype_clr_btn = document.querySelector(".ctype_clr_btn")

colourBtn.addEventListener("click", () => 
{
    cur_color.value = cur_bash_clr
    if (is_clr_window == false)
    {
        clr_w.style.display = "block"
        is_clr_window = true
        clr_w.addEventListener("mousemove", handleclr_MouseMove)
        ctype_clr_btn.addEventListener("click", handlet_clr_Click)
        ok_clr.addEventListener("click", () => 
        {
            cursor_type = 3
            cursor_image.setAttribute('src', 'aero_pen.cur')
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

let clearBtn = document.querySelector(".clear")

function clear_drawfield()
{
    server_image_buf = ""
    cur_background_clr = "#fff"
    ctx_background.fillStyle = cur_background_clr
    ctx_background.fillRect(0, 0, cW, cH)
    ctx.clearRect(0, 0, cW, cH)
}

clearBtn.addEventListener("click", () => 
{
    if(iscaption)//убрать
    {
        iscaption = false
    }
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

let mhf = document.getElementById('my_hidden_file')
let uploadBtn = document.querySelector('.upload')

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
                change_drawfield_size(new_dfw, new_dfh)
                cur_ratio_val = get_visual_ratio(false, cW, cH)
                ratio_field.value = cur_ratio_val //устанавливаем соотношение сторон
                if (ps_size != 0 && pstack[ps_size - 1][0] == 'r')
                {
                    pstack.pop()
                }
                pstack.push(['r', new_dfw, new_dfh, false])
                ctx.drawImage(img, 0, 0, new_img_w, new_img_h);
                pstack.push(['u', img, new_img_w, new_img_h])
            }, 
            { 
                once: true 
            });
            img.src = evt.target.result;
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

let saveBtn = document.querySelector(".save")

saveBtn.addEventListener("click", () => 
{
    let image = new Image()
    if (server_image_buf == "")
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
        a.href = server_image_buf
        a.download = "sketch.png"
        a.click()
    }
})

let generateBtn = document.querySelector(".generate")

generateBtn.addEventListener("click", () => 
{
    let send_data
    if (!iscaption) //убрать
    {
        if (is_background_used == true)
        {
            send_data = JSON.stringify({ 
                "type": "d", //рисунок
                "data": canvas_foreground.toDataURL("imag/png"),
                "backgroung": canvas_background.toDataURL("imag/png")
            });
        }
        else
        {
            send_data = JSON.stringify({ 
                "type": "d", //рисунок
                "data": canvas_foreground.toDataURL("imag/png"),
                "backgroung": ""
            });
        }
        iscaption = true
    }
    else
    {
        iscaption = false //убрать
        send_data = JSON.stringify({ 
            "type": "g", //просьба сгенерировать с текущей подписью)
            "chain_id": chain_id, //id последнего звена цепочки
            "task_id": task_id, //id задания
        });
    }
    ws.send(send_data)
})

document.addEventListener('mouseenter', (e) => 
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
    ctx_background.strokeStyle = "#000000"
    ctx.strokeStyle = "#000000"
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
                let prim = act[1]
                cur_ctx.beginPath()
                for (let points of prim) 
                {
                    cur_ctx.lineTo(points[0] / k_X, points[1] / k_Y)
                    cur_ctx.moveTo(points[0] / k_X, points[1] / k_Y)
                }
                cur_ctx.stroke()
                break
            case 'c': //если цвет
                cur_ctx.strokeStyle = act[1]
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
                cur_background_clr = ctx_background.strokeStyle
                ctx_background.fillStyle = cur_background_clr
                ctx_background.fillRect(0, 0, cW, cH);
                break
            case 'u': //если добавление изображения с ПК
                ctx.drawImage(act[1], 0, 0, act[2], act[3]);
                break
        }
    }
    ctx.strokeStyle = cur_bash_clr
    if (change_bash_clr)
    {
        cur_bash_clr = new_bash_clr
    }
}

document.addEventListener('keydown', (event) => 
{
    if (event.code == 'Delete')
    {
        clear_drawfield()
    }
    if (event.shiftKey)
    {
        shift_k = true
    }
    else
    {
        shift_k = false
    }
    if (event.ctrlKey) 
    {
        if (event.code == 'KeyZ') 
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
                let temp_list = ['f', 'b', 'c', 'u']
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
                    if (!(pstack[pstack_size - 1][0] in temp_list))
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
            return
        }
        if (event.code == 'KeyX') 
        {
            if (nstack.length != 0)
            {
                let temp_list = ['f', 'b', 'c', 'u']
                let cur_act = nstack.pop()
                let cur_acts = []
                cur_acts.push(cur_act)
                pstack.push(cur_act)
                while(nstack.length != 0 && cur_act[0] in temp_list)
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
    }
  }, false);

canvas_foreground.addEventListener("mousedown", (e) => 
{
    prevX = e.clientX - W_f
    prevY = e.clientY - H_f
    draw = true
    enddraw = false
    if (is_clr_window == true)
    {
        close_clr_window()
    }
})

d_frame.addEventListener("mousedown", (e) => 
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
})

window.addEventListener("mouseup", (e) => 
{
    enddraw = true
    end_f_move = true
})

canvas_foreground.addEventListener("mousemove", (e) => //проверка курсора на поле для рисования
{
    on_d_fiend = true
    if(!cursor_type != 3 && !f_move)
    {
        cursor_type = 3
        cursor_image.setAttribute('src', 'aero_pen.cur')
    }
})

d_frame.addEventListener("mousemove", (e) => //проверка курсора на поле вместе с рамкой
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
    //Рисование
    if(draw)
    {
        if(enddraw)
        {
            draw = false
            enddraw = false
            shift_x = false
            shift_y = false
            prevX = pX
            prevY = pY
            fp = true
            pstack.push(['p', curprim])
            nstack = []
            curprim = []
            return 
        }
        let currentX = pX * cmp_W + (pX - W_min) * 0.01 - l_width
        let currentY = pY * cmp_H - l_width / 2
        if(fp)
        {
            curprim.push([prevX, prevY])
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
        }
        if (shift_x)
        {
            currentY = prevY
        }
        if (shift_y)
        {
            currentX = prevX
        }
        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()
        curprim.push([currentX, currentY])
        prevX = currentX
        prevY = currentY
        fp = false
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
    ctx.lineWidth = l_width
    ctx_background.lineWidth = l_width
    W_f = (W - cW) / 2 + cW / 86
    W_min = (W - f_dW) / 4
    W_max = f_dW + W_min
    H_f = (H - cH) / 2 + cH / 86 + l_width / 2
    H_min = (H - f_dH) / 4
    H_max = f_dH + H_min
    X_move = f_dW - prev_f_dW
    Y_move = f_dH - prev_f_dH
}

window.addEventListener("mousemove", (e) => //проверка курсора на всём окне
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