const btn_encriptar = document.getElementById('btn_encriptar');
const btn_desencriptar = document.getElementById('btn_desencriptar');
const inptTextArea = document.getElementById('inptTextArea');
const area_texto = document.getElementById('area_texto');
const btn_copiar = document.getElementById('btn_copiar');
const pre_information = document.getElementsByClassName("preinformacion");
const keysEncoded = {
    "e" : "enter",
    "i" : "imes",
    "a" : "ai",
    "o" : "ober",
    "u" : "ufat"
}

inptTextArea.addEventListener("input", validateText);
btn_encriptar.onclick = encrypt; 
btn_desencriptar.onclick = decrypt;
btn_copiar.onclick = copyResult;

function encrypt(){
    if (inptTextArea.value !== ""){
        const text = inptTextArea.value;
        let encrypted = text;
        for (const key in keysEncoded) {
            const regex = new RegExp(key, "g");
            encrypted = encrypted.replace(regex, keysEncoded[key]);
        }
        writeResult(encrypted);
    }
}

function decrypt(){
    if (inptTextArea.value !== ""){
        const text = inptTextArea.value;
        let encrypted = text;
        for (const key in keysEncoded) {
            const regex = new RegExp(keysEncoded[key], "g");
            encrypted = encrypted.replace(regex, key);
        }
        writeResult(encrypted);
    }
}

function writeResult(text){
    area_texto.value = text;
    showOrHiddenTextOutput("none", "block");
}

function copyResult(){
    area_texto.select();
    if (!navigator.clipboard) {
        document.execCommand("copy");
        return 
    }
    navigator.clipboard.writeText(area_texto.value);
}

function validateText() {
    if (inptTextArea.value === "") {
      showOrHiddenTextOutput("block", "none");
      return;
    }

    const regex = /[W]|[áéíóúÁÉÍÓÚñÑ¿¡«»“”‘’'"´`+*()\-–—/\\=|#@^\[\]{}%$§&~;:<>!?]|[A-Z]/g;
    const cleanedText = inptTextArea.value.replace(regex, "");
    inptTextArea.value = cleanedText;
}

function showOrHiddenTextOutput(style1, style2){
    for (let i = 0; i < pre_information.length; i++) {
      pre_information[i].style.display = style1;
    }
    area_texto.style.display = style2;
    btn_copiar.style.display = style2;
}