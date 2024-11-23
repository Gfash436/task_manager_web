import { AxiosError } from "axios";
import { tTask, tTaskEditableFields, tTasks } from "../../app.types";
import apiClient from "../client";

export async function getTasks(status?: string): Promise<tTasks> {
  try {
    const res = await apiClient({
      method: "GET",
      url: `/tasks${status ? `?status=${status}` : ""}`,
    });

    return res.data.tasks;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response ? err.response.data.message : err.message);
  }
}

export async function getTask(taskId: string): Promise<tTask> {
  try {
    const res = await apiClient({
      method: "GET",
      url: `/tasks/${taskId}`,
    });

    return res.data.task;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response ? err.response.data.message : err.message);
  }
}

export async function addTask(
  payload: tTaskEditableFields
): Promise<{ message: string }> {
  try {
    const res = await apiClient({
      method: "POST",
      url: `/tasks`,
      data: payload,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response ? err.response.data.message : err.message);
  }
}

export async function updateTask(
  taskId: string,
  payload: tTaskEditableFields
): Promise<{ message: string }> {
  try {
    const res = await apiClient({
      method: "PUT",
      url: `/tasks/${taskId}`,
      data: payload,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response ? err.response.data.message : err.message);
  }
}

export async function deleteTask(taskId: string) {
  try {
    const res = await apiClient({
      method: "DELETE",
      url: `/tasks/${taskId}`,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response ? err.response.data.message : err.message);
  }
}
