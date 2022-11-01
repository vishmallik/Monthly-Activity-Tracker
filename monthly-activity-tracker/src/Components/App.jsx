import Card from "./Card";
import React from "react";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
  }
  addActivity = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        activities: prevState.activities.concat({
          id: Date.now(),
          name: event.target.name.value,
          month: months[new Date().getMonth()],
        }),
      };
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
            value={this.state.activities.name}
            placeholder="eg. Coding"
          />
          <input type="submit" value="Add Activity" />
        </form>
        {this.state.activities.map((activity) => (
          <Card
            {...activity}
            key={activity.id}
            deleteActivity={this.deleteActivity}
          />
        ))}
      </div>
    );
  }
}
