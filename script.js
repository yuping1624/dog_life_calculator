const form = document.getElementById('petForm');
const resultSection = document.getElementById('result');
const greeting = document.getElementById('greeting');
const petAgeP = document.getElementById('petAge');
const humanAgeP = document.getElementById('humanAge');

// Load previous data from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('petName');
  const savedBirthday = localStorage.getItem('petBirthday');
  const savedPetAge = localStorage.getItem('petAge');
  const savedHumanAge = localStorage.getItem('humanAge');

  if (savedName && savedBirthday && savedPetAge && savedHumanAge) {
    document.getElementById('petName').value = savedName;
    document.getElementById('petBirthday').value = savedBirthday;

    greeting.textContent = `Hello, ${savedName}! 🐶`;
    petAgeP.textContent = `Pet's actual age: ${parseFloat(savedPetAge).toFixed(1)} years`;
    animateNumber(humanAgeP, parseFloat(savedHumanAge), "Equivalent human age: ", 1.0);

    resultSection.classList.remove('hidden');
  }
});

// Form submit event
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('petName').value.trim();
  const birthday = document.getElementById('petBirthday').value;

  if (!name || !birthday) {
    alert("Please enter your pet's name and birth date");
    return;
  }

  const birthDate = new Date(birthday);
  const today = new Date();

  if (birthDate > today) {
    alert("Birth date cannot be in the future!");
    return;
  }

  const petAge = calculatePetAge(birthDate, today);
  const humanAge = convertToHumanAgeUCSD(petAge);

  greeting.textContent = `Hello, ${name}! 🐶`;
  petAgeP.textContent = `Pet's actual age: ${petAge.toFixed(1)} years`;
  animateNumber(humanAgeP, humanAge, "Equivalent human age: ", 1.0);

  resultSection.classList.remove('hidden');

  // Save to localStorage
  localStorage.setItem('petName', name);
  localStorage.setItem('petBirthday', birthday);
  localStorage.setItem('petAge', petAge.toFixed(1));
  localStorage.setItem('humanAge', humanAge.toFixed(1));
});

// Calculate pet age in years
function calculatePetAge(birthDate, today) {
  const diffTime = today - birthDate;
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return diffYears;
}

// UCSD formula to convert to human age
function convertToHumanAgeUCSD(petAge) {
  return 16 * Math.log(petAge) + 31;
}

// Animate number for human age
function animateNumber(element, target, prefix = '', duration = 1.0) {
  let start = 0;
  const steps = Math.ceil(duration * 60);
  const increment = target / steps;
  element.textContent = prefix + start.toFixed(1);

  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    start += increment;
    element.textContent = prefix + start.toFixed(1);
    if (currentStep >= steps) clearInterval(interval);
  }, 1000 / 60);
}