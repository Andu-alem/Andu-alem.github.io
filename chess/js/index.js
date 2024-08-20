$(document).ready(function(){
	let allPieces = [];
	let promotedPawn;
	let chessBoard = new Array(64);
	let lastMoves = [];
	let isTwoPlayerModeOn = false;

	setup();
    for (var i = 0; i < chessBoard.length; i++) {
    	$("#"+chessBoard[i]).click(function(){
    		let child = $(this).children();
    		let childPiece = null;
    		if (child.length > 0) {
    			childPiece = {
    				id : child[0].id,
    				...allPieces[child[0].id]
    			}
    		}
    		//console.log("The last move is - ",lastMoves)
    		if (childPiece !== null) {
    			$(this).attr("style", "border: 3px groove #00ffaa;");
    		}
    		if (movingPiece !== null && childPiece !== null) {
    			if (movingPiece.player === childPiece.player) {
    				$(`#${movingPiece.position}`).attr("style", "border: none;");
    			}
    		}
    		let moveResult;
    		moveResult = playerOne($(this).attr("id"), allPieces, childPiece, promotedPawn);
    		if (moveResult !== undefined) {
    			updateBoard(moveResult);
    			$(this).attr("style", "border: none;");
    			moveResult = undefined;
    			if (!isTwoPlayerModeOn) {
	    			setTimeout(function() {
	    				moveResult = computer(allPieces, promotedPawn);
	    				if (moveResult !== undefined) {
	    					if (moveResult.castelingMove !== undefined) {
	    						updateBoard(moveResult.castelingMove[0]);
	    						updateBoard(moveResult.castelingMove[1]);
	    					} else {
	    						updateBoard(moveResult);
	    					}
	    					moveResult = undefined;
	    				}
	    			}, 3000);
	    		}
    		}
	    });	
    }
    $("#twoPlayerMode").click(function() {
    	if (lastMoves.length === 0) {
    		isTwoPlayerModeOn = !isTwoPlayerModeOn
    	}
    	if (isTwoPlayerModeOn) {
    		$("#twoPlayerMode").attr("style","background-color: green; color : white;");
    	} else {
    		$("#twoPlayerMode").attr("style","background-color: none;");
    	}
    })

    $("#undo").click(function() {
    	undoLastMove(lastMoves.pop());
    	undoLastMove(lastMoves.pop());
    });

    function  undoLastMove(lastMove) {
    	let movedPiece = allPieces[lastMove.pieceId];
    	let movedPos = lastMove.movedTo;
    	let lastPosition = lastMove.movedFrom;
    	let innerHtml = $(`#${movedPos}`).html();

    	if (lastMove.eliminatedPieceID !== "") {
    		$(`#${movedPos}`).html(`<b class='${allPieces[lastMove.eliminatedPieceID].player}' id='${lastMove.eliminatedPieceID}'>${allPieces[lastMove.eliminatedPieceID].internalValue}</b>`);
    		if (allPieces[lastMove.eliminatedPieceID].player === "player1") {
	            updateData(lastMove.eliminatedPieceID, null, null, null);
	        } else {
	            updateData(null, lastMove.eliminatedPieceID, null, null);
	        }
    	} else {
    		$(`#${movedPos}`).empty();
    	}
    	$(`#${lastPosition}`).html(innerHtml);
    	allPieces[lastMove.pieceId].position = lastPosition;
    }

    function updateBoard(moveResult) {
    	if (moveResult.checkMate === true) {
            playAgain();
            return
    	}
    	let movingPieceId = moveResult.movingPieceId;
    	let movingPiece = allPieces[movingPieceId];
    	let pieceToBeEliminatedID = moveResult.eliminatedPieceID;
    	let nextPosition = moveResult.moveTo;
    	let innerHtml = $(`#${movingPiece.position}`).html();

    	lastMoves.push({
        	pieceId : movingPieceId,
        	movedFrom : movingPiece.position,
        	movedTo : nextPosition,
        	eliminatedPieceID : pieceToBeEliminatedID
        });

        $(`#${nextPosition}`).html(innerHtml);
        $(`#${movingPiece.position}`).empty();
        $(`#${movingPiece.position}`).attr("style", "border : none");
        allPieces[movingPieceId].position = nextPosition;

        if (pieceToBeEliminatedID !== "") {
            if(isPlayerOneTurn){
                $("#playerOneGain").append(`<span>&nbsp;${allPieces[pieceToBeEliminatedID].internalValue},</span>`);
                playerTwoPieces = playerTwoPieces.filter(function(item){
                    return item !== pieceToBeEliminatedID;
                });
            }else {
                $("#playerTwoGain").append(`<span>&nbsp;${allPieces[pieceToBeEliminatedID].name},</span>`);
                playerOnePieces = playerOnePieces.filter(function(item){
                    return item !== pieceToBeEliminatedID;
                });
            }
            allPieces[pieceToBeEliminatedID].position = null;
        }
        if (piecesMadeFirstMove.indexOf(movingPieceId) === -1) {
            piecesMadeFirstMove.push(movingPieceId);
        }
        if (movingPiece.name === "pawn") {
        	let pieceId = promotionMove(nextPosition , movingPieceId);
        	if (pieceId !== null) {
        		$(`#${nextPosition}`).html(`<b class='${allPieces[pieceId].player}' id='${pieceId}'>${allPieces[pieceId].internalValue}</b>`)
        	}
        }


        $(`#${allPieces["k2"].position}`).attr("style", "border : none;");
        movingPiece = null;
    }

    function playAgain() {
    	let player = isPlayerOneTurn? "Player One": "Player Two";
        $(`#checkMate`).html(`Check Mate !!! ${player} Won`)
        setTimeout(function() {
            let playagain = confirm("The Game is Over \n Do you want to play again");
            if(playagain){
                //reload
                window.location = "file:///C:/Users/andi/Desktop/Web/chessUpdated/index.html";
            }
        }, 5000);
    }

    function promotionMove(nextPosition , movingPieceId) {
    	let nextPositionIndex = board.indexOf(nextPosition) + 1;
    	let upgradeTo, id, value, name;
        if (!isPlayerOneTurn) {
            if (nextPositionIndex % 8 === 0) {
                upgradeTo = prompt("Choose a piece number to upgrade: \n 1. Queen \n 2. rook \n 3. Bishop \n 4. knight");
                if (upgradeTo === "1") {
                    id = `q${movingPieceId.slice(1)}`
                    name = "queen";
                    value = "Qn";
                } else if (upgradeTo === "2") {
                    id = `c${movingPieceId.slice(1)}`
                    name = "rook";
                    value = "Ca";
                } else if (upgradeTo === "3") {
                    id = `b${movingPieceId.slice(1)}`
                    name = "bishop";
                    value = "Bi";
                } else if (upgradeTo === "4") {
                    id = `h${movingPieceId.slice(1)}`
                    name = "knight";
                    value = "H";
                }
            } 
        } else{
             if (nextPositionIndex % 8 === 1) {
                let upgrade = ["1", "2", "3", "4"]
                upgradeTo = upgrade[Math.floor(Math.random()*4)];
                if (upgradeTo === "1") {
                    id = `q${movingPieceId.slice(1)}`
                    name = "queen";
                    value = "Q";
                } else if (upgradeTo === "2") {
                    id = `c${movingPieceId.slice(1)}`
                    name = "rook";
                    value = "Ca";
                } else if (upgradeTo === "3") {
                    id = `b${movingPieceId.slice(1)}`
                    name = "bishop";
                    value = "Bi";
                } else if (upgradeTo === "4") {
                    id = `h${movingPieceId.slice(1)}`
                    name = "knight";
                    value = "H";
                }
            }
        }
        if (upgradeTo !== undefined) {
        	allPieces[movingPieceId].position = null;
	        allPieces = {
	        	...allPieces,
	        	[id] : {
	        		name : name,
	        		position : nextPosition,
	        		internalValue : value,
	        		player : !isPlayerOneTurn ? "player1" : "player2"
	        	}
	        }
	        promotedPawn = {
	        	id : movingPieceId,
	        	to : id,
	        	player : !isPlayerOneTurn ? "player1" : "player2"
	        }

	        return id
        }
        return null
    }

	function setup(){
    	allPieces = {
			c11 : {
	    		position: "a1",
	    		internalValue: "Ca",
	    		name : "rook",
	    		player: "player1"
	    	},
	    	h11 : {
	    		position: "b1",
	    		internalValue: "H",
	    		name : "knight",
	    		player: "player1"
	    	},
	    	b11 : {
	    		position: "c1",
	    		internalValue: "Bi",
	    		name : "bishop",
	    		player: "player1"
	    	},
	    	q1 : {
	    		position: "d1",
	    		internalValue: "Qn",
	    		name : "queen",
	    		player: "player1"
	    	},
	    	k1 : {
	    		position: "e1",
	    		internalValue: "King",
	    		name : "king",
	    		player: "player1"
	    	},
	    	b12 : {
	    		position: "f1",
	    		internalValue: "Bi",
	    		name : "bishop",
	    		player: "player1"
	    	},
	    	h12 : {
	    		position: "g1",
	    		internalValue: "H",
	    		name : "knight",
	    		player: "player1"
	    	},
	    	c12 : {
	    		position: "h1",
	    		internalValue: "Ca",
	    		name : "rook",
	    		player: "player1"
	    	},
	    	p11 : {
	    		position: "a2",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player1"
	    	},
	    	p12 : {
	    		position: "b2",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player1"
	    	},
	    	p13 : {
	    		position: "c2",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player1"
	    	},
	    	p14 : {
	    		position: "d2",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player1"
	    	},
	    	p15 : {
	    		position: "e2",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player1"
	    	},
	    	p16 : {
	    		position: "f2",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player1"
	    	},
	    	p17 : {
	    		position: "g2",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player1"
	    	},
	    	p18 : {
	    		position: "h2",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player1"
	    	},
	    	c21 : {
	    		position: "a8",
	    		internalValue: "Ca",
	    		name : "rook",
	    		player: "player2"
	    	},
	    	h21 : {
	    		position: "b8",
	    		internalValue: "H",
	    		name : "knight",
	    		player: "player2"
	    	},
	    	b21 : {
	    		position: "c8",
	    		internalValue: "Bi",
	    		name : "bishop",
	    		player: "player2"
	    	},
	    	k2 : {
	    		position: "e8",
	    		internalValue: "King",
	    		name : "king",
	    		player: "player2"
	    	},
	    	q2 : {
	    		position: "d8",
	    		internalValue: "Qn",
	    		name : "queen",
	    		player: "player2"
	    	},
	    	b22 : {
	    		position: "f8",
	    		internalValue: "Bi",
	    		name : "bishop",
	    		player: "player2"
	    	},
	    	h22 : {
	    		position: "g8",
	    		internalValue: "H",
	    		name : "knight",
	    		player: "player2"
	    	},
	    	c22 : {
	    		position: "h8",
	    		internalValue: "Ca",
	    		name : "rook",
	    		player: "player2"
	    	},
	    	p21 : {
	    		position: "a7",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player2"
	    	},
	    	p22 : {
	    		position: "b7",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player2"
	    	},
	    	p23 : {
	    		position: "c7",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player2"
	    	},
	    	p24 : {
	    		position: "d7",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player2"
	    	},
	    	p25 : {
	    		position: "e7",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player2"
	    	},
	    	p26 : {
	    		position: "f7",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player2"
	    	},
	    	p27 : {
	    		position: "g7",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player2"
	    	},
	    	p28 : {
	    		position: "h7",
	    		internalValue: "Pw",
	    		name : "pawn",
	    		player: "player2"
	    	}
    	}

	    for (var i = 1; i < 65; i++) {
	    	if(i<9){
	    		chessBoard[i-1] = "a"+i;
	    	}else if(i < 17){
	    		chessBoard[i-1] = "b"+(i-8);
	    	}else if(i < 25){
	    		chessBoard[i-1] = "c"+(i-16);
	    	}else if(i < 33){
	    		chessBoard[i-1] = "d"+(i-24);
	    	}else if(i < 41){
	    		chessBoard[i-1] = "e"+(i-32);
	    	}else if(i < 49){
	    		chessBoard[i-1] = "f"+(i-40);
	    	}else if(i < 57){
	    		chessBoard[i-1] = "g"+(i-48);
	    	}else{
	    		chessBoard[i-1] = "h"+(i-56);
	    	}
	    }

	    for (var i = 0; i < chessBoard.length; i++) {
	    	
	    	if(Math.ceil((i+1)/8)%2 !== 0){
	    		if(i%2 === 0){
		    		$("#chessBoard").append(`<div class='board-box black' id='${chessBoard[i]}'></div>`);
		    	}else{
		    		$("#chessBoard").append(`<div class='board-box white' id='${chessBoard[i]}'></div>`);
		    	}
	    	}else{
	    		if(i%2 === 0){
		    		$("#chessBoard").append(`<div class='board-box white' id='${chessBoard[i]}'></div>`);
		    	}else{
		    		$("#chessBoard").append(`<div class='board-box black' id='${chessBoard[i]}'></div>`);
		    	}
	    	}
	    }

	    for (piece in allPieces){
	    	$(`#${allPieces[piece].position}`).html(`<b class='${allPieces[piece].player}' id='${piece}'>${allPieces[piece].internalValue}</b>`);
	    }
	}
});