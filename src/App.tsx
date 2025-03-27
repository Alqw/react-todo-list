import { useState, useRef, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState<
    { id: number; text: string; deleting?: boolean }[]
  >([]);
  const [task, setTask] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Error parsing localStorage: ", error);
        localStorage.removeItem("tasks");
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = { id: Date.now(), text: task };
      setTasks([newTask, ...tasks]);
      setTask("");
      inputRef.current?.focus();
    }
  };

  const removeTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, deleting: true } : task
      )
    );

    setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <>
      <main className="page">
        <div className="todo-header">
          <input
            ref={inputRef}
            type="text"
            className="todo-input"
            placeholder="Task"
            onChange={(e) => setTask(e.target.value)}
            value={task}
            onKeyDown={handleKeyDown}
          />
          <button className="button" onClick={addTask}>
            Send
          </button>
        </div>
        {tasks.length > 0 && (
          <div
            className={`todo-body ${
              tasks.length === 0 ? "todo-body-empty" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <div
                className={`todo-item ${
                  task.deleting ? "todo-item-checked" : ""
                }`}
                key={index}
              >
                <button
                  className={`checkbox ${
                    task.deleting ? "checkbox-pressed" : ""
                  }`}
                  onClick={() => removeTask(task.id)}
                ></button>
                <p>{task.text}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default App;
