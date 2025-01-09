import BarChartWeeklyVisualization from "../components/BarChartWeeklyVisualization"
import ExerciseTypeDoughnutChart from "../components/ExerciseTypeVisualization"
import IntensityVisualization from "../components/IntensityVisualization"
import ProgressChart from "../components/ProgressChart"

function Progress() {
  return (
    <div>
      <section className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Progress Tracking</h1>

        <div className="p-4 bg-gray-100 rounded-lg shadow md:w-2/3 mb-4 mx-auto">
          <h2 className="text-lg font-semibold mb-2">Total Weight Lifted</h2>
          <ProgressChart />
        </div>

        <div className="p-4 bg-gray-100 rounded-lg shadow md:w-2/3 mx-auto">
          <h2 className="text-lg font-semibold mb-2">
            Workouts Completed by Week
          </h2>
          <BarChartWeeklyVisualization/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 md:mx-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Exercise Summary</h2>
            <IntensityVisualization />
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Exercise Summary</h2>
            <ExerciseTypeDoughnutChart />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Progress