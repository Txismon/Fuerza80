'use strict';
const EXERCISE_GUIDES={
  "bench": {
    "name": "Press banca con barra",
    "tip": "Apoya cabeza, espalda y glúteos en el banco, con pies firmes. Baja la barra al pecho con control y empuja sin rebotar."
  },
  "pullup": {
    "name": "Dominadas",
    "tip": "Desde la suspensión, baja los hombros y lleva el pecho hacia la barra. Desciende con control y evita balancearte."
  },
  "bulgarian": {
    "name": "Sentadilla búlgara",
    "tip": "Apoya el empeine trasero en un banco. Flexiona la pierna delantera siguiendo la dirección del pie y empuja para volver."
  },
  "chestrow": {
    "name": "Remo con pecho apoyado",
    "tip": "Apoya el pecho en un banco inclinado. Tira de las mancuernas hacia las costillas sin despegar el torso."
  },
  "lateral": {
    "name": "Elevaciones laterales",
    "tip": "Con codos ligeramente flexionados, eleva los brazos hasta la altura de los hombros. Baja despacio sin impulso."
  },
  "abwheel": {
    "name": "Ab wheel",
    "tip": "Desde las rodillas, rueda hacia delante solo hasta donde puedas mantener el abdomen firme y la espalda sin arquear. Regresa con control."
  },
  "rdl": {
    "name": "Peso muerto rumano",
    "tip": "Con rodillas ligeramente flexionadas, lleva la cadera atrás y desliza la barra cerca de las piernas. Vuelve extendiendo la cadera sin arquear la espalda."
  },
  "pulldown": {
    "name": "Jalón neutro",
    "tip": "Sentado con muslos sujetos, lleva el agarre neutro hacia la parte alta del pecho. Evita tirar detrás de la nuca o balancearte."
  },
  "incline": {
    "name": "Press inclinado con mancuernas",
    "tip": "Apoya el torso en un banco inclinado. Baja las mancuernas a los lados del pecho y empuja hacia arriba con muñecas alineadas."
  },
  "legcurl": {
    "name": "Curl femoral sentado",
    "tip": "Ajusta el eje de la máquina a la rodilla y el rodillo sobre la parte baja de las pantorrillas. Flexiona las rodillas y vuelve lentamente."
  },
  "biceps": {
    "name": "Curl de bíceps",
    "tip": "Mantén los codos cerca del cuerpo. Flexiona los brazos sin balancear el tronco y baja las mancuernas con control."
  },
  "pallof": {
    "name": "Pallof press",
    "tip": "Colócate de lado a una polea a la altura del pecho. Empuja el agarre al frente resistiendo el giro y vuelve al pecho. Repite a ambos lados."
  },
  "squat": {
    "name": "Sentadilla con barra",
    "tip": "Con la barra apoyada en la parte alta de la espalda, flexiona caderas y rodillas. Mantén el pie apoyado y sube sin perder el control."
  },
  "ohp": {
    "name": "Press militar",
    "tip": "Desde la parte alta del pecho, empuja la barra sobre la cabeza. Mantén abdomen y glúteos firmes sin inclinarte hacia atrás."
  },
  "machrow": {
    "name": "Remo en máquina",
    "tip": "Con pecho apoyado si la máquina lo permite, tira de los agarres hacia las costillas. Regresa sin redondear la espalda."
  },
  "chestmachine": {
    "name": "Press de pecho en máquina",
    "tip": "Ajusta el asiento para situar los agarres a la altura del pecho. Empuja al frente sin despegar la espalda y vuelve con control."
  },
  "quadext": {
    "name": "Extensión de cuádriceps",
    "tip": "Alinea las rodillas con el eje de la máquina y coloca el rodillo sobre los tobillos. Extiende sin bloquear bruscamente y baja despacio."
  },
  "crunch": {
    "name": "Crunch en polea",
    "tip": "De rodillas ante una polea alta, mantén la cuerda junto a la cabeza. Acerca las costillas a la pelvis sin convertirlo en un tirón de brazos."
  }
};
