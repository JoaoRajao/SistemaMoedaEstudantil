# Métodos na Interação com o Banco de Dados e Lógica de Negócio

Os métodos desempenham um papel fundamental na interação com o banco de dados e na implementação de lógica de negócio, especialmente em projetos que utilizam Entity Framework (EF) e DTOs. Eles são usados para manipular entidades, processar dados e gerenciar as operações de entrada e saída de informações no sistema.

## Data Context (MeritSystemContext)

No lugar da camada de Repositório, o `MeritSystemContext` é utilizado para gerenciar o acesso ao banco de dados. Essa classe, derivada de `DbContext`, define `DbSet` para cada entidade, como `Aluno`, `Professor`, `Empresa`, e `Transacao`, representando tabelas do banco de dados. Com o `MeritSystemContext`, é possível executar operações CRUD e consultas usando o Entity Framework. Exemplo:

```csharp
public class MeritSystemContext : DbContext
{
    public DbSet<Aluno> Alunos { get; set; }
    public DbSet<Professor> Professores { get; set; }
    public DbSet<Empresa> Empresas { get; set; }
    public DbSet<Vantagem> Vantagens { get; set; }
    public DbSet<Transacao> Transacoes { get; set; }

    public MeritSystemContext(DbContextOptions<MeritSystemContext> options) : base(options) { }
}
```
Essa classe simplifica o acesso ao banco de dados, centralizando as operações de consulta e manipulação de dados por meio dos `DbSet`s, o que permite aplicar consultas LINQ diretamente nas entidades.

## Métodos de Serviço (Service)

Os métodos de serviço contêm a lógica de negócio da aplicação. Eles acessam o banco de dados por meio do `MeritSystemContext`, aplicando as regras de negócio necessárias antes de retornar uma resposta ao controlador. Os métodos de serviço também são responsáveis pela conversão de entidades em DTOs (e vice-versa), garantindo que apenas os dados relevantes sejam passados entre as camadas.

## Métodos de Conversão para DTOs

Métodos de conversão entre entidades e DTOs permitem que dados sejam encapsulados e transferidos de forma segura entre as camadas da aplicação. Um método de conversão para DTO extrai apenas os dados necessários de uma entidade e os organiza em um formato adequado para a interface de usuário ou para outra camada que vai consumir esses dados. Isso ajuda a proteger a integridade das entidades, ocultando detalhes internos.

## Métodos de Controladores (Controller)

Os métodos nos controladores (endpoints) são responsáveis por receber e processar as requisições HTTP, como GET, POST, PUT, e DELETE. Eles chamam os métodos de serviço apropriados para manipular os dados, realizar validações e retornar as respostas adequadas aos clientes. Esses métodos utilizam DTOs como entrada e saída de dados, facilitando a comunicação com o frontend e mantendo o sistema organizado.

## Conclusão

Cada um desses métodos colabora para estruturar o sistema de forma modular e segura. O `MeritSystemContext` centraliza o acesso ao banco de dados, os métodos de serviço encapsulam a lógica de negócio e os métodos de controlador facilitam a interação com os usuários, garantindo que o sistema seja bem projetado e eficiente.
