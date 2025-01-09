import { Link } from "react-router-dom";
import ExerciseTypeDoughnutChart from "../components/ExerciseTypeVisualization";
import IntensityVisualization from "../components/IntensityVisualization";
import circle from "../assets/circle-plus-svgrepo-com.svg";
import WorkoutHistoryAccordion from "../components/WorkoutHistoryAccordion";

function Home() {
  return (
    <main className="flex flex-col md:flex-row p-4 gap-6 font-poppins relative mb-5">
      <section className="flex-1">
        <div className="mb-3">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-900">
            Progress Overview
          </h2>

          <div className="md:hidden flex flex-row gap-4 overflow-x-auto overflow-y-hidden max-h-96 scrollbar-hide">
            <div className="rounded-xl shadow-lg bg-white/10 p-4 min-w-[90%]">
              <h3 className="text-lg font-semibold mb-1 text-center text-specialGray">
                Workout Intensity
              </h3>
              <div className="bg-white/20 rounded-md p-1">
                <IntensityVisualization />
              </div>
            </div>
            <div className="rounded-xl shadow-lg bg-white/10 p-4 min-w-[90%]">
              <h3 className="text-lg font-semibold mb-1 text-center text-specialGray">
                Exercise Distribution
              </h3>
              <div className="bg-white/20 rounded-md p-1">
                <ExerciseTypeDoughnutChart />
              </div>
            </div>
          </div>

          <div className="hidden md:bg-white/10 md:rounded-xl md:grid md:grid-cols-2 md:gap-4 md:p-4 lg:w-full lg:mx-auto shadow-lg">
            <div className="rounded-lg bg-white/20 p-4">
              <IntensityVisualization />
            </div>
            <div className="rounded-lg bg-white/20 p-4">
              <ExerciseTypeDoughnutChart />
            </div>
          </div>
        </div>

        <div className="h-72">
          <h2 className="text-xl font-bold mt-2 mb-4 text-center text-gray-900">
            Workout History
          </h2>
          <div className="rounded-xl shadow-lg bg-white/10 md:p-4 overflow-y-hidden">
            <div className="h-36 w-5/6 m-2 bg-background2 bg-cover bg-center rounded-lg mx-auto"></div>
            <WorkoutHistoryAccordion/>
          </div>
        </div>
      </section>

      <div className="md:hidden w-20 border-none sticky left-full bottom-6">
        <Link to={"/LogWorkout"}>
          <img src={circle} alt="Log Workout" />
        </Link>
      </div>

      <section className="hidden w-full md:w-1/3 md:flex flex-col gap-6">
        <div className="rounded-xl shadow-lg bg-white/10 p-4 relative">
          <div className="h-60 bg-background2 bg-cover bg-center rounded-lg"></div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-700">
              View Exercises
            </h3>
            <p className="text-sm text-lime-800 mb-4">
              Browse through a wide variety of exercises tailored to help you
              achieve your fitness goals.
            </p>
            <button className="text-white font-semibold py-3 w-full bg-lime-900 rounded-lg">
              <Link to={"/exercises"}>View Exercises</Link>
            </button>
          </div>
        </div>

        <div className="rounded-xl shadow-lg bg-white/10 p-4 relative">
          <div className="h-72 bg-formImage bg-cover bg-center rounded-lg"></div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-700">
              Log A Workout
            </h3>
            <p className="text-sm text-lime-800 mb-4">
              Keep track of your fitness journey by logging your workouts
              efficiently and effectively.
            </p>
            <button className="text-white font-semibold py-3 w-full bg-lime-900 rounded-lg">
              <Link to={"/LogWorkout"}>Log A Workout</Link>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
