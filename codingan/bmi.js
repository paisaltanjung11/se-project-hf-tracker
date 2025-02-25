function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100;

  if (weight > 0 && height > 0) {
    const bmi = weight / (height * height);
    let category = "";

    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
    } else if (bmi >= 30 && bmi < 35) {
      category = "Obese";
    } else {
      category = "Extremely Obese";
    }

    document.getElementById("popupResult").innerHTML = `
      Your BMI: <strong>${bmi.toFixed(2)}</strong><br>
      Category: <strong>${category}</strong>
    `;

    document.getElementById("popupOverlay").style.display = "block";
    document.getElementById("bmiPopup").style.display = "block";
  } else {
    alert("Masukkan berat dan tinggi yang valid!");
  }
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("bmiPopup").style.display = "none";
}
