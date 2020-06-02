<?php
session_start();

if(isset($_REQUEST["action"]))
{
    if($_REQUEST["action"]=="add")
    {
        if(isset($_SESSION["shopping_cart"]))
        {
            $is_available=0;
            foreach ($_SESSION["shopping_cart"] as $keys => $values)
            {
                if($_SESSION["shopping_cart"][$keys]["product_id"] == $_REQUEST["product_id"])
                {
                    $is_available++;
                    $_SESSION["shopping_cart"][$keys]["product_quantity"]=
                        $_SESSION["shopping_cart"][$keys]["product_quantity"]+$_REQUEST["product_quantity"];
                }
            }
            if($is_available==0)
            {
                $item_array=array(
                    "product_id"    => $_REQUEST["product_id"],
                    "product_name"    => $_REQUEST["product_name"],
                    "product_price"    => $_REQUEST["product_price"],
                    "product_quantity"    => $_REQUEST["product_quantity"]
                );
                $_SESSION["shopping_cart"][]=$item_array;
            }
        }
        else{
            $item_array=array(
                "product_id"    => $_REQUEST["product_id"],
                "product_name"    => $_REQUEST["product_name"],
                "product_price"    => $_REQUEST["product_price"],
                "product_quantity"    => $_REQUEST["product_quantity"]
            );
            $_SESSION["shopping_cart"][]=$item_array;
        }
    }

    if($_REQUEST["action"]=="remove")
    {
        foreach ($_SESSION["shopping_cart"] as $keys => $values)
        {
            if($_SESSION["shopping_cart"][$keys]["product_id"] == $_REQUEST["product_id"])
            {
                if($values["product_id"] == $_REQUEST["product_id"])
                    unset($_SESSION["shopping_cart"][$keys]);
            }
        }
        echo json_encode($_SESSION["shopping_cart"]);
    }

    if($_REQUEST["action"]=="empty")
    {
        unset($_SESSION["shopping_cart"]);
    }
}

?>