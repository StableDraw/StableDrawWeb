const cursor = document.querySelector(".cursor");
const cursor_image = document.querySelector('.cursimg');

let cursor_type = 0

let drawfield = document.querySelector('canvas').getBoundingClientRect();
const canvas = document.getElementById("canvas")

const ctx = canvas.getContext("2d")

let nstack = []
let pstack = []
let curprim = []
let fp = true

let prevX = null
let prevY = null
let W = window.innerWidth
let H = window.innerHeight
canvas.height = H
canvas.width = W

let l_width = 5
let W_min = drawfield.x / drawfield.left
let H_min = drawfield.y / drawfield.top
let W_max = W - W_min
let H_max = H - H_min
let dcW = W / 2
let dcH = 420
ctx.lineWidth = l_width

let draw = false
let enddraw = false

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
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "sketch.png"
    a.click()
})

document.addEventListener('keydown', (event) => {
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

window.addEventListener("mousedown", (e) => 
{
    let cX = e.clientX
    let cY = e.clientY
    let X = cX + (cX - dcW) * 0.425
    let Y = cY + (cY - dcH) * 0.68
    if(W_min < X && X < W_max && H_min < Y && Y < H_max)
    {
        prevX = X
        prevY = Y
        draw = true
        enddraw = false
    }
})

window.addEventListener("mouseup", (e) => 
{
    enddraw = true
})

window.addEventListener("mousemove", (e) => 
{
    let cX = e.clientX
    let cY = e.clientY
    let kX = (cX - dcW) * 0.425
    let kY = (cY - dcH) * 0.68
    let fX = cX + kX
    let fY = cY + kY
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
    if(!draw)
    {
        if(W_min < fX && fX < W_max && H_min < fY && fY < H_max)
        {
            if(!cursor_type != 3)
            {
                cursor_type = 3
                cursor_image.setAttribute('src', 'aero_pen.cur')
            }
        }
        else
        {
            let fup = false
            let fdown = false
            let fright = false
            let fleft = false
            if(H_min - 30 < fY && H_min >= fY) //если верхняя часть горизонтальной части рамки 
            {
                fup = true
                if(!cursor_type != 1)
                {
                    cursor_type = 1
                    cursor_image.setAttribute('src', 'aero_ns.cur')
                }
            }
            else
            {
                if(fY < H_max + 30 && fY >= H_max) //если нижняя часть горизонтальной рамки
                {
                    fdown = true
                }
            }
            if(W_min - 30 < fX && W_min >= fX) //если левая часть вертикальной рамки
            {
                fleft = true
            }
            else
            {
                if(fX < W_max + 30 && fX >= W_max) //если правая часть вертикальной рамки
                {
                    fright = true
                }
            }
            if(!fleft && !fup && !fright && !fdown)
            {
                if(cursor_type != 0)
                {
                    cursor_type = 0
                    cursor_image.setAttribute('src', 'aero_arrow.cur');
                }
            }
            else
            {
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
        }
        return
    }
    let X = Math.min(W_max, Math.max(W_min, fX))
    let Y = Math.min(H_max, Math.max(H_min, fY))
    if(enddraw)
    {
        draw = false
        enddraw = false
        prevX = X
        prevY = Y
        fp = true
        pstack.push([ctx.strokeStyle, curprim])
        nstack = []
        curprim = []
        return 
    }
    let currentX = X
    let currentY = Y
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
})