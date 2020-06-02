<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    //_checkSession("shopping_cart");

    // connessione e lettura parametri
    $con = _connection("4b_project");
    $gender= $con->real_escape_string($_REQUEST["gn"]);

    // query
    if($gender=="")
        $sql = "select * from shopping";
    else
        $sql = "select * from shopping where gender='$gender'";

    $data = _eseguiQuery($con, $sql);

    echo(json_encode($data));

    $con->close();

?>