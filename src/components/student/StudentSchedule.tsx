import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getLessonsByStudentAndClass } from '../../services/lessonsService';
import { Lesson, WeekDay, TimeSlot } from '../../interfaces/LessonInterface';
import { mapWeekDayToPortuguese, mapTimeSlotToPortuguese } from '../../utils/mappingUtils';
import LottieView from 'lottie-react-native';

const daysOfWeek = Object.values(WeekDay);
const timeSlots = Object.values(TimeSlot);

const SCHEDULE_BOX_SIZE = 126;
const HEADER_BOX_SIZE = 125;

interface StudentScheduleProps {
  cpf: string;
  schoolClassId: number;
}

const StudentSchedule: React.FC<StudentScheduleProps> = ({ cpf, schoolClassId }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getLessonsByStudentAndClass(cpf, schoolClassId);
        if (Array.isArray(response)) {
          setLessons(response);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Adiciona um atraso de 2 segundos para exibir a animação
      }
    };

    fetchLessons();
  }, [cpf, schoolClassId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F4F6' }}>
        <LottieView
          source={require('../../../assets/animations/calendar.json')} 
          autoPlay
          loop
          style={{ width: 600, height:800 }}
        />
      </View>
    );
  }

  const schedule = Array.from({ length: timeSlots.length }, () => Array(daysOfWeek.length).fill(null));

  lessons.forEach((lesson) => {
    const dayIndex = daysOfWeek.indexOf(lesson.weekDay);
    const startIndex = timeSlots.indexOf(lesson.startTime);
    if (dayIndex !== -1 && startIndex !== -1) {
      schedule[startIndex][dayIndex] = lesson;
    }
  });

  const timeIntervals = timeSlots.map((time, index) => {
    const nextIndex = index + 1;
    return nextIndex < timeSlots.length
      ? `${mapTimeSlotToPortuguese(time)} às ${mapTimeSlotToPortuguese(timeSlots[nextIndex])}`
      : null;
  });

  return (
    <ScrollView className="flex-1 p-5 bg-gray-100" horizontal showsHorizontalScrollIndicator={true}>
      <View className="border border-gray-300 rounded-lg overflow-hidden">
        <View className="flex flex-row bg-blue-500">
          <Text
            className="w-24 p-4 font-bold text-white text-center"
            style={{ width: HEADER_BOX_SIZE }}
          >
            Horário
          </Text>
          {daysOfWeek.map((day) => (
            <Text
              key={day}
              className={`w-${HEADER_BOX_SIZE} p-4 font-bold text-white text-center`}
              style={{ width: HEADER_BOX_SIZE }}
            >
              {mapWeekDayToPortuguese(day)}
            </Text>
          ))}
        </View>
        {schedule.map((row, rowIndex) => (
          <View
            key={rowIndex}
            className={`flex flex-row ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-blue-100'}`}
          >
            <Text className="w-42 mt-8 p-5 text-blue-700 font-bold border-b border-gray-300 text-center">
              {timeIntervals[rowIndex]}
            </Text>
            {row.map((lesson, colIndex) => (
              <View
                key={colIndex}
                className="flex justify-center items-center border-b border-l border-gray-300"
                style={{ width: SCHEDULE_BOX_SIZE, height: SCHEDULE_BOX_SIZE }}
              >
                {lesson ? (
                  <View className="p-1 py-10 bg-blue-100 rounded-lg shadow-md">
                    <Text className="text-center text-sm font-bold text-blue-700">
                      {lesson.discipline?.name || 'Sem Disciplina'}
                    </Text>
                    <Text className="text-center text-xs text-blue-600">
                      Professor: {lesson.professor.name || 'Não definido'}
                    </Text>
                    <Text className="text-center text-xs text-blue-600">
                      Sala: {lesson.room || 'Não definido'}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-center text-gray-400">- -</Text>
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