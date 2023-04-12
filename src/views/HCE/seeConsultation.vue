<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from "axios"
import { useI18n } from 'vue-i18n';
import M from "materialize-css";

const { t } = useI18n()
const doctors = ref<any>([])
const consultations = ref<any>([])
const userToken = ref("")
const props = defineProps({
  patient: {
    type: Object, required: true
  }
})
const getConsultations = async () => {
  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
  };
  const params = {
    patientId: props.patient.Id,
    count: 100,
  }
  const response = await axios.get(
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/consultation/patient", {
    headers,
    params
  }
  );
  consultations.value = response.data
}

const getDoctors = async () => {
  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
  };
  const response = await axios.get(
    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_URL + "/api/user/doctors", {
    headers,
  }
  );
  doctors.value = response.data

}
const getDoctorName = (id: string) => {
  const doctor: any = doctors.value.find((i: any) => i.Id == id)
  let name = doctor.Name + ' ' + doctor.LastName
  return name
}


const downloadFile = async (path: string, filename: string) => {
  const headers = {
    Authorization: `Bearer ${userToken.value}`,
    lang: import.meta.env.VITE_VUE_APP_LOCALE,
    country: import.meta.env.VITE_VUE_APP_COUNTRY,
    appid: import.meta.env.VITE_VUE_APP_APP_ID,
    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
  };
  const params = {
    path
  }
  let response: any = {}

  try {
    response = await axios.get(
      import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/consultation/file", {
      headers,
      params
    }
    );
  } catch (error: any) {
    console.log(error)

    if (error.response.status == 404) {
      return M.toast({
        html: t('seeCon.errorDownload'),
      });
      console.log(error)
    }
  }
  let pdf = response.data

  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = filename;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
onMounted(() => {
  getConsultations()
  getDoctors()
})

</script>

