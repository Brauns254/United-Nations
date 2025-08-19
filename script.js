document.addEventListener('DOMContentLoaded', () => {
  console.log('script.js loaded');

  const applicationForm = document.getElementById('application-form');
  const paymentSection = document.getElementById('payment-section');
  const paymentModal = document.getElementById('payment-modal');
  const receiptSection = document.getElementById('receipt-section');
  const countrySelect = document.getElementById('country');
  const paymentInstructions = document.getElementById('payment-instructions');
  const confirmPayment = document.getElementById('confirm-payment');
  const receiptClose = document.getElementById('receipt-close');
  const closeModal = document.querySelector('.close-modal');
  const paymentAmount = document.getElementById('payment-amount');
  const paymentCurrency = document.getElementById('payment-currency');
  const receiptAmount = document.getElementById('receipt-amount');
  const receiptCurrency = document.getElementById('receipt-currency');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const carouselPrev = document.querySelector('.carousel-prev');
  const carouselNext = document.querySelector('.carousel-next');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const galleryCarousel = document.querySelector('.gallery-carousel');

  let selectedAmount = 0;
  let selectedCountry = '';
  let localCurrency = 'KSh';
  let exchangeRate = 1;
  let currentSlide = 0;
  let carouselInterval = setInterval(nextSlide, 5000);

  // Exchange rates (KSh to local currency, multiply KSh by rate)
  // Exchange rates (KSh to local currency, multiply KSh by rate)
// Rates updated where data is available; others retained but may be inaccurate
const exchangeRates = {
  algeria: { rate: 0.15, currency: 'DZD' }, // Verify: Likely outdated, check real-time sources
  angola: { rate: 0.18, currency: 'AOA' }, // Verify: Likely outdated
  benin: { rate: 0.15, currency: 'XOF' }, // Verify: Likely too low, ~4.5–5 XOF/KSh expected
  botswana: { rate: 1.35, currency: 'BWP' }, // Verify: Plausible but check real-time
  burkina_faso: { rate: 0.15, currency: 'XOF' }, // Verify: Likely too low
  burundi: { rate: 21.81, currency: 'BIF' }, // Updated: Based on April 2024 data, verify for 2025
  cameroon: { rate: 0.15, currency: 'XAF' }, // Verify: Likely too low
  cape_verde: { rate: 0.8, currency: 'CVE' }, // Verify: Likely outdated
  central_african_republic: { rate: 0.15, currency: 'XAF' }, // Verify: Likely too low
  chad: { rate: 0.15, currency: 'XAF' }, // Verify: Likely too low
  comoros: { rate: 4.5, currency: 'KMF' }, // Verify: Plausible but check real-time
  congo: { rate: 0.15, currency: 'XAF' }, // Verify: Likely too low
  cote_divoire: { rate: 0.15, currency: 'XOF' }, // Verify: Likely too low
  djibouti: { rate: 18, currency: 'DJF' }, // Verify: Plausible but check real-time
  egypt: { rate: 2.5, currency: 'EGP' }, // Verify: Likely outdated
  equatorial_guinea: { rate: 0.15, currency: 'XAF' }, // Verify: Likely too low
  eritrea: { rate: 2, currency: 'ERN' }, // Verify: Likely outdated
  eswatini: { rate: 1.35, currency: 'SZL' }, // Verify: Plausible but check real-time
  ethiopia: { rate: 3, currency: 'ETB' }, // Verify: Likely outdated
  gabon: { rate: 0.15, currency: 'XAF' }, // Verify: Likely too low
  gambia: { rate: 0.5, currency: 'GMD' }, // Verify: Likely outdated
  ghana: { rate: 0.08, currency: 'GHS' }, // Verify: Likely too low
  guinea: { rate: 85, currency: 'GNF' }, // Verify: Plausible but check real-time
  guinea_bissau: { rate: 0.15, currency: 'XOF' }, // Verify: Likely too low
  kenya: { rate: 1, currency: 'KSh' }, // Correct: Base currency
  lesotho: { rate: 1.35, currency: 'LSL' }, // Verify: Plausible but check real-time
  liberia: { rate: 0.007, currency: 'LRD' }, // Verify: Likely outdated
  libya: { rate: 0.2, currency: 'LYD' }, // Verify: Likely outdated
  madagascar: { rate: 40, currency: 'MGA' }, // Verify: Plausible but check real-time
  malawi: { rate: 100, currency: 'MWK' }, // Verify: Likely too high
  mali: { rate: 0.15, currency: 'XOF' }, // Verify: Likely too low
  mauritania: { rate: 3.5, currency: 'MRU' }, // Verify: Likely outdated
  mauritius: { rate: 0.4, currency: 'MUR' }, // Verify: Likely outdated
  morocco: { rate: 0.1, currency: 'MAD' }, // Verify: Likely outdated
  mozambique: { rate: 0.6, currency: 'MZN' }, // Verify: Likely outdated
  namibia: { rate: 1.35, currency: 'NAD' }, // Verify: Plausible but check real-time
  niger: { rate: 0.15, currency: 'XOF' }, // Verify: Likely too low
  nigeria: { rate: 11.55, currency: 'NGN' }, // Updated: Based on February 2025 data
  rwanda: { rate: 9.82, currency: 'RWF' }, // Updated: Based on April 2024 data, verify for 2025
  sao_tome_and_principe: { rate: 0.05, currency: 'STN' }, // Verify: Likely outdated
  senegal: { rate: 0.15, currency: 'XOF' }, // Verify: Likely too low
  seychelles: { rate: 0.15, currency: 'SCR' }, // Verify: Likely outdated
  sierra_leone: { rate: 500, currency: 'SLL' }, // Verify: Likely too high
  somalia: { rate: 4.35, currency: 'SOS' }, // Updated: Based on April 2024 data, verify for 2025
  south_africa: { rate: 1.35, currency: 'ZAR' }, // Verify: Plausible but check real-time
  south_sudan: { rate: 5, currency: 'SSP' }, // Verify: Likely outdated
  sudan: { rate: 50, currency: 'SDG' }, // Verify: Likely outdated
  tanzania: { rate: 20.55, currency: 'TZS' }, // Updated: Based on July 2024 data, verify for 2025
  togo: { rate: 0.15, currency: 'XOF' }, // Verify: Likely too low
  tunisia: { rate: 0.03, currency: 'TND' }, // Verify: Likely outdated
  uganda: { rate: 27.48, currency: 'UGX' }, // Corrected: As per user confirmation
  zambia: { rate: 0.5, currency: 'ZMW' }, // Verify: Likely outdated
  zimbabwe: { rate: 10, currency: 'ZWL' } // Verify: Likely outdated
};

  // Payment instructions
  const paymentInstructionsText = {
    kenya: `
      <p><strong>Instructions for sending money from Kenya to Kenya:</strong></p>
      <ol>
        <li>Open your M-Pesa menu (e.g., via Safaricom app or *334#).</li>
        <li>Select "Lipa na M-Pesa" > "Pay Bill".</li>
        <li>Enter Business Number: <strong>123456</strong> (simulated).</li>
        <li>Enter Account Number: <strong>UNPROMO</strong>.</li>
        <li>Enter Amount: <span class="instruction-amount">0</span> <span class="instruction-currency">KSh</span>.</li>
        <li>Enter your M-Pesa PIN and confirm.</li>
        <li>Copy the confirmation message (e.g., 'ABC1234567 Confirmed. KSh 299 sent to UN Promotions...') and paste it below.</li>
      </ol>
    `,
    uganda: `
      <p><strong>Instructions for sending money from Uganda to Kenya:</strong></p>
      <ol>
        <li>Open your MTN Mobile Money or Airtel Money app.</li>
        <li>Select "Send Money" > "International Transfer" (if available, or use a cross-border service like M-Pesa Global).</li>
        <li>Enter Recipient Number: <strong>+254756XXXXXX</strong>.</li>
        <li>Enter Amount: <span class="instruction-amount">0</span> <span class="instruction-currency">UGX</span>.</li>
        <li>Confirm with your PIN.</li>
        <li>Copy the confirmation message and paste it below.</li>
        <li>Note: You may need to visit an agent or use a service like Western Union for cross-border payments.</li>
      </ol>
    `,
    tanzania: `
      <p><strong>Instructions for sending money from Tanzania to Kenya:</strong></p>
      <ol>
        <li>Open your M-Pesa, Tigo Pesa, or Airtel Money app.</li>
        <li>Select "Send Money" > "International Transfer" (e.g., via M-Pesa Global or Vodacom).</li>
        <li>Enter Recipient Number: <strong>+254756XXXXXX</strong>.</li>
        <li>Enter Amount: <span class="instruction-amount">0</span> <span class="instruction-currency">TZS</span>.</li>
        <li>Confirm with your PIN.</li>
        <li>Copy the confirmation message and paste it below.</li>
        <li>Note: Cross-border payments may require a mobile money agent or a service like Western Union.</li>
      </ol>
    `,
    somalia: `
      <p><strong>Instructions for sending money from Somalia to Kenya:</strong></p>
      <ol>
        <li>Open your Hormuud EVC Plus or Dahabshiil eDahab app.</li>
        <li>Select "Send Money" > "International Transfer" (if available).</li>
        <li>Enter Recipient Number: <strong>+254756XXXXXX</strong>.</li>
        <li>Enter Amount: <span class="instruction-amount">0</span> <span class="instruction-currency">SOS</span>.</li>
        <li>Confirm with your PIN.</li>
        <li>Copy the confirmation message and paste it below.</li>
        <li>Note: Cross-border payments may require visiting a mobile money agent or using a service like Dahabshiil or Western Union.</li>
      </ol>
    `,
    nigeria: `
      <p><strong>Instructions for sending money from Nigeria to Kenya:</strong></p>
      <ol>
        <li>Open your Paga, Opay, or MTN Mobile Money app.</li>
        <li>Select "Send Money" > "International Transfer".</li>
        <li>Enter Recipient Number: <strong>+254756XXXXXX</strong>.</li>
        <li>Enter Amount: <span class="instruction-amount">0</span> <span class="instruction-currency">NGN</span>.</li>
        <li>Confirm with your PIN.</li>
        <li>Copy the confirmation message and paste it below.</li>
        <li>Note: You may need to visit an agent or use a service like Western Union for cross-border payments.</li>
      </ol>
    `,
    ghana: `
      <p><strong>Instructions for sending money from Ghana to Kenya:</strong></p>
      <ol>
        <li>Open your MTN Mobile Money or Vodafone Cash app.</li>
        <li>Select "Send Money" > "International Transfer".</li>
        <li>Enter Recipient Number: <strong>+254756XXXXXX</strong>.</li>
        <li>Enter Amount: <span class="instruction-amount">0</span> <span class="instruction-currency">GHS</span>.</li>
        <li>Confirm with your PIN.</li>
        <li>Copy the confirmation message and paste it below.</li>
        <li>Note: You may need to visit an agent or use a service like Western Union for cross-border payments.</li>
      </ol>
    `,
    south_africa: `
      <p><strong>Instructions for sending money from South Africa to Kenya:</strong></p>
      <ol>
        <li>Open your Vodacom M-Pesa or MTN Mobile Money app.</li>
        <li>Select "Send Money" > "International Transfer".</li>
        <li>Enter Recipient Number: <strong>+254756XXXXXX</strong>.</li>
        <li>Enter Amount: <span class="instruction-amount">0</span> <span class="instruction-currency">ZAR</span>.</li>
        <li>Confirm with your PIN.</li>
        <li>Copy the confirmation message and paste it below.</li>
        <li>Note: You may need to visit an agent or use a service like Western Union for cross-border payments.</li>
      </ol>
    `,
    default: `
      <p><strong>Instructions for sending money to Kenya:</strong></p>
      <ol>
        <li>Open your mobile money app or visit an agent.</li>
        <li>Select "Send Money" > "International Transfer".</li>
        <li>Enter Recipient Number: <strong>+254756XXXXXX</strong>.</li>
        <li>Enter Amount: <span class="instruction-amount">0</span> <span class="instruction-currency">local currency</span>.</li>
        <li>Confirm with your PIN.</li>
        <li>Copy the confirmation message and paste it below.</li>
        <li>Note: You may need to visit a mobile money agent or use a service like Western Union for cross-border payments.</li>
      </ol>
    `
  };

  // Update currency when country changes
  function updateCurrency() {
    selectedCountry = countrySelect.value;
    if (selectedCountry) {
      const countryData = exchangeRates[selectedCountry] || { rate: 1, currency: 'KSh' };
      exchangeRate = countryData.rate;
      localCurrency = countryData.currency;

      // Update all displayed amounts
      document.querySelectorAll('.local-amount').forEach(el => {
        const kshAmount = parseFloat(el.getAttribute('data-ksh'));
        const localAmount = Math.max((kshAmount * exchangeRate).toFixed(2), 0.01);
        el.textContent = `${localAmount} ${localCurrency}`;
      });

      // Update payment instructions
      const instructions = paymentInstructionsText[selectedCountry] || paymentInstructionsText.default;
      paymentInstructions.innerHTML = instructions;

      // Update instruction amounts if they exist
      if (selectedAmount) {
        updateInstructionAmounts();
      }
    }
  }

  // Update instruction amounts in the modal
  function updateInstructionAmounts() {
    const instructionAmountElements = document.querySelectorAll('.instruction-amount');
    const instructionCurrencyElements = document.querySelectorAll('.instruction-currency');

    if (instructionAmountElements.length > 0) {
      const localAmount = Math.max((selectedAmount * exchangeRate).toFixed(2), 0.01);
      instructionAmountElements.forEach(el => {
        el.textContent = localAmount;
      });
    }

    if (instructionCurrencyElements.length > 0) {
      instructionCurrencyElements.forEach(el => {
        el.textContent = localCurrency;
      });
    }
  }

  // Carousel functionality
  function showSlide(index) {
    carouselSlides.forEach((slide, i) => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
      if (i === index) {
        slide.classList.add('active');
        slide.style.opacity = '1';
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(currentSlide);
  }

  // Validate form inputs
  function validateForm() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,12}$/;

    if (!selectedCountry) {
      alert('Please select a country.');
      countrySelect.focus();
      return false;
    }
    if (!name || name.length < 2) {
      alert('Please enter a valid name.');
      nameInput.focus();
      return false;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      emailInput.focus();
      return false;
    }
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number (e.g., +254712345678).');
      phoneInput.focus();
      return false;
    }
    return true;
  }

  // Update currency on country change
  countrySelect.addEventListener('change', updateCurrency);

  // Form submission
  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    selectedCountry = countrySelect.value;
    if (validateForm()) {
      paymentSection.classList.remove('hidden');
      paymentSection.setAttribute('aria-hidden', 'false');
      paymentSection.scrollIntoView({ behavior: 'smooth' });
      updateCurrency();
    }
  });

  // Package selection
  document.querySelectorAll('.btn-package').forEach(button => {
    button.addEventListener('click', () => {
      selectedAmount = parseFloat(button.getAttribute('data-amount'));
      const localAmount = Math.max((selectedAmount * exchangeRate).toFixed(2), 0.01);

      paymentAmount.textContent = localAmount;
      paymentCurrency.textContent = localCurrency;

      updateInstructionAmounts();
      paymentModal.showModal();

      // Focus trapping for accessibility
      const focusableElements = paymentModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      firstFocusable.focus();

      paymentModal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      });
    });
  });

  // Confirm payment
  confirmPayment.addEventListener('click', () => {
    const confirmationMessage = document.getElementById('confirmation-message').value.trim();
    if (confirmationMessage.length > 10 && confirmationMessage.includes('Confirmed')) {
      paymentModal.close();

      const localAmount = Math.max((selectedAmount * exchangeRate).toFixed(2), 0.01);
      const transactionId = `TRX${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      document.getElementById('receipt-trx-id').textContent = transactionId;
      receiptAmount.textContent = localAmount;
      receiptCurrency.textContent = localCurrency;
      document.getElementById('receipt-phone').textContent = phoneInput.value;
      document.getElementById('receipt-date').textContent = new Date().toLocaleString();

      receiptSection.showModal();

      // Focus trapping for receipt modal
      const focusableElements = receiptSection.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      firstFocusable.focus();

      receiptSection.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      });
    } else {
      alert('Please paste a valid confirmation message containing "Confirmed".');
    }
  });

  // Close receipt
  receiptClose.addEventListener('click', () => {
    receiptSection.close();
    applicationForm.reset();
    paymentSection.classList.add('hidden');
    paymentSection.setAttribute('aria-hidden', 'true');
    document.getElementById('confirmation-message').value = '';
    selectedAmount = 0;
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    paymentModal.close();
  });

  // Click outside to close modals
  paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
      paymentModal.close();
    }
  });

  receiptSection.addEventListener('click', (e) => {
    if (e.target === receiptSection) {
      receiptSection.close();
    }
  });

  // Carousel controls
  carouselNext.addEventListener('click', nextSlide);
  carouselPrev.addEventListener('click', prevSlide);

  // Keyboard navigation for carousel
  carouselNext.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    }
  });

  carouselPrev.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      prevSlide();
    }
  });

  // Pause carousel on hover
  galleryCarousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
  galleryCarousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 5000);
  });

  // Initialize carousel
  carouselSlides.forEach(slide => {
    slide.style.transition = 'opacity 0.5s ease';
    slide.style.opacity = '0';
    const img = slide.querySelector('img');
    img.onerror = () => {
      img.src = 'UN/fallback-image.jpg'; // Replace with your fallback image path
      console.error(`Failed to load image: ${img.src}`);
    };
  });
  carouselSlides[0].style.opacity = '1';
});