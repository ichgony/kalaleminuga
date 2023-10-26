document.addEventListener("DOMContentLoaded", function () {
  console.log("The DOM for [toode].html has loaded");

  // Add links to product cards in shop
  const submitbutton = document.getElementById("submit-button");
  submitbutton.addEventListener("click", (event) => {
    event.preventDefault();
    const response = validateFormFields();
    if (response.ok) {
      window.alert("Tellimus on esitamisel..");
      window.location.reload();
    } else {
      let message = "Ankeedi väljad pole korrektselt täidetud.";
      for (const m of response.messages) {
        message += "\n\t" + m;
      }
      window.alert(message);
    }
  });
});

function validateFormFields() {
  // Collect form values into an object
  const formValues = collectValues();

  // Collect messages about possible invalid inputs
  const messages = [];
  for (value of Object.keys(formValues)) {
    console.log(`Field: '${value}', value: '${formValues[value]}'`);
    if (isEmpty(formValues[value])) {
      messages.push(`Kõik ankeedi väljad peavad olema täidetud.`);
      break;
    }
  }

  if (formValues.name.length < 4 || formValues.name.split(" ").length < 2)
    messages.push(`Palun sisesta oma täisnimi.`);

  if (!formValues.email.includes("@"))
    messages.push(`Emaili aadress peab sisaldama '@' sümbolit.`);

  const phoneRegex = /\d{7}|\d{8}/g;
  if (phoneRegex.exec(formValues.phone) == null)
    messages.push(
      `Sisestatud telefoninumber ei vasta Eesti telefoninumbri formaadile.`
    );

  if (!isInt(formValues.quantity)) {
    messages.push(`Sisestatud kogus peab olema täisnumber.`);
  }

  if (
    !["transfer", "lhv", "swedbank", "seb"].includes(formValues.paymentMethod)
  )
    messages.push("Makseviis peab olema valitud.");

  if (!["kuller", "pakiautomaat", "ise"].includes(formValues.delivery))
    messages.push("Kohaletoimetamine peab olema valitud.");

  // Validations done, returning..
  if (messages.length == 0) {
    return {
      ok: true,
    };
  } else
    return {
      ok: false,
      messages: messages,
    };
}

const collectValues = () => {
  // nimi
  const nameFieldValue = document.getElementById("input-name").value;
  // email
  const emailFieldValue = document.getElementById("input-email").value;
  // telefon
  const phoneFieldValue = document.getElementById("input-phone").value;
  // aadress
  const addressFieldValue = document.getElementById("input-address").value;
  // Kogus
  const quantityFieldValue = document.getElementById("input-quantity").value;
  // Makseviis
  const paymentOptions = document.getElementById("input-payment");
  const paymentFieldValue =
    paymentOptions.options[paymentOptions.options.selectedIndex].value;
  // Kohaletoimetamine
  let deliveryFieldValue;
  for (id of [
    "input-delivery-kuller",
    "input-delivery-pakiautomaat",
    "input-delivery-ise",
  ]) {
    const checkboxElement = document.getElementById(id);
    if (checkboxElement.checked) {
      deliveryFieldValue = checkboxElement.value;
    }
  }
  return {
    name: nameFieldValue,
    email: emailFieldValue,
    phone: phoneFieldValue,
    address: addressFieldValue,
    quantity: quantityFieldValue,
    paymentMethod: paymentFieldValue,
    delivery: deliveryFieldValue,
  };
};

const isEmpty = (fieldValue) => {
  return fieldValue == "" || fieldValue == undefined;
};

function isInt(value) {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}
