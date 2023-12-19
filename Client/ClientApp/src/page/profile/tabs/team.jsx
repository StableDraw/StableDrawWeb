import MembersList from "../../../components/profile/members-list/members-list";

// PLACEHOLDER
const teamMembers = [
    {
        id: 1,
        name: 'Иван Иванов',
        position: 'Разработчик',
        photo: 'https://yt3.googleusercontent.com/ytc/AIf8zZRKWtfS9EmKT96JGBh745BtyAoplTC-k6TIaIdVWg=s900-c-k-c0x00ffffff-no-rj', // Замените на путь к фотографии
        contacts: {
            telegram: 'ivanov',
            vk: 'id1'
        }
    },
    {
        id: 2,
        name: 'Иван Иванов',
        position: 'Разработчик',
        photo: 'https://img.gazeta.ru/files3/142/14995142/59c54411-4c87-40ab-9fd6-65ef1cea-pic_32ratio_1200x800-1200x800-33845.jpg', // Замените на путь к фотографии
        contacts: {
            telegram: 'ivanov',
            vk: 'id1'
        }
    },
    {
        id: 3,
        name: 'Иван Иванов',
        position: 'Разработчик',
        photo: 'https://www.film.ru/sites/default/files/filefield_paths/goslingnntb_feat.jpg', // Замените на путь к фотографии
        contacts: {
            telegram: 'ivanov',
            vk: 'id1'
        }
    },
    {
        id: 4,
        name: 'Иван Иванов',
        position: 'Разработчик',
        photo: 'https://avatars.dzeninfra.ru/get-zen_doc/1585599/pub_6106aad66e5fea7817dd9589_61081a196b8d065057d8984a/scale_1200', // Замените на путь к фотографии
        contacts: {
            telegram: 'ivanov',
            vk: 'id1'
        }
    },
];
export default function TeamPage() {
    return <MembersList members={[]} />;

}