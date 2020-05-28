class Conway {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.current = this.randomCurrent();
    this.next = [];
    this.on = true;
  }

  creatematrix = (rows, cols, isEmpty = false) => {
    let arr = [];
    for (let i = 0; i < cols; i++) {
      arr.push([]);
      for (let j = 0; j < rows; j++) {
        !isEmpty ? arr[i].push(Math.round(Math.random())) : arr[i].push(null);
      }
    }
    return arr;
  };

  randomCurrent = () => {
    this.current = this.creatematrix(this.cols, this.rows);
    return this.current;
  };

  emptyNext = () => {
    this.next = this.creatematrix(this.cols, this.rows, true);
    return this.next;
  };

  createNew = () => {
    this.renderMap();
    this.emptyNext();
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let currentPair = this.current[i][j];
        let neighborhood = this.countNeighborhood(this.current, i, j);

        if (currentPair == 0 && neighborhood == 3) {
          this.next[i][j] = 1;
        } else if (currentPair == 1 && (neighborhood < 2 || neighborhood > 3)) {
          this.next[i][j] = 0;
        } else {
          this.next[i][j] = currentPair;
        }
      }
    }

    this.current = this.next;

    this.on && setTimeout(this.createNew, 10);
  };

  countNeighborhood = (current, x, y) => {
    let count = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + this.cols) % this.cols;
        let row = (y + j + this.rows) % this.rows;
        count += current[col][row];
      }
    }
    count -= current[x][y];
    return count;
  };

  renderMap = () => {
    let canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
    canvas.style.width = `${this.cols * 10}px`;
    canvas.style.height = `${this.rows * 10}px`;
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let renderedPair = document.createElement("span");
        if (this.current[i][j]) {
          renderedPair.classList.add("on");
        } else {
          renderedPair.classList.add("off");
        }
        canvas.appendChild(renderedPair);
      }
    }
  };

  changeOn = () => {
    this.on = this.on ? false : true;
    this.createNew();
  };
}

let instance = new Conway(50, 50);
instance.createNew();

function restart() {
  instance.createNew();
}
function stop() {
  instance.changeOn();
}

// make form in js, add relevant methods to onclick event

let startbtn = document.getElementById("start");
startbtn.addEventListener("click", restart);
let stopbtn = document.getElementById("stop");
stopbtn.addEventListener("click", stop);
