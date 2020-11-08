
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
client.queue = new Map();
const fs = require("fs");
const db = require("quick.db");
const moment = require("moment");
require("./util/eventLoader")(client);

///////////
const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
///////////

client.on('guildMemberAdd', async member => {

  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

////////////////////////

client.on("message", async message => {
  if (message.content === "gir") {
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});
client.on("message", async message => {
  if (message.content === "çık") {
    client.emit(
      "guildMemberRemove",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token);

//-------------Tag sistem----------------//

client.on("userUpdate", async (old, nev) => {
  let emingSunucu = "722900315380121745"; //Sunucu ID
  let emingKanal = "775011303546814504"; //BILGI KANAL ID
  let emingRol = "774985169874321409"; //ROL ID
  let emingTag = "ꐟ"; //TAG
  if (old.username !== nev.username) {
    if (
      nev.username.includes(emingTag) &&
      !client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .roles.has(emingRol)
    ) {
      client.channels
        .get(emingKanal)
        .send(
          ` **${nev}, \`${emingTag}\` Tagını aldı ${emingRol} rolünü kazandı.**`
        );
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .addRole(emingRol);
    }
    if (
      !nev.username.includes(emingTag) &&
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .roles.has(emingRol)
    ) {
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .removeRole(emingRol);
      client.channels
        .get(emingKanal)
        .send(
          ` **${nev}, \`${emingTag}\` Tagını çıkarttı ${emingRol} rolünü kaybetti.**`
        );
    }
  }
});

///////////////////////////////////////////////////

client.on('guildMemberAdd', member => {
  const kisi = member.guild.members.size
  //emoji
  
      const emoji = (client.emojis.find("name", "asg"))
      const emoji3 = (client.emojis.find("name", "asg"))
      const emoji4 = (client.emojis.find("name", "basarisiz"))
      const emoji5 = (client.emojis.find("name", "asg"))
      const emoji6 = (client.emojis.find("name", "asg"))  
       const emoji7 = (client.emojis.find("name", "asg"))
  //emoji son

  //moment
const moment = require("moment")

moment.locale('tr');
   var x = moment(member.user.createdAt)
    .add(7, "days")
    .fromNow();
   x = x.replace("birkaç saniye önce", " ");
  let guvenlik = 'Güvenli Gözüküyor <a:asg:734593952401063956>'
if (!x.includes("önce") || x.includes("sonra") || x == " ") guvenlik = 'Şüpheli Gözüküyor <a:basarisiz:734594059687166042>'
//moment son
  let emb = new Discord.RichEmbed()
.setImage(`https://cdn.discordapp.com/attachments/734260196116791346/775009441753202688/ozy.gif`)
  .addField(`**__Sunucuya Giriş Yapan Birisi Var__**`,`${emoji} ${member}, **Sunucuya Hoşgeldin**\n**${emoji} Seninle Beraber** **__${kisi}__** **Kişi Olduk**${emoji} \n${emoji6} **Sunucuya kayıt olmak için ses teyit odalarına geçebilirsiniz.**\n${emoji5} **Seninle İlgilenecek Yetkililer:**<@&734570953278881863> `)
.addField(`**__Hesap Bilgileri__**`,`${emoji4} **Kuruluş Tarihi:** ${moment(member.user.createdAt).add(7, "h").format("LLLL")}\n${emoji4} **Güvenli mi:** ${guvenlik}`)

member.guild.channels.get('734571089761534013').send(emb)
})
/////////////////////////////////////////////////////

// ÖZELDEN HOŞGELDİN //

client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://cdn.discordapp.com/attachments/734260196116791346/775009441753202688/ozy.gif`)
    .addField(
      `***Sunucumuza Geldiğin İçin Teşekkürler.!***`,
      `O Efsane Sunucumuzda Eğlenceler diler`
    )
    .setFooter(`Bu Sunucu 7/24 Recep Efsanesi tarafından korunuyor.`);
  member.send(e);
});

// ÖZELDEN HOŞGELDİN //
// SES SOKMA  //
client.on('ready', ()=>{
client.channels.get('774985138169577482').join()
})
