// https://stackoverflow.com/questions/30232100/get-content-type-of-file-object-using-javascript
// Structure of an mp4 file
// http://atomicparsley.sourceforge.net/mpeg-4files.html

const containers = [];
const AtomType = Object.freeze({
	XTRA: 1484026465,
	DINF: 1684631142,
	DREF: 1685218662,
	EDTS: 1701082227,
	ELST: 1701606260,
	FREE: 1718773093,
	FTYP: 1718909296,
	HDLR: 1751411826,
	IODS: 1768907891,
	MDAT: 1835295092,
	MDHD: 1835296868,
	MDIA: 1835297121,
	META: 1835365473,
	MINF: 1835626086,
	MOOF: 1836019558,
	MOOV: 1836019574,
	MVHD: 1836476516,
	SMHD: 1936549988,
	STBL: 1937007212,
	STCO: 1937007471,
	STSC: 1937011555,
	STSD: 1937011556,
	STSZ: 1937011578,
	STTS: 1937011827,
	TKHD: 1953196132,
	TRAF: 1953653094,
	TRAK: 1953653099,
	TREF: 1953654118,
	UDTA: 1969517665,
	VMHD: 1986881636
});

function bin2hex(s){
	let v, i, f = 0, a = [];
	s += "";
	f = s.length;
	for (i = 0; i < f; i++) {
		a[ i ] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/, "0$1");
	}
	return a.join("");
}


function handleFileSelect(evt){
	const files = evt.target.files;
	for (let i = 0, f; f = files[ i ]; i++) {
		const reader = new FileReader;
		reader.onload = function (theFile){
			return function (e){
				const raw = e.target.result;
				const rawBytes = new Uint8Array(raw);
				const view = new DataView(raw);
				let atom = view.getUint32(4, false);
				atom = new RegExp(atom, "i");
				const size = view.getUint32(4, false);
				const type = String.fromCharCode.apply(null, new Uint8Array(view.buffer, 4 + 4, 4));
				debugger;
				console.log("atom3 => " + atom + "\n");
				for (const key in AtomType) {
					if (AtomType.hasOwnProperty(key)) {
						if (atom.test(AtomType[ key ])) {
							console.log("Found atom of type " + key);
						}
					}
				}
				if (view.getUint32(4) === 1718909296) {
					debugger;
				}
				if (view.getUint32(8) === 1684108136) {
					debugger;
				} else {
					if (view.getUint32(8) === 1836069938) {
						debugger;
					}
				}
				let hex = "";
				for (let cycle = 0; cycle < raw.byteLength; cycle++) {
					hex += rawBytes[ cycle ].toString(16) + " ";
					if (!((cycle + 1) % 8)) {
						hex += "\n";
					}
					console.log(bin2hex(rawBytes[ cycle ]));
				}
				const span = document.createElement("pre");
				span.innerHTML = hex;
				document.getElementById("list").insertBefore(span, null);
			};
		}(f);
		reader.readAsArrayBuffer(f);
	}
}

document.getElementById("files").addEventListener("change", handleFileSelect, false);
