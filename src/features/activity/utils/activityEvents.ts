import type { ActivityLogData } from "./activityLogger";

type StudentActivityData = {
  name: string;
  className: string;
};

type TeacherActivityData = {
  name: string;
};

type ParentActivityData = {
  name: string;
  relationship: string;
};

type AccountActivityData = {
  name: string;
  role: string;
};

type AttendanceActivityData = {
  className: string;
  date: string;
  savedCount: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
};

type FeeActivityData = {
  studentId: number;
  feeType: string;
  amount: number;
};

export const activityEvents = {
  studentAdded(
    student: StudentActivityData
  ): ActivityLogData {
    return {
      title: "Student Added",
      description: `${student.name} was added to ${student.className}.`,
      category: "Student",
      actor: "System",
    };
  },

  studentUpdated(
    student: Pick<StudentActivityData, "name">
  ): ActivityLogData {
    return {
      title: "Student Updated",
      description: `${student.name}'s student record was updated.`,
      category: "Student",
      actor: "System",
    };
  },

  studentDeleted(
    student: Pick<StudentActivityData, "name">
  ): ActivityLogData {
    return {
      title: "Student Deleted",
      description: `${student.name} was removed from the student records.`,
      category: "Student",
      actor: "System",
    };
  },

  teacherAdded(
    teacher: TeacherActivityData
  ): ActivityLogData {
    return {
      title: "Teacher Added",
      description: `${teacher.name} was added as a teacher.`,
      category: "Teacher",
      actor: "System",
    };
  },

  teacherUpdated(
    teacher: TeacherActivityData
  ): ActivityLogData {
    return {
      title: "Teacher Updated",
      description: `${teacher.name}'s teacher profile was updated.`,
      category: "Teacher",
      actor: "System",
    };
  },

  teacherDeleted(
    teacher: TeacherActivityData
  ): ActivityLogData {
    return {
      title: "Teacher Deleted",
      description: `${teacher.name} was removed from the teachers list.`,
      category: "Teacher",
      actor: "System",
    };
  },

  parentAdded(
    parent: ParentActivityData
  ): ActivityLogData {
    return {
      title: "Parent Added",
      description: `${parent.name} was added as a ${parent.relationship.toLowerCase()}.`,
      category: "Parent",
      actor: "System",
    };
  },

  parentUpdated(
    parent: Pick<ParentActivityData, "name">
  ): ActivityLogData {
    return {
      title: "Parent Updated",
      description: `${parent.name}'s parent profile was updated.`,
      category: "Parent",
      actor: "System",
    };
  },

  parentDeleted(
    parent: Pick<ParentActivityData, "name">
  ): ActivityLogData {
    return {
      title: "Parent Deleted",
      description: `${parent.name} was removed from the parent records.`,
      category: "Parent",
      actor: "System",
    };
  },

  accountCreated(
    account: AccountActivityData
  ): ActivityLogData {
    return {
      title: "Account Created",
      description: `${account.name} (${account.role}) account was created.`,
      category: "Account",
      actor: "System",
    };
  },

  accountUpdated(
    account: Pick<AccountActivityData, "name">
  ): ActivityLogData {
    return {
      title: "Account Updated",
      description: `${account.name}'s account was updated.`,
      category: "Account",
      actor: "System",
    };
  },

  accountStatusChanged(
    account: Pick<AccountActivityData, "name">,
    status: "Active" | "Disabled"
  ): ActivityLogData {
    return {
      title:
        status === "Active"
          ? "Account Enabled"
          : "Account Disabled",

      description: `${account.name}'s account is now ${status.toLowerCase()}.`,

      category: "Account",
      actor: "System",
    };
  },

  accountPasswordReset(
    account: Pick<AccountActivityData, "name">
  ): ActivityLogData {
    return {
      title: "Password Reset",
      description: `Password was reset for ${account.name}.`,
      category: "Account",
      actor: "System",
    };
  },

  attendanceSaved(
  attendance: AttendanceActivityData
): ActivityLogData {
  return {
    title: "Attendance Saved",
    description: `Attendance for ${attendance.className} on ${attendance.date} was saved for ${attendance.savedCount} students: ${attendance.presentCount} present, ${attendance.absentCount} absent, ${attendance.lateCount} late and ${attendance.excusedCount} excused.`,
    category: "Attendance",
    actor: "System",
  };
},

feeAdded(
  fee: FeeActivityData
): ActivityLogData {
  return {
    title: "Fee Added",
    description: `${fee.feeType} fee was created for student #${fee.studentId}.`,
    category: "Fees",
    actor: "System",
  };
},

feeUpdated(
  fee: FeeActivityData
): ActivityLogData {
  return {
    title: "Fee Updated",
    description: `${fee.feeType} fee was updated for student #${fee.studentId}.`,
    category: "Fees",
    actor: "System",
  };
},

paymentRecorded(
  payment: FeeActivityData
): ActivityLogData {
  return {
    title: "Payment Recorded",
    description: `₦${payment.amount.toLocaleString()} payment was recorded for student #${payment.studentId}.`,
    category: "Fees",
    actor: "System",
  };
},

feeDeleted(
  fee: FeeActivityData
): ActivityLogData {
  return {
    title: "Fee Deleted",
    description: `${fee.feeType} fee was deleted for student #${fee.studentId}.`,
    category: "Fees",
    actor: "System",
  };
},

};
