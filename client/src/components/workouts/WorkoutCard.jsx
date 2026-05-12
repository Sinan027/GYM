export default function WorkoutCard({ workout }) {
  return (
    <div className="card">
      <h3>{workout.title}</h3>
      <p>{workout.duration} mins</p>
      <p>{workout.level}</p>
    </div>
  );
}