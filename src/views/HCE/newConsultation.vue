<script setup lang="ts">
import { ref } from "vue";
import axios from "axios"
import { useI18n } from 'vue-i18n';
import M from "materialize-css";

const { t } = useI18n()
const userToken = ref("")
const props = defineProps({
    patient: { type: Object, required: true },
    consultationId: String,
    consultationType: Number,
},
)
const notes = ref<any>([])
const note = ref<any>("")
const exams = ref<any>([])
const revisions = ref<any>([])
let editingDiagnosis = ref<any>("")
let diagnostics = ref<any>([])
let diagnosisId = <any>(1)
let prescriptionId = <any>(1)
let orderId = <any>(1)
let prescriptionDestiny = ref<any>("")
let prescriptionDiagnose = ref<any>("")
let prescriptions = ref<any>([])
let orderDestiny = ref<any>("")
let orders = ref<any>([])
let medicalDisability = ref<any>("")
let medicalCertificate = ref<any>("")
let analysisDesc = ref<any>("")
let procedures = ref<any>("")
let analysis = ref<any>({})
let switch1 = <boolean>(false)
let switch2 = <boolean>(false)
let loading = <boolean>(false)
let available = <boolean>(true)
let cie10info = <any>null
let search = <any>("")
const startDate = () => {
    let date = new Date()
    return convertDate(date)
}
const endDate = () => {
    let date = new Date()
    date.setDate(date.getDate() + newDocument.disability.days)
    return convertDate(date)
}

const allDiagnose: any = () => {
    let d = []
    for (let i = 0; i < diagnostics.length; i++) {
        let e = diagnostics[i];
        d.push(diagnostics[i].principal)
        if (diagnostics[i].secondary) {
            d.push(diagnostics[i].secondary)
        }
    }
    return d
}

const newNote = {
    reason: "",
    illness: "",
    type: "",
    hastype: false,
}

let newMedicine: any = {
    step: 1,
    prescription: null,
    medicine: 0,
    quantity: null,
    frequency: null,
    duration: null,
    description: '',
    when: null,
}

let newRevision = {
    consti: '',
    sense: '',
    cardio: '',
    endocrine: '',
    gastro: '',
    genito: '',
    musculo: '',
    mental: '',
    neuro: '',
}

let newExam = {
    head: '',
    neck: '',
    eyes: '',
    nose: '',
    mouth: '',
    ears: '',
    cardio: '',
    thorax: '',
    abdomen: '',
    genital: '',
    extremities: '',
    mental: '',
    neuro: '',
    skin: '',
}

let newDiagnosis = {
    principal: null,
    secondary: null,
}

const newLaboratory = {
    type: null,
    selectedProc: null,
    diagnosis: null,
    name: '',
    order: {},
}

let newDocument: any = {
    type: "",
    hastype: false,
    disability: {
        diagnosis: null,
        description: '',
        days: 0,
    },
    certificate: {
        diagnosis: null,
        description: '',
    },
}
const itemsNote = [
    {
        label: t("newCon.options.edit"),
        command: (note: any) => editNote(note),
    },
    {
        label: t("newCon.options.delete"),
        command: () => deleteNote(),
    }
]
const itemsPresc = [
    {
        label: t("newCon.options.addMedicine"),
        icon: 'add',
        command: (prescription: any) => openMedicineModal(prescription),
    },
    {
        label: t("newCon.options.delete"),
        command: (prescription: any) => deletePrescription(prescription),
    },
]
const itemsRev = [
    {
        label: t("newCon.options.edit"),
        command: (revision: any) => editRevision(revision),
    },
    {
        label: t("newCon.options.delete"),
        command: () => deleteRevision(),
    },
]

const itemsExam = [
    {
        label: t("newCon.options.edit"),
        command: (exam: any) => editExam(exam),
    },
    {
        label: t("newCon.options.delete"),
        command: () => deleteExam(),
    },
]
const itemsDisa = [
    {
        label: t("newCon.options.edit"),
        command: () => editDisability(),
    },
    {
        label: t("newCon.options.delete"),
        command: () => deleteDisability(),
    },
]

const itemsDiag = [
    {
        label: t("newCon.options.edit"),
        command: (diagnosis: any) => editDiagnosis(diagnosis),
    },
    {
        label: t("newCon.options.delete"),
        command: (diagnosis: any) => deleteDiagnosis(diagnosis),
    },
]
const itemsCert = [
    {
        label: t("newCon.options.edit"),
        command: () => editCertificate(),
    },
    {
        label: t("newCon.options.delete"),
        command: () => deleteCertificate(),
    },
]

const itemsAnalysis = [
    {
        label: t("newCon.options.edit"),
        command: () => editAnalysis(),
    },
]

const itemsOrder = [
    {
        label: t("newCon.options.addExam"),
        icon: 'add',
        command: (order: any) => openLabModal(order),
    },
    {
        label: t("newCon.options.delete"),
        command: (order: any) => deleteOrder(order),
    },
]

const clearNoteFields = async () => {
    const newNote = {
        reason: "",
        illness: "",
        type: "",
        hastype: false,
    }
}
const toggleObj = (event: any, ref: any) => {
    $refs[ref].toggle(event);
}

const getConsultation = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/consultation/" + props.consultationId, {
        headers
    }
    );
    let data = response.data
    if (data != "") {
        return false
    }
}
const addNote = async () => {
    const {
        illness,
        reason,
        type
    } = newNote;

    const note = ({
        id: notes.value.length,
        reason,
        illness,
        type,
    });

    if (notes.value.length > 0) {
        notes[0] = note
    } else {
        notes.value.push(note);
    }
    var elem: any = document.getElementById("addNote-modal");
    var instance = M.Modal.getInstance(elem);

    instance.close();

    newNote.illness = "";
    newNote.reason = "";
    newNote.type = ""
}

