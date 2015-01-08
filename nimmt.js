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

var offsetslefttoright = [], cardslefttoright = [];

$( function() {
	var targetel = null, targetth = null;
	$( "#tabs" ).tabs();
	$( ".card" ).draggable( {
		containment: 'parent',
		start: function( e, ui ) {
			targetel = $( '#' + e.originalEvent.target.id );
			targetth = targetel.data( 'th' );
		},
		drag: function( e, ui ) {
			var offset = targetel.offset().left;
			var nextlfoffset = targetth ? offsetslefttoright[targetth - 1] : null;
			var nextrtoffset = targetth < 9 ? offsetslefttoright[targetth + 1] : null;
			var shiftcard = null;
			if        (nextlfoffset && (offset <= nextlfoffset)) {
				shiftcard = cardslefttoright[targetth - 1];
    			shiftcard.offset( { left: offsetslefttoright[targetth] } );
    			cardslefttoright[targetth] = shiftcard;
    			shiftcard.data( 'th', targetth );
    			targetth--;
    			targetel.data( 'th', targetth );
			} else if (nextrtoffset && (offset >= nextrtoffset)) {
				shiftcard = cardslefttoright[targetth + 1];
    			cardslefttoright[targetth] = shiftcard;
    			shiftcard.offset( { left: offsetslefttoright[targetth] } );    				
    			shiftcard.data( 'th', targetth );
    			targetth++;
    			targetel.data( 'th', targetth );
			}
			$( '#output' ).html( '0: ' + cardslefttoright[0].html() + ', 3: ' + cardslefttoright[3].html() + ', 6: ' + cardslefttoright[6].html() + ', 9: ' + cardslefttoright[9].html() 
				+ '<br>' + targetth + 'th' );
		},
		stop: function( e, ui ) {
			cardslefttoright[targetth] = targetel;
    		targetel.offset( { left: offsetslefttoright[targetth] } );    							
    		targetel.data( 'th', targetth );
			$( '#output' ).html( '0: ' + cardslefttoright[0].html() + ', 3: ' + cardslefttoright[3].html() + ', 6: ' + cardslefttoright[6].html() + ', 9: ' + cardslefttoright[9].html() 
				+ '<br>' + targetth + 'th' );
		}
	} );
} );

$( document ).ready( function() {
	var j, el;
		for (j = 0; j < 10; j++) {
			el = $( '#card' + j );
			el.data( 'th', j );
			offsetslefttoright[j] = el.offset().left;
			cardslefttoright[j] = el;
		}
} );
