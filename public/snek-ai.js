var msg = document.getElementById('msg');
var score_lbl = document.getElementById('score');

// table generation -- dun dun duuunnnn
var tbl = document.getElementById('table');
var tbdy = document.createElement('tbody');
var width = 24;
var height = 14;
for (var i = 0; i < height; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < width; j++) {
            var td = document.createElement('td');
            var img = new Image(32,32);
            img.setAttribute("id", j+","+i);
            if(i == 0 || j == 0 || i == height-1 || j == width-1){
                img.src = 'blacksquare.png';
            }
            else{
                img.src = 'blanksquare.png';
            }
            td.appendChild(img)
            tr.appendChild(td)
    }
    tbdy.appendChild(tr);
}
tbl.appendChild(tbdy);

document.getElementById('resetButton').onclick = reset;

// define some variables
var apple_start = '15,9';
var apple = apple_start; 
document.getElementById(apple).src = 'redsquare.png';
var grow = false;
var move_queue = ['E'];
var gameover = false;

var speed = 50;
document.getElementById('speed').value = 1000/speed;

var score = 0;
var border_img = 'blacksquare.png';
var head_img = 'greensquare.png';
var head_img1 = 'greensquare.png';
var head_img2 = 'greensquare.png';
var apple_img = 'redsquare.png';

// Snek object
function Snek() {
    class Snek {
        constructor() {
            this.dir = 'E';
            var start = 6;
            this.trail = [3+start+',9', 2+start+',9', 1+start+',9', start+',9'];
            // this.trail = [];
            // for (var i = 10; i < 15; i++) {
            //     for (var j = 1; j < 14; j++) {
            //         this.trail.push(''+i+','+j);
            //     };
            // };
            this.length = this.trail.length;
            for (var i = 1; i < this.trail.length; i++) {
                document.getElementById(this.trail[i]).src = 'greensquare.png';
            };
            document.getElementById(this.trail[0]).src = head_img;
        }
        add(dir){
            if(dir == 'W') head_img = head_img2;
            if(dir == 'E') head_img = head_img1;
            this.dir = dir;
            var head = this.trail[0].split(',');
            var ahead = '';
            if(dir == 'E')
                ahead = (parseInt(head[0])+1)+','+head[1];
            if(dir == 'W')
                ahead = (parseInt(head[0])-1)+','+head[1];
            if(dir == 'N')
                ahead = head[0]+','+(parseInt(head[1])-1);
            if(dir == 'S')
                ahead = head[0]+','+(parseInt(head[1])+1);
            head = ahead.split(',');

            if(head[0] == 0 || head[1] == 0 || head[0] == width-1 || head[1] == height-1
                || this.trail.includes(ahead)){
                gameover = true;
                grow = true;
                clearInterval(intervalId);
                msg.innerHTML = 'GAMEOVER: press [space] or [enter] to restart';
                return;
            }
            var ate = false;
            while(ahead == apple || this.trail.includes(apple)){
                var x = Math.floor(Math.random() * (width - 2)) + 1;
                var y = Math.floor(Math.random() * (height - 2)) + 1;
                apple = x+','+y;
                ate = true;
            }
            if(ate == true){
                document.getElementById(apple).src = apple_img;
                score++;
                this.length++;
                grow = true;
                score_lbl.innerHTML = 'Score: ' + score;
            }
            document.getElementById(this.trail[0]).src = 'greensquare.png';
            this.trail.unshift(ahead);
            document.getElementById(ahead).src = head_img;
        }
        remove(){
            document.getElementById(this.trail.pop()).src = 'blanksquare.png';
        }
    }
    return new Snek();
}

var s = Snek();

function getNewHead(head, move){
    var newHead = '';
    if(move == 'E')
        newHead = (head[0]+1)+','+head[1];
    if(move == 'W')
        newHead = (head[0]-1)+','+head[1];
    if(move == 'N')
        newHead = head[0]+','+(head[1]-1);
    if(move == 'S')
        newHead = head[0]+','+(head[1]+1);
    return newHead
}

var grid = []

for (var i = 0; i < width; i++) {
    var row = [];
    for (var j = 0; j < height; j++) {
        row.push([i,j,0]);
    }
    grid.push(row);
}

