import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { getLessonsByCpf } from '../../services/lessonsService';
import { Lesson, WeekDay, TimeSlot } from '../../interfaces/LessonInterface';
import { mapWeekDayToPortuguese, mapTimeSlotToPortuguese } from '../../utils/mappingUtils';

const daysOfWeek = Object.values(WeekDay);
const timeSlots = Object.values(TimeSlot);

const RelatedSchedule: React.FC<{ cpf: string }> = ({ cpf }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState<string | null>(daysOfWeek[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(timeSlots[0]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getLessonsByCpf(cpf);
        console.log("Dados recebidos:", response);
        if (Array.isArray(response)) {
          setLessons(response);
        }
      } catch (error) {
        console.error("Erro ao buscar aulas:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLessons();
  }, [cpf]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <LottieView
          source={require('../../../assets/animations/calendar.json')}
          autoPlay
          loop
          style={{ width: 400, height: 400 }}
        />
      </View>
    );
  }

  const getSelectedLesson = () => {
    if (!selectedDay || !selectedTime) return null;
  
    return lessons.find(
      (lesson) =>
        lesson.weekDay === selectedDay && lesson.startTime === selectedTime
    );
  };

  const selectedLesson = getSelectedLesson();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row justify-between bg-white p-4 rounded-3xl mb-4">
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            className={`rounded-lg px-4 py-2 ${
              selectedDay === day ? "bg-blue-500" : "bg-white"
            }`}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              className={`font-bold ${
                selectedDay === day ? "text-white" : "text-gray-700"
              }`}
            >
              {mapWeekDayToPortuguese(day)[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row flex-1">
        <View className="w-24 mr-4 items-center bg-white p-4 rounded-3xl">
          <Text className="font-bold text-blue-700 mb-4">Horário</Text>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              className={`w-full py-2 rounded-lg mb-2 text-center ${
                selectedTime === time ? "bg-blue-500" : "bg-white"
              }`}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                className={`font-bold text-center ${
                  selectedTime === time ? "text-white" : "text-gray-700"
                }`}
              >
                {mapTimeSlotToPortuguese(time)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Informações da Aula */}
        <View className="flex-1 shadow-md bg-white p-4 rounded-3xl">
          <View className="items-center justify-center mb-4">
            <Text className="text-lg font-bold text-gray-700">INFORMAÇÕES</Text>
          </View>
          {selectedLesson ? (
            <View>
              <View className="mb-4">
                <Text className="text-base font-bold text-blue-600">
                  Professor:
                </Text>
                <Text className="text-base text-gray-700">
                  {selectedLesson.professorResponseDTO?.name || "Não definido"}
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-base font-bold text-blue-600">
                  Matéria:
                </Text>
                <Text className="text-base text-gray-700">
                  {selectedLesson.discipline?.name || "Sem Disciplina"}
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-base font-bold text-blue-600">Sala:</Text>
                <Text className="text-base text-gray-700">
                  {selectedLesson.room || "Não definido"}
                </Text>
              </View>
            </View>
          ) : (
            <Text className="text-center text-gray-400">
              Selecione um horário e um dia.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default RelatedSchedule;