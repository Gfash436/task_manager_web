import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import cls from "classnames";

import { addTask } from "../../api/controllers/tasks";

import { tTaskEditableFields } from "../../app.types";

import TaskForm from "./TaskForm";

export default function AddTask({
  open,
  closeHandler,
}: {
  open: boolean;
  closeHandler: () => void;
}) {
  const [, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const { isPending: loading, mutate: createTask } = useMutation({
    mutationFn: addTask,
    onSuccess() {
      setSearchParams(
        function (sp) {
          sp.delete("status");

          return sp;
        },
        { replace: true }
      );

      queryClient.invalidateQueries({ type: "active" });

      closeHandler();

      toast.success("Task added successfully");
    },
  });

  function onSubmit(payload: tTaskEditableFields) {
    createTask(payload);
  }

  return createPortal(
    <>
      <div className={cls("modal", open && "open")}>
        <div className="modal__header">
          <h3 className="modal__heading">Add Task</h3>
          <button className="modal__close" onClick={closeHandler}>
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
        <TaskForm submitting={loading} onSubmit={onSubmit} />
      </div>
      <div
        className={cls("overlay", !open && "hidden")}
        onClick={closeHandler}
      ></div>
    </>,
    document.body
  );
}
