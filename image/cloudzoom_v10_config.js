var xaraSwidgets_cloudZoom_v10Templates = {
	
	entry:		'<a href="{imagebig}" class="cloud-zoom-gallery" title="{title}" rel="useZoom: \'{com_id}zoom1\', smallImage: \'{imagesmall}\' ">'
			+	'<img class="zoom-tiny-image" src="{imagetiny}" alt = "{alt}"/></a>',
	
	main:		'<div class="zoom-section" id="{component_id}OuterDiv">'
			+	'<div class="zoom-small-image">'
			+   '<a href="{firstimage}" class = "cloud-zoom" id="{component_id}zoom1" rel="adjustX: 10, adjustY:-4">'
			+   '<img class="img1" style=" border:none;" src="{firstsimage}" alt="{firstalt}" title="{firsttitle}" /></a>'
			+ 	'</div>'
			+	'<div class="zoom-desc" style="margin-left:0px;">'
			+ 	'{entryhtml}'
			+	'</div></div>'

};

function xsw_cz_htmlbr(str) {
    if (str == undefined)
        return '';
    var lines = str.split("\n");
    for (var t = 0; t < lines.length; t++) {
        lines[t] = $("<p>").text(lines[t]).html();
    }
    return lines.join("<br/>");
}

// this is the constructor for a component
// it loops through each 'entry' in the array of data and compiles the entry template for it
// it then applies the resulting HTML to the main template before writing the whole lot to the div on the page
// it then initialises the actual jquery plugin for the div (that now contains the required HTML as a result of writing the template to it)
function xaraSwidgets_cloudZoom_v10Constructor(divID, data)
{
	var entryHTML = '';
	// loop through each entry in the array and compile the entry template for it
	for(var i=0; i<data.length; i++)
	{
		entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_cloudZoom_v10Templates.entry, data[i]);
	}
	
	// Convert the title text into HTML (encode and replace newlines with BRs)
    title = xsw_cz_htmlbr(data[0].viewertext);
	var com1_id=divID;

	// now lets compile the 'main' template which acts as a wrapper for each entry
	var mainData = {
	    component_id: divID,
	    entryhtml: entryHTML,
	    firstimage: data[0].imagebig,
	    firstsimage: data[0].imagesmall,
	    firstalt: data[0].alt,
	    firsttitle: title,
		com_id:com1_id
	};

	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_cloudZoom_v10Templates.main, mainData);

	// work out the required dimensions for width and height.
	var width = Math.round($('#' + divID).parent('div').width()*0.983);
	var height = Math.round($('#' + divID).parent('div').height()*77.7/100);
	console.log(height);
//	console.log(width); taking into account the border
	var zoomsmallWidth = $('#' + divID).parent('div').width()*4.85/100;
	var zoomsmallheight = $('#' + divID).parent('div').height()*4.85/100;
	console.log(zoomsmallheight)
//	need the value for  the bottom margin

	// now lets apply the resulting HTML for the whole component to the main DIV that was exported by XARA
	$('#' + divID).html(mainTemplate);
	$('#' + divID).find('.zoom-small-image').width(width).css('margin-bottom',zoomsmallWidth);
	$('#' + divID).find('.cloud-zoom-gallery').css('margin-left','1px').css('padding','1px');
	$('#' + divID).find('.zoom-desc').width('100%');
	$('#' + divID).parent('div').css('overflow', 'visible');
	$('#' + divID).find('.img1').width(width).height(height);
	$('.cloud-zoom, .cloud-zoom-gallery').CloudZoom(); // ADDED
}
