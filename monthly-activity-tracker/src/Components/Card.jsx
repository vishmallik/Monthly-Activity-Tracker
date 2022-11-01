import React from "react";
let days = [];
(function Days() {
  for (let i = 1; i < 32; i++) {
    days.push(i);
  }
})();

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
    };
  }
  addDate = (day) => {
    let { days } = this.state;
    if (days.includes(day)) {
      let updatedDays = days.filter((elm) => elm !== day);
      this.setState({
        days: updatedDays,
      });
    } else {
      this.setState((prevState) => {
        return {
          days: prevState.days.concat(day),
        };
      });
    }
  };

  render() {
    let { name, month } = this.props;
    return (
      <div className="flex card">
        <div>
          <h2 className="activity-name">{name}</h2>
          <p className="month">{month}</p>
        </div>
        <ul className="days">
          {days.map((day) => (
            <li
              key={day}
              onClick={() => this.addDate(day)}
              className={this.state.days.includes(day) ? "active" : ""}
            >
              {day}
            </li>
          ))}
        </ul>
        <i
          className="fas fa-xmark-circle"
          onClick={() => this.props.deleteActivity(this.props.id)}
        ></i>
      </div>
    );
  }
}
