const data = [
  {
    title: "Home Page",
    content:
      "***HOME PAGE*** Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex magnam modiullam sapiente? Ipsum distinctio, esse, facilis illo, quisquam recusandae molestiae aspernatur numquam tempora ullam minima accusamusdelectus optio unde. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eos neque veniam expedita veritatis alias, ut doloribus nostrum sed animi ex modi eum accusamus harum ad architecto cumque labore excepturi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quo repellendus nam ipsam modi culpa optio illum veniam accusantium doloremque soluta beatae nobis! Aut sunt voluptatem non rerum. Voluptatem, architecto?",
  },
  {
    title: "New Tab 1",
    content:
      "***NEW TAB 1*** Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem tempore neque, in, voluptatibus sit voluptates incidunt hic, consequatur officiis eos nobis eius aliquid sapiente dolores fugiat quas unde ea nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laborum, ab velit ipsam ullam voluptatibus quae eaque ea assumenda doloremque eveniet similique molestias, ipsa earum recusandae beatae iusto ipsum error. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, dolores eveniet. Totam ex ullam modi assumenda repudiandae in iusto quia, iste doloribus ducimus officiis est, animi veniam autem natus inventore?",
  },
  {
    title: "New Tab 2",
    content:
      "***NEW TAB 2*** Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem tempore neque, in, voluptatibus sit voluptates incidunt hic, consequatur officiis eos nobis eius aliquid sapiente dolores fugiat quas unde ea nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laborum, ab velit ipsam ullam voluptatibus quae eaque ea assumenda doloremque eveniet similique molestias, ipsa earum recusandae beatae iusto ipsum error. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, dolores eveniet. Totam ex ullam modi assumenda repudiandae in iusto quia, iste doloribus ducimus officiis est, animi veniam autem natus inventore?",
  },
  {
    title: "New Tab 3",
    content:
      "***NEW TAB 3*** Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem tempore neque, in, voluptatibus sit voluptates incidunt hic, consequatur officiis eos nobis eius aliquid sapiente dolores fugiat quas unde ea nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laborum, ab velit ipsam ullam voluptatibus quae eaque ea assumenda doloremque eveniet similique molestias, ipsa earum recusandae beatae iusto ipsum error. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, dolores eveniet. Totam ex ullam modi assumenda repudiandae in iusto quia, iste doloribus ducimus officiis est, animi veniam autem natus inventore?",
  },
];
//--------------------------------------------------------------------------------------------
// Display
let mainPage = document.getElementById("main-page");
let editForm = document.getElementById("edit-form");
let addForm = document.getElementById("add-form");
let mainContent = document.getElementById("content");
// Buttons
let newTabIcon = document.getElementById("newtab-icon");
let editBtnSubmit = document.getElementById("edit-btn-submit");
let editBtnClose = document.getElementById("edit-btn-close");
let addBtnSubmit = document.getElementById("add-btn-submit");
let addBtnClose = document.getElementById("add-btn-close");
// Tabs
let tabGroup = document.getElementById("tab-group");
// Inputs
let editInput = document.getElementById("edit-title-input");
let addTitleInput = document.getElementById("add-title-input");
let addContentInput = document.getElementById("add-content-input");
//--------------------------------------------------------------------------------------------

const closeForm = () => {
  editForm.style.display = "none";
  addForm.style.display = "none";
  mainPage.style.display = "block";
};

const changeContent = (event) => {
  let selectedtitle = event.target.innerText;
  if (selectedtitle !== undefined) {
    for (obj of data) {
      if (obj.title === selectedtitle) {
        mainContent.innerText = obj.content;
      }
    }
  }
};

const openEditForm = (event) => {
  let id = event.target.id;
  let className = event.target.className;
  if (className == "tab" || id.indexOf("tab-title") != -1) {
    editInput.value = event.target.innerText;
    editForm.style.display = "block";
    editForm.setAttribute("for", id[id.length - 1]);
    console.log(editForm.attributes[editForm.attributes.length - 1]);
    mainPage.style.display = "none";
  }
};

const submitEditForm = () => {
  let newText = editInput.value;
  let tabId = `tab-title${editForm.attributes["for"].value}`;
  let requiredTab = document.getElementById(tabId);
  let index = editForm.attributes["for"].value - 1;

  requiredTab.innerText = newText;
  data[index].title = newText;

  closeForm();
};

const openAddForm = (event) => {
  console.log(event.target)
  let id = event.target.id;
  if (id == "newtab-icon") {
    addForm.style.display = "block";
    mainPage.style.display = "none";
  }
};

const submitAddForm = () => {
  mainContent.innerText = addContentInput.value;

  let tabGroup = document.getElementById("tab-group");
  let tabLength = document.querySelectorAll(".tab").length;
  let addIcon = document.getElementById("newtab-icon");
  let tab = renderTab(tabLength + 1);

  tabGroup.insertBefore(tab, addIcon);

  let newData = { title: tab.innerText, content: addContentInput.value };

  data.push(newData);

  closeForm();
};

const deleteTab = (event) => {
  let ele = event.target.classList.value;
  if (ele == "closetab") {
    let parent = event.target.parentNode;
    parent.remove();
  }
};
//--------------------------------------------------------------------------------------------
function renderCloseIcon(node) {
  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const iconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  iconSvg.setAttribute("fill", "none");
  iconSvg.setAttribute("viewBox", "0 0 24 24");
  iconSvg.setAttribute("stroke-width", "1.5");
  iconSvg.setAttribute("stroke", "currentColor");
  iconSvg.classList.add("closetab");

  iconPath.setAttribute("d", "M6 18L18 6M6 6l12 12");
  iconPath.setAttribute("stroke-linecap", "round");
  iconPath.setAttribute("stroke-linejoin", "round");

  iconSvg.appendChild(iconPath);

  return node.appendChild(iconSvg);
}

function renderTab(id) {
  // Create the DOM elements
  const parent = document.createElement("div");
  const child = document.createElement("div");

  // Add some classes and attributes
  parent.classList.add("tab");
  parent.id = `tab${id}`;
  child.id = `tab-title${id}`;
  child.innerText = document.getElementById("add-title-input").value;

  // Put together the DOM nodes
  parent.appendChild(child);
  renderCloseIcon(parent);

  return parent;
}
//--------------------------------------------------------------------------------------------

tabGroup.addEventListener("click", changeContent);
tabGroup.addEventListener("dblclick", openEditForm);
editBtnSubmit.addEventListener("click", submitEditForm);
editBtnClose.addEventListener("click", closeForm);

newTabIcon.addEventListener("click", openAddForm);
addBtnSubmit.addEventListener("click", submitAddForm);
addBtnClose.addEventListener("click", closeForm);

tabGroup.addEventListener("click", deleteTab);

//--------------------------------------------------------------------------------------------