function clearGrid(){
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid[i].length; j++){
            grid[i][j][2]=0;
        }
    }
}

function getNeighbours(loc){
    var x = parseInt(loc[0]);
    var y = parseInt(loc[1]);
    var neighbours = []
    if(x>1)
        neighbours.push(grid[x-1][y])
    if(x<width-2)
        neighbours.push(grid[x+1][y])
    if(y>1)
        neighbours.push(grid[x][y-1])
    if(y<height-2)
        neighbours.push(grid[x][y+1])
    return neighbours;
}

function bfs(start){
    var queue = [];
    var count = 0;
    queue.push(grid[start[0]][start[1]]);
    queue[0][2]=1;
    while(queue.length > 0){
        var c = queue.shift();
        var neighbours = getNeighbours(c);
        for(var i = 0; i < neighbours.length; i++){
            if(neighbours[i][2] == 0 && 
                !s.trail.includes(neighbours[i][0]+','+neighbours[i][1])){
                neighbours[i][2] = 1;
                queue.push(neighbours[i]);
            }
        }
        count++;
    }
    clearGrid();
    return count;
}

function getHeadArray(s){
    var stringArray = s.split(',');
    return [parseInt(stringArray[0]),parseInt(stringArray[1])];
}

function willKill(head, move){
    var newHead = getNewHead(head, move);
    var newHeadArr = getHeadArray(newHead);
    return (newHeadArr[0] == 0 || newHeadArr[1] == 0 || newHeadArr[0] == width-1 
        || newHeadArr[1] == height-1 || s.trail.includes(newHead));
}

function isEdge(head, move){
    var newHead = getNewHead(head, move);
    var newHeadArr = getHeadArray(newHead);
    return (newHeadArr[0] == 1 || newHeadArr[1] == 1 || newHeadArr[0] == width-2 
        || newHeadArr[1] == height-2);
}

var allDirections = ['N', 'E', 'S', 'W'];

function swap(list, i, j){
    var temp = list[i];
    list[i] = list[j];
    list[j] = temp;
}

function getTargetDirections(head, target){
    var directions = [];
    if(head[0]>target[0]){
        directions.push('W');
    }
    if(head[0]<target[0]){
        directions.push('E');
    }
    if(head[1]>target[1]){
        directions.push('N');
    }
    if(head[1]<target[1]){
        directions.push('S');
    }
    // prefer the same direction over turning
    if(directions.length > 1 && s.dir == directions[1]){
        swap(directions,0,1);
    }
    return directions;
}

function addOtherDirections(directions){
    for(var i = 0; i < allDirections.length; i++){
        var dir = allDirections[i];
        if(!directions.includes(dir)){
            directions.push(dir);
        }
    }
}

function removeDirectionsThatKill(directions, head){
    for(var i = 0; i < directions.length; i++){
        var dir = directions[i];
        if(willKill(head, dir)){
            directions.splice(i, 1);
            i--;
        }
    }
}

function getSpaceForMove(head, move){
    var newHead = getNewHead(head, move);
    var newHeadArr = getHeadArray(newHead);
    var spaceCount = bfs(newHeadArr);
    return spaceCount;
}

function favorNotGettingBoxedIn(directions, head){
    var totalSquaresLeft = (width-2)*(height-2)-s.length;
    var pairs = [];
    var maxSpace = 0;
    var maxIndex = 0;
    for(var i = 0; i < directions.length; i++){
        var dir = directions[i];
        var spaces = getSpaceForMove(head, dir);
        if(i == 0 && spaces == totalSquaresLeft){
            return;
        }
        pairs.push(spaces);
        if(spaces > maxSpace){
            maxSpace = spaces;
            maxIndex = i;
        }
    }
    if (maxIndex != 0 && (pairs[0] < s.length + 10)) {
        directions.unshift(directions.splice(maxIndex, 1)[0]);
    }
}

function targetIsInFront(head, target, move){
    if(move == 'W'){
        return head[0]-target[0] == 1 && head[1] == target[1];
    }
    if(move == 'E'){
        return head[0]-target[0] == -1 && head[1] == target[1];
    }
    if(move == 'N'){
        return head[1]-target[1] == 1 && head[0] == target[0];
    }
    if(move == 'S'){
        return head[1]-target[1] == -1 && head[0] == target[0];
    }
}

