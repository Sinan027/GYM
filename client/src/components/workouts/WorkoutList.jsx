import WorkoutCard from "./WorkoutCard";

export default function WorkoutList({ workouts }) {
  return (
    <div className="grid">
      {workouts.map((w) => (
        <WorkoutCard key={w.id} workout={w} />
      ))}
    </div>
  );
}