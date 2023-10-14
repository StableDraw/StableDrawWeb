import React, {useState} from 'react';
import cl from "./AboutUs.module.css";
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PhotoSlider from "./PhotoSlider";
import Package1 from "./assets/images/package1.png";
import Package2 from "./assets/images/package2.png";
import Package3 from "./assets/images/package3.png";
import Package4 from "./assets/images/package4.png";
import Package5 from "./assets/images/package5.png";
import Package6 from "./assets/images/package6.png";

const sliderData = [{img: Package1},{img: Package2},{img: Package3},{img: Package4},{img: Package5},{img: Package6}]
const AboutUs = () => {
    const [click, setClick] = useState(false)
    const Try1 = () =>{
        setClick(true)
    }
    const Try2 = () =>{
        setClick(false)
    }
    return (
        <div className={cl.background}>
            <div className={cl.background_image}>
                <header className={cl.header}>
                    <NavLink
                        className={cl.navka}
                        tag={Link}
                        to="/startpage"
                    >
                        <img
                            className={cl.logo}
                            src={"лого.png"}
                            alt={"logo"}
                        />
                    </NavLink>
                    <div
                        className={cl.dropdown}
                        onMouseEnter={Try1}
                    >
                        <svg
                            className={cl.burger_menu}
                            xmlns="http://www.w3.org/2000/svg"
                            width="44"
                            height="24"
                            viewBox="0 0 44 24"
                        >
                            <path
                                className={cl.line}
                                d="M4 18L20 18"
                                stroke-width="3"
                                stroke-linecap="round"
                            />
                            <path
                                className={cl.line}
                                d="M4 12L20 12"
                                stroke-width="3"
                                stroke-linecap="round"
                            />
                            <path
                                className={cl.line}
                                d="M4 6L20 6"
                                stroke-width="3"
                                stroke-linecap="round"
                            />
                        </svg>
                        {click && <div className={cl.dropdown_content}>
                            <div className={cl.cross}>
                                <button
                                    className={cl.crossBtn}
                                    onClick={Try2}
                                >
                                </button>
                            </div>
                            <a href="#">Аккаунт
                                <img
                                    className={cl.acc}
                                    src={"Account.svg"}
                                    alt={"Account"}
                                />
                            </a>
                            <hr className={cl.brLine}></hr>
                            <NavLink
                                className={cl.link}
                                tag={Link}
                                to="/AboutUs"
                            >
                                О нас
                            </NavLink>
                            <hr className={cl.brLine}></hr>
                            <a href="#">
                                Помощь
                            </a>
                        </div>}
                    </div>
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
                        <div className={cl.hrLine}></div>
                    </div>
                    <div className={cl.photoGroup}>
                        <img className={cl.cat} src={"RidingCat.png"} alt={"RidingCat"}/>
                        <div className={cl.neuroninfo}>
                            <div className={cl.block}>
                                <img className={cl.gen} src={"GenerateModuleImg.png"} alt={"GenerateModuleImg"}/>
                                <img className={cl.water} src={"Waterfall.png"} alt={"Waterfall"}/>
                            </div>
                            <div className={cl.neurontex}>
                                <p>Веб-платформа для рисования, обработки изображений и создания анимаций с применением искусственных нейронных сетей.</p>
                            </div>
                        </div>
                    </div>
                    <div className={cl.threeDtext}>
                        <p>3D модуль</p>
                    </div>
                    <div className={cl.paginationBlock}>
                        <div className={cl.hrLine1}></div>
                        <PhotoSlider data={sliderData}/>
                        <div className={cl.hrLine2}></div>
                    </div>
                    <div className={cl.newtex}>
                        <p>Веб-платформа для рисования, обработки
                        изображений и создания анимаций с
                        применением искусственных нейронных сетей.</p>
                    </div>
                    <div className={cl.section}>
                        <img className={cl.show} src={"Showcase.png"} alt={"Showcase"}/>
                        <div className={cl.showtex}>
                            <p>Веб-платформа для рисования, обработки изображений и создания анимаций с применением искусственных нейронных сетей.</p>
                        </div>
                        <div className={cl.contr}>
                            <div className={cl.showtex1}>
                                <p>Веб-платформа для рисования, обработки изображений и создания анимаций с применением искусственных нейронных сетей.</p>
                            </div>
                            <img className={cl.busket} src={"Busket.png"} alt={"Busket"}/>
                        </div>
                    </div>
                    <div className={cl.teamtext}>
                        <p>Наша команда</p>
                    </div>
                    <div className={cl.ourTeam}>
                        <div className={cl.object}>
                            <img className={cl.imge} src={"adding.png"}
                                 alt={"adding"} />
                            <div className={cl.texte}>
                                <div className={cl.name}>
                                    Антон Богданов
                                </div>
                                <div className={cl.description}>
                                    Основатель проекта
                                </div>
                            </div>
                        </div>
                        <div className={cl.object}>
                            <img className={cl.imge} src={"adding.png"}
                                 alt={"adding"} />
                            <div className={cl.texte}>
                                <div className={cl.name}>
                                    Антон Богданов
                                </div>
                                <div className={cl.description}>
                                    Дизайнер
                                </div>
                            </div>
                        </div>
                        <div className={cl.object}>
                            <img className={cl.imge} src={"adding.png"}
                                 alt={"adding"} />
                            <div className={cl.texte}>
                                <div className={cl.name}>
                                    Антон Богданов
                                </div>
                                <div className={cl.description}>
                                    Ведущий разработчик
                                </div>
                            </div>
                        </div>
                        <div className={cl.object}>
                            <img className={cl.imge} src={"adding.png"}
                                 alt={"adding"} />
                            <div className={cl.texte}>
                                <div className={cl.name}>
                                    Антон Богданов
                                </div>
                                <div className={cl.description}>
                                    Фронтенд-разработчик
                                </div>
                            </div>
                        </div>
                        <div className={cl.object}>
                            <img className={cl.imge} src={"adding.png"}
                                 alt={"adding"} />
                            <div className={cl.texte}>
                                <div className={cl.name}>
                                    Антон Богданов
                                </div>
                                <div className={cl.description}>
                                    Бекенд-разработчик
                                </div>
                            </div>
                        </div>
                        <div className={cl.object}>
                            <img className={cl.imge} src={"adding.png"}
                                 alt={"adding"} />
                            <div className={cl.texte}>
                                <div className={cl.name}>
                                    Антон Богданов
                                </div>
                                <div className={cl.description}>
                                    Верстальщик
                                </div>
                            </div>
                        </div>
                        <div className={cl.object}>
                            <img className={cl.imge} src={"adding.png"}
                                 alt={"adding"} />
                            <div className={cl.texte}>
                                <div className={cl.name}>
                                    Антон Богданов
                                </div>
                                <div className={cl.description}>
                                    CEO маркетолог
                                </div>
                            </div>
                        </div>
                        <div className={cl.object}>
                            <img className={cl.imge} src={"adding.png"}
                                 alt={"adding"} />
                            <div className={cl.texte}>
                                <div className={cl.name}>
                                    Антон Богданов
                                </div>
                                <div className={cl.description}>
                                    Фуллстек-разработчик
                                </div>
                            </div>
                        </div>
                        <div className={cl.object}>
                            <img className={cl.imge} src={"adding.png"}
                                 alt={"adding"} />
                            <div className={cl.texte}>
                                <div className={cl.name}>
                                    Антон Богданов
                                </div>
                                <div className={cl.description}>
                                    Руководитель
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className={cl.footer}>
                    <div className={cl.section1}>
                        <div className={cl.footer_section1}>
                            <img className={cl.logo} src={"лого.png"} alt={"logo"}/>
                            <div className={cl.email}>
                                <a href={'support@stabledraw.com'}>support@stabledraw.com</a>
                            </div>
                        </div>
                        <div className={cl.footer_section1_text}>
                            ООО "Стейбл Дроу", 630112, г. Новосибирск, ул. Гоголя, д. 192, кв. 71
                        </div>
                    </div>
                    <div className={cl.socialBlock}>
                        <a
                            className={cl.img_link}
                            href="https://vk.com/stabledraw"
                        >
                            <img
                                className={cl.img}
                                alt={"вк.svg"}
                                src={"вк.svg"}
                            >
                            </img>
                        </a>
                        <a
                            className={cl.img_link}
                            href="https://t.me/StableDraw"
                        >
                            <img
                                className={cl.img}
                                alt={"telegram.svg"}
                                src={"telegram.svg"}
                            >
                            </img>
                        </a>
                        <a
                            className={cl.img_link}
                            href="https://vk.com/stabledraw"
                        >
                            <img
                                className={cl.img}
                                alt={"instagram.svg"}
                                src={"instagram.svg"}
                            >
                            </img>
                        </a>
                    </div>
                    <div className={cl.footer_section2}>
                        <div className={cl.toptex}>
                            <p>Пользовательское соглашение</p>
                        </div>
                        <div className={cl.downtex}>
                            <p>Политика оплаты и возврата</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AboutUs;