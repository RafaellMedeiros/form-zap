// Configuração - ALTERE AQUI SEU NÚMERO DE WHATSAPP
const MEU_WHATSAPP = '5583996409796'; // Substitua pelo seu número no formato: código do país + DDD + número

// Elementos do DOM
const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('.submit-btn');

// Função para formatar o número de telefone
function formatarTelefone(numero) {
    // Remove todos os caracteres não numéricos
    const apenasNumeros = numero.replace(/\D/g, '');
    
    // Adiciona formatação brasileira
    if (apenasNumeros.length === 11) {
        return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (apenasNumeros.length === 10) {
        return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return numero;
}

// Função para formatar a mensagem do WhatsApp
function criarMensagemWhatsApp(dados) {
    let mensagem = `🎓 *NOVA INSCRIÇÃO - FORMAÇÃO CONTINUADA* 🎓\n\n`;
    
    mensagem += `👤 *Nome:* ${dados.nome}\n`;
    mensagem += `📞 *Contato:* ${formatarTelefone(dados.contato)}\n`;
    mensagem += `🏫 *Escola:* ${dados.escola}\n`;
    mensagem += `⏰ *Data/Hora:* ${new Date().toLocaleString('pt-BR')}\n`;
    mensagem += `\n_Inscrição enviada via formulário de Formação Continuada_`;
    
    return mensagem;
}

// Função para mostrar feedback visual
function mostrarFeedback(tipo, mensagem) {
    // Remove feedbacks anteriores
    const feedbackAnterior = document.querySelector('.feedback-message');
    if (feedbackAnterior) {
        feedbackAnterior.remove();
    }
    
    // Cria novo feedback
    const feedback = document.createElement('div');
    feedback.className = `feedback-message ${tipo}`;
    feedback.textContent = mensagem;
    
    // Insere antes do formulário
    form.parentNode.insertBefore(feedback, form);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 5000);
}

// Função para validar o formulário
function validarFormulario(dados) {
    const erros = [];
    
    if (!dados.nome.trim()) {
        erros.push('Nome é obrigatório');
    }
    
    if (!dados.contato.trim()) {
        erros.push('Contato é obrigatório');
    }
    
    if (!dados.escola.trim()) {
        erros.push('Escola é obrigatória');
    }
    
    return erros;
}

// Função para animar o botão de envio
function animarBotaoEnvio(carregando = false) {
    if (carregando) {
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar Inscrição';
        submitBtn.disabled = false;
    }
}

// Event listener para o formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Anima o botão
    animarBotaoEnvio(true);
    
    // Coleta os dados do formulário
    const formData = new FormData(form);
    const dados = {
        nome: formData.get('nome'),
        contato: formData.get('contato'),
        escola: formData.get('escola')
    };
    
    // Valida os dados
    const erros = validarFormulario(dados);
    
    if (erros.length > 0) {
        animarBotaoEnvio(false);
        mostrarFeedback('error', `Erro: ${erros.join(', ')}`);
        return;
    }
    
    // Simula um pequeno delay para melhor UX
    setTimeout(() => {
        try {
            // Cria a mensagem formatada
            const mensagem = criarMensagemWhatsApp(dados);
            
            // Codifica a mensagem para URL
            const mensagemCodificada = encodeURIComponent(mensagem);
            
            // Cria a URL do WhatsApp
            const urlWhatsApp = `https://wa.me/${MEU_WHATSAPP}?text=${mensagemCodificada}`;
            
            // Abre o WhatsApp
            window.open(urlWhatsApp, '_blank');
            
            // Mostra feedback de sucesso
            mostrarFeedback('success', 'Redirecionando para o WhatsApp...');
            
            // Limpa o formulário após 2 segundos
            setTimeout(() => {
                form.reset();
                mostrarFeedback('success', 'Inscrição enviada com sucesso! Obrigado.');
            }, 2000);
            
        } catch (error) {
            console.error('Erro ao enviar:', error);
            mostrarFeedback('error', 'Erro ao enviar inscrição. Tente novamente.');
        } finally {
            animarBotaoEnvio(false);
        }
    }, 1000);
});

// Máscaras para o campo de contato
function aplicarMascaraTelefone(campo) {
    campo.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        if (valor.length <= 11) {
            if (valor.length <= 10) {
                valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = valor;
    });
}

// Aplica máscaras aos campos
document.addEventListener('DOMContentLoaded', function() {
    const contatoField = document.getElementById('contato');
    aplicarMascaraTelefone(contatoField);
});

// Função para melhorar a acessibilidade
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona feedback visual aos campos obrigatórios
    const camposObrigatorios = form.querySelectorAll('input[required], select[required]');
    
    camposObrigatorios.forEach(campo => {
        const label = campo.parentNode.querySelector('label');
        if (label && !label.querySelector('.required-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'required-indicator';
            indicator.textContent = ' *';
            indicator.style.color = '#C52025';
            label.appendChild(indicator);
        }
    });
});

// Adiciona efeitos visuais aos campos
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Efeito de foco
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });
});

console.log('🎓 Formulário de Formação Continuada carregado com sucesso!');
console.log('⚠️  Lembre-se de alterar o número do WhatsApp na variável MEU_WHATSAPP');
console.log(`📞 Número atual configurado: ${MEU_WHATSAPP}`);
