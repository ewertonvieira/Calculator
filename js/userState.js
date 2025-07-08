document.addEventListener('DOMContentLoaded', function () {
    // Restaurar tema salvo ou padrão
    const temaSalvo = localStorage.getItem('calc_tema') || 'claro';
    aplicarTema(temaSalvo);

    // Marcar o tema ativo no seletor ao carregar
    document.querySelectorAll('.theme-dot').forEach(dot => {
        if (dot.getAttribute('data-theme') === temaSalvo) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
        dot.addEventListener('click', function () {
            const tema = dot.getAttribute('data-theme');
            localStorage.setItem('calc_tema', tema);
            aplicarTema(tema);

            // Atualizar visual do seletor ao trocar tema
            document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Restaurar display salvo
    const display = document.getElementById('display');
    if (display) {
        const valorSalvo = localStorage.getItem('calc_display') || '';
        display.textContent = valorSalvo;

        // Salvar display sempre que mudar
        const observer = new MutationObserver(function () {
            localStorage.setItem('calc_display', display.textContent);
        });
        observer.observe(display, { childList: true, characterData: true, subtree: true });
    }

    function aplicarTema(tema) {
        // Desabilita todos os temas
        document.querySelectorAll('link[id]').forEach(link => link.disabled = true);
        // Habilita apenas o tema selecionado
        if (tema === 'claro') document.getElementById('themaclaro').disabled = false;
        if (tema === 'escuro') document.getElementById('darkthemasoft').disabled = false;
        if (tema === 'forest') document.getElementById('foresttheme').disabled = false;
        if (tema === 'sunset') document.getElementById('sunsettheme').disabled = false;
    }
});