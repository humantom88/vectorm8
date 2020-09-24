const express = require('express');
const router = express.Router();

router.get('/fuelConsumption', function(req, res) {
	res.render('products/fuelConsumption', {
	  title: "Система контроля расхода топлива",
	  description: "Установка систем контроля расхода топлива. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  keywords: "контроль топлива, ГЛОНАСС , GPS, мониторинг транспорта",
	  og_title: "Система контроля расхода топлива",
	  og_description: "Установка систем контроля расхода топлива. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  og_url: "https://vectorm8.ru/products/fuelConsumption"
	});
  });

router.get('/gasStationMonitoring', function(req, res) {
	res.render('products/gasStationMonitoring', {
	  title: "Система мониторинга АЗС",
	  description: "Установка системы мониторинга АЗС.  Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  keywords: "АЗС, контроль топлива, ГЛОНАСС, GPS",
	  og_title: "Система мониторинга АЗС",
	  og_description: "Установка системы мониторинга АЗС.  Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  og_url: "https://vectorm8.ru/products/gasStationMonitoring"
	});
  });

router.get('/videoControlSystem', function(req, res) {
	res.render('products/videoControlSystem', {
	  title: "Видеомониторинг транспорта",
	  description: "Установка систем видеомониторинга на транспорте. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  keywords: "Видеомониторинг, спутниковый мониторинг.",
	  og_title: "Видеомониторинг транспорта",
	  og_description: "Установка систем видеомониторинга на транспорте. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  og_url: "https://vectorm8.ru/products/videoControlSystem"
	});
  });

router.get('/agronavigator', function(req, res) {
	res.render('products/agronavigator', {
	  title: "Агронавигатор. Система параллельного вождения.",
	  description: "Установка агронавигаторов и систем параллельного вождения. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  keywords: "агронавигатор, агроном, сельское хозяйство, параллельное вождение",
	  og_title: "Агронавигатор. Система параллельного вождения.",
	  og_description: "Установка агронавигаторов и систем параллельного вождения. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  og_url: "https://vectorm8.ru/products/agronavigator"
	});
  });

router.get('/driversControlSystem', function(req, res) {
	res.render('products/driversControlSystem', {
	  title: "Система интерактивного контроля водителей",
	  description: "Установка интерактивного контроля водителей. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  keywords: "контроль водителей, диспетчер автопарка, связь",
	  og_title: "Система интерактивного контроля водителей",
	  og_description: "Установка интерактивного контроля водителей. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  og_url: "https://vectorm8.ru/products/driversControlSystem"
	});
  });

router.get('/lighthouse', function(req, res) {
	res.render('products/lighthouse', {
	  title: "Проблесковый маячок",
	  description: "Установка проблесковых маяков. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  keywords: "проблесковый маяк",
	  og_title: "Проблесковый маячок",
	  og_description: "Установка проблесковых маяков. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  og_url: "https://vectorm8.ru/products/lighthouse"
	});
  });

router.get('/era-glonass', function(req, res) {
	res.render('products/eraGlonass', {
	  title: "ЭРА-ГЛОНАСС",
	  description: "Постановление №153. Установка терминалов Omnicomm АСН. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  keywords: "ЭРА-ГЛОНАСС",
	  og_title: "ЭРА-ГЛОНАСС",
	  og_description: "Постановление №153. Установка терминалов Omnicomm АСН. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
	  og_url: "https://vectorm8.ru/products/era-glonass"
	});
  });

  router.get('/tire_pressure_control', function(req, res) {
	res.render('products/tirePressureControl', {
	  title: "Контроль давления в шинах",
	  description: "Установка систем контроля давления в шинах. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область. Костромская область.",
	  keywords: "ЭРА-ГЛОНАСС",
	  og_title: "Контроль давления в шинах",
	  og_description: "Установка систем контроля давления в шинах. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область. Костромская область.",
	  og_url: "https://vectorm8.ru/products/tire_pressure_control"
	});
  });



  module.exports = router;