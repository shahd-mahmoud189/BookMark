var siteNameInput = document.querySelector('#siteName');
var siteUrlInput = document.querySelector('#siteUrl');
var submitBtn = document.querySelector('.btn-submit');
var table = document.querySelector('.bookmark-container');
var layer = document.querySelector('.layer');
var closeBtn = document.querySelector('.closeBtn');
var bookmarkList = [];
var nameRegex = /^[a-zA-Z0-9'_][a-zA-Z0-9\s]{1,}[a-zA-Z'_0-9]$/;
var urlRegex = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/;

if(localStorage.getItem('bookmarks') != null){
  bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));
  displayAllBookmarks();
}


function addBookmark(){

  var bookmark = {
    name: siteNameInput.value,
    url: siteUrlInput.value
  };  

  bookmarkList.push(bookmark);

  localStorage.setItem('bookmarks',JSON.stringify(bookmarkList));

  displayLastBookmark(bookmark);

  clearForm();

  removeValidClass(siteNameInput);
  removeValidClass(siteUrlInput);

};

function removeValidClass(input){
  input.classList.remove('valid','is-valid');
}


submitBtn.addEventListener('click',function(){

  if(validate(nameRegex,siteNameInput) && validate(urlRegex,siteUrlInput)){
    addBookmark();
  }
  else{
    layer.classList.replace('d-none','d-block');
  }
});


closeBtn.addEventListener('click',function(){

  layer.classList.replace('d-block','d-none');

})


function displayLastBookmark(bookmark){
  
  var row = `<tr>
                <td>${bookmarkList.length}</td>
                <td>${bookmark.name}</td>
                <td><a href="${bookmark.url}" target="_blank" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</a></td>
                <td><button class="btn btn-delete" onclick="deleteBookmark(${bookmarkList.length-1})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>`;

  table.innerHTML += row;

};


function displayAllBookmarks(){

  var container = '';

  for(var i = 0; i<bookmarkList.length; i++){
    
    container += `<tr>
                    <td>${i+1}</td>
                    <td>${bookmarkList[i].name}</td>
                    <td><a href="${bookmarkList[i].url}" target="_blank" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</a></td>
                    <td><button class="btn btn-delete" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                  </tr>`;

  }
  
  table.innerHTML = container;

};


function clearForm(){

  siteNameInput.value = '';
  siteUrlInput.value = '';

};


function deleteBookmark(index){

  bookmarkList.splice(index,1);

  localStorage.setItem('bookmarks',JSON.stringify(bookmarkList));

  displayAllBookmarks();
  

};


function validate(regex,input){

  var flag;

  if(regex.test(input.value)){

    if(input.classList.contains('invalid')){
      input.classList.replace("invalid","valid");
    }
    else{
      input.classList.add("valid");
    }

    input.classList.add('is-valid');

    if(input.classList.contains('is-invalid')){
      input.classList.remove('is-invalid');
    }
    
    flag = true;
  }

  else{

    if(input.classList.contains('valid')){
      input.classList.replace("valid","invalid");
    }
    else{
      input.classList.add("invalid");
    }

    input.classList.add('is-invalid');

    if(input.classList.contains('is-valid')){
      input.classList.remove('is-valid');
    }

    flag = false;
  }
  return flag;
};


siteNameInput.addEventListener('keyup',function(){

  validate(nameRegex,siteNameInput);

});


siteUrlInput.addEventListener('keyup', function(){

  validate(urlRegex,siteUrlInput);

});


