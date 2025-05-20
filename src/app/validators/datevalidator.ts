import { AbstractControl, ValidationErrors } from "@angular/forms";
/**
 * Función que comprueba si una fecha introducida es menor a la fecha de hoy
 * @param control El controlador del formulario reactivo
 * @returns error | null
 */
export function notBeforeToday(control: AbstractControl): ValidationErrors | null {

    if (!control.value) { //Si el input no tiene valor no hay error
        return null;
    }

    const today = new Date(); //Obtenemos la fecha de hoy

    today.setHours(0, 0, 0, 0); //Limpiamos hora, minutos, segundos, milisegundos

    const inputDate = new Date(control.value);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate < today ? {notBeforeToday : true} : null;
}