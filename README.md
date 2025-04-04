# Stream Overlay

Um overlay personalizável para streams que exibe mensagens do chat da Twitch com avatares animados.

## Funcionalidades

- Integração em tempo real com o chat da Twitch
- Avatares animados (Twitch ou customizados)
- Aparência e comportamento personalizáveis
- Balões de mensagem com mensagens dos usuários
- Animações e transições suaves
- Comandos interativos para o chat
- Limpeza automática de usuários inativos com animação de saída

## Configuração

O overlay é configurado principalmente através de parâmetros na URL. O arquivo `config.json` é usado apenas para valores padrão durante o desenvolvimento local.

### Configuração via URL (Recomendado)

Quando hospedado no GitHub Pages, você pode personalizar o overlay adicionando parâmetros à URL. Por exemplo:

```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=seu_canal&display.avatarSize=60&ui.backgroundColor=%23ff0000
```

Os parâmetros seguem a estrutura do arquivo `config.json`, usando pontos (.) para acessar valores aninhados. Aqui estão alguns exemplos:

#### Configurações da Twitch
- `twitch.channel`: Nome do canal da Twitch
- `twitch.customAvatarUrls`: URLs dos avatares customizados (separados por vírgula)

#### Configurações de Exibição
- `display.avatarSize`: Tamanho dos avatares em pixels
- `display.showUsernames`: Mostrar nomes de usuário (true/false)
- `display.showTwitchAvatars`: Mostrar avatares da Twitch (true/false)
- `display.showMessages`: Mostrar balões de mensagem (true/false)
- `display.messageMaxLength`: Comprimento máximo dos balões de mensagem
- `display.messageDuration`: Tempo que as mensagens ficam visíveis (ms)
- `display.deleteIdleUsers`: Remover usuários inativos (true/false)
- `display.deleteIdleUsersAfterSeconds`: Tempo para remover usuários inativos (segundos)

#### Configurações de Animação
- `animation.movementInterval`: Frequência de movimento dos avatares (ms)
- `animation.movementRange.y.min`: Movimento vertical mínimo
- `animation.movementRange.y.max`: Movimento vertical máximo
- `animation.transitionDuration`: Duração das animações (segundos)

#### Configurações da Interface
- `ui.backgroundColor`: Cor de fundo (hex ou rgba)
- `ui.textColor`: Cor do texto (hex ou rgba)
- `ui.tooltipBackground`: Cor de fundo do tooltip (hex ou rgba)
- `ui.messageBubbleBackground`: Cor de fundo do balão de mensagem (hex ou rgba)
- `ui.overlayHeight`: Altura da área do overlay
- `ui.overlayBottomPadding`: Espaçamento a partir do fundo da tela
- `ui.scale`: Escala do overlay

### Exemplos de URLs

1. Configuração básica com canal:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=seu_canal
```

2. Configuração com cores personalizadas:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=seu_canal&ui.backgroundColor=%231a1a1a&ui.textColor=%23ffffff
```

3. Configuração com tamanhos e animações personalizadas:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=seu_canal&display.avatarSize=60&animation.movementInterval=5000&animation.movementRange.y.min=0&animation.movementRange.y.max=100
```

4. Configuração com avatares customizados:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=seu_canal&twitch.customAvatarUrls=https://exemplo.com/avatar1.gif,https://exemplo.com/avatar2.gif
```

5. Configuração completa:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=seu_canal&display.avatarSize=60&display.showUsernames=true&display.showMessages=true&display.messageDuration=5000&animation.movementInterval=10000&animation.transitionDuration=3&ui.backgroundColor=%231a1a1a&ui.textColor=%23ffffff&ui.scale=1.1
```

### Configuração via arquivo config.json (Apenas para desenvolvimento)

Para desenvolvimento local, você pode usar o arquivo `config.json` para definir valores padrão. Estes valores serão sobrescritos por qualquer parâmetro na URL.

### Configurações da Twitch
```json
{
  "twitch": {
    "channel": "seu_nome_de_canal",  // O canal da Twitch para conectar
    "customAvatarUrls": [           // URLs dos avatares customizados
      "url1",
      "url2",
      // ...
    ]
  }
}
```

### Configurações de Exibição
```json
{
  "display": {
    "avatarSize": 45,                // Tamanho dos avatares em pixels
    "showUsernames": true,           // Se deve mostrar nomes de usuário abaixo dos avatares
    "showTwitchAvatars": true,       // Se deve mostrar avatares da Twitch
    "showMessages": true,            // Se deve mostrar balões de mensagem
    "messageMaxLength": 100,         // Comprimento máximo dos balões de mensagem
    "messageDuration": 5000,         // Quanto tempo as mensagens ficam visíveis (ms)
    "deleteIdleUsers": true,         // Se deve remover usuários inativos automaticamente
    "deleteIdleUsersAfterSeconds": 60 // Tempo em segundos após o qual usuários inativos são removidos
  }
}
```

### Configurações de Animação
```json
{
  "animation": {
    "movementInterval": 5000,        // Com que frequência os avatares se movem (ms)
    "movementRange": {
      "y": { "min": 0, "max": 60 }   // Intervalo de movimento vertical
    },
    "transitionDuration": 3          // Duração das animações de movimento (segundos)
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
    "overlayBottomPadding": 40,      // Espaçamento a partir do fundo da tela
    "scale": 1.1                     // Escala do overlay (1.0 = tamanho normal, 1.5 = 50% maior, 0.5 = 50% menor)
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

- `!reloadavatar` - Vai recarregar o avatar do usuário que enviou o comando

## Comportamento dos Avatares

- Os avatares se movem aleatoriamente a cada intervalo configurado
- Mensagens aparecem em balões de fala e desaparecem após o tempo configurado
- Usuários inativos são removidos automaticamente após o tempo configurado (se habilitado)
- Ao serem removidos, os avatares têm uma animação suave de saída (escala e fade out)

## Desenvolvimento

- Construído com React 19 + TypeScript + Vite
- Usa styled-components para estilização
- Framer Motion para animações
- tmi.js para integração com chat da Twitch
- ESLint para linting
- TypeScript para type safety

### Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Constrói o projeto para produção
- `npm run preview` - Previa a build de produção
- `npm run lint` - Executa o linter

## Licença

MIT
