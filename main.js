
let notes = [];

const noteAdd = document.querySelector('#noteAdd');
const list = document.querySelector('.list');
const saveChanges = document.querySelector('#saveChanges');

const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');

const modalIndex = document.querySelector('#modalIndex')


loadFromLocalStorage();

noteAdd.addEventListener('click', function () {
    const noteTitle = document.querySelector('#noteTitle');
    const noteDescription = document.querySelector('#noteDescription');
    console.log(noteTitle.value, noteDescription.value);

    // Validating number of letters

    if (noteTitle.value.length == 0 || noteTitle.value.length < 0) {
        alert("Enter Note Title");
        return;
    }
    if (noteDescription.value.length == 0 || noteDescription.value.length < 10) {
        alert("Enter Note Description");
        return;
    }

    const dt = new Date();

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
    const time = dt.getDate() + '/' + months[dt.getMonth()] + '/' + dt.getFullYear();


    const note = {
        title: noteTitle.value,
        description: noteDescription.value,
        date: time
        // date: dt.toISOString()

    }
    console.log(note);

    notes.push(note);

    renderNotes();

    noteTitle.value = '';
    noteDescription.value = '';

})

saveChanges.addEventListener('click', function () {
    console.log(modalTitle.value, modalDescription.value, modalIndex.value);

    notes[modalIndex.value].title = modalTitle.value
    notes[modalIndex.value].description = modalDescription.value


    renderNotes()
})

function renderNotes() {
    list.innerHTML = '';

    saveToLocalStorage();
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        addNote(note, i)
    }
}

function addNote(note, index) {
    console.log(index);
    list.innerHTML += `
    <div class="card text-bg-light m-2 p-0" style="max-width: 18rem;">
    <div class="card-header">
        <div class="row">
            <div class="col-7">
                ${note.date}
            </div>
            <div class="col-5">
                <button class="btn btn-outline-danger" onclick="deleteNote(${index})" >
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editNote(${index})" >
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">${note.title}</h5>
      <p class="card-text">${note.description}</p>
    </div>
  </div>
    `;
}

function deleteNote(i) {
    console.log(i);

    const newArray = notes.filter(function (value, index) {
        if (index !== i) {
            return value;
        }
    })

    notes = newArray;

    renderNotes();
    console.log(newArray);

}

function editNote(index) {
    console.log(index)
    console.log()

    const note = notes[index]



    modalIndex.value = index
    modalTitle.value = note.title
    modalDescription.value = note.description
}

function saveToLocalStorage() {

    const str = JSON.stringify(notes);

    window.localStorage.setItem('notes', str);
}

function loadFromLocalStorage(){
    const temp = JSON.parse(window.localStorage.getItem('notes'));

    if(temp)
    notes = temp
    renderNotes();
}