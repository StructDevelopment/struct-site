let toast = undefined;
let toastCleared = false;
let toastTimeout = undefined;

// Gets rid of the toast.
function clearToast() {
}

// Pauses toast dismissal.
function pauseToast() {
}

// Resumes toast dismissal.
function resumeToast(timeout = 2750) {
}

// Submits a contact request.
function submit() {
  // Get all the data.
  let first = document.getElementById("first");
  let last = document.getElementById("last");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");
  let message = document.getElementById("message");

  if (!first || !last || !phone || !email || !message) {
    return;
  }

  fetch("api/contact", {
    body: JSON.stringify({
      first: first.value,
      last: last.value,
      phone: phone.value,
      email: email.value,
      message: message.value
    }),
    method: "POST"
  }).then(x => {
    return;
  }).catch(err => {
    console.log(err);
    return;
  }).finally(() => {
    first.value = "";
    last.value = "";
    phone.value = "";
    email.value = "";
    message.value = "";
    window.scroll({
      top: -10000,
      behavior: 'smooth'
    });
  });
} 

// Checks for the success value in the URL.
function successCheck() {
}

let collapsed = true;
function moveDrawer() {
  // Find the drawer.
  let drawer = document.getElementById("menu-drawer");
  if (!drawer) {
    return;
  }

  // Swap the collapsed value.
  collapsed = !collapsed;

  // Set the classes appropriately.
  drawer.className = collapsed ? "menu-drawer" : "menu-drawer expanded";
}

function scrollToElement(id) {
  // Find the element.
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  // If window.scroll is available, use that.
  if (window.scroll) {
    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: 'smooth'
    });

    return;
  }

  // If element.scrollIntoView is not available, then do nothing.
  if (!element.scrollIntoView) {
    return;
  }

  element.scrollIntoView();
}