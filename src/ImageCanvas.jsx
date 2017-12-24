import React, { Component } from 'react';

class ImageCanvas extends Component {

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawImage();
    this.drawDots();
  }

  handleImageLoaded() {
    this.drawImage();
    this.drawDots();
  }

  drawCanvas() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  calculateCanvasHeight(canvasWidth, imageWidth, imageHeight) {
    return canvasWidth / imageWidth * imageHeight;
  }

  drawImage() {
    const canvas = this.refs.canvas;
    const image = this.refs.image;
    canvas.width = canvas.offsetWidth;
    canvas.height = this.calculateCanvasHeight(canvas.offsetWidth, image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  drawDots() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const radius = 2;
    const { dotIndex } = this.props;
    const dotCoordinates = [];
    for (let y = 10; y < canvas.height; y = y + 20) {
      for (let x = 10; x < canvas.width; x = x + 20) {
        dotCoordinates.push({ x: x, y: y });
      }
    }
    dotCoordinates.forEach((c, index) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = index === dotIndex ? "red" : "white";
      ctx.fill();
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "black";
      ctx.stroke();
    });
  }

  handleImageLoadError() {
    console.log("Image Load Error!");
  }

  render() {
    const { imageUrl } = this.props;
    let image = null;
    if (imageUrl) {
      image = (
        <img
          ref="image"
          alt="Placeholder element"
          src={imageUrl}
          className="hidden"
          onLoad={() => this.handleImageLoaded()}
          onError={() => this.handleImageLoadError()}
        />
      );
    }
    return (
      <div>
        <canvas ref="canvas" />
        {image}
      </div>
    );
  }
}

export default ImageCanvas;