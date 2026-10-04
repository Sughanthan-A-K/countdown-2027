const fs = require('fs');
let content = fs.readFileSync('src/components/SecretGame.jsx', 'utf8');

const oldGlowStart = "glow: {";
const oldGlowEnd = "transition: { duration: 2.5, ease: \"easeInOut\", times: [0, 0.2, 0.4, 0.6, 0.8, 1] }\n      }";

const newGlow = `glow: {
        scale: 1.5,
        boxShadow: "0px 0px 150px 100px rgba(247,209,61,1)",
        backgroundColor: "rgba(247,209,61,1)",
        transition: { duration: 1, ease: "easeInOut" }
      }`;

const startIdx = content.indexOf(oldGlowStart);
const endIdx = content.indexOf(oldGlowEnd);

if(startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + newGlow + content.substring(endIdx + oldGlowEnd.length);
    fs.writeFileSync('src/components/SecretGame.jsx', content);
    console.log("Replaced glow correctly");
} else {
    console.log("Could not find glow bounds");
}
