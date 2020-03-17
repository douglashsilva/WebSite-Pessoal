class App {

    constructor(){
        this.cdn = "http://cdn.douglashsilva.com.br"
        this.appendCertificates()
    }

    async getCertificates(){
        const certificates = await fetch("assets/data/certificates.json")
        return certificates.map((certificate) => {
            return {
                name: certificate.name,
                src: `${this.cdn}/assets/certificates/${certificate.filename}`
            }
        })
    }

    async makeCertificates(){
        const certificates = await this.getCertificates()
        return certificates.map((certificate, index) => {
            let box = document.createElement("div"), img = document.createElement("img")
            img.setAttribute("src", certificate.src)
            img.setAttribute("alt", certificate.name)
            img.setAttribute("id", "certificate-00000" + index)
            box.appendChild(img)
            box.setAttribute("title", certificate.name)
            box.setAttribute("onclick", "app.openCertificate(this)")
            box.style.cursor = "pointer"
            return box.outerHTML
        }).join("")
    }

    openCertificate(certificate){
        const body = document.createElement("body")
        const img = document.createElement("img")
        const dom = window.open("","_blank")
        body.setAttribute("onselectstart","return false")
        body.setAttribute("oncontextmenu","return false")
        body.setAttribute("ondragstart","return false")
        body.style.overflow = "hidden"
        body.style.backgroundColor = "rgba(239, 249, 250, 0.6)"
        body.style.display = "flex"
        body.style.justifyContent = "center"
        body.style.alignItems = "center"
        img.style.maxWidth = window.innerWidth >= 600 ? "70%" : "90%"
        img.src = certificate.querySelector("img").getAttribute("src")
        body.appendChild(img)
        dom.document.write(body.outerHTML)
        dom.document.close()  
    }

    async appendCertificates(){
        const certificates = await this.makeCertificates()
        const content = document.querySelector("div#tab-content-certificates > section")
        content.innerHTML = certificates
    }

}

const app = new App()