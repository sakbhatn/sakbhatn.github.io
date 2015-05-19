function displayForm() {
	var email;
	var detail;

	for (var i = 0; i < localStorage.length; i++){
		email = localStorage.key(i);
		detail = JSON.parse(localStorage.getItem(email));
		createRow(email,detail.name, detail.mobile, detail.password, detail.dob);
	}
	
}

function createRow(email, name, mobile, passwd, dob) {
	var tableRef = document.getElementById("mytable").getElementsByTagName('tbody')[0];
	
    var row = tableRef.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3)
	var cell5 = row.insertCell(4);	
	var cell6 = row.insertCell(5);	
	cell1.innerHTML = tableRef.rows.length;
    cell2.innerHTML = email;
    cell3.innerHTML = name;
	cell4.innerHTML = mobile;
	cell5.innerHTML = passwd;
	cell6.innerHTML = dob;
}

function clearSearchText() {
	var tbody = document.getElementById("mytable").getElementsByTagName('tbody')[0];
	var rows = tbody.rows, rlen = rows.length, i;
	for(i = 0; i < rlen; i++){
		rows[i].style.backgroundColor = "";
	}	
}

function searchText() {
	clearSearchText();
	var searchText = document.getElementById("srch").value.toLowerCase();
	var found = 0;
	if (searchText == "") {
		alert("Please enter a valid search text");
	}
	else {
		var tbody = document.getElementById("mytable").getElementsByTagName('tbody')[0];
		var rows = tbody.rows, rlen = rows.length, i, j, cells, clen;
		for(i = 0; i < rlen; i++){
			cells = rows[i].cells;
			clen = cells.length;
			for(j = 0; j < clen; j++){
				var str = cells[j].innerHTML.toLowerCase();
				if(str.includes(searchText)) {
					found++;
					rows[i].style.backgroundColor = "#a3d9fe";
				}
			}
		}	
		if(!found) {
			alert("Text not found, try another search term.");
		} 
		document.getElementById("srch").value = "";
	}
	return false;
}


function sortHandler(col, asc) {
	var users = document.getElementById("users");
	sort_table(users, col, asc);
	setSortColumn(col);
}

function setSortColumn(col) {
	var rows = document.getElementById("cols").rows;
	var cells = rows[0].cells;
	for(i=0; i<cells.length;i++){
		if(i==col) {
			cells[i].className = "priority";
		} else {
			cells[i].className = "noselect";
		}
	}
}

function sort_table(tbody, col, asc){
    var rows = tbody.rows, rlen = rows.length, arr = new Array(), i, j, cells, clen;
    // fill the array with values from the table
    for(i = 0; i < rlen; i++){
    cells = rows[i].cells;
    clen = cells.length;
    arr[i] = new Array();
        for(j = 0; j < clen; j++){
        arr[i][j] = cells[j].innerHTML;
        }
    }
    // sort the array by the specified column number (col) and order (asc)
    arr.sort(function(a, b){
        return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1*asc);
    });
    for(i = 0; i < rlen; i++){
        arr[i] = "<td>"+arr[i].join("</td><td>")+"</td>";
    }
    tbody.innerHTML = "<tr>"+arr.join("</tr><tr>")+"</tr>";
}