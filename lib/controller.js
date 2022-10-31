const { json } = require('express/lib/response');

exports.main = async () => {
	const { grupo, privado } = require('./modules')
	var { g } = require('./')
	const fs = require('fs')
	const quotesList = JSON.parse(fs.readFileSync("lib/modules/quotes.json", "utf-8"));
	const factList = JSON.parse(fs.readFileSync("lib/modules/fact.json", "utf-8"));
	const mathjs = require("mathjs")
	const { ttdl } = require('./modules/ttdl')
	const genshindb = require('genshin-db')
	const fetch = require("node-fetch")
	const { getBuffer } = require('./functions')
	const { RemoveBgResult, RemoveBgError, removeBackgroundFromImageFile } = require("remove.bg")
	const { TraceMoe } = require("trace.moe.ts")
	const anilist = require('anilist-node')
	const twitterGetUrl = require("twitter-url-direct")

	const x = g.func;
	const body = g.message.body
	if (g.is.cmd && !g.is.isbanned && !g.is.isMute) {
		let parameter = g.func.parameter(body)

		switch (g.cmd.command) {

			//Quotes		
			case "quotes": {
				const quotes = quotesList[Math.floor(Math.random() * quotesList.length)];
				const text = `_"${quotes.quote}"_\n\n - ${quotes.by}`;
				x.reply(text);
				break
			}
			//Fact
			case "randomfact":
			case "fact": {
				const fact = factList[Math.floor(Math.random() * factList.length)];
				const text = `_${fact}_`;
				x.reply(text);
				break
			}

			case "gi-karakter": {
				if (!parameter) return
				const character = await genshindb.characters(parameter)
				if (!character?.name) return x.reply("Karakter Tidak Ditemukan!")
				console.log(character)
				const text = `*Name:* ${character.name}
*FullName:* ${character.fullname}
*Title:* ${character.title}
*Rarity:* ${character.rarity}
*Vision:* ${character.element}
*WeaponType:* ${character.weapontype}
*Sub Stat:* ${character.substat}
*Gender:* ${character.gender}
*Body:* ${character.body}
*Association:* ${character.association}
*Region:* ${character.region}
*Affiliation:* ${character.affiliation}
*Birthday:* ${character.birthday}
*Constellation:* ${character.constellation}
*Description:* ${character.description}`;
				g.func.replyImage(character?.images?.icon, text)
				break
			}

			case "gi-material":
			case "materialgi": {
				if (!g.func.parameter(body)) return x.reply(`Format Salah!\nContoh: *.gi-material ayaka*`);
				try {

					const build = fs.readFileSync(`datamegumi/materialgi/${g.func.parameter(body)}.jpg`)
					x.replyImage(`datamegumi/materialgi/${g.func.parameter(body)}.jpg`)
				} catch (e) {
					g.func.reply(`Karakter Tidak Ditemukan`);
				}
				break
			}

			//Kalkulator
			case "math":
			case "calc":
			case "kalkulator": {
				if (!parameter) {
					x.reply("Gunakan input yang benar!! , contoh _.math 10+10*10/10_")
					break;
				}
				try {
					const text = `*Hasil Dari:*\n${parameter} = ${mathjs.evaluate(parameter)}`
					x.reply(text)
					break;
				} catch {
					x.reply(`Hanya dapat melakukan operasi perkalian (*), pembagian(/), tambah(+) dan kurang(-)\nContoh: .math 10*2+2-1/9`)
				}
				break;
			}
			case "mygi":
				{
					let parameter = g.func.parameter(body)
				if (!parameter) return x.reply("Format Salah! \nContoh: .mygi ID")
        fetch(`https://enka.network/u/${parameter}/__data.json`)
							.then(response => response.json())
					
					console.log(result)
					break
				}

			//Genshin Build
			case "bugi":			
				{
					if (!parameter) return
					try {
						const name = g.func.parameter(body).toLowerCase()
						if (fs.existsSync(`datamegumi/buildgi/DPS/${name}.jpg`)) {
							x.replyImage(`datamegumi/buildgi/DPS/${name}.jpg`)
						} else {
							g.func.reply(`Karakter Tidak Ditemukan`);
						}
					} catch (e) {
						g.func.reply(`Karakter Tidak Ditemukan`);
					}
					break
				}
				case "sub":			
				{
					if (!parameter) return
					try {
						const name = g.func.parameter(body).toLowerCase()
						if (fs.existsSync(`datamegumi/buildgi/sub/${name}.jpg`)) {
							x.replyImage(`datamegumi/buildgi/sub/${name}.jpg`)
						} else {
							g.func.reply(`Karakter Tidak Ditemukan`);
						}
					} catch (e) {
						g.func.reply(`Karakter Tidak Ditemukan`);
					}
					break
				}
				case "sup":			
				{
					if (!parameter) return
					try {
						const name = g.func.parameter(body).toLowerCase()
						if (fs.exists('https://github.com/FortOfFans/FortOfFans.github.io/blob/main/Characters/en-US/')) {
							x.replyImage(`Support/${name}.jpg`)
							console.log(err)
						} else {
							g.func.reply(`Karakter Tidak Ditemukan`);
						}
					} catch (e) {
						g.func.reply(`Karakter Tidak Ditemukan`);
					}
					break
				}
				
			case "play":
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()

					if (!parameter) return x.reply(`Format Salah!\nContoh: *.play Moon Halo - Honkai Impact*`)
					g.func.play(parameter)
					break
				}

			//Youtube Downloader	
			case `ytdl`:
				{
					if (!parameter) return x.reply(`Format Salah!\nContoh: *.ytdl https://youtu.be/xREK6gZxYLQ*`)
					g.func.ytdownload(parameter)
					break
				}

			case "in2208":
				{
					if (!parameter) return

					const build = g.is.body
					const panjang = build.length
					const page = build.slice(panjang - 2, panjang)
					const cmdzr = build.slice(0, panjang - 3)
					const name = build.slice(8, cmdzr.length)

					g.func.zerochan(`${name}`, `${page}`, build)

					break
				}

			//Waifu Random
				case "waifu":
				{
					fetch('https://api.waifu.pics/sfw/waifu')
							.then(response => response.json())
							.then(waifu => {
								if (waifu.url) {
									const link = waifu?.url
									g.func.imageButton(link, "Waifu", body)
								} else {
									x.reply("Ulangi Command!")
								}
							})
          break
				}
			case "waifu18":
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					fetch('https://api.waifu.pics/nsfw/waifu')
							.then(response => response.json())
							.then(waifu => {
								if (waifu.url) {
									const link = waifu?.url
									g.func.imageButton(link, "Eccihh!!!", body)
								} else {
									x.reply("Ulangi Command!")
								}
							})
					break;
				}
			case "wiki":
				{
					let parameter = g.func.parameter(body)
				if (!parameter) return x.reply("Format Salah! \nContoh: .wiki alat kelamin wanita")
					const wiki = require('wikipedia');	
					
	 try {
		 await wiki.setLang('id')
		const searchResults = await wiki.search(parameter)
		console.log(searchResults)
		//Response of type @wikiSearchResult - contains results and optionally a suggestion
		const page = await wiki.page(searchResults.results[0].title);
		 const summary = await page.summary();
		console.log(summary.extract);
		 await g.func.reply(summary.extract)
		//Returns the api url with language changed - use `languages()` method to see a list of available langs
	} catch (error) {
		console.log(error);
		 g.func.reply("Tidak Ada Hasil")
		//=> Typeof wikiError//																		 
	 }
					break
				}
			
				case "boru":
				{
					if (!g.is.owner) return g.func.reply('Owner Only!');
						if (!parameter) return x.reply("Format Salah! \nContoh: .boru genshin_impact")					
					const wifu = await fetch(`https://danbooru.donmai.us/posts.json?tags=${parameter}+`)			
					const waifu = await wifu.json()
					console.log(waifu)
					.then(img => {
				const num = Math.floor(Math.random() * 19) + 1
				const result = []
        if(!img[num].source) {
						 link = img[num]?.file_url
						 sumber = img[num]?.source
						g.func.imageButton(link, '' + sumber, body)
				} else {
						x.reply("Ulangi Lagi")
					}		
					})		
				break;
				}
			case "ig":
					{
				if (!parameter) return x.reply("Format Salah! \nContoh: .ig https://www.instagram.com/p/CFIGV0xgjM9/")
				const instagramGetUrl = require("instagram-url-direct")
 instagramGetUrl(parameter)
.then(async (result) => {
							if (!result?.download) return x.reply("Filtur sedang mengalami maintenance!")
							console.log(result)
							img = result?.download
	            typ = result?.type
							g.func.imageButton(img, 'Source :'+img, body)
						})
						.catch(e => {
							console.log(e)
							x.reply("Terjadi Kesalahan, Ulangi Kembali Nanti \n" + e)
						})
					break
				}
				
			case "lili":
				{
					if (!g.is.owner) return g.func.reply('Owner Only!');
					
				if (!parameter) return x.reply("Format Salah! \nContoh: .lycris alat kelamin wanita")
					const wifu = await fetch(`https://api.xteam.xyz/search/jooxlyrics?q=lathi&APIKEY=47aabacb5270e48d`)
					const result = await wifu.json()
				console.log(result)
					if (result?.result) {
						const link = result?.data					
										 } else {
						x.reply(link)
					}	
				break;
				}
				case "brainly":
	  	{
				if (!g.is.owner) return g.func.reply('Owner Only!');
					let parameter = g.func.parameter(body)
				const { BrainlyAPI, Server } = require('brainly-api');

BrainlyAPI.startWorker({ experimental: true, server: Server.ID }, async brainly => {
  // find question
  console.log(await brainly.findQuestion('Indonesian!!'));
});
			
				break
				}			
				
			case "im":
						{
					 if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					if (!parameter) return
							const tag = ['ecchi', 'lewdanimegirls', 'hentai', 'hentaifemdom', 'hentaiparadise', 'hentai4everyone', 'animearmpits', 'animefeets', 'animethighss', 'animebooty', 'biganimetiddies', 'animebellybutton', 'sideoppai', 'ahegao', 'yuri']
							const randTag = tag[Math.floor(Math.random() * tag.length)]
							const wifu = await fetch(`https://meme-api.herokuapp.com/gimme/${randTag}`)
					const waifu = await wifu.json()
					console.log(waifu)
					if (waifu?.url) {
						const link = waifu?.url
						const sumber = waifu?.postLink
						g.func.imageButton(link, '' + sumber, body)
										 } else {
						x.reply("Ulangi Lagi")
					}	
					break
				}

			case `ark`:
			case `arknights`:
				{
					
					await g.func.zerochan("arknights", 99, body)
					break;
				}
			case `kokomi`:
					 {
						 if (!g.is.owner && !g.is.isPrem) return x.notPremium()
				await g.func.kona("sangonomiya_kokomi", 2, body, 'Kokomi')
						break;
					 }
			case `ak`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					await g.func.kona("arknights", 7, body, 'Arknights')
				break;
				}						
				case `blue`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					await g.func.kona("blue_archive", 1, body, 'Blue Archive')
					break;
				}
					case `py`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					await g.func.kona("pussy", 1, body, 'The Pussy')
					break;
				}
			case `yelan`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('yelan_(genshin_impact)', 2, body, "Yelan")
					break;
				}
				
			case `archive`:
				{
						
					g.func.zerochan('Blue+Archive', 99, body)
					break;
				}
				
				case `raiden`:
				{
						if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('raiden_shogun', 5, body, "Raiden Shogun")
					break;
				}
				case `dan`:
				{
						if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.danbooru('hololive', 5, body)
					break;
				}
				case `yae`:
				{
						if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('yae_miko', 10, body, "Yae Miko")
					break;
				}
			case `bronya`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona("bronya_zaychik", 5, body, 'Bronya Zaychik')
					break;
				}case `mei`:
				{
						if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('raiden_mei', 5, body, "Raiden Mei")
					break;
				}
				case `trap`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					fetch('https://api.waifu.pics/nsfw/trap')
							.then(response => response.json())
							.then(waifu => {
								if (waifu.url) {
									const link = waifu?.url
									g.func.imageButton(link, "Aneh cuk", body)
								} else {
									x.reply("Ulangi Command!")
								}
							})
					break;
				}
			case `hutao`:
				{
				if (!g.is.owner && !g.is.isPrem) return x.notPremium()
				g.func.kona('hu_tao_(genshin_impact)', 4, body, "Hu Tao")
					break;
				}
			case `kiana`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('kiana_kaslana', 5, body, "Kiana Kaslana")
					break;
				}
			case `maid`:
				{
					
					g.func.konachan('maid', 2, body, "Pelayan")
					break;
				}
			case `fanart`:
				{
					{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
						await g.func.konachan("vote%3A3%3Alolzman+order%3Avote", 451, body, 'Fanart')

						return
					}
					await g.func.zerochan3("user/veibkreuz", 45, body)
					break;
				}
				case `fate`:
				{					
					g.func.zerochan('Fate/Grand Order', 1, body)
					break;
				}
				case `ft`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					x.kona('fate_(series)', 1, body, "The Fate Series")
					break;
				}	
				case `noelle`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					x.kona('noelle_(genshin_impact)', 1, body, "Noelle")
					break;
				}
			case `bs`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('boobs', 1, body, "Boobs")
					break;
				}
		
			case `neko`:
				{					
					fetch('https://api.waifu.pics/sfw/neko')
							.then(response => response.json())
							.then(waifu => {
								if (waifu.url) {
									const link = waifu?.url
									g.func.imageButton(link, "Nyan!!", body)
								} else {
									x.reply("Ulangi Command!")
								}
							})
					break;
				}
			   
			case `ec`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.konachan("breasts", 1, body, "Eccih")
					break;
				}
				case `br`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona("breasts", 1, body, "Eccih")
					break;
				}
				case `kona-4no`:
				{	
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('original', 5, body, "4no!!!")
					break;
				}
				case `kona`:
				{					
					g.func.konachan('original', 1, body, "Random Image")
					break;
				}
			case `cg`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('game_cg', 5, body, "hentai")
					break;
				}
			case `hentai`:
				{
					x.replySticker('./bonk.webp')
					break;
				}
				case `art`:
				{
					
					g.func.konachan('original', 1, body)
					break;
				}
				case `hololive`:
				{
					
					x.konachan('hololive', 4, body, "Hololive")
					break;
				}

			case `loli`:
				{
					
					x.konachan('loli', 11, body, "Little Girl")
					break;
				}
				case `as`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					x.kona('ass', 1, body, "ass")
					break;
				}
				case `at`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.zerochan("Armpit", 1, body)
					break;
				}

			case `tol`:
				{
					if (!g.is.owner) return x.reply("Test command hanya untuk Owner!")
					const artist = Math.floor(Math.random() * 4) + 1

					if (artist == 1) return x.danbooru('fue_%28lars0713%29', 2, body)
					if (artist == 2) return x.danbooru('magowasabi+rating%3Asafe', 15, body)
					if (artist == 3) return x.danbooru('magowasabi+rating%3Asafe', 15, body)
					if (artist == 4) return x.danbooru('yoruhoshi_owl+rating%3Asafe', 4, body)

					break;
				}
				case `ph`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('thighhighs', 10, body, "thigh")
					break;
				}
        case `gi`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('genshin_impact', 1, body, "Genshin Impact")
					break;
				}
				case `ps`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona("panties", 3, body, "Panties")	
					break;
				}
				case `hi`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('honkai_impact', 1, body, "Honkai Impact")
					break;
				}
				case `az`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('azur_lane', 1, body, "Azur Lane")
					break;
				}
				case `azur`:
				{
					
					g.func.konachan('azur_lane', 2, body, "Azur Lane")
					break;
				}
				case `wallpaper`:
				{
					
					g.func.konachan('watermelon', 19, body, "wallpaper")
					break;
				}
				
				case `sw`:
				{
						if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					g.func.kona('swimsuit', 8, body, "Swimsuit")
					break;
				}
				case `bl`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
			g.func.kona('blush', 3, body, "Blush") 
					break;
				}
			//whatanime
			case `whatanime`:
				{
					if (!g.is.owner && !g.is.isPrem) return x.notPremium()
					if (!g.is.img) return x.reply("Format Salah! \nKirim screenshot scene anime dengan caption *.whatanime*")
					const path = await x.downloadMedia();
					const api = new TraceMoe();
					await api.fetchAnimeFromBuffer(fs.readFileSync(path)).then(response => {
						const Anilist = new anilist();
						Anilist.media.anime(response.result[1].anilist).then(data => {
							const text = `Romaji: ${data.title.romaji}
English: ${data.title.english}`
							x.reply(text + "\n\n*Note:* _Pastikan menggunakan screenshot asli dari scene anime yang ingin dicari agar mendapatkan hasil yang sesuai_")
						})
					})
					if (fs.existsSync(path)) {
						fs.unlinkSync(path)
					}
					break;
				}



			//sticker	
			case `s`:
			case `sticker`:
			case `stiker`:
				{

					if (!g.is.img && !g.is.gif && !g.is.video) return x.reply("Format Salah! \nKirim gambar atau gif dengan caption *.sticker*")
					if (g.func.parameter(body) == 'nobg') {
						if (!g.is.owner && !g.is.isPrem) return x.reply("Fitur khusus user premium!")
						const path = await x.downloadMedia();
						let teks = "Your Sticker"
						//nobg

						const outputFile = `img(${g.message.sender}).png`;

						const result = await removeBackgroundFromImageFile({
							path: path,
							apiKey: "biDB5KELCbu4f8d7XtvB2pvf",
							size: "regular",
							type: "auto",
							scale: "100%",
							outputFile
						})
						fs.unlinkSync(path)
						x.imagetosticker(outputFile)
						return
					}
					const path = await x.downloadMedia();
					let teks = "Your Sticker"
					if (g.func.parameter(body)) {
						teks = g.func.parameter(body)
					}

					x.imagetosticker(path, teks)

					break;
				}

			case `stikerxxx228`:
				{

					if (!g.is.img && !g.is.gif && !g.is.video) return x.reply("Format Salah! \nKirim gambar atau gif dengan g.func.parameter(body)ion *.sticker*")
					const path = await x.downloadMedia();
					let teks = "Your Sticker"
					if (g.func.parameter(body)) {
						teks = g.func.parameter(body)
					}

					x.imagetosticker2(path, teks)

					break;
				}
			case "tiktok":
			case "tiktokdl":
				{
					if (!parameter) return x.reply("Format Salah! \nContoh: .tiktok https://www.tiktok.com/@kyusako/video/7064913329122250011")
					try {
						const anu = await ttdl(parameter)
						console.log(anu)
						if (anu.nowm) {
							await x.replyVideo(anu.nowm)
						} else {
							await x.reply("Tidak ditemukan!")
						}
					} catch (e) {
						x.reply("Video tidak ditemukan atau link tidak valid!")
					}
					break
				}
				case "twit-vid":
					{
						if (!parameter) return x.reply("Format Salah! \nContoh: .twit-vid (link)")
					twitterGetUrl(parameter)
.then(async (result) => {				
							console.log(result)
							img = result?.download[4].url
							await x.replyVideo(img)
						})
						.catch(e => {
							console.log(e)
							x.reply("Terjadi Kesalahan, Ulangi Kembali Nanti \n" )
						})
								
					break
				}
				case "twitter":
					{
						if (!parameter) return x.reply("Format Salah! \nContoh: .twitter (link)")
					twitterGetUrl(parameter)
.then(async (result) => {
							if (!result?.download) return x.reply("Filtur sedang mengalami maintenance!")
							console.log(result)
							img = result?.download
	            typ = result?.type
							g.func.imageButton(img, 'Source :'+img, body)
						})
						.catch(e => {
							console.log(e)
							x.reply("Terjadi Kesalahan, Ulangi Kembali Nanti \n" + e)
						})				
					break
				}
			//Tiktok Downloader
			
			/*case "dl":
				{
					const { tiktokdl, tiktokdlv2 } require('@bochilteam/scraper')
					if (!parameter) return x.reply("Format Salah! \nContoh: .tiktok https://www.tiktok.com/@kyusako/video/7064913329122250011")
					const { author: { nickname }, video, description } = await tiktokdl(parameter).catch(async _ => await tiktokdlv2(parameter))
					 const url = video.no_watermark_raw || video.no_watermark || video.no_watermark_hd || video.with_watermark
						 if (!url) throw 'Can\'t download video!'						
							await x.replyVideo(url)
						
						.catch(e => {
							console.log(e)
							x.reply("Terjadi Kesalahan, Ulangi Kembali Nanti \n" + e)
						})
					break
				}*/
		}


















	} else {

		if (g.is.body == 'assalamualaikum' || g.is.body == 'Assalamualaikum') {
			x.reply("Wa'alaikumussalam")
		} else if (g.is.body == 'Yume' || g.is.body == 'WDS' || g.is.body == 'bot' || g.is.body == 'Bot') {
			x.reply('Yume-chan Is Aktive Oni-chan!!!')
		} else if (!g.is.group && !g.is.cmd) {
			x.reply('Ketik *.help* Untuk Membuka Menu!')
		}

		const bd = g.is.body.toLowerCase()
		const z = bd.search(/\bhbc\b/)
		const z1 = bd.search(/\buhd\b/)
		const z2 = bd.search(/\bsgd\b/)
		const z3 = bd.search(/\bhdh\b/)
		const z4 = bd.search(/\budt\b/)
		const x3 = bd.search(/\wds\b/)
		const x2 = bd.search(/\bohayo/)
		const x1 = bd.search(/\bbot\b/)


		if (!g.is.isbanned && (z !== -1 || z1 !== -1 || z2 !== -1 || z3 !== -1 || z4 !== -1) && !g.is.group) {
			x.reply("⚠️ Chat telah dilaporkan ke Owner!")
			const report = "*Kata Kasar terdeteksi!*\nJID: " + g.message.sender + "\nChat: _" + body + "_"
			x.report(report)
		} else if (!g.is.isbanned && (z !== -1 || z1 !== -1 || z2 !== -1 || z3 !== -1 || z4 !== -1) && (x2 !== -1 || x1 !== -1)) {
			x.reply("⚠️ Chat telah dilaporkan ke Owner!")
			const report = "*Kata Kasar terdeteksi!*\nJID: " + g.message.sender + "\nGrup ID: " + g.message.from + "\nChat: _" + body + "_"

			x.report(report)
		} else if (!g.is.isbanned && (z !== -1 || z1 !== -1 || z2 !== -1 || z3 !== -1 || z4 !== -1)) {
			x.replySticker('./Angry!.webp')
		} else if (!g.is.isbanned && (x2 !== -1 || x3 !== -1)) {
			x.replySticker('./kiana.webp')
		} else if (bd.search(/\baksal\b/) !== -1) {
			x.replySticker('./Angry!2.webp')
		}
	}
}
