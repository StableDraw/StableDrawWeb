import React from 'react';
import cl from "./AboutUs.module.css";
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
const AboutUs = () => {
    return (
        <div className={cl.background}>
            <header className={cl.header}>
                <NavLink className={cl.navka} tag={Link} to="/home">
                    <img className={cl.logo} src={"лого.png"} alt={"logo"}/>
                </NavLink>
                <svg className={cl.burger_menu} xmlns="http://www.w3.org/2000/svg" width="44" height="24" viewBox="0 0 44 24" fill="none">
                    <path d="M4 18L20 18" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                    <path d="M4 12L20 12" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                    <path d="M4 6L20 6" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </header>
            <div className={cl.mainpart}>
                <div className={cl.photocontainer}>

                </div>
                <div className={cl.textcontainer}>
                    <div className={cl.maintex}>
                        <p>STABLE DRAW</p>
                    </div>
                    <div className={cl.contexttex}>
                        <p>Технологии <span>служат</span> искусству и <span>помогают</span> людям являть миру свое видение.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;