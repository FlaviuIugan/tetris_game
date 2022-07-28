const table = document.querySelector(".table")
const btn = document.querySelector("#btn");
const tableInfo = document.querySelector(".table-info");
const h3 = document.querySelectorAll("h3")
const container = document.querySelector(".container")
let body = document.getElementsByTagName('body');


class Shape {
    constructor(name) {
        this.name = name;
        this.rows = [];
        this.columns = [];
        this.color = null;
        this.colors = ["dodgerblue", "gold", "darkgreen", "crimson", "chocolate", "fuchsia"]
    }
}

class Tetris {
    constructor() {
        this.tetrisTable = []
        this.highscore = 0;
        this.score = 0;
        this.level = 0;
        this.shape = {};
        this.next = null;
        this.mSeconds = 1000;
       
    };

    set_Score() {
        const scores = document.getElementById("score")
        this.score = score;
    }
    set_Level() {
        const level = document.querySelector("#level");
        this.level = level;
    }
    set_highScore() {
        const highscore = document.querySelector("#highscore");
        this.highscore = highscore;
    }
    set_next() {
        const next = document.querySelector("#next");
        this.next = next;
    }

    unDraw() {
        for (let i = 0; i < this.shape.rows.length; i++) {
            this.tetrisTable[this.shape.rows[i]][this.shape.columns[i]].style = "background-color : black";
        }
    }
    draw() {
        for (let i = 0; i < this.shape.rows.length; i++) {
            this.tetrisTable[this.shape.rows[i]][this.shape.columns[i]].style.backgroundColor = `${this.shape.color}`
        }
    }
    checkLeft() {
        let nextColumns = this.shape.columns.map(element => element - 1);

        for (let i = 0; i < nextColumns.length; i++) {
            if (nextColumns[i] < 0) {
                return false
            }
        }

        for (let i = 0; i < this.shape.columns.length; i++) {
            if (this.tetrisTable[this.shape.rows[i]][nextColumns[i]].style.backgroundColor !== "black") {
                console.log("RAN")
                return false;
            }
        }
        return true;
    }

    checkRight() {
        let nextColumns = this.shape.columns.map(element => element + 1);

        for (let i = 0; i < nextColumns.length; i++) {
            if (nextColumns[i] > 9) {
                return false
            }
        }

        for (let i = 0; i < this.shape.columns.length; i++) {
            if (this.tetrisTable[this.shape.rows[i]][nextColumns[i]].style.backgroundColor !== "black") {
                return false;
            }
        }
        return true;
    }


    shouldContinue() {
       
        let nextRow = this.shape.rows.map(element => element + 1);
        for (let i = 0; i < nextRow.length; i++) {
            
            if (nextRow[i] === 20) {
                return false
            }
            if (this.tetrisTable[nextRow[i]][this.shape.columns[i]].style.backgroundColor !== "black") {
               
                return false;
            }
        }
   
        return true;
    }

    randomNumber() {
        return Math.floor(Math.random() * 5 + 1)
    }

    initShape(func) {
        const result = func();

        switch (result) {
            case 1:
                this.shape = new Shape("straight");
                this.shape.color = this.shape.colors[result];
                this.shape.rows.push(0, 0, 0, 0);
                this.shape.columns.push(3, 4, 5, 6);
                
                break;
            case 2:
                this.shape = new Shape("square")
                this.shape.color = this.shape.colors[result];
                this.shape.rows.push(0, 0, 1, 1);
                this.shape.columns.push(4, 5, 4, 5);
                break;
            case 3:
                this.shape = new Shape("T");
                this.shape.color = this.shape.colors[result];
                this.shape.numberOfRotates = 0;
                this.shape.rows.push(0, 0, 0, 1);
                this.shape.columns.push(3, 4, 5, 4);
                break;
            case 4:
                this.shape = new Shape("L");
                this.shape.color = this.shape.colors[result];
                this.shape.numberOfRotates = 0;
                this.shape.rows.push(0, 1, 2, 2);
                this.shape.columns.push(4, 4, 4, 5);
                break;
            case 5:
                this.shape = new Shape("skew");
                this.shape.color = this.shape.colors[result];
                this.shape.numberOfRotates = 0;
                this.shape.rows.push(0, 0, 1, 1)
                this.shape.columns.push(3, 4, 4, 5)
                break;
            default:
                console.log("It s fucked");
        }
    }

