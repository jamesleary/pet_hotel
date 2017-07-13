console.log('update sourced');
$(document).ready(function(){
  console.log('jQuery Sourced');
  addDelete();
});

function addDelete() {
$('#viewPets').on('click', '.Delete', function () {
  var petId = $(this).data('petid');
  console.log($(this));
  deletePet(petId);
});
}

function deletePet(petId) {

  $.ajax({
    type: 'DELETE',
    url: '/updateTable' + petId,
    success: function(response) {
      refreshOwners();
    }
  });
}
