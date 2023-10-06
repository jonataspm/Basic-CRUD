ary = [];

function Televisao(modelo, marca, tipo, Qntd, condicao, diferencial){
    this.Modelo = modelo;
    this.Marca = marca;
    this.Tipo =  tipo;
    this.Quantidade =  Qntd;
    this.Codicao =  condicao;
    this.diferencial =  diferencial;
}


function GetRegisterItensScreen() {
    document.getElementById("NewItemForm").hidden = false;
    document.getElementById("ListItens").hidden = true;
}

function GetListItensScreen() {
    document.getElementById("NewItemForm").hidden = true;
    document.getElementById("ListItens").hidden = false;

    document.getElementById("showList").innerHTML = '<tr><th>Modelo</th><th>Marca</th><th>Qntd.</th><th>Actions</th></tr>'

    for(ar in ary)
        document.getElementById("showList").innerHTML += `<tr> <td>${ary[ar].Modelo}</td> <td>${ary[ar].Marca}</td> <td>${ary[ar].Quantidade}</td> <td><button>Edit</button><button>Test</button><button>Remove</button></td> </tr>`;
}

function AddItem(){
    var form = document.getElementById("myForm");

    ary.push(new Televisao(form.model.value, form.brand.value, form.typeselected.value, form.quantity.value, form.condition.value, form.diff.valie))
    alert("Adicionado")
}
