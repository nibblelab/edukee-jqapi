
var EdukeeAPI = {
    endPoint: 'https://www.edukee.com.br/api',
    results: {
        error: {},
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
                    jQuery(document).trigger("edukee:token_test_success");
                    if(suc != undefined) {
                        suc();
                    }
                }
                else {
                    EdukeeAPI.results.error = data;
                    jQuery(document).trigger("edukee:token_test_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){ 
                EdukeeAPI.results.error = data;
                jQuery(document).trigger("edukee:token_test_error");
                if(err != undefined) {
                    err(data);
                }
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
                    EdukeeAPI.results.cursos = data;
                    jQuery(document).trigger("edukee:get_cursos_success");
                    if(suc != undefined) {
                        suc(data);
                    }
                }
                else {
                    EdukeeAPI.results.error = data;
                    jQuery(document).trigger("edukee:get_cursos_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeAPI.results.error = data;
                jQuery(document).trigger("edukee:get_cursos_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
        
    },
    init: function() {
        console.log('*** Edukee API loaded *** ');
        
    }
};
