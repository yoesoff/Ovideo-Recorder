//  Buat nama file pakai date. 
function createTime() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+'_'+time;
}

function toArray(list) {
    return Array.prototype.slice.call(list || [], 0);
}

// Error handling lari kesini.
function errorHandler(fs) {
    var msg = 'Error: ' + fs.name;
    console.log(msg);

    alert(msg);
}