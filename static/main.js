const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modal-btn");

modalBtn.onclick = function () {
  modal.classList.remove("hidden");
  modal.querySelector('.modal-content').classList.add('scale-75');
  setTimeout(function () {
    modal.querySelector('.modal-content').classList.remove('scale-75');
  }, 50);
}

const closeBtn = document.getElementById("modal-close-btn");
window.onclick = function (event) {
  if (event.target == modal || event.target == closeBtn) {
    modal.querySelector('.modal-content').classList.add('scale-75');
    setTimeout(function () {
      modal.classList.add("hidden");
    }, 500);
  }
}


const textArea = document.querySelector('textarea');
textArea.addEventListener('input', (e) => {
  e.target.style.height = 'auto';
  e.target.style.height = `${e.target.scrollHeight}px`;
})

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append('text', form.value);
  formData.append('language', document.getElementById('language').value);
  formData.append('speaker', document.getElementById('voices').value);

  const button = document.querySelector('#submitFormButton');
  button.disabled = true;

  axios.post('', formData)
    .then(res => {
      button.disabled = false;
      Swal.fire('Sukces!', 'Plik został pomyślnie pobrany!', 'success');
      document.getElementById("player").innerHTML = `
        <audio class="w-[100%]" controls>
          <source src="${res.data.file}" type="audio/mpeg">
        </audio>
      `
    })
    .catch(err => console.log(err))
})