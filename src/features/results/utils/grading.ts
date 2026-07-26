export type GradeResult = {
  grade: string;
  remark: string;
};

export function calculateGrade(
  totalScore: number
): GradeResult {
  if (totalScore >= 80) {
    return {
      grade: "A",
      remark: "Excellent",
    };
  }

  if (totalScore >= 70) {
    return {
      grade: "B",
      remark: "Very Good",
    };
  }

  if (totalScore >= 60) {
    return {
      grade: "C",
      remark: "Good",
    };
  }

  if (totalScore >= 50) {
    return {
      grade: "D",
      remark: "Fair",
    };
  }

  if (totalScore >= 40) {
    return {
      grade: "E",
      remark: "Pass",
    };
  }

  return {
    grade: "F",
    remark: "Fail",
  };
}