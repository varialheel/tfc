// aqui tenemos funciones para creacion de elementos (p,img,tr...)
const createP = (classes = "", id = "") => {
    let p = document.createElement("p");
    p.innerText = text;
    if (classes != "") {
        p.classList.add(...classes)
    }
    if (id != "") {
        p.setAttribute("id", id)
    }
    return p;
}
const createDiv = (classes = "", id = "") => {
    let div = document.createElement("div");
    if (classes != "") {
        div.classList.add(...classes)
    }
    if (id != "") {
        div.setAttribute("id", id)
    }
    return div;
}
const createTr = (classes = "", id = "") => {
    let tr = document.createElement("tr");
    if (classes != "") {
        tr.classList.add(...classes)
    }
    if (id != "") {
        tr.setAttribute("id", id)
    }
    return tr;
}
const createTd = (text = "", classes = "", id = "") => {
    let td = document.createElement("td");
    td.innerText = text;
    if (classes != "") {
        td.classList.add(...classes)
    }
    if (id != "") {
        td.setAttribute("id", id)
    }
    return td;
}
const createButton = (text, classes = "", id = "") => {
    let button = document.createElement("button");
    button.innerText = text;
    if (classes != "") {
        button.classList.add(...classes)
    }
    if (id != "") {
        button.setAttribute("id", id)
    }
    return button;
}
const createA = (text, url , classes = "", id = "") => {
    let a = document.createElement("a");
    a.innerText = text;
    if (classes != "") {
        a.classList.add(...classes)
    }
    if (id != "") {
        a.setAttribute("id", id)
    }
    a.setAttribute("href", url)
    return a;
}
const createOption = (text, value , classes = "", id = "") => {
    let option = document.createElement("option");
    option.innerText = text;
    if (classes != "") {
        option.classList.add(...classes)
    }
    if (id != "") {
        option.setAttribute("id", id)
    }
    option.setAttribute("value", value)
    return option;
}
const createImg = (src, alt, classes = "", id = "") => {
    let img = document.createElement("img");
    if (classes != "") {
        img.classList.add(...classes)
    }
    if (id != "") {
        img.setAttribute("id", id)
    }
    img.setAttribute("src", src)
    img.setAttribute("alt", alt)
    return img;
}
const createTable = (classes = "", id = "") => {
    let table = document.createElement("table");
    if (classes != "") {
        table.classList.add(...classes)
    }
    if (id != "") {
        table.setAttribute("id", id)
    }
    return table;
}