var cardarr = [], pointifiedcardarr = [], rowarr = [], pointifiedrowarr = [];

function pointify( card ) {
	var last = card.substr( card.length - 1, 1 );
	if (card === '55') return '55/7';
	if (last === '5') return card + '/2';
	if (last === '0') return card + '/3';
	if (card%11 === 0) return  card + '/5';
	return card
}

function creategame( pid1, pid2, pid3 ) {
	$.get( 'api.php', { action: 'creategame', pid1: pid1, pid2: pid2, pid3: pid3 },
		function( data ) {
			$( '#output' ).html( data );
		}
		).fail( function() { alert( "GET creategame failed." ) } );
}

function getgame( gameid ) {
	$.get( 'api.php', { action: 'getgame', gameid: gameid },
		function( data ) {
			var j = 0, obj = $.parseJSON( data );
			cardarr[0] = obj.hand1.split( ' ' );
			cardarr[1] = obj.hand2.split( ' ' );
			cardarr[2] = obj.hand3.split( ' ' );
			pointifiedcardarr[0] = $.map( cardarr[0], function( card ) { return pointify( card ) } );
			pointifiedcardarr[1] = $.map( cardarr[1], function( card ) { return pointify( card ) } );
			pointifiedcardarr[2] = $.map( cardarr[2], function( card ) { return pointify( card ) } );
			$( '#remain11' ).html( pointifiedcardarr[0].join( ' ' ) );
			$( '#remain12' ).html( pointifiedcardarr[1].join( ' ' ) );
			$( '#remain13' ).html( pointifiedcardarr[2].join( ' ' ) );
			$( '#row11' ).html( pointify( obj.row1 ) );
			$( '#row12' ).html( pointify( obj.row2 ) );
			$( '#row13' ).html( pointify( obj.row3 ) );
			$( '#row14' ).html( pointify( obj.row4 ) );
			for (j = 0; j < 10; j++) {
				el = $( '#card' + j );
				el.html( pointifiedcardarr[0][j] );
				el.data( 'th', j );
				offsetslefttoright[j] = el.offset().left;
				cardslefttoright[j] = el;
			}
		}
		).fail( function() { alert( "GET getgame failed." ) } );
}

function makemove( gameid, move ) {
	$.post('api.php', { action: 'makemove', gameid: gameid, move: move },
		function( data ) { $( '#output' ).html( data ) }
		).fail( function() { alert( "POST makemove failed." ) } );
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

function submit( tab ) {
	var cardvals = $.map( cardslefttoright, function( el ) { return el.html() } );
	$( '#output' ).html( cardvals.join( ' ' ) );
	$( '#yourplay' + tab ).hide();
	$( '#toplayline' + tab ).show();
	$( '#tab' + tab ).css( 'background-color', 'gray' );
}

function pick( tab, row ) {

}

$( document ).ready(
	function() {
		var i = 0;
		for (i = 1; i <= 6; i++) {
			$( '#tab' + i ).css( 'background-color', 'green' );
		}
		getgame( 4 );
	}
	);
