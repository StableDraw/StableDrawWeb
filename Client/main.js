const cursor = document.querySelector(".cursor");
const cursor_image = document.querySelector('.cursimg');
let cursor_type = -1

const canvas_foreground = document.getElementById("canvas_foreground") 
const canvas_background = document.getElementById("canvas_background") 
const d_frame = document.getElementById("d_frame")
const spanel = document.getElementById("mySidepanel")

const clr_w = document.getElementById("clr_window") 
const ok_clr_btn = document.getElementById("ok_clr_btn") 
const cur_color = document.getElementById("color") 
const clrimg = document.querySelector('.clrimg');
const ctx = canvas_foreground.getContext("2d")
const ctx_background = canvas_background.getContext("2d")

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
let l_width = 5
let W_f = (W - cW) / 2 + cW / 86
let H_f = cH / 55 + H / 10.7 + l_width / 2
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
let H_min = 40
let H_max = f_dH + H_min

let W_min = (W - f_dW) / 4
let W_max = f_dW + W_min

canvas_foreground.height = cH
canvas_foreground.width = cW
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
let cur_background_clr = "#ffffff"
let new_background_clr = cur_background_clr
let cur_bash_clr = "#000000"
//заливка фона белым, костыль, убрать
ctx_background.fillStyle = cur_background_clr; 
ctx_background.fillRect(0, 0, cW, cH);
let is_clr_brash = true

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
    }
} 
//ws.onopen = function(){alert("open");} 


ws.onclose = function() {alert("Соединение разорвано со стороны сервера");} // Убрать


//ws.onerror = function(){alert("error");}

/* Установить ширину боковой панели на 250 пикселей (показать) */
function openNav() 
{
    spanel.style.width = "250px";
    spanel.style.border = "2px solid #4c4c4c";
    spanel.style.borderLeftStyle = "hidden"
    spanel.style.borderTopStyle = "hidden"
    //spanel.style.borderRightStyle = "solid";
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
            ctx_background.beginPath()
            ctx_background.fillStyle = new_background_clr; //заливка фона белым, костыль, убрать
            ctx_background.fillRect(0, 0, cW, cH);
        }
        else
        {
            is_background_used = false
        }
    }
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

clearBtn.addEventListener("click", () => 
{
    if(iscaption)//убрать
    {
        iscaption = false
    }
    let inds = pstack.length
    if(inds != 0)
    {
        if((pstack[inds - 1][1]).length != 0)
        {
            pstack.push([ctx.strokeStyle, []])
        }
    }
    ctx.clearRect(0, 0, canvas_foreground.width, canvas_foreground.height)
})

let mhf = document.getElementById('my_hidden_file')
let uploadBtn = document.querySelector('.upload')

uploadBtn.addEventListener("click", () => 
{
    mhf.click(); 
    mhf.addEventListener("change", function readImage()
    {
        if (!this.files || !this.files[0]) return;
        const FR = new FileReader();
        FR.addEventListener("load", (evt) => 
        {
            const img = new Image();
            img.addEventListener("load", () => 
            {
                ctx.clearRect(0, 0, ctx.canvas_foreground.width, ctx.canvas_foreground.height);
                ctx.drawImage(img, 0, 0);
            });
            img.src = evt.target.result;
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
    let data = canvas_foreground.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "sketch.png"
    a.click()
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

    //a.download = "sketch.png"
    //a.click()
})

document.addEventListener('mouseenter', (e) => 
{
    let cX = e.clientX
    let cY = e.clientY
    cursor.style.left = (cX + 7.5) + "px";
    cursor.style.top = (cY + 7.5) + "px";
}, { once: true });

document.addEventListener('keydown', (event) => 
{
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
            if (pstack.length != 0)
            {
                nstack.push(pstack.pop())
                ctx.clearRect(0, 0, canvas_foreground.width, canvas_foreground.height)
                let bufcolour = ctx.strokeStyle
                for (let prim_opt of pstack) 
                {
                    let prim = prim_opt[1]
                    ctx.strokeStyle = prim_opt[0]
                    ctx.beginPath()
                    for (let points of prim) 
                    {
                        ctx.lineTo(points[0], points[1])
                        ctx.moveTo(points[0], points[1])
                    }
                    ctx.stroke()
                }
                ctx.strokeStyle = bufcolour
            }
            return
        }
        if (event.code == 'KeyX') 
        {
            if (nstack.length != 0)
            {
                let prim_opt = nstack.pop()
                let prim = prim_opt[1]
                let bufcolour = ctx.strokeStyle
                pstack.push(prim_opt)
                ctx.strokeStyle = prim_opt[0]
                ctx.beginPath()
                let fpoint = prim[0]
                ctx.moveTo(fpoint[0], fpoint[1])
                let points
                for (points of prim) 
                {
                    ctx.lineTo(points[0], points[1])
                    ctx.moveTo(points[0], points[1])
                }
                ctx.stroke()
                ctx.strokeStyle = bufcolour
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
            pstack.push([ctx.strokeStyle, curprim])
            nstack = []
            curprim = []
            return 
        }
        let currentX = pX * cmp_W + (pX - W_min) * 0.01 - l_width - cmp_W_b
        let currentY = pY * cmp_H - l_width / 2 - cmp_H_b
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
        let prev_f_dW = f_dW
        let prev_f_dH = f_dH
        f_dW = Math.min(fW_max, Math.max(fW_min, f_dW + X_move))
        cmp_W = orig_f_dW / f_dW
        cmp_W_b = Math.pow((orig_f_dW - f_dW), 4) * 0.00000000417// костыль
        f_dH = Math.min(fH_max, Math.max(fH_min, f_dH + Y_move))
        cmp_H = orig_f_dH / f_dH
        cmp_H_b = Math.pow((orig_f_dH - f_dH), 4) * 0.00000002// Это фигня полная, надо убрать
        X_move = f_dW - prev_f_dW
        Y_move = f_dH - prev_f_dH
        d_frame.style.width = f_dW + "px"
        d_frame.style.height = f_dH + "px"
        W_f = (W - cW) / 2 + cW / 100
        W_min = (W - f_dW) / 4
        W_max = f_dW + W_min
        H_f = cH / 55 + H / 10.7 + l_width / 2
        H_min = 40
        H_max = f_dH + H_min
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