import {subDays} from "date-fns";
import ProjectsList from "../../../components/profile/projects-list/projects-list";
import ProjectsSearch from "../../../components/profile/projects-search";

// PLACEHOLDER
const projects = [
    {
        id: 1,
        title: "Проект Альфа",
        image: "https://via.placeholder.com/150",
        date: new Date(),
    },
    {
        id: 2,
        title: "Проект Бета",
        image: "https://via.placeholder.com/150",
        date: subDays(new Date(), 1), // Вчера
    },
    {
        id: 3,
        title: "Проект Гамма",
        image: "https://via.placeholder.com/150",
        date: subDays(new Date(), 7), // Неделю назад
    },
    {
        id: 4,
        title: "Проект Гамма",
        image: "https://via.placeholder.com/150",
        date: subDays(new Date(), 7), // Неделю назад
    },
    {
        id: 5,
        title: "Проект Гамма",
        image: "https://via.placeholder.com/150",
        date: subDays(new Date(), 26), // Неделю назад
    },
    {
        id: 6,
        title: "Проект Гамма",
        image: "https://via.placeholder.com/150",
        date: subDays(new Date(), 30), // Неделю назад
    },
    {
        id: 7,
        title: "Проект Гамма",
        image: "https://via.placeholder.com/150",
        date: subDays(new Date(), 14), // Неделю назад
    }
    // ...другие проекты
];

export default function ProjectsPage() {
    return (
        <>
            <div className="pt-2">
                <ProjectsSearch onSearch={(v) => console.log(v)} />
            </div>
            <ProjectsList projects={[]} />
        </>
    )
}