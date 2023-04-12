import axios from 'axios'
import frequency from "src/data/frecuency.json"
import when from "src/data/when.json"


export default {
    data() {
        return {
            frequency: frequency,
            when: when,
        }
    },
    computed: {
        frequencies() {
            const locale = t.locale
            if (locale == 'es') {
                return frequency.FrequencyEs
            } else if (locale == 'en') {
                return frequency.FrequencyEn
            } else {
                return frequency.FrequencyPr
            }
        },
        whenList() {
            const locale = t.locale
            if (locale == 'es') {
                return when.whenEs
            } else if (locale == 'en') {
                return when.whenEn
            } else {
                return when.whenPr
            }
        }
    },
    methods: {
        async getCie10(event) {
            let term = event.query
            if (term.length >= 3) {
                const headers = {
                    Authorization: `Bearer ${userToken.value}`,
                    lang: import.meta.env.VITE_VUE_APP_LOCALE,
                    country: import.meta.env.VITE_VUE_APP_COUNTRY,
                    appid: import.meta.env.VITE_VUE_APP_APP_ID,
                    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
                };


                const params = {
                    term: term,
                    count: 50,
                    appid: import.meta.env.VITE_.env.VUE_APP_APP_ID,
                    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
                }

                const response = await axios.get(
                    import.meta.env.VITE_VUE_APP_BOPS_KEYC_API_V2_URL + "/api/cie10", {
                    headers,
                    params
                }
                );

                let data = response.data
                let newData = []
                for (let i = 0; i < data.length; i++) {
                    const element = {
                        Label: data[i].Code + ' - ' + data[i].Name,
                        Code: data[i].Code,
                        Name: data[i].Name,
                    };
                    newData.push(element)
                }

                this.cie10info = newData
            }
        },

        async getMedicines(string) {

            if (search.length >= 3) {
                const headers = {
                    Authorization: `Bearer ${userToken.value}`,
                    lang: import.meta.env.VITE_VUE_APP_LOCALE,
                    country: import.meta.env.VITE_VUE_APP_COUNTRY,
                    appid: import.meta.env.VITE_VUE_APP_APP_ID,
                    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
                };

                const params = {
                    term: string,
                    count: 20,
                    appid: import.meta.env.VITE_VUE_APP_APP_ID,
                    companyid: import.meta.env.VITE_VUE_APP_COMPANY_ID,
                }

                const response = await axios.get(
                    import.meta.env.VITE_.VUE_APP_BOPS_KEYC_API_V2_URL + "/api/medicines", {
                    headers,
                    params
                }
                );

                this.medicines = response.data

            }
        },

        toggle(event, ref, index) {
            $refs[ref][index].toggle(event);
        },

        isNumber(evt) {
            const keysAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            const keyPressed = evt.key;

            if (!keysAllowed.includes(keyPressed)) {
                evt.preventDefault();
            }
        },

        convertDate(date) {
            return date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate())
        },

        addZero(date) {
            if ((date / 10) < 1)
                return '0' + date

            return date
        },
    }
}