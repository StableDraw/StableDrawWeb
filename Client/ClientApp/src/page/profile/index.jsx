import {Tab, Tabs} from "../../components/profile/tabs";
import UserPanel from "../../components/profile/user-panel";
import MainLayout from "../../layouts/main";
import ProjectsPage from "./tabs/projects";
import TeamPage from "./tabs/team";
import {useEffect, useState} from "react";
import api from "../../api/ApiToken";
import AddMember from "../../components/profile/add-member";
import AddProject from "../../components/profile/add-project";

// PLACEHOLDER
const user = {
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaLq7GKHT7EtKlzZXiYeG9iy6np9A9Iq9YGdvk0Ak3fg&s",
    position: "Владелец"
}

export default function ProfilePage()  {
    const [username, setUsername] = useState('');

    // TODO: Поменять, когда будет рефракторинг API
    useEffect(() => {
        api.getUserName().then((user) => {
            if (user)
                setUsername(user);
        })
    }, []);

    return (
        <MainLayout>
            <UserPanel username={username} position={user.position} photo={user.photo} />

            <Tabs>
                <Tab title="Проекты" extra={<AddProject />}><ProjectsPage /></Tab>
                <Tab title="Команда" extra={<AddMember />}><TeamPage /></Tab>
            </Tabs>
        </MainLayout>
    )
}