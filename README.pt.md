# Sobreposição de Stream

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README.pt.md)

Uma bela e personalizável sobreposição para sua transmissão na Twitch que dá vida ao seu chat com avatares e mensagens animadas.

## O Que Faz

- Mostra mensagens do seu chat da Twitch com avatares animados
- Aparência e animações personalizáveis
- Comandos de chat interativos
- Limpeza automática de usuários inativos
- Animações e transições suaves

## Início Rápido

1. Adicione a sobreposição ao seu software de streaming (OBS, Streamlabs, etc.)
2. Use este formato de URL:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=NOME_DO_SEU_CANAL
```

## Guia de Personalização

Você pode personalizar tudo adicionando parâmetros à URL. Aqui estão todas as configurações disponíveis:

### Configurações da Twitch
- `twitch.channel`: Nome do seu canal na Twitch
- `twitch.customAvatarUrls`: URLs de avatares personalizados (separados por vírgulas). Exemplo: `?twitch.customAvatarUrls=https://exemplo.com/avatar1.gif,https://exemplo.com/avatar2.gif`

### Configurações de Exibição
- `display.avatarSize`: Tamanho do avatar em pixels (padrão: 45)
- `display.showUsernames`: Mostrar/ocultar nomes de usuário (true/false)
- `display.showTwitchAvatars`: Mostrar/ocultar avatares da Twitch (true/false)
- `display.showMessages`: Mostrar/ocultar balões de mensagem (true/false)
- `display.messageMaxLength`: Comprimento máximo das mensagens (padrão: 100)
- `display.messageDuration`: Quanto tempo as mensagens permanecem visíveis em milissegundos (padrão: 5000)
- `display.deleteIdleUsers`: Remover usuários inativos automaticamente (true/false)
- `display.deleteIdleUsersAfterSeconds`: Tempo antes de remover usuários inativos em segundos (padrão: 120)

### Configurações de Animação
- `animation.movementInterval`: Frequência de movimento dos avatares em milissegundos (padrão: 10000)
- `animation.movementRange.y.min`: Movimento vertical mínimo (padrão: 0)
- `animation.movementRange.y.max`: Movimento vertical máximo (padrão: 60)
- `animation.transitionDuration`: Duração das animações em segundos (padrão: 3)

### Configurações de Aparência
- `ui.backgroundColor`: Cor de fundo (use códigos hex como #1a1a1a)
- `ui.textColor`: Cor do texto (use códigos hex como #ffffff)
- `ui.tooltipBackground`: Cor de fundo da dica de ferramenta (use rgba como rgba(0, 0, 0, 0.8))
- `ui.messageBubbleBackground`: Cor de fundo do balão de mensagem (use rgba como rgba(0, 0, 0, 0.8))
- `ui.overlayHeight`: Altura da área de sobreposição em pixels (padrão: 100)
- `ui.overlayBottomPadding`: Espaço da parte inferior da tela em pixels (padrão: 40)
- `ui.scale`: Multiplicador de tamanho geral (1.0 = normal, 1.5 = 50% maior)

### Exemplos de URLs

1. Configuração básica:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=seu_canal
```

2. Cores e aparência personalizadas:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=seu_canal&ui.backgroundColor=%231a1a1a&ui.textColor=%23ffffff&ui.scale=1.1
```

3. Exibição e animação personalizadas:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=seu_canal&display.avatarSize=60&display.messageDuration=8000&animation.movementInterval=5000&animation.transitionDuration=2
```

4. Personalização completa:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=seu_canal&display.avatarSize=60&display.showUsernames=true&display.showMessages=true&display.messageDuration=5000&animation.movementInterval=10000&animation.transitionDuration=3&ui.backgroundColor=%231a1a1a&ui.textColor=%23ffffff&ui.scale=1.1
```

## Comandos do Chat

- `!reloadavatar` - Atualiza seu avatar

## Como Funciona

- Avatares se movem suavemente pela tela
- Mensagens aparecem em balões de fala e desaparecem gradualmente
- Usuários inativos são removidos automaticamente
- Tudo pode ser personalizado para combinar com o estilo da sua transmissão

## Precisa de Ajuda?

Se precisar de ajuda para personalizar sua sobreposição, experimente diferentes combinações das configurações acima. Você sempre pode redefinir removendo todos os parâmetros, exceto o nome do seu canal.

## Licença

MIT 