# Eles Tão Viajando - Projeto FullStack

## 📝 Sobre o Projeto

Eles Tão Viajando é uma plataforma completa para compartilhar experiências de viagem, focada especialmente no público feminino. O projeto permite que usuárias compartilhem suas aventuras, dicas e experiências de viagem através de posts e relatos detalhados.

Este projeto foi desenvolvido como trabalho de conclusão de curso da Turma de FullStack da Flag.PT.

## 🚀 Tecnologias Utilizadas

### Backend

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- Multer (para upload de imagens)
- CORS
- Dotenv

### Frontend

- React
- Vite
- TailwindCSS
- React Leaflet (para mapas)
- React Splide (para carrosséis)
- React CountUp (para animações)
- Wouter (para roteamento)

As fotos exibidas no projeto são hospedadas no [Cloudinary](https://res.cloudinary.com).

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

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB Atlas (ou MongoDB local)
- NPM ou Yarn

### Backend

1. Entre na pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:

```
PORT=3001
MONGODB_URI=sua_uri_do_mongodb
```

4. Inicie o servidor:

```bash
npm run dev
```

### Frontend

1. Entre na pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 📚 Funcionalidades

### Backend

- API RESTful para gerenciamento de viagens e posts
- Upload de imagens
- Autenticação de usuários
- CRUD completo para viagens e blog
- Integração com MongoDB Atlas

### Frontend

- Interface moderna e responsiva
- Visualização de mapas interativos
- Carrossel de imagens
- Animações suaves
- Design adaptativo para diferentes dispositivos

## 🔒 Segurança

- CORS configurado
- Variáveis de ambiente para dados sensíveis
- Validação de dados
- Sanitização de inputs

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit de suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Agradecimentos

- Prof. Helder Pereira
- Prof. Valério Vaz
- Equipe da Flag.PT
- Todos os colegas da Turma do curso

## 📝 Contato

- GitHub: [stroligo](https://github.com/stroligo)
- LinkedIn: [gabrielstroligo](https://www.linkedin.com/in/gabrielstroligo/)
- Instagram: [gabrielstroligo](https://instagram.com/gabrielstroligo)
