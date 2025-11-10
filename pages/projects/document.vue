<script setup lang="ts">
import CompSelect from '~/components/CompSelect.vue'

const dateInput = ref("")
const seriaInput = ref("")
const tellInput = ref("+998 ")
const dataCountry = ref({})
const allDate = ref({})
const active = ref(false)
const firstname = ref("")
const lastname = ref("")
const selectArr = [
    { name: "Andijon viloyati", code: "AN" },
    { name: "Buxoro viloyati", code: "BU" },
    { name: "Farg'ona viloyati", code: "FA" },
    { name: "Jizzax viloyati", code: "JI" },
    { name: "Namangan viloyati", code: "NG" },
    { name: "Navoiy viloyati", code: "NW" },
    { name: "Qashqadaryo viloyati", code: "QA" },
    { name: "Qoraqalpog'iston Respublikasi", code: "QR" },
    { name: "Samarqand viloyati", code: "SA" },
    { name: "Sirdaryo viloyati", code: "SI" },
    { name: "Surxandaryo viloyati", code: "SU" },
    { name: "Toshkent viloyati", code: "TO" },
    { name: "Xorazm viloyati", code: "XO" },
    { name: "Toshkent shahri", code: "TK" }
]

interface Country {
    name: string;
    code: string;
}

const date = new Date()
const currentYear = date.getFullYear()
const currentMonth = date.getMonth() +1
const currentDay = date.getDate()


function formatDate(e: Event) {
    const target = e.target as HTMLInputElement
    if (!target) return
    let value = target.value.replace(/\D/g, "")
    value = value.slice(0, 8)

    let day = value.slice(0, 2)
    let month = value.slice(2, 4)
    let year = value.slice(4, 8)

    if (year.length === 4) {
        let y = parseInt(year, 10)
        if (y < 1) y = 1
        if (y > currentYear) y = currentYear
        year = String(y).padStart(4, "0")
    }

    if (month.length === 2) {
        let m = parseInt(month, 10)
        let y = parseInt(year, 10)
        if (m < 1) m = 1
        if (m > 12) m = 12
        if (y >= currentYear && m > currentMonth) m = currentMonth
        month = String(m).padStart(2, "0")
    }

    if (day.length === 2) {
        let d = parseInt(day, 10)
        let m = parseInt(month, 10)
        let y = parseInt(year, 10)
        let maxDays = 31
        if (month.length === 2) {
            const m = parseInt(month, 10)
            const y = year.length === 4 ? parseInt(year, 10) : currentYear
            maxDays = new Date(y, m, 0).getDate()
        }

        if (d < 1) d = 1
        if (d > maxDays) d = maxDays
        if (y >= currentYear && m >= currentMonth && d > currentDay) d = currentDay
        day = String(d).padStart(2, "0")
    }
    let formatted = day
    if (month) formatted += "." + month
    if (year) formatted += "." + year
    setTimeout(() => {
        dateInput.value = formatted
    }, 1)
}
const formatSeria = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target) return
    let value = target.value.toUpperCase()
    value = value.replace(/[^A-Z0-9]/g, "")
    let letters = value.replace(/[^A-Z]/g, "").slice(0, 2)
    let digits = ""
    if (letters.length === 2) {
        digits = value.replace(/[^0-9]/g, "").slice(0, 7)
    }
    setTimeout(() => {
        seriaInput.value = letters + (digits ? " " + digits : "")
    }, 1);
}
const formatTell = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target) return
    let value = target.value.replace(/\D/g, "")
    value = value.slice(3, 12)
    let countryCode = '+998'
    let tellCode = value.slice(0, 2)
    let tellStart = value.slice(2, 5)
    let tellCenter = value.slice(5, 7)
    let tellEnd = value.slice(7, 9)
    let tellNumber = ""
    if (tellCode && tellCode.length <= 2 && !tellStart) tellNumber += `(${tellCode}`
    else if (tellCode.length === 2 && tellStart) tellNumber += `(${tellCode})`
    if (tellStart) tellNumber += " " + tellStart
    if (tellCenter) tellNumber += " " + tellCenter
    if (tellEnd) tellNumber += "-" + tellEnd
    setTimeout(() => {
        tellInput.value = countryCode + " " + tellNumber
    }, 1)
} 
const country = (e: Country) => {
    dataCountry.value = e
}
const all = () => {
    allDate.value = {
        date: dateInput.value.replace(/\./g, "/"),
        seria: seriaInput.value.replace(/\ /g, ""),
        tell: tellInput.value.replace(/\D/g, ""),
        country: dataCountry.value,
        firstname: firstname.value,
        lastname: lastname.value
    }
    active.value = true
}
</script>
<template>
    <div class="flex gap-[40px]">
        <div class="flex flex-col gap-2">
            <div class="flex gap-2">
                <InputText 
                    type="text" 
                    @input="formatDate"
                    maxlength="10"
                    placeholder="Дата рождения"
                    v-model="dateInput" 
                    class="inputStyle"
                />
                <InputText 
                    type="text" 
                    @input="formatSeria"
                    maxlength="10"
                    placeholder="Паспорт серия"
                    v-model="seriaInput" 
                    class="inputStyle"
                />
            </div>
            <div class="flex gap-2">
                <InputText 
                    type="text" 
                    @input="formatTell"
                    maxlength="19"
                    placeholder="Номер телефон без (+998)"
                    v-model="tellInput" 
                    class="inputStyle"
                />
                <CompSelect
                    @value="country"
                    :option="selectArr"
                    placeholder="Выберите область"
                />
            </div>
            <div class="flex gap-2">
                <InputText 
                    type="text"
                    placeholder="Имя"
                    v-model="firstname" 
                    class="inputName"
                    name="firstname"
                />
                <InputText 
                    type="text"
                    placeholder="Фамилия"
                    v-model="lastname" 
                    class="inputName"
                    name="lastname"
                />
            </div>
            <CompButton label="Submit" @click="all" />
        </div>
        <pre v-if="active">{{ allDate }}</pre>
    </div>
</template>
<style scoped lang="scss">
.inputName,
.inputStyle {
    border: 1px solid black;
    outline: none;
    border-radius: 5px;
    padding: 4px 8px;
    text-transform: uppercase;
    &::placeholder {
        color: gray;
        text-transform: capitalize;
    }
}
.inputName {
    text-transform: unset;
}
</style>