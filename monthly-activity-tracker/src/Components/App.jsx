import Card from "./Card";
import React from "react";
import { days, months } from "../data";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      inputValue: "",
    };
  }
  addActivity = (event) => {
    event.preventDefault();
    this.setState(
      (prevState) => {
        return {
          activities: prevState.activities.concat({
            id: Date.now(),
            name: this.state.inputValue,
            month: months[new Date().getMonth()],
            days,
          }),
        };
      },
      () => {
        this.setState({ inputValue: "" });
      }
    );
  };
  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  deleteActivity = (id) => {
    this.setState((prevState) => {
      return {
        activities: prevState.activities.filter(
          (activity) => activity.id !== id
        ),
      };
    });
  };
  selectDays = (id, day) => {
    const activities = JSON.parse(JSON.stringify(this.state.activities));
    activities.forEach((activity) => {
      if (activity.id === id) {
        activity.days.forEach((d) => {
          if (d.id === day) {
            d.isDone = !d.isDone;
          }
        });
      }
    });
    this.setState({
      activities: activities,
    });
  };
  componentDidMount() {
    if (localStorage.activities) {
      this.setState({ activities: JSON.parse(localStorage.activities) || [] });
    }
    window.addEventListener("beforeunload", this.handleUpdateLocalStorage);
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleUpdateLocalStorage);
  }
  handleUpdateLocalStorage = () => {
    localStorage.setItem("activities", JSON.stringify(this.state.activities));
  };
  render() {
    return (
      <div className="container">
        <h1>Monthly Activity Tracker</h1>
        <form className="input" onSubmit={this.addActivity}>
          <input
            type="text"
            name="name"
            id=""
            value={this.state.inputValue}
            placeholder="eg. Coding"
            onChange={this.handleChange}
          />
          <input type="submit" value="Add Activity" />
        </form>

        {this.state.activities.map((activity) => {
          console.log(activity);
          return (
            <Card
              {...activity}
              key={activity.id}
              deleteActivity={this.deleteActivity}
              selectDays={this.selectDays}
            />
          );
        })}
      </div>
    );
  }
}
