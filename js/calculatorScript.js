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
                    // Substitui as funções científicas por chamadas JS válidas
                    let expressao = valorAtual
                        .replace(/√\(/g, 'Math.sqrt(')
                        .replace(/sin\(/g, 'Math.sin(Math.PI/180*')
                        .replace(/cos\(/g, 'Math.cos(Math.PI/180*')
                        .replace(/tan\(/g, 'Math.tan(Math.PI/180*')
                        .replace(/log\(/g, 'Math.log10(');

                    // Fecha parênteses abertos para funções trigonométricas
                    let openFuncs = (expressao.match(/Math\.(sin|cos|tan)\(Math\.PI\/180\*/g) || []).length;
                    let openSqrt = (expressao.match(/Math\.sqrt\(/g) || []).length;
                    let openLog = (expressao.match(/Math\.log10\(/g) || []).length;
                    let totalOpen = openFuncs + openSqrt + openLog;
                    let totalClose = (expressao.match(/\)/g) || []).length;
                    let toClose = totalOpen - totalClose;
                    if (toClose > 0) expressao += ')'.repeat(toClose);

                    let resultado = eval(expressao);
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
            } else if (valor === 'sin' || valor === 'cos' || valor === 'tan' || valor === 'log') {
                valorAtual += valor + '(';
            } else if (valor === '√') {
                valorAtual += '√(';
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