<script setup lang="ts">

import axios from "axios";
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import M from "materialize-css";
import risk from "src/data/risk.json";
import relation from "src/data/relation.json";
import transfusion from "src/data/transfusion.json";
import consume from "src/data/consume.json";
import surgery from "src/data/surgery.json";
import generalMixin from "src/mixins/generalMixin.js";

const mixins = <any>[generalMixin]
const { t } = useI18n()
const userToken = ref("")
let pathologies = ref<any>([])
let allergies = ref<any>([])
let relatives = ref<any>([])
let watching = <boolean>(false)
let risks = ref<any>([])
let hospitalizations = ref<any>([])
let toxics = ref<any>([])
let immunizations = ref<any>([])
let surgeries = ref<any>([])
let traumas = ref<any>([])
let transfusions = ref<any>([])
let medicaments = ref<any>([])
let search = ref<any>("")
let medicines = ref<any>([])
let procedures = ref<any>([])
let cie10info = ref<any>([])
const locale = () => {
    return t
}
const riskType = risk
const relationType = relation
const doses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const surgeryType = surgery
const consumeType = consume
const transfusionType = transfusion

let newPathology: any = {
    pathology: null,
    by: '',
    when: new Date(),
    note: '',
}

let newAllergy: any = {
    allergy: null,
    by: '',
    when: new Date(),
    treatment: '',
    frequency: '',
}

let newFamily: any = {
    name: '',
    relation: null,
    pathology: null,
}

let newRisk: any = {
    type: null,
    risk: null,
    note: "",
}
let newHospi: any = {
    range: {
        start: null,
        end: null,
    },
    doctor: '',
    where: '',
    reason: '',
    doc: null,
    file64: '',
}

let newToxic: any = {
    type: null,
    consume: '',
    severity: null,
    start: null,
    end: null,
    description: '',
}

let newImmu = {
    name: '',
    date: new Date(),
    pharma: '',
    dose: 1,
    note: '',
}

let newSurgery: any = {
    type: null,
    procedure: null,
    date: new Date(),
    note: ''
}

let newTrauma: any = {
    trauma: null,
    date: new Date(),
    note: '',
}

let newTransfusion = {
    type: null,
    quantity: null,
    date: new Date(),
    note: '',
}

let newMedicine: any = {
    step: 1,
    medicine: 0,
    quantity: null,
    frequency: null,
    duration: null,
    description: '',
    when: null,
    date: null,
    reason: null,
}


const itemsPatho = [
    {
        label: t("background.option"),
        command: (patho: any) => seePathology(patho),
    },
]


const itemsAllergy = [
    {
        label: t("background.option"),
        command: (allergy: any) => seeAllergy(allergy),
    },
]

const itemsFamily = [
    {
        label: t("background.option"),
        command: (family: any) => seeFamily(family),
    },
]


const itemsHospi = [
    {
        label: t("background.option"),
        command: (hospi: any) => seeHospi(hospi),
    },
]

const itemsToxic = [
    {
        label: t("background.option"),
        command: (toxic: any) => seeToxic(toxic),
    },
]

const itemsImmu = [
    {
        label: t("background.option"),
        command: (immu: any) => seeImmu(immu),
    },
]

const itemsSurgery = [
    {
        label: t("background.option"),
        command: (sur: any) => seeSurgery(sur),
    },
]

const itemsTrauma = [
    {
        label: t("background.option"),
        command: (trauma: any) => seeTrauma(trauma),
    },
]
const itemsTransfusion = [
    {
        label: t("background.option"),
        command: (trans: any) => seeTransfusion(trans),
    },
]
const itemsMed = [
    {
        label: t("background.option"),
        command: (med: any) => seeMedicine(med),
    },
]

const itemsRisk = [
    {
        label: t("background.option"),
        command: (risk: any) => seeRisk(risk),
    },
]

const substances = () => {
    const locale = t.locale
    if (locale == 'es') {
        return consumeType.substancesEs
    } else if (locale == 'en') {
        return consumeType.substancesEn
    } else {
        return consumeType.substancesPr
    }
}

const typesSurgery = () => {
    const locale = t.locale
    if (locale == 'es') {
        return surgeryType.surgeryEs
    } else if (locale == 'en') {
        return surgeryType.surgeryEn
    } else {
        return surgeryType.surgeryPr
    }
}

const typesTransfusion = () => {
    const locale = t.locale
    if (locale == 'es') {
        return transfusionType.transfusionEs
    } else if (locale == 'en') {
        return transfusionType.transfusionEn
    } else {
        return transfusionType.transfusionPr
    }
}

const typesUnit = () => {
    t
    const locale = t.locale
    if (locale == 'es') {
        return ["1 Unidad", "2 Unidades", "3 Unidades", "4 Unidades", "5 Unidades", "6 Unidades", "7 Unidades", "8 Unidades", "9 Unidades", "10 Unidades"]
    } else if (locale == 'en') {
        return ["1 Unit", "2 Units", "3 Units", "4 Units", "5 Units", "6 Units", "7 Units", "8 Units", "9 Units", "10 Units"]
    } else {
        return ["1 Unidade", "2 Unidades", "3 Unidades", "4 Unidades", "5 Unidades", "6 Unidades", "7 Unidades", "8 Unidades", "9 Unidades", "10 Unidades"]
    }
}


const risksTypes: any = () => {
    const locale = t.locale
    if (locale == 'es') {
        return riskType.es
    } else if (locale == 'en') {
        return riskType.en
    } else {
        return riskType.pr
    }
}

const relationships = () => {
    const locale = t.locale
    if (locale == 'es') {
        return relationType.relationshipEs
    } else if (locale == 'en') {
        return relationType.relationshipEn
    } else {
        return relationType.relationshipPr
    }
}
const props = {
    patient: {
        type: Object, required: true,
        Id: Object
    },
    consultationId: String,
}

const addPathology = async () => {
    const { pathology, by, note, when } = newPathology

    if (!pathology || !by || by.trim() == "" || !note || note.trim() == "") {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        DoctorId: "",
        CreationDate: convertDate(when),
        DoctorName: by,
        Diagnose: {
            Code: pathology.Code,
            Diagnose: pathology.Name,
        },
        Annotation: note,
    }

    console.log(body)

    var elem: any = document.getElementById("addPathology-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/pathology", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.pathology.msg"),
                });
                getPathology()
                instance.close()
                clearPathology()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}
const getPathology = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_env.VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/pathology", {
        headers,
        params
    }
    );

    pathologies = response.data
}

const seePathology = (patho: any) => {
    watching = true

    newPathology = {
        pathology: {
            Label: patho.Diagnose.Code + ' - ' + patho.Diagnose.Diagnose,
            Code: patho.Diagnose.Code,
            Name: patho.Diagnose.Diagnose,
        },
        by: patho.DoctorName ? patho.DoctorName : '',
        when: new Date(patho.CreationDate),
        note: patho.Annotation,
    }

    var elem: any = document.getElementById("addPathology-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}
const clearPathology = () => {
    newPathology = {
        pathology: null,
        by: '',
        when: new Date(),
        note: '',
    }

    watching = false
}

const addAllergy = async () => {
    const { allergy, by, treatment, when, frequency } = newAllergy

    if (!allergy || !by || by.trim() == "" || !treatment || treatment.trim() == "") {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        DoctorId: "",
        Diagnose: {
            Code: allergy.Code,
            Diagnose: allergy.Name,
        },
        DoctorName: by,
        CreationDate: convertDate(when),
        treatment,
        frequency,
    }

    console.log(body)
    var elem: any = document.getElementById("addAllergy-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/allergy", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.allergy.msg"),
                });
                getAllergy()
                instance.close()
                clearAllergy()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}

const getAllergy = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/allergy", {
        headers,
        params
    }
    );

    allergies = response.data
}
const clearAllergy = async () => {
    newAllergy = {
        allergy: null,
        by: '',
        when: new Date(),
        treatment: '',
        frequency: '',
    }

    watching = false
}

