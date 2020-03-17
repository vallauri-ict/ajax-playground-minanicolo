"use strict";
let param="";
let currentRow=0;
let frase;
let info;
let risultati;
let lastli;
let nRisultati;
let slider;
let boolNPers;
window.onload=function(){
  document.getElementById("profilo").style.cssText = "background-position-y: -96px";
  frase=$("#frase").html("Hi, my name is");
  info=$("#info");
  slider=$("#progrBar");
  aggiungiControlli();
}

$(function() {
  $("#btnGenera").on("click", function() {
	  currentRow=0;
	  boolNPers=true;
	$("#nProfile").html("Profile "+(currentRow+1)+" of "+nRisultati);
	aggiungiControlli();
  });
});

function inviaRichiesta(parametri, callback) {
  $.ajax({
    url: "https://randomuser.me/api/",
    type: "GET",
    data: parametri,
    contentType: "application/x-www-form-unreloaded; charset=UTF-8",
    dataType: "json",
    async: true,
    timeout: 5000,
    success: function (date) {
      risultati=date["results"], aggiornaPagina()
      console.log(risultati)},
    error: function(jqXHR, test_status, str_error) {
      alert("Server error: " + jqHXR.status + " - " + jqHXR.responseText);
    }
  });
}

function aggiungiControlli() {
  let gender = $("input:radio[name=radioGenere]");
  let nationality = $("input:checkbox[name=chkNazione]");
  nRisultati=$("#rangeRisultati").val();
  param = "results=" + nRisultati;
  console.log(param);
  if (gender.eq(1).is(":checked"))
    param += "&gender=female";
  else
    if (gender.eq(2).is(":checked"))
      param += "&gender=male";
  for (let j = 0; j < 5; j++)
  {
    if (j==0)
    {
      param += "&nat=";
    }
    if(nationality.eq(j).is(":checked") && j==4)
      param += nationality.eq(j).prop("id").substr(4).toString();
    else if(nationality.eq(j).is(":checked"))
      param += nationality.eq(j).prop("id").substr(4).toString()+",";
  }
  console.log(param);
  inviaRichiesta(param, aggiornaPagina);
  slider.css("width",( 100 / nRisultati) + "%");
}

function aggiornaPagina() {
  if(lastli)
    lastli.style.cssText += "background-position-y: -48px";
  lastli = document.getElementById("profilo");
  profile();
}

function profile(){
  $("#img").attr("src",risultati[currentRow]["picture"]["large"]);
  frase.html("Hi, my name is");
  lastli.style.cssText += "background-position-y: -48px";
  document.getElementById("profilo").style.cssText += "background-position-y: -96px";
  lastli = document.getElementById("profilo");
  let st = risultati[currentRow].name.title + " " + risultati[currentRow].name.first + " " + risultati[currentRow].name.last;
  info.html(st);
}
function email() {
  frase.html("My email address is");
  lastli.style.cssText += "background-position-y: -48px";
  document.getElementById("email").style.cssText += "background-position-y: -96px";
  lastli = document.getElementById("email");
  let st=risultati[currentRow]["email"];
  info.html(st);
}
function birthday() {
  frase.html("My birthday is");
  lastli.style.cssText += "background-position-y: -48px";
  document.getElementById("birthday").style.cssText += "background-position-y: -96px";
  lastli = document.getElementById("birthday");
  let st=risultati[currentRow]["dob"]["date"].split("T")[currentRow];
  let vet=st.split("-");
  st="";
  for(let i=vet.length-1; i>=0;i--)
  {
	  if(i==0)
		  st+=vet[i];
	  else
		  st+=vet[i]+"/";
  }
  info.html(st);
}
function map() {
  frase.html("My address is");
  lastli.style.cssText += "background-position-y: -48px";
  document.getElementById("map").style.cssText += "background-position-y: -96px";
  lastli = document.getElementById("map");
  let st=risultati[currentRow]["location"]["street"]["number"]+" "+risultati[currentRow]["location"]["street"]["name"];
  info.html(st);
}
function phone() {
  frase.html("My phone number is");
  lastli.style.cssText += "background-position-y: -48px";
  document.getElementById("phone").style.cssText += "background-position-y: -96px";
  lastli = document.getElementById("phone");
  let st=risultati[currentRow]["cell"];
  info.html(st);
}
function password() {
  frase.html("My password is");
  lastli.style.cssText += "background-position-y: -48px";
  document.getElementById("password").style.cssText += "background-position-y: -96px";
  lastli = document.getElementById("password");
  let st=risultati[currentRow]["login"]["password"];
  info.html(st);
}
function frecciaDX(){
	if (boolNPers)
	{
		boolNPers=false;
		currentRow=0;
	}
  if(currentRow != nRisultati-1)
  {
    currentRow++;
    $("#nProfile").html("Profile "+(currentRow+1)+" of "+nRisultati);
    aggiornaPagina();
  }
  else
    $("#frecciaDX").attr("disabled","disabled");
  $("#frecciaSX").removeAttr("disabled","disabled");
  slider.css("width",(((currentRow+1) * 100) / nRisultati) + "%");
}

function frecciaSX(){
	if (boolNPers)
	{
		boolNPers=false;
		currentRow=0;
	}
  if(currentRow != 0)
  {
    currentRow--;
    $("#nProfile").html("Profile "+(currentRow+1)+" of "+nRisultati);
    aggiornaPagina();
  }
  else
    $("#frecciaSX").attr("disabled","disabled");
  $("#frecciaDX").removeAttr("disabled","disabled");
  slider.css("width",(((currentRow+1) * 100) / nRisultati) + "%");
}

$(document).on("input change", "#rangeRisultati",function () {
  $("#nCorrente").html( $(this).val());
  nRisultati=$(this).val();
});