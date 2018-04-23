# Edukee JqAPI

Cliente jquery da API REST da plataforma de EAD Edukee

## Instalação

Instale pelo bower

```
bower install edukee-jqapi
```

```
<script src="bower_components/edukee-jqapi/dist/edukee-jqapi.min.js"></script>
```

O cliente depende de jquery, então essa biblioteca deve estar incluída no seu projeto antes do edukee jqapi

### Introdução

O cliente jquery implementa as requisições REST à API do Edukee e colhe os retornos que podem ser processados logo
após o retorno da API via callback na chamada ou via eventos.

Dessa forma você poderá colher o retorno da API usando isso

```
EdukeeAPI.metodo(token, [parâmetros], function(data) {
    // implemente aqui o corpo da callback de sucesso
}, function(data) {
    // implemente aqui o corpo da callback de erro
});
```

ou isso

```

$.on('edukee:algum_evento', function() {
    // implemente aqui o handler do vento
});


EdukeeAPI.metodo(token, [parâmetros]);
```

No caso de usar os eventos, você pode acessar o resultado das requisições (as que tem resultado) dentro
de  EdukeeAPI.results

### Uso


1 - Inicializando

```
EdukeeAPI.init();
```

2 - Verificando o token da API

via callback:

```
EdukeeAPI.testToken(token, function() {
    // sucesso
}, function(data) {
    // erro
    console.log('Falha ao testar as configurações: ' + data.msg);
});
```

via eventos:

```
$.on('edukee:token_test_success', function() {
    // deu certo 
});

$.on('edukee:token_test_error', function() {
    // deu erro. Veja o que está em EdukeeAPI.results.error para mais detalhes
    console.log('Falha ao testar as configurações: ' + EdukeeAPI.results.error.msg);
});

EdukeeAPI.testToken(token);
```


3 - Obtendo a lista de cursos ativos

via callback:

```
pagina = '';
tamanho_da_pagina = '';
busca = '';
ordenar = '';
EdukeeAPI.getCursos(token, pagina, tamanho_da_pagina, busca, ordenar, function(data) {
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
$.on('edukee:get_cursos_success', function() {
    // deu certo 
    for(var k in EdukeeAPI.results.cursos.datas) {
        // itere a lista de resultados
    }
});

$.on('edukee:get_cursos_error', function() {
    // deu erro. Veja o que está em EdukeeAPI.results.error para mais detalhes
    console.log('Erro: ' + EdukeeAPI.results.error.msg);
});

pagina = '';
tamanho_da_pagina = '';
busca = '';
ordenar = '';
EdukeeAPI.getCursos(token, pagina, tamanho_da_pagina, busca, ordenar);
```



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


