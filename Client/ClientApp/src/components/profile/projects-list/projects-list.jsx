import ProjectCard from "./project-card";

export default function ProjectsList({ projects }) {
    return (
        <>
            {projects && Array.isArray(projects) && projects.length > 0
                ?
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
                :
                <div className="text-center w-full py-10">
                    <span className="text-2xl text-gray-400">Пока что здесь нет проектов.</span>
                </div>
            }
        </>
    );
};