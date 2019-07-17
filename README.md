# Edukee JqAPI

SDK jquery da API REST da plataforma de EAD Edukee

## Instalação

Instale pelo bower

```
bower install edukee-jqapi
```

```
<script src="bower_components/edukee-jqapi/dist/edukee-jqapi.min.js"></script>
```

O SDK depende do jquery, então essa biblioteca deve estar incluída no seu projeto antes do SDK.

## Introdução

O SDK jquery implementa as requisições REST à API do Edukee e colhe os retornos que podem ser processados logo
após o retorno da API via callback ou via eventos.

Dessa forma você poderá colher o retorno da API, por esta forma:

```
EdukeeSDK.metodo(token, [parâmetros], function(data) {
    // implemente aqui o corpo da callback de sucesso
}, function(data) {
    // implemente aqui o corpo da callback de erro
});
```

ou esta:

```

$(document).on('edukee:algum_evento', function() {
    // implemente aqui o handler do vento
});


EdukeeSDK.metodo(token, [parâmetros]);
```

No caso de usar os eventos, você pode acessar o resultado das requisições (as que tem resultado) dentro
de  EdukeeSDK.results

## Uso


### Inicializando


Inicialize o SDK com o token da sua instituição, para obter o token da API

via callback:

```
EdukeeSDK.init(token_instituicao, function() {
    // sucesso
}, function(data) {
    // erro
    console.log('Falha ao inicializar o SDK: ' + data.msg);
});
```

via eventos:

```
$(document).on('edukee:login_instituicao_success', function() {
    // deu certo 
});

$(document).on('edukee:login_instituicao_error', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Falha ao inicializar o SDK: ' + EdukeeSDK.results.error.msg);
});

EdukeeSDK.init(token_instituicao);
```

Uma vez que o SDK está inicializado é possível executar as demais operações providas na API


### Verificando o token da API


via callback:

```
EdukeeSDK.testToken(function() {
    // sucesso
}, function(data) {
    // erro
    console.log('Falha ao testar as configurações: ' + data.msg);
});
```

via eventos:

```
$(document).on('edukee:token_test_success', function() {
    // deu certo 
});

$(document).on('edukee:token_test_error', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Falha ao testar as configurações: ' + EdukeeSDK.results.error.msg);
});

EdukeeSDK.testToken();
```

### Obtendo a lista de cursos ativos

via callback:

```
pagina = '';
tamanho_da_pagina = '';
busca = '';
ordenar = '';
EdukeeSDK.getCursos(pagina, tamanho_da_pagina, busca, ordenar, function(data) {
    // sucesso
    for(var k in data.datas) {
        // itere a lista de resultados
    }
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```

via eventos:

```
$(document).on('edukee:get_cursos_success', function() {
    // deu certo 
    for(var k in EdukeeSDK.results.cursos.datas) {
        // itere a lista de resultados
    }
});

$(document).on('edukee:get_cursos_error', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Erro: ' + EdukeeSDK.results.error.msg);
});

pagina = '';
tamanho_da_pagina = '';
busca = '';
ordenar = '';
EdukeeSDK.getCursos(pagina, tamanho_da_pagina, busca, ordenar);
```

### Obtendo os dados de um curso por seu id

via callback: 

```
EdukeeSDK.getCurso(curso_id, function(data) {
    // sucesso
    
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});

```

via eventos:

```
$(document).on('edukee:get_curso_success', function() {
    // deu certo - dados em EdukeeSDK.results.curso
});

$(document).on('edukee:get_curso_error', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Erro: ' + EdukeeSDK.results.error.msg);
});

EdukeeSDK.getCurso(curso_id);

```

### Obtendo a imagem de um curso

via callback: 

```
EdukeeSDK.getCursoImg(curso_id, function(img) {
    // deu certo
}, function(err) {
    // deu erro
    console.log(err);
});
```

via eventos:

```
$(document).on('edukee:get_curso_img_success', function() {
    // deu certo - dados em EdukeeSDK.results.curso_img
});

$(document).on('edukee:get_curso_img_error', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Erro: ' + EdukeeSDK.results.error.msg);
});

EdukeeSDK.getCursoImg(curso_id);

```

### Obtendo as turmas de um curso

via callback:

```
pagina = '';
tamanho_da_pagina = '';
busca = '';
ordenar = '';
EdukeeSDK.getTurmas(curso_id, pagina, tamanho_da_pagina, busca, ordenar, function(data) {
    // deu certo
    for(var k in data.datas) {
        // itere a lista de resultados
    }
}, function(err) {
    // deu erro
    console.log(err);
});
```

via eventos:

```
$(document).on('edukee:get_turmas_success', function() {
    // deu certo - dados em EdukeeSDK.results.turmas
    for(var k in EdukeeSDK.results.turmas.datas) {
        // itere a lista de resultados
    }
});

$(document).on('edukee:get_turmas_error', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Erro: ' + EdukeeSDK.results.error.msg);
});

EdukeeSDK.getTurmas(curso_id, pagina, tamanho_da_pagina, busca, ordenar);

```

### Obtendo os dados de uma turma por seu id

via callback: 

```
EdukeeSDK.getTurma(turma_id, function(data) {
    // sucesso
    
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});

```

via eventos:

```
$(document).on('edukee:get_turma_success', function() {
    // deu certo - dados em EdukeeSDK.results.turma
});

$(document).on('edukee:get_turma_error"', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Erro: ' + EdukeeSDK.results.error.msg);
});

EdukeeSDK.getTurma(turma_id);

```

