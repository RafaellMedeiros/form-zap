# Formulário WhatsApp

Um formulário responsivo e moderno que envia dados diretamente para o WhatsApp.

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Interface Moderna**: Visual limpo e profissional com animações suaves
- **Validação Completa**: Validação de todos os campos com feedback visual
- **Envio Direto**: Envia os dados formatados diretamente para o WhatsApp
- **Máscaras de Entrada**: Formatação automática para campos de telefone
- **Acessibilidade**: Interface acessível com indicadores visuais
- **Footer Profissional**: Informações do desenvolvedor e links de contato

## 📋 Campos do Formulário

- Nome Completo (obrigatório)
- E-mail (obrigatório)
- Telefone (obrigatório)
- Empresa (opcional)
- Serviço de Interesse (obrigatório)
- Mensagem (opcional)

## ⚙️ Configuração

### 1. Alterar o Número do WhatsApp

Abra o arquivo `script.js` e altere a variável `MEU_WHATSAPP`:

```javascript
const MEU_WHATSAPP = '5511999999999'; // Substitua pelo seu número
```

**Formato do número:**
- Código do país + DDD + número
- Exemplo: 5511999999999 (Brasil, SP, número)
- Sem espaços, parênteses ou traços

### 2. Personalizar os Serviços

No arquivo `index.html`, você pode alterar as opções do campo "Serviço de Interesse":

```html
<option value="Desenvolvimento Web">Desenvolvimento Web</option>
<option value="Consultoria">Consultoria</option>
<option value="Design">Design</option>
<option value="Marketing Digital">Marketing Digital</option>
<option value="Outro">Outro</option>
```

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `styles.css`:

```css
/* Verde do WhatsApp */
--primary-color: #25D366;
--secondary-color: #128C7E;
```

### Animações
Para desabilitar animações, comente ou remova as propriedades `animation` no CSS.

## 📱 Como Funciona

1. O usuário preenche o formulário
2. Os dados são validados no frontend
3. Uma mensagem formatada é criada
4. O usuário é redirecionado para o WhatsApp Web/App
5. A mensagem aparece pré-preenchida no chat

## 🔧 Estrutura de Arquivos

```
formulario-zap/
├── index.html      # Estrutura HTML do formulário
├── styles.css      # Estilos e animações
├── script.js       # Lógica JavaScript
└── README.md       # Esta documentação
```

## 📄 Exemplo de Mensagem Enviada

```
🔷 NOVO CONTATO DO FORMULÁRIO 🔷

👤 Nome: João Silva
📧 E-mail: joao@email.com
📞 Telefone: (11) 99999-9999
🏢 Empresa: Empresa XYZ
⚙️ Serviço: Desenvolvimento Web
💬 Mensagem:
Preciso de um site para minha empresa...

⏰ Data/Hora: 08/07/2025 14:30:00

_Mensagem enviada via formulário do site_
```

## 🌐 Compatibilidade

- ✅ Chrome (versão 60+)
- ✅ Firefox (versão 55+)
- ✅ Safari (versão 11+)
- ✅ Edge (versão 79+)
- ✅ Mobile (iOS Safari, Chrome Mobile)

## 📱 Testando o Formulário

1. Abra o arquivo `index.html` no navegador
2. Preencha todos os campos obrigatórios
3. Clique em "Enviar para WhatsApp"
4. Verifique se abre o WhatsApp com a mensagem formatada

## 🔒 Privacidade

- Nenhum dado é armazenado no servidor
- Todas as informações são enviadas diretamente para o WhatsApp
- O processamento acontece apenas no navegador do usuário

## 🆘 Suporte

Se você encontrar algum problema:

1. Verifique se o número do WhatsApp está no formato correto
2. Teste em diferentes navegadores
3. Verifique o console do navegador para erros
4. Certifique-se de que o WhatsApp está instalado (mobile) ou funcionando (web)

## �‍💻 Desenvolvedor

Este projeto foi desenvolvido por **Rafael Medeiros**.

### 🌐 Links de Contato:
- **Website**: [RafaelMedeiros.dev](https://rafaelmedeiros.dev)
- **Instagram**: [@rafaelmedeiros.exe](https://www.instagram.com/rafaelmedeiros.exe/)
- **WhatsApp**: [+55 83 99892-0785](https://wa.me/5583998920785)

### 💼 Serviços Oferecidos:
- Desenvolvimento Web
- Criação de Sites e Sistemas
- Consultoria em Tecnologia
- Soluções Digitais Personalizadas

## �📝 Licença

Este projeto é de uso livre. Você pode modificar e usar como desejar.

---

**Desenvolvido com ❤️ por RafaelMedeiros.dev - Transformando ideias em soluções digitais**
