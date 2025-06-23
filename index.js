import React, { useState, useEffect, useRef } from 'react';

// Main App component
const App = () => {
    // State to store the user's name input
    const [name, setName] = useState('');
    // State to store the assigned team result (team name)
    const [teamNameResult, setTeamNameResult] = useState(null);
    // State to store the members of the assigned team
    const [teamMembersResult, setTeamMembersResult] = useState([]);
    // State to control the spinning animation
    const [isSpinning, setIsSpinning] = useState(false);
    // State to show error messages
    const [error, setError] = useState('');
    // Ref for the input field to auto-focus
    const inputRef = useRef(null);

    // Define the team assignments and their members
    // Names are normalized to lowercase for case-insensitive matching
    const teams = {
        'equipo 1': {
            name: 'Equipo 1',
            members: [
                'Joshua (21)',
                'David (10)',
                'Ian (12)',
                'Carlos (21 - Monitor)',
                'Brianna (16 - Monitor)'
            ],
            participants: ['joshua', 'david', 'ian', 'carlos', 'brianna'] // For easy lookup
        },
        'equipo 2': {
            name: 'Equipo 2',
            members: [
                'Daniel (14)',
                'Oliver (13)',
                'Nahim (17 - Monitor)'
            ],
            participants: ['daniel', 'oliver', 'nahim']
        },
        'equipo 3': {
            name: 'Equipo 3',
            members: [
                'Brayan (14)',
                'Mateo (13)',
                'Sebastian (14)',
                'Raul (16 - Monitor)'
            ],
            participants: ['brayan', 'mateo', 'sebastian', 'raul']
        },
        'equipo 4': {
            name: 'Equipo 4',
            members: [
                'Pedro (11)',
                'Mariana (10)',
                'Yessica (19 - Monitor)'
            ],
            participants: ['pedro', 'mariana', 'yessica']
        },
        'equipo 5': {
            name: 'Equipo 5',
            members: [
                'Salma (13)',
                'Cloe (12)',
                'Samuel (12)',
                'Alejandro (17 - Monitor)'
            ],
            participants: ['salma', 'cloe', 'samuel', 'alejandro']
        }
    };

    // Create a reverse lookup for names to team keys
    const nameToTeamKey = {};
    for (const teamKey in teams) {
        teams[teamKey].participants.forEach(participantName => {
            nameToTeamKey[participantName] = teamKey;
        });
    }

    // Effect to focus on the input field when the component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Normalize the input name for case-insensitive comparison
        const normalizedName = name.toLowerCase().trim();

        // Check if the name exists in our assignments
        const teamKey = nameToTeamKey[normalizedName];

        if (teamKey && teams[teamKey]) {
            setError(''); // Clear any previous errors
            setIsSpinning(true); // Start spinning animation
            setTeamNameResult(null); // Clear previous result
            setTeamMembersResult([]); // Clear previous members

            // Simulate "spinning" delay
            setTimeout(() => {
                setTeamNameResult(teams[teamKey].name); // Set the final team name
                setTeamMembersResult(teams[teamKey].members); // Set the final team members
                setIsSpinning(false); // Stop spinning animation
            }, 2000); // 2 seconds delay for the "roulette" effect
        } else {
            // If name is not found, show an error
            setError('Nombre no encontrado. Por favor, verifica que lo hayas escrito correctamente.');
            setTeamNameResult(null); // Clear previous result
            setTeamMembersResult([]); // Clear previous members
            setIsSpinning(false); // Ensure spinning is off
        }
    };

    // Function to handle changes in the name input field
    const handleChange = (e) => {
        setName(e.target.value);
        if (error) setError(''); // Clear error when user starts typing again
    };

    // Function to reset the application state
    const handleReset = () => {
        setName('');
        setTeamNameResult(null);
        setTeamMembersResult([]);
        setIsSpinning(false);
        setError('');
        if (inputRef.current) {
            inputRef.current.focus(); // Focus input after reset
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex flex-col items-center justify-center p-4 font-inter text-white">
            <div className="bg-white text-gray-800 rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center transform transition-all duration-300 hover:scale-105">
                <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">
                    ¡Descubre Tu Equipo!
                </h1>

                <p className="text-lg mb-8">
                    Ingresa tu nombre para ver a qué equipo perteneces.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        ref={inputRef}
                        value={name}
                        onChange={handleChange}
                        placeholder="Escribe tu nombre aquí (ej. 'Carlos', 'Mariana')..."
                        className="w-full p-4 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent text-lg placeholder-gray-400"
                        disabled={isSpinning}
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-600 transition-all duration-300 ease-in-out shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-400 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!name.trim() || isSpinning}
                    >
                        {isSpinning ? 'Girando la Ruleta...' : '¡Ver Mi Equipo!'}
                    </button>
                </form>

                {isSpinning && (
                    <div className="mt-8">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            {/* Simple spinning animation */}
                            <div className="absolute inset-0 border-4 border-t-4 border-indigo-500 rounded-full animate-spin-slow"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-indigo-700 text-xl font-bold">
                                ?
                            </div>
                        </div>
                        <p className="text-xl font-semibold text-purple-700">Calculando...</p>
                    </div>
                )}

                {teamNameResult && !isSpinning && (
                    <div className="mt-8 bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-xl shadow-md animate-fade-in">
                        <p className="text-2xl font-bold mb-2">¡Felicitaciones!</p>
                        <p className="text-3xl font-extrabold text-green-800 mb-4">
                            Estás en el <span className="underline">{teamNameResult}</span>
                        </p>
                        <h3 className="text-xl font-semibold mb-2 text-green-700">Integrantes del equipo:</h3>
                        <ul className="list-disc list-inside text-left text-green-700 max-h-40 overflow-y-auto mx-auto w-fit">
                            {teamMembersResult.map((member, index) => (
                                <li key={index} className="py-0.5">{member}</li>
                            ))}
                        </ul>
                        <button
                            onClick={handleReset}
                            className="mt-6 bg-purple-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-purple-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            Volver a Empezar
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-md animate-fade-in">
                        <p className="text-lg font-semibold">{error}</p>
                        <button
                            onClick={handleReset}
                            className="mt-6 bg-purple-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-purple-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            Intentar de Nuevo
                        </button>
                    </div>
                )}
            </div>

            {/* Tailwind CSS Custom Keyframe for slow spin */}
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 2s linear infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
                /* Font import for Inter */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                .font-inter {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
        </div>
    );
};

export default App;
