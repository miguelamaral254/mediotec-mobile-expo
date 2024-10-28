// src/components/StudentSchedule.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getLessonsByCpf } from '../../services/lessonsService';
import { Lesson, WeekDay, TimeSlot } from '../../interfaces/LessonInterface'; 
import { mapWeekDayToPortuguese, mapTimeSlotToPortuguese } from '../../utils/mappingUtils';

const daysOfWeek = Object.values(WeekDay);
const timeSlots = Object.values(TimeSlot);

const StudentSchedule: React.FC<{ cpf: string }> = ({ cpf }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getLessonsByCpf(cpf);
        console.log("Fetched lessons:", response);
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
    const timeIndex = timeSlots.indexOf(lesson.startTime);

    if (dayIndex === -1 || timeIndex === -1) {
      console.warn(`Invalid day or time mapping: weekDay=${lesson.weekDay}, startTime=${lesson.startTime}`);
    } else {
      schedule[timeIndex][dayIndex] = lesson;
    }
  });

  return (
    <ScrollView className="flex-1 p-5 bg-gray-100">
      <View className="border border-gray-300 rounded-lg overflow-hidden">
        <View className="flex flex-row bg-gray-200">
          <Text className="flex-1 p-2 font-bold text-center"></Text>
          {daysOfWeek.map((day) => (
            <Text key={day} className="flex-1 p-2 font-bold text-center">{mapWeekDayToPortuguese(day)}</Text>
          ))}
        </View>
        {schedule.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row">
            <Text className="w-24 p-2 bg-gray-100 border-b border-gray-300 text-center">{mapTimeSlotToPortuguese(timeSlots[rowIndex])}</Text>
            {row.map((lesson, colIndex) => (
              <View
                key={colIndex}
                className={`flex-1 p-2 border-b border-l border-gray-300 justify-center items-center ${
                  lesson ? 'bg-green-200' : 'bg-white'
                }`}
              >
                {lesson ? (
                  <Text className="text-center">{lesson.name || 'No name provided'}</Text>
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
