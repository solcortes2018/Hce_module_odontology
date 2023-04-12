export default {
    topbar: {
        items: ["Idioma", "Cerrar sesión"],
    },
    sideNav: {
        items: ['Inicio', 'Callcenter', 'Agenda', 'Usuarios', 'Info', 'Estadisticas', 'Encuestas'],
        items2: ['Dashboard', 'Consultorio', 'Encuestas', 'Estadisticas']
    },
    register: {
        back: "Atrás",
        title: "Datos de registro",
        subtitle: {
            text: "Ya tienes una cuenta?",
            link: "Iniciar sesión",
        },
        fields: [
            "Nombres",
            "Apellidos",
            "Tipo de documento",
            "Nº de documento",
            "Nº de registro médico",
            "Indicativo",
            "Teléfono",
            "Rol",
        ],
        terms: {
            text: 'He leído y acepto los',
            link: 'Términos y Condiciones',
        },
        privacy: {
            text: 'He leído y acepto la',
            link: 'Política de Privacidad',
        },
        messages: ['Debe rellenar todos los campos', 'Debe aceptar los términos y condiciones', 'Debe aceptar la política de privacidad', 'Usuario creado satisfactoriamente'],
        button: 'Continuar',
    },
    noAccess: {
        title: {
            part1: 'Tu cuenta como médico en',
            part2: 'esta en proceso de aprobación.',
        },
        text: {
            part1: 'En las próximas 24 horas recibirás un correo',
            part2: 'con el resultado de este proceso.',
        },
        button: 'Regresar a inicio de sesión',
    },
    callcenterInfo: {
        title: "Haz clic en las programaciones para ver la información de la cita",
        subtitle: "Podrás llamar y chatear con tus pacientes",
        patient: {
            title: "Ingresa el código del paciente",
            text: "Debes ingresar el código del paciente para poder acceder a su historia clínica.",
            placeholder: "Ingresa el código",
            button: "Aceptar",
            wrongPatient: "Código del paciente incorrecto",
            noCode: "Debe ingresar el código del paciente",
        },
    },
    callsTabs: ['Actual', 'Finalizadas', 'No atendidas'],
    appointments: {
        noNew: "No hay citas nuevas",
        state: "Activo",
        calling: "entrante",
        types: ["Videollamada", "Llamada", "Chat"],
    },
    schedule: {
        calendarTitle: "Calendario de citas",
        tabs: ["Próximas", "Finalizadas", "No atendidas"],
        online: 'En sala de espera',
        newMsg: 'mensajes nuevos',
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
    agendaTabs: ["Consulta", "Datos básicos", "Historico de citas"],
    appointmentTabs: ["Antecedentes", "Vitales", "Historial de consultas", "Nueva consulta"],
    background: {
        option: 'Consultar',
        actions: 'Acciones',
        btnClose: 'Cerrar',
        titles: ['Patologías', 'Alergias', 'Historial médico familiar', 'Hospitalizaciones', 'Toxicología', 'Inmunización', 'Cirugías', 'Trauma', 'Transfusiones', 'Medicamentos de consumo Diario', 'Riesgos encontrados'],
        pathology: {
            title: 'Nueva Patología',
            labels: ['Nombre', 'Diagnosticado por', 'Diagnosticado en', 'Nota'],
            msg: 'Se ha añadido la patología satisfactoriamente'
        },
        allergy: {
            title: 'Nueva Alergía',
            labels: ['Nombre', 'Diagnosticado por', 'Diagnosticado en', 'Tratamiento', 'Frecuencia (Opcional)'],
            msg: 'Se ha añadido la alergia satisfactoriamente'
        },
        family: {
            title: 'Nuevo familiar',
            labels: ['Nombre del familiar', 'Relación', 'Patología', 'Condiciones de salud'],
            msg: 'Se ha añadido el familiar satisfactoriamente'
        },
        risk: {
            title: 'Nuevo Riesgo',
            labels: ['Tipo', 'Riesgo', 'Nota'],
            tableTitles: ['Tipo de riesgo', 'Fecha', 'Nivel de riesgo'],
            msg: 'Se ha añadido el riesgo satisfactoriamente'
        },
        hospi: {
            title: 'Nueva Hospitalización',
            labels: ['Fecha inicio', 'Fecha finalización', 'Médico Tratante', 'Donde', 'Razón', 'Resumen de Hospitalización (.pdf)'],
            button: 'Adjuntar',
            buttonD: 'Descargar',
            msg: 'Se ha añadido la hospitalización satisfactoriamente'
        },
        toxic: {
            title: 'Nueva Toxicología',
            labels: ['Tipo', '¿Que consume?', 'Grado de severidad', 'Fecha inicio', 'Fecha finalización', 'Descripción de consumo'],
            tableTitles: ['Tipo de consumo'],
            msg: 'Se ha añadido la toxicología satisfactoriamente'
        },
        immu: {
            title: 'Nueva Inmunización',
            labels: ['Nombre', 'Fecha ', 'Farmacéutica', 'Número de dosis', 'Nota'],
            tableTitles: ['Fecha de colocación', 'Dosis'],
            msg: 'Se ha añadido la inmunización satisfactoriamente'
        },
        surgery: {
            title: 'Nueva Cirugía',
            labels: ['Tipo', 'Nombre', 'Fecha', 'Nota'],
            msg: 'Se ha añadido la cirugia satisfactoriamente'
        },
        trauma: {
            title: 'Nuevo Trauma',
            labels: ['Nombre', 'Fecha', 'Nota', 'Tipo'],
            msg: 'Se ha añadido el trauma satisfactoriamente'
        },
        transfusion: {
            title: 'Nueva Transfusión',
            labels: ['Tipo', 'Cantidad', 'Fecha', 'Nota'],
            msg: 'Se ha añadido el transfusión satisfactoriamente'
        },
        medicine: {
            title: 'Nuevo Medicamento',
            labels: ['Motivo o enfermedad', 'Fecha de formulación'],
            tableTitles: ['Sustancia Activa', 'Motivo', 'Fecha de inicio', 'Frecuencia - Duración', 'Unidad', 'Dosis'],
            msg: 'Se ha añadido el medicamento satisfactoriamente'
        },
    },
    vitals: {
        titles: ['Presión arterial', 'Glucometría', 'Oximetría', 'Frecuencía cardiaca', 'Frecuencía respiratoria', 'Temperatura', 'Peso', 'Talla', 'Perimetro abdominal'],
        open: 'Abrir',
        add: 'Agregar',
        dates: ['Desde', 'Hasta'],
        modals: {
            titles: ['Agregar nueva presión arterial', 'Agregar Glucometría', 'Agregar Oximetría', 'Agregar Frecuencía Cardiaca', 'Agregar Frecuencia respiratoria', 'Agregar Temperatura', 'Agregar Peso', 'Agregar Talla', 'Agregar Perimetro abdominal'],
            generalMsg: 'Se ha añadido el signo vital satisfactoriamente',
            validateMsg: 'Debe escribir un signo vital',
            pressureLabels: ['Sistolica', 'Diastolica'],
            label: 'Medida'
        }
    },
    newCon: {
        titles: ['Motivo de consulta/ Evolución', 'Revisión por sistemas', 'Examen físico', 'Diagnóstico', 'Recetas Medicas', 'Ordenes', 'Incapacidades/Certificados médicos', 'Análisis'],
        add: 'Agregar',
        button: 'Guardar y Finalizar',
        btnSave: 'Guardar',
        btnCancel: 'Cancelar',
        btnNext: 'Siguiente',
        action: 'Acciones',
        loading: 'Cargando, por favor espere',
        errormsg: 'Debe rellenar todos los campos',
        options: {
            edit: 'Editar',
            delete: 'Eliminar',
            addMedicine: 'Agregar medicamento',
            addExam: 'Agregar examen o procedimiento',
        },
        addMsgs: {
            success: 'La consulta se ha creado exitosamente',
            error: 'Ha ocurrido un error',
            validations: ['Debe escribir por lo menos un diagnostico', 'Asegurese de asignar medicamentos a las recetas', 'Asegurese de asignar laboratorios a las ordenes'],
        },
        addNote: {
            choose: {
                title: 'Elige el tipo nota',
                items: ['Motivo de consulta', 'Nota de evolución'],
            },
            reason: {
                title: 'Agregar motivo de consulta',
                inputLabel: 'Motivo de consulta',
                textareaLabel: 'Enfermedad actual',
            },
            evolutionNote: {
                title: 'Agregar Nota de evolución',
                label: 'Subjetivo/ Objetivo',
            },
            tableTitles: ['Tipo', 'Motivo de consulta', 'Enfermedad actual'],
        },
        addRevision: {
            title: 'Nueva revisión por sistemas',
            switchLabel: 'Niega',
            fields: ['Constitucionales', 'Organos de los sentidos', 'Cardiorespiratorio', 'Endocrino', 'Gastrointestinal', 'Genitourinario', 'Musculoesqueletico', 'Neurologico', 'Mental']
        },
        addExam: {
            title: 'Nuevo Examen Físico',
            switchLabel: 'Estado normal',
            fields: ['Cabeza', 'Cuello', 'Ojos', 'Nariz', 'Boca', 'Orejas y Oidos', 'Cardiorespiratorio', 'Torax', 'Abdomen', 'Genital', 'Extremidades', 'Mental', 'Neurologico', 'Piel']
        },
        addDiagnosis: {
            title: 'Diagnóstico',
            selects: ['Diagnóstico Principal', 'Diagnóstico Secundario (Opcional)', 'Diagnóstico Secundario (Opcional)'],
            tableTitles: ['Diagnóstico Principal', 'Diagnóstico Secundario'],
            error: 'Debe elegir un diagnostico principal',
        },
        addPrescription: {
            title: 'Agregar Receta',
            inputLabel: 'Destino de receta',
            tableTitles: ['Receta', 'Destino', 'Medicamentos'],
            subTableTitles: ['Sustancia Activa', 'Frecuencia', 'Duración', 'Unidad', 'Dosis'],
            errors: ['Debe escribir el destino de la receta', 'Debe elegir el diagnostico de la receta'],
        },
        addOrder: {
            title: 'Agregar Orden',
            inputLabel: 'Destino de orden',
            tableTitles: ['Orden', 'Destino de orden', 'Laboratorios'],
            subTableTitles: ['Diagnóstico', 'Laboratorio'],
            errors: ['Debe escribir el destino de la orden', 'Debe elegir el tipo de orden'],
        },
        addLab: {
            title: 'Nuevo examen o procedimiento',
            labels: ['Tipo de Orden', 'Nombre'],
            selectItems: ['Procedimientos', 'Laboratorio', 'Imagenes', 'Interconsulta'],
            errors: ['Debe elegir el diagnóstico asociado al procedimiento', 'Debe escribir el nombre del procedimiento']
        },
        addMedicine: {
            title1: 'Nuevo medicamento',
            title2: 'Indica la formula médica',
            tableTitles: ['Sustancia Activa', 'Producto', 'Descripción', 'Presentación', 'Unidad', 'Dosis'],
            formulaLabels: ['Cantidad', 'Frecuencia', 'Cuando', 'Duración'],
            step: 'Paso',
            days: 'Días',
        },
        addDocument: {
            title: 'Elige el tipo de documento a generar',
            options: ['Incapacidad', 'Certificado médico'],
            emptySelect: 'No hay opciones disponibles',
            disability: {
                title: 'Nueva Incapacidad',
                labels: ['Diagnóstico', 'Diagnóstico que genera incapacidad', 'Días de incapacidad', 'Fecha de inicio', 'Fecha de finalización'],
                tableTitles: ['Tipo', 'Días de incapacidad', 'Fecha de inicio', 'Fecha de finalización'],
            },
            certificate: {
                title: 'Nuevo certificado',
                labels: ['Diagnóstico', 'Certificado médico:'],
                tableTitles: ['Tipo', 'Diagnóstico', 'Certificado médico'],
            },
            textAreaPlaceholder: '(Max. 255 caracteres)',
        },
        addAnalysis: {
            title: 'Agregar análisis',
            tableTitle: 'Descripción',
            error: 'Debe escribir un analisis',
        }
    },
    seeCon: {
        principalTitle: 'Fecha consulta',
        diagnose: 'Diagnósticos',
        orders: 'Ordenes',
        prescriptions: 'Recetas',
        download: 'Descargar',
        professional: 'Profesional',
        errorDownload: 'Error al descargar el archivo',
    },
    patientData: {
        tabs: ["Datos básicos", "Historico de citas"],
        fields: [
            "Nombre",
            "Apellido",
            "Fecha de nacimiento",
            "Edad",
            "Tipo de documento",
            "Número de documento",
            "Correo electrónico",
            "Celular",
            "Celular opcional",
            "País",
            "Ciudad",
            "Dirección",
        ],
        backlabels: ['Desde', 'Hasta']
    },
    call: {
        noCamera: {
            text: "Tu cámara esta inhabilitada",
            button: "Habilitar cámara",
            button2: "Deshabilitar cámara",
        },
        requirements: {
            success: ["Consentimiento informado confirmado.", "Cuota moderadora pagada."],
            error: ["Consentimiento informado rechazado.", "Pendiente Cuota moderadora"],
        },
        enable: "Habilitar cliente",
        buttons: ["Iniciar consulta", "Iniciar llamada", "Mensajes", "Iniciar Chat"],
        error: 'Perifericos no detectados. Verifique la conectividad o los permisos de estos y refresque la página',
    },
    history: {
        title: "Información de cita",
        subtitle: "Haz clic en un paciente para ver la información de la cita.",
    },
    userList: {
        placeholder: 'Buscar',
        tableTitles: ['Apellido', 'Nombre', 'Edad', 'Nº Cédula', 'Sexo', 'Télefono', 'Ciudad', 'Dirección', 'Acciones'],
        dropdownOptions: ['Agendar cita virtual', 'Agendar cita presencial', 'Agendar cita domiciliaria'],
        searchOptions: ['Nombre', 'Apellido', 'Nº identificación', 'Email', 'Télefono', 'País'],
        optionsLabel: 'Buscar por',
        errorSearch: 'Debe elegir una opción para buscar',
        modalftf: {
            title: 'Agendar cita presencial',
            step: ['Paso', 'de 3'],
            services: {
                title: '¿Cual servicio quieres escoger?',
                items: ['Consulta', 'Examenes', 'Vacunas']
            },
            appointmentTitles: ['¿Quién sera atendido?', 'Doctor(a)', 'Fecha de consulta', 'Hora de la consulta', 'Fecha y hora local de la consulta'],
            doctorsTitle: '¿Cual profesional quieres escoger?',
            dateTitle: 'Escoge la fecha de tu consulta',
            scheduleTitle: 'Escoge el horario de la consulta',
            timezone: 'Digitar ciudad de zona horaria',
            errorhour: 'Debe escoger uno de los horarios',
            errorTimezone: 'Debe escoger una zona horaria',
            buttons: {
                cancel: 'Cancelar',
                back: 'Atrás',
                next: 'Siguiente',
                add: 'Agendar consulta',
            },
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            success: 'La consulta presencial ha sido agendada exitosamente!',
        },
        modalVirtual: {
            title: 'Agendar cita virtual',
            success: 'La consulta virtual ha sido agendada exitosamente!',
        },
        modalHome: {
            title: 'Agendar cita domiciliaria',
            success: 'La consulta domiciliaria ha sido agendada exitosamente!',
        },
        footer: 'en total',
    },
    reports: {
        tableTitles: ['Tipo', 'Costo', 'Calidad', 'Total', 'Total horas'],
    },
    notifications: {
        onWaitingRoom: {
            title: 'Paciente en sala de espera',
            text: 'El paciente está esperando por usted en la sala',
        },
        onCall: {
            title: 'Llamada iniciada',
            text: 'El paciente le está llamando',
        },
        onFinishedCall: {
            title: 'Llamada finalizada',
            text: 'El paciente ha colgado la llamada',
        },
        onFile: {
            title: 'Archivo recibido',
            text: 'El paciente ha subido un archivo',
        }
    },
};