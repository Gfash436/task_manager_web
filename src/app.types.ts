export type tUser = {
  _id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

export type tTask = {
  _id: string;
  priority: "high" | "medium" | "low";
  startDate: string;
  dueDate: string;
  title: string;
  description: string;
  status: "pending" | "in progress" | "completed";
  createdAt: string;
};

export type tTasks = tTask[];

export type tTaskEditableFields = {
  priority: "high" | "medium" | "low";
  startDate: string;
  dueDate: string;
  title: string;
  description: string;
};
