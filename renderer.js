// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var handlebars = require('handlebars');
const storage = require('electron-json-storage');

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded");
    var defaultThemeColors = [
    	{
    		"color": "white",
    		"background-color": "#ea6d38"
    	},
    	{
    		"color": "white",
    		"background-color": "#21ba45"
    	},
    	{
    		"color": "white",
    		"background-color": "#5691d3"
    	},
    	{
    		"color": "white",
    		"background-color": "#e9b339"
    	},
    	{
    		"color": "white",
    		"background-color": "#e03997"
    	},
    	{
    		"color": "white",
    		"background-color": "##7592c4"
    	},
    	{
    		"color": "white",
    		"background-color":"#00b5ad"
    	},
    	{
    		"color": "white",
    		"background-color": "#85da60"
    	},
    	{
    		"color": "white",
    		"background-color": "#eb71b1"
    	},
    	{
    		"color": "white",
    		"background-color": "#f8d967"
    	},
    	{
    		"color": "white",
    		"background-color": "#f07c3a"
    	},
    	{
    		"color": "white",
    		"background-color": "#8f55c0"
    	},
    	{
    		"color": "white",
    		"background-color": "#4053c3"
    	},
    	{
    		"color": "white",
    		"background-color": "#2f9fea"
    	},
    	{
    		"color": "white",
    		"background-color": "#71d5b9"
    	},
    	{
    		"color": "white",
    		"background-color": "#b33b3a"
    	}
    ];
    var stickyBaseData;
    
    const storageJsonName = "sticky-data";
	storage.get(storageJsonName, function(error, storageData) {
		if(error) {

		}

		if(storageData) {
			stickyBaseData = storageData;
			if(storageData.stickyMapData) {
				stickyBaseData.stickyMapData = new Map(JSON.parse(storageData.stickyMapData));
			}
			else {
				stickyBaseData.stickyMapData = new Map();
			}

			if(stickyBaseData.stickyMapData.size > 0) {
				$('.no-sticky').addClass("hide");
				//var template ='<div class="sticky"></div>';
				stickyBaseData.stickyMapData.forEach(function( obj, key) {
					console.log(key, obj);
			  		var rem = Math.floor(Math.random() * defaultThemeColors.length) + 0;;
			  		var template =`<div class="sticky show" data-id=${key} >
			  								<a href="#" class="sticky-header clearfix">
				  								<img src="static/img/minimize.png" class="minimize-sticky" />
				  								<img src="static/img/maximize.png" class="maximize-sticky" />
				  								<img src="static/img/delete.png" class="delete-sticky" />
			  								</a>
			  								<div class="sticky-content">
			  									${obj.data}
			  								</div>
			  								<div class="sticky-image-list">
			  								</div>
			  								<div class="sticky-footer">
			  									<a class="attach-image">
			  										<label for=file${key} >
			  											<i class="image icon"></i>
			  										</label>
			  										<input type="file" id=file${key} class="image-file-chooser" />
			  									</a>
			  									<a class="drop-sticky">
			  										<i class="trash icon"></i>
			  									</a>
			  								</div>
			  							</div>`;
			  			template = $(template);
			  		template.css(defaultThemeColors[rem]);
					$(".sticky-list").append(template);
				});
			}
			
		}
		else {
			$('.no-sticky').removeClass("hide");
		}
		initEvent();
	});

	function initEvent() {
		$(".sticky-list").on("click", ".sticky", function(event) {
			event.stopPropagation();
			if(event.target.classList[0] != "image-file-chooser") {
				var isFullSticky = $(this).hasClass("full-sticky");
				$(this)
					.siblings(".sticky")
						.removeClass("full-sticky")
						.end()
					.addClass("full-sticky")
					.find(".sticky-content")
					.attr("contenteditable",true);

				// if(isFullSticky) {
				// 	$(this)
				// 		.removeClass("full-sticky")
				// 		.attr("contenteditable",false);

				// }
				// else {
					
				// }
				
				// var data_id = $(this).index();
				// $(this).parents(".sticky-list").addClass("hide");
				
				// var previousText = "";

				// storage.get(storageJsonName, function(error, mainJsonData) {
				//  	console.log("previous data from storage",mainJsonData);
				//  	for(var i=0;i<mainJsonData.stickyArray.length;i++) {
				//  		if(mainJsonData.stickyArray[i].id == data_id) {
				//  			previousText = mainJsonData.stickyArray[i].data;
				//  			$(".sticky-edit")
				//  				.removeClass("hide")
				//  				.attr("data-id", data_id)
				//  				.find(".sticky-edit-content")
				//  				.text(previousText);
				//  			break;
				//  		}
				//  	}
				// });
			
			}
			
		});

		// $(".sticky-edit-back").click(function() {
		// 	var $sticky_edit = $(this).parents(".sticky-edit");
		// 	$sticky_edit.addClass("hide");

		// 	$(".sticky-list").removeClass("hide");
		// 	var data_id = $sticky_edit.attr('data-id');
		// 	var last_text = $(this).parents(".sticky-edit").find(".sticky-edit-content").text();

		// 	var found = false;

		//  	for(var i=0;i<mainJsonData.stickyArray.length;i++) {

		//  		if(mainJsonData.stickyArray[i].id == data_id) {
		//  			found = true;
		//  			mainJsonData.stickyArray[i].data = last_text;
		//  			break;
		//  		}
		//  	}

		//  	if(found === false) {
		//  		mainJsonData.stickyArray.push({ id: data_id, data: last_text });
		//  	}
		 
		//  	storage.set(storageJsonName, mainJsonData, function(error) {
		// 	  if (error) throw error;
		// 	});
		// });
		$(".sticky-option-button").click(function() {
			$('.ui.sidebar').sidebar('toggle');
		});

		$(".sticky-add-button").click(function() {
			var data_id = "id" + Math.random().toString(16).slice(2);

			var rem = Math.floor(Math.random() * defaultThemeColors.length) + 0;
			var template =`<div class="sticky newly-add-sticky" data-id=${data_id} >
  								<a href="#" class="sticky-header clearfix">
	  								<img src="static/img/minimize.png" class="minimize-sticky" />
	  								<img src="static/img/maximize.png" class="maximize-sticky" />
	  								<img src="static/img/delete.png" class="delete-sticky" />
  								</a>
  								<div class="sticky-content">
  								</div>
  								<div class="sticky-footer">
  									<a class="attach-image">
  										<label for=file${data_id} >
  											<i class="image icon"></i>
  										</label>
  										<input type="file" id=file${data_id} class="image-file-chooser" />
  									</a>
  									<a class="drop-sticky">
  										<i class="trash icon"></i>
  									</a>
  								</div>
  							</div>`;
			template = $(template);
			template.css(defaultThemeColors[rem]);
			$(".sticky-list").append(template);
			setTimeout(function() {
			    $(".sticky-list")
			   		.find(".sticky.newly-add-sticky")
			   		.addClass("show")
			   		.removeClass(".newly-add-sticky");
			  }, 10);
			
			$('.no-sticky').addClass("hide");
			
			var obj = {
				id: data_id.toString(),
				data: ''
			};

			saveSticky(data_id, "");
		});

		$(".sticky-list").on("click", ".sticky .minimize-sticky", function (event) {
			event.stopPropagation();
			$(this).parents(".sticky").removeClass("full-sticky");
			var data_id = $(this).parents(".sticky").attr("data-id");
			var currentText = $(this).parents(".sticky").find(".sticky-content").text();
			saveSticky(data_id, currentText);
		});

		// $(".sticky-list").on("focusout", ".sticky.full-sticky", function (event) {
		// 	event.stopPropagation();
		// 	$(this).parents(".sticky").removeClass("full-sticky");
		// 	var currentIndex = $(this).attr("data-id");
		// 	var currentText = $(this).text();
		// 	saveSticky(currentIndex, currentText);
		// });

		$(".sticky-list").on("keyup", ".sticky.full-sticky", function (event) {
			event.stopPropagation();
			$(this).parents(".sticky").removeClass("full-sticky");
			var data_id = $(this).attr("data-id");
			var currentText = $(this).find(".sticky-content").text();
			saveSticky(data_id, currentText);
		});

		$(".sticky-list").on("click", ".sticky .delete-sticky", function (event) {
			event.stopPropagation();
			var $sticky = $(this).parents(".sticky");

			$sticky.removeClass("show");
			var data_id = $sticky.attr("data-id");
			var currentText = $sticky.find(".sticky-content").text();
			setTimeout(function() {
			    $sticky.remove();
			  }, 500);

			deleteSticky(data_id);
		});

		$(".sticky-list").on('change', ".sticky input:file", function(event) {
			event.stopPropagation();
			event.preventDefault();
		});
	}
	function saveSticky(data_id, currentText) {
	 	stickyBaseData.stickyMapData.set(data_id, {id:data_id.toString(), data:currentText});
		
	 	var jsonStickyMapData = JSON.stringify(Array.from(stickyBaseData.stickyMapData.entries()));

		storage.set(storageJsonName, {stickyMapData: jsonStickyMapData}, function(error) {
		  if (error) throw error;
		});

	}
	function deleteSticky(data_id) {
		var isDelete = stickyBaseData.stickyMapData.delete(data_id);
		if(isDelete) {
			var jsonStickyMapData = JSON.stringify(Array.from(stickyBaseData.stickyMapData.entries()));
			storage.set(storageJsonName, {stickyMapData: jsonStickyMapData}, function(error) {
			  if (error) throw error;
			});
		}
		
	}
});