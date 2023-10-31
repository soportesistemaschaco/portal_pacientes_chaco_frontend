export const variantsGender = [
  { id: 1, name: "Femenino" },
  { id: 2, name: "Masculino" },
  { id: 3, name: "No-binario" },
];

export const variantsTimeAvaialability = [
  { id: 'Por la mañana', name: "Por la mañana" },
  { id: 'Por la tarde', name: "Por la tarde" },
  { id: 'Indistinto', name: "Indistitnto" },
];

export const variantsDependencies = [
  { id: 'Municipal', name: "Municipal" },
  { id: 'Provincial', name: "Provincial" }
];

export const variantsTypologies = [
  { id: 'Centro de salud "A"', name: 'Centro de Salud "A"' },
  { id: 'Hospital', name: "Hospital" },
  { id: 'Laboratorio', name: "Laboratorio" },
  { id: 'Transporte', name: "Transporte" }
];

export const variantsDepartment = [
  { id: '1', name: "Arauco" },
  { id: '2', name: "Castro Barros" },
  { id: '3', name: "Chamical" },
  { id: '4', name: "Chilecito" },
  { id: '5', name: "Famatina" },
  { id: '6', name: "General Ángel Vicente Peñaloza" },
  { id: '7', name: "General Belgrano" },
  { id: '8', name: "General Felipe Varela" },
  { id: '9', name: "General Juan Facundo Quiroga" },
  { id: '10', name: "General Lamadrid" },
  { id: '11', name: "General Ortiz de Ocampo" },
  { id: '12', name: "General San Martín" },
  { id: '13', name: "Independencia" },
  { id: '14', name: "La Rioja" },
  { id: '15', name: "Rosario Vera Peñaloza" },
  { id: '16', name: "San Blas" },
  { id: '17', name: "Sanagasta" },
  { id: '18', name: "Vinchina" }
];
export const variantsTypologyCategories = [
  { id: 'Establecimiento para la salud', name: "Establecimiento para la salud" },
  { id: 'Establecimiento para la salud con internación', name: "Establecimiento para la salud con internación" },
  { id: 'Establecimiento para la salud con internación general', name: "Establecimiento para la salud con internación general" },
  { id: 'Establecimiento para la salud con internación especializada', name: "Establecimiento para la salud con internación especializada" },
  { id: 'Establecimiento para la salud sin internación', name: "Establecimiento para la salud sin internación" },
  { id: 'Establecimiento para la salud sin internación de diagnóstico', name: "Establecimiento para la salud sin internación de diagnóstico" },
  { id: 'Establecimiento para la salud sin internación de diagnóstico y tratamiento', name: "Establecimiento para la salud sin internación de diagnóstico y tratamiento" },
  { id: 'Sin especificar', name: "Sin especificar" }
];


