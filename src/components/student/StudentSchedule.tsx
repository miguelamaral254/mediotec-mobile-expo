// src/components/StudentSchedule.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getLessonsByCpf } from '../../services/lessonsService';
import { Lesson, WeekDay, TimeSlot } from '../../interfaces/LessonInterface'; 
import { mapWeekDayToPortuguese, mapTimeSlotToPortuguese } from '../../utils/mappingUtils';

const daysOfWeek = Object.values(WeekDay);
const timeSlots = Object.values(TimeSlot);

const SCHEDULE_BOX_SIZE = 100; 
const HEADER_BOX_SIZE = 100;

const StudentSchedule: React.FC<{ cpf: string }> = ({ cpf }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getLessonsByCpf(cpf);
        if (Array.isArray(response)) {
          setLessons(response);
        } else {
          console.warn("Response is not an array:", response);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [cpf]);

  if (loading) {
    return <Text className="text-center text-lg">Loading...</Text>;
  }

  if (lessons.length === 0) {
    return <Text className="text-center text-lg">No lessons available.</Text>;
  }

  const schedule = Array.from({ length: timeSlots.length }, () => Array(daysOfWeek.length).fill(null));

  lessons.forEach((lesson) => {
    const dayIndex = daysOfWeek.indexOf(lesson.weekDay);
    const startIndex = timeSlots.indexOf(lesson.startTime);
    
    if (dayIndex !== -1 && startIndex !== -1) {
      schedule[startIndex][dayIndex] = lesson;
    } else {
      console.warn(`Invalid day or time mapping: weekDay=${lesson.weekDay}, startTime=${lesson.startTime}`);
    }
  });

  const timeIntervals = timeSlots.map((time, index) => {
    const nextIndex = index + 1;
    return nextIndex < timeSlots.length ? `${mapTimeSlotToPortuguese(time)} - ${mapTimeSlotToPortuguese(timeSlots[nextIndex])}` : null;
  });

  return (
    <ScrollView className="flex-1 p-5 bg-gray-100" horizontal showsHorizontalScrollIndicator={true}>
      <View className="border border-gray-300 rounded-lg overflow-hidden">
        <View className="flex flex-row bg-gray-200">
          <Text className="w-24 p-4 font-bold text-center"></Text>
          {daysOfWeek.map((day) => (
            <Text 
              key={day} 
              className={`w-${HEADER_BOX_SIZE} p-4 font-bold text-center`}
              style={{ width: HEADER_BOX_SIZE }}
            >
              {mapWeekDayToPortuguese(day)}
            </Text>
          ))}
        </View>
        {schedule.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row">
            <Text className="w-24 p-4 bg-gray-100 border-b border-gray-300 text-center">
              {timeIntervals[rowIndex]}
            </Text>
            {row.map((lesson, colIndex) => (
              <View
                key={colIndex}
                className={`flex justify-center items-center border-b border-l border-gray-300`}
                style={{ width: SCHEDULE_BOX_SIZE, height: SCHEDULE_BOX_SIZE }}
              >
                {lesson ? (
                  <View className="p-2">
                    <Text className="text-center text-sm">{lesson.discipline?.name || 'No discipline'}</Text>
                    <Text className="text-center text-sm">Sala:{lesson.room || 'No room'}</Text>
                  </View>
                ) : (
                  <Text className="text-center"></Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default StudentSchedule;
