const formValidation = [
  {
    id: "username",
    regex: new RegExp("^[a-zA-Z0-9]+$"),
    errorMessage: "Username must include only letters and numbers",
    required: true,
  },
  {
    id: "email",
    regex: new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    ),
    errorMessage: "Invalid email address",
    required: true,
  },
  {
    id: "phoneNumber",
    regex: new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"),
    errorMessage: "Invalid Phone Number",
  },
  {
    id: "accessRights",
    required: true,
    errorMessage: "User access rights required",
  },
];

const validateForm = (formData) => {
  const errors = formValidation.filter((formControl) => {
    const value = formData[formControl.id]?.value;
    if (formControl.required) {
      return !value;
    }
    if (formControl.regex && !!value) {
      const regex = new RegExp(formControl.regex);
      return !regex.test(value);
    }
  });

  return errors;
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const formData = event.target.elements;
  const errors = validateForm(formData);

  // HANDLE FORM ERRORS
  console.log("ERRORS:", errors);

  document.querySelectorAll(".error-message").forEach((span) => {
    span.textContent = "";
  });
  document.querySelectorAll(".error").forEach((span) => {
    span.classList.remove("error");
  });

  if (errors.length) {
    let errorDetails = [];

    errors.forEach((error) => {
      document.getElementById(error.id)?.classList?.add("error");
      const span = document.getElementById(`${error.id}Desc`);

      span.textContent = error.errorMessage;

      errorDetails.push(`<a href="#${error.id}">${error.errorMessage}</>`);
    });

    const status = `<h1>${errors.length} Errors in the form:</h1>`;
    const links = `<div class='error-links'>${errorDetails.join("")}</div>`;

    document.getElementById("status").innerHTML = status + links;
  } else {
    console.log("SUCCESS");

    const status = "<h1 class='success'>The form has been submitted</h1>";

    document.getElementById("status").innerHTML = status;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("newUser")
    .addEventListener("submit", handleFormSubmit);
});
