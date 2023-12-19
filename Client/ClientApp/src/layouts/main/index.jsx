import Header from "../../components/shared/header";

export default function MainLayout({ children })  {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container px-0 pt-4 max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    )
}