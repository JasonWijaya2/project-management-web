import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useProjectStore from "../../stores/projectStore";
import useTaskStore from "../../stores/taskStore";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaClipboardList,
} from "react-icons/fa";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const { projectDetail, fetchProjectDetail, loading, error } =
    useProjectStore();
  const { tasks, fetchTasksByProject, loadingTasks, taskError } =
    useTaskStore();
  const [sortBy, setSortBy] = useState("startDate");

  useEffect(() => {
    if (projectId) {
      fetchProjectDetail(projectId);
      fetchTasksByProject(projectId);
    }
  }, [projectId, fetchProjectDetail, fetchTasksByProject]);

  const sortedTasks = useMemo(() => {
    const sorted = [...tasks];

    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const statusOrder = { todo: 0, in_progress: 1, done: 2 };

    sorted.sort((a, b) => {
      if (sortBy === "startDate" || sortBy === "endDate") {
        return new Date(a[sortBy]) - new Date(b[sortBy]);
      }
      if (sortBy === "taskName") {
        return a.taskName?.localeCompare(b.taskName);
      }
      if (sortBy === "priority") {
        return (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99);
      }
      if (sortBy === "status") {
        return (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
      }
      return 0;
    });

    return sorted;
  }, [tasks, sortBy]);


  if (loading) {
    // Skeleton for project detail
    return (
      <div className="p-6 bg-white rounded shadow space-y-4 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    );
  }

  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!projectDetail) return <div className="p-6">No project found.</div>;

  return (
    <div className="p-6 bg-white rounded shadow space-y-8">
      {/* Project Info */}
      <div>
        <h1 className="text-2xl font-bold mb-4">{projectDetail.name}</h1>

        <div className="text-gray-600 mb-2">
          <strong>Status:</strong> {projectDetail.status}
        </div>

        <div className="text-gray-600 mb-2">
          <strong>Duration:</strong>{" "}
          {new Date(projectDetail.startDate).toLocaleDateString()} -{" "}
          {new Date(projectDetail.endDate).toLocaleDateString()}
        </div>

        {projectDetail.description && (
          <div className="text-gray-600 mb-2">
            <strong>Description:</strong> {projectDetail.description}
          </div>
        )}

        <div className="text-gray-600">
          <strong>Created by:</strong>{" "}
          {projectDetail.createdBy?.name || "Unknown"}
        </div>
      </div>

      {/* Task List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Tasks</h2>

        <div className="mb-4">
          <label className="mr-2 font-semibold">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="startDate">Start Date</option>
            <option value="endDate">End Date</option>
            <option value="taskName">Task Name</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>

        {loadingTasks ? (
          // Skeleton for task list
          <div className="space-y-4 animate-pulse">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="p-4 border rounded shadow-sm bg-gray-100 space-y-2"
              >
                <div className="h-4 bg-gray-300 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : taskError ? (
          <p className="text-red-500">Error: {taskError}</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <div className="space-y-4">
            {sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded shadow-sm bg-gray-50 ${task.priority === "high"
                  ? "bg-red-100"
                  : task.priority === "medium"
                    ? "bg-yellow-100"
                    : task.priority === "low"
                      ? "bg-green-100"
                      : ""
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{task.taskName}</h3>
                    <p className="text-gray-500 text-sm">
                      {task.description || "No description"}
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Status:</strong> {task.status} |{" "}
                      <strong>Priority:</strong> {task.priority}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(task.startDate).toLocaleDateString()} -{" "}
                      {new Date(task.endDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Icon berdasarkan status */}
                  <div className="ml-4 mt-1">
                    {task.status === "done" && (
                      <FaCheckCircle className="text-green-500 text-3xl" />
                    )}
                    {task.status === "in_progress" && (
                      <FaHourglassHalf className="text-yellow-500 text-3xl" />
                    )}
                    {task.status === "todo" && (
                      <FaClipboardList className="text-gray-400 text-3xl" />
                    )}
                  </div>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
}