<template>
  <div id="seeConsultations">
    <div class="appointment-note">
      <div class="note-header">
        <p>{{ $t("newCon.titles[0]") }}</p>
      </div>
      <div class="fix-width scroll-inner">
        <table v-if="consultations.length > 0">
          <thead>
            <tr>
              <th>{{ $t("seeCon.principalTitle") }}</th>
              <th>{{ $t("seeCon.professional") }}</th>
              <th>{{ $t("newCon.addNote.tableTitles[0]") }}</th>
              <th>{{ $t("newCon.addNote.tableTitles[1]") }}
              </th>
              <th>{{ $t("newCon.addNote.tableTitles[2]") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="con in consultations" :key="con.Id">
              <td class="col-date" v-if="con.Note">{{ con.ConsultationDate.split('T')[0] }}</td>
              <td class="col-pro" v-if="con.Note && doctors.length > 0">
                <i class="material-icons-outlined" v-if="con.Type == 1">add_location</i>
                <i class="material-icons-round" v-if="con.Type == 2">rss_feed</i>
                <i class="material-icons" v-if="con.Type == 3">directions_car</i>
                {{ getDoctorName(con.DoctorId) }}
              </td>
              <td v-if="con.Note">{{ con.Note.Type }}</td>
              <td v-if="con.Note">{{ con.Note.Reason }}</td>
              <td v-if="con.Note">{{ con.Note.Description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="appointment-note">
      <div class="note-header">
        <p>{{ $t("newCon.titles[1]") }}</p>
      </div>
      <div class="fix-width scroll-inner">
        <table v-if="consultations.length > 0">
          <thead>
            <tr>
              <th>{{ $t("seeCon.principalTitle") }}</th>
              <th>{{ $t("seeCon.professional") }}</th>
              <th>{{ $t("newCon.addRevision.fields[0]") }}</th>
              <th>{{ $t("newCon.addRevision.fields[1]") }}</th>
              <th>{{ $t("newCon.addRevision.fields[2]") }}</th>
              <th>{{ $t("newCon.addRevision.fields[3]") }}
              </th>
              <th>{{ $t("newCon.addRevision.fields[4]") }}</th>
              <th>{{ $t("newCon.addRevision.fields[5]") }}</th>
              <th>{{ $t("newCon.addRevision.fields[6]") }}
              </th>
              <th>{{ $t("newCon.addRevision.fields[7]") }}</th>
              <th>{{ $t("newCon.addRevision.fields[8]") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="con in consultations" :key="con.Id">
              <td class="col-date" v-if="con.ReviewBySystems"> {{ con.ConsultationDate.split('T')[0] }}</td>
              <td class="col-pro" v-if="con.ReviewBySystems && doctors.length > 0">
                <i class="material-icons-outlined" v-if="con.Type == 1">add_location</i>
                <i class="material-icons-round" v-if="con.Type == 2">rss_feed</i>
                <i class="material-icons" v-if="con.Type == 3">directions_car</i>
                {{ getDoctorName(con.DoctorId) }}
              </td>
              <td v-if="con.ReviewBySystems"> {{ con.ReviewBySystems.Constitucionales }}</td>
              <td v-if="con.ReviewBySystems"> {{ con.ReviewBySystems.OrganosSentidos }}</td>
              <td v-if="con.ReviewBySystems"> {{ con.ReviewBySystems.Cardiorespiratorio }}</td>
              <td v-if="con.ReviewBySystems"> {{ con.ReviewBySystems.Endocrino }}</td>
              <td v-if="con.ReviewBySystems"> {{ con.ReviewBySystems.Gastrointestinal }}</td>
              <td v-if="con.ReviewBySystems"> {{ con.ReviewBySystems.Genitourinario }}</td>
              <td v-if="con.ReviewBySystems"> {{ con.ReviewBySystems.Musculoesqueletico }}</td>
              <td v-if="con.ReviewBySystems"> {{ con.ReviewBySystems.Neurologico }}</td>
              <td v-if="con.ReviewBySystems"> {{ con.ReviewBySystems.Mental }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="appointment-note">
      <div class="note-header">
        <p>{{ $t("newCon.titles[2]") }}</p>
      </div>
      <div class="fix-width scroll-inner">
        <table v-if="consultations.length > 0">
          <thead>
            <tr>
              <th>{{ $t("seeCon.principalTitle") }}</th>
              <th>{{ $t("seeCon.professional") }}</th>
              <th>{{ $t("newCon.addExam.fields[0]") }}</th>
              <th>{{ $t("newCon.addExam.fields[1]") }}</th>
              <th>{{ $t("newCon.addExam.fields[2]") }}</th>
              <th>{{ $t("newCon.addExam.fields[3]") }}</th>
              <th>{{ $t("newCon.addExam.fields[4]") }}</th>
              <th>{{ $t("newCon.addExam.fields[5]") }}</th>
              <th>{{ $t("newCon.addExam.fields[6]") }}</th>
              <th>{{ $t("newCon.addExam.fields[7]") }}</th>
              <th>{{ $t("newCon.addExam.fields[8]") }}</th>
              <th>{{ $t("newCon.addExam.fields[9]") }}</th>
              <th>{{ $t("newCon.addExam.fields[10]") }}</th>
              <th>{{ $t("newCon.addExam.fields[11]") }}</th>
              <th>{{ $t("newCon.addExam.fields[12]") }}</th>
              <th>{{ $t("newCon.addExam.fields[13]") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="con in consultations" :key="con.Id">
              <td class="col-date" v-if="con.PhisicalExam"> {{ con.ConsultationDate.split('T')[0] }}</td>
              <td class="col-pro" v-if="con.PhisicalExam && doctors.length > 0">
                <i class="material-icons-outlined" v-if="con.Type == 1">add_location</i>
                <i class="material-icons-round" v-if="con.Type == 2">rss_feed</i>
                <i class="material-icons" v-if="con.Type == 3">directions_car</i>
                {{ getDoctorName(con.DoctorId) }}
              </td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Cabeza }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Cuello }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Ojos }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Nariz }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Boca }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Orejas }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Cardiorespiratorio }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Torax }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Abdomen }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Genital }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Extremidades }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Mental }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Neurologico }}</td>
              <td v-if="con.PhisicalExam"> {{ con.PhisicalExam.Piel }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="appointment-note">
      <div class="note-header">
        <p>{{ $t("newCon.titles[3]") }}</p>
      </div>
      <div class="fix-width scroll-inner">
        <table v-if="consultations.length > 0">
          <thead>
            <tr>
              <th>{{ $t("seeCon.principalTitle") }}</th>
              <th>{{ $t("seeCon.professional") }}</th>
              <th>{{ $t("seeCon.diagnose") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="con in consultations" :key="con.Id">
              <td class="col-date" v-if="con.Diagnoses"> {{ con.ConsultationDate.split('T')[0] }}</td>
              <td class="col-pro" v-if="con.Diagnoses && doctors.length > 0">
                <i class="material-icons-outlined" v-if="con.Type == 1">add_location</i>
                <i class="material-icons-round" v-if="con.Type == 2">rss_feed</i>
                <i class="material-icons" v-if="con.Type == 3">directions_car</i>
                {{ getDoctorName(con.DoctorId) }}
              </td>
              <td v-if="con.Diagnoses">
                <p v-for="diag in con.Diagnoses" :key="diag.Id">
                  {{ diag.Code }} - {{ diag.Diagnose }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="appointment-note">
      <div class="note-header">
        <p>{{ $t("newCon.titles[4]") }}</p>
      </div>
      <div class="fix-width scroll-inner">
        <table v-if="consultations.length > 0">
          <thead>
            <tr>
              <th>{{ $t("seeCon.principalTitle") }}</th>
              <th>{{ $t("seeCon.professional") }}</th>
              <th>{{ $t("seeCon.prescriptions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="con in consultations" :key="con">
              <td class="col-date" v-if="con.Recipes.length > 0"> {{ con.ConsultationDate.split('T')[0] }}</td>
              <td class="col-pro" v-if="con.Recipes.length > 0 && doctors.length > 0">
                <i class="material-icons-outlined" v-if="con.Type == 1">add_location</i>
                <i class="material-icons-round" v-if="con.Type == 2">rss_feed</i>
                <i class="material-icons" v-if="con.Type == 3">directions_car</i>
                {{ getDoctorName(con.DoctorId) }}
              </td>
              <td v-if="con.Recipes.length > 0">
                <table>
                  <thead>
                    <tr>
                      <th>{{ $t("newCon.addPrescription.tableTitles[1]") }}</th>
                      <th>{{ $t("newCon.addPrescription.tableTitles[2]") }}</th>
                      <th>{{ $t("seeCon.download") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="rec in con.Recipes" :key="rec">
                      <td> {{ rec.Description }} </td>
                      <td v-if="rec.Medications">
                        <p v-for="medicine in rec.Medications" :key="medicine.Id">
                          {{ medicine.ActiveSubstance }} - cada {{ medicine.Frenquency.Quantity }}
                          {{ medicine.Frenquency.Type }} - {{ medicine.Duration.Quantity }} {{ medicine.Duration.Type }}
                          - {{ medicine.Unit }} {{ medicine.Doze }}
                        </p>
                      </td>
                      <td v-else> </td>
                      <td>
                        <a class="waves-effect waves-ligh more"><i class="material-icons-outlined"
                            @click="downloadFile(rec.DocumentFilePath, rec.DocumentFileName)">file_download</i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="appointment-note">
      <div class="note-header">
        <p>{{ $t("newCon.titles[5]") }}</p>
      </div>
      <div class="fix-width scroll-inner">
        <table v-if="consultations.length > 0">
          <thead>
            <tr>
              <th>{{ $t("seeCon.principalTitle") }}</th>
              <th>{{ $t("seeCon.professional") }}</th>
              <th>{{ $t("seeCon.orders") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="con in consultations" :key="con.Id">
              <td class="col-date" v-if="con.Orders.length > 0"> {{ con.ConsultationDate.split('T')[0] }}</td>
              <td class="col-pro" v-if="con.Orders.length > 0 && doctors.length > 0">
                <i class="material-icons-outlined" v-if="con.Type == 1">add_location</i>
                <i class="material-icons-round" v-if="con.Type == 2">rss_feed</i>
                <i class="material-icons" v-if="con.Type == 3">directions_car</i>
                {{ getDoctorName(con.DoctorId) }}
              </td>
              <td v-if="con.Orders.length > 0">
                <table>
                  <thead>
                    <tr>
                      <th>{{ $t("newCon.addOrder.tableTitles[1]") }}</th>
                      <th>{{ $t("newCon.addOrder.tableTitles[2]") }}</th>
                      <th>{{ $t("seeCon.download") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in con.Orders" :key="order">
                      <td>{{ order.Description }}</td>
                      <td v-if="order.Procedures">
                        <p v-for="pro in order.Procedures" :key="pro.Id">
                          {{ pro.Name }}
                        </p>
                      </td>
                      <td v-else> </td>
                      <td>
                        <a class="waves-effect waves-ligh more"><i class="material-icons-outlined"
                            @click="downloadFile(order.DocumentFilePath, order.DocumentFileName)">file_download</i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="appointment-note">
      <div class="note-header">
        <p>{{ $t("newCon.titles[6]") }}</p>
      </div>
      <div class="fix-width scroll-inner">
        <table v-if="consultations.length > 0">
          <thead>
            <tr>
              <th>{{ $t("seeCon.principalTitle") }}</th>
              <th>{{ $t("seeCon.professional") }}</th>
              <th>{{ $t("newCon.addDocument.disability.tableTitles[0]") }}</th>
              <th>{{ $t("newCon.addDocument.disability.tableTitles[1]") }}</th>
              <th>{{ $t("newCon.addDocument.disability.tableTitles[2]") }}</th>
              <th>{{ $t("newCon.addDocument.disability.tableTitles[3]") }}</th>
              <th>{{ $t("seeCon.download") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="con in consultations" :key="con.Id">
              <td class="col-date" v-if="con.MedicalDisability"> {{ con.ConsultationDate.split('T')[0] }}</td>
              <td class="col-pro" v-if="con.MedicalDisability && doctors.length > 0">
                <i class="material-icons-outlined" v-if="con.Type == 1">add_location</i>
                <i class="material-icons-round" v-if="con.Type == 2">rss_feed</i>
                <i class="material-icons" v-if="con.Type == 3">directions_car</i>
                {{ getDoctorName(con.DoctorId) }}
              </td>
              <td v-if="con.MedicalDisability">{{ t('newCon.addDocument.options[0]') }}</td>
              <td v-if="con.MedicalDisability">{{ con.MedicalDisability.DisabilityDays }}</td>
              <td v-if="con.MedicalDisability">{{ con.MedicalDisability.StartDate.split('T')[0] }}</td>
              <td v-if="con.MedicalDisability">{{ con.MedicalDisability.EndDate.split('T')[0] }}</td>
              <td v-if="con.MedicalDisability">
                <a class="waves-effect waves-ligh more"><i class="material-icons-outlined"
                    @click="downloadFile(con.MedicalDisability.DocumentFilePath, con.MedicalDisability.DocumentFileName)">file_download</i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br v-if="consultations.length > 0">
      <hr v-if="consultations.length > 0">
      <div class="fix-width scroll-inner">
        <table v-if="consultations.length > 0">
          <thead>
            <tr>
              <th>{{ $t("seeCon.principalTitle") }}</th>
              <th>{{ $t("seeCon.professional") }}</th>
              <th>{{ $t("newCon.addDocument.certificate.tableTitles[0]") }}</th>
              <th>{{ $t("newCon.addDocument.certificate.tableTitles[1]") }}</th>
              <th>{{ $t("newCon.addDocument.certificate.tableTitles[2]") }}</th>
              <th>{{ $t("seeCon.download") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="con in consultations" :key="con.Id">
              <td class="col-date" v-if="con.MedicalCertificate"> {{ con.ConsultationDate.split('T')[0] }}</td>
              <td class="col-pro" v-if="con.MedicalCertificate && doctors.length > 0">
                <i class="material-icons-outlined" v-if="con.Type == 1">add_location</i>
                <i class="material-icons-round" v-if="con.Type == 2">rss_feed</i>
                <i class="material-icons" v-if="con.Type == 3">directions_car</i>
                {{ getDoctorName(con.DoctorId) }}
              </td>
              <td v-if="con.MedicalCertificate">{{ t('newCon.addDocument.options[1]') }}</td>
              <td v-if="con.MedicalCertificate">{{ con.MedicalCertificate.Diagnose.Code }} -
                {{ con.MedicalCertificate.Diagnose.Diagnose }}</td>
              <td v-if="con.MedicalCertificate">{{ con.MedicalCertificate.Description }}</td>
              <td v-if="con.MedicalCertificate">
                <a class="waves-effect waves-ligh more"><i class="material-icons-outlined"
                    @click="downloadFile(con.MedicalCertificate.DocumentFilePath, con.MedicalCertificate.DocumentFileName)">file_download</i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="appointment-note">
      <div class="note-header">
        <p>{{ $t("newCon.titles[7]") }}</p>
      </div>
      <div class="fix-width scroll-inner">
        <table v-if="consultations.length > 0">
          <thead>
            <tr>
              <th>{{ $t("seeCon.principalTitle") }}</th>
              <th>{{ $t("seeCon.professional") }}</th>
              <th>{{ $t("newCon.addAnalysis.tableTitle") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="con in consultations" :key="con.Id">
              <td class="col-date" v-if="con.Analysis"> {{ con.ConsultationDate.split('T')[0] }}</td>
              <td class="col-pro" v-if="con.Analysis && doctors.length > 0">
                <i class="material-icons-outlined" v-if="con.Type == 1">add_location</i>
                <i class="material-icons-round" v-if="con.Type == 2">rss_feed</i>
                <i class="material-icons" v-if="con.Type == 3">directions_car</i>
                {{ getDoctorName(con.DoctorId) }}
              </td>
              <td v-if="con.Analysis"> {{ con.Analysis.Description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<style scoped>
#seeConsultations {
  position: relative;
  padding: 16px 20px;
  overflow-y: scroll;
  height: calc(100% - 135px);
}

.more {
  border-radius: 50%;
}

.col-date {
  min-width: 100px;
}

.col-pro {
  min-width: 140px;
}
</style>