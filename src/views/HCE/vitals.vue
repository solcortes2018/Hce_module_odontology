<script setup lang="ts">

import axios from "axios"
import { ref } from "vue";
import { useI18n } from 'vue-i18n';
import M from "materialize-css";
import { useStore } from 'vuex';


const { t } = useI18n()
const s = useStore()
const measurePress1 = ref("")
const measurePress2 = ref("")
const chartGluco = ref<any>("")
const measureGluco = ref("")
const chartOxi = ref<any>("")
const measureOxi = ref("")
const chartHeart = ref<any>("")
const measureHeart = ref("")
const chartBreath = ref<any>("")
const measureBreath = ref("")
const chartTemp = ref<any>("")
const measureTemp = ref("")
const chartWeight = ref<any>("")
const measureWeight = ref("")
const chartHeight = ref<any>("")
const measureHeight = ref("")
const chartPeri = ref<any>("")
const measurePeri = ref("")
const userToken = ref("")
const chartPressure = ref()
const openModal = <boolean>(false)
let interval = <any>null
const props = defineProps({
  consultationId: String,
  patient: {
    type: Object, required: true
  }
}
)
const range = ref({
  start: new Date(),
  end: new Date(),
})

const locale = ({ t.locale })

const hexToRgb = (hex: any) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
const rgb = hexToRgb(s.getters.getColor.primary)
const colorP = 'rgba(' + rgb?.r + ', ' + rgb?.g + ', ' + rgb?.b + ', 1)'
const colorS = 'rgba(' + rgb?.r + ', ' + rgb?.g + ', ' + rgb?.b + ', 0.45)'

const pressureVitals = ({
  labels: [],
  datasets: [{
    label: t('vitals.modals.pressureLabels[0]'),
    data: [],
    fill: false,
    borderColor: colorP,
    tension: .4
  }, {
    label: t('vitals.modals.pressureLabels[1]'),
    data: [],
    fill: false,
    borderColor: colorS,
    tension: .4
  }]
})

const pressureOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#4F4F4F'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#979797',
      },
      grid: {
        color: '#EFF3F9'
      }
    },
    y: {
      ticks: {
        color: '#979797',
        callback: function (value: any, index: any, ticks: any) {
          return value + '';
        }
      },
      grid: {
        color: '#EFF3F9'
      }
    }
  }
},

const glucoVitals = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    fill: false,
    borderColor: s.getters.getColor.primary,
    tension: .4
  }]
},

const glucoOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#4F4F4F'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#979797',
      },
      grid: {
        color: '#EFF3F9'
      }
    },
    y: {
      ticks: {
        color: '#979797',
        callback: function (value: any, index: any, ticks: any) {
          return value + ' mg/dl';
        }
      },
      grid: {
        color: '#EFF3F9'
      }
    }
  }
},

const oxiVitals = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    fill: false,
    borderColor: s.getters.getColor.primary,
    tension: .4
  }]
},

const oxiOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#4F4F4F'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#979797',
      },
      grid: {
        color: '#EFF3F9'
      }
    },
    y: {
      ticks: {
        color: '#979797',
        callback: function (value: any, index: any, ticks: any) {
          return value + '%';
        }
      },
      grid: {
        color: '#EFF3F9'
      }
    }
  }
},

const heartVitals = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    fill: false,
    borderColor: s.getters.getColor.primary,
    tension: .4
  }]
},

const breathVitals = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    fill: false,
    borderColor: s.getters.getColor.primary,
    tension: .4
  }]
},

const breathOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#4F4F4F'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#979797',
      },
      grid: {
        color: '#EFF3F9'
      }
    },
    y: {
      ticks: {
        color: '#979797',
        callback: function (value: any, index: any, ticks: any) {
          return value + 'PPM';
        }
      },
      grid: {
        color: '#EFF3F9'
      }
    }
  }
},

const tempVitals = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    fill: false,
    borderColor: s.getters.getColor.primary,
    tension: .4
  }]
},

const tempOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#4F4F4F'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#979797',
      },
      grid: {
        color: '#EFF3F9'
      }
    },
    y: {
      ticks: {
        color: '#979797',
        callback: function (value: any, index: any, ticks: any) {
          return value + 'C';
        }
      },
      grid: {
        color: '#EFF3F9'
      }
    }
  }
},
const weightVitals = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    fill: false,
    borderColor: s.getters.getColor.primary,
    tension: .4
  }]
},

const weightOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#4F4F4F'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#979797',
      },
      grid: {
        color: '#EFF3F9'
      }
    },
    y: {
      ticks: {
        color: '#979797',
        callback: function (value: any, index: any, ticks: any) {
          return value + 'kg';
        }
      },
      grid: {
        color: '#EFF3F9'
      }
    }
  }
},

const heightVitals = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    fill: false,
    borderColor: s.getters.getColor.primary,
    tension: .4
  }]
},

const cmOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#4F4F4F'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#979797',
      },
      grid: {
        color: '#EFF3F9'
      }
    },
    y: {
      ticks: {
        color: '#979797',
        callback: function (value: any, index: any, ticks: any) {
          return value + ' cm';
        }
      },
      grid: {
        color: '#EFF3F9'
      }
    }
  }
},

const periVitals = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    fill: false,
    borderColor: s.getters.getColor.primary,
    tension: .4
  }]
},


