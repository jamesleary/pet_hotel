console.log('client.js sourced');
$(document).ready(function(){
  console.log("jquery sourced");
  refreshPetTable();
  refreshOwners();
  addClickHandlers();

  $("#viewPets").on("click", ".check", function(){
    console.log($(this).text);
  })
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
    $tr.append("<td data-ownerId='" + pet.owner_id + "'>" + pet.first_name + " " + pet.last_name + "</td>");
    $tr.append("<td contenteditable='true' class='name" + pet.id + "'>" + pet.pet_name + "</td>");
    $tr.append("<td contenteditable='true' class='breed" + pet.id + "'>" + pet.breed + "</td>");
    $tr.append("<td contenteditable='true' class='color" + pet.id + "'>" + pet.color + "</td>");
    $tr.append("<td><button class='update' data-id='" + pet.id + "'>Update</button></td>");
    $tr.append("<td><button class='Delete' data-id='" + pet.id + "'>Delete</button></td>");
    if(pet.check_in){
      $tr.append("<td><button class='check' data-id='" + pet.id + "'>Check In</button></td>");
    }
    else /*(pet.check_in = false)*/{
      $tr.append("<td><button class='check' data-id='" + pet.id + "'>Check Out</button></td>");
    }

    $("#viewPets").append($tr);
  }
}
