# Instruções para Rodar o Projeto Moeda Estudantil

## Requisitos para execução

### Dependências:
- **Docker**: O Docker deve estar instalado para subir o banco de dados em um container.
  - [Instalar Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **.NET Core SDK**: É necessário ter o .NET Core SDK instalado para compilar e executar o projeto.
  - [Instalar .NET Core SDK](https://dotnet.microsoft.com/download/dotnet)

### Preparação do ambiente:

1. **Clone o projeto**: Certifique-se de ter o projeto MoedaEstudantil clonado na sua máquina.
2. **Acesse a pasta correta**: No terminal ou prompt de comando, navegue até a pasta do projeto:
   ```cd MoedaEstudantil\MoedaEstudantil```
   
### Subir o Banco de Dados

### Iniciar o container Docker:

Execute o script subir-banco.bat para criar e iniciar o banco de dados no container Docker ```.\subir-banco.bat```

Esse script irá automatizar a criação do container e garantir que o banco de dados esteja disponível.

### Criar as Tabelas no Banco de Dados

#### Efetuar migrações:

    -Certifque-se de que o banco esta rodando no App DockerDesktop
    
    - Utilize o Entity Framework Core para aplicar as migrações e criar as tabelas no banco de dados: ```dotnet ef migrations add InitialCreate```

##### Atualizar o banco de dados:

    - Execute o seguinte comando para aplicar as migrações ao banco:```dotnet ef database update```

### Rodar o Projeto

#### Iniciar a aplicação:

Após configurar o banco de dados, execute o seguinte comando para rodar a aplicação:
```dotnet run```

Acessar a aplicação:

A documentação da aplicação (Swagger) estará disponível aqui: [Swagger UI](https://localhost:7065/swagger/index.html).


### Resumo dos Endpoints

Aqui está uma visão geral dos principais endpoints:

##### Alunos

    - POST /api/alunos/cadastrar - Cadastro de aluno
    - POST /api/auth/login - Login (retorna JWT com role "Aluno")
    - GET /api/alunos/{id}/extrato - Consultar extrato
    - POST /api/alunos/{id}/trocar - Trocar moedas por vantagem

##### Professores

    - POST /api/professores/cadastrar - Cadastro de professor
    - POST /api/auth/login - Login (retorna JWT com role "Professor")
    - GET /api/professores/{id}/extrato - Consultar extrato
    - POST /api/professores/{id}/distribuirMoeda - Distribuir moedas para aluno

##### Empresas

    - POST /api/empresas/cadastrar - Cadastro de empresa
    - POST /api/auth/login - Login (retorna JWT com role "Empresa")
    - POST /api/empresas/{id}/vantagens - Cadastrar vantagem

##### Vantagens

    - GET /api/vantagens - Listar todas as vantagens
    - GET /api/vantagens/{id} - Detalhes de uma vantagem

##### Autenticação Geral

    - POST /api/auth/login - Login para qualquer tipo de usuário
    - POST /api/auth/logout - Logout (opcional, dependendo do método de gerenciamento de tokens)