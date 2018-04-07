
	RED = 0;
	BLUE = 1;
	DARK = 2;
	YELLOW = 3;

	function Piece(n, c){
		
		this.number = n;		//from 1 to 13
		this.color = c;
		this.amount = 2;
		
		this.score = 0;
		this.formsSet = false;
		
	}
	
	Board = {};
	Board.allPieces = NULL;
	function initPieces(){
		Board.allPieces = new Array();
		for(var i = 1; i<=13; i++){
			Board.allPieces.push(new Piece(i, RED));
			Board.allPieces.push(new Piece(i, BLUE));
			Board.allPieces.push(new Piece(i, DARK));
			Board.allPieces.push(new Piece(i, YELLOW));}}
	
	Hand = {};
	Hand.pieces = new Array(0);
	Hand.removePiece = function(number, color){
		for(var i = 0; i<Hand.pieces.length; i++){
			if(Hand.pieces[i].color == color && Hand.pieces[i].number == number){
				Hand.pieces.splice(i, 1);
				break;}}}
	Hand.piecesByColor = new Array(0);
	Hand.initPiecesByColor = function(){
		Hand.piecesByColor[RED]		= new Array(0);
		Hand.piecesByColor[BLUE]	= new Array(0);
		Hand.piecesByColor[DARK]	= new Array(0);
		Hand.piecesByColor[YELLOW]	= new Array(0);}
	Hand.resetPiecesByColor = function(){
		Hand.piecesByColor = new Array(0);
		Hand.initPiecesByColor();}
	Hand.sortPiecesByColor = function(){
		for(var i = 0; i<Hand.pieces.length; i++){
			console.log(Hand.pieces[i].number);
			Hand.pieces[i].score = 0;
			var currentPieceColor = Hand.pieces[i].color;
			Hand.piecesByColor[currentPieceColor].push(Hand.pieces[i]);}
		for(var i = 0; i<4; i++){
			Hand.piecesByColor[i].sort(function(pieceA, pieceB){
				return pieceA.number - pieceB.number;});
			console.log("Pieces of same color: " + Hand.piecesByColor[i].length);}}
	Hand.scorePieces = function(){
		
	}
			
			
		RED:	2 7 8 10 13
		BLUE:	4 5 6 9 10
		YELLOW:	6 11
		DARK:	1 6 10
		
		for each piece:
			looks for matches. more matches = bigger score
			matches don't exist in deck = lower score
			only 2 in match and distance to left and right is big = lower score
			
			more pieces in the same color = bigger score
			less distance to left and right = bigger score
			left and right don't exist in deck = lower score
			closer to max left and right = smaller score
			
			double = percent lower score depending on matches and distance
	
		
		
	var EndPiece				= NULL;
	var AlwaysAvailablePiece	= NULL;
	
	var customConsole		= NULL;
	var logger				= NULL;
	
	
	function analyzeHand(){
		Hand.resetPiecesByColor();
		Hand.sortPiecesByColor();
		
	}
	
	function process(string_input){
		var input = string_input.split(" ");
		var command = input[0];
		if(command == "in"){
			var newHandPiece = new Piece(1, RED);
			var pieceNumber;
			var pieceColor;
			switch(input[1][0]){
				case "r": pieceColor = RED; break;
				case "b": pieceColor = BLUE; break;
				case "d": pieceColor = DARK; break;
				case "y": pieceColor = YELLOW; break;}
			pieceNumber = parseInt(input[1].substr(1, input[1].length-1));
			newHandPiece.color = pieceColor;
			newHandPiece.number = pieceNumber;
			Hand.pieces.push(newHandPiece);
			console.log("Added " + input[1]);}
		else if(command == "out"){
			var pieceNumber;
			var pieceColor;
			switch(input[1][0]){
				case "r": pieceColor = RED; break;
				case "b": pieceColor = BLUE; break;
				case "d": pieceColor = DARK; break;
				case "y": pieceColor = YELLOW; break;}
			pieceNumber = parseInt(input[1].substr(1, input[1].length-1));
			var pieceIndexOnBoard = (pieceNumber - 1) * 4 + pieceColor;
			Board.pieces[pieceIndexOnBoard].amount--;
			console.log(input[1] + " is out of the deck.");}
		else if(command == "drop"){
			var pieceNumber;
			var pieceColor;
			switch(input[1][0]){
				case "r": pieceColor = RED; break;
				case "b": pieceColor = BLUE; break;
				case "d": pieceColor = DARK; break;
				case "y": pieceColor = YELLOW; break;}
			pieceNumber = parseInt(input[1].substr(1, input[1].length-1));
			Hand.removePiece(pieceNumber, pieceColor);
			console.log("Dropped " + input[1]);
			}
		else if(command == "end"){
			alert("wtf");
			var pieceNumber;
			var pieceColor;
			switch(input[1][0]){
				case "r": pieceColor = RED; break;
				case "b": pieceColor = BLUE; break;
				case "d": pieceColor = DARK; break;
				case "y": pieceColor = YELLOW; break;}
			pieceNumber = parseInt(input[1].substr(1, input[1].length-1));
			var pieceIndexOnBoard = (pieceNumber - 1) * 4 + pieceColor;
			Board.pieces[pieceIndexOnBoard].amount--;
			EndPiece = new Piece(pieceNumber, pieceColor);
			console.log("Set end piece to " + input[1]);}
		else if(command == "av"){
			var pieceNumber;
			var pieceColor;
			switch(input[1][0]){
				case "r": pieceColor = RED; break;
				case "b": pieceColor = BLUE; break;
				case "d": pieceColor = DARK; break;
				case "y": pieceColor = YELLOW; break;}
			pieceNumber = parseInt(input[1].substr(1, input[1].length-1));
			var pieceIndexOnBoard = (pieceNumber - 1) * 4 + pieceColor;
			Board.pieces[pieceIndexOnBoard].amount--;
			AlwaysAvailablePiece = new Piece(pieceNumber, pieceColor);}
		else if(command == "go"){
			analyzeHand();
		}
		}
	
	function initConsole(){
		customConsole = createElement("textarea");
		normalizeConsole(customConsole);
		add(customConsole);
		logger = createElement("scrollbox");
		add(logger);
		customConsole.onkeypress = function(event){ 
			if(event.keyCode == KEY_ENTER){
				process(customConsole.value);
				var newPar = createElement("p");
				newPar.innerHTML = customConsole.value;
				logger.appendChild(newPar);
				customConsole.value = "";
				logger.scrollTop = logger.scrollHeight;
				return false;}}}
				

	function main(){
		initPieces();
		initConsole();
	
	} window.onload = main;
	
	450 pui
	160 paine
	80 ou
	300 ciocolata
	100	rosii
	30	paprika
	35	cucumba
	70	zmeuri
	____
	1225
	
	
	
	
	
	
	
	