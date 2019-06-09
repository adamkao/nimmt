<?php

function create_game( $DBH, $id1, $id2, $id3 )
{
  $deck = range( 1, 104 );
  shuffle( $deck );

  $hand1 = array_slice( $deck, 0, 10 );
  $hand2 = array_slice( $deck, 10, 10 );
  $hand3 = array_slice( $deck, 20, 10 );
  $row1 = array_slice( $deck, 30, 1 );
  $row2 = array_slice( $deck, 31, 1 );
  $row3 = array_slice( $deck, 32, 1 );
  $row4 = array_slice( $deck, 33, 1 );
  sort( $hand1 );
  sort( $hand2 );
  sort( $hand3 );
  $hand1str = join( ' ', $hand1 );
  $hand2str = join( ' ', $hand2 );
  $hand3str = join( ' ', $hand3 );
  $row1str = join( ' ', $row1 );
  $row2str = join( ' ', $row2 );
  $row3str = join( ' ', $row3 );
  $row4str = join( ' ', $row4 );

  $dbuser = 'test00';
  $pass = 'test00';
  $DBH = new PDO( 'mysql:host=localhost;dbname=temptest', $dbuser, $pass );

  $stmt = $DBH->prepare( 'INSERT INTO nimmtsetup '
    . '(player1, player2, player3, hand1, hand2, hand3, row1, row2, row3, row4) '
    . 'VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);' );
  if (!$stmt->execute( array( $id1, $id2, $id3,
    $hand1str, $hand2str, $hand3str,
    $row1str, $row2str, $row3str, $row4str ) ))
  {
    exit ('INSERT game failed');
  }
  exit (json_encode( array( $hand1str, $hand2str, $hand3str, $row1str, $row2str, $row3str, $row4str ) ));
}

function get_game( $DBH, $gameid )
{
  return 'getgame ' . $gameid;
}

if (isset($_GET['action']) and $_GET['action'] == 'login')
{
  $username = (isset($_GET['user'])) ? $_GET['user'] : 0;

  $dbuser = 'test00';
  $pass = 'test00';
  $DBH = new PDO('mysql:host=localhost;dbname=temptest', $dbuser, $pass);

  $stmt = $DBH->prepare( 'SELECT PID FROM users WHERE username = (?);' );
  if (!$stmt->execute( array( $username ) ))
  {
    exit ('SELECT from users failed');
  }
  $rows = $stmt->fetchAll();
  if ($rows) exit (json_encode( array($rows[0][0]) ));
  else exit ('not found');
}

if (isset($_GET['action']) and $_GET['action'] == 'creategame')
{
  $player1 = (isset($_GET['pid1'])) ? $_GET['pid1'] : 1;
  $player2 = (isset($_GET['pid2'])) ? $_GET['pid2'] : 2;
  $player3 = (isset($_GET['pid3'])) ? $_GET['pid3'] : 3;

  $dbuser = 'test00';
  $pass = 'test00';
  $DBH = new PDO('mysql:host=localhost;dbname=temptest', $dbuser, $pass);
  create_game( $DBH, $player1, $player2, $player3 );
}

if (isset($_GET['action']) and $_GET['action'] == 'getgame')
{
  $gameid = (isset($_GET['gameid'])) ? $_GET['gameid'] : 0;

  $dbuser = 'test00';
  $pass = 'test00';
  $DBH = new PDO('mysql:host=localhost;dbname=temptest', $dbuser, $pass);

  $stmt = $DBH->prepare( 'SELECT * FROM nimmtsetup WHERE id = (?);' );
  if (!$stmt->execute( array( $gameid ) )) {
    exit ('SELECT from nimmtsetup failed');
  }
  $rows = $stmt->fetchAll();
  exit (json_encode( array($rows[0] )));
}

if (isset($_POST['action']) and $_POST['action'] == 'makemove')
{
  $gameid = (isset($_POST['gameid'])) ? $_POST['gameid'] : 0;
  $move = (isset($_POST['move'])) ? $_POST['move'] : 0;

  exit (json_encode( array( $gameid, $move ) ));
}
