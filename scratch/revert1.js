const fs = require('fs');
let content = fs.readFileSync('src/components/SecretGame.jsx', 'utf8');

content = content.replace("import ConfettiBurst from './ConfettiBurst';\n", "");
content = content.replace("import DesertReveal from './DesertReveal';\n", "");

let oldGlow = "glow: {\n        scale: [1, 1.2, 1, 1.2, 1, 1.5],\n        boxShadow: [\"0px 0px 0px rgba(247,209,61,0)\", \"0px 0px 100px rgba(247,209,61,1)\", \"0px 0px 0px rgba(247,209,61,0)\", \"0px 0px 100px rgba(247,209,61,1)\", \"0px 0px 0px rgba(247,209,61,0)\", \"0px 0px 150px 100px rgba(247,209,61,1)\"],\n        backgroundColor: [\"rgba(247,209,61,0.2)\", \"rgba(247,209,61,0.8)\", \"rgba(247,209,61,0.2)\", \"rgba(247,209,61,0.8)\", \"rgba(247,209,61,0.2)\", \"rgba(247,209,61,1)\"],\n        opacity: [1, 1, 1, 1, 1, 0.4],\n        borderColor: [\"#f7d13d\", \"#f7d13d\", \"#f7d13d\", \"#f7d13d\", \"#f7d13d\", \"transparent\"],\n        transition: { duration: 2.5, ease: \"easeInOut\", times: [0, 0.2, 0.4, 0.6, 0.8, 1] }\n      }";

let newGlow = "glow: {\n        scale: 1.5,\n        boxShadow: \"0px 0px 150px 100px rgba(247,209,61,1)\",\n        backgroundColor: \"rgba(247,209,61,1)\",\n        transition: { duration: 1, ease: \"easeInOut\" }\n      }";

content = content.replace(oldGlow, newGlow);
fs.writeFileSync('src/components/SecretGame.jsx', content);
