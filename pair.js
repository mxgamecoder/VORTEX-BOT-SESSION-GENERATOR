const PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Gifted_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
};

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function GIFTED_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id)

        try {
            let Pair_Code_By_Gifted_Tech = Gifted_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: ["Chrome (Linux)", "", ""]
            });

            if (!Pair_Code_By_Gifted_Tech.authState.creds.registered) {
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Gifted_Tech.requestPairingCode(num)
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Gifted_Tech.ev.on('creds.update', saveCreds)
            Pair_Code_By_Gifted_Tech.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;

                if (connection == "open") {
                    // Read and encode credentials
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let b64data = Buffer.from(data).toString('base10');
                    let session = await Pair_Code_By_Gifted_Tech.sendMessage(Pair_Code_By_Gifted_Tech.user.id, { text: 'ZEN-MD-BOT_' + b10data });

                    // Send welcome message
                    const GIFTED_MD_TEXT = `
*_Pair Code Connected by MX-GΔMΞCØDΞR*
*Creator = 𖥘 MX-GΔMΞCØDΞR 𖥘*
______________________________________
╔════◇
║ *『 WOW YOU'VE CHOSEN  ZEN-MD-BOT 』*
║ _You Have Completed the First Step to Deploy a Whatsapp Bot._
╚════════════════════════╝
╔═════◇
║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❍ *Tgram:* _https://t.me/Botdeveloperking_
║❍ *Owner:* _https://wa.me/2349021506036_
║❍ *Repo:* _https://github.com/mxgamecoder/ZEN-MD-BOT_
║❍ *WaGroup:* _https://chat.whatsapp.com/G6ofX7mzrDy8m92NMb4FJm_
║❍ *WaChannel:* _https://whatsapp.com/channel/0029Vavz0e6E50Ugp30Z6z0W_
║❍ *Plugins:* _https://github.com/mxgamecoder/ ZEN-MD-BOT-PLUGINS_
╚════════════════════════╝
_____________________________________

_Don't Forget To Give Star To My Repo_`;

                    await Pair_Code_By_Gifted_Tech.sendMessage(Pair_Code_By_Gifted_Tech.user.id, { text: GIFTED_MD_TEXT }, { quoted: session });

                    // Close connection and cleanup immediately
                    Pair_Code_By_Gifted_Tech.ws.close();
                    removeFile('./temp/' + id);
                    return;
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    // Retry without unnecessary delay
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.error("Service restarted:", err);
            removeFile('./temp/' + id);
            if (!res.headersSent) {
                res.send({ code: "Service Unavailable" });
            }
        }
    }

    return await GIFTED_MD_PAIR_CODE()
});

module.exports = router;
