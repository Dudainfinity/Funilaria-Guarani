# Funilaria Guarani

Site institucional da **Funilaria Guarani**, especializada em calhas, rufos, pingadeiras, coifas, dutos e peças especiais sob medida em chapa metálica.

**Site ao vivo:** [funilariaguarani.com](https://funilariaguarani.com)

---

## Sobre o projeto

Site desenvolvido para captação de clientes e solicitação de orçamentos via WhatsApp, com foco em conversão, velocidade e responsividade. O site apresenta os serviços, catálogo de produtos e galeria de fotos da empresa.

## Funcionalidades

- **Catalogo de produtos** — apresentacao visual dos servicos e pecas disponiveis
- **Modal de orcamento** — formulario integrado com geracao automatica de mensagem para WhatsApp
- **Galeria com lightbox** — fotos dos trabalhos realizados com visualizacao ampliada
- **Design responsivo** — adaptado para mobile, tablet e desktop
- **Formulario com validacao** — campos obrigatorios com feedback visual
- **Animacoes de scroll** — elementos com efeito reveal ao rolar a pagina
- **SEO otimizado** — meta tags, sitemap.xml e robots.txt configurados

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semantica do site |
| CSS3 | Estilizacao, animacoes e responsividade |
| JavaScript | Interatividade, modal, lightbox e WhatsApp |
| Google Tag Manager | Gerenciamento de tags e eventos |
| Google Analytics | Monitoramento de trafego |
| GitHub Pages | Hospedagem com dominio customizado |

## Estrutura

```
Funilaria_Guarani/
├── index.html                        # Pagina principal
├── style.css                         # Estilos globais
├── script.js                         # Logica de interatividade
├── sitemap.xml                       # Mapa do site para SEO
├── robots.txt                        # Diretivas para crawlers
├── CNAME                             # Dominio customizado (funilariaguarani.com)
├── .gitignore                        # Arquivos ignorados pelo Git
├── .github/
│   └── workflows/
│       └── deploy.yml                # Pipeline de deploy automatico via FTP
└── img/                              # Imagens e videos do site
```

## Deploy

O deploy e feito automaticamente via **GitHub Actions** a cada push na branch `main`. O workflow `.github/workflows/deploy.yml` verifica os arquivos principais e envia o site para o servidor via FTP usando as secrets configuradas no repositorio:

| Secret | Descricao |
|---|---|
| `FTP_SERVER` | Endereco do servidor FTP |
| `FTP_USERNAME` | Usuario FTP |
| `FTP_PASSWORD` | Senha FTP |

O dominio customizado `funilariaguarani.com` e configurado pelo arquivo `CNAME`.

## .gitignore

Arquivos e pastas ignorados pelo Git:

- `.DS_Store`, `Thumbs.db` — arquivos de sistema operacional
- `.vscode/`, `.idea/` — configuracoes de editor
- `*.tmp`, `*.zip` — arquivos temporarios e compactados

## Contato

Atendimento: **Aluizio Aires Cerqueira**
Solicite seu orcamento diretamente pelo site: [funilariaguarani.com](https://funilariaguarani.com)

---

Desenvolvido por [Dudainfinity](https://github.com/Dudainfinity)
