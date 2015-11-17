//keep track of an ajax request as a global variable so it can be aborted if necessary



	
	// added! Otherwise, send an error message.

	

	function countryShowData(country, changeVariable) {
 
        //variable to change, in this case: "body", could be "svg"

	    var topData = [] 
	    var count = 0;
	    var countSafe = 0
		var firstName = country;
		var currentCountry = firstName;
		var countryRep = firstName.split(' ').join('+');
		var ownerId = "";
		var songId = "";

        spotifyVazio = ["Bolivia", "Bulgaria", "Chile", "Colombia", "Costa Rica", "Cyprus", "Czech", "Dominican Republic", "Ecuador", "El Salvador", "Guatemala", "Honduras", "Hungary", "Malta", "Nicaragua", "Panama", "Paraguay", "Slovakia", "Taiwan", "Uruguay"];
        
		if (spotifyVazio.indexOf(countryRep) != -1){
            query = "https://api.spotify.com/v1/search?q="+countryRep+"&type=playlist";
        } else{
        	query = "https://api.spotify.com/v1/search?q=Top+tracks+"+countryRep+"&type=playlist";
        } 

       
      

		$.ajax({

            url: query,
            method: "GET",
			dataType: "json", 
			async: false,// Spotify's API returns large JSON objects because those are easier to parse through
			success: function(data) {

			console.log(data.playlists.items[0].owner.id);
			console.log(data.playlists.items[0].id);
			ownerId = data.playlists.items[0].owner.id;
			songId = data.playlists.items[0].id;

			$(changeVariable).append("<div id='playlistDiv'>  </div>");
			$("#playlistDiv").append("<iframe src='' id='playlist'> </iframe>");

			$(changeVariable).append("<div id='albumDiv'>  </div>");
			$("#albumDiv").append("<img src='' id='album'> </img>");

			str = 'https://embed.spotify.com/?uri='+data.playlists.items[0].uri;
			$("#playlist").attr('src', str);

			$("#album").attr('src', data.playlists.items[0].images[0].url);

			displayalbums(ownerId,songId, countryRep);

			console.log(currentCountry);

			},
			error: function(error) {
				console.log(error);
			}

		});

/*
var tracks;

var accessToken = 'BQBO_Lffw7uy6KDo1gAtmUOfCvZYQJ5ySReICRM-Fe0LqR3Yw-4fNgC1a_OawQuepiPvgmcnIDb-GqKNI66T2Vlb4WNkUhu2fyvoa3qMKm0qR1mhhzsybt2gYxXzv0YbeMgXzK84pn3zLLt2';

$.ajax({
	url: 'https://api.spotify.com/v1/users/'+ownerId+'/playlists/'+songId+'/tracks?limit=10',
	headers: {
	   'Authorization': 'Bearer ' + accessToken
	},
	success: function(response) {
	   //console.log(response);
	   tracks = response;
	   var songs = tracks.items;
	   for (i = 0; i < songs.length; i++) { 
			var albumaddress = tracks.items[i].track.album.images[1].url;
			var size = 90+ 6*(11 - i);
			$('body')
			.append("<div class='c"+i+"''><img src='"+albumaddress+"'width = '"+size+"' height= '"+size+"'</img></div>");
		}
	}
});

*/

}

//countryShowData("USA");





//function to display albums!
function displayalbums(uID,pID, countryR) {
    var margin = 30,
    w = 550 - margin * 2,
    h = w,
    radius = w / 2,
    strokeWidth = 4,
    hyp2 = Math.pow(radius, 2),
    nodeBaseRad = 30;


function randomNodes(n) {
    var data = [],
        range = d3.range(n);

    for (var i = 0; i <= range.length - 1; i++) {
        data.push({
            rad: Math.floor(100 - (i * 7))
        });
    }
    return data;
}

var nodeData = randomNodes(10);

var force = d3.layout.force()
    .charge(-350)
    .gravity(0.05)
    .nodes(nodeData)
    .size([width/2, height/2]);



var tracks;
var imgurls = [];

var accessToken = 'BQBh00FJwBXTcOqFs_eplKVNCZBT9JV64Vf_lWYzdMI4gMkShHTJ-EWJGUgeJ2UpChwkyW7GC4PoASWMScyXCrnGHfBtyruBCmUwT6Z1usXTv3X-SaDLr01CbT6eV2aeCLAlgbrI7ZQyssP9IR-Bt6dvtA4';


$.ajax({
        url: 'https://api.spotify.com/v1/search?query='+countryR+'&offset=0&limit=10&type=track',
        method: "GET",
		dataType: "json", 
			
        success: function(response) {
           //console.log(response);
           tracks = response.tracks;
           var songs = tracks.items;
           console.log(songs);
           console.log(tracks);
           for (i = 0; i < songs.length; i++) { 
                var albumaddress = tracks.items[i].album.images[1].url;
                imgurls.push(albumaddress);
            }
            drawNodes();
            albumarray = imgurls;
            console.log(imgurls);
            allAlbums.push({imgurls});
        }
    });

function drawNodes() {
	var nodes = svg.selectAll('.nodes')
	    .data(nodeData)
	.enter().append("svg:image")
	    //.attr("id", "circle")
	    .attr("xlink:href", function (d, i){
	            return imgurls[i];
	        })
	    .attr({
	        class: 'nodes',
	        width: function (d) { return d.rad + nodeBaseRad; },
	        height: function (d) { return d.rad + nodeBaseRad; },
	        //width: 100,
	        //height: 100,
	        r: function (d) { return d.rad + nodeBaseRad; }
	    })


	function tick() {
	    nodes.attr('x', function (d) { return d.x+width/5-15  })
	        .attr('y', function (d) { return d.y+100+height/15-20 });
	}

	force.on('tick', tick)
	    .start();

	//nodes.call(force.drag);
	return imgurls;
}

}






