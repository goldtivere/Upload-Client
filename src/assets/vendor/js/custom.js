function openNav() {
  var e = document.getElementById("left-sidebar");
  //document.getElementById("left-sidebar").style.left = 0;
  if (e.style.getPropertyValue("left")== "0px")
  {
    document.getElementById("left-sidebar").style.left = "-250px";
    document.getElementById("maindiv").style.marginLeft = "0px";
  }
  else
  {
    document.getElementById("left-sidebar").style.left = "0px";
    document.getElementById("maindiv").style.marginLeft = "250px";
  }
 // document.getElementById("maindiv").style.marginLeft = "250px";

}
