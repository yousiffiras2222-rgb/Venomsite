// Real Diagnostikare channels (from diagnostikare.com) and the public cédula registry.
export const WHATSAPP_URL = "https://wa.me/525531224408?text=Hola%2C%20quiero%20platicar%20con%20alguien%20de%20Diagnostikare";
export const PATIENT_URL = "https://diagnostikare.com/soy-paciente/";
export const SEP_REGISTRY = "https://www.cedulaprofesional.sep.gob.mx/";

/** Sample name for a team member until the client supplies real people. */
export function personName(p) {
  return `${p.title} Nombre Apellido`;
}