const seeAllergy = async (alle: any) => {
    watching = true

    newAllergy = {
        allergy: {
            Label: alle.Diagnose.Code + ' - ' + alle.Diagnose.Diagnose,
            Code: alle.Diagnose.Code,
            Name: alle.Diagnose.Diagnose,
        },
        by: alle.DoctorName ? alle.DoctorName : '',
        when: new Date(alle.CreationDate),
        treatment: alle.treatment,
        frequency: alle.frequency,
    }

    var elem: any = document.getElementById("addAllergy-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}
const addFamily = async () => {
    const { name, relation, pathology } = newFamily

    if (!pathology || !name || name.trim() == "" || !relation) {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        DoctorId: "",
        Name: name,
        Relationship: relation,
        Diagnose: {
            Code: pathology.Code,
            Diagnose: pathology.Name,
        },
    }

    console.log(body)
    var elem: any = document.getElementById("addFamily-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/family", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.family.msg"),
                });
                getFamily()
                instance.close()
                clearFamily()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}
const getFamily = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_env.VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/family", {
        headers,
        params
    }
    );

    relatives = response.data
}
const seeFamily = async (family: any) => {
    watching = true

    newFamily = {
        name: family.Name,
        relation: family.Relationship,
        pathology: {
            Code: family.Diagnose.Code,
            Name: family.Diagnose.Diagnose,
            Label: family.Diagnose.Code + ' - ' + family.Diagnose.Diagnose
        },
    }

    var elem: any = document.getElementById("addFamily-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}

const clearFamily = async () => {
    newFamily = {
        name: '',
        relation: null,
        pathology: null,
    }

    watching = false
}

const addRisk = async () => {
    const { type, risk, note } = newRisk

    if (!risk || !note || note.trim() == "" || !type) {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        DoctorId: "",
        Type: type,
        Severity: risk,
        Annotation: note,
    }

    console.log(body)
    var elem: any = document.getElementById("addRisk-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/risk", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.risk.msg"),
                });
                getRisk()
                instance.close()
                clearRisk()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}
const getRisk = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/risk", {
        headers,
        params
    }
    );

    risks = response.data
}

const seeRisk = async (risk: any) => {
    watching = true

    newRisk = {
        type: risk.Type,
        risk: risk.Severity,
        note: risk.Annotation,
    }

    var elem: any = document.getElementById("addRisk-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}

const clearRisk = async () => {
    newRisk = {
        type: null,
        risk: null,
        note: "",
    }

    watching = false
}

const addHospi = async () => {
    const { doctor, where, reason, range, doc, file64 } = newHospi

    if (!doctor || doctor.trim() == "" || !reason || !where || where.trim() == "" || !range.start || !range.end) {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        DoctorId: "",
        DoctorName: doctor,
        StartDate: convertDate(range.start),
        EndDate: convertDate(range.end),
        Hospital: where,
        Diagnose: {
            Code: reason.Code,
            Diagnose: reason.Name,
        },
        File: doc ? {
            Name: doc.name,
            Type: doc.type,
            Base: file64
        } : null,
    }

    console.log(body)
    var elem: any = document.getElementById("addHospi-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/hospitalization", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.hospi.msg"),
                });
                getHospi()
                instance.close()
                clearHospi()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}
const getHospi = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/hospitalization", {
        headers,
        params
    }
    );

    hospitalizations = response.data
}

const seeHospi = async (hospi: any) => {
    watching = true

    newHospi = {
        range: {
            start: new Date(hospi.StartDate),
            end: new Date(hospi.EndDate),
        },
        doctor: hospi.DoctorName,
        where: hospi.Hospital,
        reason: {
            Code: hospi.Diagnose.Code,
            Label: hospi.Diagnose.Code + ' - ' + hospi.Diagnose.Diagnose,
            Name: hospi.Diagnose.Diagnose,
        },
        doc: hospi.File,
    }

    var elem: any = document.getElementById("addHospi-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}

let clearHospi = () => {
    newHospi = {
        start: null,
        end: null,
        doctor: '',
        where: '',
        reason: '',
        doc: null,
    }

    watching = false
}

const addToxic = async () => {
    const { type, consume, severity, start, end, description } = newToxic

    if (!type || !severity || !consume || consume.trim() == "" || !start || !description || description.trim() == "") {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        DoctorId: "",
        StartDate: convertDate(start),
        EndDate: end ? convertDate(end) : "",
        Type: type,
        Consume: consume,
        Severity: severity,
        Annotation: description,
    }

    console.log(body)
    var elem: any = document.getElementById("addToxic-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/toxicology", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.toxic.msg"),
                });
                getToxic()
                instance.close()
                clearToxic()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}

const getToxic = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/toxicology", {
        headers,
        params
    }
    );

    toxics = response.data
}

const seeToxic = async (toxic: any) => {
    watching = true

    newToxic = {
        type: toxic.Type,
        consume: toxic.Consume,
        severity: toxic.Severity,
        start: new Date(toxic.StartDate),
        end: new Date(toxic.EndDate),
        description: toxic.Annotation,
    }

    var elem: any = document.getElementById("addToxic-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}

const clearToxic = async () => {
    newToxic = {
        type: null,
        consume: '',
        severity: null,
        start: null,
        end: null,
        description: '',
    }

    watching = false
}

const addImmu = async () => {
    const { name, date, pharma, dose, note } = newImmu

    if (!name || name.trim() == "" || !pharma || pharma.trim() == "") {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        DoctorId: "",
        Date: convertDate(date),
        Name: name,
        Pharma: pharma,
        Dose: dose.toString(),
        Annotation: note,
    }

    console.log(body)
    var elem: any = document.getElementById("addImmu-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/immunization", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.immu.msg"),
                });
                getImmu()
                instance.close()
                clearImmu()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}

const getImmu = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/immunization", {
        headers,
        params
    }
    );

    immunizations = response.data
}

const seeImmu = async (immu: any) => {
    watching = true

    newImmu = {
        name: immu.Name,
        date: new Date(immu.Date),
        pharma: immu.Pharma,
        dose: parseInt(immu.Dose),
        note: immu.Annotation,
    }

    var elem: any = document.getElementById("addImmu-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}

const clearImmu = async () => {
    newImmu = {
        name: '',
        date: new Date(),
        pharma: '',
        dose: 1,
        note: '',
    }

    watching = false
}

const addSurgery = async () => {
    const { type, procedure, date, note } = newSurgery

    if (!type || !procedure || !date || !note || note.trim() == "") {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        DoctorId: "",
        Date: convertDate(date),
        Type: type,
        Procedure: {
            Code: procedure.Code,
            Name: procedure.Name,
            Applicability: procedure.Applicability,
            Description: procedure.Description
        },
        Annotation: note,
    }

    console.log(body)
    var elem: any = document.getElementById("addSurgery-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/surgery", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.surgery.msg"),
                });
                getSurgery()
                instance.close()
                clearSurgery()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}

const getSurgery = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/surgery", {
        headers,
        params
    }
    );

    surgeries = response.data
}

