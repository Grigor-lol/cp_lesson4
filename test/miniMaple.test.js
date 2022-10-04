import {MiniMaple} from "../src/miniMaple";

test('Дифференцирование функций первой степени', () => {
    const testMaple = new MiniMaple();

    let testFunc = 'x';
    expect(testMaple.diff(testFunc, 'x')).toBe('1');
    testFunc = '2*x';
    expect(testMaple.diff(testFunc, 'x')).toBe('2');
    testFunc = 'x^2';
    expect(testMaple.diff(testFunc, 'x')).toBe('2*x');
    testFunc = '4*x^2';
    expect(testMaple.diff(testFunc, 'x')).toBe('8*x');
    testFunc = '-3*x^3';
    expect(testMaple.diff(testFunc, 'x')).toBe('-9*x^2');
    testFunc = 'x^4';
    expect(testMaple.diff(testFunc, 'x')).toBe('4*x^3');
});

test('Дифферинцирование констант', () => {
    const testMaple = new MiniMaple();

    let testFunc = '5';
    expect(testMaple.diff(testFunc, 'x')).toBe('0');
    testFunc = '-2';
    expect(testMaple.diff(testFunc, 'x')).toBe('0');
});

test('Дифференцирование по другой переменной', () => {
    const testMaple = new MiniMaple();

    let testFunc = '6*x';
    expect(testMaple.diff(testFunc, 'y')).toBe('0');
    testFunc = '5*x^2';
    expect(testMaple.diff(testFunc, 'y')).toBe('0');
});

test('Дифференцирование функции с несколькими слагаемыми', () => {
    const testMaple = new MiniMaple();

    let testFunc = '7*x^2-8*x';
    expect(testMaple.diff(testFunc, 'x')).toBe('14*x-8');
    testFunc = '-3*x^3+8*x-2';
    expect(testMaple.diff(testFunc, 'x')).toBe('-9*x^2+8');
});

test('Дифференцирование по другой переменной с несолькими слагаемыми', () => {
    const testMaple = new MiniMaple();

    let testFunc = '8*x^3+6*y^3';
    expect(testMaple.diff(testFunc, 'y')).toBe('18*y^2');
});

test('Дифференцирование невозможно', () => {
    const testMaple = new MiniMaple();
    let testFunc = 'x++2';
    expect(testMaple.diff(testFunc, 'x')).toBe('Error');
    testFunc = '20/x^3+11';
    expect(testMaple.diff(testFunc, 'x')).toBe('Error');
});

