console.log('JS Sourced');
$(document).ready(function(){
  console.log('jQuery Sourced');
  clickHandlers();
});

function clickHandlers(){
  $('#addPet').on('click', function(){

    console.log('add Pet click');
    var petObject = {
      owner_id: $('#ownerNames').val(),
      pet_name: $('#petName').val(),
      color: $('#petColor').val(),
      breed: $('#petBreed').val()
    };

    addPets(petObject);
    // $('#ownerNames').val('');
    // $('#petName').val('');
    // $('#petColor').val('');
    // $('#petBreed').val('') ;
  });
}
//on click addPets to database
function addPets(newPet){
  console.log( 'in addTask', newPet );
  //ajax request to send new task to the database
  $.ajax({
    url: '/petInfo',
    type: 'POST',
    data: newPet,
    success: function( response ){
      console.log('got some pets: ', response );
      refreshPetTable();
    } // end success
  }); //end ajax
}
