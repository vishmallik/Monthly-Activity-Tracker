import React from "react";

export default function Card(props) {
  let { id, name, month, days } = props;
  return (
    <div className="flex card">
      <div>
        <h2 className="activity-name">{name}</h2>
        <p className="month">{month}</p>
      </div>
      <ul className="days">
        {days.map((day) => (
          <li
            key={day.id}
            onClick={() => props.selectDays(id, day.id)}
            className={day.isDone ? "active" : ""}
          >
            {day.id}
          </li>
        ))}
      </ul>
      <i
        className="fas fa-xmark-circle"
        onClick={() => props.deleteActivity(id)}
      ></i>
    </div>
  );
}
