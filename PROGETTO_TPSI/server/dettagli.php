<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    //_checkSession("id");

    // connessione e lettura parametri
    $con = _connection("4b_project");
    $id= $con->real_escape_string($_REQUEST["id"]);

    // querty
    $sql = "select * from shopping where id='$id'";

    $data = _eseguiQuery($con, $sql);

    echo(json_encode($data));

    $con->close();

?>