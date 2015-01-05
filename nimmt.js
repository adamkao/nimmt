var i, j,
	cardpos = [
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
	],
	cardorder = [
		[ '#card11', '#card12', '#card13', '#card14', '#card15', '#card16', '#card17', '#card18', '#card19', '#card110' ],
		[ '#card21', '#card22', '#card23', '#card24', '#card25', '#card26', '#card27', '#card28', '#card29', '#card210' ],
		[ '#card31', '#card32', '#card33', '#card34', '#card35', '#card36', '#card37', '#card38', '#card39', '#card310' ],
		[ '#card41', '#card42', '#card43', '#card44', '#card45', '#card46', '#card47', '#card48', '#card49', '#card410' ],
		[ '#card51', '#card52', '#card53', '#card54', '#card55', '#card56', '#card57', '#card58', '#card59', '#card510' ],
		[ '#card61', '#card62', '#card63', '#card64', '#card65', '#card66', '#card67', '#card68', '#card69', '#card610' ]
	];

function creategame( pid1, pid2, pid3 ) {
	$.post('api.php', { action: 'creategame', pid1: pid1, pid2: pid2, pid3: pid3 }, function(data){
		$('#output').val(data);
		handarr = $.parseJSON( data );
		$('#hand11').val(handarr[0]);
		$('#hand12').val(handarr[1]);
		$('#hand13').val(handarr[2]);
		$('#hand21').val(handarr[0]);
		$('#hand22').val(handarr[2]);
		$('#hand23').val(handarr[1]);
		$('#hand31').val(handarr[1]);
		$('#hand32').val(handarr[2]);
		$('#hand33').val(handarr[0]);
		$('#hand41').val(handarr[1]);
		$('#hand42').val(handarr[0]);
		$('#hand43').val(handarr[2]);
		$('#hand51').val(handarr[2]);
		$('#hand52').val(handarr[0]);
		$('#hand53').val(handarr[1]);
		$('#hand61').val(handarr[2]);
		$('#hand62').val(handarr[1]);
		$('#hand63').val(handarr[0]);
		$('#row11').val(handarr[3]);
	}).fail(function() {
		alert( "POST creategame failed." );
	});
	return false;	
}

function pointify( hand ) {
	var card, len, last;
	cardarr = hand.split( ' ' );
	for (i = 0; i < cardarr.length; i++) {
		card = cardarr[i];
		len = card.length;
		last = card.substr( len - 1, 1 );
		if (last == '5') {
			cardarr[i] = card + '/2';
		} else if (last == '0') {
			cardarr[i] = card + '/3';
		} else if (Math.floor( card/11 ) == card/11) {
			cardarr[i] = card + '/5';
		}
		if (card == '55') {
			cardarr[i] = card + '/7';
		}
	}
	return cardarr.join( ' ' );
}
function getgame( gameid ) {
	var rowarray;
	$.get('api.php', { action: 'getgame', gameid: gameid }, function(data){
		$('#output').val(data);
		handarr = $.parseJSON( data );
		handarr[0] = pointify( handarr[0] );
		handarr[1] = pointify( handarr[1] );
		handarr[2] = pointify( handarr[2] );
		$('#hand11').val(handarr[0]);
		$('#hand12').val(handarr[1]);
		$('#hand13').val(handarr[2]);
		$('#hand21').val(handarr[0]);
		$('#hand22').val(handarr[2]);
		$('#hand23').val(handarr[1]);
		$('#hand31').val(handarr[1]);
		$('#hand32').val(handarr[2]);
		$('#hand33').val(handarr[0]);
		$('#hand41').val(handarr[1]);
		$('#hand42').val(handarr[0]);
		$('#hand43').val(handarr[2]);
		$('#hand51').val(handarr[2]);
		$('#hand52').val(handarr[0]);
		$('#hand53').val(handarr[1]);
		$('#hand61').val(handarr[2]);
		$('#hand62').val(handarr[1]);
		$('#hand63').val(handarr[0]);
		rowarray = handarr[3].split( ' ' );
		rowarray[0] = pointify( rowarray[0] );
		rowarray[1] = pointify( rowarray[1] );
		rowarray[2] = pointify( rowarray[2] );
		rowarray[3] = pointify( rowarray[3] );
		$('#row11').val(rowarray[0]);
		$('#row12').val(rowarray[1]);
		$('#row13').val(rowarray[2]);
		$('#row14').val(rowarray[3]);
		$('#row21').val(rowarray[0]);
		$('#row22').val(rowarray[1]);
		$('#row23').val(rowarray[2]);
		$('#row24').val(rowarray[3]);
		$('#row31').val(rowarray[0]);
		$('#row32').val(rowarray[1]);
		$('#row33').val(rowarray[2]);
		$('#row34').val(rowarray[3]);
		$('#row41').val(rowarray[0]);
		$('#row42').val(rowarray[1]);
		$('#row43').val(rowarray[2]);
		$('#row44').val(rowarray[3]);
		$('#row51').val(rowarray[0]);
		$('#row52').val(rowarray[1]);
		$('#row53').val(rowarray[2]);
		$('#row54').val(rowarray[3]);
		$('#row61').val(rowarray[0]);
		$('#row62').val(rowarray[1]);
		$('#row63').val(rowarray[2]);
		$('#row64').val(rowarray[3]);
	}).fail(function() {
		alert( "GET getgame failed." );
	});
	return false;
}

