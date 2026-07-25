export type ParentStatus = "Active" | "Inactive";

export type ParentRelationship =
  | "Father"
  | "Mother"
  | "Guardian";

export type Parent = {
  id: number;
  name: string;
  relationship: ParentRelationship;
  phone: string;
  alternatePhone: string;
  email: string;
  address: string;
  occupation: string;
  studentIds: number[];
  status: ParentStatus;
};

export type ParentFormData = Omit<Parent, "id">;