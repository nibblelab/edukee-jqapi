
var EdukeeSDK = {
    endPoint: 'https://www.edukee.com.br/api',
    token: '',
    token_instituicao: '',
    __initialized: false,
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
    emitSDKInitErr: function(err, err_signal) {
        var error = {
            status: 'no',
            success: false,
            msg: 'O SDK não está inicializado!'
        };
        EdukeeSDK.results.error = error;
        jQuery(document).trigger(err_signal);
        if(err != undefined) {
            err(error);
        }
    },
    testToken: function(suc, err) {
        
        if(!EdukeeSDK.__initialized) {
            EdukeeSDK.emitSDKInitErr(err, "edukee:token_test_error");
            return;
        }
        
        var url = EdukeeSDK.endPoint + '/integracao/test?token=' + EdukeeSDK.token; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeSDK.token);
            },
            url: url,
            success: function(data){        
                if(data.success) {
                    jQuery(document).trigger("edukee:token_test_success");
                    if(suc != undefined) {
                        suc();
                    }
                }
                else {
                    EdukeeSDK.results.error = data;
                    jQuery(document).trigger("edukee:token_test_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){ 
                EdukeeSDK.results.error = data;
                jQuery(document).trigger("edukee:token_test_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getCursos: function(page, pagesize, searchBy, orderBy, suc, err) {
        
        if(!EdukeeSDK.__initialized) {
            EdukeeSDK.emitSDKInitErr(err, "edukee:get_cursos_error");
            return;
        }
        
        var pg = (page == undefined) ? '' : page;
        var ps = (pagesize == undefined) ? '' : pagesize;
        var sb = (searchBy == undefined) ? '' : searchBy;
        var ob = (orderBy == undefined) ? '' : orderBy;
        
        var url = EdukeeSDK.endPoint + '/cursos/all?page='+pg+'&pageSize='+ps+'&searchBy='+sb+
                        '&orderBy='+ob+'&stat=A'; 
                
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "token=" + EdukeeSDK.token);
            },
            url: url,
            contentType: "application/json; charset=utf-8",
            success: function(data){        
                if(data.success) {
                    EdukeeSDK.results.cursos = data.datas;
                    jQuery(document).trigger("edukee:get_cursos_success");
                    if(suc != undefined) {
                        suc(data.datas);
                    }
                }
                else {
                    EdukeeSDK.results.error = data;
                    jQuery(document).trigger("edukee:get_cursos_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeSDK.results.error = data;
                jQuery(document).trigger("edukee:get_cursos_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
        
    },
    getCursoImg: function(id, suc, err) {
        
        if(!EdukeeSDK.__initialized) {
            EdukeeSDK.emitSDKInitErr(err, "edukee:get_curso_img_error");
            return;
        }
        
        var nome = '';
        var curso_token = '';
        var file = '';
        
        // procure nos cursos já carregados
        for(var k in EdukeeSDK.results.cursos) {
            if(EdukeeSDK.results.cursos[k].id == id) {
                nome = EdukeeSDK.results.cursos[k].nome;
                curso_token = EdukeeSDK.results.cursos[k].token;
                file = EdukeeSDK.results.cursos[k].imagem;
                break;
            }
        }
        
        if(nome == '' || curso_token == '' || file == '') {
            // tente no curso carregado 
            if(EdukeeSDK.results.curso.id == id) {
                nome = EdukeeSDK.results.curso.nome;
                curso_token = EdukeeSDK.results.curso.token;
                file = EdukeeSDK.results.curso.imagem;
            }
        }
        
        if(nome == '' || curso_token == '' || file == '') {
            var error = {
                status: 'no',
                success: false,
                msg: 'Não consegui achar o curso na listagem'
            };
            EdukeeSDK.results.error = error;
            jQuery(document).trigger("edukee:get_curso_img_error");
            if(err != undefined) {
                err(error);
            }
            
            return;
        }
        
        var url = EdukeeSDK.endPoint + '/download.php?isAPI=true&tipo=curso_logo'+
                '&nome='+nome+'&id='+id+'&curso='+curso_token+'&file='+file; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeSDK.token);
            },
            url: url,
            success: function(data){        
                if(data.success) {
                    EdukeeSDK.results.curso_img = data;
                    jQuery(document).trigger("edukee:get_curso_img_success");
                    if(suc != undefined) {
                        suc(data);
                    }
                }
                else {
                    EdukeeSDK.results.error = data;
                    jQuery(document).trigger("edukee:get_curso_img_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeSDK.results.error = data;
                jQuery(document).trigger("edukee:get_curso_img_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getCurso: function(id, suc, err) {
        
        if(!EdukeeSDK.__initialized) {
            EdukeeSDK.emitSDKInitErr(err, "edukee:get_curso_error");
            return;
        }
        
        /* procure primeiro nos já buscados */
        for(var k in EdukeeSDK.results.cursos) {
            if(EdukeeSDK.results.cursos[k].id == id) {
                EdukeeSDK.results.curso = EdukeeSDK.results.cursos[k];
                jQuery(document).trigger("edukee:get_curso_success");
                if(suc != undefined) {
                    suc(EdukeeSDK.results.cursos[k]);
                }
                return;
            }
        }
        
        /* se não achou, procure na API */
        var url = EdukeeSDK.endPoint + '/cursos/me?id='+id; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeSDK.token);
            },
            url: url,
            success: function(data){        
                if(data.success) {
                    EdukeeSDK.results.curso = data.datas;
                    jQuery(document).trigger("edukee:get_curso_success");
                    if(suc != undefined) {
                        suc(data.datas);
                    }
                }
                else {
                    EdukeeSDK.results.error = data;
                    jQuery(document).trigger("edukee:get_curso_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeSDK.results.error = data;
                jQuery(document).trigger("edukee:get_curso_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getTurmas: function(curso_id, page, pagesize, searchBy, orderBy, suc, err) {
        
        if(!EdukeeSDK.__initialized) {
            EdukeeSDK.emitSDKInitErr(err, "edukee:get_turmas_error");
            return;
        }
        
        var pg = (page == undefined) ? '' : page;
        var ps = (pagesize == undefined) ? '' : pagesize;
        var sb = (searchBy == undefined) ? '' : searchBy;
        var ob = (orderBy == undefined) ? '' : orderBy;
        
        var url = EdukeeSDK.endPoint + '/turmas/all?page='+pg+'&pageSize='+ps+'&searchBy='+sb+
                        '&orderBy='+ob+'&curso='+curso_id+'&inscricaoAtiva=A'; 
                
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeSDK.token);
            },
            url: url,
            success: function(data){        
                if(data.success) {
                    EdukeeSDK.results.turmas = data.datas;
                    jQuery(document).trigger("edukee:get_turmas_success");
                    if(suc != undefined) {
                        suc(data.datas);
                    }
                }
                else {
                    EdukeeSDK.results.error = data;
                    jQuery(document).trigger("edukee:get_turmas_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeSDK.results.error = data;
                jQuery(document).trigger("edukee:get_turmas_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
        
    },
    getTurmaImg: function(id, suc, err) {
        
        if(!EdukeeSDK.__initialized) {
            EdukeeSDK.emitSDKInitErr(err, "edukee:get_turma_img_error");
            return;
        }
        
        var nome = '';
        var curso_token = '';
        var turma_token = '';
        var file = '';
        for(var k in EdukeeSDK.results.turmas) {
            if(EdukeeSDK.results.turmas[k].id == id) {
                nome = EdukeeSDK.results.turmas[k].nome;
                curso_token = EdukeeSDK.results.turmas[k].curso_token;
                turma_token = EdukeeSDK.results.turmas[k].token;
                file = EdukeeSDK.results.turmas[k].flyer;
                break;
            }
        }
        
        if(nome == '' || curso_token == '' || turma_token == '' || file == '') {
            // tente no curso carregado 
            if(EdukeeSDK.results.turma.id == id) {
                nome = EdukeeSDK.results.turma.nome;
                curso_token = EdukeeSDK.results.turma.curso_token;
                turma_token = EdukeeSDK.results.turma.token;
                file = EdukeeSDK.results.turma.flyer;
            }
        }
        
        if(nome == '' || curso_token == '' || turma_token == '' || file == '') {
            var error = {
                status: 'no',
                msg: 'Não consegui achar a turma na listagem'
            };
            EdukeeSDK.results.error = error;
            jQuery(document).trigger("edukee:get_turma_img_error");
            if(err != undefined) {
                err(error);
            }
            
            return;
        }
        
        var url = EdukeeSDK.endPoint + '/download.php?isAPI=true&tipo=turma_logo'+
                '&nome='+nome+'&id='+id+'&turma='+turma_token+'&curso='+curso_token+'&file='+file; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeSDK.token);
            },
            url: url,
            success: function(data){        
                if(data.success) {
                    EdukeeSDK.results.turma_img = data;
                    jQuery(document).trigger("edukee:get_turma_img_success");
                    if(suc != undefined) {
                        suc(data);
                    }
                }
                else {
                    EdukeeSDK.results.error = data;
                    jQuery(document).trigger("edukee:get_turma_img_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeSDK.results.error = data;
                jQuery(document).trigger("edukee:get_turma_img_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getTurma: function(id, suc, err) {
        
        if(!EdukeeSDK.__initialized) {
            EdukeeSDK.emitSDKInitErr(err, "edukee:get_turma_error");
            return;
        }
        
        for(var k in EdukeeSDK.results.turmas) {
            if(EdukeeSDK.results.turmas[k].id == id) {
                EdukeeSDK.results.turma = EdukeeSDK.results.turmas[k];
                jQuery(document).trigger("edukee:get_turma_success");
                if(suc != undefined) {
                    suc(EdukeeSDK.results.turmas[k]);
                }
                return;
            }
        }
        
        var url = EdukeeSDK.endPoint + '/turmas/me?id='+id; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeSDK.token);
            },
            url: url,
            success: function(data){        
                if(data.success) {
                    EdukeeSDK.results.turma = data.datas;
                    jQuery(document).trigger("edukee:get_turma_success");
                    if(suc != undefined) {
                        suc(data.datas);
                    }
                }
                else {
                    EdukeeSDK.results.error = data;
                    jQuery(document).trigger("edukee:get_turma_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeSDK.results.error = data;
                jQuery(document).trigger("edukee:get_turma_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getTurmaContrato: function(id, suc, err) {
        
        if(!EdukeeSDK.__initialized) {
            EdukeeSDK.emitSDKInitErr(err, "edukee:get_turma_contrato_error");
            return;
        }
        
        var nome = '';
        var curso_token = '';
        var turma_token = '';
        var file = '';
        for(var k in EdukeeSDK.results.turmas) {
            if(EdukeeSDK.results.turmas[k].id == id) {
                nome = EdukeeSDK.results.turmas[k].nome;
                curso_token = EdukeeSDK.results.turmas[k].curso_token;
                turma_token = EdukeeSDK.results.turmas[k].token;
                file = EdukeeSDK.results.turmas[k].contrato;
                break;
            }
        }
        
        if(nome == '' || curso_token == '' || turma_token == '' || file == '') {
            // tente no curso carregado 
            if(EdukeeSDK.results.turma.id == id) {
                nome = EdukeeSDK.results.turma.nome;
                curso_token = EdukeeSDK.results.turma.curso_token;
                turma_token = EdukeeSDK.results.turma.token;
                file = EdukeeSDK.results.turma.contrato;
            }
        }
        
        if(nome == '' || curso_token == '' || turma_token == '' || file == '') {
            var error = {
                status: 'no',
                msg: 'Não consegui achar a turma na listagem'
            };
            EdukeeSDK.results.error = error;
            jQuery(document).trigger("edukee:get_turma_contrato_error");
            if(err != undefined) {
                err(error);
            }
            
            return;
        }
        
        var url = EdukeeSDK.endPoint + '/download.php?isAPI=true&tipo=turma_contrato'+
                '&nome='+nome+'&id='+id+'&turma='+turma_token+'&curso='+curso_token+'&file='+file; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeSDK.token);
            },
            url: url,
            success: function(data){        
                if(data.success) {
                    EdukeeSDK.results.turma_contrato = data;
                    jQuery(document).trigger("edukee:get_turma_contrato_success");
                    if(suc != undefined) {
                        suc(data);
                    }
                }
                else {
                    EdukeeSDK.results.error = data;
                    jQuery(document).trigger("edukee:get_turma_contrato_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeSDK.results.error = data;
                jQuery(document).trigger("edukee:get_turma_contrato_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    getInscricaoForm: function(curso_id, suc, err) {
        
        if(!EdukeeSDK.__initialized) {
            EdukeeSDK.emitSDKInitErr(err, "edukee:get_inscricao_form_error");
            return;
        }
        
        for(var k in EdukeeSDK.results.cursos.datas) {
            if(EdukeeSDK.results.cursos.datas[k].id == curso_id) {
                EdukeeSDK.results.campos_inscricao = jQuery.parseJSON(EdukeeSDK.results.cursos.datas[k].campos_inscricao);
            }
        }
        
        if(EdukeeSDK.results.campos_inscricao.length == 0) {
            if(!jQuery.isEmptyObject(EdukeeSDK.results.curso)) {
                EdukeeSDK.results.campos_inscricao = jQuery.parseJSON(EdukeeSDK.results.curso.campos_inscricao);
            }
        }
        
        if(EdukeeSDK.results.campos_inscricao.length > 0) {
            jQuery(document).trigger("edukee:get_inscricao_form_success");
            if(suc != undefined) {
                suc(EdukeeSDK.results.campos_inscricao);
            }
            return;
        }
        
        var url = EdukeeSDK.endPoint + '/cursos/me?id='+curso_id; 
        
        jQuery.ajax({ 
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "token=" + EdukeeSDK.token);
            },
            url: url,
            success: function(data){        
                if(data.success) {
                    EdukeeSDK.results.campos_inscricao = jQuery.parseJSON(data.datas.campos_inscricao);
                    jQuery(document).trigger("edukee:get_inscricao_form_success");
                    if(suc != undefined) {
                        suc(EdukeeSDK.results.campos_inscricao);
                    }
                }
                else {
                    EdukeeSDK.results.error = data;
                    jQuery(document).trigger("edukee:get_inscricao_form_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                EdukeeSDK.results.error = data;
                jQuery(document).trigger("edukee:get_inscricao_form_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
    },
    doInscricao: function(curso_id, turma_id, campos, suc, err) {
        
        if(!EdukeeSDK.__initialized) {
            EdukeeSDK.emitSDKInitErr(err, "edukee:do_inscricao_error");
            return;
        }
        
        // busque os campos de inscrição do curso
        EdukeeSDK.getInscricaoForm(curso_id, function(campos_inscricao) {
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
            
            var url = EdukeeSDK.endPoint + '/inscricao/inscrevame'; 
            jQuery.ajax({ 
                type: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "token=" + EdukeeSDK.token);
                },
                url: url,
                data: JSON.stringify(campos_to_send),
                contentType: "application/json; charset=utf-8",
                success: function(data){        
                    if(data.success) {
                        jQuery(document).trigger("edukee:do_inscricao_success");
                        if(suc != undefined) {
                            suc();
                        }
                    }
                    else {
                        EdukeeSDK.results.error = data;
                        jQuery(document).trigger("edukee:do_inscricao_error");
                        if(err != undefined) {
                            err(data);
                        }
                    }
                },
                error: function(data){   
                    EdukeeSDK.results.error = data;
                    jQuery(document).trigger("edukee:do_inscricao_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            });
            
        }, 
        function(data) {
            EdukeeSDK.results.error = data;
            jQuery(document).trigger("edukee:do_inscricao_error");
            if(err != undefined) {
                err(data);
            }
        });
        
    },
    logInstituicao: function(suc, err) {
        // faça o login da instituição pelo seu token e obtenha o token da api
        var url = EdukeeSDK.endPoint + '/integracao/loginInstituicao?token=' + EdukeeSDK.token_instituicao; 
        jQuery.ajax({ 
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            success: function(data){  
                if(data.success) {
                    EdukeeSDK.token = data.api_token;
                    EdukeeSDK.__initialized = true;
                    console.log('*** Edukee SDK inicializado ***');
                    jQuery(document).trigger("edukee:login_instituicao_success");
                    if(suc != undefined) {
                        suc();
                    }
                }
                else {
                    console.log('Edukee SDK: instituição não encontrada');
                    EdukeeSDK.__initialized = false;
                    jQuery(document).trigger("edukee:login_instituicao_error");
                    if(err != undefined) {
                        err(data);
                    }
                }
            },
            error: function(data){   
                console.log('Edukee SDK: instituição não encontrada');
                EdukeeSDK.__initialized = false;
                jQuery(document).trigger("edukee:login_instituicao_error");
                if(err != undefined) {
                    err(data);
                }
            }
        });
            
    },
    init: function(token, suc, err) {
        
        if(token == undefined || token == '') {
            console.log('Edukee API: token needed');
            return;
        }
        
        if(window.location.href.includes("edukee.local"))
        {
            EdukeeSDK.endPoint = 'http://edukee.local/api';
        }
        
        EdukeeSDK.token_instituicao = token;
        EdukeeSDK.logInstituicao(suc, err);
        
    }
};
