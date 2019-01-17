class App {

    constructor(){
        this.insertCertificates();
    }

    getCertificates(){
        return new Promise((resolve,reject) => {
            fetch("assets/data/certificates.json")
            .then((data) => data.json())
            .then((data) => {
                const certificates = [];
                for(let i = 0, length = data.length; i < length; i++){
                    let certificate = null;
                    const box = document.createElement("div"), img = document.createElement("img");
                    img.setAttribute("src", "https://lh3.googleusercontent.com/" + data[i].id);
                    img.setAttribute("alt", data[i].name);
                    img.setAttribute("id", "certificate-" + data[i].number);
                    box.appendChild(img);
                    box.setAttribute("title", data[i].name);
                    box.setAttribute("onclick", "app.openCertificate(this)");
                    box.style.cursor = "pointer";
                    certificate = box.outerHTML;
                    certificates.push(certificate);
                }
                resolve(certificates.join(""));
            }).catch((error) => console.error(error));
        }); 
    }

    openCertificate(certificate){
        const body = document.createElement("body");
        const img = document.createElement("img");
        const dom = window.open("","_blank");
        body.setAttribute("onselectstart","return false");
        body.setAttribute("oncontextmenu","return false");
        body.setAttribute("ondragstart","return false");
        body.style.overflow = "hidden";
        body.style.backgroundColor = "rgba(239, 249, 250, 0.6)";
        body.style.display = "flex";
        body.style.justifyContent = "center";
        body.style.alignItems = "center";
        img.style.maxWidth = window.innerWidth >= 600 ? "70%" : "90%";
        img.src = certificate.querySelector("img").getAttribute("src");
        body.appendChild(img);
        dom.document.write(body.outerHTML);
        dom.document.close();  
    }

    insertCertificates(){
        this.getCertificates()
        .then((data) => {
            const content = document.querySelector("div#tab-content-certificates > section");
            content.innerHTML = data;
        });
    }

}

const app = new App();