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
let days = [];
(() => {
  for (let i = 1; i < 32; i++) {
    days.push({ id: i, isDone: false });
  }
})();
export { days, months };
