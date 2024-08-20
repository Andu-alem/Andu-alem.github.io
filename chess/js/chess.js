var chessBoard = [];
var movingPiece = null;
var selectedElementId = "";
var pieces = [];
var playerOneGain = [];
var playerTwoGain = [];
var isPlayerOneTurn = true;
var piecesMadeFirstMove = [];
var isItFirstMove = true;
var full_random_move = "ON";
var playerOnePieces = ["p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "h11", "h12", "c11", "b11", "q1", "k1", "b12", "c12"];
var playerTwoPieces = ["p21", "p22", "p23", "p24", "p25", "p26", "p27", "p28", "h21", "h22", "c21", "b21", "q2", "k2", "b22", "c22"];


boardSetup();

function playerOne(boxId, allPieces, childPiece, promotedPiece){
    pieces = allPieces;
    let newPos = boxId;

    updatePromotion(promotedPiece)
    setUp(pieces, chessBoard, piecesMadeFirstMove, playerOnePieces, playerTwoPieces, isPlayerOneTurn)
    if(childPiece !== null){
        // if there is a piece in the board box
        if(movingPiece === null){
            let whichPlayer = whichPlayerPiece(childPiece.id);
                if(isPlayerOneTurn && whichPlayer !== "player1"){
                alert("Not Player Two Turn");
                
            }else if(!isPlayerOneTurn && childPiece.player === "player1"){
                alert("Not Player One Turn");
                
            }else{
                selectedElementId = boxId;
                movingPiece = {
                    id : childPiece.id,
                    name : childPiece.name,
                    position: newPos,
                    player: childPiece.player
                }
            }
        }else{
            if(selectedElementId === boxId){
                //if same piece clicked twice          
                movingPiece = null;
                selectedElementId = "";
            }else if(movingPiece.player === whichPlayerPiece(childPiece.id)){
                //to block making move on own's piece
                selectedElementId = boxId;
                movingPiece = {
                    id : childPiece.id,
                    name : childPiece.name,
                    position: newPos,
                    player : childPiece.player
                }
            }else{
                let eliminationOption = eliminationMove(movingPiece, newPos, childPiece);
                if(eliminationOption !== null){
                    if (eliminationOption.checkMate !== undefined) {
                        return gameOver()

                    } else if (eliminationOption.movingPiece !== null) {
                        return move(eliminationOption.movingPiece, eliminationOption.pieceId, eliminationOption.move_to, eliminationOption.toBeEliminatedPieceId);
                    }
                }else{
                    alert("Move not allowed 7")
                    movingPiece = null;
                }
            }
        }
    }else{
        if(movingPiece !== null){
            let normalMoveOption = normalMove(movingPiece, newPos, childPiece);
            if(normalMoveOption !== null){
                if (normalMoveOption.checkMate !== undefined) {
                    return gameOver()

                } else if (normalMoveOption.castelingMove !== undefined) {
                    return castelingOption(normalMoveOption.castelingMove)
                } else if (normalMoveOption.movingPiece !== null) {
                    return move(normalMoveOption.movingPiece, normalMoveOption.pieceId, normalMoveOption.move_to, normalMoveOption.toBeEliminatedPieceId);
                }
            }else{
                alert("Move not allowed 4");
                movingPiece = null;
            }
        }
    }
}

// computer player program.....

function computer(allPieces, promotedPiece){
    pieces = allPieces;
    //console.log("pieces - ", pieces)
    updatePromotion(promotedPiece);
    setUp(pieces, chessBoard, piecesMadeFirstMove, playerOnePieces, playerTwoPieces, isPlayerOneTurn);
    
    if(isItFirstMove){
        let moveOne = firstMove()
        isItFirstMove = false;
        return move(moveOne.piece, moveOne.pieceId, moveOne.move_to);
    } else {
        let kingUnderThreat = kingUnderThreatMove(pieces);
        if (kingUnderThreat !== null){

            if (castelingMove() !== null) {
                return castelingOption(castelingMove().castelingMove)
            } else if (kingUnderThreat.isCheckMate === undefined) {
                return move(kingUnderThreat.piece, kingUnderThreat.pieceId, kingUnderThreat.move_to, kingUnderThreat.toBeEliminatedPieceId);
            } else {
                return gameOver()
            }

        } else {
            let eliminationMovePiece = opponentEliminationMove();
            if(eliminationMovePiece !== null){
                return move(eliminationMovePiece.piece, eliminationMovePiece.pieceId, eliminationMovePiece.move_to, eliminationMovePiece.toBeEliminatedPieceId);
            } else {
                let pieceUnderThreat = pieceUnderThreatMove();
                if (pieceUnderThreat !== null) {
                    return move(pieceUnderThreat.piece, pieceUnderThreat.pieceId, pieceUnderThreat.move_to, pieceUnderThreat.toBeEliminatedPieceId);
                }
                
                let trapMoveOption = trapMove();
                if(trapMoveOption !== null){
                   return move(trapMoveOption.piece, trapMoveOption.pieceId, trapMoveOption.move_to, trapMoveOption.toBeEliminatedPieceId);
                }else{
                    if (eliminationMovePiece === null) {
                        let pawnEliminationMove = opponentPawnEliminationMove();
                        if (pawnEliminationMove !== null) {
                            return move(pawnEliminationMove.piece, pawnEliminationMove.pieceId, pawnEliminationMove.move_to, pawnEliminationMove.toBeEliminatedPieceId);
                        }
                    }
                    if (castelingMove() !== null) {
                        return castelingOption(castelingMove().castelingMove)
                    }
                    //choosing a move randomly
                    let randomOption = randomMove(full_random_move);
                    full_random_move === "ON" ? full_random_move = "OFF" : full_random_move = "ON";
                    if (randomOption !== null) {
                        return move(randomOption.piece, randomOption.pieceId, randomOption.move_to, randomOption.toBeEliminatedPieceId);
                    }                    
                }
            }
        }           
    }
    let fallbackOption = fallbackMove()
    if (fallbackOption !== null) {
        return move(fallbackOption.piece, fallbackOption.pieceId, fallbackOption.move_to, fallbackOption.toBeEliminatedPieceId);
    } else {
        return gameOver()
    }
}

function castelingOption(casteling_move) {
    let castelingMove = casteling_move
    let casteling = [
        move(castelingMove[0].piece, castelingMove[0].pieceId, castelingMove[0].move_to, castelingMove[0].toBeEliminatedPieceId),
        move(castelingMove[1].piece, castelingMove[1].pieceId, castelingMove[1].move_to, castelingMove[1].toBeEliminatedPieceId)
    ]
    isPlayerOneTurn = !isPlayerOneTurn;
    return {
        castelingMove : casteling
    }
}

function move(pieceToBeMoved, movingPieceId, nextPosition, pieceToBeEliminatedID = "") {
    if (pieceToBeEliminatedID !== "") {

        if(isPlayerOneTurn){
            playerOneGain.push(pieceToBeEliminatedID);
            playerTwoPieces = playerTwoPieces.filter(function(item){
                return item !== pieceToBeEliminatedID;
            });
        }else {
            playerTwoGain.push(pieceToBeEliminatedID);
            playerOnePieces = playerOnePieces.filter(function(item){
                return item !== pieceToBeEliminatedID;
            });
        }
        if (pieceToBeEliminatedID === "k1" || pieceToBeEliminatedID === "k2") {
            isPlayerOneTurn = !isPlayerOneTurn;
            return gameOver();
        }
    }
    if (piecesMadeFirstMove.indexOf(movingPieceId) === -1) {
        piecesMadeFirstMove.push(movingPieceId);
    }

    let promotionAllowed = false;
    if (pieceToBeMoved.name === "pawn") {
            let nextPositionIndex = chessBoard.indexOf(nextPosition) + 1;
            if (isPlayerOneTurn) {
                if (nextPositionIndex % 8 === 0) {
                    promotionAllowed = true
                } 
            } else{
                if (nextPositionIndex % 8 === 1) {
                    promotionAllowed = true
                }
            }
        }

    let data = {
        movingPieceId : movingPieceId,
        moveTo : nextPosition,
        moveFrom : pieceToBeMoved.position,
        eliminatedPieceID : pieceToBeEliminatedID,
        gain : {
            playerOneGain : playerOneGain,
            playerTwoGain : playerTwoGain
        },
        promotionAllowed : promotionAllowed
    }
    
    isPlayerOneTurn = !isPlayerOneTurn;
    movingPiece = null
    return data
}

function whichPlayerPiece(piece_id){
    return pieces[piece_id].player;
}

function boardSetup(){
    for (var i = 1; i < 65; i++) {
        if(i<9){
            chessBoard.push("a"+i);
        }else if(i < 17){
            chessBoard.push("b"+(i-8));
        }else if(i < 25){
            chessBoard.push("c"+(i-16));
        }else if(i < 33){
            chessBoard.push("d"+(i-24));
        }else if(i < 41){
            chessBoard.push("e"+(i-32));
        }else if(i < 49){
            chessBoard.push("f"+(i-40));
        }else if(i < 57){
            chessBoard.push("g"+(i-48));
        }else{
            chessBoard.push("h"+(i-56));
        }
    }
}

function isKingOneInCheck(allPieces, newPosition=null){
    pieces = allPieces;
    let kingPosition = newPosition === null ? pieces["k1"].position : newPosition;
    let opponentPiece, piece_id;
    for (var i = 0; i < playerTwoPieces.length; i++) {
        piece_id = playerTwoPieces[i];
        opponentPiece = {
            id : "",
            position : pieces[piece_id].position,
            name : pieces[piece_id].name,
            player : pieces[piece_id].player
        }
        if(canGo(opponentPiece, kingPosition, false, true)){
            //dangereousPieceId = piece_id;
            return true;
        }
    }
    return false;
}

function gameOver() {
    isPlayerOneTurn = true;
    piecesMadeFirstMove = [];
    isItFirstMove = true;
    full_random_move = "ON";
    playerTwoGain = [];
    playerOneGain = [];
    playerOnePieces = ["p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "h11", "h12", "c11", "b11", "q1", "k1", "b12", "c12"];
    playerTwoPieces = ["p21", "p22", "p23", "p24", "p25", "p26", "p27", "p28", "h21", "h22", "c21", "b21", "q2", "k2", "b22", "c22"];

    return {
        checkMate : true
    }
}

function updatePromotion(promotedPiece) {
    if (promotedPiece !== undefined && promotedPiece.player === "player1") {
        if (playerOnePieces.indexOf(promotedPiece.to) === -1) {
            playerOnePieces.splice(playerOnePieces.indexOf(promotedPiece.id), 1, promotedPiece.to)
        }    
    } else if (promotedPiece !== undefined && promotedPiece.player === "player2") {
        if (playerTwoPieces.indexOf(promotedPiece.to) === -1) {
            playerTwoPieces.splice(playerTwoPieces.indexOf(promotedPiece.id), 1, promotedPiece.to)
        }
    }
}

function updateData(recoverdPOnePiece=null, recoverdPTwoPiece=null, newPOneGain=null, newPTwoGain=null, refreshPMadeFirstMove=false) {
    if (recoverdPOnePiece !== null) {
        playerOnePieces.push(recoverdPOnePiece);
    }
    if (recoverdPTwoPiece !== null) {
        playerTwoPieces.push(recoverdPTwoPiece);
    }
    if (newPOneGain !== null) {
        playerOneGain = newPOneGain;
    }
    if (newPTwoGain !== null) {
        playerTwoGain = newPTwoGain;
    }
    if (refreshPMadeFirstMove) {
        piecesMadeFirstMove = [];
    }

}

function allowedMoves(piece, piece_id){
    //returns array of allowed positions for a piece to move
    let allowedPositions = [];
    let positionOnBoard = board.indexOf(piece.position) + 1;
    let element = {
        id : piece_id,
        position : piece.position,
        name : piece.name,
        player: piece.player
    }
    if(piece.name === "pawn"){
        if(canGo(element, positionOnBoard - 1, isTheDivBoxEmpty(board[positionOnBoard-2])) && !hasVerticalBlock(positionOnBoard, positionOnBoard - 1)){
            allowedPositions.push(board[positionOnBoard - 2]);
        }
        if(piecesMadeFirstMove.indexOf(piece_id) === -1){
            if(canGo(element, positionOnBoard - 2, isTheDivBoxEmpty(board[positionOnBoard-3])) && !hasVerticalBlock(positionOnBoard, positionOnBoard - 2)){
                allowedPositions.push(board[positionOnBoard - 3]);
            }
        }
        if(canGo(element, positionOnBoard + 7, isTheDivBoxEmpty(board[positionOnBoard+6]))){
            allowedPositions.push(board[positionOnBoard + 6]);
        }
        if(canGo(element, positionOnBoard - 9, isTheDivBoxEmpty(board[positionOnBoard-10]))){
            allowedPositions.push(board[positionOnBoard - 10]);
        }
    }else if(piece.name === "knight"){
        if(canGo(element, positionOnBoard + 10)){
            allowedPositions.push(board[positionOnBoard + 9]);
        }
        if(canGo(element, positionOnBoard - 10)){
            allowedPositions.push(board[positionOnBoard - 11]);
        }
        if(canGo(element, positionOnBoard + 6)){
            allowedPositions.push(board[positionOnBoard + 5]);
        }
        if(canGo(element, positionOnBoard - 6)){
            allowedPositions.push(board[positionOnBoard - 7]);
        }
        if(canGo(element, positionOnBoard + 15)){
            allowedPositions.push(board[positionOnBoard + 14]);
        }
        if(canGo(element, positionOnBoard - 15)){
            allowedPositions.push(board[positionOnBoard - 16]);
        }
        if(canGo(element, positionOnBoard + 17)){
            allowedPositions.push(board[positionOnBoard + 16]);
        }
        if(canGo(element, positionOnBoard - 17)){
            allowedPositions.push(board[positionOnBoard - 18]);
        }
    }else if(piece.name === "bishop"){
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 7));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -7));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 9));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -9));
    }else if(piece.name === "rook"){
        allowedPositions = allowedPositions.concat(allowedHorizontalPositions(element, positionOnBoard));
        allowedPositions = allowedPositions.concat(allowedVerticalPositions(element, positionOnBoard));
    }else if(piece.name === "queen"){
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 7));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -7));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 9));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -9));
        allowedPositions = allowedPositions.concat(allowedHorizontalPositions(element, positionOnBoard));
        allowedPositions = allowedPositions.concat(allowedVerticalPositions(element, positionOnBoard));
    }else{
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 7, "king"));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -7, "king"));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 9, "king"));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -9, "king"));
        allowedPositions = allowedPositions.concat(allowedHorizontalPositions(element, positionOnBoard));
        allowedPositions = allowedPositions.concat(allowedVerticalPositions(element, positionOnBoard));
    }

    return allowedPositions;
}
function allowedDiagonalPositions(element, positionOnBoard, offset, piece=null){
    let positions = [];
    let tempPosition = positionOnBoard + offset;
    if(piece === null){
        while((0 < tempPosition) && (tempPosition < 65)){
            if(canGo(element, tempPosition)){
                positions.push(board[tempPosition - 1]);
            }
            tempPosition = tempPosition + offset;
        }
    }else{
        if(canGo(element, tempPosition)){
            positions.push(board[tempPosition - 1]);
        }
    }
    return positions;
}
function allowedHorizontalPositions(element, positionOnBoard){
    let positions = [];
    let tempPosition;
    tempPosition = positionOnBoard - 8;
    while(0 < tempPosition){
        if(canGo(element, tempPosition)){
            positions.push(board[tempPosition - 1]);
        }
        tempPosition = tempPosition - 8;
    }
    tempPosition = positionOnBoard + 8;
    while(tempPosition < 65){
        if(canGo(element, tempPosition)){
            positions.push(board[tempPosition - 1]);
        }
        tempPosition = tempPosition + 8;
    }
    return positions;
}
function allowedVerticalPositions(element, positionOnBoard){
    let positions = [];
    let tempPosition;
    tempPosition = positionOnBoard - 1;
    while(tempPosition % 8 !== 1 && tempPosition > 0){
        if(canGo(element, tempPosition) && !hasVerticalBlock(positionOnBoard, tempPosition)){
            positions.push(board[tempPosition - 1]);
        }
        tempPosition = tempPosition - 1;
    }
    tempPosition = positionOnBoard + 1;
    while(tempPosition % 8 !== 0 && tempPosition < 65){
        if(canGo(element, tempPosition) && !hasVerticalBlock(positionOnBoard, tempPosition)){
            positions.push(board[tempPosition - 1]);
        }
        tempPosition = tempPosition + 1;
    }
    return positions;
}

