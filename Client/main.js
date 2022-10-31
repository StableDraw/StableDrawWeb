const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

let nstack = []
let pstack = []
let curprim = []
let fp = true

let prevX = null
let prevY = null
let W = window.innerWidth
let H = window.innerHeight

let l_width = 5

let W_shift = W * 0.15 - l_width / 2
let H_shift = 70 + l_width / 2
let W_max = W * 0.6935 - l_width
let H_max = 502 - l_width
let W_min = l_width / 2
let H_min = l_width / 2

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

window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => enddraw = true)

window.addEventListener("mousemove", (e) => 
{
    let X = Math.min(W_max, Math.max(W_min, e.clientX - W_shift))
    let Y = Math.min(H_max, Math.max(H_min, e.clientY - H_shift))
    if(prevX == null || prevY == null || !draw)
    {
        prevX = X
        prevY = Y
        return
    }
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