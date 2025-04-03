# Stream Overlay

Um overlay personalizável para streams que exibe mensagens do chat da Twitch com avatares animados.

## Funcionalidades

- Integração em tempo real com o chat da Twitch
- Avatares animados
- Aparência e comportamento personalizáveis
- Balões de mensagem com mensagens dos usuários
- Animações e transições suaves

## Configuração

O overlay pode ser personalizado através do arquivo `config.json`. Aqui está uma explicação das configurações disponíveis:

### Configurações da Twitch
```json
{
  "twitch": {
    "channel": "seu_nome_de_canal",  // O canal da Twitch para conectar
    "useTwitchAvatars": true,        // Se deve usar avatares da Twitch ou avatar padrão
    "defaultAvatarUrls": "url"        // URL do avatar padrão quando useTwitchAvatars é false
  }
}
```

### Configurações de Exibição
```json
{
  "display": {
    "avatarSize": 40,                // Tamanho dos avatares em pixels
    "showUsernames": true,           // Se deve mostrar nomes de usuário abaixo dos avatares
    "showMessages": true,            // Se deve mostrar balões de mensagem
    "messageMaxLength": 200,         // Comprimento máximo dos balões de mensagem
    "messageDuration": 5000          // Quanto tempo as mensagens ficam visíveis (ms)
  }
}
```

### Configurações de Animação
```json
{
  "animation": {
    "movementInterval": 10000,       // Com que frequência os avatares se movem (ms)
    "movementRange": {
      "x": { "min": 0, "max": 100 }, // Intervalo de movimento horizontal
      "y": { "min": 0, "max": 60 }   // Intervalo de movimento vertical
    },
    "transitionDuration": 0.3        // Duração das animações de movimento
  }
}
```

### Configurações da Interface
```json
{
  "ui": {
    "backgroundColor": "#1a1a1a",    // Cor de fundo
    "textColor": "#ffffff",          // Cor do texto
    "tooltipBackground": "rgba(0, 0, 0, 0.8)",  // Cor de fundo do tooltip do nome de usuário
    "messageBubbleBackground": "rgba(0, 0, 0, 0.8)",  // Cor de fundo do balão de mensagem
    "overlayHeight": 100,            // Altura da área do overlay
    "overlayBottomPadding": 20       // Espaçamento a partir do fundo da tela
  }
}
```

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `config.json`
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Uso

1. Adicione o overlay ao seu software de streaming (OBS, Streamlabs, etc.)
2. Configure a fonte do navegador para a URL mostrada no servidor de desenvolvimento (ex. http://localhost:5173/)
3. Configure o tamanho e a posição conforme desejado

## Comandos para o chat
!changeavatar - Vai aleatorizar o avatar para o usuário que enviou o comando

## Desenvolvimento

- Construído com React + TypeScript + Vite
- Usa styled-components para estilização
- Framer Motion para animações
- tmi.js para integração com chat da Twitch

## Licença

MIT