const seeSurgery = async (sur: any) => {
    watching = true

    newSurgery = {
        type: sur.Type,
        procedure: {
            Code: sur.Procedure.Code,
            Label: sur.Procedure.Code + ' - ' + sur.Procedure.Name,
            Name: sur.Procedure.Name,
            Description: sur.Procedure.Description,
            Applicability: sur.Procedure.Applicability,
        },
        date: new Date(sur.Date),
        note: sur.Annotation
    }

    var elem: any = document.getElementById("addSurgery-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}

const clearSurgery = async () => {
    newSurgery = {
        type: null,
        procedure: null,
        date: new Date(),
        note: ''
    }

    watching = false
}

const addTrauma = async () => {
    const { trauma, date, note } = newTrauma

    if (!trauma || !date) {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        DoctorId: "",
        Date: convertDate(date),
        Diagnose: {
            Code: trauma.Code,
            Diagnose: trauma.Name,
        },
        Annotation: note,
    }

    console.log(body)
    var elem: any = document.getElementById("addTrauma-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/trauma", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.trauma.msg"),
                });
                getTrauma()
                instance.close()
                clearTrauma()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}

const getTrauma = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/trauma", {
        headers,
        params
    }
    );

    traumas = response.data
}

const seeTrauma = async (trauma: any) => {
    watching = true

    newTrauma = {
        trauma: {
            Code: trauma.Diagnose.Code,
            Label: trauma.Diagnose.Code + ' - ' + trauma.Diagnose.Diagnose,
            Name: trauma.Diagnose.Diagnose,
        },
        date: new Date(trauma.Date),
        note: trauma.Annotation,
    }

    var elem: any = document.getElementById("addTrauma-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}

const clearTrauma = async () => {
    newTrauma = {
        trauma: null,
        date: new Date(),
        note: '',
    }

    watching = false
}

const addTransfusion = async () => {
    const { type, quantity, date, note } = newTransfusion

    if (!type || !quantity || !date || !note || note.trim() == "") {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        ConsultationDate: dateStr,
        PatientId: props.patient.Id,
        DoctorId: "",
        Date: convertDate(date),
        Type: type,
        Quantity: quantity,
        Annotation: note,
    }

    console.log(body)
    var elem: any = document.getElementById("addTransfusion-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/transfusion", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.transfusion.msg"),
                });
                getTransfusion()
                instance.close()
                clearTransfusion()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}

const getTransfusion = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/transfusion", {
        headers,
        params
    }
    );

    transfusions = response.data
}

const seeTransfusion = async (trans: any) => {
    watching = true

    newTransfusion = {
        type: trans.Type,
        quantity: trans.Quantity,
        date: new Date(trans.Date),
        note: trans.Annotation
    }

    var elem: any = document.getElementById("addTransfusion-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}
const clearTransfusion = async () => {
    newTransfusion = {
        type: null,
        quantity: null,
        date: new Date(),
        note: '',
    }

    watching = false
}

const addMedicine = async () => {
    const {
        medicine,
        quantity,
        when,
        duration,
        frequency,
        description,
        date,
        reason,
    } = newMedicine

    if (!description || description.trim() == "" || !quantity ||
        !duration || !when || !frequency || !date || !reason) {
        return M.toast({
            html: t("newCon.errormsg"),
        });
    }

    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    let newDate = new Date()

    let dateStr = newDate.toISOString();

    const body = {
        ConsultationId: props.consultationId,
        PatientId: props.patient.Id,
        DoctorId: "",
        ConsultationDate: dateStr,
        Date: convertDate(date),
        Diagnose: {
            Code: reason.Code,
            Diagnose: reason.Name,
        },
        Quantity: quantity,
        Annotation: description,
        Frenquency: {
            Quantity: frequency.Quantity,
            Type: frequency.Type,
        },
        Duration: {
            Quantity: duration,
            Type: locale == "en" ? 'Days' : 'Dias'
        },
        Atc: medicine.Code,
        ActiveSubstance: medicine.ActiveSubstance,
        Name: medicine.Name,
        Product: medicine.Product,
        Presentation: medicine.Presentation,
        Unit: medicine.Unit,
        Doze: medicine.Doze,
        Via: medicine.Via,
        Pharmacy: medicine.Pharmacy
    }

    console.log(body)
    var elem: any = document.getElementById("addMed-modal");
    var instance = M.Modal.getInstance(elem);

    try {
        await axios.post(
            import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/medicine", body, {
            headers,
        }
        ).then(response => {
            if (response.status == 200) {
                M.toast({
                    html: t("background.medicine.msg"),
                });
                getMeds()
                instance.close()
                clearMedicine()
            }
        });
    } catch (error) {
        M.toast({
            html: t("newCon.addMsgs.error"),
        });
    }
}

const getMeds = async () => {
    const headers = {
        Authorization: `Bearer ${userToken.value}`,
        lang: import.meta.env.VITE_VUE_APP_LOCALE,
        country: import.meta.env.VITE_VUE_APP_COUNTRY,
        appid: import.meta.env.VITE_VUE_APP_APP_ID,
        companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
    };

    const params = {
        patientId: props.patient.Id,
        count: 100,
    }

    const response = await axios.get(
        import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/background/medicine", {
        headers,
        params
    }
    );

    medicaments = response.data
}

const seeMedicine = async (med: any) => {
    watching = true

    newMedicine = {
        step: 2,
        medicine: med,
        quantity: med.Quantity,
        frequency: {
            Label: med.Frenquency.Quantity + ' ' + med.Frenquency.Type,
            Quantity: med.Frenquency.Quantity,
            Type: med.Frenquency.Type,
        },
        duration: med.Duration.Quantity,
        description: med.Annotation,
        when: {
            description: med.When,
        },
        date: new Date(med.Date),
        reason: {
            Label: med.Diagnose.Code + ' - ' + med.Diagnose.Diagnose,
            Code: med.Diagnose.Code,
            name: med.Diagnose.Diagnose,
        },
    }

    var elem: any = document.getElementById("addMed-modal");
    var instance = M.Modal.getInstance(elem);

    instance.open();
}

const clearMedicine = async () => {
    newMedicine = {
        step: 1,
        medicine: null,
        quantity: null,
        frequency: null,
        duration: null,
        description: '',
        when: null,
        date: null,
        reason: null,
    }
    search = ''
    medicines = []

    watching = false
}

const selectMedicine = async (med: any) => {
    if (med !== newMedicine.medicine) {
        newMedicine.medicine = med
    } else {
        newMedicine.medicine = null
    }
}

const selectImage = async (e: any) => {
    var file = e.target.files[0]
    console.log(file);
    newHospi.doc = file;

    const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    try {
        let result: any = await toBase64(file)
        result = result.replace('data:', '').replace(/^.+,/, '')
        newHospi.file64 = result
    } catch (error) {
        console.log(error)
    }
}

