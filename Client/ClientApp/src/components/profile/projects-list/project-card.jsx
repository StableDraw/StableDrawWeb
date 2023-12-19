import TimeAgo from "../../shared/time-ago";

export default function ProjectCard ({ project }) {
    return (
        <div className="group relative">
            <div className="relative w-full overflow-hidden rounded-lg bg-white aspect-h-1 aspect-w-1 group-hover:opacity-75">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover object-center" />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href="#">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {project.title}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        <TimeAgo from={project.date} />
                    </p>
                </div>
            </div>
        </div>
    );
};