import dayjs from "dayjs";
import { useToast } from 'primevue/usetoast'
export function useFunc() {
    const toast = useToast()
    
    const toCapitalize = (str) => {
        if (!str) return ""
        return str[0].toUpperCase() + str.slice(1)
    }
    const formatDate = (dateStr) => {
        const date = dayjs(dateStr).format("DD.MM.YYYY");
        return date
    }
    const formatTime = (dateStr) => {
        const date = dayjs(dateStr).format("HH:mm");
        return date
    }
    const notification = (status, msg) => {
        toast.add({ severity: status, summary: `${toCapitalize(status)} Message`, detail: msg, life: 5000 });
    }

    return {
        toCapitalize,
        formatDate,
        formatTime,
        notification
    }
}