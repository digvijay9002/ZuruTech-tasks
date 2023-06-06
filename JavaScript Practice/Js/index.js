let lastClicked = undefined;

let modal = document.getElementById("myModal");

let btn = document.getElementById("add-btn");

let span = document.getElementsByClassName("close-btn")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function validateForm() {
  let validate = true;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let company = document.getElementById("company").value;
  let address = document.getElementById("address").value;

  if (name.length <= 2) {
    document.getElementById("validate-name").innerHTML =
      "*Please Enter a Valid user name";

    validate = false;
  }

  if (phone.length < 10 || phone.length > 10) {
    document.getElementById("validate-phone").innerHTML =
      "*Please Enter a Valid Phone Number";

    validate = false;
  }

  var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (regex.test(email)) {
    return 1;
  } else {
    document.getElementById("validate-email").innerHTML =
      "*Please Enter a Valid Email";

    validate = false;
  }
}

function showData() {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  var html = "";
  var colors = [
    "#EF5350",
    "#EC407A",
    "#AB47BC",
    "#7E57C2",
    "#5C6BC0",
    "#42A5F5",
    "#29B6F6",
    "#26C6DA",
    "#66BB6A",
    "#9CCC65",
    "#D4E157",
    "#FFEE58",
    "#FFCA28",
    "#FFA726",
    "#FF7043",
  ];

  peopleList.forEach(function (element, index) {
    html += "<tr id='contact-" + index + "' class='clk-effect'>";
    html += '<td> <input type="checkbox" id="' + index + '"></td>';
    html +=
      "<td> <div class='Inline'><div class='test1' id='random-color-" +
      index +
      "' style='background-color:" +
      colors[Math.floor(Math.random() * colors.length)] +
      "'>" +
      getInitials(element.name) +
      "</div>" +
      element.name +
      "</div></td>";
    html += "<td> <div class='Inline'>" + element.email + "</div></td>";

    html += "</tr>";
  });

  document.querySelector("#main-table tbody").innerHTML = html;

  peopleList.forEach(function (element, index) {
    document
      .getElementById("contact-" + index)
      .addEventListener("click", () => {
        sDetails(index);
      });
  });
}

// Selective Data Function

function sDetails(index) {
  var peopleList;

  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("sName").value = peopleList[index].name;
  document.getElementById("sEmail").value = peopleList[index].email;
  document.getElementById("sPhone").value = peopleList[index].phone;
  document.getElementById("sCompany").value = peopleList[index].company;
  document.getElementById("sAddress").value = peopleList[index].address;

  lastClicked = index;

  document.getElementById("additional-details").style.display = "block";

  document.getElementById("test-2").innerHTML = getInitials(
    peopleList[index].name
  );

  document.getElementById("actor-name").innerHTML = peopleList[index].name;

  document.getElementById("test-2").style.backgroundColor =
    document.getElementById("random-color-" + index).style.backgroundColor;
  console.log(getInitials(peopleList[index].name));
}

// For showing the  main table

document.onload = showData();

function AddData() {
  if (validateForm()) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var company = document.getElementById("company").value;
    var address = document.getElementById("address").value;

    var peopleList;

    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
      name: name,
      email: email,
      phone: phone,
      company: company,
      address: address,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("company").value = "";
    document.getElementById("address").value = "";
  }
}
function getInitials(name) {
  var parts = name.split(" ");
  var initials = "";
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== "") {
      initials += parts[i][0];
    }
  }

  return initials;
}

//Delete the Single data

function deleteData(index) {
  var peopleList;

  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

//Delete the Multiple data using checkboxes

function deleteList() {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  for (let index = peopleList.length - 1; index >= 0; index--) {
    let checkbox = document.getElementById(index);
    if (checkbox.checked) {
      peopleList.splice(index, 1);
    }
  }

  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
  document.getElementById("select-all-checkbox").checked = false;
}

//Select all the checkboxes

function selectAll() {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  let checkbox = document.getElementById("select-all-checkbox");
  if (checkbox.checked) {
    for (const key in peopleList) {
      document.getElementById(key).checked = true;
    }
  } else {
    for (const key in peopleList) {
      document.getElementById(key).checked = false;
    }
  }
}

//For enabling the text area

function enableField() {
  document.getElementById("sName").disabled = false;
  document.getElementById("sEmail").disabled = false;
  document.getElementById("sPhone").disabled = false;
  document.getElementById("sCompany").disabled = false;
  document.getElementById("sAddress").disabled = false;

  document.getElementById("update-btn").style.display = "flex";
  document.getElementById("cancel-btn").style.display = "flex";
}

var updateData = () => {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList[lastClicked].name = document.getElementById("sName").value;
  peopleList[lastClicked].email = document.getElementById("sEmail").value;
  peopleList[lastClicked].phone = document.getElementById("sPhone").value;
  peopleList[lastClicked].company = document.getElementById("sCompany").value;
  peopleList[lastClicked].address = document.getElementById("sAddress").value;

  localStorage.setItem("peopleList", JSON.stringify(peopleList));

  showData();
  cancel();
};

function cancel() {
  document.getElementById("sName").disabled = true;
  document.getElementById("sEmail").disabled = true;
  document.getElementById("sPhone").disabled = true;
  document.getElementById("sCompany").disabled = true;
  document.getElementById("sAddress").disabled = true;

  document.getElementById("update-btn").style.display = "none";
  document.getElementById("cancel-btn").style.display = "none";
}

function searchData() {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  for (const index in peopleList) {
    let str = document.getElementById("contact-search").value.toLowerCase();

    // console.log(peopleList[index].name);
    // console.log(peopleList[index].name.toLowerCase());
    // console.log(peopleList[index].name.toLowerCase().includes(str));

    if (
      peopleList[index].name.toLowerCase().includes(str) ||
      peopleList[index].email.toLowerCase().includes(str) ||
      peopleList[index].phone.toLowerCase().includes(str) ||
      peopleList[index].company.toLowerCase().includes(str) ||
      peopleList[index].address.toLowerCase().includes(str)
    ) {
      document.getElementById("contact-" + index).style.display = "table-row";
      // console.log(peopleList[index].name);
    } else {
      document.getElementById("contact-" + index).style.display = "none";
    }
  }
}

function closeDetails() {
  document.getElementById("additional-details").style.display = "none";
}

function visibleDetails() {
  document.getElementById("additional-details").style.display = "none";
}
