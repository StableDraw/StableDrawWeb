const cursor = document.querySelector(".cursor");
const cursor_image = document.querySelector('.cursimg');
let cursor_type = 0

const canvas = document.getElementById("canvas") 
const d_frame = document.getElementById("d_frame")

const ctx = canvas.getContext("2d")

let nstack = []
let pstack = []
let curprim = []
let fp = true
let on_d_frame = false
let on_d_fiend = false

let prevX = null
let prevY = null

let W = window.innerWidth
let H = window.innerHeight

let cW = canvas.offsetWidth
let cH = canvas.offsetHeight
const rez = cW * cH
let l_width = 5
let W_f = (W - cW) / 2 + cW / 200
let H_f = 70 + cH / 55  + l_width / 2
let f_dW = d_frame.offsetWidth
let f_dH = d_frame.offsetHeight
let H_min = 40
let H_max = f_dH + H_min

let W_min = (W - f_dW) / 4
let W_max = f_dW + W_min

canvas.height = cH
canvas.width = cW

ctx.lineWidth = l_width

let draw = false
let enddraw = false
let f_move = false
let end_f_move = false

let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => 
{
    clr.addEventListener("click", () => 
    {
        ctx.strokeStyle = clr.dataset.clr
    })
})

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => 
{
    let inds = pstack.length
    if(inds != 0)
    {
        if((pstack[inds - 1][1]).length != 0)
        {
            pstack.push([ctx.strokeStyle, []])
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

let saveBtn = document.querySelector(".save")

saveBtn.addEventListener("click", () => 
{
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "sketch.png"
    a.click()
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
    if (event.ctrlKey) 
    {
        if (event.code == 'KeyZ') 
        {
            if (pstack.length != 0)
            {
                nstack.push(pstack.pop())
                ctx.clearRect(0, 0, canvas.width, canvas.height)
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

canvas.addEventListener("mousedown", (e) => 
{
    prevX = e.clientX - W_f
    prevY = e.clientY - H_f
    draw = true
    enddraw = false
})

d_frame.addEventListener("mousedown", (e) => 
{
    if(!draw)
    {
        prevX = e.clientX - W_f
        prevY = e.clientY - H_f
        f_move = true
        end_f_move = false
    }
})

window.addEventListener("mouseup", (e) => 
{
    enddraw = true
    end_f_move = true
})

canvas.addEventListener("mousemove", (e) => //проверка курсора на поле для рисования
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
        let fup = false
        let fdown = false
        let fright = false
        let fleft = false 
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
    //Изменение размеров области рисования
    if(f_move)
    {
        if(end_f_move)
        {
            f_move = false
            end_f_move = false
            prevX = pX
            prevY = pY
            return 
        }
        let currentX = pX
        let currentY = pY
        let X_move
        let Y_move
        if(cursor_type == 2)//если вертикальные
        {
            X_move = prevX - currentX
            Y_move = 0
        }
        else
        {
            if(cursor_type == 1)//если горизонтальные
            {
                X_move = 0
                Y_move = prevY - currentY
            }
            else //если угловые
            {
                X_move = prevX - currentX
                Y_move = prevY - currentY
                if(Math.abs(X_move) > Math.abs(Y_move))
                {
                    Y_move = 0
                }
                else
                {
                    X_move = 0
                }
            }
        }
        if(X_move == 0)
        {
            cW += X_move
            let nX = (rez / cW)
            Y_move = nX - cH
            cH = nX
        }
        else
        {
            cH += Y_move
            let nY = (rez / cH)
            Y_move = nY - cW
            cW = nY
        }
        f_dW = d_frame.offsetWidth + X_move
        f_dH = d_frame.offsetHeight + Y_move
        d_frame.style.width = f_dW + "px"
        d_frame.style.height = f_dH + "px"
        canvas.style.width = cW + "px"
        canvas.style.height = cH + "px"
        canvas.width = cW
        canvas.height = cH
        W_f = (W - cW) / 2 + cW / 200
        W_min = (W - f_dW) / 4
        W_max = f_dW + W_min
        H_f = 70 + cH / 55  + l_width / 2
        H_min = 40
        H_max = f_dH + H_min
        prevX = currentX
        prevY = currentY
        return
    }
    //Рисование
    if(draw)
    {
        if(enddraw)
        {
            draw = false
            enddraw = false
            prevX = pX
            prevY = pY
            fp = true
            pstack.push([ctx.strokeStyle, curprim])
            nstack = []
            curprim = []
            return 
        }
        let currentX = pX + (pX - W_min) * 0.005
        let currentY = pY
        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()
        if(fp)
        {
            curprim.push([prevX, prevY])
        }
        curprim.push([currentX, currentY])
        prevX = currentX
        prevY = currentY
        fp = false
    }
})

window.addEventListener("mousemove", (e) => //проверка курсора на всём окне
{
    let cX = e.clientX
    let cY = e.clientY
    if(!on_d_frame && !draw && !f_move)
    {
        if(cursor_type != 0)
        {
            cursor_type = 0
            cursor_image.setAttribute('src', 'aero_arrow.cur');
        }
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
    on_d_frame = false
})