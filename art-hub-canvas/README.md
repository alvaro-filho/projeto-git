# Art Hub Canvas

Crie a interface completa de um sistema SaaS chamado "Ateliê Studio" - Plataforma de Gestão de Produção Artística, Colaboração Visual e Vitrine NDA.

### Design System e Estilo Visual:

- Tema Dark moderno, voltado para artistas digitais e estúdios.

- Cores: Fundo escuro (#0f172a / slate-900), destaques em roxo/índigo (#6366f1) e detalhes em verde neon/suave para status.

- Efeitos Visuais: Aplique Glassmorphism (efeito de vidro fosco com backdrop-blur e bordas sutis com brilho), sombras suaves e animações fluidas de transição de tela.

- Use Shadcn UI, Tailwind CSS e ícones do Lucide-react.

### Estrutura de Navegação (Sidebar + Header Central):

Crie um Layout principal com uma Sidebar retrátil contendo a logo "Ateliê Studio", perfil do usuário no rodapé e os seguintes links de navegação:

1. Tela de Autenticação (/login):

   - Toggle entre "Entrar" e "Criar Cadastro".

   - Botão para selecionar o tipo de perfil: "Artista / Freelancer" ou "Empresa / Estúdio".

   - Campos de E-mail e Senha, com botões fictícios de Login Social (Google/ArtStation).

2. Dashboard Central (/dashboard):

   - Header com busca global e botão "Enviar Arquivo" (que abre modal de upload de arquivos pesados .psd/.blend com barra de progresso).

   - 4 Cards de métricas com efeito Glassmorphism: Projetos ativos (24), Entregas na semana (37), Artes travadas por NDA (13) e Armazenamento usado (412 GB / 600 GB).

   - Componente de Gráfico de Atividade (Heatmap estilo GitHub de contribuições diárias com blocos roxos).

   - Gráfico de Tendência de Entregas e barras de Arquivos por Contratante.

3. Quadro Kanban & Timeline (/kanban):

   - Chave de alternância no topo (Toggle Tabs): "Visão Quadro (Kanban)" e "Visão Cronograma (Gantt)".

   - Na Visão Quadro: Colunas "A Fazer", "Em Progresso", "Em Revisão", "Concluído" com suporte a Drag & Drop.

   - Modal de Detalhes da Tarefa: ao clicar em um cartão, exiba os detalhes do entregável, prazos e um botão de ação destacado em roxo: "Abrir Canvas da Tarefa".

   - Ao clicar em "Abrir Canvas da Tarefa", direcione o usuário para a rota /canvas com o contexto dessa tarefa pré-selecionado.

4. Canvas Infinito (/canvas):

   - Área interativa cinza escuro com grid sutil de pontos.

   - Seletor de Contexto no topo: Toggle/Select para alternar entre "Canvas Macro do Projeto" (Moodboard Geral) e "Canvas da Tarefa: [Nome da Tarefa Escolhida]".

   - Barra de ferramentas flutuante centralizada na parte inferior: Mover (Pan), Adicionar Imagem, Nota Adesiva (Sticky Note), Vetor, Zoom In/Out e Minimapa no canto.

   - Área de trabalho interativa com notas adesivas e imagens arrastáveis.

5. Vitrine & NDA (/showcase):

   - Galeria de imagens estilo grid com abas de filtro: "Todas", "Travadas por NDA" e "Liberadas".

   - Cards de artes com estado interativo (`useState`): 

     * Badge Vermelho com cadeado: "Travado por NDA" com o botão "Aprovar Liberação".

     * Ao clicar em "Aprovar Liberação", altere o estado do card em tempo real para Badge Verde: "Liberado / Publicado no Portfólio".

   - Botão para acionar a modal "Artbook Digital Exclusivo" com visualização de bastidores.

### Estrutura de Código:

Crie código limpo em React + TypeScript com rotas bem definidas no React Router / Next App Router e componentes modularizados na pasta /components.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bbf07822-a476-4d78-9565-aad06e7c3c08).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