function makemove( gameid, move ) {
	$.post('api.php', { action: 'makemove', gameid: gameid, move: move }, function(data){
		$('#output').html(data);
	}).fail(function() {
		alert( "POST makemove failed." );
	});
	return false;
}

function sel( set, card ) {

}

var dragcardid, dragcardidx, currenttab;

  $(function() {
    $( ".card" ).draggable( {
    	containment: 'parent',
    	start: function( e, ui ) {
    		var pos;
    			currenttab = $( '#tabs' ).tabs( 'option', 'active' );
    		dragcardid = e.originalEvent.target.id;
    		pos = $( '#' + dragcardid ).offset().left,
    		dragcardidx = 0;
    		while (pos > cardpos[currenttab][dragcardidx]) {
    			dragcardidx++;
    		}
    	},
    	drag: function( event, ui ) {
    		var pos = $( '#' + dragcardid ).offset().left,
    			currenttab = $( '#tabs' ).tabs( 'option', 'active' );
    				$('#output').val(dragcardidx);

    		for (i = 0; i < 10; i++) {
    			if (pos > cardpos[currenttab][i]) {
    				$( cardorder[currenttab][i] ).offset( { left: cardpos[currenttab][i] } );    				
    			} else {

    			}
}			
    		for (i = dragcardidx + 1; i < 10; i++) {

    				$( cardorder[currenttab][i] ).offset( { left: cardpos[currenttab][i + 1] } );    				
    			}
    		/*
    		if (relX > cardpos[0][1]) {
				$( '#card12').offset( { left: cardpos[0][0] } );
    		}
    		if (relX > cardpos[0][2]) {
				$( '#card13').offset( { left: cardpos[0][1] } );
    		}
    		if (relX > cardpos[0][3]) {
				$( '#card14').offset( { left: cardpos[0][2] } );
    		}
    		if (relX > cardpos[0][4]) {
				$( '#card15').offset( { left: cardpos[0][3] } );
    		}
    		if (relX > cardpos[0][5]) {
				$( '#card16').offset( { left: cardpos[0][4] } );
    		}
    		if (relX > cardpos[0][6]) {
				$( '#card17').offset( { left: cardpos[0][5] } );
    		}
    		if (relX > cardpos[0][7]) {
				$( '#card18').offset( { left: cardpos[0][6] } );
    		}
    		if (relX > cardpos[0][8]) {
				$( '#card19').offset( { left: cardpos[0][7] } );
    		}
    		if (relX > cardpos[0][9]) {
				$( '#card110').offset( { left: cardpos[0][8] } );
    		}
    		*/
    	}
    } );
  });

  $(function() {
    $( "#tabs" ).tabs();
  });

$( document ).ready( function() {
	for (i = 0; i < 1; i++) {
		for (j = 0; j < 10; j++) {
			cardpos[i][j] = $( cardorder[i][j] ).offset().left;
		}
	}
	getgame( 4 );
} );
