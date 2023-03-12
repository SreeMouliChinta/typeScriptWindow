const data: { title: string; content: string }[] = [
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
let mainPage = document.getElementById("main-page")! as HTMLElement;
let editForm = document.getElementById("edit-form")! as HTMLElement;
let addForm = document.getElementById("add-form")! as HTMLElement;
let mainContent = document.getElementById("content")! as HTMLElement;

// Buttons
let newTabIcon = document.getElementById("newtab-icon")! as HTMLElement;
let editBtnSubmit = document.getElementById(
  "edit-btn-submit"
)! as HTMLButtonElement;
let editBtnClose = document.getElementById(
  "edit-btn-close"
)! as HTMLButtonElement;
let addBtnSubmit = document.getElementById(
  "add-btn-submit"
)! as HTMLButtonElement;
let addBtnClose = document.getElementById(
  "add-btn-close"
)! as HTMLButtonElement;

// Tabs
let tabGroup = document.getElementById("tab-group")! as HTMLElement;
// Inputs
let editInput = document.getElementById(
  "edit-title-input"
)! as HTMLInputElement;
let addTitleInput = document.getElementById(
  "add-title-input"
)! as HTMLInputElement;
let addContentInput = document.getElementById(
  "add-content-input"
)! as HTMLInputElement;

//--------------------------------------------------------------------------------------------

const closeForm = () => {
  editForm.style.display = "none";
  addForm.style.display = "none";
  mainPage.style.display = "block";

  addTitleInput.value = "";
  addContentInput.value = "";
};

const changeContent = (event: Event) => {
  let selectedtitle: string | undefined = (event.target as HTMLElement)
    .innerText;
  if (selectedtitle !== undefined) {
    for (let obj of data) {
      if (obj.title === selectedtitle) {
        mainContent.innerText = obj.content;
      }
    }
  }
};

const openEditForm = (event: Event) => {
  let id: string = (event.target as HTMLElement).id;
  console.log(id);
  let className: string = (event.target as HTMLElement).className;
  if (id !== "tab1") {
    if (className == "tab" || id.indexOf("tab-title") != -1) {
      editInput.value = (event.target as HTMLElement).innerText;
      editForm.style.display = "block";
      editForm.setAttribute("for", id[id.length - 1]);
      mainPage.style.display = "none";
    }
  }
};

const submitEditForm = () => {
  let newText: string = editInput.value;
  let attrLen: number = editForm.attributes.length;
  let tabId = `tab-title${editForm.attributes[attrLen - 1].value}`;
  let requiredTab = document.getElementById(tabId)! as HTMLElement;
  let index: number = (editForm.attributes[attrLen - 1] as any).value - 1;

  requiredTab.innerText = newText;
  data[index].title = newText;

  closeForm();
};

const openAddForm = (event: Event) => {
  let id: string = (event.target as HTMLInputElement).id;
  if (id == "newtab-icon") {
    addForm.style.display = "block";
  }
  mainPage.style.display = "none";
};

const submitAddForm = () => {
  mainContent.innerText = addContentInput.value;

  let tabGroup = document.getElementById("tab-group")! as HTMLElement;
  let tabLength: number = document.querySelectorAll(".tab").length;
  let addIcon = document.getElementById("newtab-icon")! as HTMLElement;
  let tab: HTMLDivElement = renderTab(tabLength + 1);

  tabGroup.insertBefore(tab, addIcon);

  let newData = { title: tab.innerText, content: addContentInput.value };

  data.push(newData);

  addContentInput.value = "";
  addTitleInput.value = "";

  closeForm();
};

const deleteTab = (event: Event) => {
  let ele = (event.target as HTMLElement).classList.value;
  if (ele == "closetab") {
    let parent: ParentNode | null = (event.target as HTMLElement)?.parentNode;
    (parent as HTMLElement)?.remove();
    mainContent.innerText = data[0].content;
  } else if (ele == "closetab-path") {
    let parent: ParentNode | null = (event.target as HTMLElement)?.parentNode;
    let grandParent: ParentNode | null = (parent as HTMLElement)?.parentNode;
    (grandParent as HTMLElement)?.remove();
    mainContent.innerText = data[0].content;
  }
};

//--------------------------------------------------------------------------------------------

function renderCloseIcon(node: HTMLElement) {
  const iconSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  )! as SVGSVGElement;
  const iconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  )! as SVGPathElement;
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

function renderTab(id: Number) {
  // Create the DOM elements
  const parent = document.createElement("div")! as HTMLDivElement;
  const child = document.createElement("div")! as HTMLDivElement;

  // Add some classes and attributes
  parent.classList.add("tab");
  parent.id = `tab${id}`;
  child.id = `tab-title${id}`;
  child.innerText = (
    document.getElementById("add-title-input")! as HTMLInputElement
  )?.value;

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
