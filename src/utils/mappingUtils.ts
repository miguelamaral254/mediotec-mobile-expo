// src/utils/mappingUtils.ts

import { WeekDay, TimeSlot } from '../interfaces/LessonInterface';

const weekDayMap: { [key in WeekDay]: string } = {
  [WeekDay.MONDAY]: 'Segunda',
  [WeekDay.TUESDAY]: 'Terça',
  [WeekDay.WEDNESDAY]: 'Quarta',
  [WeekDay.THURSDAY]: 'Quinta',
  [WeekDay.FRIDAY]: 'Sexta',
  [WeekDay.SATURDAY]: 'Sábado',
  [WeekDay.SUNDAY]: 'Domingo',
};

const timeSlotMap: { [key in TimeSlot]: string } = {
  [TimeSlot.SEVEN_THIRTY]: '07:30',
  [TimeSlot.EIGHT_TWENTY]: '08:20',
  [TimeSlot.NINE_TEN]: '09:10',
  [TimeSlot.NINE_THIRTY]: '09:30',
  [TimeSlot.TEN_TWENTY]: '10:20',
  [TimeSlot.ELEVEN_TEN]: '11:10',
  [TimeSlot.TWELVE_O_CLOCK]: '12:00',
  [TimeSlot.ONE_THIRTY]: '13:30',
  [TimeSlot.TWO_TWENTY]: '14:20',
  [TimeSlot.THREE_TEN]: '15:10',
  [TimeSlot.THREE_THIRTY]: '15:30',
  [TimeSlot.FOUR_TEN]: '16:10',
  [TimeSlot.FIVE_O_CLOCK]: '17:00',
};

export const mapWeekDayToPortuguese = (weekDay: WeekDay): string => {
  return weekDayMap[weekDay] || weekDay; 
};

export const mapTimeSlotToPortuguese = (timeSlot: TimeSlot): string => {
  return timeSlotMap[timeSlot] || timeSlot; 
};
