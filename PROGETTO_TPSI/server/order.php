<?php
header("Content-type:application/json;charset=utf-8");
require ("_libreria.php");

    $con = _connection("4b_project");

    // 1. controllo parametri
    if(!isset($_REQUEST["email"])){
        http_response_code(400);
        die("parametro mancante: email");
    }
    if(!isset($_REQUEST["address"])){
        http_response_code(400);
        die("parametro mancante: address");
    }
    if(!isset($_REQUEST["modePayment"])){
        http_response_code(400);
        die("parametro mancante: metodo pagamento");
    }
    // 2. connessione

    $email = $con->real_escape_string($_REQUEST["email"]);
    $address = $con->real_escape_string($_REQUEST["address"]);
    $modePayment = $con->real_escape_string($_REQUEST["modePayment"]);

    // 3. query

    $sql = "insert into ordini (email,address,pagamento) values ('$email','$address','$modePayment')";
    $data = _eseguiQuery($con, $sql);
	echo json_encode(array("ris"=>"ok"));

    // 5. close
    $con->close();

?>