export const getDatePretty = (str) => {
  try {
    var date = new Date(Date.parse(str));
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period = hours >= 12 ? 'pm' : 'am';

    // Convert hours from 24-hour to 12-hour format
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    // Format the output string
    var prettyDate = `${day}/${month}/${year} | ${hours}:${(minutes < 10 ? '0' : '') + minutes} ${period}`;
    return prettyDate;
  } catch (err) {
    console.log(err);
    return "Invalid Date";
  }
}


export const getTimePretty = (seconds) => {
  try {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = seconds % 60;

    // Format the output string
    var prettyTime = `${h}h:${m}m:${s}s`;
    return prettyTime;
  } catch (err) {
    console.log(err);
    return "Invalid Time";
  }
}


