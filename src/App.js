import "./styles.css";
import { useState } from "react";

export default function App() {
  let planes = [];
  let planeA, planeB;
  class Plane {
    constructor(orientation, x_pos, y_pos) {
      this.data = [];
      if (orientation == "horizontal") {
        this.x_pos = x_pos;
        this.y_pos = y_pos;
      } else {
        this.x_pos = y_pos;
        this.y_pos = x_pos;
      }
      this.orientation = orientation;
      for (let y = 0; y < 6; y++) {
        this.data[y] = [];
        for (let x = 0; x < 12; x++) {
          let miniplane = [];
          miniplane[0] = x; //x
          miniplane[1] = y; //y
          miniplane[2] = 6 - y; //z
          if (orientation == "horizontal") miniplane[3] = true; //v
          if (orientation == "vertical") miniplane[3] = false; //v
          this.data[y][x] = miniplane;
        }
      }
      planes.push(this);
    }
  }
  class Scanner {
    constructor(planes) {
      //this.planes = planes;
      //i quoted it because i made hardcoded planes
      //if continue this idea planes must be in scaner
      //and in scan() must be checked all variation of each element
      //*not only main position
      console.log("scanner ready");
    }
    scan() {
      //ye it little stupid and messy but for now as is
      //here x because i rotate blue plane without understanding:)
      if (planeB.x_pos > planeA.y_pos) {
        let steps = (planeB.x_pos - planeA.y_pos) / 20;
        for (let i = 0; i < steps; i++) {
          for (let j = 0; j < 6; j++) {
            planeB.data[j][i][3] = true;
          }
        }
      } else {
        console.log(planeB.x_pos);
        for (let i = 0; i < 12; i++) {
          for (let j = 0; j < 6; j++) {
            planeB.data[j][i][3] = false;
          }
        }
      }
    }
    draw() {
      const canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 400, 300);
      //here not hardcoded part, i mean it must be like this in all functions
      //with no dependencies to global hardcoded planes
      for (let plane of planes) {
        if (plane.orientation == "vertical") {
          for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 12; x++) {
              //if v without changing
              if (plane.data[y][x][3] == false) {
                ctx.beginPath();
                ctx.fillStyle = "blue";
                //parallelogram
                //with shift from plane position
                let s = 20; //size
                ctx.moveTo(plane.y_pos + y * s, plane.x_pos - x * s + y * s); //left bottom
                ctx.lineTo(
                  plane.y_pos + y * s,
                  plane.x_pos - x * s - s + y * s
                );
                ctx.lineTo(
                  plane.y_pos + y * s + s,
                  plane.x_pos - x * s + y * s
                );
                ctx.lineTo(
                  plane.y_pos + y * s + s,
                  plane.x_pos - x * s + s + y * s
                );
                ctx.lineTo(plane.y_pos + y * s, plane.x_pos - x * s + y * s); //left bottom
                ctx.fill();
                ctx.stroke();
              }
            }
          }
        }
        if (plane.orientation == "horizontal") {
          for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 12; x++) {
              ctx.beginPath();
              ctx.fillStyle = "red";
              //parallelogram
              //with shift from plane position
              let s = 20; //size
              ctx.moveTo(y * s + plane.x_pos + x * s, plane.y_pos + y * s); //left top
              ctx.lineTo(y * s + plane.x_pos + x * s + s, plane.y_pos + y * s); //right top
              ctx.lineTo(
                y * s + plane.x_pos + x * s + 2 * s,
                plane.y_pos + y * s + s
              ); //right bottom +"perspective"
              ctx.lineTo(
                y * s + plane.x_pos + x * s + s,
                plane.y_pos + y * s + s
              ); //left bottom +"perspective"
              ctx.lineTo(y * s + plane.x_pos + x * s, plane.y_pos + y * s); //left top
              ctx.fill();
              ctx.stroke();
            }
          }
        }
      }
    }
  }
  const [state, setState] = useState(11);
  function changeState(e) {
    setState(e.target.value);
    console.log(e.target.value);
    planeB.x_pos = -1 * e.target.value; //normalize value
    scanner.scan();
    scanner.draw();
  }
  planeA = new Plane("horizontal", 20, 160);
  planeB = new Plane("vertical", 160, 0);
  let scanner = new Scanner();
  return (
    <div className="App">
      <h1>Hello MLH</h1>
      <h2>Let's vizualize intersections of planes</h2>
      <canvas className="Canvas" width="400px" height="300px"></canvas>
      <input
        className="Input"
        type="range"
        min="-400"
        value={state}
        max="0"
        step="20"
        orient="vertical"
        onChange={changeState}
      ></input>
    </div>
  );
}
