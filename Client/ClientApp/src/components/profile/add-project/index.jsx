import { FaPlus } from "react-icons/fa6";
import {Link} from "react-router-dom";

export default function AddProject() {
    return (
        <Link to="/drawing-to-img" tag="button" className="flex items-center justify-center gap-x-2.5 px-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
            <FaPlus />
            Добавить
        </Link>
    )
}