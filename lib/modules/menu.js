function secondtime(second) {
    var sec_num = parseInt(second, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

exports.daftarTeks = {
    menuBot() {
        let teks = `Hai, Ada yang bisa Saya Bantu?
Mohon Berhati2 jika memakai Filtur Random Image Terkadang ada Foto 18+ 
Premium: Yes
Prefik: ( . )
 
List Menu :
➸ .sticker
➸ .stoimg
➸ .sticker nobg
➸ .tomp3
➸ .math
➸ .quotes
➸ .hidetag
➸ .mute on
➸ .mute off
➸ .ytdl
➸ .play
➸ .tiktok
➸ .owner
➸ .twit-vid (video/gif)
➸ .twitter (image)

Menu Search :
➸ .wiki
➸ .brainly
➸ .whatanime
➸ .randomfact

Random Image :
➸ .waifu
➸ .dal
➸ .archive
➸ .ngnl
➸ .loli
➸ .hololive
➸ .fanart
➸ .uniform
➸ .neko
➸ .arknight
➸ .fate
➸ .azur
➸ .wallpaper
➸ .kona
➸ .art
➸  .kona-4no (18+)

Menu Genshin Imapct :
➸ .build-dps
➸ .build-sub
➸ .build-sup
➸ .gichar
➸ .materigi
➸ .genshin-img

Menu Honkai Impact :
➸ .honkai-img
➸ .er

Running Time: `+secondtime(process.uptime())  
        return teks
    },
  menuBotDemo() {
        let teks = `LIST MENU PREMIUM:
Menu                    
➸ .sticker
➸ .stoimg
➸ .sticker nobg
➸ .owner        
➸ .tomp3
➸ .hidetag
➸ .mute on
➸ .mute off
➸ .ytdl
➸ .play
➸ .tiktok
➸ .quotes
➸ .randomfact
➸ .whatanime
➸ .twitter (image)
➸ .math
➸ .twit-vid (video/gif)

Random Image:
➸ .waifu
➸ .dal
➸ .archive
➸ .loli
➸ .hololive
➸ .maid
➸ .fanart
➸ .uniform
➸ .neko
➸ .honkai
➸ .genshin
➸ .azurlane
➸ .arknight
➸ .wallpaper  
➸ .random
➸ .art
➸ .shota
➸ .trap

Menu Game:
➸ .buildgi
➸ .gichar
➸ .materigi
➸ .er

Ini adalah contoh menu Premium
Silakan Hubungi Owner Kami!!

Running Time: `+secondtime(process.uptime()) 
        return teks
    },
    menuBotFree() {
        let teks = `Hai, Ada yang bisa Saya Bantu?
Premium: No
Prefik: ( . )
 
LIST MENU :                     
➸  .sticker
➸  .stoimg
➸ ~.sticker nobg~       
➸ ~.tomp3~
➸  .hidetag
➸  .ytdl
➸ ~.tiktok~
➸ ~.play~
➸  .quotes
➸  .randomfact
➸ ~.whatanime~
➸  .wiki
➸  .brainly
➸  .math
➸  .owner
➸  .twitter (image)
➸  .twit-vid (video/gif)

Random Image :
➸  .art
➸  .neko
➸  .kona (semua umur)

Menu Genshin Imapct :
➸ .build-dps
➸ .build-sub
➸ .build-sup
➸ .gichar
➸ .materigi
➸ .genshin-img

Menu Honkai Impact :
➸ .honkai-img
➸ .er

Running Time: `+secondtime(process.uptime()) 
        return teks
    },
	sewa() {
        let teks =`Donasi :
pulsa/ovo/Gopay = 083117436733
pulsa/Dana = 085791467642
saweria = saweria.co/mayumi
 
Premium :
15 days = 10k
25 days = 15k
30 days = 20k

Penawaran khusus :
10 days = 5k premium 
10 days = 10k Vip Grup

Vip Grup :
15 days = 15k 
25 days = 20k
30 days = 25k

NOTE:
gratis add bot ke grup 
Kirim bukti transfer ke Owner jika Ingin Vip/Premium

jika ada pertanyaan
Silakan Hubungi Owner Kami!!
Running Time: `+secondtime(process.uptime()) 
        return teks		
	},
	owner() {
        let teks =`Menu Khusus
➸ .waifu
➸ .cosplay
➸ .trap
➸ .dal
➸ .archive
➸ .loli
➸ .hololive
➸ .maid
➸ .fanart
➸ .uniform
➸ .neko
➸ .honkai
➸ .genshin
➸ .azurlane
➸ .arknight
➸ .wallpaper  
➸ .random
➸ .art
➸ .ak
➸ .blue
➸ .yelan
➸ .raiden
➸ .yae
➸ .bronya
➸ .mei
➸ .hutao
➸ .kiana
➸ .fanart
➸ .ft
➸ .noelle
➸ .sd
➸ .ec
➸ .nsfw
➸ .as
➸ .at
➸ .ph
➸ .gi
➸ .ps
➸ .hi
➸ .az
➸ .sw
➸ .bl
➸ .py
➸ .twitter
Running Time: `+secondtime(process.uptime()) 
        return teks			
    },
	 
}