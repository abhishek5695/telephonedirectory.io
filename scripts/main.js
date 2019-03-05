window.onload = function(){
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var addBookDiv = document.querySelector('.addbook');
	cancelBtn.style.display="none";
	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "block";
		cancelBtn.style.display="block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
		cancelBtn.style.display="none";
	});

	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);

	// Storage Array
	var phoneBook = [];

	

	function jsonStructure(fullname,phone){
		this.fullname = fullname;
		this.phone = phone;
	}

	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='';
		if(isNull){
			// format the input into a valid JSON structure
			var obj = new jsonStructure(fullname.value,phone.value);
			phoneBook.push(obj);
			localStorage['addbook'] = JSON.stringify(phoneBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showPhoneBook();
		}
	}

	function removeEntry(e){

		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			phoneBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(phoneBook);
			showPhoneBook();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showPhoneBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			phoneBook = JSON.parse(localStorage['addbook']);
			addBookDiv.innerHTML = '';
			for(var n in phoneBook){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + phoneBook[n].fullname + '</p></div>';
					str += '<div class="phone"><p>' + phoneBook[n].phone + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showPhoneBook();

}