import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Mygallery from "./components/slider1";
import "./assets/reset.scss";
import "./assets/main.scss";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
// slider component
class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [
        "https://picsum.photos/id/1018/1000/600/",
        "https://picsum.photos/id/1015/1000/600/"
      ],
      currentIndex: 0,
      translateValue: 0,
      open: true
    };
  }

  goToPrevSlide = () => {
    if (this.state.currentIndex === 0) return;

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }));
  };

  goToNextSlide = () => {
    // Exiting the method early if we are at the end of the images array.

    if (this.state.currentIndex === this.state.images.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      });
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -this.slideWidth()
    }));
  };

  slideWidth = () => {
    return document.querySelector(".slide").clientWidth;
  };

  renderSlides = () => {
    const { images, currentIndex } = this.state;

    const slides = images.map((image, i) => {
      let isActive = currentIndex === i ? true : false;
      return <Slide key={i} image={image} isActive={isActive} />;
    });

    return slides;
  };

  handleDotClick = e => {
    const dotIndex = parseInt(e.target.getAttribute("data-index"));

    // Go back
    if (dotIndex < this.state.currentIndex) {
      return this.setState({
        currentIndex: dotIndex,
        translateValue: -dotIndex * this.slideWidth()
      });
    }

    // Go forward
    this.setState({
      currentIndex: dotIndex,
      translateValue:
        this.state.translateValue +
        (this.state.currentIndex - dotIndex) * this.slideWidth()
    });
  };

  // handleClick = () => {
  //   const { currentIndex, images, open } = this.state;
  //   const current = images[currentIndex];
  // };
  render() {
    const { currentIndex, images, open } = this.state;
    const current = images[currentIndex];
    return (
      <div className="slider">
        <div>Beautiful Pics</div>
        <br />
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: "transform ease-out 0.45s"
          }}
          onClick={this.props.close}
        >
          {this.renderSlides()}
        </div>

        <Dots
          images={this.state.images}
          currentIndex={this.state.currentIndex}
          handleDotClick={this.handleDotClick}
        />
      </div>
    );
  }
}

const Slide = ({ image, isActive }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 60%"
  };

  return (
    <div className={`slide ${isActive ? "active-slide" : ""}`} style={styles} />
  );
};

const Dots = ({ images, currentIndex, handleDotClick }) => {
  return (
    <div className="dots-container">
      {images.map((image, i) => (
        <div
          className={`${i === currentIndex ? "dot active" : "dot"}`}
          onClick={handleDotClick}
          data-index={i}
          key={i}
        />
      ))}
    </div>
  );
};

// app component
class App extends React.Component {
  state = {
    open: true
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        {open ? (
          <Slider close={this.onCloseModal} />
        ) : (
          <Mygallery open={this.onOpenModal} />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
