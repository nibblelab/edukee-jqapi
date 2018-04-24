
var EdukeeAPI = {
    endPoint: 'https://www.edukee.com.br/api',
    token: '',
    results: {
        error: {},
        cursos: [],
        curso: {},
        curso_img: {},
        turmas: [],
        turma: {},
        turma_img: {},
        turma_contrato: {},
        campos_inscricao: []
    },
    testToken: function(suc, err) {
        
        var url = EdukeeAPI.endPoint + '/integracao/test?token=' + EdukeeAPI.token; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeAPI.token);
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
    getCursos: function(page, pagesize, searchBy, orderBy, suc, err) {
        
        var pg = (page == undefined) ? '' : page;
        var ps = (pagesize == undefined) ? '' : pagesize;
        var sb = (searchBy == undefined) ? '' : searchBy;
        var ob = (orderBy == undefined) ? '' : orderBy;
        
        var url = EdukeeAPI.endPoint + '/cursos/all?page='+pg+'&pageSize='+ps+'&searchBy='+sb+
                        '&orderBy='+ob+'&stat=A'; 
                
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeAPI.token);
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
    getCursoImg: function(id, suc, err) {
        
        var nome = '';
        var curso_token = '';
        var file = '';
        for(var k in EdukeeAPI.results.cursos.datas) {
            if(EdukeeAPI.results.cursos.datas[k].id == id) {
                nome = EdukeeAPI.results.cursos.datas[k].nome;
                curso_token = EdukeeAPI.results.cursos.datas[k].token;
                file = EdukeeAPI.results.cursos.datas[k].imagem;
                break;
            }
        }
        
        if(nome == '' || curso_token == '' || file == '') {
            // tente no curso carregado 
            if(EdukeeAPI.results.curso.id == id) {
                nome = EdukeeAPI.results.curso.nome;
                curso_token = EdukeeAPI.results.curso.token;
                file = EdukeeAPI.results.curso.imagem;
            }
        }
        
        if(nome == '' || curso_token == '' || file == '') {
            var error = {
                status: 'no',
                msg: 'Não consegui achar o curso na listagem'
            };
            EdukeeAPI.results.error = error;
            jQuery(document).trigger("edukee:get_curso_img_error");
            if(err != undefined) {
                err(error);
            }
            
            return;
        }
        
        var url = EdukeeAPI.endPoint + '/download.php?isAPI=true&tipo=curso_logo'+
                '&nome='+nome+'&id='+id+'&curso='+curso_token+'&file='+file; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeAPI.token);
            },
            url: url,
            success: function(data){        
                if(data.status == 'ok') {
                    EdukeeAPI.results.curso_img = data;
                    jQuery(document).trigger("edukee:get_curso_img_success");
                    if(suc != undefined) {
                        suc(data);
                    }
                }
                else {
                    EdukeeAPI.results.error = data;
                    jQuery(document).trigger("edukee:get_curso_img_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeAPI.results.error = data;
                jQuery(document).trigger("edukee:get_curso_img_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getCurso: function(id, suc, err) {
        
        for(var k in EdukeeAPI.results.cursos.datas) {
            if(EdukeeAPI.results.cursos.datas[k].id == id) {
                EdukeeAPI.results.curso = EdukeeAPI.results.cursos.datas[k];
                jQuery(document).trigger("edukee:get_curso_success");
                if(suc != undefined) {
                    suc(EdukeeAPI.results.cursos.datas[k]);
                }
                return;
            }
        }
        
        var url = EdukeeAPI.endPoint + '/cursos/me?id='+id; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeAPI.token);
            },
            url: url,
            success: function(data){        
                if(data.status == 'ok') {
                    EdukeeAPI.results.curso = data.datas;
                    jQuery(document).trigger("edukee:get_curso_success");
                    if(suc != undefined) {
                        suc(data.datas);
                    }
                }
                else {
                    EdukeeAPI.results.error = data;
                    jQuery(document).trigger("edukee:get_curso_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeAPI.results.error = data;
                jQuery(document).trigger("edukee:get_curso_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getTurmas: function(curso_id, page, pagesize, searchBy, orderBy, suc, err) {
        
        var pg = (page == undefined) ? '' : page;
        var ps = (pagesize == undefined) ? '' : pagesize;
        var sb = (searchBy == undefined) ? '' : searchBy;
        var ob = (orderBy == undefined) ? '' : orderBy;
        
        var url = EdukeeAPI.endPoint + '/turmas/all?page='+pg+'&pageSize='+ps+'&searchBy='+sb+
                        '&orderBy='+ob+'&curso='+curso_id+'&inscricaoAtiva=A'; 
                
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeAPI.token);
            },
            url: url,
            success: function(data){        
                if(data.status == 'ok') {
                    EdukeeAPI.results.turmas = data;
                    jQuery(document).trigger("edukee:get_turmas_success");
                    if(suc != undefined) {
                        suc(data);
                    }
                }
                else {
                    EdukeeAPI.results.error = data;
                    jQuery(document).trigger("edukee:get_turmas_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeAPI.results.error = data;
                jQuery(document).trigger("edukee:get_turmas_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
        
    },
    getTurmaImg: function(id, suc, err) {
        
        var nome = '';
        var curso_token = '';
        var turma_token = '';
        var file = '';
        for(var k in EdukeeAPI.results.turmas.datas) {
            if(EdukeeAPI.results.turmas.datas[k].id == id) {
                nome = EdukeeAPI.results.turmas.datas[k].nome;
                curso_token = EdukeeAPI.results.turmas.datas[k].curso_token;
                turma_token = EdukeeAPI.results.turmas.datas[k].token;
                file = EdukeeAPI.results.turmas.datas[k].flyer;
                break;
            }
        }
        
        if(nome == '' || curso_token == '' || turma_token == '' || file == '') {
            // tente no curso carregado 
            if(EdukeeAPI.results.turma.id == id) {
                nome = EdukeeAPI.results.turma.nome;
                curso_token = EdukeeAPI.results.turma.curso_token;
                turma_token = EdukeeAPI.results.turma.token;
                file = EdukeeAPI.results.turma.flyer;
            }
        }
        
        if(nome == '' || curso_token == '' || turma_token == '' || file == '') {
            var error = {
                status: 'no',
                msg: 'Não consegui achar a turma na listagem'
            };
            EdukeeAPI.results.error = error;
            jQuery(document).trigger("edukee:get_turma_img_error");
            if(err != undefined) {
                err(error);
            }
            
            return;
        }
        
        var url = EdukeeAPI.endPoint + '/download.php?isAPI=true&tipo=turma_logo'+
                '&nome='+nome+'&id='+id+'&turma='+turma_token+'&curso='+curso_token+'&file='+file; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeAPI.token);
            },
            url: url,
            success: function(data){        
                if(data.status == 'ok') {
                    EdukeeAPI.results.turma_img = data;
                    jQuery(document).trigger("edukee:get_turma_img_success");
                    if(suc != undefined) {
                        suc(data);
                    }
                }
                else {
                    EdukeeAPI.results.error = data;
                    jQuery(document).trigger("edukee:get_turma_img_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeAPI.results.error = data;
                jQuery(document).trigger("edukee:get_turma_img_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getTurma: function(id, suc, err) {
        
        for(var k in EdukeeAPI.results.turmas.datas) {
            if(EdukeeAPI.results.turmas.datas[k].id == id) {
                EdukeeAPI.results.turma = EdukeeAPI.results.turmas.datas[k];
                jQuery(document).trigger("edukee:get_turma_success");
                if(suc != undefined) {
                    suc(EdukeeAPI.results.turmas.datas[k]);
                }
                return;
            }
        }
        
        var url = EdukeeAPI.endPoint + '/turmas/me?id='+id; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeAPI.token);
            },
            url: url,
            success: function(data){        
                if(data.status == 'ok') {
                    EdukeeAPI.results.turma = data.datas;
                    jQuery(document).trigger("edukee:get_turma_success");
                    if(suc != undefined) {
                        suc(data.datas);
                    }
                }
                else {
                    EdukeeAPI.results.error = data;
                    jQuery(document).trigger("edukee:get_turma_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeAPI.results.error = data;
                jQuery(document).trigger("edukee:get_turma_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getTurmaContrato: function(id, suc, err) {
        
        var nome = '';
        var curso_token = '';
        var turma_token = '';
        var file = '';
        for(var k in EdukeeAPI.results.turmas.datas) {
            if(EdukeeAPI.results.turmas.datas[k].id == id) {
                nome = EdukeeAPI.results.turmas.datas[k].nome;
                curso_token = EdukeeAPI.results.turmas.datas[k].curso_token;
                turma_token = EdukeeAPI.results.turmas.datas[k].token;
                file = EdukeeAPI.results.turmas.datas[k].contrato;
                break;
            }
        }
        
        if(nome == '' || curso_token == '' || turma_token == '' || file == '') {
            // tente no curso carregado 
            if(EdukeeAPI.results.turma.id == id) {
                nome = EdukeeAPI.results.turma.nome;
                curso_token = EdukeeAPI.results.turma.curso_token;
                turma_token = EdukeeAPI.results.turma.token;
                file = EdukeeAPI.results.turma.contrato;
            }
        }
        
        if(nome == '' || curso_token == '' || turma_token == '' || file == '') {
            var error = {
                status: 'no',
                msg: 'Não consegui achar a turma na listagem'
            };
            EdukeeAPI.results.error = error;
            jQuery(document).trigger("edukee:get_turma_contrato_error");
            if(err != undefined) {
                err(error);
            }
            
            return;
        }
        
        var url = EdukeeAPI.endPoint + '/download.php?isAPI=true&tipo=turma_contrato'+
                '&nome='+nome+'&id='+id+'&turma='+turma_token+'&curso='+curso_token+'&file='+file; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeAPI.token);
            },
            url: url,
            success: function(data){        
                if(data.status == 'ok') {
                    EdukeeAPI.results.turma_contrato = data;
                    jQuery(document).trigger("edukee:get_turma_contrato_success");
                    if(suc != undefined) {
                        suc(data);
                    }
                }
                else {
                    EdukeeAPI.results.error = data;
                    jQuery(document).trigger("edukee:get_turma_contrato_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeAPI.results.error = data;
                jQuery(document).trigger("edukee:get_turma_contrato_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getInscricaoForm: function(curso_id, suc, err) {
        
        for(var k in EdukeeAPI.results.cursos.datas) {
            if(EdukeeAPI.results.cursos.datas[k].id == curso_id) {
                EdukeeAPI.results.campos_inscricao = jQuery.parseJSON(EdukeeAPI.results.cursos.datas[k].campos_inscricao);
            }
        }
        
        if(EdukeeAPI.results.campos_inscricao.length == 0) {
            if(!jQuery.isEmptyObject(EdukeeAPI.results.curso)) {
                EdukeeAPI.results.campos_inscricao = jQuery.parseJSON(EdukeeAPI.results.curso.campos_inscricao);
            }
        }
        
        if(EdukeeAPI.results.campos_inscricao.length > 0) {
            jQuery(document).trigger("edukee:get_inscricao_form_success");
            if(suc != undefined) {
                suc(EdukeeAPI.results.campos_inscricao);
            }
            return;
        }
        
        var url = EdukeeAPI.endPoint + '/cursos/me?id='+curso_id; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeAPI.token);
            },
            url: url,
            success: function(data){        
                if(data.status == 'ok') {
                    EdukeeAPI.results.campos_inscricao = jQuery.parseJSON(data.datas.campos_inscricao);
                    jQuery(document).trigger("edukee:get_inscricao_form_success");
                    if(suc != undefined) {
                        suc(EdukeeAPI.results.campos_inscricao);
                    }
                }
                else {
                    EdukeeAPI.results.error = data;
                    jQuery(document).trigger("edukee:get_inscricao_form_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeAPI.results.error = data;
                jQuery(document).trigger("edukee:get_inscricao_form_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    doInscricao: function(curso_id, turma_id, campos, suc, err) {
        // busque os campos de inscrição do curso
        EdukeeAPI.getInscricaoForm(curso_id, function(campos_inscricao) {
            var campos_to_send = {};
            for(var k in campos_inscricao) {
                campos_to_send[campos_inscricao[k].field] = '';
            }
            
            campos_to_send['curso'] = curso_id;
            campos_to_send['turma'] = turma_id;
            campos_to_send['modulos'] = '';
            campos_to_send['disciplinas'] = '';
            campos_to_send['aulas'] = '';
            
            for(var k in campos) {
                if(campos_to_send.hasOwnProperty(campos[k].field)) {
                    campos_to_send[campos[k].field] = campos[k].value;
                }
            }
            
            var url = EdukeeAPI.endPoint + '/inscricao/inscrevame'; 
            jQuery.ajax({ 
                type: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "token=" + EdukeeAPI.token);
                },
                url: url,
                data: JSON.stringify(campos_to_send),
                contentType: "application/json; charset=utf-8",
                success: function(data){        
                    if(data.status == 'ok') {
                        jQuery(document).trigger("edukee:do_inscricao_success");
                        if(suc != undefined) {
                            suc();
                        }
                    }
                    else {
                        EdukeeAPI.results.error = data;
                        jQuery(document).trigger("edukee:do_inscricao_error");
                        if(err != undefined) {
                            err(data);
                        }
                    }
                },
                error: function(data){   
                    EdukeeAPI.results.error = data;
                    jQuery(document).trigger("edukee:do_inscricao_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            });
            
        }, 
        function(data) {
            EdukeeAPI.results.error = data;
            jQuery(document).trigger("edukee:do_inscricao_error");
            if(err != undefined) {
                err(data);
            }
        });
        
    },
    init: function(token) {
        
        EdukeeAPI.token = token;
        
        console.log('*** Edukee API loaded *** ');
        
    }
};