const clearPressureData = () => {
  const chart = chartPressure.value.chart
  chart.data.labels = []
  chart.data.datasets[0].data = []
  chart.data.datasets[1].data = []
}
const addPressureData = (label: string, data1: string, data2: string) => {
  const chart = chartPressure.value.chart
  chart.data.labels.push(label)
  chart.data.datasets[0].data.push(data1)
  chart.data.datasets[1].data.push(data2)
  chart.update()
}
const clearChartData = (chart: any) => {
  chart.data.labels = []
  chart.data.datasets[0].data = []
}
const addChartData = (chart: any, label: any, data: any) => {
  chart.data.labels.push(label)
  chart.data.datasets[0].data.push(data)
  chart.update()
}

const getPressure = async () => {

  clearPressureData()
  if (!range.value.start && !range.value.end) {
    return null
  }
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
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/arterial", {
    headers,
    params
  }
  );
  const data = response.data

  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    let dateC = new Date(e.ConsultationDate).setHours(0, 0, 0, 0)
    if (dateC >= range.value.start.setHours(0, 0, 0, 0) && dateC <= range.value.end.setHours(0, 0, 0, 0)) {
      let date = new Date(e.ConsultationDate).toLocaleString().split(", ")
      let label = date[0].split("/")[0] + '/' + date[0].split("/")[1] + ' - ' + date[1].split(":")[0] + ':' + date[1].split(":")[1]
      addPressureData(label, e.Pressure.Systolic, e.Pressure.Diastolic)
    }
  }
}



const addPressure = async () => {
  if (measurePress1.value.trim() == "" || !measurePress1.value || measurePress2.value.trim() == "" || !measurePress2.value) {
    //   return M.toast({
    //     html: this.$t("vitals.modals.validateMsg"),
    //   });
  }
  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    lang: import.meta.env.VITE_VUE_APP_LOCALE,
    country: import.meta.env.VITE_VUE_APP_COUNTRY,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VUE_APP_COMPANY_ID,
  };
  let date = new Date()

  let dateStr = date.toISOString()

  const body = {
    ConsultationId: props.consultationId,
    ConsultationDate: dateStr,
    PatientId: props.patient.Id,
    DoctorId: (""),
    Pressure: {
      Systolic: parseInt(measurePress1.value),
      Diastolic: parseInt(measurePress2.value),
    }
  }
  var elem: any = document.getElementById("addPressure-modal");
  var instance = M.Modal.getInstance(elem);

  try {
    await axios.post(
      import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/arterial", body, {
      headers,
    }
    ).then(response => {
      if (response.status == 200) {
        M.toast({
          html: t("vitals.modals.generalMsg"),
        });
        instance.close()
        getPressure()
      }
    });
  } catch (error) {
    console.log(error)
    M.toast({
      html: t("newCon.addMsgs.error"),
    });
  }
}
const getGluco = async () => {
  clearChartData(chartGluco.chart)
  if (range.value.start && !range.value.end) {
    return null
  }
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
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/glucometry", {
    headers,
    params
  }
  );

  const data = response.data
  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    let dateC = new Date(e.ConsultationDate).setHours(0, 0, 0, 0)
    if (dateC >= range.value.start.setHours(0, 0, 0, 0) && dateC <= range.value.end.setHours(0, 0, 0, 0)) {
      let date = new Date(e.ConsultationDate).toLocaleString().split(", ")
      let label = date[0].split("/")[0] + '/' + date[0].split("/")[1] + ' - ' + date[1].split(":")[0] + ':' + date[1].split(":")[1]
      addChartData(chartGluco.chart, label, e.Diagnose)
    }
  }
}

const addGluco = async () => {
  if (measureGluco.value.trim() == "" || !measureGluco.value) {
    return M.toast({
      html: t("vitals.modals.validateMsg"),
    });
  }
  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    lang: import.meta.env.VITE_VUE_APP_LOCALE,
    country: import.meta.env.VITE_VUE_APP_COUNTRY,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
  };
  let date = new Date()

  let dateStr = date.toISOString()

  const body = {
    ConsultationId: props.consultationId,
    ConsultationDate: dateStr,
    PatientId: props.patient.Id,
    DoctorId: (""),
    Measurement: parseInt(measureGluco.value)
  }
  var elem: any = document.getElementById("addGluco-modal");
  var instance = M.Modal.getInstance(elem);

  try {
    await axios.post(
      import.meta.env.VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/glucometry", body, {
      headers,
    }
    ).then(response => {
      if (response.status == 200) {
        M.toast({
          html: t("vitals.modals.generalMsg"),
        });
        instance.close()
        getGluco()
      }
    });
  } catch (error) {
    console.log(error)
    M.toast({
      html: t("newCon.addMsgs.error"),
    });
  }
}

const getOxi = async () => {
  clearChartData(chartOxi.chart)
  if (!range.value.start && !range.value.end) {
    return null
  }
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
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/oximetry", {
    headers,
    params
  }
  );
  const data = response.data
  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    let dateC = new Date(e.ConsultationDate).setHours(0, 0, 0, 0)
    if (dateC >= range.value.start.setHours(0, 0, 0, 0) && dateC <= range.value.end.setHours(0, 0, 0, 0)) {
      let date = new Date(e.ConsultationDate).toLocaleString().split(", ")
      let label = date[0].split("/")[0] + '/' + date[0].split("/")[1] + ' - ' + date[1].split(":")[0] + ':' + date[1].split(":")[1]
      addChartData(chartOxi.chart, label, e.Diagnose)
    }
  }

}
const addOxi = async () => {
  if (measureOxi.value.trim() == "" || !measureOxi.value) {
    return M.toast({
      html: t("vitals.modals.validateMsg"),
    });
  }
}
const headers = {
  Authorization: `Bearer ${userToken.value}`,
  lang: import.meta.env.VITE_VUE_APP_LOCALE,
  country: import.meta.env.VITE_VUE_APP_COUNTRY,
  appid: import.meta.env.VITE_VUE_APP_APP_ID,
  companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
};
let date = new Date()

