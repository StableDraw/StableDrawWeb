import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {ApplicationPaths} from "../../api-authorization/ApiAuthorizationConstants";

export default function UserMenu({ photo }) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    // Закрытие при клике вне меню
    const showBtnRef = useRef();
    const popupRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            // Если кликнули не по меню и не по кнопке открытия, закрываем
            if (popupRef.current && !popupRef.current.contains(event.target) && !showBtnRef.current.contains(event.target) ) {
                setIsUserMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <button ref={showBtnRef} onClick={toggleUserMenu} type="button" className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src={photo} />
            </button>

            {isUserMenuOpen &&
                <div ref={popupRef} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">Профиль</a>

                    <Link state={{ local: true }} to={`${ApplicationPaths.LogOut}`} className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500" role="menuitem" tabIndex="-1">Выход</Link>
                </div>
            }
        </>
    );
}