const editNote = async () => {
    var elem: any = document.getElementById("addNote-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();

    const newNote = {
        reason: note,
        illness: note,
        type: note,
        hastype: true,
    }

    setTimeout(() => {
        let input: any = document.getElementById("reason");
        input?.labels[0].classList.add("active");
    }, 100);

}

const deleteNote = async () => {
    newNote.hastype = false
    notes.pop()
}

const deleteExam = async () => {
    exams.pop()
}

const deleteRevision = async () => {
    revisions.pop()
}

const selectMedicine = async (med: any) => {
    if (med !== newMedicine.medicine) {
        newMedicine.medicine = med
    } else {
        newMedicine.medicine = null
    }
}

const addRevision = async () => {
    const {
        consti,
        sense,
        cardio,
        endocrine,
        gastro,
        genito,
        musculo,
        mental,
        neuro,
    } = newRevision;

    let denies = false

    if (consti === t('newCon.addRevision.switchLabel') &&
        sense === t('newCon.addRevision.switchLabel') &&
        cardio === t('newCon.addRevision.switchLabel') &&
        endocrine === t('newCon.addRevision.switchLabel') &&
        gastro === t('newCon.addRevision.switchLabel') &&
        genito === t('newCon.addRevision.switchLabel') &&
        musculo === t('newCon.addRevision.switchLabel') &&
        mental === t('newCon.addRevision.switchLabel') &&
        neuro === t('newCon.addRevision.switchLabel')) {
        denies = true
    }

    let rev = {
        consti,
        sense,
        cardio,
        endocrine,
        gastro,
        genito,
        musculo,
        mental,
        neuro,
        denies,
    }

    if (revisions.value.length > 0) {
        revisions[0] = rev
    } else {
        revisions.value.push(rev);
    }
    var elem: any = document.getElementById("addRevision-modal");
    var instance = M.Modal.getInstance(elem);

    instance.close();

}

const editRevision = async (revision: any) => {
    const {
        consti,
        sense,
        cardio,
        endocrine,
        gastro,
        genito,
        musculo,
        mental,
        neuro,
    } = revision
    var elem: any = document.getElementById("addRevision-modal");
    var instance = M.Modal.getInstance(elem)

    instance.open();

    const newRevision = {
        consti,
        sense,
        cardio,
        endocrine,
        gastro,
        genito,
        musculo,
        mental,
        neuro,
    }
}

const addExam = async () => {
    const {
        head,
        neck,
        eyes,
        nose,
        mouth,
        ears,
        cardio,
        thorax,
        abdomen,
        genital,
        extremities,
        mental,
        neuro,
        skin,
    } = newExam

    let normal = false

    if (head === "Normal" &&
        neck === "Normal" &&
        eyes === "Normal" &&
        nose === "Normal" &&
        mouth === "Normal" &&
        ears === "Normal" &&
        cardio === "Normal" &&
        thorax === "Normal" &&
        abdomen === "Normal" &&
        genital === "Normal" &&
        extremities === "Normal" &&
        mental === "Normal" &&
        skin === "Normal" &&
        neuro === "Normal") {
        normal = true
    }

    const exam = {
        head,
        neck,
        eyes,
        nose,
        mouth,
        ears,
        cardio,
        thorax,
        abdomen,
        genital,
        extremities,
        mental,
        neuro,
        skin,
        normal,
    }

    if (exams.value.length > 0) {
        exams[0] = exam
    } else {
        exams.push(exam);
    }
    var elem: any = document.getElementById("addExam-modal");
    var instance = M.Modal.getInstance(elem);

    instance.close(newExam);

    //   const newExam = {
    //     head: '',
    //     neck: '',
    //     eyes: '',
    //     nose: '',
    //     mouth: '',
    //     ears: '',
    //     cardio: '',
    //     thorax: '',
    //     abdomen: '',
    //     genital: '',
    //     extremities: '',
    //     mental: '',
    //     neuro: '',
    //     skin: '',
    //   }
}

const editExam = async (exam: any) => {
    const {
        head,
        neck,
        eyes,
        nose,
        mouth,
        ears,
        cardio,
        thorax,
        abdomen,
        genital,
        extremities,
        mental,
        neuro,
        skin,
    } = exam
    var elem: any = document.getElementById("addExam-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();

    const newExam = {
        head,
        neck,
        eyes,
        nose,
        mouth,
        ears,
        cardio,
        thorax,
        abdomen,
        genital,
        extremities,
        mental,
        neuro,
        skin,
    }
}

const addDiagnosis = async () => {

    const {
        principal,
        secondary
    } = newDiagnosis

    if (!principal) {
        return M.toast({
            html: t("newCon.addDiagnosis.error"),
        });
    }

    if (editingDiagnosis) {
        let index = diagnostics.indexOf(editingDiagnosis)
        diagnostics[index] = {
            id: editingDiagnosis.id,
            principal,
            secondary,
        }
        editingDiagnosis = null
    } else {
        const diagnosis = {
            id: diagnosisId,
            principal,
            secondary,
        }
        diagnostics.push(diagnosis)
        diagnosisId++
    }

    var elem: any = document.getElementById("addDiagnosis-modal");
    var instance = M.Modal.getInstance(elem);
    instance.close();
    newDiagnosis.principal = null
    newDiagnosis.secondary = null
}

const editDiagnosis = async (diag: any) => {
    const {
        principal,
        secondary
    } = diag

    newDiagnosis = {
        principal,
        secondary
    }

    editingDiagnosis = diag

    var elem: any = document.getElementById("addDiagnosis-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();

}

const deleteDiagnosis = (diag: any) => {
    diagnostics = diagnostics.filter((item: any) => item.id != diag.id)
}

const addPrescription = () => {

    if (!prescriptionDestiny || prescriptionDestiny.trim() == "") {
        return M.toast({
            html: t("newCon.addPrescription.errors[0]"),
        });
    }

    if (!prescriptionDiagnose) {
        return M.toast({
            html: t("newCon.addPrescription.errors[1]"),
        });
    }

    const prescription: any = {
        id: prescriptionId,
        destiny: prescriptionDestiny,
        diagnose: prescriptionDiagnose,
        medicines: [],
    }

    prescriptions.push(prescription)

    var elem: any = document.getElementById("addPrescription-modal");
    var instance = M.Modal.getInstance(elem);

    instance.close();

    prescriptionDestiny = ""
    prescriptionDiagnose = null,
        prescriptionId++
}
const deletePrescription = async (item: any) => {
    prescriptions = prescriptions.filter((i: any) => i.id != item.id)
}

const addMedicine = async () => {
    let {
        medicine,
        prescription,
        quantity,
        when,
        duration,
        frequency,
        description
    } = newMedicine

    if (!description || description.trim() == "" ||
        !quantity || !duration || !when || !frequency) {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    medicine.Quantity = quantity,
        medicine.Frequency = frequency,
        medicine.Duration = {
            Quantity: duration,
            Type: 'dias'
        }
    medicine.Annotation = description
    medicine.When = when.description

    const index = prescriptions.indexOf(prescription)

    prescriptions[index].medicines.push(medicine)

    newMedicine = {
        step: 1,
        prescription: null,
        medicine: null,
        quantity: null,
        frequency: null,
        duration: null,
        description: '',
        when: null,
    }

    var elem: any = document.getElementById("addMedicine-modal");
    var instance = M.Modal.getInstance(elem);

    instance.close();
}

const openMedicineModal = async (prescription: any) => {
    search = ""
    newMedicine.step = 1
    var elem: any = document.getElementById("addMedicine-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();

    newMedicine.prescription = prescription
}

const addOrder = async () => {

    if (!orderDestiny || orderDestiny.value.trim() == "") {
        return M.toast({
            html: t("newCon.addOrder.errors[0]"),
        });
    }

    if (!newLaboratory.type) {
        return M.toast({
            html: t("newCon.addOrder.errors[1]"),
        });
    }

    const order = {
        id: orderId,
        destiny: orderDestiny,
        type: newLaboratory.type,
        laboratories: [],
    }

    orders.push(order)

    var elem: any = document.getElementById("addOrder-modal");
    var instance = M.Modal.getInstance(elem);

    instance.close();

    orderDestiny = ""
    orderId++
}

const deleteOrder = async (item: any) => {
    orders = orders.filter((i: any) => i.id != item.id)
}

const openLabModal = (order: any) => {
    var elem: any = document.getElementById("addLab-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();

    newLaboratory.order = order
}

const addLab = async () => {
    const {
        selectedProc,
        order,
        diagnosis
    } = newLaboratory

    if (!diagnosis) {
        return M.toast({
            html: t("newCon.addLab.errors[0]"),
        });
    }

    if (!selectedProc) {
        return M.toast({
            html: t("newCon.addLab.errors[1]"),
        });
    }

    const index = orders.indexOf(order)

    orders[index].laboratories.push({
        Diagnose: diagnosis,
        Proc: selectedProc,
    })

    newLaboratory.type = null
    newLaboratory.selectedProc = null

    var elem: any = document.getElementById("addLab-modal");
    var instance = M.Modal.getInstance(elem);

    instance.close();
}

const addDocument = async () => {
    const {
        type
    } = newDocument

    if (type == 'disability') {

        let {
            description,
            diagnosis,
            days
        } = newDocument.disability

        if (!diagnosis || !description || description.trim() == "" || !days) {
            return M.toast({
                html: t("newCon.errormsg"),
            });
        }

        medicalDisability = {
            type: t('newCon.addDocument.options[0]'),
            Description: description,
            StartDate: startDate,
            EndDate: endDate,
            DisabilityDays: days,
            Diagnose: {
                Code: diagnosis.Code,
                Diagnose: diagnosis.Name
            }
        }

    } else {

        const {
            description,
            diagnosis
        } = newDocument.certificate

        if (!diagnosis || !description || description.trim() == "") {
            return M.toast({
                html: t("newCon.errormsg"),
            });
        }

        medicalCertificate = {
            type: t('newCon.addDocument.options[1]'),
            Description: description,
            Diagnose: {
                Code: diagnosis.Code,
                Diagnose: diagnosis.Name
            },
        }
    }

    newDocument = {
        type: "",
        hastype: false,
        disability: {
            diagnosis: null,
            description: '',
            dateRange: {
                start: new Date(),
                end: new Date(),
            },
            days: null,
        },
        certificate: {
            diagnosis: null,
            description: '',
        },
    }

    var elem: any = document.getElementById("addDocument-modal");
    var instance = M.Modal.getInstance(elem);

    instance.close();
}

const editDisability = async () => {
    const disability = {
        diagnosis: medicalDisability.Diagnose,
        description: medicalDisability.Description,
        days: medicalDisability.DisabilityDays,
    }

    newDocument.hastype = true
    newDocument.type = "disability"
    newDocument.disability = disability

    var elem: any = document.getElementById("addDocument-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}

const deleteDisability = async () => {
    medicalDisability = null
}

const editCertificate = async () => {
    const certificate = {
        diagnosis: medicalCertificate.Diagnose,
        description: medicalCertificate.Description,
    }

    newDocument.hastype = true
    newDocument.type = "certificate"
    newDocument.certificate = certificate

    let elem: any = document.getElementById("addDocument-modal");
    let instance = M.Modal.getInstance(elem);

    instance.open();
}

const deleteCertificate = async () => {
    medicalCertificate = null
}

const addAnalysis = async () => {
    const a = {
        description: analysisDesc,
    }

    if (!a.description || a.description.trim() == "") {
        return M.toast({
            html: t("newCon.addAnalysis.error"),
        });
    }

    analysis = a
    let elem: any = document.getElementById("addAnalysis-modal");
    let instance = M.Modal.getInstance(elem);

    instance.close();

    analysisDesc = ""
}

const editAnalysis = async () => {
    analysisDesc = analysis.description

    var elem: any = document.getElementById("addAnalysis-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}

const getProcedures = async (event: any) => {
    let term = event.query
    if (term.length >= 3) {
        const headers = {
            Authorization: `Bearer ${userToken.value}`,
            lang: import.meta.env.VITE_VUE_APP_LOCALE,
            country: import.meta.env.VITE_VUE_APP_COUNTRY,
            appid: import.meta.env.VITE_VUE_APP_APP_ID,
            companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
        };

        let type = newLaboratory.type

        const params = {
            term,
            count: 5,
            type,
            appid: import.meta.env.VITE_VUE_APP_APP_ID,
            companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
        }

        const response = await axios.get(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/procedures", {
            headers,
            params
        }
        );

        let data = response.data
        let newData = []
        for (let i = 0; i < data.length; i++) {
            const element = {
                Label: data[i].Code + ' - ' + data[i].Name,
                Name: data[i].Name,
                Code: data[i].Code,
                Description: data[i].Description,
                Applicability: data[i].Applicability,
            };
            newData.push(element)
        }

        procedures = newData
    }
}

const getState = async () => {
    let form = {
        head: '',
        neck: '',
        eyes: '',
        nose: '',
        mouth: '',
        ears: '',
        cardio: '',
        thorax: '',
        abdomen: '',
        genital: '',
        extremities: '',
        mental: '',
        neuro: '',
        skin: '',
    }
    if (switch1) {
        form = {
            head: 'Normal',
            neck: 'Normal',
            eyes: 'Normal',
            nose: 'Normal',
            mouth: 'Normal',
            ears: 'Normal',
            cardio: 'Normal',
            thorax: 'Normal',
            abdomen: 'Normal',
            genital: 'Normal',
            extremities: 'Normal',
            mental: 'Normal',
            neuro: 'Normal',
            skin: 'Normal',
        }
    }
    newExam = form
}

const getRevisionState = async () => {
    let form = {
        consti: '',
        sense: '',
        cardio: '',
        endocrine: '',
        gastro: '',
        genito: '',
        musculo: '',
        mental: '',
        neuro: '',
    }
    if (switch2) {
        form = {
            consti: t('newCon.addRevision.switchLabel'),
            sense: t('newCon.addRevision.switchLabel'),
            cardio: t('newCon.addRevision.switchLabel'),
            endocrine: t('newCon.addRevision.switchLabel'),
            gastro: t('newCon.addRevision.switchLabel'),
            genito: t('newCon.addRevision.switchLabel'),
            musculo: t('newCon.addRevision.switchLabel'),
            mental: t('newCon.addRevision.switchLabel'),
            neuro: t('newCon.addRevision.switchLabel'),
        }
    }
    newRevision = form
}

const createConsultation = async () => {
    let body = generateBody()

    if (body) {
        const headers = {
            Authorization: `Bearer ${userToken.value}`,
            lang: import.meta.env.VITE_VUE_APP_LOCALE,
            country: import.meta.env.VITE_VUE_APP_COUNTRY,
            appid: import.meta.env.VITE_VUE_APP_APP_ID,
            companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
        };

        loading = true

        try {
            await axios.post(import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/consultation", body, {
                headers,
            }).then((response) => {
                if (response.status == 200) {
                    M.toast({
                        html: t("newCon.addMsgs.success"),
                    });
                    available = false
                    $emit('newCon')
                } else {
                    M.toast({
                        html: t("newCon.addMsgs.success"),
                    });
                }
            })
        } catch (error) {
            console.log(error)
            M.toast({
                html: t("newCon.addMsgs.success"),
            });
        }

        loading = false
    }

}

const convertDate = async (date: any) => {
    return date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate())
}
const addZero = (date: any) => {
    if ((date / 10) < 1)
        return '0' + date

    return date
}

const isNumber = (evt: any) => {
    const keysAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const keyPressed = evt.key;

    if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault();
    }
}

const generateBody = async () => {

    let date = new Date()

    let dateStr = convertDate(date) + 'T' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date
        .getSeconds())

    let MedicalDisability = null
    if (medicalDisability) {
        MedicalDisability = {
            Description: medicalDisability ? medicalDisability.Description : null,
            Diagnose: medicalDisability ? medicalDisability.Diagnose : null,
            StartDate: medicalDisability ? medicalDisability.StartDate : null,
            EndDate: medicalDisability ? medicalDisability.EndDate : null,
            DisabilityDays: medicalDisability ? medicalDisability.DisabilityDays : null,
        }
    }

    let MedicalCertificate = null
    if (medicalCertificate) {
        MedicalCertificate = {
            Description: medicalCertificate ? medicalCertificate.Description : null,
            Diagnose: medicalCertificate ? medicalCertificate.Diagnose : null,
        }
    }



    let Diagnoses = []
    for (let i = 0; i < allDiagnose.length; i++) {
        let e = {
            Code: allDiagnose[i].Code,
            Diagnose: allDiagnose[i].Name
        }
        Diagnoses.push(e)
    }

    if (Diagnoses.length == 0) {
        M.toast({
            html: t("newCon.addMsgs.validations[0]"),
        });
        return null
    }


    let Recipes = []
    for (let i = 0; i < prescriptions.length; i++) {
        let e = prescriptions[i];
        let medications = []

        if (e.medicines.length == 0) {
            M.toast({
                html: t("newCon.addMsgs.validations[1]"),
            });
            return null
        }

        for (let k = 0; k < e.medicines.length; k++) {
            let med = {
                Quantity: e.medicines[k].Quantity,
                Annotation: e.medicines[k].Annotation,
                Frenquency: {
                    Quantitys: e.medicines[k].Frequency.Quantity,
                    Type: e.medicines[k].Frequency.Type
                },
                Duration: {
                    Quantity: e.medicines[k].Duration.Quantity,
                    Type: e.medicines[k].Duration.Type,
                },
                Atc: e.medicines[k].Code,
                ActiveSubstance: e.medicines[k].ActiveSubstance,
                Name: e.medicines[k].Name,
                Product: e.medicines[k].Product,
                Presentation: e.medicines[k].Presentation,
                Unit: e.medicines[k].Unit,
                Doze: e.medicines[k].Doze,
                Via: e.medicines[k].Via,
                Pharmacy: e.medicines[k].Pharmacy,
                When: e.medicines[k].When
            }

            medications.push(med)
        }

        let recipe = {
            Description: e.destiny,
            Diagnose: e.diagnose,
            Medications: medications,
        }


        Recipes.push(recipe)
    }

    let Orders = []
    for (let i = 0; i < orders.length; i++) {
        let e = orders[i];
        let procedures = []

        if (e.laboratories.length == 0) {
            M.toast({
                html: t("newCon.addMsgs.validations[2]"),
            });
            return null
        }

        for (let k = 0; k < e.laboratories.length; k++) {
            let proc = {
                Code: e.laboratories[k].Proc.Code,
                Name: e.laboratories[k].Proc.Name,
                Description: e.laboratories[k].Proc.Description,
                Applicability: e.laboratories[k].Proc.Applicability,
                Diagnose: {
                    Code: e.laboratories[k].Diagnose.Code,
                    Diagnose: e.laboratories[k].Diagnose.Name
                }
            }

            procedures.push(proc)
        }

        let order = {
            Type: e.type,
            Description: e.destiny,
            Procedures: procedures,
        }

        Orders.push(order)
    }

    let ReviewBySystems = null
    if (revisions.length > 0) {
        ReviewBySystems = {
            Constitucionales: revisions[0].consti,
            OrganosSentidos: revisions[0].sense,
            Cardiorespiratorio: revisions[0].cardio,
            Endocrino: revisions[0].endocrine,
            Gastrointestinal: revisions[0].gastro,
            Genitourinario: revisions[0].genito,
            Musculoesqueletico: revisions[0].musculo,
            Neurologico: revisions[0].neuro,
            Mental: revisions[0].mental
        }
    }

    let PhisicalExam = null
    if (exams.length > 0) {
        PhisicalExam = {
            Cabeza: exams[0].head,
            Cuello: exams[0].neck,
            Ojos: exams[0].eyes,
            Nariz: exams[0].nose,
            Boca: exams[0].mouth,
            Orejas: exams[0].ears,
            Cardiorespiratorio: exams[0].cardio,
            Torax: exams[0].thorax,
            Abdomen: exams[0].abdomen,
            Genital: exams[0].genital,
            Extremidades: exams[0].extremities,
            Mental: exams[0].mental,
            Neurologico: exams[0].neuro,
            Piel: exams[0].skin,
        }
    }

    let Analysis = null
    if (analysis) {
        Analysis = {
            Description: analysis.description
        }
    }

    let Note = null
    if (notes.length > 0) {
        Note = {
            Reason: notes[0].reason,
            Type: notes[0].type,
            Description: notes[0].illness,
        }
    }

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        Type: props.consultationType,
        Status: "4",
        DoctorId: "",
        Note,
        ReviewBySystems,
        PhisicalExam,
        Diagnoses,
        MedicalDisability,
        MedicalCertificate,
        Recipes,
        Orders,
        Analysis,
    }

    return body
}


const mounted = async () => {
    getConsultation()
    M.AutoInit();

    var select = document.querySelectorAll("select");
    M.FormSelect.init(select);

    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
}


</script>

<template>
    <div id="newConsultation">
        <div class="appointment-note">
            <div class="note-header">
                <p>{{ $t("newCon.titles[0]") }}</p>
                <a class="modal-trigger" href="#addNote-modal" v-if="notes.length <= 0" @click="newNote.hastype = false"><i
                        class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="notes.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("newCon.addNote.tableTitles[0]") }}</th>
                            <th v-if="notes[0].type === $t('newCon.addNote.choose.items[0]')">
                                {{ $t("newCon.addNote.tableTitles[1]") }}
                            </th>
                            <th>{{ $t("newCon.addNote.tableTitles[2]") }}</th>
                            <th>{{ $t("newCon.action") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(note, index) in notes" :key="note.id">
                            <td>{{ note.type }}</td>
                            <td v-if="note.type === $t('newCon.addNote.choose.items[0]')">{{ note.reason }}</td>
                            <td>{{ note.illness }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuNote', index)"
                                        aria-haspopup="true" aria-controls="overlay_menu1"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu id="overlay_menu1" ref="menuNote" :model="itemsNote" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" tabindex="0"
                                                @click="item.command(note)">
                                                <span class="p-menuitem-text">{{ item.label }}</span>
                                            </a>
                                        </template>
                                    </Menu>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="appointment-note">
            <div class="note-header">
                <p>{{ $t("newCon.titles[1]") }}</p>
                <a class="modal-trigger" href="#addRevision-modal" v-if="revisions.length <= 0"><i
                        class="material-icons">add</i> {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="revisions.length > 0">
                    <thead>
                        <tr>
                            <th v-if="revisions[0].denies">{{ $t("newCon.addRevision.switchLabel") }}</th>
                            <th v-if="!revisions[0].denies && revisions[0].consti !== ''">{{
                                $t("newCon.addRevision.fields[0]") }}
                            </th>
                            <th v-if="!revisions[0].denies && revisions[0].sense !== ''">{{
                                $t("newCon.addRevision.fields[1]") }}
                            </th>
                            <th v-if="!revisions[0].denies && revisions[0].cardio !== ''">{{
                                $t("newCon.addRevision.fields[2]") }}
                            </th>
                            <th v-if="!revisions[0].denies && revisions[0].endocrine !== ''">{{
                                $t("newCon.addRevision.fields[3]") }}
                            </th>
                            <th v-if="!revisions[0].denies && revisions[0].gastro !== ''">{{
                                $t("newCon.addRevision.fields[4]") }}
                            </th>
                            <th v-if="!revisions[0].denies && revisions[0].genito !== ''">{{
                                $t("newCon.addRevision.fields[5]") }}
                            </th>
                            <th v-if="!revisions[0].denies && revisions[0].musculo !== ''">{{
                                $t("newCon.addRevision.fields[6]") }}
                            </th>
                            <th v-if="!revisions[0].denies && revisions[0].neuro !== ''">{{
                                $t("newCon.addRevision.fields[7]") }}
                            </th>
                            <th v-if="!revisions[0].denies && revisions[0].mental !== ''">{{
                                $t("newCon.addRevision.fields[8]") }}
                            </th>
                            <th>{{ $t("newCon.action") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(revision, index) in revisions" :key="revision.id">
                            <td v-if="revision.denies"> Sí </td>
                            <td v-if="!revision.denies && revision.consti !== ''"> {{ revision.consti }}</td>
                            <td v-if="!revision.denies && revision.sense !== ''"> {{ revision.sense }}</td>
                            <td v-if="!revision.denies && revision.cardio !== ''"> {{ revision.cardio }}</td>
                            <td v-if="!revision.denies && revision.endocrine !== ''"> {{ revision.endocrine }}</td>
                            <td v-if="!revision.denies && revision.gastro !== ''"> {{ revision.gastro }}</td>
                            <td v-if="!revision.denies && revision.genito !== ''"> {{ revision.genito }}</td>
                            <td v-if="!revision.denies && revision.musculo !== ''"> {{ revision.musculo }}</td>
                            <td v-if="!revision.denies && revision.neuro !== ''"> {{ revision.neuro }}</td>
                            <td v-if="!revision.denies && revision.mental !== ''"> {{ revision.mental }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuRev', index)"
                                        aria-haspopup="true" aria-controls="overlay_menu2"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu id="overlay_menu2" ref="menuRev" :model="itemsRev" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(revision)">
                                                <span class="p-menuitem-text">{{ item.label }}</span>
                                            </a>
                                        </template>
                                    </Menu>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="appointment-note" v-if="consultationType != 2">
            <div class="note-header">
                <p>{{ $t("newCon.titles[2]") }}</p>
                <a class="modal-trigger" href="#addExam-modal" v-if="exams.length <= 0"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="exams.length > 0">
                    <thead>
                        <tr>
                            <th v-if="exams[0].normal">{{ $t("newCon.addExam.switchLabel") }}</th>
                            <th v-if="!exams[0].normal && exams[0].head !== ''">{{ $t("newCon.addExam.fields[0]") }}</th>
                            <th v-if="!exams[0].normal && exams[0].neck !== ''">{{ $t("newCon.addExam.fields[1]") }}</th>
                            <th v-if="!exams[0].normal && exams[0].eyes !== ''">{{ $t("newCon.addExam.fields[2]") }}</th>
                            <th v-if="!exams[0].normal && exams[0].nose !== ''">{{ $t("newCon.addExam.fields[3]") }}</th>
                            <th v-if="!exams[0].normal && exams[0].mouth !== ''">{{ $t("newCon.addExam.fields[4]") }}</th>
                            <th v-if="!exams[0].normal && exams[0].ears !== ''">{{ $t("newCon.addExam.fields[5]") }}</th>
                            <th v-if="!exams[0].normal && exams[0].cardio !== ''">{{ $t("newCon.addExam.fields[6]") }}</th>
                            <th v-if="!exams[0].normal && exams[0].thorax !== ''">{{ $t("newCon.addExam.fields[7]") }}</th>
                            <th v-if="!exams[0].normal && exams[0].abdomen !== ''">{{ $t("newCon.addExam.fields[8]") }}
                            </th>
                            <th v-if="!exams[0].normal && exams[0].genital !== ''">{{ $t("newCon.addExam.fields[9]") }}
                            </th>
                            <th v-if="!exams[0].normal && exams[0].extremities !== ''">{{ $t("newCon.addExam.fields[10]")
                            }}</th>
                            <th v-if="!exams[0].normal && exams[0].mental !== ''">{{ $t("newCon.addExam.fields[11]") }}
                            </th>
                            <th v-if="!exams[0].normal && exams[0].neuro !== ''">{{ $t("newCon.addExam.fields[12]") }}</th>
                            <th v-if="!exams[0].normal && exams[0].skin !== ''">{{ $t("newCon.addExam.fields[13]") }}</th>
                            <th>{{ $t("newCon.action") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(exam, index) in exams" :key="exam.id">
                            <td v-if="exam.normal"> Sí </td>
                            <td v-if="!exam.normal && exam.head !== ''"> {{ exam.head }}</td>
                            <td v-if="!exam.normal && exam.neck !== ''"> {{ exam.neck }}</td>
                            <td v-if="!exam.normal && exam.eyes !== ''"> {{ exam.eyes }}</td>
                            <td v-if="!exam.normal && exam.nose !== ''"> {{ exam.nose }}</td>
                            <td v-if="!exam.normal && exam.mouth !== ''"> {{ exam.mouth }}</td>
                            <td v-if="!exam.normal && exam.ears !== ''"> {{ exam.ears }}</td>
                            <td v-if="!exam.normal && exam.cardio !== ''"> {{ exam.cardio }}</td>
                            <td v-if="!exam.normal && exam.thorax !== ''"> {{ exam.thorax }}</td>
                            <td v-if="!exam.normal && exam.abdomen !== ''"> {{ exam.abdomen }}</td>
                            <td v-if="!exam.normal && exam.genital !== ''"> {{ exam.genital }}</td>
                            <td v-if="!exam.normal && exam.extremities !== ''"> {{ exam.extremities }}</td>
                            <td v-if="!exam.normal && exam.mental !== ''"> {{ exam.mental }}</td>
                            <td v-if="!exam.normal && exam.neuro !== ''"> {{ exam.neuro }}</td>
                            <td v-if="!exam.normal && exam.skin !== ''"> {{ exam.skin }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuExam', index)"
                                        aria-haspopup="true" aria-controls="overlay_menu3"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu id="overlay_menu3" ref="menuExam" :model="itemsExam" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(exam)">
                                                <span class="p-menuitem-text">{{ item.label }}</span>
                                            </a>
                                        </template>
                                    </Menu>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="appointment-note">
            <div class="note-header">
                <p>{{ $t("newCon.titles[3]") }}</p>
                <a class="modal-trigger" href="#addDiagnosis-modal"><i class="material-icons">add</i> {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="diagnostics.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("newCon.addDiagnosis.tableTitles[0]") }}</th>
                            <th>{{ $t("newCon.addDiagnosis.tableTitles[1]") }}</th>
                            <th>{{ $t("newCon.action") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(diagnosis, index) in diagnostics" :key="diagnosis.id">
                            <td>{{ diagnosis.principal.Label }}</td>
                            <td v-if="diagnosis.secondary">{{ diagnosis.secondary.Label }}</td>
                            <td v-else> </td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuDiag', index)"
                                        aria-haspopup="true" :aria-controls="'diag_menu' + diagnosis.id"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'diag_menu' + diagnosis.id" ref="menuDiag" :model="itemsDiag" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(diagnosis)">
                                                <span class="p-menuitem-text">{{ item.label }}</span>
                                            </a>
                                        </template>
                                    </Menu>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="appointment-note">
            <div class="note-header">
                <p>{{ $t("newCon.titles[4]") }}</p>
                <a class="modal-trigger" href="#addPrescription-modal"><i class="material-icons">add</i> {{ $t("newCon.add")
                }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="prescriptions.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("newCon.addPrescription.tableTitles[0]") }}</th>
                            <th>{{ $t("newCon.addPrescription.tableTitles[1]") }}</th>
                            <th>{{ $t("newCon.addPrescription.tableTitles[2]") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(prescription, index) in prescriptions" :key="prescription.id">
                            <td>{{ prescription.id }}</td>
                            <td>{{ prescription.destiny }}</td>
                            <td v-if="prescription.medicines.length <= 0"> </td>
                            <td v-else>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{{ $t("newCon.addPrescription.subTableTitles[0]") }}</th>
                                            <th>{{ $t("newCon.addPrescription.subTableTitles[1]") }}</th>
                                            <th>{{ $t("newCon.addPrescription.subTableTitles[2]") }}</th>
                                            <th>{{ $t("newCon.addPrescription.subTableTitles[3]") }}</th>
                                            <th>{{ $t("newCon.addPrescription.subTableTitles[4]") }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="medicine in prescription.medicines" :key="medicine">
                                            <td> {{ medicine.ActiveSubstance }} </td>
                                            <td> {{ medicine.Frequency.Label }}</td>
                                            <td> {{ medicine.Duration.Quantity }} {{ medicine.Duration.Type }} </td>
                                            <td> {{ medicine.Unit }}</td>
                                            <td> {{ medicine.Doze }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuPresc', index)"
                                        aria-haspopup="true" :aria-controls="'presc_menu' + prescription.id"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'presc_menu' + prescription.id" ref="menuPresc" :model="itemsPresc"
                                        :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(prescription)">
                                                <span class="p-menuitem-icon material-icons" v-if="item.icon">add</span>
                                                <span class="p-menuitem-text">{{ item.label }}</span>
                                            </a>
                                        </template>
                                    </Menu>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="appointment-note">
            <div class="note-header">
                <p>{{ $t("newCon.titles[5]") }}</p>
                <a class="modal-trigger" href="#addOrder-modal"><i class="material-icons">add</i> {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="orders.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("newCon.addOrder.tableTitles[0]") }}</th>
                            <th>{{ $t("newCon.addOrder.tableTitles[1]") }}</th>
                            <th>{{ $t("newCon.addOrder.tableTitles[2]") }}</th>
                            <th>{{ $t("newCon.action") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, index) in orders" :key="order.id">
                            <td>{{ order.id }}</td>
                            <td>{{ order.destiny }}</td>
                            <td v-if="order.laboratories.length > 0">
                                <table>
                                    <thead>
                                        <th>{{ $t("newCon.addOrder.subTableTitles[0]") }}</th>
                                        <th>{{ $t("newCon.addOrder.subTableTitles[1]") }}</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="lab in order.laboratories" :key="lab.Code">
                                            <td>{{ lab.Diagnose.Label }} </td>
                                            <td>{{ lab.Proc.Label }} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td v-else> </td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuOrder', index)"
                                        aria-haspopup="true" :aria-controls="'order_menu' + order.id"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'order_menu' + order.id" ref="menuOrder" :model="itemsOrder" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(order)">
                                                <span class="p-menuitem-icon material-icons" v-if="item.icon">add</span>
                                                <span class="p-menuitem-text">{{ item.label }}</span>
                                            </a>
                                        </template>
                                    </Menu>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="appointment-note">
            <div class="note-header">
                <p>{{ $t("newCon.titles[6]") }}</p>
                <a class="modal-trigger" href="#addDocument-modal" v-if="!medicalDisability || !medicalCertificate"
                    @click="newDocument.hastype = false"><i class="material-icons">add</i> {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="medicalDisability">
                    <thead>
                        <tr>
                            <th>{{ $t("newCon.addDocument.disability.tableTitles[0]") }}</th>
                            <th>{{ $t("newCon.addDocument.disability.tableTitles[1]") }}</th>
                            <th>{{ $t("newCon.addDocument.disability.tableTitles[2]") }}</th>
                            <th>{{ $t("newCon.addDocument.disability.tableTitles[3]") }}</th>
                            <th>{{ $t("newCon.action") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ medicalDisability.type }}</td>
                            <td>{{ medicalDisability.DisabilityDays }}</td>
                            <td>{{ medicalDisability.StartDate }}</td>
                            <td>{{ medicalDisability.EndDate }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggleObj($event, 'menuDisab')"
                                        aria-haspopup="true" aria-controls="disability_menu"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu id="disability_menu" ref="menuDisab" :model="itemsDisa" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command()">
                                                <span class="p-menuitem-text">{{ item.label }}</span>
                                            </a>
                                        </template>
                                    </Menu>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="medicalCertificate">
                    <thead>
                        <tr>
                            <th>{{ $t("newCon.addDocument.certificate.tableTitles[0]") }}</th>
                            <th>{{ $t("newCon.addDocument.certificate.tableTitles[1]") }}</th>
                            <th>{{ $t("newCon.addDocument.certificate.tableTitles[2]") }}</th>
                            <th>{{ $t("newCon.action") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ medicalCertificate.type }}</td>
                            <td>{{ medicalCertificate.Diagnose.Code }} - {{ medicalCertificate.Diagnose.Diagnose }}</td>
                            <td>{{ medicalCertificate.Description }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more"><i class="material-icons"
                                            @click="toggleObj($event, 'menuCert')" aria-haspopup="true"
                                            aria-controls="certificate_menu">more_vert</i></a>
                                    <Menu id="certificate_menu" ref="menuCert" :model="itemsCert" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command()">
                                                <span class="p-menuitem-text">{{ item.label }}</span>
                                            </a>
                                        </template>
                                    </Menu>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="appointment-note">
            <div class="note-header">
                <p>{{ $t("newCon.titles[7]") }}</p>
                <a class="modal-trigger" href="#addAnalysis-modal" v-if="!analysis"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="analysis">
                    <thead>
                        <tr>
                            <th>{{ $t("newCon.addAnalysis.tableTitle") }}</th>
                            <th>{{ $t("newCon.action") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ analysis.description }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more"><i class="material-icons"
                                            @click="toggleObj($event, 'menuAnalysis')" aria-haspopup="true"
                                            aria-controls="analysis_menu">more_vert</i></a>
                                    <Menu id="analysis_menu" ref="menuAnalysis" :model="itemsAnalysis" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command()">
                                                <span class="p-menuitem-text">{{ item.label }}</span>
                                            </a>
                                        </template>
                                    </Menu>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="d-flex" v-if="available">
            <button class="waves-effect waves-light btn btn-primary btn-rounded" id="save-button"
                @click="createConsultation">
                {{ $t("newCon.button") }}
            </button>
        </div>

        <!-- Add-note modal -->
        <div id="addNote-modal" class="modal" :class="{ 'modal-small': !newNote.hastype }">
            <div class="modal-content">
                <div class="choose-type" v-if="!newNote.hastype">
                    <h4 class="left-align">{{ $t("newCon.addNote.choose.title") }}</h4>
                    <div class="type">
                        <h5>{{ $t("newCon.addNote.choose.items[0]") }} </h5>
                        <label>
                            <input class="with-gap" id="type-consultation" type="radio"
                                :value="$t('newCon.addNote.choose.items[0]')" v-model="newNote.type" />
                            <span> </span>
                        </label>
                    </div>
                    <div class="type">
                        <h5>{{ $t("newCon.addNote.choose.items[1]") }} </h5>
                        <label>
                            <input class="with-gap" id="type-evolution" type="radio"
                                :value="$t('newCon.addNote.choose.items[1]')" v-model="newNote.type" />
                            <span> </span>
                        </label>
                    </div>
                </div>
                <div class="reason" v-if="newNote.hastype && newNote.type == $t('newCon.addNote.choose.items[0]')">
                    <h4 class="left-align">{{ $t("newCon.addNote.reason.title") }}</h4>
                    <div class="col s12 input-field">
                        <input id="reason" name="reason" type="text" v-model="newNote.reason" autocomplete="off" />
                        <label for="reason">{{ $t("newCon.addNote.reason.inputLabel") }}</label>
                    </div>
                    <p class="col s12 left-align">
                        {{ $t("newCon.addNote.reason.textareaLabel") }}
                    </p>
                    <textarea name="add-note" id="add-note" rows="30" v-model="newNote.illness"></textarea>
                </div>
                <div class="evolution" v-if="newNote.hastype && newNote.type == $t('newCon.addNote.choose.items[1]')">
                    <h4 class="left-align">{{ $t("newCon.addNote.evolutionNote.title") }}</h4>
                    <p class="col s12 left-align">
                        {{ $t("newCon.addNote.evolutionNote.label") }}
                    </p>
                    <textarea name="add-note" id="add-note" rows="30" v-model="newNote.illness"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded">{{
                    $t("newCon.btnCancel")
                }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!newNote.hastype"
                    @click="newNote.hastype = true">{{ $t("newCon.btnNext") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-else @click="addNote">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- End add-note modal -->

        <!-- Physical exam modal -->
        <div id="addExam-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align">{{ $t("newCon.addExam.title") }}</h4>
                <div class="switch-cont d-flex">
                    <span> {{ $t('newCon.addExam.switchLabel') }} </span>
                    <InputSwitch v-model="switch1" @change="getState" />
                </div>
                <div class="row">
                    <form class="col s12 modal-form">
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="head">{{ $t("newCon.addExam.fields[0]") }}</label>
                                <input class="rounded-input" id="head" name="head" type="text" v-model="newExam.head">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="neck">{{ $t("newCon.addExam.fields[1]") }}</label>
                                <input class="rounded-input" id="neck" name="neck" type="text" v-model="newExam.neck">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="eyes">{{ $t("newCon.addExam.fields[2]") }}</label>
                                <input class="rounded-input" id="eyes" name="eyes" type="text" v-model="newExam.eyes">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="nose">{{ $t("newCon.addExam.fields[3]") }}</label>
                                <input class="rounded-input" id="nose" name="nose" type="text" v-model="newExam.nose">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="mouth">{{ $t("newCon.addExam.fields[4]") }}</label>
                                <input class="rounded-input" id="mouth" name="mouth" type="text" v-model="newExam.mouth">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="ears">{{ $t("newCon.addExam.fields[5]") }}</label>
                                <input class="rounded-input" id="ears" name="ears" type="text" v-model="newExam.ears">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="cardio">{{ $t("newCon.addExam.fields[6]") }}</label>
                                <input class="rounded-input" id="cardio" name="cardio" type="text" v-model="newExam.cardio">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="thorax">{{ $t("newCon.addExam.fields[7]") }}</label>
                                <input class="rounded-input" id="thorax" name="thorax" type="text" v-model="newExam.thorax">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="abdomen">{{ $t("newCon.addExam.fields[8]") }}</label>
                                <input class="rounded-input" id="abdomen" name="abdomen" type="text"
                                    v-model="newExam.abdomen">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="genital">{{ $t("newCon.addExam.fields[9]") }}</label>
                                <input class="rounded-input" id="genital" name="genital" type="text"
                                    v-model="newExam.genital">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="extremities">{{ $t("newCon.addExam.fields[10]") }}</label>
                                <input class="rounded-input" id="extremities" name="extremities" type="text"
                                    v-model="newExam.extremities">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="mental">{{ $t("newCon.addExam.fields[11]") }}</label>
                                <input class="rounded-input" id="mental" name="mental" type="text" v-model="newExam.mental">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="neuro">{{ $t("newCon.addExam.fields[12]") }}</label>
                                <input class="rounded-input" id="neuro" name="neuro" type="text" v-model="newExam.neuro">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="skin">{{ $t("newCon.addExam.fields[13]") }}</label>
                                <input class="rounded-input" id="skin" name="skin" type="text" v-model="newExam.skin">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded">{{
                    $t("newCon.btnCancel")
                }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addExam">{{ $t("newCon.btnSave")
                }}</a>
            </div>
        </div>
        <!-- End Physical exam modal -->

        <!-- review exam modal -->
        <div id="addRevision-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align">{{ $t("newCon.addRevision.title") }}</h4>
                <div class="switch-cont d-flex">
                    <span> {{ $t('newCon.addRevision.switchLabel') }} </span>
                    <InputSwitch v-model="switch2" @change="getRevisionState" />
                </div>
                <div class="row">
                    <form class="col s12 modal-form">
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="consti">{{ $t("newCon.addRevision.fields[0]") }}</label>
                                <input class="rounded-input" id="consti" name="consti" type="text"
                                    v-model="newRevision.consti">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="sense">{{ $t("newCon.addRevision.fields[1]") }}</label>
                                <input class="rounded-input" id="sense" name="sense" type="text"
                                    v-model="newRevision.sense">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="cardio">{{ $t("newCon.addRevision.fields[2]") }}</label>
                                <input class="rounded-input" id="cardio" name="cardio" type="text"
                                    v-model="newRevision.cardio">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="endocrine">{{ $t("newCon.addRevision.fields[3]") }}</label>
                                <input class="rounded-input" id="endocrine" name="endocrine" type="text"
                                    v-model="newRevision.endocrine">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="gastro">{{ $t("newCon.addRevision.fields[4]") }}</label>
                                <input class="rounded-input" id="gastro" name="gastro" type="text"
                                    v-model="newRevision.gastro">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="genito">{{ $t("newCon.addRevision.fields[5]") }}</label>
                                <input class="rounded-input" id="genito" name="genito" type="text"
                                    v-model="newRevision.genito">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="musculo">{{ $t("newCon.addRevision.fields[6]") }}</label>
                                <input class="rounded-input" id="musculo" name="musculo" type="text"
                                    v-model="newRevision.musculo">
                            </div>
                            <div class="col s12 m12 l6">
                                <label for="neuro">{{ $t("newCon.addRevision.fields[7]") }}</label>
                                <input class="rounded-input" id="neuro" name="neuro" type="text"
                                    v-model="newRevision.neuro">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <label for="mental">{{ $t("newCon.addRevision.fields[8]") }}</label>
                                <input class="rounded-input" id="mental" name="mental" type="text"
                                    v-model="newRevision.mental">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded">{{
                    $t("newCon.btnCancel")
                }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addRevision">{{ $t("newCon.btnSave")
                }}</a>
            </div>
        </div>
        <!-- End review exam modal -->

        <!-- add Diagnosis modal -->
        <div id="addDiagnosis-modal" class="modal">
            <div class="modal-content">
                <h4 class="left-align">{{ $t("newCon.addDiagnosis.title") }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l6">
                        <span class="p-float-label">
                            <AutoComplete id="principal" v-model="newDiagnosis.principal" :suggestions="cie10info"
                                @complete="getCie10($event)" field="Label" :minLength="3" />
                            <label for="principal">{{ $t('newCon.addDiagnosis.selects[0]') }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l6">
                        <span class="p-float-label">
                            <AutoComplete id="secondary" v-model="newDiagnosis.secondary" :suggestions="cie10info"
                                @complete="getCie10($event)" field="Label" :minLength="3" />
                            <label for="secondary">{{ $t('newCon.addDiagnosis.selects[1]') }}</label>
                        </span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded">{{
                    $t("newCon.btnCancel")
                }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addDiagnosis">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- End add-Diagnosis modal -->

        <!-- add new prescriptions modal -->
        <div id="addPrescription-modal" class="modal">
            <div class="modal-content">
                <h4 class="left-align">{{ $t("newCon.addPrescription.title") }} {{ prescriptions.length + 1 }} </h4>
                <div class="row">
                    <div class="input-field col s12 m12 l6">
                        <input id="destiny" type="text" v-model="prescriptionDestiny">
                        <label for="destiny">{{ $t("newCon.addPrescription.inputLabel") }}</label>
                    </div>
                    <div class="col s12 m12 l6 drop-col">
                        <span class="p-float-label">
                            <Dropdown id="dropdown1" v-model="prescriptionDiagnose" :options="allDiagnose"
                                optionLabel="Label" :emptyMessage="$t('newCon.addDocument.emptySelect')" />
                            <label for="dropdown1">{{ $t('newCon.addDocument.disability.labels[0]') }}</label>
                        </span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded">{{
                    $t("newCon.btnCancel")
                }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addPrescription">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- End add-prescriptions modal -->

        <!-- Add-Medicine modal -->
        <div id="addMedicine-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="newMedicine.step == 1">{{ $t("newCon.addMedicine.title1") }}</h4>
                <h4 class="left-align" v-else>{{ $t("newCon.addMedicine.title2") }}</h4>
                <div class="table-medicine" v-if="newMedicine.step == 1">
                    <div class="col s12 m12 l8">
                        <div class="search-input">
                            <i class="material-icons">search</i>
                            <input type="text" :placeholder="$t('userList.placeholder')" :value="search"
                                @input="event => search = event?.target?.value" autocomplete="off" />
                        </div>
                    </div>
                    <div class="col s12">
                        <div class="fix-width scroll-inner">
                            <table>
                                <thead>
                                    <tr>
                                        <th> {{ $t('newCon.addMedicine.tableTitles[0]') }} </th>
                                        <th> {{ $t('newCon.addMedicine.tableTitles[1]') }} </th>
                                        <th> {{ $t('newCon.addMedicine.tableTitles[2]') }} </th>
                                        <th> {{ $t('newCon.addMedicine.tableTitles[3]') }} </th>
                                        <th> {{ $t('newCon.addMedicine.tableTitles[4]') }} </th>
                                        <th> {{ $t('newCon.addMedicine.tableTitles[5]') }} </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="medicine in medicines" :key="medicine"
                                        :class="{ active: medicine === newMedicine.medicine }"
                                        @click="selectMedicine(medicine)">
                                        <td> {{ medicine.ActiveSubstance }} </td>
                                        <td> {{ medicine.Product }} </td>
                                        <td> {{ medicine.CommercialDescription }} </td>
                                        <td> {{ medicine.Presentation }} </td>
                                        <td> {{ medicine.Unit }} </td>
                                        <td> {{ medicine.Doze }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="formula" v-if="newMedicine.step == 2">
                    <div class="row">
                        <div class="input-field col s12 m12 l4">
                            <input id="quantity" type="number" @keypress="isNumber($event)" v-model="newMedicine.quantity"
                                autocomplete="off">
                            <label for="quantity">{{ $t('newCon.addMedicine.formulaLabels[0]') }}</label>
                        </div>
                        <div class="col s12 m12 l4 drop-col">
                            <span class="p-float-label">
                                <Dropdown id="frequency" v-model="newMedicine.frequency" :options="frequencies"
                                    optionLabel="Label" :emptyMessage="$t('newCon.addDocument.emptySelect')" />
                                <label for="frequency">{{ $t('newCon.addMedicine.formulaLabels[1]') }}</label>
                            </span>
                        </div>
                        <div class="col s12 m12 l4 drop-col">
                            <span class="p-float-label">
                                <Dropdown id="when" v-model="newMedicine.when" :options="whenList" optionLabel="description"
                                    :emptyMessage="$t('newCon.addDocument.emptySelect')" />
                                <label for="when">{{ $t('newCon.addMedicine.formulaLabels[2]') }}</label>
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m12 l6 d-flex days-col">
                            <div class="input-field">
                                <input id="duration" type="number" @keypress="isNumber($event)"
                                    v-model="newMedicine.duration" autocomplete="off">
                                <label for="duration">{{ $t('newCon.addMedicine.formulaLabels[3]') }}</label>
                            </div>
                            <p>{{ $t('newCon.addMedicine.days') }}</p>
                        </div>
                        <div class="col s2"></div>
                        <div class="input-field col s12">
                            <textarea name="add-descMed" id="add-descDiag" rows="30" v-model="newMedicine.description"
                                :placeholder="$t('newCon.addDocument.textAreaPlaceholder')"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="d-flex">
                    <div>
                        {{ $t('newCon.addMedicine.step') }} {{ newMedicine.step }}/2
                    </div>
                    <div>
                        <a class="modal-close waves-effect waves-light btn btn-rounded">{{ $t("newCon.btnCancel") }}</a>
                        <button class="waves-effect waves-light btn btn-primary btn-rounded" v-if="newMedicine.step == 1"
                            @click="newMedicine.step++" :disabled="newMedicine.medicine == null">{{ $t("newCon.btnNext")
                            }}</button>
                        <a class="waves-effect waves-light btn btn-primary btn-rounded" v-else @click="addMedicine">{{
                            $t("newCon.btnSave") }}</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- End add-Medicine modal -->

        <!-- add Order modal -->
        <div id="addOrder-modal" class="modal">
            <div class="modal-content">
                <h4 class="left-align">{{ $t("newCon.addOrder.title") }} {{ orderId }} </h4>
                <div class="row">
                    <div class="input-field col s12 m12 l6">
                        <input id="destiny" type="text" v-model="orderDestiny">
                        <label for="destiny">{{ $t("newCon.addOrder.inputLabel") }}</label>
                    </div>
                    <div class="input-field col s12 m12 l6">
                        <select v-model="newLaboratory.type">
                            <option value="1"> {{ $t('newCon.addLab.selectItems[0]') }} </option>
                            <option value="2"> {{ $t('newCon.addLab.selectItems[1]') }} </option>
                            <option value="3"> {{ $t('newCon.addLab.selectItems[2]') }} </option>
                            <option value="4"> {{ $t('newCon.addLab.selectItems[3]') }} </option>
                        </select>
                        <label> {{ $t('newCon.addLab.labels[0]') }} </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded">{{
                    $t("newCon.btnCancel")
                }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addOrder">{{ $t("newCon.btnSave")
                }}</a>
            </div>
        </div>
        <!-- End add-Order modal -->

        <!-- add lab-modal -->
        <div id="addLab-modal" class="modal">
            <div class="modal-content">
                <h4 class="left-align">{{ $t("newCon.addLab.title") }}</h4>
                <div class="row">
                    <div class="col s12 m12 l6 drop-col">
                        <span class="p-float-label">
                            <Dropdown id="dropdownlab" v-model="newLaboratory.diagnosis" :options="allDiagnose"
                                optionLabel="Label" :emptyMessage="$t('newCon.addDocument.emptySelect')" />
                            <label for="dropdownlab">{{ $t('newCon.addDocument.disability.labels[0]') }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l6">
                        <span class="p-float-label">
                            <AutoComplete v-model="newLaboratory.selectedProc" :suggestions="procedures"
                                @complete="getProcedures($event)" field="Label" :minLength="3"
                                :disabled="!newLaboratory.diagnosis" />
                            <label>{{ $t('newCon.addLab.labels[1]') }}</label>
                        </span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded">{{
                    $t("newCon.btnCancel")
                }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addLab">{{ $t("newCon.btnSave")
                }}</a>
            </div>
        </div>
        <!-- end addLab modal -->

        <!-- Add-Document modal -->
        <div id="addDocument-modal" class="modal" :class="{ 'modal-small': !newDocument.hastype }">
            <div class="modal-content">
                <div class="choose-type" v-if="!newDocument.hastype">
                    <h4 class="left-align">{{ $t("newCon.addDocument.title") }}</h4>
                    <div class="type" v-if="!medicalDisability">
                        <h5>{{ $t("newCon.addDocument.options[0]") }} </h5>
                        <label>
                            <input class="with-gap" id="type-consultation" type="radio" value="disability"
                                v-model="newDocument.type" />
                            <span> </span>
                        </label>
                    </div>
                    <div class="type" v-if="!medicalCertificate">
                        <h5>{{ $t("newCon.addDocument.options[1]") }} </h5>
                        <label>
                            <input class="with-gap" id="type-evolution" type="radio" value="certificate"
                                v-model="newDocument.type" />
                            <span> </span>
                        </label>
                    </div>
                </div>
                <div class="disability" v-if="newDocument.hastype && newDocument.type == 'disability'">
                    <h4 class="left-align">{{ $t("newCon.addDocument.disability.title") }}</h4>

                    <div class="col s12 m10 l6 drop-col">
                        <span class="p-float-label">
                            <Dropdown id="dropdown1" v-model="newDocument.disability.diagnosis" :options="allDiagnose"
                                optionLabel="Label" :emptyMessage="$t('newCon.addDocument.emptySelect')" />
                            <label for="dropdown1">{{ $t('newCon.addDocument.disability.labels[0]') }}</label>
                        </span>
                    </div>

                    <p class="col s12 left-align">
                        {{ $t("newCon.addDocument.disability.labels[1]") }}
                    </p>
                    <textarea name="add-descDiag" id="add-descDiag" rows="30" v-model="newDocument.disability.description"
                        :placeholder="$t('newCon.addDocument.textAreaPlaceholder')"></textarea>
                    <div class="row">
                        <div class="col s12 m10 l6 input-field">
                            <input id="days" name="days" type="number" @keypress="isNumber($event)"
                                v-model="newDocument.disability.days" autocomplete="off" />
                            <label for="days">{{ $t("newCon.addDocument.disability.labels[2]") }}</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col s6">
                            <p class="left-align">{{ $t('newCon.addDocument.disability.labels[3]') }}</p>
                            <input id="start-date" :value="startDate" disabled />
                        </div>

                        <div class="col s6">
                            <p class="left-align">{{ $t('newCon.addDocument.disability.labels[4]') }}</p>
                            <input id="end-date" :value="endDate" disabled />
                        </div>
                    </div>


                </div>

                <div class="certificate" v-if="newDocument.hastype && newDocument.type == 'certificate'">
                    <h4 class="left-align">{{ $t("newCon.addDocument.certificate.title") }}</h4>

                    <div class="col s12 m10 l6 drop-col">
                        <span class="p-float-label">
                            <Dropdown id="dropdown2" v-model="newDocument.certificate.diagnosis" :options="allDiagnose"
                                optionLabel="Label" :emptyMessage="$t('newCon.addDocument.emptySelect')" />
                            <label for="dropdown2">{{ $t('newCon.addDocument.certificate.labels[0]') }}</label>
                        </span>
                    </div>

                    <p class="col s12 left-align">
                        {{ $t("newCon.addDocument.certificate.labels[1]") }}
                    </p>
                    <textarea name="add-desc" id="add-desc" rows="30" v-model="newDocument.certificate.description"
                        :placeholder="$t('newCon.addDocument.textAreaPlaceholder')"></textarea>
                </div>

            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded">{{
                    $t("newCon.btnCancel")
                }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!newDocument.hastype"
                    @click="newDocument.hastype = true">{{ $t("newCon.btnNext") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-else @click="addDocument">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- End add-Document modal -->

        <!-- Add-analysis modal -->
        <div id="addAnalysis-modal" class="modal">
            <div class="modal-content">
                <h4 class="left-align">{{ $t("newCon.addAnalysis.title") }}</h4>
                <textarea name="add-note" id="add-note" rows="30" v-model="analysisDesc"></textarea>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded">{{
                    $t("newCon.btnCancel")
                }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addAnalysis">{{ $t("newCon.btnSave")
                }}</a>
            </div>
        </div>
        <!-- End add-analysis modal -->

        <div id="loading-modal" v-if="loading">
            <div class="modal-content">
                <ProgressSpinner />
                <h4>{{ $t("newCon.loading") }}...</h4>
            </div>
        </div>

        <BlockUI :blocked="loading" :fullScreen="true"></BlockUI>
    </div>
</template>

<style scoped>
#newConsultation {
    position: relative;
    padding: 16px 20px;
    overflow-y: scroll;
    height: calc(100% - 135px);
}

.modal,
#newConsultation:deep(.modal-overlay) {
    position: absolute !important;
}

#newConsultation:deep(.modal-overlay) {
    top: 0 !important;
    height: 100%;
}

.input-field {
    padding: 0;
}

.modal-content h4 {
    font-weight: 700;
    font-size: 18px;
    line-height: 27px;
}

.modal-content p {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #909194;
    margin-bottom: 10px !important;
}

.modal-footer .btn {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #ffffff !important;
    padding: 10px 24px;
    box-shadow: none !important;
}

.modal-footer .d-flex {
    justify-content: space-between;
    align-items: center;
}

.modal .modal-footer {
    padding: 15px 24px 0;
    margin-bottom: 17px;
}

.modal-footer .modal-close {
    background: #e1e2e6;
    color: #656e73 !important;
    margin-right: 16px !important;
}

#save-button {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
}

.more {
    border-radius: 50%;
}

#addExam-modal label,
#addRevision-modal label {
    float: left !important;
    margin: 0 15px 6px;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #3F454E;
}

#addExam-modal .row,
#addRevision-modal .row {
    margin-bottom: 0;
}

.switch-cont span {
    font-weight: 500;
    color: #3F454E;
    margin-right: 10px;
}

#addExam-modal h4,
#addRevision-modal h4,
.switch-cont {
    margin-left: 15px !important;
}

.switch-cont {
    margin: 20px 0;
}

#addPrescription .input-field {
    padding: 0 0.75rem !important;
}

#addNote-modal .modal-content h5,
#addDocument-modal .modal-content h5 {
    font-weight: 400 !important;
    font-size: 16px !important;
    line-height: 24px !important;
    margin: 0 !important;
    letter-spacing: 0.5px !important;
    color: #1B1D1F !important;
}

.type {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0 5px;
}

.disability .row p {
    font-size: 12px !important;
    line-height: 18px !important;
    margin: 0 !important;
}

.disability .row {
    margin-left: 0 !important;
    margin-bottom: 0 !important;
}

.table-medicine {
    min-height: 420px !important;
}

#addMedicine .modal-footer {
    margin-top: 24px;
}

#addMedicine-modal tbody tr {
    cursor: pointer;
}

#addMedicine-modal tbody tr.active {
    background-color: #d1d2d4;
}

#addMedicine-modal tbody tr td {
    border-radius: 0 !important;
}

#addMedicine-modal tbody tr:hover {
    background-color: #e1e2e6;
}

#addMedicine-modal .formula .row {
    margin-bottom: 0 !important;
}

#addMedicine-modal .formula .days-col {
    align-items: center;
}

#addMedicine-modal .formula .days-col p {
    margin: 5px 5px 0 !important;
}

#addMedicine-modal .formula .input-field,
#addMedicine-modal .formula .drop-col {
    margin: 15px 0 !important;
}

#addLab-Modal .drop-col {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

#addMedicine-modal .formula .drop-col {
    padding: 0 0.75rem !important;
}

#addMedicine-modal .formula input[type="number"] {
    text-align: center;
}

#loading-modal {
    position: fixed !important;
    top: 25% !important;
    width: 40%;
    z-index: 9999;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 25px 0;
}

#loading-modal h4 {
    font-size: 30px !important;
    margin: 35px 0 !important;
}

@media (max-width: 882px) {
    .modal-small {
        width: 80% !important;
    }
}
</style>