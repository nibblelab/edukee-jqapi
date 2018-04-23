
var EdukeeAPI = {
    endPoint: 'https://www.edukee.com.br/api',
    results: {
        cursos: [],
        curso: {},
        campos_inscricao: []
    },
    testToken: function(token, suc, err) {
        var url = EdukeeAPI.endPoint + '/integracao/test?token=' + token; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + token);
            },
            url: url,
            success: function(data){        
                if(data.status == 'ok') {
                    suc();
                }
                else {
                    err(data);
                }
            },
            error: function(data){        
                err(data);
            }
        });
    },
    getCursos: function(token, page, pagesize, searchBy, orderBy, suc, err) {
        
        var pg = (page == undefined) ? '' : page;
        var ps = (pagesize == undefined) ? '' : pagesize;
        var sb = (searchBy == undefined) ? '' : searchBy;
        var ob = (orderBy == undefined) ? '' : orderBy;
        
        var url = EdukeeAPI.endPoint + '/cursos/all?page='+pg+'&pageSize='+ps+'&searchBy='+sb+
                        '&orderBy='+ob+'&stat=A'; 
                
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + token);
            },
            url: url,
            success: function(data){        
                if(data.status == 'ok') {
                    EdukeeAPI.results.cursos = data.datas;
                    suc(data);
                }
                else {
                    err(data);
                }
            },
            error: function(data){        
                err(data);
            }
        });
        
    },
    init: function() {
        console.log('*** Edukee API loaded *** ');
        
    }
};
