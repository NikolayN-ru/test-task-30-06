import { useState } from "react";

import Day from "../day/day";
import Button from "../button/button";

import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<any>({
    "2024-6-3": ["✓ Task 1", "Task 2"],
    "2024-6-11": ["Task 1", "Task 2"],
    "2024-6-20": ["Task 1", "✓ Task 2"],
    "2024-6-29": ["Task 3", "Task 4"],
  });

  const [selectedDate, setSelectedDate] = useState<any>(null);
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleDayClick = (date: any) => {
    setSelectedDate(date);
  };

  const closeModal = () => {
    setSelectedDate(null);
  };

  const addTask = (task: any) => {
    setTasks((prevTasks: any) => ({
      ...prevTasks,
      [selectedDate]: [...(prevTasks[selectedDate] || []), task],
    }));
  };

  const deleteTask = (index: any) => {
    const updatedTasks = [...tasks[selectedDate]];
    updatedTasks.splice(index, 1);
    setTasks((prevTasks: any) => ({
      ...prevTasks,
      [selectedDate]: updatedTasks,
    }));
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = [...tasks[selectedDate]];
    const task = updatedTasks[index];
    if (!task.startsWith("✓")) {
      updatedTasks[index] = `✓ ${task}`;
      setTasks((prevTasks: { [key: string]: string[] }) => ({
        ...prevTasks,
        [selectedDate]: updatedTasks,
      }));
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="header">
          <Button active={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} name="&lt; предыдущий" />
          <h3>{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</h3>
          <Button active={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} name="следующий &gt;" />
        </div>
        <table className="table">
          <thead>
            <tr className="text">
              <th>Пн</th>
              <th>Вт</th>
              <th>Ср</th>
              <th>Чт</th>
              <th>Пт</th>
              <th>Сб</th>
              <th>Вс</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil((daysInMonth + startDay) / 7) }, (_, weekIndex) => (
              <tr key={weekIndex}>
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const day = weekIndex * 7 + dayIndex - startDay + 1;
                  const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
                  const tasksForDay: any = tasks[dateString] || [];
                  return (
                    <td key={dayIndex} className={day <= 0 || day > daysInMonth ? "empty" : ""} onClick={() => handleDayClick(dateString)}>
                      <Day day={day <= 0 || day > daysInMonth ? "" : day} {...{ tasksForDay }} />
                      <ul className="task-list">{tasksForDay.length ? <div className="badge"></div> : null}</ul>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedDate && (
        <div className="modal">
          <div className="opacity"></div>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedDate}</h2>
            <ul>
              {tasks[selectedDate]?.map((task: any, index: any) => (
                <div className="taskItem" key={index}>
                  <div className="description">{task}</div>
                  <div className="buttons">
                    <Button active={() => deleteTask(index)} name="удалить" />
                    {!task.startsWith("✓") && <Button active={() => toggleTaskCompletion(index)} name="выполнить" />}
                  </div>
                </div>
              ))}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const taskElement = e.currentTarget.elements.namedItem("task") as HTMLInputElement | null;
                if (taskElement) {
                  const newTask = taskElement.value;
                  addTask(newTask);
                  e.currentTarget.reset();
                }
              }}
            >
              <input type="text" name="task" placeholder="ваша новая задача" required />
              <button className="newTaskButton" type="submit">
                добавить
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
