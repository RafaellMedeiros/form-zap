// Configuração - ALTERE AQUI SEU NÚMERO DE WHATSAPP
const MEU_WHATSAPP = '5583998920785'; // Substitua pelo seu número no formato: código do país + DDD + número

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
    let mensagem = `🔷 *NOVO CONTATO DO FORMULÁRIO* 🔷\n\n`;
    
    mensagem += `👤 *Nome:* ${dados.nome}\n`;
    mensagem += `📧 *E-mail:* ${dados.email}\n`;
    mensagem += `📞 *Telefone:* ${formatarTelefone(dados.telefone)}\n`;
    
    if (dados.empresa.trim()) {
        mensagem += `🏢 *Empresa:* ${dados.empresa}\n`;
    }
    
    mensagem += `⚙️ *Serviço:* ${dados.servico}\n`;
    
    if (dados.mensagem.trim()) {
        mensagem += `💬 *Mensagem:*\n${dados.mensagem}\n`;
    }
    
    mensagem += `⏰ *Data/Hora:* ${new Date().toLocaleString('pt-BR')}\n`;
    mensagem += `\n_Mensagem enviada via formulário do site_`;
    
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
    
    // Adiciona estilos
    feedback.style.cssText = `
        padding: 15px;
        border-radius: 12px;
        margin-bottom: 20px;
        font-weight: 500;
        animation: fadeInUp 0.5s ease-out;
        ${tipo === 'success' 
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
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
    
    if (!dados.email.trim()) {
        erros.push('E-mail é obrigatório');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
        erros.push('E-mail inválido');
    }
    
    if (!dados.telefone.trim()) {
        erros.push('Telefone é obrigatório');
    }
    
    if (!dados.servico) {
        erros.push('Selecione um serviço');
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
        submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar para WhatsApp';
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
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        empresa: formData.get('empresa') || '',
        servico: formData.get('servico'),
        mensagem: formData.get('mensagem') || ''
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
                mostrarFeedback('success', 'Formulário enviado com sucesso! Obrigado pelo contato.');
            }, 2000);
            
        } catch (error) {
            console.error('Erro ao enviar:', error);
            mostrarFeedback('error', 'Erro ao enviar mensagem. Tente novamente.');
        } finally {
            animarBotaoEnvio(false);
        }
    }, 1000);
});

// Máscaras para os campos de telefone
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

// Aplica máscaras aos campos de telefone
document.addEventListener('DOMContentLoaded', function() {
    const telefoneField = document.getElementById('telefone');
    
    aplicarMascaraTelefone(telefoneField);
});

// Animação de entrada dos campos
document.addEventListener('DOMContentLoaded', function() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
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
            indicator.style.color = '#e74c3c';
            label.appendChild(indicator);
        }
    });
});

console.log('📱 Formulário WhatsApp carregado com sucesso!');
console.log('⚠️  Lembre-se de alterar o número do WhatsApp na variável MEU_WHATSAPP');
console.log(`📞 Número atual configurado: ${MEU_WHATSAPP}`);
