const express = require('express');
const router = express.Router();

router.get('/fuelConsumption', function(req, res) {
	res.render('products/fuelConsumption', {
	  title: "Система контроля расхода топлива",
	  description: "Установка систем контроля расхода топлива. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  keywords: "контроль топлива, ГЛОНАСС , GPS, мониторинг транспорта",
	  og_title: "Система контроля расхода топлива",
	  og_description: "Установка систем контроля расхода топлива. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  og_url: "https://vectorm8.ru/fuelConsumption"
	});
  });

  module.exports = router;