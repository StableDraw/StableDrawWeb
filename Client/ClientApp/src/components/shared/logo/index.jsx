import {Link} from "react-router-dom";
import LogoIcon from "../logo-icon";

export default function Logo() {
    return (
        <Link className="flex items-center" to='/'>
            <LogoIcon size={40} />
            <span className="hidden sm:block self-center font-semibold whitespace-nowrap ml-3 text-xl hover:text-black dark:text-white">Stable Draw</span>
        </Link>
    )
}