<?php

function create_game( $DBH, $id1, $id2, $id3 )
{
  $deck = range( 1, 104 );
  shuffle( $deck );

  $hand1 = array_slice( $deck, 0, 10 );
  $hand2 = array_slice( $deck, 10, 10 );
  $hand3 = array_slice( $deck, 20, 10 );
  $rows = array_slice( $deck, 30, 4 );
  sort( $hand1 );
  sort( $hand2 );
  sort( $hand3 );
  sort( $rows );
  $hand1str = join( ' ', $hand1 );
  $hand2str = join( ' ', $hand2 );
  $hand3str = join( ' ', $hand3 );
  $rowsstr = join( ' ', $rows );

  $dbuser = 'test00';
  $pass = 'test00';
  $DBH = new PDO('mysql:host=localhost;dbname=temptest', $dbuser, $pass);

  $stmt = $DBH->prepare( 'INSERT INTO nimmthands (hand) VALUES (?);' );
  if (!$stmt->execute( array( $hand1str ) )) {
    exit (json_encode( 'INSERT hand 1 failed' ));
  }
  $id1 = $DBH->lastInsertID();
  if (!$stmt->execute( array( $hand2str ) )) {
    exit (json_encode( 'INSERT hand 2 failed' ));
  }
  $id2 = $DBH->lastInsertID();
  if (!$stmt->execute( array( $hand3str ) )) {
    exit (json_encode( 'INSERT hand 3 failed' ));
  }
  $id3 = $DBH->lastInsertID();
  $stmt = $DBH->prepare( 'INSERT INTO nimmtgames '
    . '(hand1, hand2, hand3, player1, player2, player3, rows) '
    . 'VALUES (?, ?, ?, ?, ?, ?, ?);' );
  if (!$stmt->execute( array( $id1, $id2, $id3, 1, 2, 3, $rowsstr ) )) {
    exit (json_encode( 'INSERT game failed' ));
  }

  exit (json_encode( array( $hand1str, $hand2str, $hand3str, $rowsstr ) ));
}

function get_game( $DBH, $gameid )
{
  return 'getgame ' . $gameid;
}

if (isset($_POST['action']) and $_POST['action'] == 'creategame')
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

  $stmt = $DBH->prepare( 'SELECT * FROM nimmtgames WHERE id = (?);' );
  if (!$stmt->execute( array( $gameid ) )) {
    exit (json_encode( 'SELECT game failed' ));
  }
  $rows = $stmt->fetchAll();

  $stmt = $DBH->prepare( 'SELECT * FROM nimmthands WHERE id = (?);' );

  if (!$stmt->execute( array( $rows[0]['hand1'] ) )) {
    exit (json_encode( 'SELECT hand 1 failed' ));
  }
  $hand1rows = $stmt->fetchAll();

  if (!$stmt->execute( array( $rows[0]['hand2'] ) )) {
    exit (json_encode( 'SELECT hand 2 failed' ));
  }
  $hand2rows = $stmt->fetchAll();

  if (!$stmt->execute( array( $rows[0]['hand3'] ) )) {
    exit (json_encode( 'SELECT hand 3 failed' ));
  }
  $hand3rows = $stmt->fetchAll();

  exit (json_encode( array( $hand1rows[0]['hand'], $hand2rows[0]['hand'], $hand3rows[0]['hand'], $rows[0]['rows'] ) ));
}

if (isset($_POST['action']) and $_POST['action'] == 'makemove')
{
  $gameid = (isset($_POST['gameid'])) ? $_POST['gameid'] : 0;
  $move = (isset($_POST['move'])) ? $_POST['move'] : 0;

  exit (json_encode( array( $gameid, $move ) ));
}
