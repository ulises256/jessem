app.run([
    '$rootScope',
    '$state',
    '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);

app.config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {

		function template(seccion, vista, url, params) {
			let obj = {
				url: url,
				data: {
					titulo: vista[0]
				},
				params: params,
				views: {
					'main': {
						templateUrl: _(vista).union(['/' + seccion]).reverse().join('/'),
						controller: vista[0] + 'Ctrl as ctrl'
					}
				},
				resolve: {
					loadMyCtrl: [
						'$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([seccion + vista[0]]);
						}
					]
				}
			}
			return obj
		}

		$urlRouterProvider.otherwise('/');
		$stateProvider

		.state('home', template('main', ['home'], '/'))

		.state('servicios', template('main', ['servicios'], '/servicios'))
		.state('servicio', template('main', ['servicio'], '/servicio/:id', {'id': null}))

		.state('subservicios', template('main', ['subservicios'], '/subservicios'))
		.state('subservicio', template('main', ['subservicio'], '/subservicio/:id', {'id': null}))

		.state('proyectos', template('main', ['proyectos'], '/proyectos'))
		.state('proyecto', template('main', ['proyecto'], '/proyecto/:id', {'id': null}))

		.state('trabajadores', template('main', ['trabajadores'], '/trabajadores'))
		.state('trabajador', template('main', ['trabajador'], '/trabajador/:id', {'id': null}))

		.state('nosotros', template('main', ['nosotros'], '/nosotros'))

		.state('clientes', template('main', ['clientes'], '/clientes'))

		.state('contacto', template('main', ['contacto'], '/contacto'))

	}
]);
