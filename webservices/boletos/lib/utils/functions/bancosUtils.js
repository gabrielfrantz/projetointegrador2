const formatacoes = require('../functions/formatacoesUtils');

function retornaFalso() {
	return false;
}

function calcularDVDoBradescoOuDoBancoDoBrasil(agenciaOuConta) {
	var size = agenciaOuConta.length,
		result = 0,
		mult = 2;

	for (let i = size - 1; i >= 0; i--) {
		var temp = agenciaOuConta.charAt(i) * mult;

		result += temp;
		mult++;

		if (mult > 9) {
			mult = 2;
		}
	}

	return ((result * 10) % 11).toString();
}

function validarAgenciaOuContaDoBradescoOuBancoDoBrasil(agenciaOuConta) {
	if (typeof agenciaOuConta !== 'string') {
		return false;
	}

	agenciaOuConta = formatacoes.removerMascara(agenciaOuConta);

	var digitoInformado = agenciaOuConta.substr(agenciaOuConta.length - 1),
		digitoCalculado = calcularDVDoBradescoOuDoBancoDoBrasil(agenciaOuConta.substr(0, agenciaOuConta.length - 1));

	return digitoInformado === digitoCalculado;
}

module.exports.bancoDoBrasil = {
	validarAgenciaEConta: function(agencia, conta) {
		return validarAgenciaOuContaDoBradescoOuBancoDoBrasil(agencia) &&
      validarAgenciaOuContaDoBradescoOuBancoDoBrasil(conta);
	},

	validarAgencia: validarAgenciaOuContaDoBradescoOuBancoDoBrasil,

	validarConta: validarAgenciaOuContaDoBradescoOuBancoDoBrasil,

	calcularDigitoVerificador: calcularDVDoBradescoOuDoBancoDoBrasil
};

module.exports['001'] = module.exports.bancoDoBrasil;
