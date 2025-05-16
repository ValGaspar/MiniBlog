angular.module('blog', []);


angular.module('blog').controller('Rest', function ($scope, $http) {
    $http.get('https://api-fake-blog.onrender.com/postagens').
        success(function (data) {
            $scope.publicacoes = data;
        });

    $scope.verDetalhe = function (publicacao) {
        localStorage.setItem('publicacaoDetalhe', JSON.stringify(publicacao));
    };
});

angular.module('blog').controller('Detalhe', function ($scope, $http) {
  const index = parseInt(new URLSearchParams(window.location.search).get('index'), 10);

  $scope.publicacao = {
    title: 'Publicação não encontrada',
    description: 'Nenhuma publicação foi selecionada.',
    thumbImage: 'https://via.placeholder.com/600x400?text=Sem+Imagem'
  };

  if (!isNaN(index)) {
    $http.get('https://api-fake-blog.onrender.com/postagens').then(resp => {
      if (resp.data && resp.data[index]) $scope.publicacao = resp.data[index];
    });
  }
});
