PROJETO DA DISCIPLINA DE FUNDAMENTOS DE SISTEMAS WEB PUCRS 
Fundamentos de Sistemas Web - Fase 1
Nome do estudante: Jonathan Justo Azevedo

FASE 1 - OBJETIVO:

• O objetivo desse sistema web é permitir que os usuários possam comprar produtos e serviços de um comércio online.
• Os produtos devem ser subdivididos em três categorias, deve haver pelo menos dois produtos por categoria.
• Os serviços oferecidos incluem: retirada no local e tele-entrega.
• Criar um menu superior (header) com links para as páginas principais: Início, Sobre e Contato.
• Desenvolver um rodapé (footer) com informações de contato, autoria e links adicionais, mantendo o padrão em todas as páginas.
• Dividir o site em páginas separadas para cada categoria de produto, serviços e informações institucionais, como Sobre e Contato.
• Apresentar os produtos de forma simples, com imagem, descrição e preço.
• Criar links para adicionar produtos ao carrinho usando apenas HTML, com parâmetros básicos.
• Manter a estrutura do site uniforme em todas as páginas, garantindo uma navegação consistente e intuitiva.
Metas
• Criação do Header e Footer: O header foi usado para navegação e foi replicado em todas as páginas.O footer foi criado para mostrar informações úteis e foi reutilizado em todas as páginas.
• Criação de menus :O menu superior leva às páginas principais, enquanto o menu de categorias facilita o acesso às categorias de produtos e serviços.
• Páginas distintas: Cada categoria, os serviços, e as informações sobre o minimercado foram organizados em páginas distintas, adotando o sistema Multi Page.
• Produtos: Foram inseridos dois produtos por categoria no layout conforme objetivo do projeto.

FASE 2  - OBJETIVO:

•	Utilização de CSS/Bootstrap (carrossel) e uso de JavaScript: objetivo é tornar o sistema web mais atrativo e dinâmico (carrossel, funções temporais, etc..)
- Foi implementado layout com containers bootstrap alem de template visual utilizando biblioteca de icones.

•	Formulário de cadastro do cliente: elabore um formulário contendo os dados de identificação do cliente, tais como: nome, endereço, CPF, sexo, telefone, e-mail, etc.. Utilize elementos variados no formulário e atributos, como: input, check box, number, e-mail, radio button, placeholder, campos obrigatórios
- Foi incluida uma pagina de cadastro com validação dos campos no jS

•	Escolha do serviço: o minimercado tem 2 duas formas de agendamento, retirada no local ou opção para tele-entrega. Deve-se usar calendário para definir o dia e horário de agendamento de entrega ou retirada. 
- Foi implementada a pagina de carrinho de compras onde o usuario pode escolher a forma de entrega de maneira dinamica e indicar o endereço. alem disso há link para o carrinho e link indicando que a forma de entrega configura-se no carrinho em todas as paginas de produtos.

•	Acessibilidade: adaptar o sistema web do minimercado desenvolvido na fase 1 para atender pelo menos um requisito de acessibilidade para deficientes visuais. Exemplo: uso do atributo “alt” para a audiodescrição de imagens.
-Atributos de acessibilidade adicionados:
-alt em todas as imagens com descrições claras
-aria-label em links e botões importantes para descrever sua função
-aria-hidden="true" em ícones decorativos que não precisam ser lidos por leitores de tela
-title no iframe do mapa para descrever seu conteúdo

OBS: Os itens que estão no carrinho são ficticios e nãop foi desenvolvida a funcionalidade para adicionar ou remover itens 
do carrinho pois não era o objetivo fundamental da disciplina. 
