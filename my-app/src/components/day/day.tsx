import { FC } from "react";

import "./day.css";

const Day: FC<{ day: any; tasksForDay: any[] }> = ({ day, tasksForDay }) => {
  if (day.length == 0) {
    return <button disabled className="button-day"></button>;
  }

  return (
    <div className="day">
      {day}
      <div>
        {tasksForDay.map((task: any, index: any) => (
          <div key={index} className="taskDay">
            {task}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
