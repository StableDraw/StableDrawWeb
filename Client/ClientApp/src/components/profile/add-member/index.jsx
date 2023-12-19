import { FaPlus } from "react-icons/fa6";

export default function AddMember() {
    return (
        <button disabled className="flex items-center justify-center gap-x-2.5 px-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 disabled:bg-white disabled:text-gray-400">
            <FaPlus />
            Пригласить
        </button>
    )
}