let dateStr = date.toISOString()
const body = {
  ConsultationId: props.consultationId,
  ConsultationDate: dateStr,
  PatientId: props.patient.Id,
  DoctorId: (""),
  Measurement: parseInt(measureOxi.value)
}

var elem: any = document.getElementById("addOxi-modal");
var instance = M.Modal.getInstance(elem);

try {
  await axios.post(
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/oximetry", body, {
    headers,
  }
  ).then(response => {
    if (response.status == 200) {
      M.toast({
        html: t("vitals.modals.generalMsg"),
      });
      instance.close()
      getOxi()
    }
  });
} catch (error) {
  console.log(error)
  M.toast({
    html: t("newCon.addMsgs.error"),
  });
}

const getHeart = async () => {
  clearChartData(chartHeart.chart)
  if (!range.value.start && !range.value.end) {
    return null
  }
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
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/heartRate", {
    headers,
    params
  }
  );
  const data = response.data

  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    let dateC = new Date(e.ConsultationDate).setHours(0, 0, 0, 0)
    if (dateC >= range.value.start.setHours(0, 0, 0, 0) && dateC <= range.value.end.setHours(0, 0, 0, 0)) {
      let date = new Date(e.ConsultationDate).toLocaleString().split(", ")
      let label = date[0].split("/")[0] + '/' + date[0].split("/")[1] + ' - ' + date[1].split(":")[0] + ':' + date[1].split(":")[1]
      addChartData(chartHeart.chart, label, e.Diagnose)
    }
  }
}

const addHeart = async () => {
  if (measureHeart.value.trim() == "" || !measureHeart.value) {
    return M.toast({
      html: t("vitals.modals.validateMsg"),
    });
  }
  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    lang: import.meta.env.VITE_VUE_APP_LOCALE,
    country: import.meta.env.VITE_VUE_APP_COUNTRY,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
  };
  let date = new Date()

  let dateStr = date.toISOString()

  const body = {
    ConsultationId: props.consultationId,
    ConsultationDate: dateStr,
    PatientId: props.patient.Id,
    DoctorId: (""),
    Measurement: parseInt(measureHeart.value)
  }
  var elem: any = document.getElementById("addHeart-modal");
  var instance = M.Modal.getInstance(elem);

  try {
    await axios.post(
      import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/heartRate", body, {
      headers,
    }
    ).then(response => {
      if (response.status == 200) {
        M.toast({
          html: t("vitals.modals.generalMsg"),
        });
        instance.close()
        getHeart()
      }
    });
  } catch (error) {
    console.log(error)
    M.toast({
      html: t("newCon.addMsgs.error"),
    });
  }
}

const getBreath = async () => {
  clearChartData(chartBreath.chart)
  if (!range.value.start && !range.value.end) {
    return null
  }
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
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/breathingFrequency", {
    headers,
    params
  }
  );
  const data = response.data
  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    let dateC = new Date(e.ConsultationDate).setHours(0, 0, 0, 0)
    if (dateC >= range.value.start.setHours(0, 0, 0, 0) && dateC <= range.value.end.setHours(0, 0, 0, 0)) {
      let date = new Date(e.ConsultationDate).toLocaleString().split(", ")
      let label = date[0].split("/")[0] + '/' + date[0].split("/")[1] + ' - ' + date[1].split(":")[0] + ':' + date[1].split(":")[1]
      addChartData(chartBreath.chart, label, e.Diagnose)
    }
  }
}
const addBreath = async () => {
  if (measureBreath.value.trim() == "" || !measureBreath.value) {
    return M.toast({
      html: t("vitals.modals.validateMsg"),
    });
  }
  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    lang: import.meta.env.VITE_VUE_APP_LOCALE,
    country: import.meta.env.VITE_VUE_APP_COUNTRY,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
  };

  let date = new Date()

  let dateStr = date.toISOString()

  const body = {
    ConsultationId: props.consultationId,
    ConsultationDate: dateStr,
    PatientId: props.patient.Id,
    DoctorId: (""),
    Measurement: parseInt(measureBreath.value)
  }

  var elem: any = document.getElementById("addBreath-modal");
  var instance = M.Modal.getInstance(elem);

  try {
    await axios.post(
      import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/breathingFrequency", body, {
      headers,
    }
    ).then(response => {
      if (response.status == 200) {
        M.toast({
          html: t("vitals.modals.generalMsg"),
        });
        instance.close()
        getBreath()
      }
    });
  } catch (error) {
    console.log(error)
    M.toast({
      html: t("newCon.addMsgs.error"),
    });
  }
}
const getTemp = async () => {
  clearChartData(chartTemp.chart)
  if (!range.value.start && !range.value.end) {
    return null
  }
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
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/temperature", {
    headers,
    params
  }
  );

  const data = response.data

  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    let dateC = new Date(e.ConsultationDate).setHours(0, 0, 0, 0)
    if (dateC >= range.value.start.setHours(0, 0, 0, 0) && dateC <= range.value.end.setHours(0, 0, 0, 0)) {
      let date = new Date(e.ConsultationDate).toLocaleString().split(", ")
      let label = date[0].split("/")[0] + '/' + date[0].split("/")[1] + ' - ' + date[1].split(":")[0] + ':' + date[1].split(":")[1]
      addChartData(chartTemp.chart, label, e.Diagnose)
    }
  }
}

