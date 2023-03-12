var data = [
    {
        title: "Home Page",
        content: "***HOME PAGE*** Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex magnam modiullam sapiente? Ipsum distinctio, esse, facilis illo, quisquam recusandae molestiae aspernatur numquam tempora ullam minima accusamusdelectus optio unde. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eos neque veniam expedita veritatis alias, ut doloribus nostrum sed animi ex modi eum accusamus harum ad architecto cumque labore excepturi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quo repellendus nam ipsam modi culpa optio illum veniam accusantium doloremque soluta beatae nobis! Aut sunt voluptatem non rerum. Voluptatem, architecto?"
    },
    {
        title: "New Tab 1",
        content: "***NEW TAB 1*** Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem tempore neque, in, voluptatibus sit voluptates incidunt hic, consequatur officiis eos nobis eius aliquid sapiente dolores fugiat quas unde ea nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laborum, ab velit ipsam ullam voluptatibus quae eaque ea assumenda doloremque eveniet similique molestias, ipsa earum recusandae beatae iusto ipsum error. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, dolores eveniet. Totam ex ullam modi assumenda repudiandae in iusto quia, iste doloribus ducimus officiis est, animi veniam autem natus inventore?"
    },
    {
        title: "New Tab 2",
        content: "***NEW TAB 2*** Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem tempore neque, in, voluptatibus sit voluptates incidunt hic, consequatur officiis eos nobis eius aliquid sapiente dolores fugiat quas unde ea nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laborum, ab velit ipsam ullam voluptatibus quae eaque ea assumenda doloremque eveniet similique molestias, ipsa earum recusandae beatae iusto ipsum error. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, dolores eveniet. Totam ex ullam modi assumenda repudiandae in iusto quia, iste doloribus ducimus officiis est, animi veniam autem natus inventore?"
    },
    {
        title: "New Tab 3",
        content: "***NEW TAB 3*** Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem tempore neque, in, voluptatibus sit voluptates incidunt hic, consequatur officiis eos nobis eius aliquid sapiente dolores fugiat quas unde ea nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laborum, ab velit ipsam ullam voluptatibus quae eaque ea assumenda doloremque eveniet similique molestias, ipsa earum recusandae beatae iusto ipsum error. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, dolores eveniet. Totam ex ullam modi assumenda repudiandae in iusto quia, iste doloribus ducimus officiis est, animi veniam autem natus inventore?"
    },
];
//--------------------------------------------------------------------------------------------
// Display
var mainPage = document.getElementById("main-page");
var editForm = document.getElementById("edit-form");
var addForm = document.getElementById("add-form");
var mainContent = document.getElementById("content");
// Buttons
var newTabIcon = document.getElementById("newtab-icon");
var editBtnSubmit = document.getElementById("edit-btn-submit");
var editBtnClose = document.getElementById("edit-btn-close");
var addBtnSubmit = document.getElementById("add-btn-submit");
var addBtnClose = document.getElementById("add-btn-close");
// Tabs
var tabGroup = document.getElementById("tab-group");
// Inputs
var editInput = document.getElementById("edit-title-input");
var addTitleInput = document.getElementById("add-title-input");
var addContentInput = document.getElementById("add-content-input");
//--------------------------------------------------------------------------------------------
var closeForm = function () {
    editForm.style.display = "none";
    addForm.style.display = "none";
    mainPage.style.display = "block";
    addTitleInput.value = "";
    addContentInput.value = "";
};
var changeContent = function (event) {
    var selectedtitle = event.target
        .innerText;
    if (selectedtitle !== undefined) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (obj.title === selectedtitle) {
                mainContent.innerText = obj.content;
            }
        }
    }
};
var openEditForm = function (event) {
    var id = event.target.id;
    console.log(id);
    var className = event.target.className;
    if (id !== "tab1") {
        if (className == "tab" || id.indexOf("tab-title") != -1) {
            editInput.value = event.target.innerText;
            editForm.style.display = "block";
            editForm.setAttribute("for", id[id.length - 1]);
            mainPage.style.display = "none";
        }
    }
};
var submitEditForm = function () {
    var newText = editInput.value;
    var attrLen = editForm.attributes.length;
    var tabId = "tab-title".concat(editForm.attributes[attrLen - 1].value);
    var requiredTab = document.getElementById(tabId);
    var index = editForm.attributes[attrLen - 1].value - 1;
    requiredTab.innerText = newText;
    data[index].title = newText;
    closeForm();
};
var openAddForm = function (event) {
    var id = event.target.id;
    if (id == "newtab-icon") {
        addForm.style.display = "block";
    }
    mainPage.style.display = "none";
};
var submitAddForm = function () {
    mainContent.innerText = addContentInput.value;
    var tabGroup = document.getElementById("tab-group");
    var tabLength = document.querySelectorAll(".tab").length;
    var addIcon = document.getElementById("newtab-icon");
    var tab = renderTab(tabLength + 1);
    tabGroup.insertBefore(tab, addIcon);
    var newData = { title: tab.innerText, content: addContentInput.value };
    data.push(newData);
    addContentInput.value = "";
    addTitleInput.value = "";
    closeForm();
};
var deleteTab = function (event) {
    var _a, _b;
    var ele = event.target.classList.value;
    if (ele == "closetab") {
        var parent_1 = (_a = event.target) === null || _a === void 0 ? void 0 : _a.parentNode;
        parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.remove();
        mainContent.innerText = data[0].content;
    }
    else if (ele == "closetab-path") {
        var parent_2 = (_b = event.target) === null || _b === void 0 ? void 0 : _b.parentNode;
        var grandParent = parent_2 === null || parent_2 === void 0 ? void 0 : parent_2.parentNode;
        grandParent === null || grandParent === void 0 ? void 0 : grandParent.remove();
        mainContent.innerText = data[0].content;
    }
};
//--------------------------------------------------------------------------------------------
function renderCloseIcon(node) {
    var iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
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
    var _a;
    // Create the DOM elements
    var parent = document.createElement("div");
    var child = document.createElement("div");
    // Add some classes and attributes
    parent.classList.add("tab");
    parent.id = "tab".concat(id);
    child.id = "tab-title".concat(id);
    child.innerText = (_a = document.getElementById("add-title-input")) === null || _a === void 0 ? void 0 : _a.value;
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
