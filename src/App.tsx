import { useState } from "react";
import { ExerciseCard } from "@/components/ui/ExerciseCard";
import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  const [sets, setSets] = useState([
    { set: 1, kg: 50, target: 3, reps: 3 },
    { set: 2, kg: 50, target: 3, reps: 0 },
    { set: 3, kg: 50, target: 3, reps: 0 },
    { set: 4, kg: 50, target: 3, reps: 0 },
    { set: 5, kg: 50, target: 3, reps: 0 },
  ]);

  const handleRepsChange = (index: number, value: number) => {
    const newSets = [...sets];
    newSets[index].reps = value;
    setSets(newSets);
  };

  const handleKgChange = (index: number, value: number) => {
    const newSets = [...sets];
    newSets[index].kg = value;
    setSets(newSets);
  };

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="flex flex-col items-center justify-center min-h-svh">
        <ExerciseCard
          exerciseName="Bench Press"
          sets={sets}
          onRepsChange={handleRepsChange}
          onKgChange={handleKgChange}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
