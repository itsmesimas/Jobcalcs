const Profile = require('../model/Profile');

module.exports = {
	async index(req, res) {
		return res.render('profile', { profile: await Profile.get() });
	},

	async update(req, res) {
		//req.body para pegar os dados
		const data = req.body;
		//definir quantas semanas tem no ano
		const weeksPerYear = 52;
		//remover as semanas de férias do ano
		const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
		//quantas horas por semana
		const weeksTotalHours = data['hours-per-day'] * data['days-per-week'];
		//horas trabalhadas no mês
		const monthlyTotalHours = weeksTotalHours * weeksPerMonth;
		//valor da hora
		const valueHour = data['monthly-budget'] / monthlyTotalHours;

		const profile = await Profile.get();
		
		await Profile.update({
			...profile,
			...req.body,
			'value-hour': valueHour,
		});

		return res.redirect('/profile');
	},
};
