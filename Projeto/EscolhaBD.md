# Métodos na Interação com o Banco de Dados e Lógica de Negócio

Os métodos desempenham um papel fundamental na interação com o banco de dados e na implementação de lógica de negócio, especialmente em projetos que utilizam JPA, Hibernate, e DTOs. Eles são usados para manipular entidades, processar dados e gerenciar as operações de entrada e saída de informações no sistema.

## Métodos de Repositório (Repository)

Os métodos de repositório são responsáveis por acessar diretamente o banco de dados. Com o Spring Data JPA, é possível usar métodos como `save()`, `findById()`, `findAll()`, `delete()`, entre outros, para realizar operações CRUD. Além disso, métodos customizados podem ser criados para realizar consultas específicas, utilizando o padrão de nomenclatura do Spring Data ou consultas `@Query` com JPQL ou SQL nativo.

## Métodos de Serviço (Service)

Os métodos de serviço contêm a lógica de negócio da aplicação. Eles chamam os métodos dos repositórios para acessar o banco de dados e, em seguida, aplicam as regras de negócio necessárias antes de retornar uma resposta ao controlador. Os métodos de serviço também são responsáveis pela conversão de entidades em DTOs (e vice-versa), garantindo que apenas os dados relevantes sejam passados entre as camadas.

## Métodos de Conversão para DTOs

Métodos de conversão entre entidades e DTOs permitem que dados sejam encapsulados e transferidos de forma segura entre as camadas da aplicação. Um método de conversão para DTO extrai apenas os dados necessários de uma entidade e os organiza em um formato que seja adequado para a interface de usuário ou para outra camada que vai consumir esses dados. Isso ajuda a proteger a integridade das entidades, ocultando detalhes internos.

## Métodos de Controladores (Controller)

Os métodos nos controladores (endpoints) são responsáveis por receber e processar as requisições HTTP, como GET, POST, PUT, e DELETE. Eles chamam os métodos de serviço apropriados para manipular os dados, realizar validações e retornar as respostas adequadas aos clientes. Esses métodos utilizam DTOs como entrada e saída de dados, facilitando a comunicação com o frontend e mantendo o sistema organizado.

## Conclusão

Cada um desses métodos colabora para estruturar o sistema de forma modular e segura. Os métodos de repositório gerenciam o acesso ao banco de dados, os métodos de serviço encapsulam a lógica de negócio e os métodos de controlador facilitam a interação com os usuários, garantindo que o sistema seja bem projetado e eficiente.
