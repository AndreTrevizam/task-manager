# Task Manager

Task Manager é uma aplicação para gerenciamento de tarefas, permitindo que usuários criem, atualizem e visualizem tarefas associadas a times. O projeto utiliza **Node.js**, **Express**, **Prisma** e **Zod** para validação de dados.

## Funcionalidades

- **Gerenciamento de Tarefas**:
  - Criar tarefas com título, descrição, prioridade e associação a um time.
  - Atualizar o status de uma tarefa (pendente, em progresso, concluída).
  - Listar todas as tarefas de um time.

- **Gerenciamento de Times**:
  - Verificar se um usuário pertence a um time antes de permitir acesso às tarefas.

- **Autenticação**:
  - Middleware para autenticação de usuários, garantindo que apenas usuários autorizados possam acessar ou modificar recursos.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do JavaScript no servidor.
- **Express**: Framework para criação de APIs REST.
- **Prisma**: ORM para interação com o banco de dados.
- **Zod**: Biblioteca para validação e parsing de dados.
- **JWT**: Para autenticação baseada em tokens.
- **TypeScript**: Para tipagem estática e maior segurança no código.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/task-manager.git
   cd task-manager

2. Instale as dependências
    ```bash
   npm install

3. Configure o banco de dados no arquivo .env
    ```bash
    DATABASE_URL="postgresql://user:password@localhost:5432/task_manager"
    JWT_SECRET="sua-chave-secreta"

4. Inicie o container:
    ```bash
    docker-compose up -d

5. Execute as migrações do banco de dados:
    ```bash
    npx prisma migrate dev

6. Inicie o servidor:
    ```bash
    npm run dev

Feito com ❤️ por André Trevizam.