### Obtendo a imagem de uma turma

via callback: 

```
EdukeeSDK.getTurmaImg(turma_id, function(img) {
    // deu certo
}, function(err) {
    // deu erro
    console.log(err);
});
```

via eventos:

```
$(document).on('edukee:get_turma_img_success', function() {
    // deu certo - dados em EdukeeSDK.results.turma_img
});

$(document).on('edukee:get_turma_img_error', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Erro: ' + EdukeeSDK.results.error.msg);
});

EdukeeSDK.getTurmaImg(turma_id);

```

### Obtendo o contrato de uma turma

via callback: 

```
EdukeeSDK.getTurmaContrato(turma_id, function(contrato) {
    // deu certo
}, function(err) {
    // deu erro
    console.log(err);
});
```

via eventos:

```
$(document).on('edukee:get_turma_contrato_success', function() {
    // deu certo - dados em EdukeeSDK.results.turma_contrato
});

$(document).on('edukee:get_turma_contrato_error', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Erro: ' + EdukeeSDK.results.error.msg);
});

EdukeeSDK.getTurmaContrato(turma_id);

```

### Obtendo o formulário de inscrição de um curso

A API Edukee usa formulários dinâmicos para as inscrições. Por conta disso, o próprio Edukee fornece
os campos que devem conter no formulário de inscrição, para depois receber de volta o mesmo formulário
preenchido. Esse método descrito aqui é para obter do Edukee o formulário de inscrições

via callback:

```
EdukeeSDK.getInscricaoForm(curso_id, function(formulario) {
    // deu certo - formulario é um array
}, function(err) {
    // deu erro
    console.log(err);
});
```

via eventos:

```
$(document).on('edukee:get_inscricao_form_success', function() {
    // deu certo - dados em EdukeeSDK.results.campos_inscricao
});

$(document).on('edukee:get_inscricao_form_error', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Erro: ' + EdukeeSDK.results.error.msg);
});

EdukeeSDK.getInscricaoForm(curso_id);
```

Em ambos os casos, o formulário é um array no seguinte padrão:

```
formulario = [
    { 
        field: "nome", // nome do campo - não deve ser alterado
        label: "Nome", // label do campo para a interface - pode alterar se precisar
        type: "text",  // tipo do campo
        necessary: true,  // se é ou não um campo necessário
        oblige: true, // se é ou não um campo obrigatório
        checked: true // se o campo foi selecionado ou não para aparecer no formulário
    }
];
```

Os tipos possíveis para o campo são:

**text** - texto genérico  
**year** - informação de ano. Ex: 1988  
**date** - informação de data no padrão DD/MM/YYYY. Ex: 22/07/1988  
**email** - informação de e-mail  
**password** - senha. Deve ter pelo menos 6 caracteres e conter caracteres maiúsculos, minúsculos, números e caracteres especiais como @,!,#  
**cpf** - CPF no formato 999.999.999-99  
**sex** - campo de seleção para: M - Masculino; F - Feminino  
**uf** - campo de seleção para as unidades federativas do Brasil  
**cep** - CEP no formato 99.999-999  
**marital** - campo de seleção para: SOL - Solteiro(a); CAS - Casado(a); DIV - Divorciado(a); VIU - Viúvo(a)  
**phone** - campo de telefone no formato (99) 9999-9999  
**cellphone** - campo de celular no formato (99) 9 9999-9999

O Edukee usa esses tipos para validar os dados enviados pelos usuários

Um campo marcado como **necessary** será obrigatóriamente cobrado pelo Edukee. Então campos assim **devem** ser enviados
preenchidos para o Edukee ou o mesmo acusará erro

Um campo marcado como **oblige** é um campo não necessário que foi marcado como obrigatório pelo usuário que configurou
o formulário de inscrição. O comportamento é parecido com o do necessary, com a diferença que a obrigatoriedade nesse
caso foi definida pela instituição usuária do Edukee e não pelo Edukee em si.

Um campo marcado como **checked** foi selecionado pelo usuário que configurou o formulário de inscrição para compor o formulário,
porém tem seu preenchimento opcional. 

### Enviando o formulário de inscrição preenchido

A partir do formulário obtido no método anterior e após o usuário preenche-lo na interface, esse método
serve para enviar o formulário preenchido de volta para o Edukee realizar a inscrição.

O formulário preenchido é passado para o método no parâmetro "campos", no formato:

```
campos = [
    { 
        field: "", // nome do campo como obtido na propriedade field durante o método anterior
        value: "" // valor do campo obtido da interface
    }
];
```

via callback:

```
EdukeeSDK.doInscricao(curso_id, turma_id, campos, function() {
    // deu certo
}, function(err) {
    // deu erro
    console.log(err);
});
```

via eventos:

```
$(document).on('edukee:do_inscricao_success', function() {
    // deu certo 
});

$(document).on('edukee:do_inscricao_error', function() {
    // deu erro. Veja o que está em EdukeeSDK.results.error para mais detalhes
    console.log('Erro: ' + EdukeeSDK.results.error.msg);
});

EdukeeSDK.doInscricao(curso_id, turma_id, campos);
```

No retorno de erros desse método há um campo adicional, o **errors** que é um array com os erros
verificados na validação dos dados enviados pelo usuário no formulário. Você pode iterar sobre ele
para compor uma resposta mais amigável ao usuário. 

Existe nesse caso um marcador para indicar o nome do campo como especificado no label (obtido no método anterior):

```
<field>Label do Campo</field>
```

Substitua o marcador pelo que considerar mais adequado

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


