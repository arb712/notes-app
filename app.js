const addBox = document.querySelector(".add-box");
const modalBox = document.querySelector(".modal-box");
const modalTitle = document.querySelector(".content header p");
const closeIcon = document.querySelector("header i");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
const addBtn = modalBox.querySelector("button");

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  modalBox.classList.add("show");
});
closeIcon.addEventListener("click", () => {
  modalBox.classList.remove("show");
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  modalTitle.innerText = "Add a new Note";
});

const showNote = () => {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.map((note, i) => {
    let displayNote = `      <li class="note">
    <div class="details">
      <p>${note.title}</p>
      <span
        >${note.description}
      </span>
    </div>
    <div class="bottom-content">
      <span>${note.date}</span>
      <div class="settings">
        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
        <ul class="menu">
          <li onclick="editNote(${i}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
          <li onclick="deleteNote(${i})" ><i class="uil uil-trash"></i>Delete</li>
        </ul>
      </div>
    </div>
  </li>`;
    addBox.insertAdjacentHTML("afterend", displayNote);
  });
};
showNote();

const showMenu = (props) => {
  props.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != props) {
      props.parentElement.classList.remove("show");
    }
  });
};

const deleteNote = (noteId) => {
  let confirmDel = confirm("Are you sure want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNote();
};

const editNote = (noteId, title, description) => {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  addBtn.innerText = "Update Note";
  modalTitle.innerText = "Update Note";
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;

  if (noteTitle && noteDesc !== "") {
    let date = new Date();
    let month = date.toLocaleString("default", { month: "long" });
    let day = date.getDay();
    let year = date.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${day} ${month}, ${year}`,
    };
    if (isUpdate === true) {
      notes[updateId] = noteInfo;
      isUpdate = false;
    } else {
      notes.push(noteInfo);
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNote();
  }
});
