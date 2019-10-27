let toast = undefined;
let toastCleared = false;
let toastTimeout = undefined;
// Gets rid of the toast.
function clearToast() {
  // No toast or already cleared, then don't clear.
  if (toastCleared || !toast) {
    return;
  }

  // Set flags.
  toastCleared = true;

  // Remove the visible.
  toast.className = toast.className.replace(" visible", " hidden");

  // Clear toast.
  toast = undefined;
}

// Pauses toast dismissal.
function pauseToast() {
  clearTimeout(toastTimeout);
}

// Resumes toast dismissal.
function resumeToast(timeout = 2750) {
  toastTimeout = setTimeout(clearToast, timeout);
}

// Checks for the success value in the URL.
function successCheck() {
  // Load the URL parameters.
  var urlParameters = new URLSearchParams(location.search);

  // Check for the success value.
  if (urlParameters.has("success")) {
    const success = urlParameters.get("success");
    if (success === "1") {
      toast = document.getElementById("good-toast");
      toast.className = "toast visible";
    } else if (success === "0") {
      toast = document.getElementById("bad-toast");
      toast.className = "toast bad visible";
    }
  }

  // Start timeout.
  resumeToast();
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