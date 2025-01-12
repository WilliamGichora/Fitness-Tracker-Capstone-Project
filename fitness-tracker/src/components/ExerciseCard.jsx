import placeHolder from '../assets/background1.jpeg'

//exercise card displays
function ExerciseCard({ exercise }) {
    return (
        <div className="flex  flex-col items-center bg-[#31363F] rounded-md shadow-md hover:shadow-lg transition-all overflow-hidden border border-lime-500 font-poppins">
            {/* Image Section */}
            <div className="w-full m-1 h-1/4">
                <img
                    src={exercise.image || placeHolder}
                    alt={exercise.name}
                    className="h-full w-full object-cover"
                />
            </div>

            <aside className="w-2/3 p-2 text-lime-400 line tracking-wide text-lg text-[20px]">
                <h3 className="text-sm font-bold uppercase mb-1">{exercise.name}</h3>
                <p className="text-xs text-gray-300 sm:mb-2">
                    {exercise.description || "Description unavailable"}
                </p>
                <h3 className="text-sm font-bold uppercase mb-1">Muscle Groups Targeted</h3>
                {exercise.muscles ? exercise.muscles.map((element, index) => (
                    <span key={index}>{`${element}, `}</span>)) : <p>Not defined</p>
                }
            </aside>
        </div>
    );
}

export default ExerciseCard;
