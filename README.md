# Bem-vindo ao Transfer Schedule!

Eu sou Daniel, o desenvolvedor responsável por este projeto. Este é um empreendimento destinado a fornecer uma infraestrutura sólida para projetos subsequentes, visando otimizar o processo de busca e configuração de bibliotecas. É evidente que o sistema apresenta uma complexidade estrutural que supera a de simples regras de negócio. Conforme mencionado anteriormente, a intenção é incorporar o maior número possível de requisitos não funcionais, de modo a torná-lo útil para sistemas futuros, além de servir como um portfólio de melhores práticas.

## Requisitos de Máquina

Ter configurado o ambiente de desenvolvimento para Java 17, possuir a versão 20.11.0 NodeJS e ter o gerenciador de pacotes Yarn instalados.

## Instalação

Após baixar o repositório localmente será necessário importar o projeto maven que estará na pasta aí para que sejam baixadas suas dependências, é posteriormente pode ser executado como javaApplication.

Quanto ao projeto web, é necessário rodar 2 linhas de comando: `yarn` e `yarn dev`.

## Utilização

Fazer login com os usuários padrão do sistema:

- login: admin
- senha: 123123

Para conseguir fazer a primeira transação será necessário antes criar um cliente para à sua conta utilizando o "Ativar conta", preencher os dados e acessar. Posteriormente será necessário acessar o menu de contas para criar uma segunda conta para fazer a transferência. O processo é bloqueado para não trocar de titularidade para garantir uma entrega mais ágil do foco do projeto (está sujeito a alterações).

Tendo duas contas acessíveis já é possível fazer um agendamento de transferência, onde o botão superior da tela traz a possibilidade de alterar a conta origem e, no código de conta destino é possível passar o código da conta destino. Quanto à lógica aplicada na criação do agendamento é verificável no link: [GitHub - Avaliação Full Stack](https://github.com/tm-vagas/avaliacao-full-stack).

## Projeto Vuetify

Foi utilizado [Vuetify](https://vuetifyjs.com) e [Pinia](https://pinia.vuejs.org) neste projeto, pois essas tecnologias oferecem diversas vantagens que contribuem significativamente para o desenvolvimento e aprimoramento da experiência do usuário.

### Vantagens de Utilizar Vuetify

[Vuetify](https://vuetifyjs.com) é um framework Vue.js de código aberto que simplifica o desenvolvimento de interfaces de usuário responsivas e visualmente atraentes. Algumas das vantagens que motivaram sua escolha incluem:

- **Componentes Pré-construídos:** Vuetify fornece uma ampla variedade de componentes prontos para uso, acelerando o desenvolvimento e mantendo uma consistência visual.

- **Design Responsivo:** A estrutura é construída com foco na responsividade, garantindo que o aplicativo seja acessível em dispositivos de diferentes tamanhos.

- **Tema Personalizável:** A possibilidade de personalizar o tema permite alinhar a aparência do aplicativo com a identidade visual desejada.

- **Comunidade Ativa:** A comunidade Vuetify é ativa, proporcionando suporte contínuo, atualizações frequentes e uma ampla variedade de recursos adicionais.

### Vantagens de Utilizar Pinia

[Pinia](https://pinia.vuejs.org) é uma store para Vue.js que oferece uma alternativa moderna e eficiente para gerenciamento de estado. Aqui estão algumas razões para escolher Pinia:

- **API Simples:** Pinia apresenta uma API simples e intuitiva para gerenciamento de estado, facilitando a criação, leitura e modificação do estado da aplicação.

- **Reatividade Eficiente:** Utilizando o sistema de reatividade do Vue 3, Pinia oferece atualizações de estado eficientes e um melhor desempenho global.

- **Devtools Integrados:** Pinia integra-se facilmente às ferramentas de desenvolvimento Vue, proporcionando uma experiência de depuração simplificada.

- **Suporte para Módulos:** A capacidade de dividir o estado em módulos independentes facilita a organização e manutenção do código.

Foi utilizado [Vuetify](https://vuetifyjs.com) e [Pinia](https://pinia.vuejs.org) neste projeto para aproveitar essas vantagens e proporcionar aos usuários uma experiência consistente, eficiente e visualmente atraente.

## Projeto Java SpringBoot

Foi utilizado [Java 17](https://openjdk.java.net/projects/jdk/17/) e [Spring Boot 6](https://spring.io/projects/spring-boot) neste projeto, pois essas tecnologias oferecem diversas vantagens que contribuem significativamente para o desenvolvimento e eficiência da aplicação.

### Vantagens de Utilizar Java 17

[Java 17](https://openjdk.java.net/projects/jdk/17/) é a mais recente versão LTS da linguagem Java, oferecendo melhorias substanciais e recursos modernos. Algumas das vantagens que motivaram sua escolha incluem:

- **Recursos da Linguagem:** Java 17 introduz aprimoramentos significativos na linguagem, proporcionando uma sintaxe mais concisa e expressiva.

- **Melhorias de Desempenho:** Atualizações de desempenho contínuas garantem que a aplicação seja executada de maneira mais eficiente e responsiva.

- **Recursos de Segurança Aprimorados:** Java 17 traz melhorias de segurança importantes, garantindo que a aplicação seja robusta contra ameaças.

- **Suporte à Programação Funcional:** Recursos modernos como expressões lambda e fluxos tornam a programação em Java mais concisa e elegante.

### Vantagens de Utilizar Spring Boot 6

[Spring Boot 6](https://spring.io/projects/spring-boot) é um framework amplamente utilizado para desenvolvimento de aplicativos Java. Algumas das razões para escolher Spring Boot 6 incluem:

- **Configuração Conveniente:** Spring Boot simplifica a configuração do projeto, permitindo que você se concentre mais na lógica de negócios do que em configurações complexas.

- **Ecossistema Abundante:** A vasta gama de módulos e bibliotecas no ecossistema Spring torna mais fácil integrar diversas funcionalidades ao projeto.

- **Suporte a Microsserviços:** Spring Boot oferece suporte robusto para arquiteturas de microsserviços, permitindo que você construa aplicativos escaláveis e modulares.

- **Spring Data e Spring Security:** A integração com Spring Data facilita a manipulação de dados, enquanto o Spring Security oferece recursos robustos para gerenciamento de autenticação e autorização.

Foi utilizado [Java 17](https://openjdk.java.net/projects/jdk/17/) e [Spring Boot 6](https://spring.io/projects/spring-boot) neste projeto para aproveitar essas vantagens e proporcionar aos desenvolvedores um ambiente de desenvolvimento moderno e eficiente.

## Todo feedback é bem-vindo

[LinkedIn - Daniel Figueiredo](https://www.linkedin.com/in/daniel-figueiredo-developer/)
