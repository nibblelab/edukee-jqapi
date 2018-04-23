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

O cliente depende de jquery, então essa lib deve estar incluída no seu projeto antes do edukee jqapi

### Uso


1 - Inicializando

```
EdukeeAPI.init();
```

2 - Verificando o token da API

```
EdukeeAPI.testToken(token, function(data) {
    // sucesso
}, function(data) {
    // erro
    console.log('Falha ao testar as configurações: ' + data.msg);
});
```

3 - Obtendo a lista de cursos ativos

```
pagina = '';
tamanho_da_pagina = '';
busca = '';
ordenar = '';
EdukeeAPI.getCursos(token, pagina, tamanho_da_pagina, busca, ordenar, function(data) {
    // sucesso
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


