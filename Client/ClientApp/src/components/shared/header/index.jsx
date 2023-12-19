import Logo from "../logo";
import {useState} from "react";
import UserMenu from "./user-menu";

// PLACEHOLDER
const user = {
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaLq7GKHT7EtKlzZXiYeG9iy6np9A9Iq9YGdvk0Ak3fg&s",
    position: "Владелец"
}

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white shadow-md">
            <nav>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button onClick={toggleMobileMenu} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>

                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>

                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Logo />
                            </div>

                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a href="#" className="text-black rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200" aria-current="page">Главная</a>
                                </div>
                            </div>

                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="relative ml-3">
                                <UserMenu photo={user.photo} />
                            </div>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen &&
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <a href="#" className="text-black hover:bg-gray-200 block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Главная</a>
                    </div>
                }
            </nav>
        </header>
    );
}

