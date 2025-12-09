
document.getElementById("navbar").style.width = "70px"
home.style.display = "none"
reg.style.display = "none"
add.style.display = "none"
agenda.style.display = "none"

function sidebarFunction() {
    c = 0;
    if (c == 1) {
        document.getElementById("navbar").style.gridTemplateColumns = "5% 90%"
        document.getElementById("main").style.marginLeft = "50px";

        home.style.display = "none"
        reg.style.display = "none"
        add.style.display = "none"
        agenda.style.display = "none"
        c-1
        console.log("if 1",c)
    }
    if (c == 0) {
        document.getElementById("containerGeral").style.gridTemplateColumns = "15% 80%"
        home.style.display = ""
        reg.style.display = ""
        add.style.display = ""
        agenda.style.display = ""
        c++
        console.log("if 0",c)
    }


}
