import React from 'react';

const GetBezierBasis = () => {
    function f(n) {
        return (n <= 1) ? 1 : n * f(n - 1);
    }
    // считаем i-й элемент полинома Берштейна
    return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
    return (
        <div>

        </div>
    );
};

export default GetBezierBasis;