export const endDate = () => {
  var endYear = new Date().getFullYear() - 14;
  var todayDay = new Date().getDate();
  var todayMonth = new Date().getMonth();
  var endDate = new Date(endYear, todayMonth, todayDay);

  return endDate;
};
export const variantsSpecialties = [
    { id: 1, name: "ADOLESCENCIA " },
    { id: 2, name: "ALERGIA E INMUNOLOGÍA PEDIÁTRICA" },
    { id: 3, name: "ALERGIA E INMUNOLOGÍA" },
    { id: 4, name: "ANATOMÍA PATOLÓGICA" },
    { id: 5, name: "ANESTESIOLOGÍA" },
    { id: 6, name: "ANGIOLOGÍA GENERAL Y HEMODINAMIA" },
    { id: 7, name: "CARDIOLOGÍA" },
    { id: 8, name: "CARDIÓLOGO INFANTIL" },
    { id: 9, name: "CIRUGÍA CARDIOVASCULAR PEDIÁTRICA" },
    { id: 10, name: "CIRUGÍA CARDIOVASCULAR" },
    { id: 11, name: "CIRUGÍA DE CABEZA Y CUELLO" },
    { id: 12, name: "CIRUGÍA DE TÓRAX (CIRUGÍA TORÁCICA)" },
    { id: 13, name: "CIRUGÍA GENERAL" },
    { id: 14, name: "CIRUGÍA INFANTIL (CIRUGÍA PEDIÁTRICA)" },
    { id: 15, name: "CIRUGÍA PLÁSTICA Y REPARADORA" },
    { id: 16, name: "CIRUGÍA VASCULAR PERIFÉRICA" },
    { id: 17, name: "CLÍNICA MÉDICA" },
    { id: 18, name: "COLOPROCTOLOGÍA" },
    { id: 19, name: "DERMATOLOGÍA PEDIÁTRICA" },
    { id: 20, name: "DERMATOLOGÍA" },
    { id: 21, name: "DIAGNÓSTICO POR IMÁGENES EN PEDIATRIA " },
    { id: 22, name: "DIAGNÓSSTICO POR IMÁGENES" },
    { id: 23, name: "(CMM R Nº 115/16)" },
    { id: 24, name: "ELECTRO-FISIOLOGÍA CARDÍACA" },
    { id: 25, name: "EMERGENTOLOGIA PEDIATRICA " },
    { id: 26, name: "EMERGENTOLOGÍA" },
    { id: 27, name: "ENDOCRINOLOGÍA" },
    { id: 28, name: "ENDOCRINÓLOGO INFANTIL" },
    { id: 29, name: "FARMACOLOGÍA CLÍNICA" },
    { id: 30, name: "FISIATRÍA (MEDICINA FÍSICA Y REHABILITACIÓN)" },
    { id: 31, name: "GASTROENTERÓLOGO INFANTIL" },
    { id: 32, name: "GASTRONTEROLOGÍA" },
    { id: 33, name: "GENÇETICA MÉDICA" },
    { id: 34, name: "GERIATRÍA" },
    { id: 35, name: "GINECOLOGÍA" },
    { id: 36, name: "HEMATOLOGÍA INFANTIL" },
    { id: 37, name: "HEMATOLOGÍA" },
    { id: 38, name: "HEMATO-ONCOLOGIA INFANTIL" },
    { id: 39, name: "HEMOTERAPIA E INMUNOHEMATOLOGÍA" },
    { id: 40, name: "HEPATOLOGÍA PEDIÁTRICA" },
    { id: 41, name: "HEPATOLOGÍA" },
    { id: 42, name: "INFECTOLOGÍA" },
    { id: 43, name: "INFECTÓLOGO INFANTIL" },
    { id: 44, name: "INMUNOLOGIA PEDIATRICA " },
    { id: 45, name: "MEDICINA DEL DEPORTE" },
    { id: 46, name: "MEDICINA DEL TRABAJO" },
    { id: 47, name: "MEDICINA GENERAL y/o MEDICINA DE FAMILIA" },
    { id: 48, name: "MEDICINA LEGAL" },
    { id: 49, name: "MEDICINA NUCLEAR MSPN)" },
    { id: 50, name: "MEDICINA PALIATIVA EN PEDIATRIA " },
    { id: 51, name: "MEDICINA PALIATIVA(MSPN)" },
    { id: 52, name: "NEFROLOGÍA" },
    { id: 53, name: "NEFRÓLOGO INFANTIL" },
    { id: 54, name: "(MSPN)" },
    { id: 55, name: "NEUMONOLOGÍA" },
    { id: 56, name: "NEUMONÓLOGO INFANTIL" },
    { id: 57, name: "NEUROCIRUGÍA" },
    { id: 58, name: "NEUROLOGÍA" },
    { id: 59, name: "NEURÓLOGO INFANTIL" },
    { id: 60, name: "NUTRICION INFANTIL " },
    { id: 61, name: "NUTRICIÓN" },
    { id: 62, name: "(MSPN)" },
    { id: 63, name: "OFTALMOLOGÍA" },
    { id: 64, name: "ONCOLOGÍA" },
    { id: 65, name: "ONCÓLOGO INFANTIL" },
    { id: 66, name: "ORTOPEDIA Y TRAUMATOLOGÍA INFANTIL" },
    { id: 67, name: "ORTOPEDIA Y TRAUMATOLOGÍA" },
    { id: 68, name: "OTORRINOLARINGOLOGÍA" },
    { id: 69, name: "PEDIATRÍA" },
    { id: 70, name: "PSIQUIATRÍA INFANTO-JUVENIL" },
    { id: 71, name: "PSIQUIATRÍA" },
    { id: 72, name: "RADIOTERAPIA O TERAPIA RADIANTE" },
    { id: 73, name: "REUMATOLOGÍA INFANTIL" },
    { id: 74, name: "REUMATOLOGÍA" },
    { id: 75, name: "TERAPIA INTENSIVA" },
    { id: 76, name: "TERAPISTA INTENSIVO INFANTIL" },
    { id: 77, name: "TOCOGINCECOLOGÍA" },
    { id: 78, name: "TOXICOLOGÍA" },
    { id: 79, name: "UROLOGÍA" },
];
export const receiverCategory = [
  //hardcode note - Check endpoint /categories. exists, but is incomplete.
  { id: 0, description: "Todos los pacientes" },
  { id: 1, description: "Pacientes con diabetes crónica" },
  { id: 2, description: "Pacientes con hipertensión crónica" },
  { id: 3, description: "Pacientes con enfermedad respiratoria crónica" },
  { id: 4, description: "Pacientes con enfermedad renal crónica" },
];

export const institutionData = {
  name : 'Ministerio de Salud Pública',
  gob: 'Gobierno de Chaco',
  address:  'Marcelo T. de Alvear 145 - 8vo, Ciudad de Resistencia, Chaco, Argentina',
  addressLink: 'https://goo.gl/maps/q36LaFxqwV44Wjc9A',
  email: 'comunicaciondesalud@gmail.com',
  phone: ' (0362) 444-8028',
  webLink: 'https://chaco.gov.ar/',
}