const downloadFile = (pdf: any, filename: any) => {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = filename;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

const getProcedures = async (event: any) => {
    let term = event.query
    if (term.length >= 3) {
        const headers = {
            Authorization: `Bearer ${userToken.value}`,
            lang: import.meta.env.VITE_VUE_VUE_APP_LOCALE,
            country: import.meta.env.VITE_VUE_VUE_APP_COUNTRY,
            appid: import.meta.env.VITE_VUE_VUE_APP_APP_ID,
            companyid: import.meta.env.VITE_VUE_VUE_APP_COMPANY_ID,
        };

        const params = {
            term,
            count: 5,
            type: "1",
            appid: import.meta.env.VITE_VUE_VUE_APP_APP_ID,
            companyid: import.meta.env.VITE_VUE_VUE_APP_COMPANY_ID,
        }

        const response = await axios.get(
            import.meta.env.VITE_VUE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/procedures", {
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

const mounted = () => {
    getPathology()
    getAllergy()
    getFamily()
    getHospi()
    getToxic()
    getImmu()
    getSurgery()
    getTrauma()
    getTransfusion()
    getMeds()
    getRisk()
    M.AutoInit();

    let select = document.querySelectorAll("select");
    M.FormSelect.init(select);

    let modals = document.querySelectorAll(".modal");
    let modalOption = {
        onOpenStart: function () {
            document.getElementById('background').style.overflow = "hidden"
        },
        onCloseStart: function () {
            document.getElementById('background').style.overflow = "scroll"
        }
    }
    M.Modal.init(modals, modalOption);

}


</script>

<template>
    <div id="background">
        <div class="appointment-note">
            <div class="note-header">
                <p>{{ $t("background.titles[0]") }}</p>
                <a class="modal-trigger" href="#addPathology-modal" @click="clearPathology"><i
                        class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="pathologies.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.pathology.labels[0]") }}</th>
                            <th>{{ $t("background.pathology.labels[2]") }}</th>
                            <th>{{ $t("background.pathology.labels[1]") }}</th>
                            <th>{{ $t("background.pathology.labels[3]") }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(pat, index) in pathologies" :key="index">
                            <td>{{ pat.Diagnose.Code }} - {{ pat.Diagnose.Diagnose }}</td>
                            <td>{{ pat.CreationDate.split('T')[0] }}</td>
                            <td>{{ pat.DoctorName }}</td>
                            <td>{{ pat.Annotation }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuPath', index)"
                                        aria-haspopup="true" :aria-controls="'path_menu' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'path_menu' + index" ref="menuPath" :model="itemsPatho" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(pat)">
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
                <p>{{ $t("background.titles[1]") }}</p>
                <a class="modal-trigger" href="#addAllergy-modal" @click="clearAllergy"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="allergies.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.allergy.labels[0]") }}</th>
                            <th>{{ $t("background.allergy.labels[2]") }}</th>
                            <th>{{ $t("background.allergy.labels[1]") }}</th>
                            <th>{{ $t("background.allergy.labels[3]") }}</th>
                            <th>{{ $t("background.allergy.labels[4]").split(' ')[0] }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(allergy, index) in allergies" :key="index">
                            <td>{{ allergy.Diagnose.Code }} - {{ allergy.Diagnose.Diagnose }}</td>
                            <td>{{ allergy.CreationDate.split('T')[0] }}</td>
                            <td>{{ allergy.DoctorName }}</td>
                            <td>{{ allergy.treatment }}</td>
                            <td v-if="allergy.frequency">{{ allergy.frequency }}</td>
                            <td v-else> </td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuAlle', index)"
                                        aria-haspopup="true" :aria-controls="'allergy_menu-' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'allergy_menu-' + index" ref="menuAlle" :model="itemsAllergy" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(allergy)">
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
                <p>{{ $t("background.titles[2]") }}</p>
                <a class="modal-trigger" href="#addFamily-modal" @click="clearFamily"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="relatives.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.family.labels[0]") }}</th>
                            <th>{{ $t("background.family.labels[3]") }}</th>
                            <th>{{ $t("background.family.labels[1]") }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(family, index) in relatives" :key="index">
                            <td>{{ family.Name }}</td>
                            <td>{{ family.Diagnose.Code }} - {{ family.Diagnose.Diagnose }}</td>
                            <td>{{ family.Relationship }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuFamily', index)"
                                        aria-haspopup="true" :aria-controls="'family_menu-' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'family_menu-' + index" ref="menuFamily" :model="itemsFamily" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(family)">
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
                <p>{{ $t("background.titles[3]") }}</p>
                <a class="modal-trigger" href="#addHospi-modal"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="hospitalizations.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.hospi.labels[0]") }}</th>
                            <th>{{ $t("background.hospi.labels[1]") }}</th>
                            <th>{{ $t("background.hospi.labels[3]") }}</th>
                            <th>{{ $t("background.hospi.labels[4]") }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(hospi, index) in hospitalizations" :key="index">
                            <td>{{ hospi.StartDate.split('T')[0] }}</td>
                            <td>{{ hospi.EndDate.split('T')[0] }}</td>
                            <td>{{ hospi.Hospital }}</td>
                            <td>{{ hospi.Diagnose.Code }} - {{ hospi.Diagnose.Diagnose }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuHospi', index)"
                                        aria-haspopup="true" :aria-controls="'hospi_menu-' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'hospi_menu-' + index" ref="menuHospi" :model="itemsHospi" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(hospi)">
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
                <p>{{ $t("background.titles[4]") }}</p>
                <a class="modal-trigger" href="#addToxic-modal" @click="clearToxic"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="toxics.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.toxic.tableTitles[0]") }}</th>
                            <th>{{ $t("background.toxic.labels[1]") }}</th>
                            <th>{{ $t("background.toxic.labels[3]") }}</th>
                            <th>{{ $t("background.toxic.labels[4]") }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(toxic, index) in toxics" :key="index">
                            <td>{{ toxic.Type }}</td>
                            <td>{{ toxic.Consume }}</td>
                            <td>{{ toxic.StartDate.split('T')[0] }}</td>
                            <td v-if="toxic.EndDate">{{ toxic.EndDate.split('T')[0] }}</td>
                            <td v-else>---</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuToxic', index)"
                                        aria-haspopup="true" :aria-controls="'toxic_menu-' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'toxic_menu-' + index" ref="menuToxic" :model="itemsToxic" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(toxic)">
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
                <p>{{ $t("background.titles[5]") }}</p>
                <a class="modal-trigger" href="#addImmu-modal" @click="clearImmu"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="immunizations.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.immu.labels[0]") }}</th>
                            <th>{{ $t("background.immu.tableTitles[0]") }}</th>
                            <th>{{ $t("background.immu.labels[2]") }}</th>
                            <th>{{ $t("background.immu.tableTitles[1]") }}</th>
                            <th>{{ $t("background.immu.labels[4]") }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(immu, index) in immunizations" :key="index">
                            <td>{{ immu.Name }}</td>
                            <td v-if="immu.Date">{{ immu.Date.split('T')[0] }}</td>
                            <td v-else>---</td>
                            <td>{{ immu.Pharma }}</td>
                            <td>{{ immu.Dose }}</td>
                            <td>{{ immu.Annotation }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuImmu', index)"
                                        aria-haspopup="true" :aria-controls="'immu_menu-' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'immu_menu-' + index" ref="menuImmu" :model="itemsImmu" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(immu)">
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
                <p>{{ $t("background.titles[6]") }}</p>
                <a class="modal-trigger" href="#addSurgery-modal"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="surgeries.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.surgery.labels[0]") }}</th>
                            <th>{{ $t("background.surgery.labels[1]") }}</th>
                            <th>{{ $t("background.surgery.labels[2]") }}</th>
                            <th>{{ $t("background.surgery.labels[3]") }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(sur, index) in surgeries" :key="index">
                            <td>{{ sur.Type }}</td>
                            <td>{{ sur.Procedure.Code }} - {{ sur.Procedure.Name }}</td>
                            <td>{{ sur.Date.split('T')[0] }}</td>
                            <td>{{ sur.Annotation }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuSurg', index)"
                                        aria-haspopup="true" :aria-controls="'surg_menu' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'surg_menu' + index" ref="menuSurg" :model="itemsSurgery" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(sur)">
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
                <p>{{ $t("background.titles[7]") }}</p>
                <a class="modal-trigger" href="#addTrauma-modal"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="traumas.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.trauma.labels[3]") }}</th>
                            <th>{{ $t("background.trauma.labels[1]") }}</th>
                            <th>{{ $t("background.trauma.labels[2]") }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(tra, index) in traumas" :key="index">
                            <td>{{ tra.Diagnose.Code }} - {{ tra.Diagnose.Diagnose }}</td>
                            <td>{{ tra.Date.split('T')[0] }}</td>
                            <td>{{ tra.Annotation }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuTrauma', index)"
                                        aria-haspopup="true" :aria-controls="'trauma_menu' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'trauma_menu' + index" ref="menuTrauma" :model="itemsTrauma" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(tra)">
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
                <p>{{ $t("background.titles[8]") }}</p>
                <a class="modal-trigger" href="#addTransfusion-modal"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="transfusions.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.transfusion.labels[0]") }}</th>
                            <th>{{ $t("background.transfusion.labels[2]") }}</th>
                            <th>{{ $t("background.transfusion.labels[1]") }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(trans, index) in transfusions" :key="index">
                            <td>{{ trans.Type }}</td>
                            <td>{{ trans.Date.split('T')[0] }}</td>
                            <td>{{ trans.Quantity }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more"
                                        @click="toggle($event, 'menuTransfusion', index)" aria-haspopup="true"
                                        :aria-controls="'transfusion_menu' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'transfusion_menu' + index" ref="menuTransfusion" :model="itemsTransfusion"
                                        :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(trans)">
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
                <p>{{ $t("background.titles[9]") }}</p>
                <a class="modal-trigger" href="#addMed-modal"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="medicaments.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.medicine.tableTitles[0]") }}</th>
                            <th>{{ $t("background.medicine.tableTitles[1]") }}</th>
                            <th>{{ $t("background.medicine.tableTitles[2]") }}</th>
                            <th>{{ $t("background.medicine.tableTitles[3]") }}</th>
                            <th>{{ $t("background.medicine.tableTitles[4]") }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(med, index) in medicaments" :key="index">
                            <td>{{ med.ActiveSubstance }}</td>
                            <td>{{ med.Diagnose.Code }} - {{ med.Diagnose.Diagnose }}</td>
                            <td>{{ med.Date.split('T')[0] }}</td>
                            <td>{{ med.Frenquency.Quantity }} {{ med.Frenquency.Type }} - {{ med.Duration.Quantity }} {{
                                med.Duration.Type }} </td>
                            <td>{{ med.Unit }}</td>
                            <td>{{ med.Doze }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuMed', index)"
                                        aria-haspopup="true" :aria-controls="'med_menu-' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'med_menu-' + index" ref="menuMed" :model="itemsMed" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(med)">
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
                <p>{{ $t("background.titles[10]") }}</p>
                <a class="modal-trigger" href="#addRisk-modal"><i class="material-icons">add</i>
                    {{ $t("newCon.add") }}
                </a>
            </div>
            <div class="fix-width scroll-inner">
                <table v-if="risks.length > 0">
                    <thead>
                        <tr>
                            <th>{{ $t("background.risk.tableTitles[0]") }}</th>
                            <th>{{ $t("background.risk.tableTitles[1]") }}</th>
                            <th>{{ $t("background.risk.tableTitles[2]") }}</th>
                            <th>{{ $t("background.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(risk, index) in risks" :key="index">
                            <td>{{ risk.Type }}</td>
                            <td>{{ risk.ConsultationDate.split('T')[0] }}</td>
                            <td>{{ risk.Severity }}</td>
                            <td>
                                <div class="pos-rel">
                                    <a class="waves-effect waves-ligh more" @click="toggle($event, 'menuRisk', index)"
                                        aria-haspopup="true" :aria-controls="'risk_menu-' + index"><i
                                            class="material-icons">more_vert</i></a>
                                    <Menu :id="'risk_menu-' + index" ref="menuRisk" :model="itemsRisk" :popup="true">
                                        <template #item="{ item }">
                                            <a class="p-menuitem-link" role="menuitem" @click="item.command(risk)">
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

        <!-- Add pathology modal -->
        <div id="addPathology-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="!watching">{{ $t("background.pathology.title") }}</h4>
                <h4 class="left-align" v-else>{{ $t("background.pathology.title").split(" ")[1] }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <AutoComplete id="name-path" v-model="newPathology.pathology" :suggestions="cie10info"
                                @complete="getCie10($event)" field="Label" :minLength="3" :disabled="watching" />
                            <label for="name-path">{{ $t('background.pathology.labels[0]') }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <InputText id="diagnosedBy-path" name="diagnosedBy-path" type="text" v-model="newPathology.by"
                                autocomplete="off" :disabled="watching" />
                            <label for="diagnosedBy-path">{{ $t("background.pathology.labels[1]") }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l4">
                        <v-date-picker :locale="locale" v-model="newPathology.when" :max-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <span class="p-float-label">
                                    <input class="p-filled" :value="inputValue" v-on="inputEvents" :disabled="watching" />
                                    <label for="diagnosedBy-path">{{ $t("background.pathology.labels[2]") }}</label>
                                </span>
                            </template>
                        </v-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <p class="left-align">
                            {{ $t("background.pathology.labels[3]") }}
                        </p>
                        <textarea name="add-note" id="add-note" rows="30" v-model="newPathology.note"
                            :disabled="watching"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                    $t("newCon.btnCancel") }}</a>
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearPathology">{{
                    $t("background.btnClose") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!watching" @click="addPathology">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- end Add pathology modal -->

        <!-- Add allergy modal -->
        <div id="addAllergy-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="!watching">{{ $t("background.allergy.title") }}</h4>
                <h4 class="left-align" v-else>{{ $t("background.allergy.title").split(" ")[1] }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <AutoComplete id="name-path" v-model="newAllergy.allergy" :suggestions="cie10info"
                                @complete="getCie10($event)" field="Label" :minLength="3" :disabled="watching" />
                            <label for="name-path">{{ $t('background.allergy.labels[0]') }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <InputText id="diagnosedBy-path" name="diagnosedBy-path" type="text" v-model="newAllergy.by"
                                autocomplete="off" :disabled="watching" />
                            <label for="diagnosedBy-path">{{ $t("background.allergy.labels[1]") }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l4">
                        <v-date-picker :locale="locale" v-model="newAllergy.when" :max-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <span class="p-float-label">
                                    <input class="p-filled" :value="inputValue" v-on="inputEvents" :disabled="watching" />
                                    <label for="diagnosedBy-path">{{ $t("background.allergy.labels[2]") }}</label>
                                </span>
                            </template>
                        </v-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <p class="left-align">
                            {{ $t("background.allergy.labels[3]") }}
                        </p>
                        <textarea name="add-note" id="add-note" rows="30" v-model="newAllergy.treatment"
                            :disabled="watching"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <p class="left-align">
                            {{ $t("background.allergy.labels[4]") }}
                        </p>
                        <textarea name="add-note" id="add-note" rows="30" v-model="newAllergy.frequency"
                            :disabled="watching"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                    $t("newCon.btnCancel") }}</a>
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearAllergy">{{
                    $t("background.btnClose") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!watching" @click="addAllergy">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- end Add allergy modal -->

        <!-- Add family modal -->
        <div id="addFamily-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="!watching">{{ $t("background.family.title") }}</h4>
                <h4 class="left-align" v-else>{{ $t("background.family.title").split(" ")[1] }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l6">
                        <span class="p-float-label">
                            <InputText id="name-family" name="name-family" type="text" v-model="newFamily.name"
                                autocomplete="off" :disabled="watching" />
                            <label for="name-family">{{ $t("background.family.labels[0]") }}</label>
                        </span>
                    </div>
                    <div class="col s12 m12 l6 input-field">
                        <span class="p-float-label">
                            <Dropdown id="dropdown-family" v-model="newFamily.relation" :options="relationships"
                                :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                            <label for="dropdown-family">{{ $t('background.family.labels[1]') }}</label>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m12 l6">
                        <span class="p-float-label">
                            <AutoComplete id="path-family" v-model="newFamily.pathology" :suggestions="cie10info"
                                @complete="getCie10($event)" field="Label" :minLength="3" :disabled="watching" />
                            <label for="path-family">{{ $t('background.family.labels[2]') }}</label>
                        </span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                    $t("newCon.btnCancel") }}</a>
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearFamily">{{
                    $t("background.btnClose") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!watching" @click="addFamily">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- end Add family modal -->

        <!-- Add Hospi modal -->
        <div id="addHospi-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="!watching">{{ $t("background.hospi.title") }}</h4>
                <h4 class="left-align" v-else>{{ $t("background.hospi.title").split(" ")[1] }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l8">
                        <v-date-picker :locale="locale" v-model="newHospi.range" is-range :max-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <div class="row">
                                    <div class="col s6">
                                        <span class="p-float-label">
                                            <input :value="inputValue.start" v-on="inputEvents.start" :disabled="watching"
                                                class="p-filled" />
                                            <label for="hospi-start">{{ $t("background.hospi.labels[0]") }}</label>
                                        </span>
                                    </div>
                                    <div class="col s6">
                                        <span class="p-float-label">
                                            <input :value="inputValue.end" v-on="inputEvents.end" :disabled="watching"
                                                class="p-filled" />
                                            <label for="hospi-end">{{ $t("background.hospi.labels[1]") }}</label>
                                        </span>
                                    </div>
                                </div>
                            </template>
                        </v-date-picker>
                    </div>
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <InputText id="name-doc" name="name-doc" type="text" v-model="newHospi.doctor"
                                autocomplete="off" :disabled="watching" />
                            <label for="name-doc">{{ $t("background.hospi.labels[2]") }}</label>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <InputText id="where-hospi" name="where-hospi" type="text" v-model="newHospi.where"
                                autocomplete="off" :disabled="watching" />
                            <label for="where-hospi">{{ $t("background.hospi.labels[3]") }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l8">
                        <span class="p-float-label">
                            <AutoComplete id="reason-hospi" v-model="newHospi.reason" :suggestions="cie10info"
                                @complete="getCie10($event)" field="Label" :minLength="3" :disabled="watching" />
                            <!-- <InputText id="reason-hospi" name="reason-hospi" type="text" v-model="newHospi.reason" autocomplete="off" :disabled="watching"/> -->
                            <label for="reason-hospi">{{ $t("background.hospi.labels[4]") }}</label>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12" v-if="!watching">
                        <p class="left-align">
                            {{ $t("background.hospi.labels[5]") }}
                        </p>
                        <div class="file-field input-field">
                            <div class="waves-effect waves-light btn btn-file">
                                <span><i class="material-icons-outlined">file_upload</i> {{ $t("background.hospi.button")
                                }}</span>
                                <input type="file" name="doc-hospi" id="doc-hospi" accept="application/pdf"
                                    v-on:change="selectImage($event)" :disabled="watching">
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" disabled>
                            </div>
                        </div>

                    </div>
                    <div class="input-field col s12" v-else-if="newHospi.doc">
                        <p class="left-align">
                            {{ $t("background.hospi.labels[5]") }}
                        </p>
                        <button class="waves-effect waves-light btn btn-file"
                            @click="downloadFile(newHospi?.doc?.Base, newHospi?.doc?.Name)"> <i
                                class="material-icons-outlined">file_download</i> {{ $t("background.hospi.buttonD") }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                    $t("newCon.btnCancel") }}</a>
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearHospi">{{
                    $t("background.btnClose") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!watching" @click="addHospi">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- end Add Hospi modal -->

        <!-- Add Toxic modal -->
        <div id="addToxic-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="!watching">{{ $t("background.toxic.title") }}</h4>
                <h4 class="left-align" v-else>{{ $t("background.toxic.title").split(" ")[1] }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <Dropdown id="dropdown-risk1" v-model="newToxic.type" :options="substances"
                                :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                            <label for="dropdown-risk1">{{ $t('background.toxic.labels[0]') }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <InputText id="name-family" name="name-family" type="text" v-model="newToxic.consume"
                                autocomplete="off" :disabled="watching" />
                            <label for="name-family">{{ $t("background.toxic.labels[1]") }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l4 ">
                        <span class="p-float-label">
                            <Dropdown id="dropdown-risk2" v-model="newToxic.severity" :options="risksTypes.risk"
                                :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                            <label for="dropdown-risk2">{{ $t('background.toxic.labels[2]') }}</label>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6 l4">
                        <v-date-picker :locale="locale" v-model="newToxic.start">
                            <template v-slot="{ inputValue, inputEvents }">
                                <span class="p-float-label">
                                    <input class="p-filled" :value="inputValue" v-on="inputEvents" :disabled="watching" />
                                    <label for="toxic-start">{{ $t("background.toxic.labels[3]") }}</label>
                                </span>
                            </template>
                        </v-date-picker>
                    </div>
                    <div class="input-field col s12 m6 l4">
                        <v-date-picker :locale="locale" v-model="newToxic.end">
                            <template v-slot="{ inputValue, inputEvents }">
                                <span class="p-float-label">
                                    <input class="p-filled" :value="inputValue ? inputValue : '---'" v-on="inputEvents"
                                        :disabled="watching" />
                                    <label for="toxic-end">{{ $t("background.toxic.labels[4]") }}</label>
                                </span>
                            </template>
                        </v-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <p class="left-align">
                            {{ $t("background.toxic.labels[5]") }}
                        </p>
                        <textarea name="add-note" id="add-note" rows="30" v-model="newToxic.description"
                            :disabled="watching"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                    $t("newCon.btnCancel") }}</a>
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearToxic">{{
                    $t("background.btnClose") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!watching" @click="addToxic">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- end Add Toxic modal -->

        <!-- Add immu modal -->
        <div id="addImmu-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="!watching">{{ $t("background.immu.title") }}</h4>
                <h4 class="left-align" v-else>{{ $t("background.immu.title").split(" ")[1] }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l6">
                        <span class="p-float-label">
                            <InputText id="name-immu" name="name-immu" type="text" v-model="newImmu.name" autocomplete="off"
                                :disabled="watching" />
                            <label for="name-immu">{{ $t("background.immu.labels[0]") }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l6">
                        <v-date-picker :locale="locale" v-model="newImmu.date" :max-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <span class="p-float-label">
                                    <input class="p-filled" :value="inputValue" v-on="inputEvents" :disabled="watching" />
                                    <label for="immu-date">{{ $t("background.immu.labels[1]") }}</label>
                                </span>
                            </template>
                        </v-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m12 l6">
                        <span class="p-float-label">
                            <InputText id="pharma-immu" name="pharma-immu" type="text" v-model="newImmu.pharma"
                                autocomplete="off" :disabled="watching" />
                            <label for="pharma-immu">{{ $t("background.immu.labels[2]") }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l6">
                        <span class="p-float-label">
                            <Dropdown id="dropdown-immu" v-model="newImmu.dose" :options="doses"
                                :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                            <label for="dropdown-immu">{{ $t('background.immu.labels[3]') }}</label>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <p class="left-align">
                            {{ $t("background.immu.labels[4]") }}
                        </p>
                        <textarea name="add-note" id="add-note" rows="30" v-model="newImmu.note"
                            :disabled="watching"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                    $t("newCon.btnCancel") }}</a>
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearImmu">{{
                    $t("background.btnClose") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!watching" @click="addImmu">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- end Add immu modal -->

        <!-- Add surgery modal -->
        <div id="addSurgery-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="!watching">{{ $t("background.surgery.title") }}</h4>
                <h4 class="left-align" v-else>{{ $t("background.surgery.title").split(" ")[1] }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <Dropdown id="dropdown-surg" v-model="newSurgery.type" :options="typesSurgery"
                                :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                            <label for="dropdown-surg">{{ $t('background.surgery.labels[0]') }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <AutoComplete id="name-path" v-model="newSurgery.procedure" :suggestions="procedures"
                                @complete="getProcedures($event)" field="Label" :minLength="3" :disabled="watching" />
                            <label for="name-path">{{ $t('background.surgery.labels[1]') }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l4">
                        <v-date-picker :locale="locale" v-model="newSurgery.date" :max-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <span class="p-float-label">
                                    <input class="p-filled" :value="inputValue" v-on="inputEvents" :disabled="watching" />
                                    <label for="diagnosedBy-path">{{ $t("background.surgery.labels[2]") }}</label>
                                </span>
                            </template>
                        </v-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <p class="left-align">
                            {{ $t("background.pathology.labels[3]") }}
                        </p>
                        <textarea name="add-note" id="add-note" rows="30" v-model="newSurgery.note"
                            :disabled="watching"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                    $t("newCon.btnCancel") }}</a>
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearSurgery">{{
                    $t("background.btnClose") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!watching" @click="addSurgery">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- end Add surgery modal -->

        <!-- Add trauma modal -->
        <div id="addTrauma-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="!watching">{{ $t("background.trauma.title") }}</h4>
                <h4 class="left-align" v-else>{{ $t("background.trauma.title").split(" ")[1] }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l6">
                        <span class="p-float-label">
                            <AutoComplete id="name-path" v-model="newTrauma.trauma" :suggestions="cie10info"
                                @complete="getCie10($event)" field="Label" :minLength="3" :disabled="watching" />
                            <label for="name-path">{{ $t('background.trauma.labels[0]') }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l6">
                        <v-date-picker :locale="locale" v-model="newTrauma.date" :max-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <span class="p-float-label">
                                    <input class="p-filled" :value="inputValue" v-on="inputEvents" :disabled="watching" />
                                    <label for="diagnosedBy-path">{{ $t("background.trauma.labels[1]") }}</label>
                                </span>
                            </template>
                        </v-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <p class="left-align">
                            {{ $t("background.pathology.labels[3]") }}
                        </p>
                        <textarea name="add-note" id="add-note" rows="30" v-model="newTrauma.note"
                            :disabled="watching"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                    $t("newCon.btnCancel") }}</a>
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearTrauma">{{
                    $t("background.btnClose") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!watching" @click="addTrauma">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- end Add trauma modal -->

        <!-- Add transfusion modal -->
        <div id="addTransfusion-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="!watching">{{ $t("background.transfusion.title") }}</h4>
                <h4 class="left-align" v-else>{{ $t("background.transfusion.title").split(" ")[1] }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <Dropdown id="dropdown-surg" v-model="newTransfusion.type" :options="typesTransfusion"
                                :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                            <label for="dropdown-surg">{{ $t('background.transfusion.labels[0]') }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l4">
                        <span class="p-float-label">
                            <Dropdown id="dropdown-surg" v-model="newTransfusion.quantity" :options="typesUnit"
                                :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                            <label for="name-path">{{ $t('background.transfusion.labels[1]') }}</label>
                        </span>
                    </div>
                    <div class="input-field col s12 m12 l4">
                        <v-date-picker :locale="locale" v-model="newTransfusion.date" :max-date="new Date()">
                            <template v-slot="{ inputValue, inputEvents }">
                                <span class="p-float-label">
                                    <input class="p-filled" :value="inputValue" v-on="inputEvents" :disabled="watching" />
                                    <label for="diagnosedBy-path">{{ $t("background.transfusion.labels[2]") }}</label>
                                </span>
                            </template>
                        </v-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <p class="left-align">
                            {{ $t("background.transfusion.labels[3]") }}
                        </p>
                        <textarea name="add-note" id="add-note" rows="30" v-model="newTransfusion.note"
                            :disabled="watching"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                    $t("newCon.btnCancel") }}</a>
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearTransfusion">{{
                    $t("background.btnClose") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!watching" @click="addTransfusion">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- end Add transfusion modal -->

        <!-- Add-Medicine modal -->
        <div id="addMed-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="newMedicine.step == 1">{{ $t("newCon.addMedicine.title1") }}</h4>
                <h4 class="left-align" v-else-if="!watching">{{ $t("newCon.addMedicine.title2") }}</h4>
                <h4 class="left-align" v-else>{{ $t("newCon.addMedicine.title1").split(" ")[1] }}</h4>
                <div class="table-medicine" v-if="newMedicine.step == 1">
                    <div class="col s12 m12 l8">
                        <div class="search-input">
                            <i class="material-icons">search</i>
                            <input type="text" :placeholder="$t('userList.placeholder')" :value="search"
                                @input="event => search = event.target?.value" autocomplete="off" />
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
                    <div class="med-table" v-if="watching">
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
                                    <tr>
                                        <td> {{ newMedicine.medicine.ActiveSubstance }} </td>
                                        <td> {{ newMedicine.medicine.Product }} </td>
                                        <td> {{ newMedicine.medicine.CommercialDescription }} </td>
                                        <td> {{ newMedicine.medicine.Presentation }} </td>
                                        <td> {{ newMedicine.medicine.Unit }} </td>
                                        <td> {{ newMedicine.medicine.Doze }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 m12 l4">
                            <input id="quantity" type="number" @keypress="isNumber($event)" v-model="newMedicine.quantity"
                                autocomplete="off" :disabled="watching">
                            <label for="quantity">{{ $t('newCon.addMedicine.formulaLabels[0]') }}</label>
                        </div>
                        <div class="col s12 m12 l4 drop-col">
                            <span class="p-float-label">
                                <Dropdown v-if="!watching" id="frequency" v-model="newMedicine.frequency"
                                    :options="frequencies" optionLabel="Label"
                                    :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                                <InputText class="p-filled" v-else id="frequency" name="frequency" type="text"
                                    :value="newMedicine.frequency?.Label" autocomplete="off" disabled />
                                <label for="frequency">{{ $t('newCon.addMedicine.formulaLabels[1]') }}</label>
                            </span>
                        </div>
                        <div class="col s12 m12 l4 drop-col">
                            <span class="p-float-label">
                                <Dropdown id="when" v-model="newMedicine.when" :options="whenList" optionLabel="description"
                                    :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                                <label for="when">{{ $t('newCon.addMedicine.formulaLabels[2]') }}</label>
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m12 l4 d-flex days-col">
                            <div class="input-field">
                                <input id="duration" type="number" @keypress="isNumber($event)"
                                    v-model="newMedicine.duration" autocomplete="off" :disabled="watching">
                                <label for="duration">{{ $t('newCon.addMedicine.formulaLabels[3]') }}</label>
                            </div>
                            <p>{{ $t('newCon.addMedicine.days') }}</p>
                        </div>
                        <div class="input-field col s12 m12 l4">
                            <span class="p-float-label">
                                <AutoComplete id="reason-med" v-model="newMedicine.reason" :suggestions="cie10info"
                                    @complete="getCie10($event)" field="Label" :minLength="3" :disabled="watching" />
                                <label for="reason-med">{{ $t('background.medicine.labels[0]') }}</label>
                            </span>
                        </div>
                        <div class="input-field col s12 m12 l4">
                            <v-date-picker :locale="locale" v-model="newMedicine.date" :max-date="new Date()">
                                <template v-slot="{ inputValue, inputEvents }">
                                    <span class="p-float-label">
                                        <input class="p-filled" :value="inputValue" v-on="inputEvents"
                                            :disabled="watching" />
                                        <label for="med-date">{{ $t("background.medicine.labels[1]") }}</label>
                                    </span>
                                </template>
                            </v-date-picker>
                        </div>
                        <div class="col s2"></div>
                        <div class="input-field col s12">
                            <textarea name="add-descMed" id="add-descDiag" rows="30" v-model="newMedicine.description"
                                :disabled="watching" :placeholder="$t('newCon.addDocument.textAreaPlaceholder')"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="d-flex">
                    <div v-if="!watching">
                        {{ $t('newCon.addMedicine.step') }} {{ newMedicine.step }}/2
                    </div>
                    <div v-else></div>
                    <div>
                        <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                            $t("newCon.btnCancel") }}</a>
                        <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearMedicine">{{
                            $t("background.btnClose") }}</a>
                        <button class="waves-effect waves-light btn btn-primary btn-rounded" v-if="newMedicine.step == 1"
                            @click="newMedicine.step++" :disabled="newMedicine.medicine == null">{{ $t("newCon.btnNext")
                            }}</button>
                        <a class="waves-effect waves-light btn btn-primary btn-rounded" v-else-if="!watching"
                            @click="addMedicine">{{ $t("newCon.btnSave") }}</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- End add-Medicine modal -->

        <!-- Add Risk modal -->
        <div id="addRisk-modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4 class="left-align" v-if="!watching">{{ $t("background.risk.title") }}</h4>
                <h4 class="left-align" v-else>{{ $t("background.risk.title").split(" ")[1] }}</h4>
                <div class="row">
                    <div class="input-field col s12 m12 l6">
                        <span class="p-float-label">
                            <Dropdown id="dropdown-risk1" v-model="newRisk.type" :options="risksTypes.type"
                                :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                            <label for="dropdown-risk1">{{ $t('background.risk.labels[0]') }}</label>
                        </span>
                    </div>
                    <div class="col s12 m12 l6 input-field">
                        <span class="p-float-label">
                            <Dropdown id="dropdown-risk2" v-model="newRisk.risk" :options="risksTypes.risk"
                                :emptyMessage="$t('newCon.addDocument.emptySelect')" :disabled="watching" />
                            <label for="dropdown-risk2">{{ $t('background.risk.labels[1]') }}</label>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <p class="left-align">
                            {{ $t("background.risk.labels[2]") }}
                        </p>
                        <textarea name="add-note" id="add-note" rows="30" v-model="newRisk.note"
                            :disabled="watching"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-if="!watching">{{
                    $t("newCon.btnCancel") }}</a>
                <a class="modal-close waves-effect waves-light btn btn-rounded" v-else @click="clearRisk">{{
                    $t("background.btnClose") }}</a>
                <a class="waves-effect waves-light btn btn-primary btn-rounded" v-if="!watching" @click="addRisk">{{
                    $t("newCon.btnSave") }}</a>
            </div>
        </div>
        <!-- end Add risk modal -->

    </div>
</template>
  


<style scoped>
#background {
    position: relative;
    padding: 16px 20px;
    overflow-y: scroll;
    height: calc(100% - 135px);
}

.modal,
#background:deep(.modal-overlay) {
    position: absolute !important;
}

#background:deep(.modal-overlay) {
    top: 0 !important;
    height: 100%;
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

.modal .modal-footer {
    padding: 15px 24px 0;
    margin-bottom: 17px;
}

.modal-footer .modal-close {
    background: #e1e2e6;
    color: #656e73 !important;
    margin-right: 16px !important;
}

#addMed-modal tbody tr.active {
    background-color: #d1d2d4;
}

#addMed-modal tbody tr td {
    border-radius: 0 !important;
}

#addMed-modal tbody tr:hover {
    background-color: #e1e2e6;
}

#addMed-modal .formula .row {
    margin-bottom: 0 !important;
}

#addMed-modal .formula .days-col {
    align-items: center;
}

#addMed-modal .formula .days-col p {
    margin: 5px 5px 0 !important;
}

#addMed-modal .formula .input-field,
#addMed-modal .formula .drop-col {
    margin: 15px 0 !important;
}

#addMed-modal .formula .drop-col {
    padding: 0 0.75rem !important;
}

#addMed-modal .formula input[type="number"] {
    text-align: center;
}

.modal-footer .d-flex {
    justify-content: space-between;
    align-items: center;
}

.med-table {
    margin-bottom: 30px !important;
}

.med-table tbody tr:hover {
    background-color: transparent !important;
}
</style>