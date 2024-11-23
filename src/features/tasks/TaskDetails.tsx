import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  getTask,
  updateTask as apiUpdateTask,
} from "../../api/controllers/tasks";
import toast from "react-hot-toast";
import PageRipple from "../../ui/PageRipple";
import cls from "classnames";
import { getDate, getInputDate } from "../../util";
import TaskForm from "./TaskForm";
import { tTaskEditableFields } from "../../app.types";

export default function TaskDetails({
  taskId,
  closeHandler,
}: {
  taskId: string;
  closeHandler: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    isPending: loading,
    data: task,
    error,
  } = useQuery({ queryKey: ["task", taskId], queryFn: () => getTask(taskId) });

  const [view, setView] = useState<"details" | "edit">("details");

  const queryClient = useQueryClient();

  const { isPending: updating, mutate: updateTask } = useMutation({
    mutationFn: (task: tTaskEditableFields) => apiUpdateTask(taskId, task),
    onSuccess() {
      queryClient.invalidateQueries({ type: "active" });

      setView("details");

      toast.success("Task updated successfully");
    },
    onError() {
      toast.error("Error deleting task");
    },
  });

  function onUpdateTask(payload: tTaskEditableFields) {
    updateTask(payload);
  }

  function handleCloseModal() {
    setOpen(false);

    window.setTimeout(function () {
      closeHandler();
    }, 400);
  }

  // Prevent Body Overflow on Open
  // useNoOverflow(open);

  useEffect(
    function () {
      if (loading || !task) return;

      setOpen(true);
    },
    [loading, task]
  );

  useEffect(
    function () {
      if (loading || !error) return;

      toast.error("Error fetching task details");
      closeHandler();
    },
    [loading, error, closeHandler]
  );

  return createPortal(
    <>
      {loading && !task && <PageRipple />}
      <div className={cls("modal", open && "open")}>
        <div className="modal__header">
          <h3 className="modal__heading">Task Details</h3>

          {task ? (
            <button
              className="button button--sm"
              onClick={() =>
                setView((vw) => (vw === "edit" ? "details" : "edit"))
              }
            >
              {view === "details" ? "Edit" : "View Details"}
            </button>
          ) : null}
          <button className="modal__close" onClick={handleCloseModal}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#1F1F1F"
              />
            </svg>
          </button>
        </div>
        {task ? (
          <>
            {view === "details" ? (
              <div className="modal__body">
                <div className="task-info">
                  <p className="task-info__label">Title</p>
                  <h3 className="task-info__title">{task.title}</h3>
                </div>
                <div className="task-info">
                  <p className="task-info__label">Description</p>
                  <p className="task-info__desc">{task.description}</p>
                </div>
                <div className="task-info">
                  <p className="task-info__label">Start Date</p>
                  <p className="task-info__date">{getDate(task.startDate)}</p>
                </div>
                <div className="task-info">
                  <p className="task-info__label">Dur Date</p>
                  <p className="task-info__date">{getDate(task.dueDate)}</p>
                </div>
                <div className="task-info">
                  <p className="task-info__label">Priority</p>
                  <div>
                    <span className="priority">
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="task-info">
                  <p className="task-info__label">Status</p>
                  <div>
                    <span className="status">{task.status.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <TaskForm
                submitting={updating}
                onSubmit={onUpdateTask}
                defaultValues={{
                  ...task,
                  startDate: getInputDate(task.startDate),
                  dueDate: getInputDate(task.dueDate),
                }}
              />
            )}
          </>
        ) : null}
      </div>
      <div
        className={cls("overlay", !open && "hidden")}
        onClick={handleCloseModal}
      ></div>
    </>,
    document.body
  );
}