const addTemp = async () => {
  if (measureTemp.value.trim() == "" || !measureTemp.value) {
    return M.toast({
      html: t("vitals.modals.validateMsg"),
    });
  }
  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    lang: import.meta.env.VITE_VUE_APP_LOCALE,
    country: import.meta.env.VITE_VUE_APP_COUNTRY,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
  };

  let date = new Date()

  let dateStr = date.toISOString()

  const body = {
    ConsultationId: props.consultationId,
    ConsultationDate: dateStr,
    PatientId: props.patient.Id,
    DoctorId: (""),
    Measurement: parseInt(measureTemp.value)
  }

  var elem: any = document.getElementById("addTemp-modal");
  var instance = M.Modal.getInstance(elem);

  try {
    await axios.post(
      import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/temperature", body, {
      headers,
    }
    ).then(response => {
      if (response.status == 200) {
        M.toast({
          html: t("vitals.modals.generalMsg"),
        });
        instance.close()
        getTemp()
      }
    });
  } catch (error) {
    console.log(error)
    M.toast({
      html: t("newCon.addMsgs.error"),
    });
  }
}

const getWeight = async () => {
  clearChartData(chartWeight.chart)
  if (!range.value.start && !range.value.end) {
    return null
  }
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
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/weight", {
    headers,
    params
  }
  );

  const data = response.data

  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    let dateC = new Date(e.ConsultationDate).setHours(0, 0, 0, 0)
    if (dateC >= range.value.start.setHours(0, 0, 0, 0) && dateC <= range.value.end.setHours(0, 0, 0, 0)) {
      let date = new Date(e.ConsultationDate).toLocaleString().split(", ")
      let label = date[0].split("/")[0] + '/' + date[0].split("/")[1] + ' - ' + date[1].split(":")[0] + ':' + date[1].split(":")[1]
      addChartData(chartWeight.chart, label, e.Diagnose)
    }
  }
}

const addWeight = async () => {
  if (measureWeight.value.trim() == "" || !measureWeight.value) {
    return M.toast({
      html: t("vitals.modals.validateMsg"),
    });
  }

  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    lang: import.meta.env.VITE_VUE_APP_LOCALE,
    country: import.meta.env.VITE_VUE_APP_COUNTRY,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
  };

  let date = new Date()

  let dateStr = date.toISOString()

  const body = {
    ConsultationId: props.consultationId,
    ConsultationDate: dateStr,
    PatientId: props.patient.Id,
    DoctorId: (""),
    Measurement: parseInt(measureWeight.value)
  }

  var elem: any = document.getElementById("addWeight-modal");
  var instance = M.Modal.getInstance(elem);

  try {
    await axios.post(
      import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/weight", body, {
      headers,
    }
    ).then(response => {
      if (response.status == 200) {
        M.toast({
          html: t("vitals.modals.generalMsg"),
        });
        instance.close()
        getWeight()
      }
    });
  } catch (error) {
    console.log(error)
    M.toast({
      html: t("newCon.addMsgs.error"),
    });
  }
}

const getHeight = async () => {
  clearChartData(chartHeight.chart)
  if (!range.value.start && !range.value.end) {
    return null
  }

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
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/size", {
    headers,
    params
  }
  );

  const data = response.data

  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    let dateC = new Date(e.ConsultationDate).setHours(0, 0, 0, 0)
    if (dateC >= range.value.start.setHours(0, 0, 0, 0) && dateC <= range.value.end.setHours(0, 0, 0, 0)) {
      let date = new Date(e.ConsultationDate).toLocaleString().split(", ")
      let label = date[0].split("/")[0] + '/' + date[0].split("/")[1] + ' - ' + date[1].split(":")[0] + ':' + date[1].split(":")[1]
      addChartData(chartHeight.chart, label, e.Diagnose)
    }
  }
}

const addHeight = async () => {
  if (measureHeight.value.trim() == "" || !measureHeight.value) {
    return M.toast({
      html: t("vitals.modals.validateMsg"),
    });
  }

  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    lang: import.meta.env.VITE_VUE_APP_LOCALE,
    country: import.meta.env.VITE_VUE_APP_COUNTRY,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
  };

  let date = new Date()

  let dateStr = date.toISOString()

  const body = {
    ConsultationId: props.consultationId,
    ConsultationDate: dateStr,
    PatientId: props.patient.Id,
    DoctorId: (""),
    Measurement: parseInt(measureHeight.value)
  }

  var elem: any = document.getElementById("addHeight-modal");
  var instance = M.Modal.getInstance(elem);

  try {
    await axios.post(
      import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/size", body, {
      headers,
    }
    ).then(response => {
      if (response.status == 200) {
        M.toast({
          html: t("vitals.modals.generalMsg"),
        });
        instance.close()
        getHeight()
      }
    });
  } catch (error) {
    console.log(error)
    M.toast({
      html: t("newCon.addMsgs.error"),
    });
  }
}

