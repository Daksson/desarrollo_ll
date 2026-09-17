// Fecha de hoy con la hora del computador, en el formato que pide la NASA: "2026-09-16".
// No se usa toISOString() porque da la fecha en UTC: en Colombia, después de las 7 p. m.
// ya devolvería el día siguiente.
export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
