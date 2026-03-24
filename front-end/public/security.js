document.oncontextmenu = () => {
    alert("Don't try right click")
    return false
}

document.onkeydown = e => {
    if(e.key == "F12") {
        alert("Don't try to inspect element")
        return false
    }

    if(e.ctrlKey && e.key == "u", e.ctrlKey && e.key == "u") {
        alert("Don't try to view page sources")
        return false
    }
    if(e.ctrlKey && e.key == "c") {
        alert("Don't try copy any content")
        return false
    }
    if(e.ctrlKey && e.key == "v") {
        alert("Don't try paste any content")
        return false
    }
    if(e.ctrlKey && e.key == "x") {
        alert("Don't try cut any content")
        return false
    }
}