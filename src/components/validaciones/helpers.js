

export const campoRequerido = (x) => {
  if (x.trim().length > 0) {
    return true;
  } else {
    return false;
  }
};

export const rangoNumero = (x) => {
        if (x > 0 && x < 5000){
                return true;
        }else{
                return false;
        }
};

//export {campoRequerido, rangoNumero}