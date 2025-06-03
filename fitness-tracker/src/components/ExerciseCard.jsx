import { useQuery } from '@tanstack/react-query';
import placeHolder from '../assets/background1.jpeg'
import { fetchExerciseByID } from '../services/api';

//exercise card displays
function ExerciseCard({ exercise }) {
    const { data: exerciseOfId } = useQuery({
        queryKey: ['exId', exercise.id],        // include the id (or the whole exercise object)
        queryFn: () => fetchExerciseByID(exercise.id),
    });

    return (
        <div className="flex flex-col items-center bg-[#31363F] rounded-md shadow-md hover:shadow-lg transition-all overflow-hidden border border-lime-500 font-poppins">
            {/* Image */}
            <div className="w-full m-1 h-1/4">
                <img
                    src={exercise.image || placeHolder}
                    alt={exerciseOfId?.name ?? exercise.name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Details */}
            <aside className="w-2/3 p-2 text-lime-400 tracking-wide text-[20px]">
                <h3 className="text-sm font-bold uppercase mb-1">{exerciseOfId?.name}</h3>
                <p className="text-xs text-gray-300 mb-2">
                    {exerciseOfId?.description ?? 'Description unavailable'}
                </p>

                <h4 className="text-sm font-bold uppercase mb-1">Muscle Groups Targeted</h4>
                {exercise.muscles?.length
                    ? exercise.muscles.map((m, i) => (
                        <span key={i}>{m}{i < exercise.muscles.length - 1 ? ', ' : ''}</span>
                    ))
                    : <p>Not defined</p>}
            </aside>
        </div>
    );
  }

export default ExerciseCard;
