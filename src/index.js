import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import "./assets/reset.scss";
import "./assets/main.scss";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [
        "https://images.unsplash.com/photo-1561275526-4d2c9c9c435c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1567943834464-fd9c466ed9be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1528690041201-a8217b45b970?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1447756069423-994698ebbf70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1462007895615-c8c073bebcd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1462007895615-c8c073bebcd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1591018809419-e56a7c5f12e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1553337546-017c3075360c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      ],
      currentIndex: 0,
      translateValue: 0
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

  render() {
    return (
      <div className="slider">
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: "transform ease-out 0.45s"
          }}
        >
          {this.renderSlides()}
        </div>

        <LeftArrow goToPrevSlide={this.goToPrevSlide} />

        <RightArrow goToNextSlide={this.goToNextSlide} />

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

const LeftArrow = props => {
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
      <i className=" arrow-left" aria-hidden="true"></i>
    </div>
  );
};

const RightArrow = props => {
  return (
    <div className="nextArrow arrow" onClick={props.goToNextSlide}>
      <i className=" arrow-right " aria-hidden="true"></i>
    </div>
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
class App extends React.Component {
  state = {
    open: false
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
      <div style={styles}>
        <h2 style={{ marginTop: "20px", marginBottom: "20px" }}>Click Me !</h2>
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          onClick={this.onOpenModal}
          className="First_image"
        ></img>
        <Modal open={open} onClose={this.onCloseModal} className="modal">
          <Slider />
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
