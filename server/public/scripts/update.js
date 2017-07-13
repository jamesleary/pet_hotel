console.log('update sourced');
$(document).ready(function(){
  console.log('jQuery Sourced');
  deletePet();
});

$('#viewPets').on('click', '.Delete', function () {
  var petId = $(this).data('petId');
  console.log($(this));
  deletePet(petId);
});

function deletePet(petId) {

  $.ajax({
    type: 'DELETE',
    url: '/updateTable' + petId,
    success: function(response) {
      refreshOwners();
    }
  });
}
