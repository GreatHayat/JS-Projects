document.getElementById('myform').addEventListener('submit' , saveBookmark);
function saveBookmark(e){
    var sitename = document.getElementById('siteName').value;
    var urlname = document.getElementById('urlName').value;
    if(sitename == '' || urlname == ''){
        alert("Please Fill the Fields Correctly!");
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!urlname.match(regex)){
        document.getElementById('error').style.display = "block";
        setTimeout(function(){
            document.getElementById('error').remove();
        }, 6000);
        
    document.getElementById('siteName').value = '';
    document.getElementById('urlName').value = '';
        return false;
    }
    var bookmark = {
        name : sitename,
        url : urlname
    }
    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
    }
    else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    document.getElementById('siteName').value = '';
    document.getElementById('urlName').value = '';
    fetchBookmark();
    e.preventDefault();
}
function deletebookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            if(confirm("Are you sure, You want to delete this Site?")){
                bookmarks.splice(i , 1);
            }
            //bookmarks.splice(i , 1);
        }
    }
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
    fetchBookmark();
}
function fetchBookmark(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksresult = document.getElementById('bookmarksresult');
    bookmarksresult.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksresult.innerHTML += '<div class="alert alert-info"> ' +
                                '<h3 style="margin-top: 0px;"> '+ name + '</h3>' +
                                '<a class="btn btn-info" target="_blank" href="'+url+'">Visit</a> ' +
                                '<button onclick ="deletebookmark(\''+url+'\')" class="btn btn-danger">Delete</button> ' +
                                '</div>';

    }
}