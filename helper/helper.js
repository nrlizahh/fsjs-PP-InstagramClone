const timeAgo = (value) => {
    const now = new Date();
    const timeZone = now - value;
    const minutes = Math.floor(timeZone / 60000);
    const hours = Math.floor(timeZone / 3600000);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return value.toISOString();  
    }
  }


  module.exports = {timeAgo}