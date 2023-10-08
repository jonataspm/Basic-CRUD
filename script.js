ary = [];

function Televisao(modelo, marca, tipo, Qntd, condicao, diferencial){
    this.Modelo = modelo;
    this.Marca = marca;
    this.Tipo =  tipo;
    this.Quantidade =  Qntd;
    this.Codicao =  condicao;
    this.Diferencial =  diferencial;

    function ligar(){
        console.log(this.Modelo + ' está ligada')
    }

    function Desligar(){
        console.log(this.Modelo + ' está desligada')
    }
}


function GetRegisterItensScreen() {
    document.getElementById("NewItemForm").hidden = false;
    document.getElementById("ListItens").hidden = true;
    document.getElementById("nit").style.color = 'black' 
    document.getElementById("lit").style.color = 'blue' 
    document.getElementById("form").reset();
    document.getElementById('title-form').innerText = 'Cadastrar Item'

    var button = document.getElementById("btn-form");
    button.setAttribute("onclick","AddItem()");
    button.innerText = 'Cadastrar';

}

function GetListItensScreen() {
    document.getElementById("NewItemForm").hidden = true;
    document.getElementById("ListItens").hidden = false;
    document.getElementById("nit").style.color = 'blue' 
    document.getElementById("lit").style.color = 'black' 

    document.getElementById("showList").innerHTML = '<tr><th>Modelo</th><th>Marca</th><th>Qtde.</th><th>Actions</th></tr>'

    for(ar in ary){
        document.getElementById("showList").innerHTML += 
        `<tr>
            <td>
                ${ary[ar].Modelo}
            </td> 
            <td>
                ${ary[ar].Marca}
            </td> 
            <td>
                ${ary[ar].Quantidade}
            </td> 
            <td>
                <span class="material-symbols-outlined icns" onclick="EditObject(${ar})">edit</span>
                <span class="material-symbols-outlined icns" onclick="TestObject(${ar})">inventory</span>
                <span class="material-symbols-outlined icns" onclick="RemoveObject(${ar})">delete</span>
            </td> 
        </tr>`;

    }
}

function AddItem(){
    var form = document.getElementById("form");

    ary.push(new Televisao(form.model.value, form.brand.value, form.typeselected.value, form.quantity.value, form.condition.value, form.diff.value))
    alert("Adicionado")
    form.reset()
}



function RemoveObject(value){
    ary.splice(value, 1);
    GetListItensScreen();
}
function EditObject(value){
    GetRegisterItensScreen();
    
    var form = document.getElementById("form");
    form.model.value = ary[value].Modelo;
    form.brand.value = ary[value].Marca;
    form.typeselected.value = ary[value].Tipo;
    form.quantity.value = ary[value].Quantidade;
    form.condition.value = ary[value].Codicao;
    form.diff.value = ary[value].Diferencial;

    document.getElementById('title-form').innerText = 'Alterar Item'
    
    var button = document.getElementById("btn-form");
    button.setAttribute("onclick",`GetEditObject(${value})`);
    button.innerText = 'Editar';
    
}

function GetEditObject(value){
    var form = document.getElementById("form");
    ary[value] = new Televisao(form.model.value, form.brand.value, form.typeselected.value, form.quantity.value, form.condition.value, form.diff.value);
    alert("Alterado");
    GetListItensScreen();
}

function TestObject(value){
    document.getElementById('test').style.display = 'block';
    document.getElementById('title-test').innerHTML = ary[value].Modelo + ' - ' + ary[value].Marca;    
}
function TestCloseObject(value){
    document.getElementById('test').style.display = 'none';
}






