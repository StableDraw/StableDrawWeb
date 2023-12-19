import { FaTelegramPlane, FaVk } from 'react-icons/fa';

export default function MemberItem({ member }) {
    return (
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-shrink-0">
                <img className="w-16 h-16 rounded-full object-cover object-center" src={member.photo} alt={member.name} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {member.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {member.position}
                </p>
            </div>

            <ul className="inline-flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                {member.contacts.telegram && (
                    <li>
                        <a href={`https://t.me/${member.contacts.telegram}`} className="text-blue-500 hover:text-blue-600 flex items-center">
                            <FaTelegramPlane className="mr-2" />
                        </a>
                    </li>
                )}
                {member.contacts.vk && (
                    <li>
                        <a href={`https://vk.com/${member.contacts.vk}`} className="text-blue-500 hover:text-blue-600 flex items-center">
                            <FaVk className="mr-2" />
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
};