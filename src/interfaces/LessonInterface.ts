import { DisciplineInterface } from "./disciplineInterface";
import { SchoolClass } from "./schoolClassInterface";

// Enums para representar os dias da semana e horários
export enum WeekDay {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}

export enum TimeSlot {
  SEVEN_THIRTY = "SEVEN_THIRTY",
  EIGHT_TWENTY = "EIGHT_TWENTY",
  NINE_TEN = "NINE_TEN",
  NINE_THIRTY = "NINE_THIRTY",
  TEN_TWENTY = "TEN_TWENTY",
  ELEVEN_TEN = "ELEVEN_TEN",
  TWELVE_O_CLOCK = "TWELVE_O_CLOCK",
  ONE_THIRTY = "ONE_THIRTY",
  TWO_TWENTY = "TWO_TWENTY",
  THREE_TEN = "THREE_TEN",
  THREE_THIRTY = "THREE_THIRTY",
  FOUR_TEN = "FOUR_TEN",
  FIVE_O_CLOCK = "FIVE_O_CLOCK"
}

export interface Student {
  cpf: string;
  name: string;
}

export interface Professor {
  name: string;
  cpf: string;
}
export interface Lesson {
  id: number;
  name: string;
  schoolClass: SchoolClass;
  discipline: DisciplineInterface;
  studentResponseDTO: Student;
  professorResponseDTO: Professor;
  weekDay: WeekDay;
  startTime: TimeSlot;
  endTime: TimeSlot;
  room: string;
}