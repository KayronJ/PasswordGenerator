const passInput = document.querySelector("#inputPasswordId");
const lenInput = document.querySelector("#inputLengthId");
const infoLength = document.querySelector('label[for="inputLengthId"]');
const btnGerar = document.querySelector("#btnGerar");
const btnCopy = document.querySelector("#btnCopy");


const chkLower = document.querySelector("#chkLowerId");
const chkUpper = document.querySelector("#chkUpperId");
const chkNumber = document.querySelector("#chkNumberId");
const chkSymbols = document.querySelector("#chkSymbolsId");

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["!", "@", "#", "$", "%"];

const caracters = Array.from(Array(26)).map((_, i) => i + 97);
const LowercaseCaracters = caracters.map((item) => String.fromCharCode(item));
const UppercaseCaracters = LowercaseCaracters.map((item) => item.toUpperCase());

infoLength.innerHTML = lenInput.value;

lenInput.addEventListener("change", () => {
  infoLength.innerHTML = lenInput.value;
});

btnGerar.addEventListener("click", () => {

    btnGerar.addEventListener("click", () => {
        const hasNumbers = chkNumber.checked;
        const hasSymbols = chkSymbols.checked;
        const hasLowercase = chkLower.checked;
        const hasUppercase = chkUpper.checked;
        
        if (!hasNumbers && !hasSymbols && !hasLowercase && !hasUppercase) {
            ModalWarning();
        }
        
        generatePassword(hasNumbers, hasSymbols,
            hasLowercase, hasUppercase, lenInput.value);
      });
});

const generatePassword = (
  hasNumbers,
  hasSymbols,
  hasLowercase,
  hasUppercase,
  lenght
) => {
  const newArray = [
    ...(hasNumbers ? numbers : []),
    ...(hasSymbols ? symbols : []),
    ...(hasLowercase ? LowercaseCaracters : []),
    ...(hasUppercase ? UppercaseCaracters : []),
  ];

  if (newArray.length === 0) return;

  let password = "";

  for (let i = 0; i < lenght; i++) {
    const randomIndex = Math.floor(Math.random() * newArray.length);
    password += newArray[randomIndex];
  }

  passInput.value = password;
};

btnCopy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(passInput.value);
    } catch (err) {
      console.error("Falha ao copiar!", err);
    }
});

function ModalWarning() {
    var modal = document.getElementById("myModal");
    
    var span = document.getElementsByClassName("close")[0];
    
    modal.style.display = "block";
    
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
};
