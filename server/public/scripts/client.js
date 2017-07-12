console.log('client.js sourced')
$(document).ready(function(){
  console.log("jquery sourced");
  getOwnerList();
  addClickHandlers();
});

function addClickHandlers(){
  $("#submitOwner").on('click', function(){
    console.log('submit button clicked');
    getOwnerList
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
  for(var i = 0; i < listOfOwners.length; i++){
    var currentOwner = listOfOwners[i];
    $('#ownerNames').append('<option value="' + owner.id + '">' + owner.firstName + ' ' + owner.lastName + '</option>');
  }
}

function getOwnerList(){
  var owner = {};
  owner.firstName = $('#ownerFirstName').val();
  owner.lastName = $('#ownerLastName').val();
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
