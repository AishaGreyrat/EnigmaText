document.addEventListener('DOMContentLoaded', function() {
    // Obtener el modal y el botón para cerrar el modal
    const modal = document.querySelector('.modal');
    const closeModalBtn = document.querySelector('.close');
  
    // Función para abrir el modal
    function openModal() {
      modal.style.display = 'block';
    }
  
    // Función para cerrar el modal
    function closeModal() {
      modal.style.display = 'none';
    }
  
    const openModalBtn = document.querySelector('#openModalBtn');
    openModalBtn.addEventListener('click', openModal);
  
    // Evento de clic para cerrar el modal
    closeModalBtn.addEventListener('click', closeModal);
});