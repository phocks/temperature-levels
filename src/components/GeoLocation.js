const { h, Component } = require("preact");

const styles = require("./GeoLocation.scss");

class GeoLocation extends Component {
  constructor(props) {
    super(props);
  }

  getLocation() {

    
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    
    function showPosition(position) {
      console.log(
        "Latitude: " +
          position.coords.latitude +
          "Longitude: " +
          position.coords.longitude
      );
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <button onClick={this.getLocation.bind(this)}>Get location</button>
      </div>
    );
  }
}

module.exports = GeoLocation;
