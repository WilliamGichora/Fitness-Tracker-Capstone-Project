import useWorkoutStore from "../stores/useWorkoutStore";

function WorkoutLog() {
  const workouts = useWorkoutStore((state) => state.workouts);

  //Sorting the workouts by a simple reverse, since they are in ascending order
  const sortedWorkouts = [...workouts].toReversed()

  //array.reduce function to Group workouts by date
  const groupedWorkouts = sortedWorkouts.reduce((acc, workout) => {
    const date = new Date(workout.timestamp).toLocaleDateString(); 
    if (!acc[date]) acc[date] = []; 
    acc[date].push(...workout.exercises);
    return acc;
  }, {});

  console.log(groupedWorkouts);
  

  return (
    <section className="p-6 font-poppins">
      <h2 className="text-xl font-bold mb-4 text-center">Workout History</h2>

      <div className="flex flex-col gap-6">
        {Object.entries(groupedWorkouts).map(([date, exercises]) => (
          <div key={date} className="bg-gray-100 rounded-lg p-4 shadow-md">

            <h3 className="text-lg font-semibold mb-4">{date}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center"
                >
                  <img
                    src={`/images/${exercise.name.replace(/\s/g, "_")}.jpg`}
                    alt={exercise.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h4 className="font-medium text-lg mb-2">{exercise.name}</h4>
                  <p><strong>Weight:</strong> {exercise.weight} kg</p>
                  <p><strong>Reps:</strong> {exercise.reps}</p>
                  <p><strong>Sets:</strong> {exercise.sets}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorkoutLog;
