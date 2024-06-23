function toggleDetails(button) {
  const detailsRow = button.parentElement.parentElement.nextElementSibling;
  if (detailsRow.style.display === "none") {
      detailsRow.style.display = "table-row";
      button.textContent = " ";
  } else {
      detailsRow.style.display = "none";
      button.textContent = " ";
  }
}

function openFollowUpForm() {
  document.getElementById('follow-up-form').style.display = 'block';
  document.getElementById('follow-up-form').scrollIntoView({ behavior: 'smooth' });
  generateCaptcha();
}

function generateCaptcha() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
  }
  document.getElementById('captcha').innerText = captcha;
}


function refreshCaptcha() {
  generateCaptcha();
}

function validateForm() {
  const captchaInput = document.getElementById('captcha-input').value.trim();
  const captcha = document.getElementById('captcha').innerText;

  if (captchaInput !== captcha) {
      alert('رمز CAPTCHA غير صحيح');
      return false;
  }

  return true;
}

document.getElementById('follow-up-form').addEventListener('submit', function(event) {
  event.preventDefault();

  if (validateForm()) {
      const selectedProperties = document.querySelectorAll('input[type="checkbox"]:checked');
      let selectedDetails = '';

      selectedProperties.forEach(function(property) {
          const row = property.parentNode.parentNode;
          const cityName = row.cells[0].innerText;
          const propertyDetails = row.cells[1].innerText;
          selectedDetails += `${cityName} - ${propertyDetails}\n`;
      });

      window.open('', '_blank').document.write(`<h3>تم استلام طلبك بنجاح!</h3><p>تفاصيل العقارات:</p><pre>${selectedDetails}</pre>`);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  function updateBasket() {
      const basketTable = document.getElementById('basket-table');
      const selectedProperties = document.querySelectorAll('input[name="selectProperty"]:checked');
      let totalAmount = 0;

      basketTable.innerHTML = `
          <tr>
              <th>المدينة</th>
              <th>التفاصيل</th>
              <th>السعر</th>
          </tr>
      `;

      selectedProperties.forEach(function(property) {
          const row = property.parentNode.parentNode;
          const cityName = row.cells[0].innerText;
          const itemDetails = row.cells[1].innerText;
          const itemPrice = parseInt(row.cells[2].innerText.replace(/[^0-9]/g, ''));
          totalAmount += itemPrice;

          const newRow = basketTable.insertRow();
          newRow.innerHTML = `
              <td>${cityName}</td>
              <td>${itemDetails}</td>
              <td>${itemPrice.toLocaleString()} ل.س</td>
          `;
      });

      document.getElementById('subtotal').innerText = totalAmount.toLocaleString();
  }

  document.querySelectorAll('input[name="selectProperty"]').forEach(function(checkbox) {
      checkbox.addEventListener('change', updateBasket);
  });
});