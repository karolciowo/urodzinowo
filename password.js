$(function () {
  const expectedPinHash = 'E0C7BFA5B8E4AE0CECFC1F14093A71E05C27ABD93A3850FC35F008C3BAF866B4';

  $("#password input").on('input', function (evt) {
    evt.preventDefault();
    if (!isNaN(evt.originalEvent.data)) {
      $(this).val(evt.originalEvent.data);
    }
  });

  const status = $("#status");
  const next = $("#next");
  next.click(progress);

  const pinFailed = "<p class='failed'>Niepoprawny PIN</p>";
  const pinOK = "<p class='success'>PIN poprawny</p>";

  $("#pin-form").submit(function (evt) {
    evt.preventDefault();
    const pin = $("#pin-form input")
      .toArray()
      .map((value) => value.value)
      .join("");
    const pinHash = sha256(pin).toUpperCase();
    if (pinHash !== expectedPinHash) {
      status.html(pinFailed)
    } else {
      status.html(pinOK);
      next.prop('disabled', false);
    }
  });
});