var cardarr = [], pointifiedcardarr = [], rowarr = [], pointifiedrowarr = [];

function padnum( n ) {return ( '     ' + n ).slice( -5 )}

function creategame( pid1, pid2, pid3 ) {
	$.post('api.php', { action: 'creategame', pid1: pid1, pid2: pid2, pid3: pid3 }, function(data){
		$('#output').val(data);
		handarr = $.parseJSON( data );
	}).fail(function() {
		alert( "POST creategame failed." );
	});
	return false;	
}

function pointify( card ) {
	var last = card.substr( card.length - 1, 1 );
	if (card === '55') return '55/7';
	if (last === '5') return card + '/2';
	if (last === '0') return card + '/3';
	if (card%11 === card/11) return  card + '/5';
	return card
}

function getgame( gameid ) {
	var j, handarr, rowarray;
	$.get('api.php', { action: 'getgame', gameid: gameid }, function(data){
		$('#output').val(data);
		handarr = $.parseJSON( data );
		cardarr[0] = handarr[0].split( ' ' );
		pointifiedcardarr[0] = $.map( cardarr[0], function( card ){
			return pointify( card )
		})
		cardarr[1] = handarr[1].split( ' ' );
		pointifiedcardarr[1] = $.map( cardarr[1], function( card ){
			return pointify( card )
		})
		cardarr[2] = handarr[2].split( ' ' );
		pointifiedcardarr[2] = $.map( cardarr[2], function( card ){
			return pointify( card )
		})
		$('#remain11').html( pointifiedcardarr[0].join( ' ' ) );
		$('#remain12').html( pointifiedcardarr[1].join( ' ' ) );
		$('#remain13').html( pointifiedcardarr[2].join( ' ' ) );
		rowarray = handarr[3].split( ' ' );
		$('#row11').html( rowarray[0] );
		$('#row12').html( rowarray[1] );
		$('#row13').html( rowarray[2] );
		$('#row14').html( rowarray[3] );
		for (j = 0; j < 10; j++) {
			el = $( '#card' + j );
			el.html( pointifiedcardarr[0][j] );
			el.data( 'th', j );
			offsetslefttoright[j] = el.offset().left;
			cardslefttoright[j] = el;
		}

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
		},
		stop: function( e, ui ) {
			cardslefttoright[targetth] = targetel;
			targetel.offset( { left: offsetslefttoright[targetth] } );    							
			targetel.data( 'th', targetth );
		}
	} );
} );

$( document ).ready( function() {
	var j, el;
	getgame( 4 );
} );
