const info=document.querySelector(".infoOperacion");
var numeros=[];
var operador=[];
//Botones
document.querySelectorAll(".boton").forEach(btn=>{
    btn.addEventListener(
        "click",
        (e)=>{
                if(!e.target.classList.contains("borrar")){
                    info.value+=e.target.textContent;
                    if(e.target.classList.contains("operador") || e.target.classList.contains("igualOperador")){
                        numeros.push(parseInt(info.value));
                        info.value="";
                        operador.push(e.target.textContent);
                    }
                    if(e.target.classList.contains("igualOperador") && numeros.length==2){
                        info.value=calcular();
                        numeros=[];
                        operador=[];
                    }
                    if(numeros.length==1){
                        disableOperadores();
                        enableIgual();
                    }
                    else{
                        disableIgual();
                        enableOperadores();
                    }
                }else{
                    info.value=info.value.substring(0,info.value.length-1);
                }
        },
        false
    )
});

//Teclado
addEventListener(
    "keydown",
    (e)=>{
        if(numeros.length>2){
            numeros=[];
            operador=[];
        }
        let keypress=e.key;
        let numKeypress=parseInt(e.key);
            if(keypress!="Backspace"){
                if((numKeypress>=0 && numKeypress<10)|| keypress=="Enter" || keypress=="/" || keypress=="*" || keypress=="-" || keypress=="+"){
                    info.value+=`${keypress}`;
                    if(keypress=="Enter" || keypress=="/" || keypress=="*" || keypress=="-" || keypress=="+"){
                        numeros.push(parseInt(info.value));
                        info.value="";
                        operador.push(e.key);
                    }
                    if(keypress=="Enter" && numeros.length==2){
                        info.value=calcular();
                        numeros=[];
                        operador=[];
                    }
                    if(numeros.length==1){
                        disableOperadores();
                        enableIgual();
                    }
                    else{
                        disableIgual();
                        enableOperadores();
                    }
                }
            }else{
                info.value=info.value.substring(0,info.value.length-1);
            }
    },
    false
)
//
document.querySelector(".reiniciar").addEventListener(
    "click",
    ()=>{
        numeros=[];
        operador=[];
        info.value="";
    }
)
function disableIgual(){
    document.querySelectorAll(".igualOperador").forEach(ig=>{
        ig.classList.remove("igualOperador");
        ig.classList.add("igualDisabled");
    });
}
function disableOperadores(){
    document.querySelectorAll(".operador").forEach(ope=>{
        ope.classList.remove("operador");
        ope.classList.add("disabled");
    });
}
function enableIgual(){
    document.querySelectorAll(".igualDisabled").forEach(ig=>{
        ig.classList.add("igualOperador");
        ig.classList.remove("igualDisabled");
    });
}
function enableOperadores(){
    document.querySelectorAll(".disabled").forEach(ope=>{
        ope.classList.add("operador");
        ope.classList.remove("disabled");
    });
}
function calcular(){
    switch (operador[0]) {
        case "+":
            return sumar(numeros[0],numeros[1]);
        case "-":
            return restar(numeros[0],numeros[1]);
        case "*":
            return multiplicar(numeros[0],numeros[1]);
        case "/":
            return dividir(numeros[0],numeros[1]);
    }
}
function sumar(n1,n2){
    return n1+n2;
}
function restar(n1,n2){
    return n1-n2;
}
function multiplicar(n1,n2) {
    return n1*n2;
}
function dividir(n1,n2){
    return n1/n2;
}