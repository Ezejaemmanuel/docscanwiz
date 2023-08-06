"use client";
const MainArea: React.FC<{ activeTab: string }> = ({ activeTab }) => {
    return (
        <main className="flex flex-col justify-center items-center w-4/5 pt-40">
            {activeTab === "home" && (
                <div>
                    <h1 className="text-3xl mb-4">Welcome to the Dashboard</h1>
                    <p>Introduction text here...</p>
                </div>
            )}
            {activeTab === "upload" && (
                <div>
                    <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mb-4">
                        <span>Add files</span>
                    </button>
                    <p>Supported file types and icons here...</p>
                </div>
            )}
            {activeTab === "history" && (
                <div>
                    <table className="w-full">
                        {/* Table content here */}
                    </table>
                </div>
            )}
            {activeTab === "settings" && (
                <div>
                    {/* Settings options and forms here */}
                </div>
            )}
        </main>
    );
};

export default MainArea;