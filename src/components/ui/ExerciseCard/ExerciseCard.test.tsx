import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ExerciseCard } from "./index";

describe("ExerciseCard", () => {
  const mockSets = [
    { set: 1, kg: 50, target: 3, reps: 3 },
    { set: 2, kg: 50, target: 3, reps: 0 },
  ];

  const mockHandlers = {
    onRepsChange: vi.fn(),
    onKgChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders exercise name", () => {
    render(
      <ExerciseCard
        exerciseName="Bench Press"
        sets={mockSets}
        onRepsChange={mockHandlers.onRepsChange}
        onKgChange={mockHandlers.onKgChange}
      />
    );

    expect(screen.getByText("Bench Press")).toBeInTheDocument();
  });

  it("renders the correct headers", () => {
    render(
      <ExerciseCard
        exerciseName="Bench Press"
        sets={mockSets}
        onRepsChange={mockHandlers.onRepsChange}
        onKgChange={mockHandlers.onKgChange}
      />
    );

    expect(
      screen.getByRole("columnheader", { name: "Set" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "kg" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Target" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Reps" })
    ).toBeInTheDocument();
  });

  it("renders the correct number of sets", () => {
    render(
      <ExerciseCard
        exerciseName="Bench Press"
        sets={mockSets}
        onRepsChange={mockHandlers.onRepsChange}
        onKgChange={mockHandlers.onKgChange}
      />
    );

    expect(screen.getAllByRole("row")).toHaveLength(mockSets.length + 1);
  });

  it("renders the correct set values", () => {
    render(
      <ExerciseCard
        exerciseName="Bench Press"
        sets={mockSets}
        onRepsChange={mockHandlers.onRepsChange}
        onKgChange={mockHandlers.onKgChange}
      />
    );

    expect(screen.getByLabelText("Weight in kilograms for set 1")).toHaveValue(
      50
    );
    expect(
      screen.getByLabelText("Number of repetitions for set 1")
    ).toHaveValue(3);
    expect(screen.getByTestId("set-number-1")).toHaveTextContent("1");
    expect(screen.getByTestId("target-reps-1")).toHaveTextContent("3 reps");

    expect(screen.getByLabelText("Weight in kilograms for set 2")).toHaveValue(
      50
    );
    expect(
      screen.getByLabelText("Number of repetitions for set 2")
    ).toHaveValue(0);
    expect(screen.getByTestId("set-number-2")).toHaveTextContent("2");
    expect(screen.getByTestId("target-reps-2")).toHaveTextContent("3 reps");
  });

  it("calls handlers correctly", async () => {
    render(
      <ExerciseCard
        exerciseName="Bench Press"
        sets={mockSets}
        onRepsChange={mockHandlers.onRepsChange}
        onKgChange={mockHandlers.onKgChange}
      />
    );

    await userEvent.type(
      screen.getByLabelText("Weight in kilograms for set 1"),
      "60"
    );

    expect(mockHandlers.onKgChange).toHaveBeenCalledTimes(2);

    await userEvent.type(
      screen.getByLabelText("Number of repetitions for set 1"),
      "3"
    );

    expect(mockHandlers.onRepsChange).toHaveBeenCalledTimes(1);

    await userEvent.type(
      screen.getByLabelText("Weight in kilograms for set 2"),
      "60"
    );

    expect(mockHandlers.onKgChange).toHaveBeenCalledTimes(4);

    await userEvent.type(
      screen.getByLabelText("Number of repetitions for set 2"),
      "3"
    );

    expect(mockHandlers.onRepsChange).toHaveBeenCalledTimes(2);
  });
});
