export default function UserProfile() {
    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-green-800 mb-4">Perfil de Usuario</h1>
            <p className="text-gray-700 mb-2">Aquí puedes ver y editar tu perfil.</p>
            <p className="text-gray-700 mb-4">Pronto podrás actualizar tu información.</p>
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
            Editar Perfil
            </button>
        </div>
        </div>
    );
}