// L.I. Lawn Service LLC: shared behavior

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("nav.main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  var otherService = document.getElementById("otherService");
  var otherServiceField = document.getElementById("otherServiceField");
  if (otherService && otherServiceField) {
    otherService.addEventListener("change", function () {
      otherServiceField.style.display = otherService.checked ? "block" : "none";
      if (!otherService.checked) {
        document.getElementById("otherServiceText").value = "";
      }
    });
  }

  var quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("name").value.trim();
      var phone = document.getElementById("phone").value.trim();
      var email = document.getElementById("email").value.trim();
      var address = document.getElementById("address").value.trim();
      var details = document.getElementById("details").value.trim();
      var otherServiceText = document.getElementById("otherServiceText")
        ? document.getElementById("otherServiceText").value.trim()
        : "";

      var services = Array.from(
        document.querySelectorAll('input[name="service"]:checked')
      )
        .map(function (el) {
          if (el.value === "Other" && otherServiceText) {
            return "Other (" + otherServiceText + ")";
          }
          return el.value;
        })
        .join(", ");

      var subject = "Quote Request: " + name;
      var bodyLines = [
        "Name: " + name,
        "Phone: " + phone,
        "Email: " + email,
        "Property Address: " + address,
        "Services Requested: " + (services || "Not specified"),
        "",
        "Details:",
        details
      ];
      var body = bodyLines.join("\n");

      var mailto =
        "mailto:aidanmacartney28@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      window.location.href = mailto;

      var status = document.getElementById("formStatus");
      if (status) {
        status.style.display = "block";
        status.textContent =
          "Opening your email app to send this request to Aidan. If nothing opens, call/text (631) 678-6491 instead.";
      }
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