const getPeri = async () => {
  clearChartData(chartPeri.chart)
  if (!range.value.start && !range.value.end) {
    return null
  }

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
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/abdominal", {
    headers,
    params
  }
  );

  const data = response.data

  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    let dateC = new Date(e.ConsultationDate).setHours(0, 0, 0, 0)
    if (dateC >= range.value.start.setHours(0, 0, 0, 0) && dateC <= range.value.end.setHours(0, 0, 0, 0)) {
      let date = new Date(e.ConsultationDate).toLocaleString().split(", ")
      let label = date[0].split("/")[0] + '/' + date[0].split("/")[1] + ' - ' + date[1].split(":")[0] + ':' + date[1].split(":")[1]
      addChartData(chartPeri.chart, label, e.Diagnose)
    }
  }
}

const addPeri = async () => {
  if (measurePeri.value.trim() == "" || !measurePeri.value) {
    return M.toast({
      html: t("vitals.modals.validateMsg"),
    });
  }

  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    lang: import.meta.env.VITE_VUE_APP_LOCALE,
    country: import.meta.env.VITE_VUE_APP_COUNTRY,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
  };

  let date = new Date()

  let dateStr = date.toISOString()

  const body = {
    ConsultationId: props.consultationId,
    ConsultationDate: dateStr,
    PatientId: props.patient.Id,
    DoctorId: (""),
    Measurement: parseInt(measurePeri.value)
  }

  var elem: any = document.getElementById("addPeri-modal");
  var instance = M.Modal.getInstance(elem);

  try {
    await axios.post(
      import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/vital/abdominal", body, {
      headers,
    }
    ).then(response => {
      if (response.status == 200) {
        M.toast({
          html: t("vitals.modals.generalMsg"),
        });
        instance.close()
        getPeri()
      }
    });
  } catch (error) {
    console.log(error)
    M.toast({
      html: t("newCon.addMsgs.error"),
    });
  }


}

const convertDate = async (date: any) => {
  return date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate())
}
const addZero = (date: any) => {
  if ((date / 10) < 1)
    return '0' + date

  return date
},

const isNumber = (evt: any) => {
  const keysAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  const keyPressed = evt.key;

  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault();
  }
}

const mounted = () => {
  M.AutoInit();

  var collap = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collap);

  interval = setInterval(() => {
    getPressure();
    getGluco();
    getOxi();
    getHeart();
    getBreath();
    getTemp();
    getWeight();
    getHeight();
    getPeri();
  }, 15000);
}

const unmounted = () => {
  clearInterval(interval.value)
},
</script>


