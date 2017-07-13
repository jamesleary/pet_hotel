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
    $('#ownerNames').val('');
    $('#petName').val('');
    $('#petColor').val('');
    $('#petBreed').val('') ;
  });

  $('#viewPets').on('click','.update',function(){

    console.log('update pet click');

    var updatePet = {};
      updatePet.name = $('.name'+ $(this).data('id')).text();
      updatePet.breed = $('.breed' + $(this).data('id')).text();
      updatePet.color = $('.color' + $(this).data('id')).text();
      updatePet.id = $(this).data('id');
console.log(updatePet);
  updatePets(updatePet);
  });
}//end of click handlers
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
function updatePets(updatePet){
  console.log('updatepets');

    $.ajax({
      url: '/updateTable/pets',
      type: 'PUT',
      data: updatePet,
      success: function(response){
        console.log(response);
        refreshPetTable();
      } // end success
    }); //end ajax
  }
