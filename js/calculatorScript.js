document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let valorAtual = '';

    document.querySelectorAll('.rounded-circle').forEach(btn => {
        btn.addEventListener('click', () => {
            const valor = btn.textContent;

            if (valor === 'C') {
                valorAtual = '';
            } else if (valor === 'Backspace') {
                valorAtual = valorAtual.slice(0, -1);
            } else if (valor === '=') {
                try {
                    let resultado = eval(valorAtual);
                    if (typeof resultado === 'number' && !Number.isInteger(resultado)) {
                        resultado = resultado.toFixed(8).replace(/\.?0+$/, '');
                    }
                    valorAtual = resultado.toString();
                } catch {
                    valorAtual = 'Erro';
                }
            } else if (valor === '%') {
                try {
                    let match = valorAtual.match(/(\d+\.?\d*)$/);
                    if (match) {
                        let num = parseFloat(match[1]);
                        valorAtual = valorAtual.replace(/(\d+\.?\d*)$/, (num / 100).toString());
                    }
                } catch {
                    valorAtual = 'Erro';
                }
            } else if (valor === 'sin' || valor === 'cos' || valor === 'tan') {
                try {
                    let match = valorAtual.match(/(\d+\.?\d*)$/);
                    if (match) {
                        let num = parseFloat(match[1]);
                        let rad = num * Math.PI / 180; 
                        let result = 0;
                        if (valor === 'sin') result = Math.sin(rad);
                        if (valor === 'cos') result = Math.cos(rad);
                        if (valor === 'tan') result = Math.tan(rad);
                        valorAtual = valorAtual.replace(/(\d+\.?\d*)$/, result.toFixed(8).replace(/\.?0+$/, ''));
                    }
                } catch {
                    valorAtual = 'Erro';
                }
            } else if (valor === '√') {
                try {
                    let match = valorAtual.match(/(\d+\.?\d*)$/);
                    if (match) {
                        let num = parseFloat(match[1]);
                        if (num < 0) throw 'Erro';
                        let result = Math.sqrt(num);
                        valorAtual = valorAtual.replace(/(\d+\.?\d*)$/, result.toFixed(8).replace(/\.?0+$/, ''));
                    }
                } catch {
                    valorAtual = 'Erro';
                }
            } else if (valor === 'log') {
                try {
                    let match = valorAtual.match(/(\d+\.?\d*)$/);
                    if (match) {
                        let num = parseFloat(match[1]);
                        if (num <= 0) throw 'Erro';
                        let result = Math.log10(num);
                        valorAtual = valorAtual.replace(/(\d+\.?\d*)$/, result.toFixed(8).replace(/\.?0+$/, ''));
                    }
                } catch {
                    valorAtual = 'Erro';
                }
            } else if (valor === '(' || valor === ')') {
                valorAtual += valor;
            } else {
                valorAtual += valor;
            }
            display.textContent = valorAtual;
            ajustarDisplay();
        });
    });

    document.querySelector('.backspace-btn').addEventListener('click', () => {
        valorAtual = valorAtual.slice(0, -1);
        display.textContent = valorAtual;
        ajustarDisplay();
    });

    function ajustarDisplay() {
        const display = document.getElementById('display');
        if (display.textContent.length > 12) {
            display.classList.add('shrink');
        } else {
            display.classList.remove('shrink');
        }
    }

    const themaclaro = document.getElementById('themaclaro');
    const darkthemasoft = document.getElementById('darkthemasoft');
    const themeDots = document.querySelectorAll('.theme-dot');
    const themeIndicator = document.querySelector('.theme-indicator');

    function setTheme(theme) {
        themaclaro.disabled = true;
        darkthemasoft.disabled = true;
        if (theme === 'claro') themaclaro.disabled = false;
        if (theme === 'escuro') darkthemasoft.disabled = false;
        if (theme === 'forest') document.getElementById('foresttheme').disabled = false;
        if (theme === 'sunset') document.getElementById('sunsettheme').disabled = false;
    }

    setTheme('claro');
    themeDots[0].classList.add('active');

    themeDots.forEach((dot, idx) => {
        dot.addEventListener('click', function () {
            themeDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            setTheme(this.dataset.theme);
        });
    });
});