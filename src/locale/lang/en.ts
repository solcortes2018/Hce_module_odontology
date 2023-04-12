export default {
    topbar: {
        items: ["Language", "Sign out"],
    },
    sideNav: {
        items: ['Home', 'Call center', 'Agenda', 'Users', 'Info', 'Statistics', 'Surveys'],
        items2: ['Dashboard', 'Consulting room', 'Surveys', 'Statistics']
    },
    register: {
        back: "Back",
        title: "Log data",
        subtitle: {
            text: "Do you have an account?",
            link: "Log in",
        },
        fields: [
            "Names",
            "Last Names",
            "Type of document",
            "Number ID",
            "Physician's register number",
            "Country Code",
            "Phone",
        ],
        terms: {
            text: 'I have read and accepted the',
            link: 'terms and conditions',
        },
        privacy: {
            text: 'I have read and accepted the',
            link: 'privacy policy',
        },
        messages: ['Must fill all the fields', 'Must accept the terms and conditions', 'Must accept the privacy policy', 'Usar created successfully'],
        button: 'Continue',
    },
    noAccess: {
        title: {
            part1: "Your physician's account in ",
            part2: 'is in approval process.',
        },
        text: {
            part1: 'In the next 24 hours you will receive an email',
            part2: 'with the result of this process.',
        },
        button: 'Return to log in',
    },
    callcenterInfo: {
        title: "Click on the schedules to see the appointment's information",
        subtitle: "You can call or chat with your patients",
        patient: {
            title: "Enter the patient's code",
            text: "Must enter the patient's code in order to access the clinic history",
            placeholder: "Enter the code",
            button: "Accept",
            wrongPatient: "Incorrect patient's code",
            noCode: "Must enter the patient's code",
        },
    },
    callsTabs: ['Current', 'Finished', 'Unattended'],
    appointments: {
        noNew: "No new appointments",
        state: "Active",
        calling: "incoming",
        types: ["Video call", "Call", "Chat"],
    },
    schedule: {
        calendarTitle: "Appointment calendar",
        tabs: ["Upcoming", "Finished", "Unattended"],
        online: 'In waiting room',
        newMsg: 'new messages',
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
    agendamentTabs: ["Consultation", "Basic data", "Appointment's history"],
    appointmentTabs: ["Background medical history", "Vitals", "History of appointments", "New appointment"],
    background: {
        option: 'Consult',
        actions: 'Actions',
        btnClose: 'Close',
        titles: ['Illnesses', 'Alergies', 'Family history ilnesses', 'Hospitalizations', 'Toxicology', 'Inmunization', 'Surgeries', 'Trauma', 'Transfusions', 'Daily Medications', 'Risks Found'],
        pathology: {
            title: 'New Illness',
            labels: ['Name', 'Diagnosed by', 'Diagnosed in', 'Note'],
            msg: 'Illness successfully added'
        },
        allergy: {
            title: 'New Allergy',
            labels: ['Name', 'Diagnosed by', 'Diagnosed in', 'Treatment', 'Frequency (Optional)'],
            msg: 'Allergy successfully added'
        },
        family: {
            title: 'New family member',
            labels: ['Family member name', 'Relationship', 'Illness', 'Health Conditions'],
            msg: 'Family member successfully added'
        },
        risk: {
            title: 'New Risk',
            labels: ['Type', 'Risk', 'Note', 'Date'],
            tableTitles: ['Type of Risk', 'Date', 'Level of Risk'],
            msg: 'Risk successfully added'
        },
        hospi: {
            title: 'New Hospitalization',
            labels: ['Start Date', 'Finish Date', 'Treating Physician', 'Where', 'Reason', 'Hospitalization Summary (.pdf)'],
            button: 'Attach',
            buttonD: 'Download',
            msg: 'Hospitalization successfully added'
        },
        toxic: {
            title: 'New Toxicology',
            labels: ['Type', 'What do you consume?', 'Degree of severity', 'Start Date', 'Finish Date', 'Consumption Description'],
            tableTitles: ['Type of consumption'],
            msg: 'Toxicology successfully added'
        },
        immu: {
            title: 'New Inmmunization',
            labels: ['Name', 'Date ', 'Pharmaceutical', 'Number of Dose', 'Note'],
            tableTitles: ['Vaccination date', 'Dose'],
            msg: 'Inmunization successfully added'
        },
        surgery: {
            title: 'New Surgery',
            labels: ['Type', 'Name', 'Date', 'Note'],
            msg: 'Surgery successfully added'
        },
        trauma: {
            title: 'New Trauma',
            labels: ['Name', 'Date', 'Note', 'Type'],
            msg: 'Trauma successfully added'
        },
        transfusion: {
            title: 'New Transfusion',
            labels: ['Type', 'Quantity', 'Date', 'Note'],
            msg: 'Transfusion successfully added'
        },
        medicine: {
            title: 'New medication',
            labels: ['Reason or illness', 'Date of formulation'],
            tableTitles: ['Active Substance', 'Reason ', 'Start Date', 'Frequency - Duration', 'Unit', 'Dose'],
            msg: 'Medication successfully added'
        },
    },
    vitals: {
        titles: ['Blood Pressure', 'Glucometry', 'Oximetry', 'Heart Rate', 'Breathing Rate', 'Temperature', 'Weight', 'Height', 'Abdominal Perimeter'],
        open: 'Open',
        add: 'Add',
        dates: ['From', 'To'],
        modals: {
            titles: ['Add a new blood pressure', 'Add glucometry', 'Add Oximetry', 'AAdd Heart Rate', 'Add breathing rate', 'Add Temperature', 'Add Weight', 'Add Height', 'Add abdominal perimeter'],
            generalMsg: 'Vital successfully added',
            validateMsg: 'Must type a vital',
            pressureLabels: ['Systolic', 'Diastolic'],
            label: 'Measure'
        }
    },
    newCon: {
        titles: ['Reason for the appointment / Medical evolution', 'Review of systems', 'Physical Exam', 'Diagnosis', 'Prescription', 'Medical Orders', 'Medical Leave / Medical Certificate', 'Medical Analysis'],
        add: 'Add',
        button: 'Save and Finish',
        btnSave: 'Save',
        btnCancel: 'Cancel',
        btnNext: 'Next',
        action: 'Actions',
        loading: 'Loading, please wait.',
        errormsg: 'Must fill all the fields',
        options: {
            edit: 'Edit',
            delete: 'Remove',
            addMedicine: 'Add medication',
            addExam: 'Add exam or procedure',
        },
        addMsgs: {
            success: 'Your appointment has been successfully scheduled !',
            error: 'An error has occurred',
            validations: ['You must put at least one diagnosis', 'Make sure you add a medicine to the prescription', 'Make sure you add laboratories to the medical order'],
        },
        addNote: {
            choose: {
                title: 'Choose the type of note',
                items: ['Reason for the appointment', 'Medical Evolution'],
            },
            reason: {
                title: 'Add reason for the appointment',
                inputLabel: 'Reason for the appointment',
                textareaLabel: 'Present Illness',
            },
            evolutionNote: {
                title: 'Add medical evolution',
                label: 'Subjective / Objective',
            },
            tableTitles: ['Type', 'Reason for the appointment', 'Present Illness'],
        },
        addRevision: {
            title: 'New system review',
            switchLabel: 'Deny',
            fields: ['Constitutional', 'Organs of senses', 'Cardiorespiratory', 'Endocrine', 'Gastrointestinal', 'Genitourinary', 'Musculoskeletal', 'Neurological', 'Mental']
        },
        addExam: {
            title: 'New Physical Exam',
            switchLabel: 'Normal State',
            fields: ['Head', 'Neck', 'Eyes', 'Nose', 'Mouth', 'Ears', 'Cardiorespiratory', 'Chest', 'Abdomen', 'Genital', 'Extremities', 'Mental', 'Neurological', 'Skin']
        },
        addDiagnosis: {
            title: 'Diagnosis',
            selects: ['Principal Diagnosis', 'Secundary Diagnosis (Optional)', 'Secundary Diagnosis (Optional)'],
            tableTitles: ['Principal Diagnosis', 'Secundary Diagnosis'],
            error: 'Must choose a principal diagnosis',
        },
        addPrescription: {
            title: 'Add prescription',
            inputLabel: 'Prescription Destination',
            tableTitles: ['Prescription', 'Destination', 'Medicines'],
            subTableTitles: ['Active Substance', 'Frequency', 'Duration', 'Unit', 'Dose'],
            errors: ['Must write the destination of the prescription', 'Must choose a diagnosis to the prescription'],
        },
        addOrder: {
            title: 'Add order',
            inputLabel: 'Destination of the order',
            tableTitles: ['Order', 'Destination of the order', 'Laboratory'],
            subTableTitles: ['Diagnosis', 'Laboratory'],
            errors: ['Must write the destination of the order', 'Must choose the type of order'],
        },
        addLab: {
            title: 'New exam or procedure',
            labels: ['Type of order', 'Name'],
            selectItems: ['Procedures', 'Laboratory', 'Image', 'Physician specialties'],
            errors: ['Must write the diagnosis associated with the procedure', 'Must write the name of the procedure']
        },
        addMedicine: {
            title1: 'New medicine',
            title2: 'Indicate the medical formula',
            tableTitles: ['Active Substance', 'Product', 'Name', 'Description', 'Presentation', 'Unit', 'Dose'],
            formulaLabels: ['Amount', 'Frequency', 'When', 'Duration'],
            step: 'Step',
            days: 'Days',
        },
        addDocument: {
            title: 'Choose the type of document you would like to send',
            options: ['Medical leave', 'Medical Certificate'],
            emptySelect: 'No options available',
            disability: {
                title: 'New medical leave',
                labels: ['Diagnosis', 'Diagnosis associated with the medical leave', 'Days of leave', 'Start Date', 'End Date'],
                tableTitles: ['Type', 'Days of leave', 'Start Date', 'End Date'],
            },
            certificate: {
                title: 'New medical certificate',
                labels: ['Diagnosis', 'Medical certificate:'],
                tableTitles: ['Type', 'Diagnosis', 'Medical certificate'],
            },
            textAreaPlaceholder: '(Max. 255 characters)',
        },
        addAnalysis: {
            title: 'Add Medical analysis',
            tableTitle: 'Description',
            error: 'Must write a medical analysis',
        }
    },
    seeCon: {
        principalTitle: 'Date of the appointment',
        diagnose: 'Diagnosis',
        orders: 'Orders',
        prescriptions: 'Prescriptions',
        download: 'Download',
        professional: 'Professional',
        errorDownload: 'Error in downloading the document',
    },
    patientData: {
        tabs: ["Basic data", "Appointment's history"],
        fields: [
            "Name",
            "Last Name",
            "Date of birth",
            "Age",
            "Type of document",
            "ID number",
            "E-mail address",
            "Phone",
            "Cel phone",
            "Country",
            "City",
            "Address",
            "Role",
        ],
        backlabels: ['Desde', 'Hasta']
    },
    call: {
        noCamera: {
            text: "Your camera is disabled",
            button: "Enable camera",
            button2: "Disable camera",
        },
        requirements: {
            success: ["Informed consent confirmed.", "Appointment fee paid."],
            error: ["Informed consent rejected.", "Pending appointment's fee"],
        },
        enable: "Enable patient",
        buttons: ["start Consultation", "Start call", "Messages", "Messages"],
        error: 'Peripherals not detected. Check the connectivity or permissions of these and refresh the page.'
    },
    history: {
        title: "Appointment's information",
        subtitle: "Click on the patient to see the appointment's information",
    },
    userList: {
        placeholder: 'Search',
        tableTitles: ['Last Name', 'Name', 'Age', 'ID number', 'Sex', 'Phone', 'City', 'Address', 'Actions'],
        dropdownOptions: ['Schedule Virtual Appointment', 'Schedule a Physical Appointment', 'Schedule home appointment'],
        searchOptions: ['Name', 'LastName', 'Identification Number', 'Email', 'Phone', 'Country'],
        optionsLabel: 'Search by',
        errorSearch: 'You must choose an option to search',
        errorhour: 'You must choose one of the schedules',
        errorTimezone: 'You must choose a time zone',
        modalftf: {
            title: 'Schedule a Physical Appointment',
            step: ['Step', 'of 3'],
            services: {
                title: 'Which service would you like to choose?',
                items: ['Medical consultation', 'Laboratories', 'Vaccines']
            },
            appointmentTitles: ['Who will be attended?', 'Physician', 'Date of the appointment', 'Hour of the appointment', 'Local date and time of the appointment'],
            doctorsTitle: 'Which professional would you like to choose?',
            dateTitle: 'Choose the date of your appointment',
            scheduleTitle: 'Choose the hour of your appointment',
            timezone: 'Enter time zone city',
            buttons: {
                cancel: 'Cancel',
                back: 'Back',
                next: 'Next',
                add: 'Schedule appointment',
            },
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            success: 'Your physical appointment has been successfully scheduled !',
        },
        modalVirtual: {
            title: 'Schedule Virtual Appointment',
            success: 'Your Virtual appointment has been successfully scheduled !',
        },
        modalHome: {
            title: 'Schedule home appointment',
            success: 'Your home appointment has been successfully scheduled !',
        },
        footer: 'in total',
    },
    reports: {
        tableTitles: ['Tipo', 'Costo', 'Calidad', 'Total', 'Total horas'],
    },
    notifications: {
        onWaitingRoom: {
            title: 'Patient in the waiting room',
            text: 'A patient is waiting for you in the hall',
        },
        onCall: {
            title: 'Call started',
            text: 'The patient is calling you!',
        },
        onFinishedCall: {
            title: 'Call is over',
            text: 'The patient has hung up the call',
        },
        onFile: {
            title: 'File received',
            text: 'The patient has uploaded a file',
        }
    },
};