<template>
  <div id="vitals" :class="{ 'openModal': openModal }">
    <ul class="collapsible">
      <li class="appointment-note">
        <div class="note-header collapsible-header" @click="getPressure">
          <p>{{ $t("vitals.titles[0]") }}</p>
          <a>
            {{ $t("vitals.open") }}
            <i class="material-icons">expand_more</i>
          </a>
        </div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s8">
              <v-date-picker :locale="locale" v-model="range" is-range :max-date="new Date()" @dayclick="getPressure">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="row">
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.start" v-on="inputEvents.start" class="p-filled" />
                        <label for="hospi-start">{{ $t("vitals.dates[0]") }}</label>
                      </span>
                    </div>
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.end" v-on="inputEvents.end" class="p-filled" />
                        <label for="hospi-end">{{ $t("vitals.dates[1]") }}</label>
                      </span>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="input-field col s4">
              <a class="btn btn-outlined btn-rounded waves-effect waves-ligh modal-trigger" href="#addPressure-modal"
                @click="openModal = true"><i class="material-icons">add</i>
                {{ $t("newCon.add") }}</a>
            </div>
          </div>
          <Chart ref="chartPressure" type="line" :data="pressureVitals" :options="pressureOptions" />
        </div>
      </li>

      <li class="appointment-note">
        <div class="note-header collapsible-header" @click="getGluco">
          <p>{{ $t("vitals.titles[1]") }}</p>
          <a>
            {{ $t("vitals.open") }}
            <i class="material-icons">expand_more</i>
          </a>
        </div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s8">
              <v-date-picker :locale="locale" v-model="range" is-range :max-date="new Date()" @dayclick="getGluco">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="row">
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.start" v-on="inputEvents.start" class="p-filled" />
                        <label for="hospi-start">{{ $t("vitals.dates[0]") }}</label>
                      </span>
                    </div>
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.end" v-on="inputEvents.end" class="p-filled" />
                        <label for="hospi-end">{{ $t("vitals.dates[1]") }}</label>
                      </span>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="input-field col s4">
              <a class="btn btn-outlined btn-rounded waves-effect waves-ligh modal-trigger" href="#addGluco-modal"
                @click="openModal = true"><i class="material-icons">add</i>
                {{ $t("newCon.add") }}</a>
            </div>
          </div>
          <Chart ref="chartGluco" type="line" :data="glucoVitals" :options="glucoOptions" />
        </div>
      </li>

      <li class="appointment-note">
        <div class="note-header collapsible-header" @click="getOxi">
          <p>{{ $t("vitals.titles[2]") }}</p>
          <a>
            {{ $t("vitals.open") }}
            <i class="material-icons">expand_more</i>
          </a>
        </div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s8">
              <v-date-picker :locale="locale" v-model="range" is-range :max-date="new Date()" @dayclick="getOxi">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="row">
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.start" v-on="inputEvents.start" class="p-filled" />
                        <label for="hospi-start">{{ $t("vitals.dates[0]") }}</label>
                      </span>
                    </div>
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.end" v-on="inputEvents.end" class="p-filled" />
                        <label for="hospi-end">{{ $t("vitals.dates[1]") }}</label>
                      </span>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="input-field col s4">
              <a class="btn btn-outlined btn-rounded waves-effect waves-ligh modal-trigger" href="#addOxi-modal"
                @click="openModal = true"><i class="material-icons">add</i>
                {{ $t("newCon.add") }}</a>
            </div>
          </div>
          <Chart ref="chartOxi" type="line" :data="oxiVitals" :options="oxiOptions" />
        </div>
      </li>

      <li class="appointment-note">
        <div class="note-header collapsible-header" @click="getHeart">
          <p>{{ $t("vitals.titles[3]") }}</p>
          <a>
            {{ $t("vitals.open") }}
            <i class="material-icons">expand_more</i>
          </a>
        </div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s8">
              <v-date-picker :locale="locale" v-model="range" is-range :max-date="new Date()" @dayclick="getHeart">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="row">
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.start" v-on="inputEvents.start" class="p-filled" />
                        <label for="hospi-start">{{ $t("vitals.dates[0]") }}</label>
                      </span>
                    </div>
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.end" v-on="inputEvents.end" class="p-filled" />
                        <label for="hospi-end">{{ $t("vitals.dates[1]") }}</label>
                      </span>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="input-field col s4">
              <a class="btn btn-outlined btn-rounded waves-effect waves-ligh modal-trigger" href="#addHeart-modal"
                @click="openModal = true"><i class="material-icons">add</i>
                {{ $t("newCon.add") }}</a>
            </div>
          </div>
          <Chart ref="chartHeart" type="line" :data="heartVitals" :options="pressureOptions" />
        </div>
      </li>

      <li class="appointment-note">
        <div class="note-header collapsible-header" @click="getBreath">
          <p>{{ $t("vitals.titles[4]") }}</p>
          <a>
            {{ $t("vitals.open") }}
            <i class="material-icons">expand_more</i>
          </a>
        </div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s8">
              <v-date-picker :locale="locale" v-model="range" is-range :max-date="new Date()" @dayclick="getBreath">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="row">
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.start" v-on="inputEvents.start" class="p-filled" />
                        <label for="hospi-start">{{ $t("vitals.dates[0]") }}</label>
                      </span>
                    </div>
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.end" v-on="inputEvents.end" class="p-filled" />
                        <label for="hospi-end">{{ $t("vitals.dates[1]") }}</label>
                      </span>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="input-field col s4">
              <a class="btn btn-outlined btn-rounded waves-effect waves-ligh modal-trigger" href="#addBreath-modal"
                @click="openModal = true"><i class="material-icons">add</i>
                {{ $t("newCon.add") }}</a>
            </div>
          </div>
          <Chart ref="chartBreath" type="line" :data="breathVitals" :options="breathOptions" />
        </div>
      </li>

      <li class="appointment-note">
        <div class="note-header collapsible-header" @click="getTemp">
          <p>{{ $t("vitals.titles[5]") }}</p>
          <a>
            {{ $t("vitals.open") }}
            <i class="material-icons">expand_more</i>
          </a>
        </div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s8">
              <v-date-picker :locale="locale" v-model="range" is-range :max-date="new Date()" @dayclick="getTemp">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="row">
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.start" v-on="inputEvents.start" class="p-filled" />
                        <label for="hospi-start">{{ $t("vitals.dates[0]") }}</label>
                      </span>
                    </div>
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.end" v-on="inputEvents.end" class="p-filled" />
                        <label for="hospi-end">{{ $t("vitals.dates[1]") }}</label>
                      </span>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="input-field col s4">
              <a class="btn btn-outlined btn-rounded waves-effect waves-ligh modal-trigger" href="#addTemp-modal"
                @click="openModal = true"><i class="material-icons">add</i>
                {{ $t("newCon.add") }}</a>
            </div>
          </div>
          <Chart ref="chartTemp" type="line" :data="tempVitals" :options="tempOptions" />
        </div>
      </li>

      <li class="appointment-note">
        <div class="note-header collapsible-header" @click="getWeight">
          <p>{{ $t("vitals.titles[6]") }}</p>
          <a>
            {{ $t("vitals.open") }}
            <i class="material-icons">expand_more</i>
          </a>
        </div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s8">
              <v-date-picker :locale="locale" v-model="range" is-range :max-date="new Date()" @dayclick="getWeight">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="row">
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.start" v-on="inputEvents.start" class="p-filled" />
                        <label for="hospi-start">{{ $t("vitals.dates[0]") }}</label>
                      </span>
                    </div>
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.end" v-on="inputEvents.end" class="p-filled" />
                        <label for="hospi-end">{{ $t("vitals.dates[1]") }}</label>
                      </span>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="input-field col s4">
              <a class="btn btn-outlined btn-rounded waves-effect waves-ligh modal-trigger" href="#addWeight-modal"
                @click="openModal = true"><i class="material-icons">add</i>
                {{ $t("newCon.add") }}</a>
            </div>
          </div>
          <Chart ref="chartWeight" type="line" :data="weightVitals" :options="weightOptions" />
        </div>
      </li>

      <li class="appointment-note">
        <div class="note-header collapsible-header" @click="getHeight">
          <p>{{ $t("vitals.titles[7]") }}</p>
          <a>
            {{ $t("vitals.open") }}
            <i class="material-icons">expand_more</i>
          </a>
        </div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s8">
              <v-date-picker :locale="locale" v-model="range" is-range :max-date="new Date()" @dayclick="getHeight">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="row">
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.start" v-on="inputEvents.start" class="p-filled" />
                        <label for="hospi-start">{{ $t("vitals.dates[0]") }}</label>
                      </span>
                    </div>
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.end" v-on="inputEvents.end" class="p-filled" />
                        <label for="hospi-end">{{ $t("vitals.dates[1]") }}</label>
                      </span>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="input-field col s4">
              <a class="btn btn-outlined btn-rounded waves-effect waves-ligh modal-trigger" href="#addHeight-modal"
                @click="openModal = true"><i class="material-icons">add</i>
                {{ $t("newCon.add") }}</a>
            </div>
          </div>
          <Chart ref="chartHeight" type="line" :data="heightVitals" :options="cmOptions" />
        </div>
      </li>

      <li class="appointment-note">
        <div class="note-header collapsible-header" @click="getPeri">
          <p>{{ $t("vitals.titles[8]") }}</p>
          <a>
            {{ $t("vitals.open") }}
            <i class="material-icons">expand_more</i>
          </a>
        </div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s8">
              <v-date-picker :locale="locale" v-model="range" is-range :max-date="new Date()" @dayclick="getPeri">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="row">
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.start" v-on="inputEvents.start" class="p-filled" />
                        <label for="hospi-start">{{ $t("vitals.dates[0]") }}</label>
                      </span>
                    </div>
                    <div class="col s6">
                      <span class="p-float-label">
                        <input :value="inputValue.end" v-on="inputEvents.end" class="p-filled" />
                        <label for="hospi-end">{{ $t("vitals.dates[1]") }}</label>
                      </span>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="input-field col s4">
              <a class="btn btn-outlined btn-rounded waves-effect waves-ligh modal-trigger" href="#addPeri-modal"
                @click="openModal = true"><i class="material-icons">add</i>
                {{ $t("newCon.add") }}</a>
            </div>
          </div>
          <Chart ref="chartPeri" type="line" :data="periVitals" :options="cmOptions" />
        </div>
      </li>
    </ul>

    <!-- Add pressure modal -->
    <div id="addPressure-modal" class="modal modal-small">
      <div class="modal-content">
        <h4 class="left-align">{{ $t("vitals.modals.titles[0]") }}</h4>
        <div class="row">
          <div class="input-field col s12 m12 l6 d-flex">
            <div class="wrap">
              <span class="p-float-label">
                <InputText id="measure-pressure-1" name="measure-pressure-1" type="text" v-model="measurePress1"
                  autocomplete="off" />
                <label for="measure-pressure-1">{{ $t("vitals.modals.pressureLabels[0]") }}</label>
              </span>
            </div>
            <p>mmhg</p>
          </div>
          <div class="input-field col s12 m12 l6 d-flex">
            <div class="wrap">
              <span class="p-float-label">
                <InputText id="measure-pressure-2" name="measure-pressure-2" type="text" v-model="measurePress2"
                  autocomplete="off" />
                <label for="measure-pressure-2">{{ $t("vitals.modals.pressureLabels[1]") }}</label>
              </span>
            </div>
            <p>mmhg</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-light btn btn-rounded" @click="openModal = false">{{
          $t("newCon.btnCancel") }}</a>
        <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addPressure">{{ $t("newCon.btnSave")
        }}</a>
      </div>
    </div>
    <!-- end Add pressure modal -->

    <!-- Add gluco modal -->
    <div id="addGluco-modal" class="modal modal-small">
      <div class="modal-content">
        <h4 class="left-align">{{ $t("vitals.modals.titles[1]") }}</h4>
        <div class="row">
          <div class="input-field col s12 d-flex">
            <div class="wrap">
              <span class="p-float-label">
                <InputText id="measure-gluco" name="measure-gluco" type="text" v-model="measureGluco"
                  autocomplete="off" />
                <label for="measure-gluco">{{ $t("vitals.modals.label") }}</label>
              </span>
            </div>
            <p>mg/dl</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-light btn btn-rounded" @click="openModal = false">{{
          $t("newCon.btnCancel") }}</a>
        <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addGluco">{{ $t("newCon.btnSave") }}</a>
      </div>
    </div>
    <!-- end Add gluco modal -->

    <!-- Add oxi modal -->
    <div id="addOxi-modal" class="modal modal-small">
      <div class="modal-content">
        <h4 class="left-align">{{ $t("vitals.modals.titles[2]") }}</h4>
        <div class="row">
          <div class="input-field col s12 d-flex">
            <div class="wrap">
              <span class="p-float-label">
                <InputText id="measure-oxi" name="measure-oxi" type="text" v-model="measureOxi" autocomplete="off" />
                <label for="measure-oxi">{{ $t("vitals.modals.label") }}</label>
              </span>
            </div>
            <p>%</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-light btn btn-rounded" @click="openModal = false">{{
          $t("newCon.btnCancel") }}</a>
        <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addOxi">{{ $t("newCon.btnSave") }}</a>
      </div>
    </div>
    <!-- end Add oxi modal -->

    <!-- Add heart modal -->
    <div id="addHeart-modal" class="modal modal-small">
      <div class="modal-content">
        <h4 class="left-align">{{ $t("vitals.modals.titles[3]") }}</h4>
        <div class="row">
          <div class="input-field col s12 d-flex">
            <div class="wrap">
              <span class="p-float-label">
                <InputText id="measure-heart" name="measure-heart" type="text" v-model="measureHeart"
                  autocomplete="off" />
                <label for="measure-heart">{{ $t("vitals.modals.label") }}</label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-light btn btn-rounded" @click="openModal = false">{{
          $t("newCon.btnCancel") }}</a>
        <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addHeart">{{ $t("newCon.btnSave") }}</a>
      </div>
    </div>
    <!-- end Add heart modal -->

    <!-- Add Breath modal -->
    <div id="addBreath-modal" class="modal modal-small">
      <div class="modal-content">
        <h4 class="left-align">{{ $t("vitals.modals.titles[4]") }}</h4>
        <div class="row">
          <div class="input-field col s12 d-flex">
            <div class="wrap">
              <span class="p-float-label">
                <InputText id="measure-Breath" name="measure-Breath" type="text" v-model="measureBreath"
                  autocomplete="off" />
                <label for="measure-Breath">{{ $t("vitals.modals.label") }}</label>
              </span>
            </div>
            <p>PPM</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-light btn btn-rounded" @click="openModal = false">{{
          $t("newCon.btnCancel") }}</a>
        <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addBreath">{{ $t("newCon.btnSave") }}</a>
      </div>
    </div>
    <!-- end Add Breath modal -->

    <!-- Add temp modal -->
    <div id="addTemp-modal" class="modal modal-small">
      <div class="modal-content">
        <h4 class="left-align">{{ $t("vitals.modals.titles[5]") }}</h4>
        <div class="row">
          <div class="input-field col s12 d-flex">
            <div class="wrap">
              <span class="p-float-label">
                <InputText id="measure-temp" name="measure-temp" type="text" v-model="measureTemp" autocomplete="off" />
                <label for="measure-temp">{{ $t("vitals.modals.label") }}</label>
              </span>
            </div>
            <p>C</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-light btn btn-rounded" @click="openModal = false">{{
          $t("newCon.btnCancel") }}</a>
        <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addTemp">{{ $t("newCon.btnSave") }}</a>
      </div>
    </div>
    <!-- end Add temp modal -->

    <!-- Add weight modal -->
    <div id="addWeight-modal" class="modal modal-small">
      <div class="modal-content">
        <h4 class="left-align">{{ $t("vitals.modals.titles[6]") }}</h4>
        <div class="row">
          <div class="input-field col s12 d-flex">
            <div class="wrap">
              <span class="p-float-label">
                <InputText v-on:keypress="isNumber($event)" id="measure-weight" name="measure-weight" type="number"
                  v-model="measureWeight" autocomplete="off" />
                <label for="measure-weight">{{ $t("vitals.modals.label") }}</label>
              </span>
            </div>
            <p>kg</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-light btn btn-rounded" @click="openModal = false">{{
          $t("newCon.btnCancel") }}</a>
        <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addWeight">{{ $t("newCon.btnSave") }}</a>
      </div>
    </div>
    <!-- end Add weight modal -->

    <!-- Add height modal -->
    <div id="addHeight-modal" class="modal modal-small">
      <div class="modal-content">
        <h4 class="left-align">{{ $t("vitals.modals.titles[7]") }}</h4>
        <div class="row">
          <div class="input-field col s12 d-flex">
            <div class="wrap">
              <span class="p-float-label">
                <InputText id="measure-height" name="measure-height" type="text" v-model="measureHeight"
                  autocomplete="off" />
                <label for="measure-height">{{ $t("vitals.modals.label") }}</label>
              </span>
            </div>
            <p>cm</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-light btn btn-rounded" @click="openModal = false">{{
          $t("newCon.btnCancel") }}</a>
        <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addHeight">{{ $t("newCon.btnSave") }}</a>
      </div>
    </div>
    <!-- end Add height modal -->

    <!-- Add peri modal -->
    <div id="addPeri-modal" class="modal modal-small">
      <div class="modal-content">
        <h4 class="left-align">{{ $t("vitals.modals.titles[8]") }}</h4>
        <div class="row">
          <div class="input-field col s12 d-flex">
            <div class="wrap">
              <span class="p-float-label">
                <InputText id="measure-peri" name="measure-peri" type="text" v-model="measurePeri" autocomplete="off" />
                <label for="measure-peri">{{ $t("vitals.modals.label") }}</label>
              </span>
            </div>
            <p>cm</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-light btn btn-rounded" @click="openModal = false">{{
          $t("newCon.btnCancel") }}</a>
        <a class="waves-effect waves-light btn btn-primary btn-rounded" @click="addPeri">{{ $t("newCon.btnSave") }}</a>
      </div>
    </div>
    <!-- end Add peri modal -->

  </div>
</template>


<style scoped>
#vitals {
  position: relative;
  padding: 16px 20px;
  overflow-y: scroll;
  height: calc(100% - 135px);
}

#vitals.openModal {
  overflow-y: hidden;
}

.modal,
#vitals:deep(.modal-overlay) {
  position: absolute !important;
}

#vitals:deep(.modal-overlay) {
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

.collapsible {
  box-shadow: none !important;
  border: none !important;
}

.collapsible .collapsible-header {
  border-bottom: none !important;
  padding: 0 !important;
}

.btn-outlined {
  line-height: 30px !important;
}

.input-field.d-flex {
  align-items: center;
}

.input-field.d-flex input {
  width: 100%;
}

.wrap {
  flex: 1 1 auto;
}

.input-field.d-flex p {
  flex: 0 0 auto;
  margin: 5px 5px 0 !important;
}

@media (max-width: 882px) {
  .modal-small {
    width: 80% !important;
  }
}
</style>