var app = angular.module('myapp');

app.controller('serviciosCtrl', function($scope, $rootScope, $http, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Servicio, Imagen, Item) {

	var self = this;
	var bandera = 0;
	self.muestra = false;

	class Servicios_{
		constructor(){
			this.items = [],
			this.item = {},
			this.obtener()
		}

		obtener(){
			Servicio.obtener()
			.then(res => res.data.map(n =>  new Servicio_(n)))
			.then(res => this.agregarServicio(res))
		}

		agregarServicio(array){
			array.forEach(n => this.items.push(n))
			$scope.$digest()
			$('.slider').slick({
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				adaptiveHeight: true,
				arrows: true,
				prevArrow: $('.prev'),
				nextArrow: $('.next'),
			})
			$('.slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
				//var elSlide = $(slick.$slides[currentSlide]);
				//var dataIndex = elSlide[0].dataset.slickIndex;
				self.servicios.item = {}
				var detalles = ($('.detalles-servicios'))
				TweenLite.to(detalles, .2, {width:'0%', height:'0%'})
				self.muestra = false;
			});
			console.log(self.servicios.items)
		}

		infoSlider(id){
			
			self.muestra = true;
			self.servicios.item = servicio;
			var detalles = ($('.detalles-servicios'))
			TweenLite.to(detalles, .3, {width:'50%', height:'100%'})

			$scope.$digest()
		}

		verInfoSubservicio(subservicio){
			$('.algo').slick({
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				adaptiveHeight: true
			})
			self.servicios.detalles = subservicio;
			console.log(self.servicios.detalles)
			$scope.$digest()
		}
	}

	self.servicios = new Servicios_();

	class Servicio_{
		constructor(arg){
			this.id = arg.id,
			this.nombre = arg.nombre,
			this.descripcion = arg.descripcion,
			this.subservicios = [],
			this.imagenes()
		}

		cargarSubservicios(servicio){
			Servicio.obtenerSub(servicio.id)
			.then(res => this.subservicios = res.data)
			.then(res => self.servicios.item = servicio)
			.then(() => $scope.$digest())
			self.muestra = true;
			TweenLite.to($('.detalles-servicios'), .3, {width:'50%', height:'100%'})
		}

		async imagenes(){
			await Imagen.obtenerDeservicios(this.id)
			.then(res => this.imagenes = res.data)
			.then(() => $scope.$digest())
		}
	}

});
