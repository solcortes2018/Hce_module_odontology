export default {
    topbar: {
        items: ["Idioma", "Finalizar sessão"],
    },
    sideNav: {
        items: ['Início', 'Callcenter', 'Agenda', 'Usuários', 'Info', 'Estatisticas', 'Pesquisas'],
        items2: ['Dashboard', 'Consultório', 'Pesquisas', 'Estatisticas']
    },
    register: {
        back: "Voltar",
        title: "Dados de cadastro",
        subtitle: {
            text: "Você já possui uma conta?",
            link: "Iniciar sessão",
        },
        fields: [
            "Nomes",
            "Sobrenomes",
            "Tipo de documento",
            "Número do documento",
            "Número do registro médico (CRM)",
            "Código do país ",
            "Telefone",
        ],
        terms: {
            text: 'Li e aceito os',
            link: 'termos e condições',
        },
        privacy: {
            text: 'Li e aceito a',
            link: 'política de privacidade',
        },
        messages: ['Deve preencher todos os campos', 'Deve aceitar os termos e condições', 'Deve aceitar a política de privacidade', 'Usuário criado com sucesso'],
        button: 'Continuar',
    },
    noAccess: {
        title: {
            part1: 'Seu cadastro como médico em',
            part2: 'está em processo de aprovação',
        },
        text: {
            part1: 'Nas próximas 24 horas você receberá um email',
            part2: 'com o resultado desse processo',
        },
        button: 'Retornar ao início da sessão',
    },
    callcenterInfo: {
        title: "Clique nos horários para ver as informações da consulta",
        subtitle: "Você pode ligar ou falar por chat com seus pacientes",
        patient: {
            title: "Digite o código do paciente",
            text: "Deve digitar o código do paciente para acessar sua história clínica (prontuário)",
            placeholder: "Digite o código",
            button: "Aceitar",
            wrongPatient: "Código do paciente incorreto",
            noCode: "Deve digitar o código do paciente",
        },
    },
    callsTabs: ['Chamada atual', 'Finalizadas', 'Não atendidas'],
    appointments: {
        noNew: "Sem novas consultas",
        state: "Ativo",
        calling: "entrada",
        types: ["Videochamada", "Chamada", "Chat"],
    },
    schedule: {
        calendarTitle: "Calendário de consultas",
        tabs: ["Próximos", "Finalizadas", "Não atendidas"],
        online: 'Na sala de espera',
        newMsg: 'novas mensagens',
        messages: {
            error1: {
                msg: 'Solo puede acceder a las citas del día de hoy',
            },
            error2: {
                msg1: 'Podrá ingresar a la cita una vez estén faltando ',
                msg2: ' minutos para la hora de la cita',
            }
        },
    },
    hceExit: {
        header: '¿Está seguro de salir?, perderá todo su progreso',
        text: 'Saliendo de la historia clinica',
        buttons: ['Sí', 'No'],
    },
    callExit: {
        validate: {
            text: '¿Estas seguro que deseas finalizar la consulta?',
            buttons: ['Sí', 'No'],
        },
        reason: {
            title: '¿Cual fue el motivo por la cual finalizo esta cita?',
            buttons: ['Cancelar', 'Confirmar'],
            alert: 'Debe elegir el motivo por la cual finalizo esta cita',
        }
    },
    chatPlaceHolder: 'Escribe un mensaje',
    agendaTabs: ["Consulta", "Dados básicos", "Histórico de consultas"],
    appointmentTabs: ["Antecedentes pessoais", "Sinais vitais", "Histórico de consultas", "Nova consulta"],
    background: {
        option: 'Consultar',
        actions: 'Ações',
        btnClose: 'Encerrar',
        titles: ['Patologias', 'Alergias', 'Antecedentes familiares', 'Internações', 'Toxicológicos', 'Vacinas', 'Cirurgias', 'Trauma', 'Transfusões', 'Medicamentos diários', 'Riscos encontrados'],
        pathology: {
            title: 'Nova patologia',
            labels: ['Nome', 'Diagnosticado por', 'Diagnosticado em', 'Observação'],
            msg: 'Se ha añadido la patología satisfactoriamente'
        },
        allergy: {
            title: 'Nova alergia',
            labels: ['Nome', 'Diagnosticado por', 'Diagnosticado em', 'Tratamento', 'Frequência (Opcional)'],
            msg: 'Se ha añadido la alergia satisfactoriamente'
        },
        family: {
            title: 'Novo membro familiar',
            labels: ['Nome do membro da família', 'Parentesco', 'Doença', 'Condições de saúde'],
            msg: 'Se ha añadido el familiar satisfactoriamente'
        },
        risk: {
            title: 'Novo risco',
            labels: ['Tipo', 'Risco', 'Observação'],
            tableTitles: ['Tipo de risco', 'Data', 'Nível do risco'],
            msg: 'Se ha añadido el riesgo satisfactoriamente'
        },
        hospi: {
            title: 'Nova internação',
            labels: ['Data de início', 'Data do fim', 'Médico responsável', 'Local', 'Causa', 'Resumo da internação (.pdf)'],
            button: 'Anexar',
            buttonD: 'Baixar arquivo',
            msg: 'Se ha añadido la hospitalización satisfactoriamente'
        },
        toxic: {
            title: 'Novo Toxicológico',
            labels: ['Tipo', 'O que você consome?', 'Grau de severidade', 'Data do início', 'Data do fim', 'Descrição do consumo'],
            tableTitles: ['Tipo de consumo'],
            msg: 'Se ha añadido la toxicología satisfactoriamente'
        },
        immu: {
            title: 'Nova Imunização (Vacina)',
            labels: ['Nome', 'Data', 'Farmacêutica', 'Número da dose', 'Observação'],
            tableTitles: ['Data da vacinação', 'Dose'],
            msg: 'Se ha añadido la inmunización satisfactoriamente'
        },
        surgery: {
            title: 'Nova Cirurgia',
            labels: ['Tipo', 'Nome', 'Data', 'Observação'],
            msg: 'Se ha añadido la cirugia satisfactoriamente'
        },
        trauma: {
            title: 'Novo Trauma',
            labels: ['Nome', 'Data', 'Observação', 'Tipo'],
            msg: 'Se ha añadido el trauma satisfactoriamente'
        },
        transfusion: {
            title: 'Nova Transfusão',
            labels: ['Tipo', 'Quantidade (volume)', 'Data', 'Observação'],
            msg: 'Se ha añadido el transfusión satisfactoriamente'
        },
        medicine: {
            title: 'Novo medicamento',
            labels: ['Causa ou patologia', 'Data da prescrição'],
            tableTitles: ['Princípio Ativo', 'Causa', 'Data do início', 'Frequência - Duração', 'Unidade', 'Dose'],
            msg: 'Se ha añadido el medicamento satisfactoriamente'
        },
    },
    vitals: {
        titles: ['Pressão arterial', 'Glicemia', 'Oximetria', 'Frequência cardíaca', 'Frequência respiratória', 'Temperatura', 'Peso', 'Altura', 'Circunferência abdominal'],
        open: 'Abrir',
        add: 'Adicionar',
        dates: ['De', 'Até'],
        modals: {
            titles: ['Adicionar nova pressão arterial', 'Adicionar Glicemia', 'Adicionar Oximetria', 'Adicionar Frequência Cardíaca', 'Adicionar Frequência respiratória', 'Adicionar Temperatura', 'Adicionar Peso', 'Adicionar Altura', 'Adicionar Circunferência abdominal'],
            generalMsg: 'Se ha añadido la medida con éxito',
            validateMsg: 'Debe escribir una medida',
            pressureLabels: ['Sistólica', 'Diastólica'],
            label: 'Medida'
        }
    },
    newCon: {
        titles: ['Motivo da consulta (queixa) / Evolução', 'Revisão por sistemas', 'Exame Físico', 'Diagnóstico', 'Prescrição / Receitas', 'Pedidos médicos', 'Atestados / Relatórios Médicos', 'Resumo Médico'],
        add: 'Adicionar',
        button: 'Salvar e Finalizar',
        btnSave: 'Salvar',
        btnCancel: 'Cancelar',
        btnNext: 'Próximo',
        action: 'Ações',
        loading: 'Carregando, por favor aguarde.',
        errormsg: 'Deve preencher todos os campos',
        options: {
            edit: 'Editar',
            delete: 'Excluir',
            addMedicine: 'Adicionar medicamento',
            addExam: 'Adicionar exame ou procedimento',
        },
        addMsgs: {
            success: 'Sua consulta foi agendada com sucesso',
            error: 'Ocorreu um erro',
            validations: ['Você deve colocar ao menos um diagnóstico', 'Certifique-se de adicionar os medicamentos à prescrição', 'Certifique-se de adicionar laboratórios/exames ao pedido médico'],
        },
        addNote: {
            choose: {
                title: 'Escolha o tipo de observação',
                items: ['Motivo da consulta', 'Evolução médica'],
            },
            reason: {
                title: 'Adicionar o motivo da consulta',
                inputLabel: 'Motivo da consulta',
                textareaLabel: 'Doença atual',
            },
            evolutionNote: {
                title: 'Adicionar evolução médica',
                label: 'Subjetivo / Objetivo',
            },
            tableTitles: ['Tipo', 'Motivo da consulta', 'Doença atual'],
        },
        addRevision: {
            title: 'Nova revisão por sistemas',
            switchLabel: 'Nega',
            fields: ['Estado geral', 'Órgãos sensoriais', 'Cardiorespiratório', 'Endocrinológico', 'Gastrointestinal', 'Genitourinário', 'Musculoesquelético', 'Neurológico', 'Psíquico / Mental']
        },
        addExam: {
            title: 'Novo Exame Físico',
            switchLabel: 'Estado normal (Exame Físico sem alterações)',
            fields: ['Cabeça', 'Pescoço', 'Olhos', 'Nariz', 'Boca', 'Orelhas / Ouvidos', 'Cardiorespiratório', 'Tórax', 'Abdome', 'Genital', 'Extremidades', 'Psíquico / Mental', 'Neurológico', 'Pele']
        },
        addDiagnosis: {
            title: 'Diagnóstico',
            selects: ['Diagnóstico Principal', 'Diagnóstico Secundário (Opcional)', 'Diagnóstico Secundário (Opcional)'],
            tableTitles: ['Diagnóstico principal', 'Diagnóstico Secundário'],
            error: 'Deve escolher um diagnóstico principal',
        },
        addPrescription: {
            title: 'Adicionar prescrição (receita)',
            inputLabel: 'Destino da prescrição (receita)',
            tableTitles: ['Prescrição (Receita)', 'Destino', 'Medicamentos'],
            subTableTitles: ['Princípio Ativo', 'Frequência', 'Duração', 'Unidade', 'Dose'],
            errors: ['Deve escrever o destino da prescrição (receita)', 'Deve escolher um disgnóstico para a prescrição (receita)'],
        },
        addOrder: {
            title: 'Adicionar pedido',
            inputLabel: 'Destino do pedido',
            tableTitles: ['Pedido', 'Destino do pedido', 'Laboratórios'],
            subTableTitles: ['Diagnóstico', 'Laboratório'],
            errors: ['Deve escrever o destino do pedido', 'Deve escrever o tipo de ordem'],
        },
        addLab: {
            title: 'Novo exame ou procedimento',
            labels: ['Tipo de pedido', 'Nome'],
            selectItems: ['Procedimientos', 'Laboratório', 'Imagens', 'Especialidades médicas'],
            errors: ['Deve escrever o diagnóstico associado ao procedimento', 'Deverá escrever o nome do procedimento']
        },
        addMedicine: {
            title1: 'Novo medicamento',
            title2: 'Indique a posologia',
            tableTitles: ['Princípio Ativo', 'Produto', 'Descrição', 'Apresentação', 'Unidade', 'Dose'],
            formulaLabels: ['Quantidade', 'Frequência', 'Quando', 'Duração'],
            step: 'Passo',
            days: 'Dias',
        },
        addDocument: {
            title: 'Escolha qual documento você gostaria de enviar',
            options: ['Atestado médico', 'Relatório médico'],
            emptySelect: 'Não existem opções disponíveis',
            disability: {
                title: 'Novo atestado médico',
                labels: ['Diagnóstico', 'Diagnóstico associado ao atestado', 'Dias de atestado', 'Data de início', 'Data do fim'],
                tableTitles: ['Tipo', 'Dias de atestado', 'Data de início', 'Data do fim'],
            },
            certificate: {
                title: 'Novo relatório médico',
                labels: ['Diagnóstico', 'Relatório médico:'],
                tableTitles: ['Tipo', 'Diagnóstico', 'Relatório médico'],
            },
            textAreaPlaceholder: '(Máximo 255 caracteres)',
        },
        addAnalysis: {
            title: 'Deve adicionar um comentário médico',
            tableTitle: 'Descrição',
            error: 'Deve escrever um comentário médico',
        }
    },
    seeCon: {
        principalTitle: 'Data da consulta',
        diagnose: 'Diagnósticos',
        orders: 'Pedidos',
        prescriptions: 'Prescrições',
        download: 'Baixar arquivo',
        professional: 'Profissional',
        errorDownload: 'Erro ao baixar o arquivo',
    },
    patientData: {
        tabs: ["Dados básicos", "Histórico de consultas"],
        fields: [
            "Nome",
            "Sobrenome",
            "Data de nascimento",
            "Idade",
            "Tipo de documento",
            "Número do documento",
            "Email",
            "Telefone",
            "Celular",
            "País",
            "Cidade",
            "Endereço",
            "Papel",
        ],
        backlabels: ['Desde', 'Hasta']
    },
    call: {
        noCamera: {
            text: "Sua câmera está desabilitada",
            button: "Ligar câmera",
            button2: "Desativar câmera",
        },
        requirements: {
            success: ["Consentimento confirmado ", "Pagamento efetuado"],
            error: ["Consentimento recusado ", "Pagamento pendente"],
        },
        enable: "Habilitar paciente",
        buttons: ["Iniciar consulta", "Iniciar chamada", "Mensagens", "Iniciar chat"],
        error: 'Periféricos não detectados. Verifique a conectividade ou permissões destes e atualize a página.'
    },
    history: {
        title: "Informação da consulta",
        subtitle: "Clique no nome do paciente para ver informações da consulta",
    },
    userList: {
        placeholder: 'Procurar',
        tableTitles: ['Sobrenome', 'Nome', 'Idade', 'Número de Identidade', 'Sexo', 'Telefone', 'Cidade', 'Endereço', 'Ações'],
        dropdownOptions: ['Agendar consulta virtual (Telemedicina)', 'Agendar consulta presencial', 'Agendar consulta domiciliar'],
        searchOptions: ['Nome', 'Sobrenome', 'Número de Identidade', 'Email', 'Telefone', 'País'],
        optionsLabel: 'Procura por',
        errorSearch: 'Você deve escolher uma opção para pesquisar',
        errorhour: 'Você deve escolher um dos horários',
        errorTimezone: 'Você deve escolher um fuso horário',
        modalftf: {
            title: 'Agendar consulta presencial',
            step: ['Passo', 'de 3'],
            services: {
                title: 'Qual serviço você deseja?',
                items: ['Consulta médica', 'Exames', 'Vacinas']
            },
            appointmentTitles: ['Quem será atendido?', 'Médico', 'Data da consulta', 'Horário da consulta', 'Data e hora locais da consulta'],
            doctorsTitle: 'Qual profissional você deseja consultar?',
            dateTitle: 'Escolha a data da sua consulta',
            scheduleTitle: 'Escolha o horário da sua consulta',
            timezone: 'Insira a cidade do fuso horário',
            buttons: {
                cancel: 'Cancelar',
                back: 'Voltar',
                next: 'Próximo',
                add: 'Agendar consulta',
            },
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            success: 'Sua consulta presencial foi agendada com sucesso!',
        },
        modalVirtual: {
            title: 'Agendar cita virtual',
            success: 'La consulta virtual ha sido agendada exitosamente!',
        },
        modalHome: {
            title: 'Agendar cita domiciliaria',
            success: 'La consulta domiciliaria ha sido agendada exitosamente!',
        },
        footer: 'no total',
    },
    reports: {
        tableTitles: ['Tipo', 'Costo', 'Calidad', 'Total', 'Total horas'],
    },
    notifications: {
        onWaitingRoom: {
            title: 'Paciente na sala de espera',
            text: 'O paciente está esperando por você na sala',
        },
        onCall: {
            title: 'Chamada iniciada',
            text: 'O paciente está te chamando',
        },
        onFinishedCall: {
            title: 'Chamada finalizada',
            text: 'O paciente desligou a chamada',
        },
        onFile: {
            title: 'Arquivo recebido',
            text: 'O paciente carregou um arquivo.',
        }
    },
};