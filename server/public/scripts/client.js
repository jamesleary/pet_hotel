console.log('client.js sourced')
$(document).ready(function(){
  console.log("jquery sourced");
  refreshOwners();
  addClickHandlers();
});

function addClickHandlers(){
  $("#submitOwner").on('click', function(){
    console.log('submit button clicked');
    addOwner()
  })
}

function refreshOwners() {
  $.ajax({
    type:"GET",
    url: "/owners",
    success: function(response){
      console.log(response);
      appendOwnersToSelect(response);
    }
  })
}

function appendOwnersToSelect(listOfOwners) {
  var arrayOfOwners = listOfOwners.tasks;
  for(var i = 0; i < arrayOfOwners.length; i++){
    var currentOwner = arrayOfOwners[i];
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
  })
}
