/*
 * Funcionalidades envolvendo a página de atendimento
 */
exports.carregarPagina = function(req, res){
  res.render('ambulancia/atendimento', { title: 'Hello World' });
};