function setUp(allPieces, chessBoard, movedPieces, pOnePieces, pTwoPices, whoseTurn) {
    board = chessBoard;
    pieces = allPieces;
    piecesMadeFirstMove = movedPieces;
    playerOnePieces = pOnePieces;
    playerTwoPieces = pTwoPices;
    isPlayerOneTurn = whoseTurn;
}

function canGo(element, newPosition, isEmpityBox , forAnalysis = false, forKOneAnalysis = false){
    if (newPosition !== null) {
        let {id, name, position} = element;
        //let id = element.id !== undefined ? element.id : ""; 
        let lastPos = board.indexOf(position)+1;
        let newPos = typeof(newPosition) === "string" ? board.indexOf(newPosition)+1 : newPosition;
        let isItOwnPiecePos = false;

        if (!forAnalysis) {
            isItOwnPiecePos = isPosOccupiedBySelf(element, newPos);
        }

        if(name === "knight"){
            let allowedPos = lastPos - newPos;
            if(!isItOwnPiecePos && (allowedPos === 10 || allowedPos === -10 || allowedPos===6 || allowedPos===-6 || allowedPos===17 || allowedPos===-17 || allowedPos===15 || allowedPos===-15)){
                if(newPos < 1 || newPos > 64){
                    return false;
                }else if(lastPos % 8 === 0){
                    if((newPos - 1) % 8 === 1){
                        return false;
                    }else if(newPos % 8 === 1){
                        return false;
                    }
                }else if(lastPos % 8 === 1){
                    if((newPos + 1) % 8 === 0 || newPos % 8 === 0){
                        return false;
                    }
                }else if(lastPos % 8 === 7){
                    if(newPos % 8 === 1){
                        return false;
                    }
                }else if(lastPos % 8 === 2){
                    if(newPos % 8 === 0){
                        return false;
                    }
                }
                return true;
            }else{
                return false;
            }
        }else if(name === "bishop"){
            if(canMoveDiagonal(lastPos, newPos) && !hasDiagonalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else{
                return false;
            }
        }else if(name === "rook"){
            if(canMoveHorizontal(lastPos, newPos) && !hasHorizontalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveVertical(lastPos, newPos) && !hasVerticalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else{
                return false;
            }
        }else if(name === "pawn"){
            if(isPlayerOneTurn && !forKOneAnalysis){
                if(canMoveOnestepForward(lastPos, newPos) && !hasFrontBlock(lastPos, newPos+1)){
                    return true;
                }else if(!isEmpityBox && canMoveOnestepDiagonal(lastPos, newPos)){
                    return true;
                }else if(canMoveTwostepForward(lastPos, newPos, id) && !hasFrontBlock(lastPos, newPos+1)){
                    return true;
                }else if(!isEmpityBox && canMoveOnestepDownDiagonal(lastPos, newPos) && forAnalysis){
                    return true;
                }else{
                    return false;
                }
            }else{
                if(canMoveOnestepBackward(lastPos, newPos) && !hasFrontBlock(lastPos, newPos-1) && !forKOneAnalysis){
                    return true;
                }else if(!isEmpityBox && canMoveOnestepDownDiagonal(lastPos, newPos) && !isItOwnPiecePos){
                    return true;
                }else if(canMoveTwostepBackward(lastPos, newPos, id) && !hasFrontBlock(lastPos, newPos-1) && !forKOneAnalysis){
                    return true;
                }else if(!isEmpityBox && canMoveOnestepDiagonal(lastPos, newPos) && forAnalysis){
                    return true;
                }else{
                    return false;
                }
            }
        }else if(name === "queen"){
            if(canMoveHorizontal(lastPos, newPos) && !hasHorizontalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveVertical(lastPos, newPos) && !hasVerticalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveDiagonal(lastPos, newPos) && !hasDiagonalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else{
                return false;
            }
        }else if(name === "king"){
            if(canMoveOnestepHorizontal(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveOnestepForward(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveOnestepBackward(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveOnestepDiagonal(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveOnestepDownDiagonal(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else{
                return false;
            }
        }
    } else {
        return false;
    }
}

function isPosOccupiedBySelf(movingPiece, newPosition) {
    for (let id in pieces) {
        if (pieces[id].position === board[newPosition-1]) {
            if (pieces[id].player === movingPiece.player) {
                return true;
            } else {
                return false;
            }
        }
    }
}

function canMoveVertical(lastPos, newPos){
    if(Math.ceil(lastPos/8)===Math.ceil(newPos/8) && lastPos - newPos !== 0){
        return true;
    }else{
        return false;
    }
}
function canMoveHorizontal(lastPos, newPos){
    if(Math.abs((newPos - lastPos)%8)===0 && lastPos - newPos !== 0){
        return true;
    }else{
        return false;
    }
}
function areInTheSameDiagonal(pos1, pos2){
    if((pos1 - pos2)%9 === 0){
        if(pos1 > pos2){
            while(pos1 > pos2){
                if(pos2 % 8 === 0 || pos1 % 8 === 1){
                    return false
                }
                pos2 = pos2 + 9;
            }
            return true;
        }else {
            while(pos1 < pos2){
                if(pos1 % 8 === 0 || pos2 % 8 === 1){
                    return false
                }
                pos2 = pos2 - 9;
            }
            return true;
        }
    }else if((pos1 - pos2)%7 === 0){
        if(pos1 > pos2){
            while(pos1 > pos2){
                if(pos1 % 8 === 0 || pos2 % 8 === 1){
                    return false
                }
                pos2 = pos2 + 7;
            }
            return true;
        }else {
            while(pos1 < pos2){
                if(pos2 % 8 === 0 || pos1 % 8 === 1){
                    return false
                }
                pos2 = pos2 - 7;
            }
            return true;
        }
    }
}
function canMoveDiagonal(lastPos, newPos){
    if((((lastPos - newPos)%9 === 0) || ((lastPos - newPos)%7 === 0)) && lastPos - newPos !== 0){
        return areInTheSameDiagonal(lastPos, newPos);
    }else{
        return false;
    }
}
function canMoveOnestepDiagonal(lastPos, newPos){
    if(lastPos % 8 !== 0){
        if(((lastPos - 7) === newPos) || ((lastPos + 9) === newPos)){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
function canMoveOnestepDownDiagonal(lastPos, newPos){
    if(lastPos % 8 !== 1){
        if(newPos < 1 ||  newPos > 64){
            return false;
        }else{
            if(((lastPos + 7) === newPos) || ((lastPos - 9) === newPos)){
                return true;
            }else{
                return false;
            }
        }
    }else{
        return false;
    }
}
function canMoveOnestepForward(lastPos, newPos){
    if((Math.ceil(lastPos/8)===Math.ceil(newPos/8)) && (newPos === lastPos+1)){
        return true;
    }else{
        return false;
    }
}
function canMoveTwostepForward(lastPos, newPos, piece_id){
    if((Math.ceil(lastPos/8)===Math.ceil(newPos/8)) && (newPos === lastPos+2)){
        if(piecesMadeFirstMove.length > 0){
            if(piecesMadeFirstMove.indexOf(piece_id) === -1){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }else{
        return false;
    }
}
function canMoveTwostepBackward(lastPos, newPos, piece_id){
    if((Math.ceil(lastPos/8)===Math.ceil(newPos/8)) && (newPos === lastPos-2)){
        if(piecesMadeFirstMove.length > 0){
            if(piecesMadeFirstMove.indexOf(piece_id) === -1){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }else{
        return false;
    }
}
function canMoveOnestepBackward(lastPos, newPos){
    if((Math.ceil(lastPos/8)===Math.ceil(newPos/8)) && (newPos === lastPos-1)){
        return true;
    }else{
        return false;
    }
}
function canMoveOnestepHorizontal(lastPos, newPos){
    if(((lastPos - 8) === newPos) || ((lastPos + 8) === newPos)){
        return true;
    }else{
        return false;
    }
}
function hasHorizontalBlock(lastPos, newPos){
    return checkBlock(lastPos, newPos, 8);
}
function hasVerticalBlock(lastPos, newPos){
    return checkBlock(lastPos, newPos, 1);
}
function hasDiagonalBlock(lastPos, newPos){
    if((lastPos - newPos)%7 === 0){
        return checkBlock(lastPos, newPos, 7);
    }else if((lastPos - newPos)%9 === 0){
        return checkBlock(lastPos, newPos, 9);
    }else{
        return false;
    }
}
function hasFrontBlock(lastPos, newPos){
    return checkBlock(lastPos, newPos, 1);
}

function checkBlock(lastPos, newPos, offset){
    let index;
    let middleBoxes = [];
    if(newPos > lastPos + offset){
        index = lastPos + offset;
        while(newPos > index){
            middleBoxes.push(board[index-1]);
            index = index + offset;
        }
        for (let piece in pieces) {
                if(middleBoxes.indexOf(pieces[piece].position) !== -1){
                    return true;
                }
        }
        return false;
    }else if(newPos < lastPos - offset){
        index = lastPos - offset;
        middleBoxes = [];
        while(index > newPos){
            middleBoxes.push(board[index-1]);
            index = index - offset;
        }
        for (let piece in pieces) {
                if(middleBoxes.indexOf(pieces[piece].position) !== -1){
                    return true;
                }
        }
        return false;
    }else{
        return false;
    }
}

function middleBoxes(posOne, posTwo, pawn = false, onlyDiagonal=false) {
    let index;
    let middleBoxes = [];
    let offset = 0;
    let pos1 = board.indexOf(posOne) + 1;
    let pos2 = board.indexOf(posTwo) + 1;

    if (areInTheSameDiagonal(pos1, pos2)) {
        if ((pos1 - pos2) % 7 === 0) {
            offset = pawn && Math.abs((pos1 - pos2)) / 7 > 1 ? 0 : 7;
        } else {
            offset = pawn && Math.abs((pos1 - pos2)) / 9 > 1 ? 0 : 9;
        }
    } else if (canMoveVertical(pos1, pos2) && !onlyDiagonal) {
        offset = pawn ? 0 : 1;
    } else if (canMoveHorizontal(pos1, pos2) && !onlyDiagonal) {
        offset = pawn ? 0 : 8;
    }

    if (offset > 0) {
        if(pos1 > pos2 + offset){
            index = pos2 + offset;
            while(pos1 > index){
                middleBoxes.push(board[index-1]);
                index = index + offset;
            }
        }else if(pos1 < pos2 - offset){
            index = pos2 - offset;
            middleBoxes = [];
            while(index > pos1){
                middleBoxes.push(board[index-1]);
                index = index - offset;
            }
        }
    } 
    return middleBoxes;
}

function isItTheOnlyMiddlePiece(posOne, posTwo, isItPawn, piecePosition, onlyDiagonal = false) {
    let middlePositions = middleBoxes(posOne, posTwo, isItPawn, onlyDiagonal);
    let notFreeBoxCounter = 0;

    for (let piece in pieces) {
        if (middlePositions.indexOf(pieces[piece].position) !== -1) {
            notFreeBoxCounter++
        }
    }

    if (notFreeBoxCounter === 1 && middlePositions.indexOf(piecePosition) !== -1) {
        return true;
    }
    return false;
}

function isThePathFree(posOne, posTwo) {
    let middlePositions = middleBoxes(posOne, posTwo)
    for (let piece in pieces) {
        if (middlePositions.indexOf(pieces[piece].position) !== -1) {
            return false
        }
    }
    return true
}

function isTheDivBoxEmpty(pos){
    for (let piece in pieces){
        if (pos === pieces[piece].position) {
            return false
        }
    }
    return true
}

function isItSafeToGo(piece_position, isEmpityBox=false){
    for(var i = 0; i < playerOnePieces.length; i++){
        let piece = pieces[playerOnePieces[i]];
        let element = {
            id : playerOnePieces[i],
            position : piece.position,
            name : piece.name,
            player: piece.player
        }
        if(canGo(element, piece_position, isEmpityBox, true)){
            return false;
        }
    }
    return true;
}

function isItToBePromotedPawn(pawnPosition) {
    if (pawnPosition.indexOf("6") !== -1 || pawnPosition.indexOf("7") !== -1) {
        for (let i = 0; i < playerTwoPieces.length; i++) {
            let playerTwoPiece = pieces[playerTwoPieces[i]];
            if (playerTwoPiece.name === "pawn" && pawnPosition[1] !== "7") {
                let pawnTwoPos = playerTwoPiece.position;
                // if any player two pawn blocks the movement of player one pawn
                if ((Number(pawnTwoPos[1]) === Number(pawnPosition[1]) + 1) && pawnTwoPos[0] === pawnPosition[0]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    return false;
}

function doesMovingPutKingInDanger(currentPosition, excludedPieceId = null) {
    let kingPos = pieces["k2"].position;

    for (var i = 0; i < playerOnePieces.length; i++) {
        if (playerOnePieces[i] !== excludedPieceId) {
            let piecePosition = pieces[playerOnePieces[i]].position;
            let isItPawn = pieces[playerOnePieces[i]].name === "pawn";
            if (isItTheOnlyMiddlePiece(piecePosition, kingPos, isItPawn, currentPosition)) {
                return true
            }
        }
    }
    return false;
}

function doesMovingPutOthersInDanger(currentPosition, excludedPieceId = null) {
    let queenPos = pieces["q2"].position;
    let bishopOnePos = pieces["b21"].position;
    let bishopTwoPos = pieces["b22"].position;
    let knightOnePos = pieces["h21"].position;
    let knightTwoPos = pieces["h22"].position;
    let rookOnePos = pieces["c21"].position;
    let rookTwoPos = pieces["c22"].position;

    for (var i = 0; i < playerOnePieces.length; i++) {
        let piecePosition = pieces[playerOnePieces[i]].position;
        let isItPawn = pieces[playerOnePieces[i]].name === "pawn";
        if (playerOnePieces[i] !== excludedPieceId) {
            if (isItTheOnlyMiddlePiece(piecePosition, queenPos, isItPawn, currentPosition)) {
                return true;
            } else if (isItTheOnlyMiddlePiece(piecePosition, knightOnePos, isItPawn, currentPosition)) {
                return true;

            } else if (isItTheOnlyMiddlePiece(piecePosition, knightTwoPos, isItPawn, currentPosition)) {
                return true;

            } else if (isItTheOnlyMiddlePiece(piecePosition, bishopOnePos, isItPawn, currentPosition)) {
                return true;
            } else if (isItTheOnlyMiddlePiece(piecePosition, bishopTwoPos, isItPawn, currentPosition)) {
                return true;
            } else if (isItTheOnlyMiddlePiece(piecePosition, rookOnePos, isItPawn, currentPosition)) {
                return true;
            } else if (isItTheOnlyMiddlePiece(piecePosition, rookTwoPos, isItPawn, currentPosition)) {
                return true;
            }
        }
    }
    return false;

}

function firstMoveOption() {
    let openingMoves = [
        { pieceId : "h22", position : "f6" },
        { pieceId : "p25", position : "e6" },
        { pieceId : "p23", position : "c6" },
        { pieceId : "p27", position : "g6" }
    ]
    let selectedMove = openingMoves[Math.floor(Math.random()*openingMoves.length)]

    return {
        piece : pieces[selectedMove.pieceId],
        pieceId : selectedMove.pieceId,
        move_to : selectedMove.position,
        toBeEliminatedPiece : ""
    }
}

function blockPiece(threat_piece) {
    let middlePositions = [];
    let kingPosition = pieces["k2"].position;
    let threatPiece = pieces[threat_piece];
    let threatPosition = threatPiece.position;
    let kingIndex = board.indexOf(kingPosition) + 1;
    let threatIndex = board.indexOf(threatPosition) + 1;
    let tempIndex;

    if (pieces[threat_piece].name !== "knight") {    
        if ((kingIndex-threatIndex) % 9 === 0){
            if(kingIndex > threatIndex){
                tempIndex = kingIndex - 9;
                while(tempIndex > threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex - 9;
                }
            }else{
                tempIndex = kingIndex + 9;
                while(tempIndex < threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex + 9;
                }
            }
        } else if ((kingIndex-threatIndex) % 7 === 0){
            if(kingIndex > threatIndex){
                tempIndex = kingIndex - 7;
                while(tempIndex > threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex - 7;
                }
            }else{
                tempIndex = kingIndex + 7;
                while(tempIndex < threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex + 7;
                }
            }
        } else if (Math.ceil(kingIndex/8) === Math.ceil(threatIndex/8)){
            if(kingIndex > threatIndex){
                tempIndex = kingIndex - 1;
                while(tempIndex > threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex - 1;
                }
            }else{
                kingIndex = kingIndex + 1;
                while(tempIndex < threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex + 1;
                }
            }
        } else {
            if(kingIndex > threatIndex){
                tempIndex = kingIndex - 8;
                while(tempIndex > threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex - 8;
                }
            }else{
                tempIndex = kingIndex + 8;
                while(tempIndex < threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex + 8;
                }
            }
        }

        if (middlePositions.length > 0){
            for (var index = 0; index < middlePositions.length; index++) {
                for (var i = 0; i < playerTwoPieces.length; i++) {
                    let piece = pieces[playerTwoPieces[i]];
                    if (piece.name !== "king") {
                         let block_piece = {
                            id : "",
                            position : piece.position,
                            name : piece.name,
                            player : piece.player
                        }
                        if (canGo(block_piece, middlePositions[index], true) && !doesMovingPutKingInDanger(block_piece.position)) {
                            return {
                                ...piece,
                                move_to : middlePositions[index],
                                piece_id : playerTwoPieces[i]
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}

function  moveTheKing() {
    let allowedPositions = allowedMoves(pieces["k2"], "k2");
    let goTo = "";

    if(allowedPositions.length > 0){
        for (var i = 0; i < allowedPositions.length; i++) {
            if (isItSafeToGo(allowedPositions[i])){
                goTo = allowedPositions[i];
                return goTo;
            }
        }
    }
    return goTo;
}

function eliminateThreat(threat_piece, safemode=true){
    let piece_id;
    let threatEliminatingOptions = [];
    let threatPiece = pieces[threat_piece];

    for (var i = 0; i < playerTwoPieces.length; i++) {
        piece_id = playerTwoPieces[i];
        let eliminatingPiece = {
            id: piece_id,
            position : pieces[piece_id].position,
            name : pieces[piece_id].name,
            player : pieces[piece_id].player
        }
        if(canGo(eliminatingPiece, threatPiece.position) && !doesMovingPutKingInDanger(eliminatingPiece.position)){
            threatEliminatingOptions.push(piece_id);
        }
    }

    if(threatEliminatingOptions.length > 0){
        let bestOption = [];
        let optionPiece;
        let requirement = safemode ? isItSafeToGo(threatPiece.position, true) : true;
        if(requirement){
            if (!safemode) {
                threatEliminatingOptions = threatEliminatingOptions.filter(function(item) {
                    return item !== "k2";
                });
            }

            for (let index = 0; index < threatEliminatingOptions.length; index++) {
                piece_id = threatEliminatingOptions[index];
                optionPiece = pieces[piece_id];

                let eliminateAndTrapMove = eliminateThreatAndTrapOtherPiece(optionPiece, piece_id, threatPiece.position)
                if (eliminateAndTrapMove !== null) {
                    bestOption.push(eliminateAndTrapMove);
                }
            }

            if (bestOption.length > 0) {
                let selectedMove;

                for (let i = 0; i < bestOption.length; i++) {
                    if (i === 0) {
                        selectedMove = bestOption[i];
                    }
                    if (bestOption[i].targetPiece === "king" || bestOption[i].targetPiece === "queen") {
                        selectedMove = bestOption[i];
                    }
                }
                if (selectedMove === undefined) {
                    selectedMove = bestOption[Math.floor(Math.random()*bestOption.length)]
                }
                return {
                    ...pieces[selectedMove.movingPieceId],
                    id : selectedMove.movingPieceId,
                    threatPieceId : threat_piece,
                    move_to : selectedMove.move_to
                }
            }

            if(bestOption.length < 1 && threatEliminatingOptions.length > 0){
                let p_id = "";
                for (let i = 0; i < threatEliminatingOptions.length; i++) {
                    p_id = threatEliminatingOptions[i];
                    if (pieces[p_id].name === "pawn") {
                        break
                    }
                    p_id = ""
                }
                if (p_id === "") {
                    p_id = threatEliminatingOptions[Math.floor(Math.random()*threatEliminatingOptions.length)];
                }

                return {
                    ...pieces[p_id],
                    id : p_id,
                    move_to : threatPiece.position,
                    threatPieceId : threat_piece
                }
            }
        }

    }
    return null;
}

function canTheKingEliminateThreat(threat_piece) {
    let threatPiece = pieces[threat_piece];
    let kingPiece = {
        id : "",
        position : pieces["k2"].position,
        name : pieces["k2"].name,
        player : pieces["k2"].player
    }

    if (canGo(kingPiece, threatPiece.position) && isItSafeToGo(threatPiece.position, true)){
        return true; 
    }else{
        return false;
    }
}


function eliminateThreatAndTrapOtherPiece(piece, piece_id, newPosition) {
    let element = {
        id : piece_id,
        position : newPosition,
        name : piece.name,
        player: piece.player
    }

    for (let i = 0; i < playerOnePieces.length; i++) {
        let opponentPiece = pieces[playerOnePieces[i]];
        if (opponentPiece.name !== "pawn") {
            if (canGo(element, opponentPiece.position) && isItSafeToGo(newPosition)) {
                return {
                    targetPiece : opponentPiece,
                    move_to : newPosition,
                    movingPieceId : piece_id,
                }
            }
        }
    }

    return null
}


function kingUnderThreatMoveOption() {
    let kings_threat_piece_id;
    let kingsThreat = kingsThreatPiece();
    if (kingsThreat.length > 0){
        //if the king is in danger or checkmated
        kings_threat_piece_id = kingsThreat[0];

        if (kingsThreat.length > 1) {
            if (moveTheKing() !== ""){

                //console.log("Inside move the king");
                let goTo = moveTheKing();
                return { 
                    piece : pieces["k2"], 
                    pieceId : "k2", 
                    move_to : goTo,
                    toBeEliminatedPieceId : ""
                }
            }
        }
        let threatEliminatingPiece = eliminateThreat(kings_threat_piece_id, false);

       if (threatEliminatingPiece !== null){

            //console.log("inside eliminate king's threat ", threatEliminatingPiece);
            return {
                piece : threatEliminatingPiece,
                pieceId : threatEliminatingPiece.id,
                move_to : threatEliminatingPiece.move_to,
                toBeEliminatedPieceId : kings_threat_piece_id
            }

        } else if (canTheKingEliminateThreat(kings_threat_piece_id)){

            //console.log("The king eliminate the threat ....");
            let threatPiece = pieces[kings_threat_piece_id];
            return {
                piece : pieces["k2"], 
                pieceId : "k2",
                move_to : threatPiece.position,
                toBeEliminatedPieceId : kings_threat_piece_id
            }

        } else if (blockPiece(kings_threat_piece_id)){

            let piece = blockPiece(kings_threat_piece_id);
            return {
                piece : piece,
                pieceId : piece.piece_id,
                move_to : piece.move_to,
                toBeEliminatedPieceId : ""
            }

        }else if (moveTheKing() !== ""){

            //console.log("Inside move the king");
            let goTo = moveTheKing();

            return {
                piece : pieces["k2"],
                pieceId : "k2",
                move_to : goTo,
                toBeEliminatedPieceId : ""
            }

        } else {

            return {
                isCheckMate : true
            }
        }
    } else {
        return null
    }
    
}

function castelingMoveOption() {

    if (piecesMadeFirstMove.indexOf("k2") === -1) {
        if (piecesMadeFirstMove.indexOf("c22") === -1 && isThePathFree(pieces["k2"].position, pieces["c22"].position)) {
            if (isItSafeToGo("g8")) {
                let castelingMove = []
                castelingMove.push({
                    piece : pieces["c22"], 
                    pieceId : "c22",
                    move_to : "f8",
                    toBeEliminatedPieceId : ""
                });
                castelingMove.push({
                    piece : pieces["k2"], 
                    pieceId : "k2",
                    move_to : "g8",
                    toBeEliminatedPieceId : ""
                });

                return {
                    castelingMove : castelingMove
                }
            }
        }
        if (piecesMadeFirstMove.indexOf("c21") === -1 && isThePathFree(pieces["k2"].position, pieces["c21"].position)) {
            if (isItSafeToGo("c8")) {
                let castelingMove = []
                castelingMove.push({
                    piece : pieces["c21"], 
                    pieceId : "c21",
                    move_to : "d8",
                    toBeEliminatedPieceId : ""
                });
                castelingMove.push({
                    piece : pieces["k2"], 
                    pieceId : "k2",
                    move_to : "c8",
                    toBeEliminatedPieceId : ""
                });

                return {
                    castelingMove : castelingMove
                }
            }
        }
    }

    return null
}


function opponentPawnEliminationMoveOption() {
    let piece, piece_id;
    for (let i = 0; i < playerTwoPieces.length; i++) {
        piece_id = playerTwoPieces[i];
        piece = pieces[piece_id];

         for (let id = 0; id < playerOnePieces.length; id++) {
            let opponentId = playerOnePieces[id];

            if (pieces[opponentId].name === "pawn") {
                if (canEliminateOpponent(piece, piece_id, pieces[opponentId].position) && !doesMovingPutKingInDanger(piece.position, opponentId) && !doesMovingPutOthersInDanger(piece.position, opponentId)) {   
                    return {
                        piece : piece,
                        pieceId : piece_id,
                        move_to: pieces[opponentId].position,
                        toBeEliminatedPieceId : opponentId
                    }               
                }
            }
        }
    }
    return null;
}

function opponentEliminationMoveOption(){
    let piece_id, piece;
    for (let i = 0; i < playerTwoPieces.length; i++) {
        piece_id = playerTwoPieces[i];
        piece = pieces[piece_id];

        if(canEliminateOpponentKing(piece, piece_id)){
            return {
                piece : piece,
                pieceId : piece_id,
                move_to: pieces["k1"].position,
                toBeEliminatedPieceId : "k1"
            }   
        }
        for (let id = 0; id < playerOnePieces.length; id++) {
            let opponentId = playerOnePieces[id];

            if (pieces[opponentId].name !== "pawn" || isItToBePromotedPawn(pieces[opponentId].position)) {
                if (canEliminateOpponentAndTrapKing(piece, piece_id, pieces[opponentId].position) || (canEliminateOpponent(piece, piece_id, pieces[opponentId].position) && !doesMovingPutKingInDanger(piece.position, opponentId))) {   
                    return {
                        piece : piece,
                        pieceId : piece_id,
                        move_to: pieces[opponentId].position,
                        toBeEliminatedPieceId : opponentId
                    }               
                }
            }
        }
        
    }
    return null;
}

function canEliminateOpponent(piece, selfID, pos, pawnElimination=false){
    let opponentPosition = pos;
    let element = {
        id : selfID,
        position : piece.position,
        name : piece.name,
        player: piece.player
    }
    return (pawnElimination ? canGo(element, opponentPosition, isTheDivBoxEmpty(opponentPosition)) : canGo(element, opponentPosition)) && (element.name === "pawn" ? true : isItSafeToGo(opponentPosition));
}

function canEliminateOpponentKing(piece, selfID){
    let opponentKingPosition = pieces["k1"].position;
    let element = {
        id : selfID,
        position : piece.position,
        name : piece.name,
        player: piece.player
    }
    
    return canGo(element, opponentKingPosition);
}

function canEliminateOpponentAndTrapKing(piece, selfID, pos) {
    let opponentKingPosition = pieces["k1"].position;
    let opponentPosition = pos;
    let element = {
        id : selfID,
        position : piece.position,
        name : piece.name,
        player: piece.player
    }
    let element2 = {
        id : selfID,
        position : opponentPosition,
        name : piece.name,
        player: piece.player
    }
    return canGo(element, opponentPosition, isTheDivBoxEmpty(opponentPosition)) && isItSafeToGo(opponentPosition) && canGo(element2, opponentKingPosition)
}


function pieceUnderThreatMoveOption(piecesInDager) {
    let piecesUnderThreat = piecesInDager; 

    if (piecesUnderThreat.length > 0){
        let pieceUnderThreat, pieceUnderThreatId, threatPiece;
        
        for (let item in piecesUnderThreat) {
            item = piecesUnderThreat[item];
            pieceUnderThreat = {
                ...pieces[item.pieceIndangerId],
                id : pieceUnderThreatId,
                player : "player2"
            }
            threatPiece = pieces[item.threatPieceId];

            //Eliminate threat
            let eliminationOption = eliminatePieceThreat(pieceUnderThreat, item.pieceIndangerId, threatPiece, item.threatPieceId);
            if (eliminationOption !== null) {
                return eliminationOption;
            } else {
                let othrerOption;

                // Allow other piece to eliminate the threat
                othrerOption = otherThreatEliminationMove(threatPiece, item.threatPieceId);
                if (othrerOption !== null) {
                    return othrerOption
                }

                let trapOps = trapOptions(item.pieceIndangerId , true);
                if (trapOps.length > 0) {
                    let choosenMove = trapOps[0];
                    return {
                        piece : pieces[choosenMove.piece_id], 
                        pieceId : choosenMove.piece_id, 
                        move_to : choosenMove.position,
                        toBeEliminatedPieceId : eliminatedPieceWhileTrapMove(choosenMove.position).pieceId
                    }
                }

                // or call for backup protection
                if (piecesUnderThreat.length < 2 && threatPiece.name !== "pawn" && (pieceUnderThreat.name === "queen" && threatPiece.name !== "queen" ? false : true)) {
                    let backup = backupThePieceIndanger(piecesUnderThreat);
                    if (backup !== null) {
                        return {
                            piece : pieces[backup.pieceId],
                            pieceId : backup.pieceId,
                            move_to : backup.move_to,
                            toBeEliminatedPiece : ""
                        }
                    }
                }else {
                    let selected = chooseBetweenPiecesInDanger(piecesUnderThreat);
                    //return move(pieces[selected.pieceId], selected.pieceId, selected.move_to); 
                }

                // write a code for if the pawns block the threat or to be sacrificed
                let pawnOption = sacrificeAPawn(pieceUnderThreat, threatPiece);
                if (pawnOption !== null) {
                    return pawnOption;
                }

                // or runaway
                let runawayOption = runawayMove(item);
                if (runawayOption !== null) {
                    return runawayOption;
                }

                // without safe mode
                othrerOption = otherThreatEliminationMove(threatPiece, item.threatPieceId, false);
                if (othrerOption !== null) {
                    return othrerOption
                }
                // without safe mode
                eliminationOption = eliminatePieceThreat(pieceUnderThreat, item.pieceIndangerId, threatPiece, item.threatPieceId, false);
                if (eliminationOption !== null) {
                    return eliminationOption;
                }

            }
        }
        return null
    } else {
        return null
    }
}

function eliminatePieceThreat(pieceUnderThreat, pieceIndangerId, threatPiece, threatPieceId, safeMode = true) {
    if (canGo(pieceUnderThreat, threatPiece.position) && (safeMode ? isItSafeToGo(threatPiece.position) : true) && !doesMovingPutKingInDanger(pieceUnderThreat.position, threatPieceId)) {
        return {
            piece : pieces[pieceIndangerId],
            pieceId : pieceIndangerId,
            move_to : threatPiece.position,
            toBeEliminatedPiece : threatPieceId
        }
    }
    return null
}

function otherThreatEliminationMove(threatPiece, threatPieceId, safeMode = true) {
    let pieceId, othrerOption;

    // Allow other piece to eliminate the threat
    for (let i = 0; i < playerTwoPieces.length; i++) {
        pieceId = playerTwoPieces[i];
        othrerOption = {
            ...pieces[pieceId],
            id : pieceId,
            player : "player2"
        }

        if (canGo(othrerOption, threatPiece.position) && (safeMode ? isItSafeToGo(threatPiece.position) : true) && !doesMovingPutKingInDanger(pieces[pieceId].position, threatPieceId)){
            return {
                piece : pieces[pieceId],
                pieceId : pieceId,
                move_to : threatPiece.position,
                toBeEliminatedPiece : threatPieceId
            }
        }

    }
    return null
}

function sacrificeAPawn(pieceUnderThreat, threatPiece) {
    let othrerOption;
    let middlePositions = middleBoxes(pieceUnderThreat.position, threatPiece.position);
    if (middlePositions.length > 0 && pieceUnderThreat.name !== "knight") {
        for (let index = 0; index < playerTwoPieces.length; index++) {
            let playerTwoId = playerTwoPieces[index];

            for (let pos = 0; pos < middlePositions.length; pos++) {
                othrerOption = {
                    ...pieces[playerTwoId],
                    id : playerTwoId,
                    player : "player2"
                }
                if (othrerOption.name === "pawn" && canGo(othrerOption, middlePositions[pos], true) && !doesMovingPutKingInDanger(pieces[playerTwoId].position)){
                    return {
                        piece : pieces[playerTwoId],
                        pieceId : playerTwoId,
                        move_to : middlePositions[pos],
                        toBeEliminatedPiece : ""
                    }
                }
            }

        }
    }
    return null
}

function runawayMove(item) {
    let allowedMovePositions = allowedMoves(pieces[item.pieceIndangerId], item.pieceIndangerId);
    if (allowedMovePositions.length > 0) {
        let item_id = item.pieceIndangerId;
        for (let pos = 0; pos < allowedMovePositions.length; pos++) {
            if (isItSafeToGo(allowedMovePositions[pos]) && !doesMovingPutKingInDanger(pieces[item_id].position) && !doesMovingPutOthersInDanger(pieces[item_id].position)) {
                return {
                    piece : pieces[item_id],
                    pieceId : item_id,
                    move_to : allowedMovePositions[pos],
                    toBeEliminatedPiece : ""
                }
            }
        }
    }
    return null
}

// moves to protect the piece in danger
function backupThePieceIndanger(piece_indanger) {
    let piece_id;
    let allowedMovesForApiece;
    let itAlreadyHasBackup = false;

    for (let index = 0; index < playerTwoPieces.length; index++){
        piece_id = playerTwoPieces[index];
        if (piece_id !== "k2" && piece_indanger[0].pieceIndangerId !== piece_id) {
            if (canGo(pieces[piece_id], pieces[piece_indanger[0].pieceIndangerId].position, false, true) && !doesMovingPutKingInDanger(pieces[piece_id].position)){
                itAlreadyHasBackup = true;
            }
        }
    }

    if (!itAlreadyHasBackup) {
        for (let index = 0; index < playerTwoPieces.length; index++) {
            piece_id = playerTwoPieces[index];
            if (piece_id !== "k2" && piece_indanger[0].pieceIndangerId !== piece_id) {
                allowedMovesForApiece = allowedMoves(pieces[piece_id], piece_id);
                if (allowedMovesForApiece.length > 0) {
                    for (var i = 0; i < allowedMovesForApiece.length; i++) {
                        if (canGo({ ...pieces[piece_id], position : allowedMovesForApiece[i] }, pieces[piece_indanger[0].pieceIndangerId].position, false, true) && isItSafeToGo(allowedMovesForApiece[i]) && !doesMovingPutKingInDanger(allowedMovesForApiece[i])) {
                            return {
                                pieceId : piece_id,
                                move_to : allowedMovesForApiece[i]
                            }
                        }
                    }
                }
            }
        }
        return null;
    } else {
        return null;
    }
}

function chooseBetweenPiecesInDanger(pieces_under_threat) {
    for (var i = 0; i < pieces_under_threat.length; i++) {
        let piece_id = pieces_under_threat[i].pieceIndangerId;
        let allowedMovesForApiece = allowedMoves(pieces[piece_id], piece_id);

        if (allowedMovesForApiece.length > 0) {    
            for (var index = 0; index < allowedMovesForApiece.length; index++) {
                for (var p = 0; p < pieces_under_threat.length; p++) {
                    if (pieces_under_threat[p] !== piece_id) {
                        if (canGo({ ...pieces[piece_id], position : allowedMovesForApiece[index] }, pieces[pieces_under_threat[p].pieceIndangerId].position)) {
                            return {
                                pieceId : piece_id,
                                move_to : allowedMovesForApiece
                            }
                        }
                    }
                }
            }
        }    
    }
    return null;
}

function piecesInDanger(){
    let piece_id, piece;
    let piecesInDanger = [];

    for (var i = 0; i < playerOnePieces.length; i++) {
        piece_id = playerOnePieces[i];
        piece = {
            ...pieces[piece_id],
            id : piece_id,
            player: pieces[piece_id].player
        }

        for (let index = 0; index < playerTwoPieces.length; index++) {
            let pTwoPiece = pieces[playerTwoPieces[index]];
            if (pTwoPiece.name !== "pawn" && pTwoPiece.name !== "king") {
                if (canGo(piece, pTwoPiece.position, false, true)) {
                    piecesInDanger.push({
                        pieceIndangerId : playerTwoPieces[index],
                        threatPieceId : piece_id
                    });
                }
            }
        }
    }

    return piecesInDanger;
}

function kingsThreatPiece(){
    let kingPosition = pieces["k2"].position;
    let opponentPiece, piece_id;
    let kingsThreatPiecesId = [];
    for (var i = 0; i < playerOnePieces.length; i++) {
        piece_id = playerOnePieces[i];
        opponentPiece = {
            id : "",
            position : pieces[piece_id].position,
            name : pieces[piece_id].name,
            player : pieces[piece_id].player
        }
        if(canGo(opponentPiece, kingPosition, false, true)){
            kingsThreatPiecesId.push(piece_id);
        }
    }
    return kingsThreatPiecesId;
}


// player one moves

let dangereousPieceId = null;

function eliminationMove(movingPiece, pos, childPiece) {
    if(canGo(movingPiece, pos, false)){
        let pieceToBeEliminatedID = childPiece.id;
        if(canEliminate(movingPiece.id, pieceToBeEliminatedID)){
            if (dangereousPieceId !== null) {
                if (isKingOutOfDanger(movingPiece, pos) || pieceToBeEliminatedID === dangereousPieceId) {
                    dangereousPieceId = null;
                    return {
                        movingPiece, 
                        pieceId : movingPiece.id,
                        move_to : pos,
                        toBeEliminatedPieceId : pieceToBeEliminatedID
                    }
                    
                    //setTimeout(computer, 3000);
                } else {
                    alert("Move not allowed 01");
                    //console.log(" movingPiece ", movingPiece, " and pos", pos);
                    if (isCheckMate()) {
                        return {
                            checkMate : true
                        }
                    }
                    return {
                        movingPiece : null
                    }
                }
            }else {
               return {
                    movingPiece, 
                    pieceId : movingPiece.id,
                    move_to : pos,
                    toBeEliminatedPieceId : pieceToBeEliminatedID
               }
            }
            
        }else{
            alert("Move not allowed 05")
            return {
                movingPiece : null
            }
        }
    } else {
        return null
    }
}

function normalMove(movingPiece, pos, childPiece) {
    if(canGo(movingPiece, pos, true)){
        if (dangereousPieceId !== null) {
            if (isKingOutOfDanger(movingPiece, pos)) {
                dangereousPieceId = null;
               return {
                    movingPiece, 
                    pieceId : movingPiece.id,
                    move_to : pos,
                    toBeEliminatedPieceId : ""
               }
                //setTimeout(computer, 3000);
            } else {
                alert("Move not allowed 02");
                if (isCheckMate()) {
                    return {
                        checkMate : true
                    }
                }
                return {
                    movingPiece : null
                }
            }
        } else {
            if (movingPiece.name === "rook" && piecesMadeFirstMove.indexOf(movingPiece.id) === -1 && piecesMadeFirstMove.indexOf("k1") === -1) {
                let movingrookPosition = movingPiece.position;
                let castelingMove = [];
                //let movingrookIndex = board.indexOf(currentrookPosition) + 1;
                let kingOnePosition = pieces["k1"].position;
                if (movingrookPosition === "a1" && kingOnePosition === "e1" && pos === "d1") {
                    castelingMove.push({
                        piece : movingPiece, 
                        pieceId : movingPiece.id,
                        move_to : pos,
                        toBeEliminatedPieceId : ""
                    });

                    castelingMove.push({
                        piece : pieces["k1"], 
                        pieceId : "k1",
                        move_to : "c1",
                        toBeEliminatedPieceId : ""
                    });

                    return {
                        castelingMove : castelingMove
                    };
                } else if (movingrookPosition === "h1" && kingOnePosition === "e1" && pos === "f1") {
                    castelingMove.push({
                        piece : movingPiece, 
                        pieceId : movingPiece.id,
                        move_to : pos,
                        toBeEliminatedPieceId : ""
                    });

                    castelingMove.push({
                        piece : pieces["k1"], 
                        pieceId : "k1",
                        move_to : "g1",
                        toBeEliminatedPieceId : ""
                    });

                    return { castelingMove : castelingMove };
                } else {
                  return {
                        movingPiece, 
                        pieceId : movingPiece.id,
                        move_to : pos,
                        toBeEliminatedPieceId : ""
                   }
                }
            } else if (movingPiece.name === "king" && isKingOneInCheck(pieces, pos)) {
                //if new position is dangereous for the king
                alert("Move not allowed : king will get in danger");
                return {
                    movingPiece : null
                }
            } else {
                return {
                    movingPiece, 
                    pieceId : movingPiece.id,
                    move_to : pos,
                    toBeEliminatedPieceId : ""
               }
            }
        }   
    } else {
        return null
    }
}

function canEliminate(moving_piece_id, current_piece_id){
    let current_piece = pieces[current_piece_id];
    let moving_piece = pieces[moving_piece_id];
    if(moving_piece.player === current_piece.player){
        return false;
    }else{
        return true;
    }
}

function isKingOutOfDanger(movingPiece, newPosition){
    let dangereousPiece = {
        position : pieces[dangereousPieceId].position,
        name : pieces[dangereousPieceId].name,
        player : pieces[dangereousPieceId].player,
        id : ""
    };
    let dangereousPieceIndex = board.indexOf(dangereousPiece.position) + 1;
    let kingoneIndex = board.indexOf(pieces["k1"].position) + 1;
    if (dangereousPiece.position === newPosition) {
        // it means if the move eliminates the danger
        return true;
    }
    if(movingPiece.name === "king"){
        return !canGo(dangereousPiece, newPosition) && !isKingOneInCheck(pieces, newPosition);
    }
    if ((kingoneIndex - dangereousPieceIndex)%9 === 0) {
        return canThePieceBlockTheDanger(kingoneIndex, dangereousPieceIndex, 9, newPosition);
    }
    if((kingoneIndex - dangereousPieceIndex)%7 === 0) {
        return canThePieceBlockTheDanger(kingoneIndex, dangereousPieceIndex, 7, newPosition);
    }
    if ((kingoneIndex - dangereousPieceIndex)%8 === 0){            
        return canThePieceBlockTheDanger(kingoneIndex, dangereousPieceIndex, 8, newPosition);
    }
    if (Math.ceil(kingoneIndex/8) === Math.ceil(dangereousPieceIndex/8)) {
        return canThePieceBlockTheDanger(kingoneIndex, dangereousPieceIndex, 1, newPosition);
    }
    return false;
}

function canThePieceBlockTheDanger(pos1, pos2, offset, movingPiecePos) {
    let index;
    let middleBoxes = [];
    if(pos1 > pos2 + offset){
        index = pos2 + offset;
        while(pos1 > index){
            middleBoxes.push(board[index-1]);
            index = index + offset;
        }
        if(middleBoxes.indexOf(movingPiecePos) !== -1){
            return true;
        }
        return false;
    }else if(pos1 < pos2 - offset){
        index = pos2 - offset;
        middleBoxes = [];
        while(index > pos1){
            middleBoxes.push(board[index-1]);
            index = index - offset;
        }
        
        if(middleBoxes.indexOf(movingPiecePos) !== -1){
            return true;
        }
        return false;
    }
}

function isKingOneInCheck(allPieces, newPosition=null){
    let kingPosition = newPosition === null ? pieces["k1"].position : newPosition;
    let opponentPiece, piece_id;
    for (var i = 0; i < playerTwoPieces.length; i++) {
        piece_id = playerTwoPieces[i];
        opponentPiece = {
            id : "",
            position : pieces[piece_id].position,
            name : pieces[piece_id].name,
            player : pieces[piece_id].player
        }
        if(canGo(opponentPiece, kingPosition, false, true, true)){
            dangereousPieceId = piece_id;
            return true;
        }
    }
    return false;
}

function isCheckMate() {
    //let kingPosition = pieces["k1"].position;
    let allowedMovePositions;

    for (let i = 0; i < playerOnePieces.length; i++) {
        if (playerOnePieces[i] !== "k1") {
            let allowedPositions = allowedMoves(pieces[playerOnePieces[i]], playerOnePieces[i]);
            if (allowedPositions.length > 0) {
                for (let pos = 0; pos < allowedPositions.length; pos++) {
                    if (isKingOutOfDanger(pieces[playerOnePieces[i]], allowedPositions[pos])) {
                        return false
                    } 
                }
            }
        }
    }
    allowedMovePositions = allowedMoves(pieces["k1"], "k1");
    if (allowedMovePositions.length > 0) {
        for (let i = 0; i < allowedMovePositions.length; i++) {
            if (isItSafeToGo(allowedMovePositions[i])) {
                return false
            } 
        }
    }
    return true
}


function randomMoveOption(fullyRandomMove) {
    let counter = 0;
    let movingPiece_id, piece, allowedMovePositions, selectedPosition;

    while(counter < 30){
        movingPiece_id = playerTwoPieces[Math.floor(Math.random()*playerTwoPieces.length)];
        piece = pieces[movingPiece_id];
        if (piece.name === "pawn") {
            allowedMovePositions = allowedMoves(piece, movingPiece_id);

            if (allowedMovePositions.length > 0) {
                if (fullyRandomMove === "OFF") {
                    for (let i = 0; i < allowedMovePositions.length; i++) {
                        if (!doesMovingPutKingInDanger(piece.position)) {
                            if (isItSafeToGo(allowedMovePositions[i])) {
                                selectedPosition = allowedMovePositions[i];
                                break
                            }else if (willItHaveABackup(selectedPosition, movingPiece_id) && !doesMovingPutOthersInDanger(piece.position)) {
                                selectedPosition = allowedMovePositions[i];
                                break
                            } 
                        }
                    }
                } else {
                    let otherCounter = 0;
                    while(selectedPosition === undefined && otherCounter < 30){
                        selectedPosition = allowedMovePositions[Math.floor(Math.random()*allowedMovePositions.length)];
                        if (!doesMovingPutKingInDanger(piece.position)) {
                            if (isItSafeToGo(selectedPosition)) {
                                break
                            }else if (willItHaveABackup(selectedPosition, movingPiece_id) && !doesMovingPutOthersInDanger(piece.position)) {
                                break
                            } 
                            selectedPosition = undefined;
                        }
                        otherCounter++
                    }
                }

                if (selectedPosition !== undefined) {
                    return {
                        piece : piece,
                        pieceId : movingPiece_id,
                        move_to : selectedPosition,
                        toBeEliminatedPieceId : eliminatedPieceWhileMoveing(selectedPosition).pieceId
                    }
                }
            }
        }
        counter++;
    }
    return null;
}

function fallbackMoveOption() {
    for (let index = 0; index < playerTwoPieces.length; index++) {
        let id = playerTwoPieces[index];
        let piece = pieces[id];
        let allowedMovePositions = allowedMoves(piece, id);

        if (allowedMovePositions.length > 0) {
            for (let position = 0; position < allowedMovePositions.length; position++) {
                if(!doesMovingPutKingInDanger(piece.position)){
                    if (piece.name === "king") {
                        if (isItSafeToGo(allowedMovePositions[position])) {
                            return {
                                piece : piece,
                                pieceId : id,
                                move_to : allowedMovePositions[position],
                                toBeEliminatedPieceId : eliminatedPieceWhileMoveing(allowedMovePositions[position]).pieceId
                            }
                        }
                    } else {
                        return {
                            piece : piece,
                            pieceId : id,
                            move_to : allowedMovePositions[position],
                            toBeEliminatedPieceId : eliminatedPieceWhileMoveing(allowedMovePositions[position]).pieceId
                        }
                    }
                }
            }
        }
    }

    return null
}

function eliminatedPieceWhileMoveing(choosenPosition) {
    for (let i = 0; i < playerOnePieces.length; i++) {
        if (pieces[playerOnePieces[i]].position === choosenPosition) {
            return {
                pieceId : playerOnePieces[i]
            }
        }
    }
    return { pieceId : "" }
}

function trapMoveOption() {
    let moveMiddlePiece = movingTheMiddlePiece();
    if (moveMiddlePiece !== null) {
        return movingTheMiddlePiece();
    }

    let trapMovePositions = opponentPreciousPieceTrapMoves();
    if (trapMovePositions.length > 0) {
        let choosenMove;
        //console.log("Moves from opponent trap .... best move options are ");
        for (let index = 0; index < trapMovePositions.length; index++) {
            let trapPieceId = trapMovePositions[index].piece_id;
            if(isItBestChoiceForTrap(trapPieceId)){
                choosenMove = trapMovePositions[index];
                if (pieces[trapPieceId].name === "pawn") {
                    break
                }
            }else if(trapMovePositions[index].target === "king" || trapMovePositions[index].target === "queen"){
                choosenMove = trapMovePositions[index];
            }
        }
        if (choosenMove === undefined) {
            choosenMove = trapMovePositions[0]
        }
        return {
            piece : pieces[choosenMove.piece_id], 
            pieceId : choosenMove.piece_id, 
            move_to : choosenMove.position,
            toBeEliminatedPieceId : eliminatedPieceWhileTrapMove(choosenMove.position).pieceId
        }
    } else {
        return null
    }
}

function opponentPreciousPieceTrapMoves() {
    let bestTrapMoves = [];
    for (let i = 0; i < playerTwoPieces.length; i++) {
        let playerTwoId = playerTwoPieces[i];
        let piece = pieces[playerTwoId];
        let isItPawn = piece.name === "pawn";
        if (!isItAlreadyTrapingOtherPiece(playerTwoId) && !doesMovingPutKingInDanger(piece.position)) {
            let trapOps = trapOptions(playerTwoId);
            if (trapOps.length > 0) {
                bestTrapMoves.concat(trapOps);
            }
        }
    }

    return bestTrapMoves;
}
function trapOptions(playerTwoId, pieceInDanger = false) {
    let bestTrapMoves = [];
    let piece = pieces[playerTwoId];
    let isItPawn = piece.name === "pawn";
    let allowedMovePositions = allowedMoves(piece, playerTwoId);

    if (allowedMovePositions.length > 0 && piece.name !== "king") {
        for (let pos = 0; pos < allowedMovePositions.length; pos++) {
            let allowedPosition = allowedMovePositions[pos];
            let element = {
                ...piece,
                id : playerTwoId,
                position : allowedPosition
            }
            for (let index = 0; index < playerOnePieces.length; index++) {
                let playerOneId = playerOnePieces[index];

                if (pieces[playerOneId].name !== "pawn" || isItToBePromotedPawn(pieces[playerOneId].position)) {
                    let safeMode;
                    if (pieceInDanger) {
                        safeMode = willItHaveABackup(allowedMovePositions[pos], playerTwoId) || isItSafeToGo(allowedPosition);
                    } else {
                        safeMode = isItPawn ? willItHaveABackup(allowedMovePositions[pos], playerTwoId) : isItSafeToGo(allowedPosition);
                    }
                    if (canGo(element, pieces[playerOneId].position, false) && safeMode && 
                    (pieces[playerOneId].name !== "king" ? !doesMovingPutOthersInDanger(piece.position) : true)) {

                        bestTrapMoves.push({
                            target : pieces[playerOneId].piece,
                            position : allowedPosition,
                            piece_id : playerTwoId,
                        })
                    }
                }
            }
        }
    }
    return bestTrapMoves;
}

function isItAlreadyTrapingOtherPiece(piece_id) {
    let element = {
        id : piece_id,
        ...pieces[piece_id]
    }

    for (let i = 0; i < playerOnePieces.length; i++) {
        let opponentId = playerOnePieces[i];
        if (pieces[opponentId].name !== "pawn") {
            if (canGo(element, pieces[opponentId].position)) {
                return true;
            }
        }
    }
    return false;
}


function isItBestChoiceForTrap(piece_id) {
    let piece = pieces[piece_id];
    let pos = piece.position;

    if (piece.name === "queen" || piece.name === "bishop" || piece.name === "castle") {

        if (middleBoxes(pos, pieces["k1"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["q1"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["c12"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["c11"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["b11"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["b12"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["h12"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["h11"].position, false, true).length === 1) {
            return false
        }
    }

    return true
}

function movingTheMiddlePiece() {
    let queenPos = pieces["q2"].position;
    let bishopOnePos = pieces["b21"].position;
    let bishopTwoPos = pieces["b22"].position;

    for (let i = 0; i < playerTwoPieces.length; i++) {
        let playerTwoId = playerTwoPieces[i];
        let piece = pieces[playerTwoId];
        if (piece.name !== "queen" || piece.name !== "bishop") {
            for (let index = 0; index < playerOnePieces.length; index++) {
                let playerOnePiece = pieces[playerOnePieces[index]]
                if (playerOnePiece.name === "rook" || playerOnePiece.name === "knight" || playerOnePiece.name === "king") {
                    let allowedMovePositions;
                    if (isItTheOnlyMiddlePiece(playerOnePiece.position, queenPos, false, piece.position, true)) {
                        allowedMovePositions = allowedMoves(piece, playerTwoId);
                        if (allowedMovePositions.length > 0) {
                            for (let pos = 0; pos < allowedMovePositions.length; pos++) {
                                if (isItSafeToGo(allowedMovePositions[pos])) {
                                    return {
                                        piece : piece,
                                        pieceId : playerTwoId,
                                        move_to : allowedMovePositions[pos],
                                        toBeEliminatedPieceId : eliminatedPieceWhileTrapMove(allowedMovePositions[pos]).pieceId
                                    }
                                }
                            }
                        }

                    }
                    
                    if (isItTheOnlyMiddlePiece(playerOnePiece.position, bishopOnePos, false, piece.position, true)) {
                        allowedMovePositions = allowedMoves(piece, playerTwoId);
                        if (allowedMovePositions.length > 0) {
                            for (let pos = 0; pos < allowedMovePositions.length; pos++) {
                                if (isItSafeToGo(allowedMovePositions[pos])) {
                                    return {
                                        piece : piece,
                                        pieceId : playerTwoId,
                                        move_to : allowedMovePositions[pos],
                                        toBeEliminatedPieceId : eliminatedPieceWhileTrapMove(allowedMovePositions[pos]).pieceId
                                    }
                                }
                            }
                        }
                    }

                    if (isItTheOnlyMiddlePiece(playerOnePiece.position, bishopTwoPos, false, piece.position, true)) {
                        allowedMovePositions = allowedMoves(piece, playerTwoId);
                        if (allowedMovePositions.length > 0) {
                            for (let pos = 0; pos < allowedMovePositions.length; pos++) {
                                if (isItSafeToGo(allowedMovePositions[pos])) {
                                    return {
                                        piece : piece,
                                        pieceId : playerTwoId,
                                        move_to : allowedMovePositions[pos],
                                        toBeEliminatedPieceId : eliminatedPieceWhileTrapMove(allowedMovePositions[pos]).pieceId
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}

function eliminatedPieceWhileTrapMove(choosenPosition) {
    for (let i = 0; i < playerOnePieces.length; i++) {
        if (pieces[playerOnePieces[i]].position === choosenPosition) {
            return {
                pieceId : playerOnePieces[i]
            }
        }
    }
    return { pieceId : "" }
}

function willItHaveABackup(newPosition, selfId) {
    for (let i = 0; i < playerTwoPieces.length; i++) {
        let id = playerTwoPieces[i]
        if (id !== selfId && pieces[id].name !== "king") {
            if (canGo(pieces[id], newPosition, false)) {
                return true;
            }
        }
    }
    return false;
}


function trapMove(pieces, playerTwoPieces) {
    return trapMoveOption();
}

function castelingMove() {
    return castelingMoveOption();
}

function kingUnderThreatMove() {
    return kingUnderThreatMoveOption()
}

function pieceUnderThreatMove() {
    return pieceUnderThreatMoveOption(piecesInDanger())
}

function opponentEliminationMove() {
    return opponentEliminationMoveOption();
}

function opponentPawnEliminationMove(argument) {
    return opponentPawnEliminationMoveOption()
}

function randomMove(random_move) {
    return randomMoveOption(random_move)
}

function fallbackMove() {
    return fallbackMoveOption()
}

function firstMove() {
    return firstMoveOption()
}




