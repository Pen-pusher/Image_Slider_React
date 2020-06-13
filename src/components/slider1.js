import { render } from "react-dom";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/"
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/"
  }
];

export default class MyGallery extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button onClick={this.props.open} style={{ Color: "black" }}>
          {" "}
          X{" "}
        </button>

        <ImageGallery items={images} thumbnail={false} />
      </div>
    );
  }
}
