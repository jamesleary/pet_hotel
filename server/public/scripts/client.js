console.log('client.js sourced');
$(document).ready(function(){
  console.log("jquery sourced");
  refreshPetTable();
  refreshOwners();
  addClickHandlers();
});

function addClickHandlers(){
  $("#submitOwner").on('click', function(){
    console.log('submit button clicked');
    addOwner();
  });
}

function refreshOwners() {
  $.ajax({
    type:"GET",
    url: "/owners",
    success: function(response){
      console.log(response);
      appendOwnersToSelect(response.tasks);
    }
  });
}

function appendOwnersToSelect(listOfOwners) {
  $('#ownerNames').empty();
  console.log(listOfOwners);
  for(var i = 0; i < listOfOwners.length; i++){
    var currentOwner = listOfOwners[i];
    console.log(currentOwner);
    $('#ownerNames').append('<option value="' + currentOwner.id + '">' + currentOwner.first_name + ' ' + currentOwner.last_name + '</option>');
  }
}

function addOwner(){
  var owner = {};
  owner.first_name = $('#ownerFirstName').val();
  owner.last_name = $('#ownerLastName').val();
  console.log(owner);
  $.ajax({
    type: "POST",
    url: "/owners",
    data: owner,
    success: function(response){
      console.log(response);
      refreshOwners();
    }
  });
}

function refreshPetTable(){
  $.ajax({
    type: "GET",
    url: "/petInfo",
    success: function(response){
      appendPetTable(response.pets);
    }
  });
}

function appendPetTable(arrayOfPets){
  $("#viewPets").empty();
  console.log(arrayOfPets);
  for (var i = 0; i < arrayOfPets.length; i++) {
    var pet = arrayOfPets[i];
    var $tr = $("<tr></tr>");
    $tr.append("<td>" + pet.owner_id + "<td>");
    $tr.append("<td>" + pet.pet_name + "<td>");
    $tr.append("<td>" + pet.breed + "<td>");
    $tr.append("<td>" + pet.color + "<td>");
    $tr.append("<td><button class='update'>Update</button><td>");
    $tr.append("<td><button class='Delete'>Update</button><td>");
    $tr.append("<td><button class='check'>Check In</button><td>");
    $("#viewPets").append($tr);
  }
}
