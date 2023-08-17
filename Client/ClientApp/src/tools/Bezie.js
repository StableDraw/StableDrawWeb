import Tool from "./Tool";

export default class Bezie extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        // this.canvas.bezieCurve = this.bezie.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
    }



    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }

    draw(x, y) {

        // i - номер вершины, n - количество вершин, t - положение кривой (от 0 до 1)
        function getBezierBasis(i, n, t = 1) {
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
            let res = [];
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
        let cur = [x, y]
        let cur_smooth_prim = []
        cur_smooth_prim = cur_smooth_prim.slice(0, 1).concat(getBezierCurve(cur.slice(0), 1));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.beginPath();
        for (let i = 0; i < cur_smooth_prim.length - 1; i++) {
            this.ctx.lineWidth = cur_smooth_prim[i][2];
            this.ctx.moveTo(cur_smooth_prim[i][0], cur_smooth_prim[i][1]);
            this.ctx.lineTo(cur_smooth_prim[i + 1][0], cur_smooth_prim[i + 1][1]);
            console.log(1)
            this.ctx.stroke();
        }

    }
}