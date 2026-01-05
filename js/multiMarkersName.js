//Multi Markers WebAR-AR.js and Aframe - Playing the Archive - Connected Environment CASA-UCL

//Global Variable
var markersURLArray=[];
var markersNameArray=[];

AFRAME.registerComponent('markers_start',{
	init:function(){
		console.log('Add markers to the scene');

		var sceneEl = document.querySelector('a-scene');
		
		//list of the markers
		// for(var i=1; i<19; i++)
		// {
		// 	var url="resources/markers/pattern-Individual_Blocks-"+i+".patt";
		// 	markersURLArray.push(url);
		// 	markersNameArray.push('Marker_'+i);
		// 	//console.log(url);
		// }

		// Single marker setup
		// markersURLArray.push("resources/markers/target.patt");
		markersURLArray.push("resources/markers/pattern-microqr.patt");
		markersNameArray.push("D5-A2");

		for(var k=0; k<1; k++)
		{
			var markerEl = document.createElement('a-marker');
			markerEl.setAttribute('type','pattern');
			markerEl.setAttribute('url',markersURLArray[k]);
			markerEl.setAttribute('id',markersNameArray[k]);

			markerEl.setAttribute('registerevents','');
			sceneEl.appendChild(markerEl);

			// Create a 3D model (CORRECT TAG)
			var modelEl = document.createElement('a-gltf-model');

			// Correct path (make sure this file exists)
			modelEl.setAttribute('src', '3dmodel/pikachu_amiibo.glb');

			// Append FIRST (important)
			markerEl.appendChild(modelEl);

			// Wait until model is loaded
			modelEl.addEventListener('model-loaded', () => {
			  console.log('MODEL LOADED');
			
			  modelEl.object3D.position.set(0, 0.1, 0);
			  modelEl.object3D.rotation.set(-90, 0, 0);
			  modelEl.object3D.scale.set(0.3, 0.3, 0.3);
			});

			// Optional rotation animation
			modelEl.setAttribute('animation', {
			  property: 'rotation',
			  to: '-90 360 0',
			  loop: true,
			  dur: 4000,
			  easing: 'linear'
			});

		}
	}
});


//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
	init: function () {
	  const marker = this.el;
  
	  marker.addEventListener("markerFound", () => {
		console.log('Marker Found:', marker.id);
		marker.object3D.visible = true;
	  });
  
	  marker.addEventListener("markerLost", () => {
		console.log('Marker Lost:', marker.id);
		marker.object3D.visible = false;
	  });
	}
  });
  