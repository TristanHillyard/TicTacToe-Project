//Keeps track of who's turn it is. 
let activePlayer = 'X';
//This array stores an array of moves, determines win conditions.
let selectedSquares = [];

//Function is for placing an x or o in a square
function placeXOrO(squareNumber) {
    //Condition ensures a square hasn't been selected already. 
    //.some() is used to check each element of selectedSquares array to see if it contains the square number clicked on
    if(!selectedSquares.some(element => element.includes(squareNumber))) {
        //variable retreives the html element id that was clicked. 
        let select = document.getElementById(squareNumber);
        //condition checks who's turn it is
        if(activePlayer === 'X') {
            //if activeplayer is = to x, the x.png is placed in the html
            select.style.backgroundImage = 'url("images/basketball.png")';
        } else {
            //if activeplayer is = o, the o.png is placed in the html
            select.style.backgroundImage = 'url("images/soccer.png")';
        }

        //squarenumber and activeplayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        //This calls a function to check for any win conditions.
        checkWinConditions();
        //This condition is for changing the active player
        if(activePlayer ==='X') {
            //if active player is x change it to o
            activePlayer = 'O';
            // if active player is anything other than 'x'
        } else {
            //change activeplayer to x
            activePlayer = 'X';
        }
        //this function plays sounds 
        audio('./media/xsound.mp3');
        //condition checks to see if it is computers turn
        if (activePlayer === 'O'){
            //disables clicking for computer choice
            disableClick();
            //function waits 1 second before placing the image
            //and enabling click. 
            setTimeout(function () { computersTurn();}, 1000);
        }
        //Returnign true is needed for our computersTurn() function to work. 
        return true;
    }

    function computersTurn() {
        //This boolean is neeeded for our while loop
        let success = false;
        //this variable stores arandom number 0-8
        let pickASquare;
        //this condition allows our while loop to keep trying if a square is selected already
        while(!success) {
            //A random number between 0 and 8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            //If the random number evaluates returns true, the square hasn't been selected yet.
            if (placeXOrO(pickASquare)) {
                //This line calls the function
                placeXOrO(pickASquare);
                //this changes our boolean and ends the loop
                success = true;
            };
        }
    }
}

function checkWinConditions() {
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); }
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304); }
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); }
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); }
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558); }
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); }
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); }
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); }
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100); }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558); }
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); }
    else if (selectedSquares.length >=9) {
        //This function plays the tie game sound
        audio('./media/osound.mp3');
        //This function sets a .3 second timer before the resetGame is called
        setTimeout(function() { resetGame(); }, 1000);
    }

    //this function checks if an array includes 3 strings
    //it is used to check for each win condition
    function arrayIncludes(squareA, squareB, squareC) {
        //the next 3 variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //If the 3 variables we pass are all included in our array true is
        //returned and our else if condition executes the drawWinLine function
        if (a === true && b === true && c === true) { return true;}
    }
}

//This function makes our body element temporarily unclickable
function disableClick() {
    //This makes our body unclickable
    body.style.pointerEvents = 'none';
    //This makes our body clickable again after 1 second
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

//This function takes a string parameter of the path you set eariler for
//placement sound tie
function audio(audioURL) {
    //We create a new audio object and we pass teh path as a parameter.
    let audio = new Audio(audioURL);
    //Play method plays our audio sound
    audio.play();
}

//this function utilizes html canvas to draw win lines
function drawWinLine(coordX1, corrdY1, coordX2, coordY2) {
    //this line accesses our html canvas element
    const canvas = document.getElementById('win-lines');
    //this line gives us access to methods and properties to use on canvas
    const c = canvas.getContext('2d');
    //this line indicates where the start of a lines x axis is.
    let x1 = coordX1,
        y1 = corrdY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;
        //This explains where the line starts and ends
        //function interacts with the canvas
    function animateLineDrawing() {
        //this variable creates the loop for when the game ends it restarts
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //This method clears content from last loop iteration.
        c.clearRect(0, 0, 608, 608);
        //This method starts a new path
        c.beginPath();
        //this moves us to a starting point in our line
        c.moveTo(x1, y1);
        //indicates the end point in our line
        c.lineTo(x, y);
        //set the width of our line
        c.lineWidth = 10;
        //sets the color of our line
        c.strokeStyle = 'rgba(70,255,33,.8';
        //draws everything we laid out above
        c.stroke();
        //this condition checks if we've reached the endpoint. 
        if (x1 <= x2 && y1 <= y2) {
            //this condition adds 10 to the previous end x point
            if (x < x2) { x += 10;}
            //adds 10 to the previous end y point
            if (y < y2) { y += 10;}
            //cancels our animation loop if reach the end points
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop);}
        }
        //This condition is similar to the one above. 
        //it was necessary for the 6,4,2 win condition
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10;}
            if (y > y2) { y -= 10;}
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop);}
        }
    }
    //this function clears our canvas after our win line is drawn. 
    function clear() {
        //this line starts our animation
        const animationLoop = requestAnimationFrame(clear);
        //this line clears our canvas
        c.clearRect(0, 0, 608, 608);
        //this line stops our animation loop
        cancelAnimationFrame(animationLoop);
    }
    //this line disallows clicking while the win sound is playing
    disableClick();
    //this line plays the win sounds
    audio('/media/win.mp3');
    //this line calls our main animation loop
    animateLineDrawing();
    //this line waits 1 second
    //then clears canvas, resets game, and allows clicking again
    setTimeout(function() { clear(); resetGame(); }, 1000);
}
//this function resets the game in a tie or a win
function resetGame() {
    //this for loop iterates through the html square element 
    for (let i = 0; i < 0; i++) {
        //this variable gets the html element of i
        let square = document.getElementById(String(i));
        //this removes our elements backgroundImage
        square.style.backgroundImage= '';
    }
    //This resets our array so it is empty and we can start over.
    selectedSquares = [];
} 