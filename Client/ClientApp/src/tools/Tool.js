export default class Tool {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

    set fillColor(color) {
        this.ctx.fillStyle = color
    }
    set strokeColor(color) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width
    }
    
    set bezieCurve(strong) {
        this.ctx.bezieCurve = strong
    }

    // Переделать
   /* getBezierBasis(i, n, t) {
        // Факториал
        function f(n) {
            return (n <= 1) ? 1 : n * f(n - 1);
        }
        // считаем i-й элемент полинома Берштейна
        return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
    }
    // arr - массив опорных точек. Точка - двухэлементный массив, (x = arr[0], y = arr[1]), step - шаг при расчете кривой (0 < step < 1), по умолчанию 0.01
    getBezierCurve(arr, step) {
        step = 1.0 / step;
        let res = new Array();
        for (let t = 0; t < 1 + step; t += step) {
            t = Math.min(1, t);
            let ind = res.length;
            res[ind] = [0, 0, 0];
            for (let i = 0; i < arr.length; i++) {
                let b = this.getBezierBasis(i, arr.length - 1, t);
                res[ind][0] += arr[i][0] * b;
                res[ind][1] += arr[i][1] * b;
                res[ind][2] += arr[i][2] * b;
            }
        }
        return res;
    }
    // cur_smoothing - значения strong
    bezierDraw() {
        cur_smooth_prim = cur_smooth_prim.slice(0, -k_smooth + 1).concat(this.getBezierCurve(curprim.slice(-this.ctx.bezieCurve), this.ctx.bezieCurve));
        ctx_add.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.draw(ctx_add, cur_smooth_prim);
    }*/
    // Переделать конец

    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}
