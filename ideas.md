# Ideias de Design - DekaCapital Partners Intake Portal

## Contexto
Portal de qualificação de leads para Real Estate Lending com formulário multi-etapas, lógica condicional complexa e foco em transações de alto ticket.

---

<response>
<text>
## Abordagem 1: Brutalismo Financeiro Moderno

**Design Movement**: Brutalismo Digital com influências de Swiss Design

**Core Principles**:
- Honestidade estrutural: A arquitetura do formulário é visível e transparente
- Hierarquia tipográfica agressiva: Contraste extremo entre títulos e corpo
- Funcionalismo puro: Cada elemento serve um propósito claro
- Assimetria intencional: Layouts que quebram a grade tradicional

**Color Philosophy**: 
Monocromático com acento de alerta. Base em cinza carvão (#1a1a1a) e branco puro (#ffffff), com um único acento em laranja queimado (#d97706) para CTAs e estados críticos. A paleta transmite seriedade institucional enquanto o acento laranja sinaliza urgência e ação decisiva.

**Layout Paradigm**: 
Grid assimétrico com sidebar fixa à esquerda mostrando progresso vertical. O formulário principal ocupa 60% da tela à direita, criando tensão visual. Seções condicionais deslizam horizontalmente, não verticalmente.

**Signature Elements**:
- Bordas grossas (4-6px) em preto sólido separando seções
- Números de etapa em fonte display ultra-bold (120px) como watermark
- Campos de input com underline apenas (sem bordas laterais/superiores)

**Interaction Philosophy**:
Feedback imediato e direto. Validações aparecem inline sem modais. Transições são rápidas e lineares (100-150ms), sem easing suave. Hover states são binários: on/off, sem gradientes.

**Animation**:
Movimentos mecânicos e precisos. Transições de slide são lineares com duração fixa de 200ms. Campos validados recebem um "snap" visual (scale de 1.0 → 0.98 → 1.0 em 150ms). Nenhuma animação decorativa - apenas feedback funcional.

**Typography System**:
- Display: Space Grotesk Bold (títulos de seção, 48-72px)
- Headings: Space Grotesk SemiBold (labels, 16-24px)
- Body: IBM Plex Mono Regular (inputs e texto corrido, 14-16px)
- Hierarquia através de peso e tamanho, não de cor
</text>
<probability>0.07</probability>
</response>

<response>
<text>
## Abordagem 2: Minimalismo Financeiro de Alto Contraste

**Design Movement**: Minimalismo Japonês com elementos de International Typographic Style

**Core Principles**:
- Ma (間): Uso intencional do espaço negativo como elemento ativo
- Redução ao essencial: Apenas informação crítica visível por vez
- Precisão geométrica: Alinhamento perfeito e proporções matemáticas
- Calma cognitiva: Interface que não compete com o pensamento do usuário

**Color Philosophy**:
Paleta de cinzas expandida com acento verde floresta. Background em off-white quente (#fafaf9), textos em cinza grafite profundo (#27272a), com verde musgo (#065f46) para confirmações e estados de sucesso. A escolha do verde transmite crescimento financeiro e estabilidade, evitando o clichê do azul corporativo.

**Layout Paradigm**:
Sistema de cards flutuantes com sombras sutis. Cada seção do formulário é um card independente que aparece/desaparece com fade. Máximo de 3-4 campos visíveis simultaneamente. Barra de progresso horizontal no topo, minimalista (2px de altura).

**Signature Elements**:
- Micro-interações em campos: label flutua suavemente ao focar (transform translateY)
- Ícones line-art ultra-finos (1px stroke) ao lado de cada seção
- Dividers verticais sutis (1px, opacity 0.1) separando grupos de campos relacionados

**Interaction Philosophy**:
Suavidade e previsibilidade. Cada ação tem uma resposta visual gentil. Erros são comunicados com mensagens discretas abaixo do campo, não em vermelho agressivo. O usuário é guiado, não pressionado.

**Animation**:
Transições orgânicas com cubic-bezier personalizado (0.4, 0.0, 0.2, 1). Cards entram com fade + translateY(-20px) em 400ms. Campos focados expandem levemente (scale 1.02) em 300ms. Loading states usam skeleton screens, não spinners.

**Typography System**:
- Display: Sohne Breit Buch (títulos principais, 40-56px)
- Headings: Sohne Buch (subtítulos e labels, 14-20px)
- Body: Sohne Leicht (corpo de texto e inputs, 15-17px)
- Tracking expandido (+0.02em) para títulos, normal para corpo
</text>
<probability>0.09</probability>
</response>

<response>
<text>
## Abordagem 3: Neo-Modernismo Financeiro com Profundidade

**Design Movement**: Neo-Modernismo com influências de Glassmorphism e Material Design 3

**Core Principles**:
- Camadas e profundidade: UI com múltiplos planos visuais
- Materialidade digital: Elementos que parecem ter peso e textura
- Fluidez contextual: Componentes que se adaptam ao conteúdo
- Sofisticação técnica: Interface que demonstra competência através do design

**Color Philosophy**:
Gradientes sutis em azul-petróleo e dourado. Base em azul marinho profundo (#0f172a) para backgrounds, com overlays em azul-petróleo translúcido (#0891b2 com 8% opacity). Acentos em dourado champagne (#fbbf24) para CTAs premium. A combinação azul-dourado evoca confiança institucional e exclusividade.

**Layout Paradigm**:
Layout de duas colunas com hierarquia Z. Coluna esquerda (40%) mostra contexto e progresso com fundo glassmorphic. Coluna direita (60%) contém o formulário ativo sobre um gradiente sutil. Elementos flutuam em diferentes profundidades (z-index) criando paralaxe sutil no scroll.

**Signature Elements**:
- Cards com backdrop-blur e borders gradiente (1px)
- Sombras multicamadas (3 níveis: near, mid, far) para profundidade real
- Progress indicator circular animado no canto superior direito, sempre visível

**Interaction Philosophy**:
Responsividade rica e recompensadora. Cada interação produz feedback visual e micro-animação. Validações bem-sucedidas disparam confetti sutil. Erros são apresentados com shake suave + highlight temporário.

**Animation**:
Animações fluidas e expressivas. Transições de seção usam morph com spring physics (tension: 300, friction: 30). Campos validados recebem checkmark animado com draw animation (500ms). Loading states mostram shimmer gradient animado atravessando o componente.

**Typography System**:
- Display: Clash Display Semibold (hero text, 56-80px)
- Headings: Satoshi Bold (seções e labels, 18-28px)
- Body: Satoshi Regular (inputs e texto, 15-17px)
- Monospace: JetBrains Mono (valores numéricos e IDs, 14px)
- Contraste através de peso e hierarquia cromática (primary vs muted)
</text>
<probability>0.06</probability>
</response>

---

## Decisão Final

Após análise do contexto (portal B2B para transações financeiras de alto valor), **selecionei a Abordagem 2: Minimalismo Financeiro de Alto Contraste**.

### Justificativa:
1. **Credibilidade**: O minimalismo japonês transmite seriedade e competência sem ostentação
2. **Usabilidade**: Formulários longos e complexos se beneficiam de calma cognitiva e foco
3. **Profissionalismo**: A paleta sóbria e tipografia refinada alinham com expectativas B2B
4. **Performance**: Animações sutis e layout limpo garantem carregamento rápido
5. **Diferenciação**: Evita clichês de "fintech roxo com gradientes" enquanto mantém sofisticação

### Implementação:
- Paleta: Off-white (#fafaf9), Grafite (#27272a), Verde Musgo (#065f46)
- Tipografia: Sohne (ou fallback: Inter com ajustes de tracking)
- Layout: Cards flutuantes, máximo 3-4 campos por vez
- Animações: Suaves, cubic-bezier(0.4, 0.0, 0.2, 1), 300-400ms
- Elementos: Ícones line-art, micro-interações em labels, sombras sutis
