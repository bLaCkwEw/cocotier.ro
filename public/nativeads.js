function hide() {
	const note = document.getElementById("ad-note");
	if (note) {
		note.style.display = "none";
		note.id = "ad-note-hidden";
	}
	document.cookie = "notice-shown=true;path=/;max-age=31536000";
}

if (!document.cookie.split(";").some((c) => c.trim() === "notice-shown=true")) {
	const note = document.getElementById("ad-note-hidden");
	if (note) {
		note.style.display = "block";
		note.id = "ad-note";
		note.querySelector("p.ad-note-close").addEventListener("click", hide);
	}
}
