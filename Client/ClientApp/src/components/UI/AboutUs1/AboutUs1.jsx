import React, {useState} from 'react';
import cl from "./AboutUs1.module.css";
import { Link } from 'react-router-dom';
import {TeamObject1} from "./TeamObject1";
import {ImgLinkObject1} from "./ImgLinkObject1";
import PhotoSlider from "./PhotoSlider";

const sliderData = [
    {img: "./assets/images/Paccage1.png"},
    {img: "./assets/images/Paccage2.png"},
    {img: "./assets/images/Paccage3.png"},
    {img: "./assets/images/Paccage4.png"},
    {img: "./assets/images/Paccage5.png"},
    {img: "./assets/images/Paccage6.png"},
    {img:"./assets/images/package1.png"},
    {img:"./assets/images/package2.png"},
    {img:"./assets/images/package3.png"},
    {img:"./assets/images/package4.png"},
    {img:"./assets/images/package5.png"},
    {img:"./assets/images/package6.png"}
]

const imgLinks = [
    { id: 1, href: "https://vk.com/stabledraw", name: "VK", img: '/вк.svg' },
    { id: 2, href: "https://t.me/StableDraw", name: "Telegram", img: '/telegram.svg' },
    { id: 3, href: "https://vk.com/stabledraw", name: "Instagram", img: '/instagram.svg' }
]

