import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getTasks } from "../api/controllers/tasks";
import RippleLoader from "../ui/RippleLoader";
import AddTask from "../features/tasks/AddTask";
import { useState } from "react";
import { getDate } from "../util";
import TaskDetails from "../features/tasks/TaskDetails";
import { deleteTask as apiDeleteTask } from "../api/controllers/tasks";
import toast from "react-hot-toast";

// const loaderString = `<div class="loader-ripple loader-ripple--action"><div></div><div></div></div>`;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = (function () {
    const urlStatus = searchParams.get("status") || "";

    return ["pending", "in progress", "completed"].includes(urlStatus)
      ? urlStatus
      : undefined;
  })();

  const hasFilter = !!status;

  const {
    isPending: loading,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks", status],
    queryFn: () => getTasks(status),
  });

  const [showAddTask, setShowAddTask] = useState(false);
  const [taskDetails, setTaskDetails] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { isPending: deleting, mutate: deleteTask } = useMutation({
    mutationFn: apiDeleteTask,
    onSuccess() {
      toast.success("Task deleted successfully");
      queryClient.invalidateQueries({ type: "active" });
    },
    onError() {
      toast.error("Error deleting task");
    },
  });

  return (
    <>
      <AddTask open={showAddTask} closeHandler={() => setShowAddTask(false)} />
      {taskDetails && (
        <TaskDetails
          taskId={taskDetails}
          closeHandler={() => setTaskDetails(null)}
        />
      )}
      <main className="home">
        <div className="home__header">
          <h2 className="home__heading">My Tasks</h2>
          <div className="home__filter">
            <select
              className="input"
              value={status || ""}
              onChange={(e) =>
                setSearchParams(
                  function (sp) {
                    if (!e.target.value) sp.delete("status");

                    if (e.target.value) sp.set("status", e.target.value);

                    return sp;
                  },
                  { replace: true }
                )
              }
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="home__new-task">
            <button className="button" onClick={() => setShowAddTask(true)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8332 10.8334H10.8332V15.8334H9.1665V10.8334H4.1665V9.16675H9.1665V4.16675H10.8332V9.16675H15.8332V10.8334Z"
                  fill="currentColor"
                />
              </svg>{" "}
              New Task
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading && !tasks && (
                <tr>
                  <td colSpan={6}>
                    <div className="loading">
                      <RippleLoader /> Loading Your Tasks...
                    </div>
                  </td>
                </tr>
              )}
              {error && !tasks && (
                <tr>
                  <td colSpan={6}>
                    <div className="loading">
                      Error loading task. Reload to try again
                    </div>
                  </td>
                </tr>
              )}
              {tasks ? (
                tasks.length ? (
                  tasks.map((task) => (
                    <tr key={task._id}>
                      <td>
                        <h3 className="ttask__title">{task.title}</h3>
                      </td>
                      <td>
                        <span className="priority">
                          {task.priority.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span className="status">
                          {task.status.toUpperCase()}
                        </span>
                      </td>
                      <td>{getDate(task.startDate)}</td>
                      <td>{getDate(task.dueDate)}</td>
                      <td>
                        <div className="tasks-table__actions">
                          <button
                            onClick={function (e) {
                              if (deleting) return;

                              const confirmation = window.confirm(
                                "Are you sure you want to delete this task"
                              );

                              if (!confirmation) return;

                              const submitBtn = e.target! as HTMLButtonElement;

                              submitBtn.innerHTML = `Deleting...`;

                              deleteTask(task._id);
                            }}
                            disabled={deleting}
                          >
                            Delete
                          </button>
                          <button onClick={() => setTaskDetails(task._id)}>
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className="loading">
                        {hasFilter
                          ? "No tasks in current filter"
                          : "You have not added any task"}
                      </div>
                    </td>
                  </tr>
                )
              ) : null}
            </tbody>
          </table>
        </div>
        {/* <div className="tasks">
          <div className="task">
            <h3 className="task__title">Finish This Week Milestone</h3>
            <p className="task__description">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              incidunt cupiditate libero quos! Neque mollitia illum ea ex
              commodi, numquam iure tempora, natus in delectus rerum officiis
              incidunt, maiores quis.
            </p>
            <div>
              <div>
                <span>Start Date:</span> Fri Nov 22, 2024
              </div>
              <div>
                <span>Start Date:</span> Mon Nov 22, 2024
              </div>
            </div>
            <button>View Details</button>
          </div>
        </div> */}
      </main>
    </>
  );
}
