const tryInsertText = () => {
    const s = 'body, html {}';
    let editor = document.querySelector('#editor');
    console.log(editor);
    setTimeout(() => {
        editAreaLoader.setValue("editor", s);
    }, 3000);
}

const frameInit = () => {
    let frame = document.querySelector("#frame_editor");
    frame.style.width = "100%";
    frame.style.height = "100%";

    let frameDoc = frames['frame_editor'].document;

    frameDoc.querySelectorAll(".area_toolbar").forEach(elem => {
        elem.style.display = "none";
    });
}

const sendMockRequest = async () => {
    let response = await fetch('http://localhost:3030/autocomplete', {
        method: 'POST',
        headers: {
        },
        body: "{\"text\": \"def main()\"}"
    });

    let result = await response.json();
    let suggestions = [];
    console.log(JSON.stringify(result.result));
    result.result.forEach(sug => suggestions.push(sug));
    console.log(suggestions);
}

const init = () => {
    editAreaLoader.init({
        id : "editor", 
        syntax: "python", 
        start_highlight: true, 
        toolbar: "|, select_font, |",
        allow_toggle: false,
    });

    setTimeout(frameInit, 200);

    sendMockRequest();
}

document.addEventListener('DOMContentLoaded', init);
