
var form = $('#bpmn-form');
form.on('submit', addToDo);

/** Content-Type und evtl. weitere HTTP Header Elemente setzen */
$.ajaxSetup(
{
    headers: 
    {
        'Content-Type': 'application/json',
    }
});

/** Abhandlung submit Button */
function addToDo()
{
    var rnr = $('#rnr');
    var rnrValue = rnr.val();
    if ( rnrValue ) 
    {
    	rbetrag =  $('#rbetrag');
    	rbetragValue = rbetrag.val();
    	text = '{ "variables": { "rnr": {"value": "' + rnrValue + '", "type": "long"}, ' + 
 	              '"rbetrag": {"value": "' + rbetragValue + '", "type": "String"} } }';
        $('<li>')
            .appendTo('#bpmn-list')
            .text( text )
            .append(
                $('<button>')
                    .text('X')
                    .on('click', removeToDo)
            );
        rnr.val( '' );
        rbetrag.val( '' );
        $.post( "https://192.168.60.100:30443/engine-rest/process-definition/key/RechnungStep3/start",
        		text );
    }
}

/** Abhandlung remove (x) Button */
function removeToDo() 
{
    var listItem = this.closest('li');
    listItem.remove();
}
