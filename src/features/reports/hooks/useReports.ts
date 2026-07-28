import { useMemo, useState } from "react";

import { useStudentsContext } from "../../students/hooks/useStudentsContext";
import { useAttendanceContext } from "../../attendance/hooks/useAttendanceContext";
import { useResultsContext } from "../../results/hooks/useResultsContext";
import { useFeesContext } from "../../fees/hooks/useFeesContext";
import { useAssignmentsContext } from "../../assignments/hooks/useAssignmentsContext";
import { useClassesContext } from "../../classes/hooks/useClassesContext";

import type {
  AcademicReport,
  AssignmentReport,
  AttendanceReport,
  ClassPerformance,
  FeeReport,
  ReportSummary,
} from "../types/report";

export function useReports() {
  const [classFilter, setClassFilter] =
    useState("All classes");

  const [termFilter, setTermFilter] =
    useState("All terms");

  const [sessionFilter, setSessionFilter] =
    useState("All sessions");

  const { students } = useStudentsContext();
  const { attendanceRecords } =
    useAttendanceContext();
  const { results } = useResultsContext();
  const { fees } = useFeesContext();

  const { assignments, submissions } =
    useAssignmentsContext();

  const { classes } = useClassesContext();

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const matchesClass =
        classFilter === "All classes" ||
        result.classId === Number(classFilter);

      const matchesTerm =
        termFilter === "All terms" ||
        result.term === termFilter;

      const matchesSession =
        sessionFilter === "All sessions" ||
        result.academicSession ===
          sessionFilter;

      return (
        matchesClass &&
        matchesTerm &&
        matchesSession
      );
    });
  }, [
    results,
    classFilter,
    termFilter,
    sessionFilter,
  ]);

  const filteredFees = useMemo(() => {
    return fees.filter((fee) => {
      const matchesClass =
        classFilter === "All classes" ||
        fee.classId === Number(classFilter);

      const matchesTerm =
        termFilter === "All terms" ||
        fee.term === termFilter;

      const matchesSession =
        sessionFilter === "All sessions" ||
        fee.academicSession ===
          sessionFilter;

      return (
        matchesClass &&
        matchesTerm &&
        matchesSession
      );
    });
  }, [
    fees,
    classFilter,
    termFilter,
    sessionFilter,
  ]);

  const filteredAttendance = useMemo(() => {
    return attendanceRecords.filter(
      (record) =>
        classFilter === "All classes" ||
        record.classId === Number(classFilter)
    );
  }, [
    attendanceRecords,
    classFilter,
  ]);

  const filteredAssignments = useMemo(() => {
    return assignments.filter(
      (assignment) =>
        classFilter === "All classes" ||
        assignment.classId ===
          Number(classFilter)
    );
  }, [
    assignments,
    classFilter,
  ]);

  const filteredAssignmentIds = useMemo(
    () =>
      filteredAssignments.map(
        (assignment) => assignment.id
      ),
    [filteredAssignments]
  );

  const relevantSubmissions = useMemo(() => {
    return submissions.filter((submission) =>
      filteredAssignmentIds.includes(
        submission.assignmentId
      )
    );
  }, [
    submissions,
    filteredAssignmentIds,
  ]);

  const attendanceReport =
    useMemo<AttendanceReport>(() => {
      const present =
        filteredAttendance.filter(
          (record) =>
            record.status === "Present"
        ).length;

      const absent =
        filteredAttendance.filter(
          (record) =>
            record.status === "Absent"
        ).length;

      const late =
        filteredAttendance.filter(
          (record) => record.status === "Late"
        ).length;

      const excused =
        filteredAttendance.filter(
          (record) =>
            record.status === "Excused"
        ).length;

      const total = filteredAttendance.length;

      const attendanceRate =
        total > 0
          ? Math.round(
              ((present + late) / total) * 100
            )
          : 0;

      return {
        present,
        absent,
        late,
        excused,
        attendanceRate,
      };
    }, [filteredAttendance]);

  const academicReport =
    useMemo<AcademicReport>(() => {
      if (filteredResults.length === 0) {
        return {
          averageScore: 0,
          highestScore: 0,
          lowestScore: 0,
          totalResults: 0,
        };
      }

      const scores = filteredResults.map(
        (result) => result.totalScore
      );

      const averageScore = Math.round(
        scores.reduce(
          (total, score) => total + score,
          0
        ) / scores.length
      );

      return {
        averageScore,
        highestScore: Math.max(...scores),
        lowestScore: Math.min(...scores),
        totalResults: filteredResults.length,
      };
    }, [filteredResults]);

  const feeReport = useMemo<FeeReport>(() => {
    const expected = filteredFees.reduce(
      (total, fee) => total + fee.amountDue,
      0
    );

    const collected = filteredFees.reduce(
      (total, fee) => total + fee.amountPaid,
      0
    );

    const outstanding = filteredFees.reduce(
      (total, fee) => total + fee.balance,
      0
    );

    const collectionRate =
      expected > 0
        ? Math.round(
            (collected / expected) * 100
          )
        : 0;

    return {
      expected,
      collected,
      outstanding,
      collectionRate,
    };
  }, [filteredFees]);

  const assignmentReport =
    useMemo<AssignmentReport>(() => {
      const totalAssignments =
        filteredAssignments.length;

      const totalSubmissions =
        relevantSubmissions.length;

      const gradedSubmissions =
        relevantSubmissions.filter(
          (submission) =>
            submission.status === "Graded"
        ).length;

      const expectedSubmissions =
        filteredAssignments.reduce(
          (total, assignment) => {
            const schoolClass = classes.find(
              (item) =>
                item.id === assignment.classId
            );

            return (
              total +
              (schoolClass?.studentIds.length ??
                0)
            );
          },
          0
        );

      const completionRate =
        expectedSubmissions > 0
          ? Math.round(
              (totalSubmissions /
                expectedSubmissions) *
                100
            )
          : 0;

      return {
        totalAssignments,
        totalSubmissions,
        gradedSubmissions,
        completionRate,
      };
    }, [
      filteredAssignments,
      relevantSubmissions,
      classes,
    ]);

  const classPerformance =
    useMemo<ClassPerformance[]>(() => {
      const visibleClasses =
        classFilter === "All classes"
          ? classes
          : classes.filter(
              (schoolClass) =>
                schoolClass.id ===
                Number(classFilter)
            );

      return visibleClasses.map(
        (schoolClass) => {
          const classResults =
            filteredResults.filter(
              (result) =>
                result.classId ===
                schoolClass.id
            );

          const classAttendance =
            filteredAttendance.filter(
              (record) =>
                record.classId ===
                schoolClass.id
            );

          const averageScore =
            classResults.length > 0
              ? Math.round(
                  classResults.reduce(
                    (total, result) =>
                      total +
                      result.totalScore,
                    0
                  ) / classResults.length
                )
              : 0;

          const attended =
            classAttendance.filter(
              (record) =>
                record.status === "Present" ||
                record.status === "Late"
            ).length;

          const attendanceRate =
            classAttendance.length > 0
              ? Math.round(
                  (attended /
                    classAttendance.length) *
                    100
                )
              : 0;

          return {
            classId: schoolClass.id,
            averageScore,
            attendanceRate,
            studentCount:
              schoolClass.studentIds.length,
          };
        }
      );
    }, [
      classes,
      classFilter,
      filteredResults,
      filteredAttendance,
    ]);

  const selectedClass = classes.find(
    (schoolClass) =>
      schoolClass.id === Number(classFilter)
  );

  const summary: ReportSummary = {
    totalStudents:
      classFilter === "All classes"
        ? students.length
        : selectedClass?.studentIds.length ?? 0,

    attendanceRate:
      attendanceReport.attendanceRate,

    averageScore:
      academicReport.averageScore,

    totalFeesExpected:
      feeReport.expected,

    totalFeesCollected:
      feeReport.collected,

    totalFeesOutstanding:
      feeReport.outstanding,

    assignmentCompletionRate:
      assignmentReport.completionRate,
  };

  return {
    summary,
    attendanceReport,
    academicReport,
    feeReport,
    assignmentReport,
    classPerformance,

    classFilter,
    setClassFilter,

    termFilter,
    setTermFilter,

    sessionFilter,
    setSessionFilter,
  };
}