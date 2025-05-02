import { Link } from "react-router-dom";
import useProjectStore from "../../stores/projectStore";
import { useEffect } from "react";

export default function Home() {
  const { projects, fetchProjects, loading, error } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    // Skeleton loader with 6 placeholder cards
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Active Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded shadow animate-pulse"
            >
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full mb-4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Active Projects</h1>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            console.log(project);
            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="p-4 bg-white rounded shadow hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold">{project.name}</h2>
                <p className="text-gray-500">
                  {project.description || "No description"}
                </p>
                <div className="mt-2 text-sm text-gray-400">
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {new Date(project.endDate).toLocaleDateString()}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  );
}