function canMoveToTarget(head, target, dir){
    var newHead = getNewHead(head, dir);
    var newHeadArr = getHeadArray(newHead);
    var targetDirections = getTargetDirections(newHeadArr, target);

    if (!willKill(newHeadArr, targetDirections[0]) || (targetDirections.length > 1 && !willKill(newHeadArr, targetDirections[1]))){
        return true;
    }
    return false;
}

function favorPathingToApple(directions, head, target){
    for(var i = 0; i < directions.length; i++){
        var dir = directions[i];
        if(canMoveToTarget(head, target, dir)){
            directions.unshift(directions.splice(i, 1)[0]);
            return;
        }
    }
}

function hasClearPathToTarget(head, target, dir){
    var newHead = getNewHead(head, dir);
    var newHeadArr = getHeadArray(newHead);
    var targetDirections = getTargetDirections(newHeadArr, target);

    for (var i = 0; i < targetDirections.length; i++){
        var targetDir = targetDirections[i];
        if(targetDir == 'E'){
            var failed = false;
            for(var x = newHeadArr[0]; x < target[0]; x++){
                if(s.trail.includes(x+','+newHeadArr[1])){
                    failed = true;
                    break;
                }
            }
            if(!failed) return true;
        }
        if(targetDir == 'W'){
            var failed = false;
            for(var x = newHeadArr[0]; x > target[0]; x--){
                if(s.trail.includes(x+','+newHeadArr[1])){
                    failed = true;
                    break;
                }
            }
            if(!failed) return true;
        }
        if(targetDir == 'S'){
            var failed = false;
            for(var y = newHeadArr[1]; y < target[1]; y++){
                if(s.trail.includes(newHeadArr[0]+','+y)){
                    failed = true;
                    break;
                }
            }
            if(!failed) return true;
        }
        if(targetDir == 'N'){
            var failed = false;
            for(var y = newHeadArr[1]; y > target[1]; y--){
                if(s.trail.includes(newHeadArr[0]+','+y)){
                    failed = true;
                    break;
                }
            }
            if(!failed) return true;
        }
    }
    
    return false;
}

function unfavorEdgeSpaces(directions, head, target){
    var i = 0
    for(var j = 0; j < directions.length; j++){
        var dir = directions[i];
        if(isEdge(head, dir) && !targetIsInFront(head, target, dir) && !hasClearPathToTarget(head, target, dir)){
            directions.push(directions.splice(i, 1)[0]);
        }
        else{
            i++;
        }
    }
}

function getNextMove(){
    var target = getHeadArray(apple);
    var head = getHeadArray(s.trail[0]);
    var targetDirections = getTargetDirections(head, target);
    var possibleDirections = getTargetDirections(head, target);
    addOtherDirections(possibleDirections);
    removeDirectionsThatKill(possibleDirections, head);
    if (!targetDirections.includes(possibleDirections[0])){
        favorPathingToApple(possibleDirections, head, target);
    }
    unfavorEdgeSpaces(possibleDirections, head, target);
    favorNotGettingBoxedIn(possibleDirections, head);
    // dont make boxes at all - if possible

    var move = possibleDirections[0];
    return move;
}

function move(){
    if (window.location.hash.endsWith('/snek-ai')){
        var newDir = getNextMove();
        s.add(newDir);
        if(grow == false)
            s.remove();
        else
            grow = false;
    }
}

function reset(){
    clearInterval(intervalId);
    for (var i = 1; i < height-1; i++) {
        for (var j = 1; j < width-1; j++) {
            document.getElementById(j+','+i).src = 'blanksquare.png';
        }
    }
    s = new Snek();
    move_queue = ['E'];
    grow = false;
    gameover = false;
    apple = apple_start;
    document.getElementById(apple).src = apple_img;
    score = 0;
    msg.innerHTML = '';
    score_lbl.innerHTML = 'Score: 0';
    var den = parseInt(document.getElementById('speed').value);
    if(den <= 0 || isNaN(den)) den = 6;
    speed = parseInt(1000/den);
    intervalId = window.setInterval(move, speed);
}

var intervalId = window.setInterval(move, speed);

document.addEventListener('keydown', function(event) {
    if((event.keyCode == 13 || event.keyCode == 32) && gameover == true) {
        reset();
    }
});