    initTable() {
        for (let i = 0; i < 20; i++) {
            const columnElement = document.createElement("div");
              this.tetrisTable[i] = columnElement;

            for (let j = 0; j < 10; j++) {
                const rawElement = document.createElement("span");
                this.tetrisTable[i][j] = rawElement;
               
               columnElement.appendChild(rawElement);
                rawElement.style.backgroundColor = "black";
            }
            table.appendChild(columnElement);
            
        }
        this.set_Score();
        this.set_Level();
        this.set_next();
        this.set_highScore();
        
    }

    checkAtStartGame() {
        for (let i = 0; i < this.shape.rows.length; i++) {
            if (this.tetrisTable[this.shape.rows[i]][this.shape.columns[i]].style.backgroundColor !== "black") {
                return true;
            }
        }
    }


    gameOver() {
       
        const checkBottom = this.checkAtStartGame();
        if (checkBottom) {
            container.classList.add("divToRemove")
            
            const h1 = document.createElement("h1");
            const h2 = document.createElement("h2");

            setTimeout(() => {
                document.body.removeChild(container)
                h1.innerText = "Try Again";
                document.body.appendChild(h1)
            }, 2001)
            clearInterval(test1)
        }
        return 0;
    }

    startGame() {
            this.initShape(this.randomNumber);
            this.gameOver();
            this.draw();
    }

    moveLeft() {
        this.unDraw();

        const result = this.checkLeft();
        if (result) {
            for (let i = 0; i < this.shape.columns.length; i++) {
                this.shape.columns[i] = this.shape.columns[i] - 1;
                this.tetrisTable[this.shape.rows[i]][this.shape.columns[i]].style.backgroundColor = `${this.shape.color}`;
            }
        } else {
            this.draw();
        }
    }

    moveRight() {
        this.unDraw();
        const result = this.checkRight();
        if (result) {
            for (let i = 0; i < this.shape.columns.length; i++) {
                this.shape.columns[i] = this.shape.columns[i] + 1;
                this.tetrisTable[this.shape.rows[i]][this.shape.columns[i]].style.backgroundColor = `${this.shape.color}`;
            }
        } else {
            this.draw();
        }
    }

    removeRows(arr) {
        arr.forEach(element => {
                table.removeChild(table.children[element])
                this.tetrisTable.splice(element, 1)
            
        });
        let newTetrisTable = [];


        for (let i = 0; i < arr.length; i++) {
            const newRow = document.createElement("div");
            newTetrisTable[i] = newRow;
            for (let j = 0; j < 10; j++) {
                const span = document.createElement("span");
                newTetrisTable[i][j] = span
                span.style.backgroundColor = "black";
                newRow.appendChild(span);
            }
            table.prepend(newRow)
        }
        const arrayToAppend = newTetrisTable.reverse();


        this.tetrisTable.forEach(element => arrayToAppend.push(element));
        this.tetrisTable = arrayToAppend

 }
   
    moveDown() {
        
        this.unDraw();
        const test = this.shouldContinue();
       
        if (test) {
            this.shape.rows = this.shape.rows.map(element => element + 1);
            this.draw();
        } else {
            this.draw();

            const checkBingo = this.checkRowsToRemove();

            if (checkBingo.length) {
                this.removeRows(checkBingo);
            }
            this.startGame();
        }

    }

