
/* eslint-disable import/no-cycle */
import { onNavigate } from '../main.js';


export const validateEmail = (inputValue) => {
  // expresion  regular
  // eslint-disable-next-line no-useless-escape
  const mailVerificado = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputValue.match(mailVerificado)) {
    return true;
  }
  alert('¡Ha introducido una dirección de correo electrónico no válida!');
  return false;
};

export const validatePassword = (inputPasswordValue, inputConfirmPasworValue) => {
  // que no existan espacios en blanco
  let espacios = false;
  let cont = 0;
  while (!espacios && (cont < inputPasswordValue.length)) {
    if (inputPasswordValue.charAt(cont) === ' ') espacios = true;
    // eslint-disable-next-line no-plusplus
    cont++;
    if (espacios) {
      // eslint-disable-next-line no-alert
      alert('La contraseña no debe contener espacios en blanco');
      return false;
    }
  }
  // Que no nos hayan dejado un campo vacío
  if (inputPasswordValue.length === 0 || inputConfirmPasworValue.length === 0) {
    // eslint-disable-next-line no-alert
    alert('Por favor inserte una contraseña valida y su confirmacion');
    return false;
  }
  // Que ambas contraseñas coincidan
  if (inputPasswordValue !== inputConfirmPasworValue) {
    // eslint-disable-next-line no-alert
    alert('Las contraseñas deben de coincidir');
    return false;
  }
  // Que la contraseña sea de 8 caracteres por lo menos
  if (inputPasswordValue.length >= 8) {
    // eslint-disable-next-line no-alert
    // alert('La contraseña debe tenre por lo menos 8 caracteres');
    return true;
  }
  // eslint-disable-next-line no-alert
  alert('La contraseña debe tener mínimo 8 cracteres');

  return false;
};