const teams = [
    { id: 1, name: "Антон Богданов", description: "Руководитель проекта", img: './members/AntonBogdanov.png' },
    { id: 2, name: "Игорь Исаков", description: "Специалист по нейросетям", img: './members/IgorIsaakov.png' },
    { id: 3, name: "Никита Михайлов", description: "Бекенд-разработчик", img: './members/NikitaMihailov.png' },
    { id: 4, name: "Сергей Алексейчук", description: "Фронтенд-разработчик", img: './members/SergeyAlexseychuk.png' },
    { id: 5, name: "Вероника Данилова", description: "Маркетолог", img: './members/VeronikaDanikova.png' },
    { id: 6, name: "Павел Зырянов", description: "Бекенд-разработчик", img: './members/PavelZiranov.png' },
    { id: 7, name: "Артём Федченко", description: "Фронтенд-разработчик", img: './members/ArtemFedchenko.png' },
    { id: 8, name: "Владимир Ямщиков", description: "Фронтенд-разработчик", img: './members/VladimirIamshikov.png' },
    { id: 9, name: "Сулде Дастай-оол", description: "Бекенд-разработчик", img: './members/SuldeDastai.png' },
    { id: 10, name: "Лейла Толегенова", description: "Дизайнер", img: './members/LeilaToleganova.png' },
    { id: 11, name: "Татьяна Лебедева", description: "Дизайнер", img: './members/TatianaLebedeva.png' },
    { id: 12, name: "Дорогань Дмитрий", description: "3D художник", img: './members/DmitriDorogan.png' },
    { id: 13, name: "Андрей Зайцев", description: "Фронтенд-разработчик", img: './members/AndreyZaitsev.png' },
    { id: 14, name: "Вардуи Мазманян", description: "СММ-менеджер", img: './members/VardueMazmanan.png' },
    { id: 15, name: "Никита Аргунов", description: "Фронтенд-разработчик", img: './members/NikitaArgunov.png' },
    { id: 16, name: "Максим Семёнов", description: "Бекенд-разработчик", img: './members/MaksimSemenov.png' },
    { id: 17, name: "Лев Богданов", description: "Фронтенд-разработчик", img: './members/LevBogdanov.png' },
    { id: 18, name: "Антон Приваленко", description: "Data scientist", img: './members/AntonPrivalenko.png' },
    { id: 19, name: "Семён Савельев", description: "Специалист по нейросетям", img: './members/SemenSavelev.png' },
    { id: 20, name: "Татьяна Гражданкина", description: "Фронтенд-разработчик", img: './members/TatyanaGrajdankina.png' },
    { id: 21, name: "Данила Черненко", description: "Бекенд-разработчик", img: './members/DanilaChernenko.png' }
];
const AboutUs1 = () => {
    const [isHover, setIsHover] = useState(false);
    const [isRegHover, setRegIsHover] = useState(false);
    const [isEnterHover, setEnterIsHover] = useState(false);
    const handleMouseEnter = () => {
        setIsHover(true)
    }
    const handleMouseLeave = () => {
        setIsHover(false)
    }
    const handleMouseRegEnter = () => {
        setRegIsHover(true)
    }
    const handleMouseRegLeave = () => {
        setRegIsHover(false)
    }
    const handleMouseEnterEnter = () => {
        setEnterIsHover(true)
    }
    const handleMouseEnterLeave = () => {
        setEnterIsHover(false)
    }
    return (
        <div className={cl.background}>
            <div className={cl.background_image}>
                <header className={cl.header}>
                    <Link
                        className={cl.navka}
                        to="/"
                    >
                        <img
                            className={cl.logo}
                            src={"лого.png"}
                            alt={"logo"}
                        />
                    </Link>
                    <div className={cl.textLinks}>
                        <div className={cl.reg_text}>
                            <Link
                                to="/"
                                style={{
                                    color: isRegHover ? '#d5b8b8' : '#ffffff',
                                    cursor: "pointer"
                                }}
                                onMouseEnter={handleMouseRegEnter}
                                onMouseLeave={handleMouseRegLeave}
                            >
                            Регистрация
                            </Link>
                        </div>
                        <div className={cl.enter_text}>
                            <Link
                                to="/"
                                style={{
                                    color: isEnterHover ? '#d5b8b8' : '#ffffff',
                                    cursor: "pointer"
                                }}
                                onMouseEnter={handleMouseEnterEnter}
                                onMouseLeave={handleMouseEnterLeave}
                            >
                            Вход
                            </Link>
                        </div>
                    </div>
                </header>
                <div className={cl.mainpart}>
                    <div className={cl.photocontainer}>
                        <img
                            className={cl.Neural}
                            src={"Neural.png"}
                            alt={"Neural"}
                        />
                        <div className={cl.NeuralText}>
                            <div className={cl.neurontex}>
                                <p>Веб-платформа для рисования,</p>
                                <p>обработки изображений</p>
                                <p>и создания анимаций</p>
                                <p>с применением искусственных</p>
                                <p>нейронных сетей.</p>
                            </div>
                        </div>
                    </div>
                    <div className={cl.float_container}>
                        <div className={cl.maintex}>
                            <p>STABLE DRAW</p>
                        </div>
                        <div className={cl.hrLine}></div>
                    </div>
                    <div className={cl.float_container1}>
                        <div className={cl.what}></div>
                        <div className={cl.float_container1_Text}>
                            <p>Технологии <span>служат</span> искусству</p>
                            <p>и <span>помогают</span> людям являть</p>
                            <p>миру своё видение.</p>
                        </div>
                    </div>
                    <div className={cl.photoGroup}>
                        <div className={cl.vanGoghBlock}>
                            <img
                                className={cl.vanGogh1}
                                src={"VanGogh.png"}
                                alt={"VanGogh"}
                            />
                            <img
                                className={cl.vanGogh1}
                                src={"VanGogh1.png"}
                                alt={"VanGogh1"}
                            />
                        </div>
                        <div className={cl.technoprom}>
                            <img
                                className={cl.tech1}
                                src={"Technoprom.png"}
                                alt={"Technoprom"}
                            />
                            <img
                                className={cl.tech2}
                                src={"Technoprom1.png"}
                                alt={"Technoprom1"}
                            />
                        </div>
                        <div className={cl.technopromText}>
                            <p>Сибирская Венчурная Ярмарка</p>
                        </div>
                    </div>

                    <div className={cl.threeDtext}>
                        3D модуль
                    </div>
                    {/* <div className={cl.paginationBlock}>
                        <div className={cl.hrLine1}></div>
                        <PhotoSlider data={sliderData}/>
                        <div className={cl.hrLine2}></div>
                    </div> */}
                    <div className={cl.newtex}>
                        <p>Веб-платформа для рисования, обработки
                            изображений и создания анимаций с
                            применением искусственных нейронных сетей.</p>
                    </div>
                    <div className={cl.section}>
                        <img
                            className={cl.show}
                            src={"Showcase.png"}
                            alt={"Showcase"}
                        />
                        <div className={cl.showtex}>
                            <p>Веб-платформа для</p>
                            <p>рисования, обработки</p>
                            <p>изображений и</p>
                            <p>создания анимаций с</p>
                            <p>применением</p>
                            <p>искусственных</p>
                            <p>нейронных сетей.</p>
                        </div>
                        <img
                            className={cl.busket}
                            src={"Busket.png"}
                            alt={"Busket"}
                        />
                    </div>
                    <div className={cl.ourCompanies}>
                        Наши партнёры
                    </div>
                    <div className={cl.companiesBlock}>
                        <div className={cl.LambumizBlock}>
                            <img
                                className={cl.LambumizImg }
                                src={"Lambumiz.png"}
                                alt={"Lambumiz"}
                            />
                            <div className={cl.LambumizText}>
                                <p>Ламбумиз</p>
                            </div>
                        </div>
                        <img
                            className={cl.NSTU}
                            src={"NGTU.png"}
                            alt={"NGTU"}
                        />
                        <div className={cl.AniLibriaBlock}>
                            <img
                                className={cl.LambumizImg }
                                src={"AniLibria.png"}
                                alt={"AniLibria"}
                            />
                            <div className={cl.LambumizText}>
                                <p>AniLibria</p>
                            </div>
                        </div>
                        <div className={cl.DevoidBlock}>
                            <div className={cl.DevoidText}>
                                <span>DEVOID</span>
                                <div>Devoid diffusion</div>
                            </div>
                        </div>
                    </div>
                    <div className={cl.teamtext}>
                        Наша команда
                    </div>
                    <div className={cl.ourTeam}>
                        {teams.map(team=><TeamObject1
                                name={team.name}
                                description={team.description}
                                key={team.id}
                                img={team.img}
                            />
                        )}
                    </div>
                </div>
                <footer className={cl.footer}>
                    <div className={cl.section1}>
                        <div className={cl.footer_section1}>
                            <Link
                                to="/"
                            >
                                <img
                                    className={cl.logo}
                                    src={"лого.png"}
                                    alt={"logo"}
                                />
                            </Link>
                            <div className={cl.email}>
                                <a href={'support@stabledraw.com'}>
                                    support@stabledraw.com
                                </a>
                            </div>
                        </div>
                        <div className={cl.footer_section1_text}>
                            ООО "Стейбл Дроу", 630112, г. Новосибирск, ул. Гоголя, д. 192, кв. 71
                        </div>
                    </div>
                    <div className={cl.socialBlock}>
                        {imgLinks.map(imgLink=><ImgLinkObject1
                                href={imgLink.href}
                                name={imgLink.name}
                                img={imgLink.img}
                                key={imgLink.id}
                            />
                        )}
                    </div>
                    <div className={cl.footer_section2}>
                        <div className={cl.toptex}>
                            <p>Пользовательское соглашение</p>
                        </div>
                        <div className={cl.downtex}>
                            <p>Политика оплаты и возврата</p>
                        </div>
                        <div className={cl.menuText}>
                            <div className={cl.Tex1}>Помощь</div>
                            <div className={cl.Tex2}>
                                <Link
                                    to="/AboutUs1"
                                    style={{color: isHover ? '#d5b8b8' : '#ffffff', cursor: "pointer"}}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    О нас
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AboutUs1;