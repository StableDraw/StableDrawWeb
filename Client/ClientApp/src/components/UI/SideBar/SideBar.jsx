import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Setting from "./sidebar.utils/Setting";
import Language from "./sidebar.utils/Language";
import DarkMode from "./sidebar.utils/DarkMode";
import OpenSideBar from "./sidebar.utils/OpenSideBar";
import cl from "./SideBar.module.css"
import CloseSideBar from "./sidebar.utils/CloseSideBar";
const SideBar = (...props) => {
    const [active, setActive] = useState(cl.close)
    const createAction = (newActive) => {
        setActive(newActive)
    }
    const links = ([
        {url: "text-to-img", title: "Картинка по текстовому описанию", img: "text_to_image.png"},
        {url: null, title: "Картинка из рисунка (выбрано)", img: "image_to_image.png"},
        {url: "photo-to-img", title: "Обработка изображений с компьютера", img: "photo_to_image.png"},
        {url: "frames-to-animation", title: "Создание анимации", img: "frames_to_animation.png"}
    ])

    return (
        <div>
            <div className ={[cl.sidebar, cl.close, active].join(" ")}>
                <h1>StableDraw</h1>
                <CloseSideBar active={createAction}>&times;</CloseSideBar>
                <div className = {cl.mods_of_work}>

                    {links.map((link, id) =>
                        <Link key={id} to={link.url} className = {cl.work_mode_href} title={link.title} style={{ borderBottomStyle: "hidden" }}>
                            <img className={cl.img} alt={link.img} srcSet={link.img}></img>
                        </Link>
                    )}

                </div>
                <div className={cl.sidepanel_bottom_buttons}>
                    <Setting/>
                    <DarkMode/>
                    <Language/>
                </div>

                {/* Сделать передачу данных через callback() и вызывать через пропсы */}

                {/*<div className="helpfull_links" fontSize="2px" style={{ bottom: "8%" }}>*/}
                {/*    <NavLink className="helpfull_link" title="Профиль" style={{ width: "100%" }} tag={Link} to={profilePath}>*/}
                {/*        {userName}*/}
                {/*    </NavLink>*/}
                {/*    <NavLink className="helpfull_link" style={{ width: "30%", marginRight: "auto", marginLeft: "auto" }} replace tag={Link} to={logoutPath} state={logoutState}>*/}
                {/*        Выйти*/}
                {/*    </NavLink>*/}
                {/*</div>*/}

                {/* Конец */}

                <div className={cl.helpfull_links}>
                    <div className={cl.helpfull_link}>
                        <a href="#">
                            О нас
                        </a>
                    </div>
                    <div className={cl.helpfull_link}>
                        <a href="#">
                            Помощь
                        </a>
                    </div>
                </div>
            </div>
            <div className={[cl.blackout, cl.close, active].join(" ")} id="side_panel_blackout" style={{ zIndex: 20 }}></div>
            <OpenSideBar active={createAction} >&#9776;</OpenSideBar>
        </div>
    );
};

export default SideBar;