    rotate() {
        if (this.shape.name === "straight") {
            this.unDraw();
            const test = this.shouldContinue();
            if (test) {
                if (this.shape.rows[0] === this.shape.rows[1]) {

                    let minColumns = this.shape.columns[0];

                    for (let i = 0; i < this.shape.rows.length; i++) {
                        this.tetrisTable[this.shape.rows[i]][this.shape.columns[i]].style.backgroundColor = "black";
                        this.shape.rows[i] = this.shape.rows[i] + i;
                        this.shape.columns[i] = minColumns;
                        this.tetrisTable[this.shape.rows[i]][this.shape.columns[i]].style.backgroundColor = `${this.shape.color}`;
                    }
                } else {

                    for (let i = 0; i < this.shape.rows.length; i++) {
                        this.tetrisTable[this.shape.rows[i]][this.shape.columns[i]].style.backgroundColor = "black";
                        this.shape.rows[i] = this.shape.rows[0];
                        this.shape.columns[i] = this.shape.columns[i] + i;
                        this.tetrisTable[this.shape.rows[i]][this.shape.columns[i]].style.backgroundColor = `${this.shape.color}`;
                    }
                }
            } else {
                console.log("can t rotate the straight")
                this.draw();
            }
            
            
        } else {
            let startRows = Math.min(...this.shape.rows);
            let startColumns = Math.min(...this.shape.columns);

            const prevRows = this.shape.rows;
            const prevColumns = this.shape.columns;


            let matrix = [];

            if (startRows > 15) {
                console.log("Can t be done!");
            } else {
                for (let x = 0, i = startRows; i < startRows + 3; x++, i++) {
                    matrix[x] = [];
                    for (let y = 0, j = startColumns; j < startColumns + 3; y++, j++) {
                        if (this.tetrisTable[i][j].style.backgroundColor === `${this.shape.color}`) {
                            matrix[x].push(1);
                        } else {
                            matrix[x].push(0);
                        }
                    }
                }

                function rotateMatrix(N, mat) {
                    for (let x = 0; x < N / 2; x++) {
                        for (let y = x; y < N - x - 1; y++) {
                            let temp = mat[x][y];
                            mat[x][y] = mat[y][N - 1 - x];
                            mat[y][N - 1 - x] = mat[N - 1 - x][N - 1 - y];
                            mat[N - 1 - x][N - 1 - y] = mat[N - 1 - y][x];
                            mat[N - 1 - y][x] = temp;
                        }
                    }
                }

                

                rotateMatrix(3, matrix);

                this.unDraw();

                this.shape.rows = [];
                this.shape.columns = [];

                let swap = true;

                for (let x = 0, i = startRows; i < startRows + 3; x++, i++) {
                    for (let y = 0, j = startColumns; j < startColumns + 3; y++, j++) {
                        if (matrix[x][y] === 1) {
                            this.shape.rows.push(i)
                            this.shape.columns.push(j);
                        }
                        if (this.tetrisTable[i][j].style.backgroundColor === `${this.shape.color}`) {
                            swap = false;
                        }
                    }
                }
                if (swap) {
                    
                    this.draw();
                } else {
                    
                    this.shape.rows = prevRows
                    this.shape.columns = prevColumns;
                    this.draw();
                }
            }
        }

    }

    checkRowsToRemove() {
        let rowsToRemove = [];
       
        let rows = new Set([... this.shape.rows.reverse()]);


        for (let it = rows.values(), val = null; val = it.next().value;) {
            let counter = 0;
            for (let i = 0; i < 10; i++) {

                this.shape.colors.forEach(element => {
                if (this.tetrisTable[val][i].style.backgroundColor === `${element}`) {
                    counter++;
                    if (counter === 10) {
                        rowsToRemove.push(val);
                    }
                };
                })
            }
        }
        for (let i = 0; i < rowsToRemove.length; i++) {
            this.incrementScore();
        }
        
        return rowsToRemove;
    }

    incrementScore() {
        this.score.innerText =  +this.score.innerText + 10;
        if (+this.score.innerText % 100 === 0) {
            console.log("Ran increment score")
            this.incrementLevel();
        }
    }
   
    incrementLevel() {
        
        this.level.innerText++;
        console.log("ran")
        clearInterval(test1)
        this.mSeconds = this.mSeconds - 50;
        test1 = setInterval(() => { this.moveDown() }, this.mSeconds)
    }
}
    



const test = new Tetris();


btn.addEventListener("click", () => {
    btn.style = "display:none"
    table.style = "display: block";
    tableInfo.style = "display: initial"
    test.initTable();
    test.startGame();
    
});



window.addEventListener("keypress", (e) => {

    switch (e.code) {
        case "KeyA":
            test.moveLeft();
            break;
        case "KeyD":
            test.moveRight();
            break;
        case "KeyS":
            test.moveDown();
            break;
        case "Space":

            test.rotate();

            break;
        default:
            console.log("!!!")
    }
})

let test1 = setInterval(() => {
    test.moveDown();
}, 1000)