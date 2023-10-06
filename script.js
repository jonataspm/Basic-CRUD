

function GetRegisterItensScreen() {
    document.getElementById("NewItemForm").removeAttribute("hidden");
}

function GetListItensScreen() {

    var attr = document.createAttribute('hidden');
    document.getElementById("NewItemForm").setAttributeNode(attr);
    debugger;
    var jesus

    for(ar in ary)
        jesus += `<tr> <td>${ar.Modelo}<td> </td>${ar.Marca}</td> <td>${ar.Quantidade}</td> </tr>`;

    document.getElementById("Listitem").append(jesus)
}



ary = [];

function AddItem(){
    var form = document.getElementById("myForm");

    itenObj = {
        'Modelo': form.model.value,
        'Marca': form.brand.value,
        'Tipo': form.typeselected.value,
        'Quantidade': form.quantity.value,
        'Codicao': form.condition.value,
        'diferencial': form.diff.valie
    };

    ary.push(itenObj)
    alert("Adicionado")

    return false;
}
