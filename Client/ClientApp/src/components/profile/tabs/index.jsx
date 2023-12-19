import React, { useState } from 'react';

export function Tab ({ title, children, extra = null }) {
    return (
        <div>
            <div className="flex justify-between">

                <span className="text-2xl font-semibold">{title}</span>

                {extra && extra}
            </div>
            <hr className="my-2"/>
            {children}
        </div>
);
}

export function Tabs({ children }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        return () => setActiveTab(index);
    };

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-52">
                <div className="overflow-y-auto py-4 px-2 rounded">
                    <ul className="space-y-2">
                        {React.Children.map(children, (child, index) => (
                            <li>
                                <button onClick={handleTabClick(index)} className={`w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg ${activeTab === index ? "bg-gray-100" : "hover:bg-gray-100"} `}>
                                    {child.props.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Основной контент */}
            <div className="flex-1 px-3 lg:px-10 py-7">
                {React.Children.map(children, (child, index) =>
                    activeTab === index ? child : null
                )}
            </div>
        </div>
    );
}
