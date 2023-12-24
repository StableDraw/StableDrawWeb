import React, { useState } from 'react';
import cl from "./AboutUsOurTeam.module.css";
import { TeamObject1 } from "../TeamObject1";

const AboutUsOurTeam = () => {
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
    return(
        <div className={`${cl.ourTeam} ${cl.flexBox}`}>
            <h2>
                Наша команда
            </h2>
            <div className={`${cl.listOurTeam} ${cl.flexBox}`}>
                {teams.map(team => <TeamObject1
                    name={team.name}
                    description={team.description}
                    key={team.id}
                    img={team.img}
                />
                )}
            </div>
            <div className={cl.infoOurTeamText}>
                <p>Свидетельство о государственной регистрации программы для ЭВМ № 2023662897, автор: Богданов Антон Аркадьевич, дата государственной регистрации в Реестре программ для ЭВМ: 16 июня 2023 г.</p>
            </div>
        </div>
    );
};

export default AboutUsOurTeam;