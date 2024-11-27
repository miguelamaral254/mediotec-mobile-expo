import { ResponseGradeInterface } from "../interfaces/responseGradeInterface";

export enum Concept {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

export function fromScore(score: number): Concept {
  if (score >= 9) return Concept.A;
  else if (score >= 7) return Concept.B;
  else if (score >= 5) return Concept.C;
  else if (score >= 4) return Concept.D;
  else if (score >= 2) return Concept.E;
  else return Concept.F;
}

export function calculateFinalAverageAndSituation(
  grades: ResponseGradeInterface[]
): {
  average: number | null;
  finalAverage: number | null;
  situation: string | null;
} {
  const av1 = grades.find((grade) => grade.evaluationType === "AV1")?.evaluation;
  const av2 = grades.find((grade) => grade.evaluationType === "AV2")?.evaluation;
  const av3 = grades.find((grade) => grade.evaluationType === "AV3")?.evaluation;
  const av4 = grades.find((grade) => grade.evaluationType === "AV4")?.evaluation;
  const recovery = grades.find(
    (grade) => grade.evaluationType === "RECOVERY"
  )?.evaluation;

  const allGradesAvailable =
    av1 !== undefined &&
    av2 !== undefined &&
    av3 !== undefined &&
    av4 !== undefined;

  let average: number | null = null;
  let finalAverage: number | null = null;
  let situation: string | null = null;

  if (allGradesAvailable) {
    const total = Number(av1) + Number(av2) + Number(av3) + Number(av4);
    const gradesAverage = total / 4;
    average = Number(gradesAverage.toFixed(2));

    const recoveryScore = recovery !== undefined ? Number(recovery) : 0;

    if (gradesAverage > 7) {
      finalAverage = gradesAverage;
      situation = "Aprovado";
    } else if (recoveryScore > 0) {
      finalAverage = (gradesAverage + recoveryScore) / 2;
      situation = finalAverage >= 7 ? "Aprovado" : "Reprovado";
    } else {
      finalAverage = null;
      situation = "Reprovado";
    }
  }

  return { average, finalAverage, situation };
}

export function formatGrades(
  grades: ResponseGradeInterface[]
): {
  formattedGrades: { label: string; value: string | number; score: string | number }[];
  situation: string | null;
} {
  const { average, finalAverage, situation } = calculateFinalAverageAndSituation(
    grades || []
  );

  const av1 = grades.find((grade) => grade.evaluationType === "AV1")?.evaluation || "--";
  const av2 = grades.find((grade) => grade.evaluationType === "AV2")?.evaluation || "--";
  const av3 = grades.find((grade) => grade.evaluationType === "AV3")?.evaluation || "--";
  const av4 = grades.find((grade) => grade.evaluationType === "AV4")?.evaluation || "--";
  const recovery =
    grades.find((grade) => grade.evaluationType === "RECOVERY")?.evaluation || "--";

  const formattedGrades = [
    {
      label: "AV1",
      value: av1 !== "--" ? fromScore(Number(av1)) : "--",
      score: av1,
    },
    {
      label: "AV2",
      value: av2 !== "--" ? fromScore(Number(av2)) : "--",
      score: av2,
    },
    {
      label: "AV3",
      value: av3 !== "--" ? fromScore(Number(av3)) : "--",
      score: av3,
    },
    {
      label: "AV4",
      value: av4 !== "--" ? fromScore(Number(av4)) : "--",
      score: av4,
    },
    {
      label: "Média",
      value: average !== null ? fromScore(Number(average)) : "--",
      score: average !== null ? average.toFixed(2) : "--",
    },
    {
      label: "Recuperação",
      value: recovery !== "--" ? fromScore(Number(recovery)) : "--",
      score: recovery,
    },
    {
      label: "Média Final",
      value: finalAverage !== null ? fromScore(Number(finalAverage)) : "--",
      score: finalAverage !== null ? finalAverage.toFixed(2) : "--",
    },
  ];

  return { formattedGrades, situation };
}