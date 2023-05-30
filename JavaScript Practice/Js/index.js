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
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let company = document.getElementById("company").value;
  let address = document.getElementById("address").value;

  if (name == "") {
    alert("Name is required");
    return false;
  }

  if (age == "") {
    alert("Email is required");
    return false;
  }

  if (phone > 10) {
    alert("Minimum phone number required is 10");
    return false;
  }

  return true;
}

function showData() {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  var html = "";
  var colors = ["#EF5350", "#EC407A", "#AB47BC", "#7E57C2" , "#5C6BC0", "#42A5F5" , "#29B6F6", "#26C6DA", "#66BB6A", "#9CCC65", "#D4E157", "#FFEE58", "#FFCA28", "#FFA726", "#FF7043"];

  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += '<td> <input type="checkbox" id="' + index + '"></td>';
    html +=
      "<td> <div class='Inline'><div class='test1' style='background-color:" +
      colors[Math.floor(Math.random() * colors.length)] +
      "'>" +
      getInitials(element.name) +
      "</div>" +
      element.name +
      "</div></td>";
    html += "<td> <div class='Inline'>" + element.email + "</div></td>";
    html += "<td> <div class='Inline'>" + element.phone + "</div></td>";
    html += "<td><div class='Inline'>" + element.company + "</div></td>";
    html += "<td><div class='Inline'>" + element.address + "</div></td>";
    // var random_color = colors[Math.floor(Math.random() * colors.length)];
    // document.getElementById("color-" + index).style.backgroundColor = random_color;

    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button></td>';
    html += "</tr>";
  });

  document.querySelector("#main-table tbody").innerHTML = html;
}

// For showing the  main table

document.onload = showData();

function AddData() {
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
