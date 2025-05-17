# Eles Tão Viajando - Projeto FullStack

## 📝 Sobre o Projeto

Eles Tão Viajando é uma plataforma completa para compartilhar experiências de viagem, focada especialmente no público feminino. O projeto permite que usuárias compartilhem suas aventuras, dicas e experiências de viagem através de posts e relatos detalhados.

Este projeto foi desenvolvido como trabalho de conclusão de curso da Turma de FullStack da Flag.PT.

## Hospedagem

O projeto foi hospedado no Vercel, uma plataforma de hospedagem de aplicativos web. O link para o site pode ser encontrado [aqui](https://elestao-viajando.vercel.app/).

## 🚀 Stack Tecnológica

### Frontend

- React 18
- Vite (Build Tool)
- TailwindCSS (Estilização)
- Wouter (Roteamento)
- React Context API (Gerenciamento de Estado)
- React CountUp (Animações)
- Splide (Carrossel de Imagens)
- Leaflet (Mapas Interativos)
- React Leaflet (para mapas)
- React Splide (para carrosséis)
- React CountUp (para animações)

### Backend

- Node.js
- Express.js (Framework Web)
- MongoDB (Banco de Dados)
- Mongoose (ODM)
- JWT (Autenticação)
- Bcrypt (Criptografia)
- Multer (Upload de Arquivos)
- Cloudinary (Gerenciamento de Imagens)
- CORS (Cross-Origin Resource Sharing)
- Dotenv (Variáveis de Ambiente)

### DevOps & Ferramentas

- Git (Controle de Versão)
- Vercel (Hospedagem Frontend)
- MongoDB Atlas (Banco de Dados Cloud)
- Cloudinary (CDN para Imagens)
- Nodemon (Desenvolvimento Backend)
- ESLint (Linting)
- PostCSS (Processamento CSS)

## 🏗️ Estrutura do Projeto

```
elestaoviajando/
├── backend/
│   ├── src/
│   │   ├── config/         # Configurações do projeto
│   │   ├── controllers/    # Controladores da aplicação
│   │   ├── middleware/     # Middlewares personalizados
│   │   ├── models/         # Modelos do MongoDB
│   │   ├── routes/         # Rotas da API
│   │   ├── server.js       # Arquivo principal do servidor
│   │   └── seed.js         # Script para popular o banco de dados
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── assets/        # Recursos estáticos
│   │   └── App.jsx        # Componente principal
│   └── package.json
│
└── README.md
```

## 📚 Funcionalidades

### Área Pública

- Visualização de viagens com detalhes completos
- Sistema de blog para compartilhar experiências
- Visualização de mapas interativos
- Filtros por localização e data
- Galeria de imagens com carrossel
- Interface moderna e responsiva
- Design adaptativo para diferentes dispositivos
- Conexão com OpenWeatherMap API
- Conexão com Google Maps API

### Área Administrativa

- Dashboard administrativo
- Gerenciamento completo de viagens (CRUD)
- Gerenciamento de posts do blog
- Upload e gerenciamento de imagens
- Sistema de autenticação seguro

## 🔒 Sistema de Autenticação e Segurança

### Autenticação

- Implementação de JWT (JSON Web Tokens) para autenticação
- Tokens de acesso com tempo de expiração
- Refresh tokens para renovação automática de sessão
- Armazenamento seguro de tokens no localStorage
- Proteção contra XSS através de sanitização de dados

### Segurança

- Criptografia de senhas com Bcrypt
- Proteção contra ataques CSRF
- Validação de dados em todas as requisições
- Sanitização de inputs
- Headers de segurança configurados (CORS, CSP, etc.)
- Rate limiting para prevenir ataques de força bruta
- Proteção de rotas sensíveis
- Validação de tokens em todas as requisições autenticadas

### Rotas Protegidas

- Middleware de autenticação em todas as rotas administrativas
- Verificação de roles (admin/user)
- Redirecionamento automático para login
- Proteção de rotas sensíveis no frontend e backend

### Armazenamento Seguro

- Variáveis de ambiente para dados sensíveis
- Chaves de API protegidas
- Credenciais de banco de dados criptografadas
- Tokens JWT com assinatura segura

## 🚀 Como Executar o Projeto

### Pré-requisitos

#### Frontend

- Node.js >= 18
- npm ou yarn
- Conta no Cloudinary (para upload de imagens)

#### Backend

- Node.js >= 18
- MongoDB (local ou MongoDB Atlas)
- Conta no Cloudinary
- Variáveis de ambiente configuradas

### Instalação

#### Frontend

1. Clone o repositório:

```bash
git clone https://github.com/stroligo/elestaoviajando.git
cd elestaoviajando/frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

#### Backend

1. Entre na pasta do backend:

```bash
cd ../backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 📝 Scripts Disponíveis

### Frontend

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter

### Backend

- `npm run dev` - Inicia o servidor de desenvolvimento com hot-reload
- `npm start` - Inicia o servidor de produção
- `npm run seed` - Popula o banco de dados com dados iniciais
- `npm run create-admin` - Cria um usuário administrador

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## ✨ Agradecimentos

- Prof. Helder Pereira
- Prof. Valério Vaz
- Equipe da Flag.PT
- Todos os colegas da Turma

## 📝 Contato

- GitHub: [stroligo](https://github.com/stroligo)
- LinkedIn: [gabrielstroligo](https://linkedin.com/in/gabrielstroligo)
- Instagram: [gabrielstroligo](https://instagram.com/gabrielstroligo)
