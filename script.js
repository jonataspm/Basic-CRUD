ary = [];

function Televisao(modelo, marca, tipo, Qntd, condicao, diferencial) {
    this.Modelo = modelo;
    this.Marca = marca;
    this.Tipo = tipo;
    this.Quantidade = Qntd;
    this.Codicao = condicao;
    this.Diferencial = diferencial.join(', ');
    this.IsOn = false;

    this.ligar = () => {
        if (this.IsOn == false) {
            alert(this.Modelo + ' foi ligada');
            this.IsOn = true;
        }
        else
            alert(this.Modelo + ' já está ligada');
    }

    this.desligar = () => {
        if (this.IsOn == true) {
            alert(this.Modelo + ' foi desligada');
            this.IsOn = false;
        }
        else
            alert(this.Modelo + ' já está desligada');
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
    button.setAttribute("onclick", "AddItem()");
    button.innerText = 'Cadastrar';

}

function GetListItensScreen() {
    document.getElementById("NewItemForm").hidden = true;
    document.getElementById("ListItens").hidden = false;
    document.getElementById("nit").style.color = 'blue'
    document.getElementById("lit").style.color = 'black'

    document.getElementById("showList").innerHTML = '<tr><th>Modelo</th><th>Marca</th><th>Qtde.</th><th>Actions</th></tr>'

    for (ar in ary) {
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

function AddItem() {
    var form = document.getElementById("form");
    validateFields("add", form);
}

function RemoveObject(value) {
    ary.splice(value, 1);
    GetListItensScreen();
}

function EditObject(value) {
    GetRegisterItensScreen();

    var form = document.getElementById("form");
    form.model.value = ary[value].Modelo;
    form.brand.value = ary[value].Marca;
    form.typeselected.value = ary[value].Tipo;
    form.quantity.value = ary[value].Quantidade;
    form.condition.value = ary[value].Codicao;

    document.querySelectorAll('input[name="diff"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    ary[value].Diferencial.split(', ').forEach(diff => {
        document.querySelector(`input[name="diff"][value="${diff}"]`).checked = true;
    });

    document.getElementById('title-form').innerText = 'Alterar Item'

    var button = document.getElementById("btn-form");
    button.setAttribute("onclick", `GetEditObject(${value})`);
    button.innerText = 'Editar';

}

function GetEditObject(value) {
    var form = document.getElementById("form");
    validateFields("edit", form, value);
}

function TestObject(value) {
    document.getElementById('test').style.display = 'block';
    document.getElementById('title-test').innerHTML = `<p> Controle Remoto </p><p> ${ary[value].Modelo} </p>`;
    document.getElementById('functiones').innerHTML = `<button onclick='Ligar(${value})'>Ligar</button> <button onclick='Desligar(${value})'>Desligar</button>`
}
function TestCloseObject(value) {
    document.getElementById('test').style.display = 'none';
}

function Ligar(value) {
    ary[value].ligar();
}
function Desligar(value) {
    ary[value].desligar();
}


function validateFields(context = "add", form, value = null) {
    const fields = document.querySelectorAll('.field');
    const radioButtons = document.querySelectorAll('[name="condition"]');
    const differentialCheckboxes = document.querySelectorAll('input[name="diff"]');
    const typeSelected = document.querySelector('select[name="typeselected"]');

    let allFilled = true;

    fields.forEach(field => {
        field.style.border = "";
        if (!field.value.trim()) {
            field.style.border = "1px solid red";
            allFilled = false;
        }
    });

    if (radioButtons) {
        const isSelected = [...radioButtons].some(radio => radio.checked);
        if (!isSelected) {
            allFilled = false;
            radioButtons.forEach(radio => {
                const label = document.querySelector(`label[for="${radio.id}"]`);
                if (label) label.style.color = "red";
            });
        } else {
            radioButtons.forEach(radio => {
                const label = document.querySelector(`label[for="${radio.id}"]`);
                if (label) label.style.color = "";
            });
        }
    }

    const differentialSelected = [...differentialCheckboxes].some(checkbox => checkbox.checked);
    if (!differentialSelected) {
        allFilled = false;
        differentialCheckboxes.forEach(checkbox => {
            const label = document.querySelector(`label[for="${checkbox.id}"]`);
            if (label) label.style.color = "red";
        });
    } else {
        differentialCheckboxes.forEach(checkbox => {
            const label = document.querySelector(`label[for="${checkbox.id}"]`);
            if (label) label.style.color = "";
        });
    }

    if (!typeSelected.value || typeSelected.value === "--Selection opcao--") {
        allFilled = false;
        typeSelected.style.border = "1px solid red";
    } else {
        typeSelected.style.border = "";
    }

    let selectedDifferentials = [];
    differentialCheckboxes.forEach(checkbox => {
        if (checkbox.checked) selectedDifferentials.push(checkbox.value);
    });

    if (!allFilled) {
        alert("Todos os campos e seleções precisam ser preenchidos!");
        return false;
    }
    else if (context === "add" && allFilled) {
        ary.push(new Televisao(form.model.value, form.brand.value, form.typeselected.value, form.quantity.value, form.condition.value, selectedDifferentials))
        alert("Adicionado");
        form.reset();
    }
    else if (context === "edit" && allFilled) {
        ary[value] = new Televisao(form.model.value, form.brand.value, form.typeselected.value, form.quantity.value, form.condition.value, selectedDifferentials);
        alert("Editado");
        GetListItensScreen();
    }
    return true;
}